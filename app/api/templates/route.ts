import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { Template } from "@/lib/models/Template"
import { z } from "zod"

const createTemplateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  subject: z.string().min(1),
  content: z.string().min(1),
  category: z.enum(["newsletter", "promotional", "transactional", "welcome", "announcement", "other"]).default("other"),
  type: z.enum(["email", "sms", "push"]).default("email"),
  isPublic: z.boolean().default(false),
  variables: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(["text", "number", "date", "boolean", "url"]).default("text"),
        defaultValue: z.string().optional(),
        required: z.boolean().default(false),
        description: z.string().optional(),
      }),
    )
    .default([]),
  tags: z.array(z.string()).default([]),
})

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const includePublic = searchParams.get("includePublic") === "true"

    const query: any = {
      $or: [{ userId: user._id }],
    }

    if (includePublic) {
      query.$or.push({ isPublic: true })
    }

    if (category && category !== "all") {
      query.category = category
    }

    if (search) {
      query.$and = [
        query.$and || {},
        {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $in: [new RegExp(search, "i")] } },
          ],
        },
      ]
    }

    const templates = await Template.find(query)
      .sort({ usageCount: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    const total = await Template.countDocuments(query)

    return NextResponse.json({
      templates,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Get templates error:", error)
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
    const data = createTemplateSchema.parse(body)

    await connectDB()

    const template = new Template({
      ...data,
      userId: user._id,
    })

    await template.save()

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Create template error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
