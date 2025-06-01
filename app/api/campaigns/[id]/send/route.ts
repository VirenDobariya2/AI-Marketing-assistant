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

    // Check if campaign exists and belongs to user
    const existingCampaign = await db.collection<Campaign>("campaigns").findOne({
      _id: new ObjectId(params.id),
      userId: new ObjectId(user._id),
    })

    if (!existingCampaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Check if campaign can be sent
    if (existingCampaign.status === "sent") {
      return NextResponse.json({ error: "Campaign already sent" }, { status: 400 })
    }

    if (existingCampaign.status === "sending") {
      return NextResponse.json({ error: "Campaign is currently being sent" }, { status: 400 })
    }

    // Update campaign status to sending
    await db.collection<Campaign>("campaigns").updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          status: "sending",
          sentAt: new Date(),
          updatedAt: new Date(),
        },
      },
    )

    // Here you would implement the actual email sending logic
    // For now, we'll simulate it by updating the status to sent
    setTimeout(async () => {
      await db.collection<Campaign>("campaigns").updateOne(
        { _id: new ObjectId(params.id) },
        {
          $set: {
            status: "sent",
            "recipients.sent": existingCampaign.recipients.total,
            "recipients.delivered": Math.floor(existingCampaign.recipients.total * 0.95),
            updatedAt: new Date(),
          },
        },
      )
    }, 2000)

    return NextResponse.json({
      message: "Campaign sending started",
      success: true,
    })
  } catch (error) {
    console.error("Send campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
