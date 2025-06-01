import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import type { Campaign } from "@/lib/models/User"
import { z } from "zod"

const createCampaignSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  content: z.string().min(1),
  type: z.enum(["email", "sms", "push"]).default("email"),
  status: z.enum(["draft", "scheduled", "sending", "sent", "paused"]).default("draft"),
  scheduledAt: z.string().datetime().optional(),
  recipients: z.object({
    type: z.enum(["all", "segments", "tags", "custom"]),
    segments: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    contactIds: z.array(z.string()).default([]),
  }),
  settings: z
    .object({
      trackOpens: z.boolean().default(true),
      trackClicks: z.boolean().default(true),
      unsubscribeLink: z.boolean().default(true),
      replyTo: z.string().email().optional(),
    })
    .default({}),
})

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
    const search = searchParams.get("search")
    const type = searchParams.get("type")

    const db = await connectDB()

    const filter: any = { userId: user._id }

    if (status && status !== "all") {
      filter.status = status
    }

    if (type && type !== "all") {
      filter.type = type
    }

    if (search) {
      filter.$or = [{ name: { $regex: search, $options: "i" } }, { subject: { $regex: search, $options: "i" } }]
    }

    const campaigns = await db
      .collection<Campaign>("campaigns")
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await db.collection<Campaign>("campaigns").countDocuments(filter)

    // Get campaign statistics
    const stats = await db
      .collection<Campaign>("campaigns")
      .aggregate([
        { $match: { userId: user._id } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalSent: { $sum: "$analytics.sent" },
            totalOpened: { $sum: "$analytics.opened" },
            totalClicked: { $sum: "$analytics.clicked" },
          },
        },
      ])
      .toArray()

    return NextResponse.json({
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: stats.reduce(
        (acc, stat) => ({
          ...acc,
          [stat._id]: {
            count: stat.count,
            sent: stat.totalSent || 0,
            opened: stat.totalOpened || 0,
            clicked: stat.totalClicked || 0,
          },
        }),
        {},
      ),
    })
  } catch (error) {
    console.error("Get campaigns error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const data = createCampaignSchema.parse(body)

    const db = await connectDB()

    const campaign: Omit<Campaign, "_id"> = {
      userId: user._id!,
      name: data.name,
      subject: data.subject,
      content: data.content,
      type: data.type,
      status: data.status,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      recipients: data.recipients,
      settings: data.settings,
      analytics: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        bounced: 0,
        unsubscribed: 0,
        openRate: 0,
        clickRate: 0,
        bounceRate: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Campaign>("campaigns").insertOne(campaign)

    return NextResponse.json({
      message: "Campaign created successfully",
      campaignId: result.insertedId,
      campaign: { ...campaign, _id: result.insertedId },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Create campaign error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
