import { z } from "zod"

// Common validation schemas
export const commonSchemas = {
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128, "Password too long"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-$$$$]+$/, "Invalid phone number")
    .optional(),
  url: z.string().url("Invalid URL").optional(),
  objectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  pagination: z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
  }),
  dateRange: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  }),
}

// Campaign validation schemas
export const campaignSchemas = {
  create: z.object({
    name: z.string().min(1, "Campaign name is required").max(100),
    subject: z.string().min(1, "Subject is required").max(200),
    content: z.string().min(1, "Content is required"),
    type: z.enum(["email", "sms", "push"]).default("email"),
    scheduledAt: z.string().datetime().optional(),
    recipients: z.object({
      type: z.enum(["all", "segments", "tags", "custom"]),
      segments: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      contactIds: z.array(commonSchemas.objectId).default([]),
    }),
    settings: z
      .object({
        trackOpens: z.boolean().default(true),
        trackClicks: z.boolean().default(true),
        unsubscribeLink: z.boolean().default(true),
        replyTo: commonSchemas.email.optional(),
        sendTime: z.enum(["now", "optimal", "scheduled"]).default("now"),
      })
      .default({}),
  }),
  update: z.object({
    name: z.string().min(1).max(100).optional(),
    subject: z.string().min(1).max(200).optional(),
    content: z.string().min(1).optional(),
    status: z.enum(["draft", "scheduled", "sending", "sent", "paused"]).optional(),
    scheduledAt: z.string().datetime().optional(),
    recipients: z
      .object({
        type: z.enum(["all", "segments", "tags", "custom"]),
        segments: z.array(z.string()).default([]),
        tags: z.array(z.string()).default([]),
        contactIds: z.array(commonSchemas.objectId).default([]),
      })
      .optional(),
    settings: z
      .object({
        trackOpens: z.boolean().optional(),
        trackClicks: z.boolean().optional(),
        unsubscribeLink: z.boolean().optional(),
        replyTo: commonSchemas.email.optional(),
      })
      .optional(),
  }),
}

// AI validation schemas
export const aiSchemas = {
  generateEmail: z.object({
    prompt: z.string().min(10, "Prompt must be at least 10 characters").max(1000),
    tone: z.enum(["professional", "casual", "friendly", "urgent", "persuasive"]).default("professional"),
    type: z
      .enum(["promotional", "newsletter", "follow-up", "welcome", "announcement", "transactional"])
      .default("promotional"),
    targetAudience: z.string().max(200).optional(),
    includeSubjects: z.boolean().default(true),
    length: z.enum(["short", "medium", "long"]).default("medium"),
    callToAction: z.string().max(100).optional(),
    companyInfo: z.string().max(500).optional(),
  }),
  suggestReply: z.object({
    originalMessage: z.string().min(1, "Original message is required").max(5000),
    context: z.string().max(1000).optional(),
    tone: z.enum(["professional", "casual", "friendly", "formal"]).default("professional"),
    intent: z.enum(["accept", "decline", "request_info", "schedule_meeting", "general"]).default("general"),
    includeSignature: z.boolean().default(true),
  }),
  scoreContacts: z.object({
    contactIds: z.array(commonSchemas.objectId).optional(),
    recalculateAll: z.boolean().default(false),
    factors: z
      .object({
        profileCompleteness: z.number().min(0).max(1).default(0.2),
        engagement: z.number().min(0).max(1).default(0.4),
        recency: z.number().min(0).max(1).default(0.3),
        tags: z.number().min(0).max(1).default(0.1),
      })
      .default({}),
  }),
}

// Template validation schemas
export const templateSchemas = {
  create: z.object({
    name: z.string().min(1, "Template name is required").max(100),
    subject: z.string().min(1, "Subject is required").max(200),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().max(500).optional(),
    tags: z.array(z.string()).default([]),
    variables: z.array(z.string()).default([]),
    isPublic: z.boolean().default(false),
    thumbnail: z.string().url().optional(),
  }),
  update: z.object({
    name: z.string().min(1).max(100).optional(),
    subject: z.string().min(1).max(200).optional(),
    content: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    description: z.string().max(500).optional(),
    tags: z.array(z.string()).optional(),
    variables: z.array(z.string()).optional(),
    isPublic: z.boolean().optional(),
    thumbnail: z.string().url().optional(),
  }),
}

// User validation schemas
export const userSchemas = {
  updateProfile: z.object({
    name: commonSchemas.name.optional(),
    company: z.string().max(100).optional(),
    phone: commonSchemas.phone,
    avatar: z.string().url().optional(),
    timezone: z.string().optional(),
    preferences: z
      .object({
        emailNotifications: z.boolean().optional(),
        marketingEmails: z.boolean().optional(),
        theme: z.enum(["light", "dark", "system"]).optional(),
        language: z.string().optional(),
        dateFormat: z.enum(["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]).optional(),
        timeFormat: z.enum(["12h", "24h"]).optional(),
      })
      .optional(),
  }),
  changePassword: z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: commonSchemas.password,
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
}

// Feedback validation schemas
export const feedbackSchemas = {
  create: z.object({
    type: z.enum(["bug", "feature", "improvement", "general"]),
    subject: z.string().min(1, "Subject is required").max(200),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    category: z.string().max(50).optional(),
    attachments: z.array(z.string().url()).default([]),
    reproductionSteps: z.string().max(1000).optional(),
    expectedBehavior: z.string().max(500).optional(),
    actualBehavior: z.string().max(500).optional(),
  }),
}

// Analytics validation schemas
export const analyticsSchemas = {
  query: z.object({
    period: z.enum(["7d", "30d", "90d", "1y"]).default("30d"),
    campaignId: commonSchemas.objectId.optional(),
    metrics: z.array(z.enum(["opens", "clicks", "bounces", "unsubscribes", "conversions"])).optional(),
    groupBy: z.enum(["day", "week", "month"]).default("day"),
    timezone: z.string().default("UTC"),
  }),
}

// Contact validation schemas
export const contactSchemas = {
  create: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: commonSchemas.email,
    phone: commonSchemas.phone,
    company: z.string().max(100).optional(),
    jobTitle: z.string().max(100).optional(),
    tags: z.array(z.string()).default([]),
    segments: z.array(z.string()).default([]),
    customFields: z.record(z.any()).optional(),
    notes: z.string().max(1000).optional(),
  }),
  update: z.object({
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: commonSchemas.email.optional(),
    phone: commonSchemas.phone,
    company: z.string().max(100).optional(),
    jobTitle: z.string().max(100).optional(),
    tags: z.array(z.string()).optional(),
    segments: z.array(z.string()).optional(),
    customFields: z.record(z.any()).optional(),
    notes: z.string().max(1000).optional(),
    status: z.enum(["active", "unsubscribed", "bounced", "complained"]).optional(),
  }),
  import: z.object({
    contacts: z.array(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: commonSchemas.email,
        phone: commonSchemas.phone,
        company: z.string().max(100).optional(),
        jobTitle: z.string().max(100).optional(),
        tags: z.array(z.string()).default([]),
        segments: z.array(z.string()).default([]),
        customFields: z.record(z.any()).optional(),
        notes: z.string().max(1000).optional(),
      }),
    ),
    skipDuplicates: z.boolean().default(true),
    updateExisting: z.boolean().default(false),
    source: z.string().default("import"),
  }),
}

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(", ")}`)
    }
    throw error
  }
}
