import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import {
  generateEmailContent,
  generateSubjectLines,
} from "@/lib/openai"
import { z } from "zod"

const generateEmailSchema = z.object({
  prompt: z.string().min(10),
  tone: z.enum(["professional", "casual", "friendly", "urgent", "persuasive"]).default("professional"),
  type: z.enum(["promotional", "newsletter", "follow-up", "welcome", "announcement", "transactional"]).default("promotional"),
  targetAudience: z.string().optional(),
  includeSubjects: z.boolean().default(true),
  length: z.enum(["short", "medium", "long"]).default("medium"),
  callToAction: z.string().optional(),
  companyInfo: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      prompt,
      tone,
      type,
      targetAudience,
      includeSubjects,
      length,
      callToAction,
      companyInfo,
    } = generateEmailSchema.parse(body)

    const context = {
      tone,
      type,
      targetAudience,
      length,
      callToAction,
      companyInfo: companyInfo || (user as any)?.profile?.company || "Your Company",
      userCompany: (user as any)?.profile?.company || "Your Company",
    }

    const emailContent = await generateEmailContent(prompt, context)

    if (!emailContent || typeof emailContent !== "string") {
      return NextResponse.json({ error: "Failed to generate email content" }, { status: 500 })
    }

    let subjects: string[] = []
    if (includeSubjects) {
      const subjectResult = await generateSubjectLines(emailContent, { tone, type })
      if (subjectResult && Array.isArray(subjectResult)) {
        subjects = subjectResult
      } else if (subjectResult && subjectResult.subjects) {
        subjects = subjectResult.subjects
      }
    }

    return NextResponse.json({
      content: emailContent,
      subjects,
      metadata: {
        tone,
        type,
        targetAudience,
        length,
        generatedAt: new Date(),
        wordCount: emailContent.split(" ").length,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Generate email error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
