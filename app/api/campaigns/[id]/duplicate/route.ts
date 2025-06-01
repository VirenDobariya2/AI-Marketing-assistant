import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Campaign } from "@/lib/models/Campaign"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await connectDB()

    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid campaign ID" }, { status: 400 })
    }

    // Get the original campaign
    const originalCampaign = await db.collection<Campaign>("campaigns").findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(user._id),
    })

    if (!originalCampaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Create duplicate campaign
    const duplicateCampaign = {
      ...originalCampaign,
      _id: new ObjectId(),
      name: `${originalCampaign.name} (Copy)`,
      status: "draft" as const,
      scheduledAt: undefined,
      sentAt: undefined,
      recipients: {
        total: 0,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        complained: 0,
        unsubscribed: 0,
      },
      analytics: {
        openRate: 0,
        clickRate: 0,
        bounceRate: 0,
        unsubscribeRate: 0,
        deliveryRate: 0,
      },
      errors: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Campaign>("campaigns").insertOne(duplicateCampaign)

    if (!result.insertedId) {
      return NextResponse.json({ error: "Failed to duplicate campaign" }, { status: 500 })
    }

    return NextResponse.json({
      message: "Campaign duplicated successfully",
      data: duplicateCampaign,
      success: true,
    })
  } catch (error) {
    console.error("Duplicate campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
