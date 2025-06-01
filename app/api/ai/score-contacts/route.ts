import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { Contact } from "@/lib/models/Contact"
import { z } from "zod"

const scoreContactsSchema = z.object({
  contactIds: z.array(z.string()).optional(),
  recalculateAll: z.boolean().default(false),
})

// Engagement scoring algorithm (simplified for your schema)
function calculateEngagementScore(contact: typeof Contact.prototype): number {
  let score = 0

  // Basic fields
  if (contact.firstName) score += 10
  if (contact.lastName) score += 10
  if (contact.email) score += 10
  if (contact.phone) score += 5
  if (contact.company) score += 5
  if (contact.position) score += 5

  // Engagement recency
  const daysSinceLastEngagement = contact.engagement?.lastEngagementDate
    ? Math.floor((Date.now() - new Date(contact.engagement.lastEngagementDate).getTime()) / (1000 * 60 * 60 * 24))
    : 365

  if (daysSinceLastEngagement <= 7) score += 30
  else if (daysSinceLastEngagement <= 30) score += 20
  else if (daysSinceLastEngagement <= 90) score += 10
  else score -= 10

  // Tag-based scoring
  if (contact.tags?.includes("vip")) score += 20
  if (contact.tags?.includes("lead")) score += 15
  if (contact.tags?.includes("customer")) score += 25

  return Math.max(0, Math.min(100, score))
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const body = await request.json()
    const { contactIds, recalculateAll } = scoreContactsSchema.parse(body)

    const filter: any = { userId: user._id }

    if (!recalculateAll && contactIds && contactIds.length > 0) {
      filter._id = { $in: contactIds }
    }

    const contacts = await Contact.find(filter).lean()

    const updates = []
    const scores = []

    for (const contact of contacts) {
      const engagementScore = calculateEngagementScore(contact)

      updates.push({
        updateOne: {
          filter: { _id: contact._id },
          update: {
            $set: {
              "engagement.score": engagementScore,
              "engagement.lastScoreUpdate": new Date(),
              updatedAt: new Date(),
            },
          },
        },
      })

      scores.push({
        contactId: contact._id,
        email: contact.email,
        name: `${contact.firstName} ${contact.lastName}`,
        previousScore: contact.engagement?.score || 0,
        newScore: engagementScore,
        change: engagementScore - (contact.engagement?.score || 0),
      })
    }

    if (updates.length > 0) {
      await Contact.bulkWrite(updates)
    }

    const distribution = scores.reduce(
      (acc, score) => {
        const range = score.newScore >= 80 ? "high" : score.newScore >= 50 ? "medium" : "low"
        acc[range] = (acc[range] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return NextResponse.json({
      message: "Contact scores updated successfully",
      processed: contacts.length,
      scores,
      distribution,
      summary: {
        averageScore: scores.reduce((sum, s) => sum + s.newScore, 0) / scores.length,
        highEngagement: scores.filter((s) => s.newScore >= 80).length,
        mediumEngagement: scores.filter((s) => s.newScore >= 50 && s.newScore < 80).length,
        lowEngagement: scores.filter((s) => s.newScore < 50).length,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Score contacts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
