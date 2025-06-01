import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { connectDB } from "@/lib/mongodb"
import type { User } from "@/lib/models/User"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const db = await connectDB()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (!userId) {
          console.error("No userId in session metadata")
          break
        }

        // Update user subscription
        await db.collection<User>("users").updateOne(
          { _id: userId },
          {
            $set: {
              subscription: {
                status: "active",
                plan: session.metadata?.plan || "starter",
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: session.subscription as string,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
              },
              updatedAt: new Date(),
            },
          },
        )

        // Create notification
        await db.collection("notifications").insertOne({
          userId,
          type: "subscription",
          title: "Subscription Activated",
          message: `Your ${session.metadata?.plan || "starter"} plan has been activated successfully.`,
          read: false,
          createdAt: new Date(),
        })

        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const user = await db.collection<User>("users").findOne({
          "subscription.stripeCustomerId": customerId,
        })

        if (user) {
          await db.collection<User>("users").updateOne(
            { _id: user._id },
            {
              $set: {
                "subscription.status": subscription.status,
                "subscription.currentPeriodStart": new Date(subscription.current_period_start * 1000),
                "subscription.currentPeriodEnd": new Date(subscription.current_period_end * 1000),
                updatedAt: new Date(),
              },
            },
          )
        }

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const user = await db.collection<User>("users").findOne({
          "subscription.stripeCustomerId": customerId,
        })

        if (user) {
          await db.collection<User>("users").updateOne(
            { _id: user._id },
            {
              $set: {
                "subscription.status": "cancelled",
                updatedAt: new Date(),
              },
            },
          )

          // Create notification
          await db.collection("notifications").insertOne({
            userId: user._id,
            type: "subscription",
            title: "Subscription Cancelled",
            message:
              "Your subscription has been cancelled. You can continue using the service until the end of your billing period.",
            read: false,
            createdAt: new Date(),
          })
        }

        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Find user by Stripe customer ID
        const user = await db.collection<User>("users").findOne({
          "subscription.stripeCustomerId": customerId,
        })

        if (user) {
          // Create notification
          await db.collection("notifications").insertOne({
            userId: user._id,
            type: "billing",
            title: "Payment Failed",
            message: "Your recent payment failed. Please update your payment method to continue using the service.",
            read: false,
            createdAt: new Date(),
          })
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}
