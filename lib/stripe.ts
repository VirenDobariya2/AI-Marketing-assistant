import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export const PRICING_PLANS = {
  starter: {
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    price: 29,
    name: "Starter",
    features: [
      "Up to 1,000 contacts",
      "5 email campaigns per month",
      "Basic segmentation",
      "AI content suggestions",
      "Email templates",
      "Basic analytics",
    ],
  },
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    price: 79,
    name: "Professional",
    features: [
      "Up to 10,000 contacts",
      "Unlimited email campaigns",
      "Advanced segmentation",
      "AI content generation",
      "Custom workflows",
      "Detailed analytics",
      "A/B testing",
      "Priority support",
    ],
  },
  business: {
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID!,
    price: 199,
    name: "Business",
    features: [
      "Unlimited contacts",
      "Unlimited campaigns",
      "Advanced AI features",
      "Custom integrations",
      "Dedicated account manager",
      "Advanced analytics & reporting",
      "Team collaboration tools",
      "API access",
    ],
  },
}

export async function createCheckoutSession(
  priceId: string,
  userId: string,
  successUrl: string,
  cancelUrl: string,
): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  })
}

export async function createCustomerPortalSession(customerId: string): Promise<Stripe.BillingPortal.Session> {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  })
}

export async function handleWebhookEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      // Handle successful subscription
      console.log("Subscription successful:", session)
      break

    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription
      // Handle subscription update
      console.log("Subscription updated:", subscription)
      break

    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription
      // Handle subscription cancellation
      console.log("Subscription cancelled:", deletedSubscription)
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }
}
