import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { sendEmail } from "@/lib/email"
import { z } from "zod"
import mongoose from "mongoose"

const feedbackSchema = z.object({
  type: z.enum(["bug", "feature", "improvement", "general"]),
  subject: z.string().min(1),
  message: z.string().min(10),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  category: z.string().optional(),
  attachments: z.array(z.string()).default([]),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = feedbackSchema.parse(body)

    await connectDB()

    // Define Feedback model if not already defined
    
    const FeedbackSchema = new mongoose.Schema({
      userId: mongoose.Schema.Types.ObjectId,
      userEmail: String,
      userName: String,
      type: String,
      subject: String,
      message: String,
      priority: String,
      category: String,
      attachments: [String],
      status: String,
      createdAt: Date,
      updatedAt: Date,
    })
    const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema)

    const feedback = {
      userId: user._id,
      userEmail: user.email,
      userName: user.email,
      type: validatedData.type,
      subject: validatedData.subject,
      message: validatedData.message,
      priority: validatedData.priority,
      category: validatedData.category,
    attachments: validatedData.attachments,
    updatedAt: new Date(),
    }

    const result = await Feedback.create(feedback)

    // Send notification email to support team
    const emailContent = `
      New feedback received from ${user.email} (${user.email})
      
      Type: ${validatedData.type}
      feedbackId: ${result._id},
      Subject: ${validatedData.subject}
      
      Message:
      ${validatedData.message}

      Feedback ID: ${result._id}
    `

    await sendEmail({
      to: process.env.SUPPORT_EMAIL || process.env.FROM_EMAIL!,
      subject: `[LeadNest] New ${validatedData.type} feedback: ${validatedData.subject}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, "<br>"),
    })

    return NextResponse.json({
      message: "Feedback submitted successfully",
      feedbackId: result.insertedId,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Submit feedback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    await connectDB()

    const filter: any = { userId: user._id }
    if (status && status !== "all") {
      filter.status = status
    }

    // Define Feedback model if not already defined
    const FeedbackSchema = new mongoose.Schema({
      userId: mongoose.Schema.Types.ObjectId,
      userEmail: String,
      userName: String,
      type: String,
      subject: String,
      message: String,
      priority: String,
      category: String,
      attachments: [String],
      status: String,
      createdAt: Date,
      updatedAt: Date,
    })
    const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema)

    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()
      .exec()

    const total = await Feedback.countDocuments(filter)

    return NextResponse.json({
      feedback,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get feedback error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
