import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { z } from "zod"
import { Notification } from "@/models/Notification"

const markReadSchema = z.object({
  notificationIds: z.array(z.string()),
})

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    await connectDB()
    // Import or define your Notification mongoose model at the top of the file:
    // import { Notification } from "@/models/Notification"

    const filter: any = { userId: user._id }
    if (unreadOnly) {
      filter.read = false
    }

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    const total = await Notification.countDocuments(filter)
    const unreadCount = await Notification.countDocuments({
      userId: user._id,
      read: false,
    })

    return NextResponse.json({
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { notificationIds } = markReadSchema.parse(body)

    await connectDB()
    // Import or define your Notification mongoose model at the top of the file:
    // import { Notification } from "@/models/Notification"

    const result = await Notification.updateMany(
      {
        _id: { $in: notificationIds },
        userId: user._id,
      },
      {
        $set: {
          read: true,
          readAt: new Date(),
        },
      },
    )

    return NextResponse.json({
      message: "Notifications marked as read",
      updated: result.modifiedCount,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Mark notifications read error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
