import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import type { Campaign } from "@/lib/models/User"
import { z } from "zod"

const updateCampaignSchema = z.object({
  name: z.string().min(1).optional(),
  subject: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  status: z.enum(["draft", "scheduled", "sending", "sent", "paused"]).optional(),
  scheduledAt: z.string().datetime().optional(),
  recipients: z
    .object({
      type: z.enum(["all", "segments", "tags", "custom"]),
      segments: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      contactIds: z.array(z.string()).default([]),
    })
    .optional(),
  settings: z
    .object({
      trackOpens: z.boolean().optional(),
      trackClicks: z.boolean().optional(),
      unsubscribeLink: z.boolean().optional(),
      replyTo: z.string().email().optional(),
    })
    .optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await connectDB()

    const campaign = await db.collection<Campaign>("campaigns").findOne({
      _id: params.id,
      userId: user._id,
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({ campaign })
  } catch (error) {
    console.error("Get campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateCampaignSchema.parse(body)

    const db = await connectDB()

    // Check if campaign exists and belongs to user
    const existingCampaign = await db.collection<Campaign>("campaigns").findOne({
      _id: params.id,
      userId: user._id,
    })

    if (!existingCampaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Don't allow editing sent campaigns
    if (existingCampaign.status === "sent") {
      return NextResponse.json({ error: "Cannot edit sent campaigns" }, { status: 400 })
    }

    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
    }

    if (validatedData.scheduledAt) {
      updateData.scheduledAt = new Date(validatedData.scheduledAt)
    }

    const result = await db
      .collection<Campaign>("campaigns")
      .updateOne({ _id: params.id, userId: user._id }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Campaign updated successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Update campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await connectDB()

    // Check if campaign exists and belongs to user
    const existingCampaign = await db.collection<Campaign>("campaigns").findOne({
      _id: params.id,
      userId: user._id,
    })

    if (!existingCampaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Don't allow deleting sent campaigns
    if (existingCampaign.status === "sent") {
      return NextResponse.json({ error: "Cannot delete sent campaigns" }, { status: 400 })
    }

    const result = await db.collection<Campaign>("campaigns").deleteOne({
      _id: params.id,
      userId: user._id,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Campaign deleted successfully",
    })
  } catch (error) {
    console.error("Delete campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
