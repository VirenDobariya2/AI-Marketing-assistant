import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import type { Contact } from "@/lib/models/User"
import { z } from "zod"

const importContactSchema = z.object({
  contacts: z.array(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
      company: z.string().optional(),
      position: z.string().optional(),
      tags: z.array(z.string()).default([]),
      customFields: z.record(z.any()).optional(),
    }),
  ),
  skipDuplicates: z.boolean().default(true),
  updateExisting: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { contacts, skipDuplicates, updateExisting } = importContactSchema.parse(body)

    const db = await connectDB()

    const results = {
      imported: 0,
      updated: 0,
      skipped: 0,
      errors: [] as string[],
    }

    for (const contactData of contacts) {
      try {
        // Check if contact exists
        const existingContact = await db.collection<Contact>("contacts").findOne({
          userId: user._id,
          email: contactData.email,
        })

        if (existingContact) {
          if (updateExisting) {
            // Update existing contact
            await db.collection<Contact>("contacts").updateOne(
              { _id: existingContact._id },
              {
                $set: {
                  ...contactData,
                  updatedAt: new Date(),
                },
              },
            )
            results.updated++
          } else if (skipDuplicates) {
            results.skipped++
          } else {
            results.errors.push(`Duplicate email: ${contactData.email}`)
          }
        } else {
          // Create new contact
          const contact: Omit<Contact, "_id"> = {
            userId: user._id!,
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
            company: contactData.company,
            position: contactData.position,
            tags: contactData.tags,
            status: "active",
            customFields: contactData.customFields,
            source: "import",
            engagementScore: 0,
            lastEngagement: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          }

          await db.collection<Contact>("contacts").insertOne(contact)
          results.imported++
        }
      } catch (error) {
        results.errors.push(`Error processing ${contactData.email}: ${error}`)
      }
    }

    return NextResponse.json({
      message: "Import completed",
      results,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Import contacts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
