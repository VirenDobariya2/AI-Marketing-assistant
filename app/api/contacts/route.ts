import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"
import type { Contact } from "@/lib/models/User"
import { z } from "zod"

const createContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  tags: z.array(z.string()).default([]),
  customFields: z.record(z.any()).optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
})

const updateContactSchema = createContactSchema.partial()

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const tag = searchParams.get("tag") || ""
    const status = searchParams.get("status") || ""
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1

    const db = await connectDB()

    const filter: any = { userId: user._id }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ]
    }

    if (tag) {
      filter.tags = tag
    }

    if (status && status !== "all") {
      filter.status = status
    }

    const contacts = await db
      .collection<Contact>("contacts")
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()

    const total = await db.collection<Contact>("contacts").countDocuments(filter)

    // Get contact statistics
    const stats = await db
      .collection<Contact>("contacts")
      .aggregate([
        { $match: { userId: user._id } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: stats.reduce((acc, stat) => ({ ...acc, [stat._id]: stat.count }), {}),
    })
  } catch (error) {
    console.error("Get contacts error:", error)
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
    const validatedData = createContactSchema.parse(body)

    const db = await connectDB()

    // Check if contact already exists
    const existingContact = await db.collection<Contact>("contacts").findOne({
      userId: user._id,
      email: validatedData.email,
    })

    if (existingContact) {
      return NextResponse.json({ error: "Contact with this email already exists" }, { status: 400 })
    }

    const contact: Omit<Contact, "_id"> = {
      userId: user._id!,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      position: validatedData.position,
      tags: validatedData.tags,
      status: "active",
      customFields: validatedData.customFields,
      source: validatedData.source || "manual",
      notes: validatedData.notes,
      engagementScore: 0,
      lastEngagement: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Contact>("contacts").insertOne(contact)

    return NextResponse.json({
      message: "Contact created successfully",
      contactId: result.insertedId,
      contact: { ...contact, _id: result.insertedId },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Create contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get("id")

    if (!contactId) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = updateContactSchema.parse(body)

    const db = await connectDB()

    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
    }

    const result = await db
      .collection<Contact>("contacts")
      .updateOne({ _id: contactId, userId: user._id }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Contact updated successfully",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Update contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const contactId = searchParams.get("id")

    if (!contactId) {
      return NextResponse.json({ error: "Contact ID is required" }, { status: 400 })
    }

    const db = await connectDB()

    const result = await db.collection<Contact>("contacts").deleteOne({
      _id: contactId,
      userId: user._id,
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Contact deleted successfully",
    })
  } catch (error) {
    console.error("Delete contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
