import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { generateEmailContent } from "@/lib/openai"  // changed to existing function
import { z } from "zod"

const suggestReplySchema = z.object({
  originalMessage: z.string().min(1),
  context: z.string().optional(),
  tone: z.enum(["professional", "casual", "friendly", "formal"]).default("professional"),
  intent: z.enum(["accept", "decline", "request_info", "schedule_meeting", "general"]).default("general"),
  includeSignature: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { originalMessage, context, tone, intent, includeSignature } = suggestReplySchema.parse(body)

    const replyContext = {
      originalMessage,
      context,
      tone,
      intent,
      userName: user,         // Fixed access (changed from name to fullName)
      userCompany: user,   // Fixed access
      includeSignature,
    }

    // Use generateEmailContent instead of non-existing generateReplyContent
    const replyText = await generateEmailContent(originalMessage, {
      context,
      tone,
      intent,
      userName: replyContext.userName,
      userCompany: replyContext.userCompany,
      includeSignature,
    })

    return NextResponse.json({
      reply: replyText,
      suggestions: [], // You can implement suggestions later
      metadata: {
        tone,
        intent,
        generatedAt: new Date(),
        wordCount: replyText.split(" ").length,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Suggest reply error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
