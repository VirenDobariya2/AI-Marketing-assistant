import { openai } from "@ai-sdk/openai"
import { generateText, generateObject } from "ai"
import { z } from "zod"

export async function generateEmailContent(prompt: string, context?: any): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: `Generate engaging email content based on: ${prompt}. ${context ? `Context: ${JSON.stringify(context)}` : ""}`,
      maxTokens: 500,
    })

    return text
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to generate email content")
  }
}

export async function generateSubjectLines(content: string, context: { tone: string, type: string }): Promise<{ success: boolean; subjects?: string[] }> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4"),
      schema: z.object({
        subjects: z.array(z.string()),
      }),
      prompt: `Generate 3 engaging subject lines for this ${context.type} email with a ${context.tone} tone: ${content}`,
    })

    return { success: true, subjects: object.subjects }
  } catch (error) {
    console.error("OpenAI Subject Line Error:", error)
    return { success: false }
  }
}



export async function generateCampaignIdeas(businessType: string, goals: string[]): Promise<string[]> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4"),
      schema: z.object({
        ideas: z.array(z.string()),
      }),
      prompt: `Generate 5 creative marketing campaign ideas for a ${businessType} business with goals: ${goals.join(", ")}`,
    })

    return object.ideas
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to generate campaign ideas")
  }
}

export async function optimizeSubjectLine(originalSubject: string, audience: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: `Optimize this email subject line for ${audience}: "${originalSubject}". Make it more engaging and likely to be opened.`,
      maxTokens: 100,
    })

    return text.trim()
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to optimize subject line")
  }
}

export async function scoreContactQuality(contactData: any): Promise<number> {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4"),
      schema: z.object({
        score: z.number().min(0).max(100),
        reasoning: z.string(),
      }),
      prompt: `Score this contact's quality from 0-100 based on their data: ${JSON.stringify(contactData)}. Consider engagement, completeness of profile, and potential value.`,
    })

    return object.score
  } catch (error) {
    console.error("OpenAI API error:", error)
    return 50 // Default score if AI fails
  }
}

export async function generatePersonalizedContent(template: string, contactData: any): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4"),
      prompt: `Personalize this template: "${template}" for this contact: ${JSON.stringify(contactData)}. Make it feel personal and relevant.`,
      maxTokens: 300,
    })

    return text
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to personalize content")
  }
}
