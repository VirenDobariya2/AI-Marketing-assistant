import mongoose, { type Document, Schema } from "mongoose"

export interface ICampaign extends Document {
  _id: string
  userId: string
  name: string
  subject: string
  content: string
  type: "email" | "sms" | "social"
  status: "draft" | "scheduled" | "sending" | "sent" | "paused" | "cancelled"
  recipients: {
    segments: string[]
    tags: string[]
    excludeSegments?: string[]
    excludeTags?: string[]
    totalCount: number
  }
  scheduling: {
    type: "immediate" | "scheduled" | "automated"
    scheduledDate?: Date
    timezone?: string
    automation?: {
      trigger: string
      conditions: any[]
    }
  }
  settings: {
    trackOpens: boolean
    trackClicks: boolean
    unsubscribeLink: boolean
    personalizeSubject: boolean
    aiOptimization: boolean
  }
  analytics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    bounced: number
    unsubscribed: number
    complained: number
    openRate: number
    clickRate: number
    conversionRate: number
  }
  abTest?: {
    enabled: boolean
    variant: "A" | "B"
    testSubject?: string
    testContent?: string
    winnerCriteria: "open_rate" | "click_rate"
    testDuration: number
  }
  template?: {
    id: string
    name: string
  }
  createdAt: Date
  updatedAt: Date
}

const CampaignSchema = new Schema<ICampaign>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "social"], default: "email" },
    status: { type: String, enum: ["draft", "scheduled", "sending", "sent", "paused", "cancelled"], default: "draft" },
    recipients: {
      segments: [{ type: String }],
      tags: [{ type: String }],
      excludeSegments: [{ type: String }],
      excludeTags: [{ type: String }],
      totalCount: { type: Number, default: 0 },
    },
    scheduling: {
      type: { type: String, enum: ["immediate", "scheduled", "automated"], default: "immediate" },
      scheduledDate: { type: Date },
      timezone: { type: String, default: "UTC" },
      automation: {
        trigger: { type: String },
        conditions: [{ type: Schema.Types.Mixed }],
      },
    },
    settings: {
      trackOpens: { type: Boolean, default: true },
      trackClicks: { type: Boolean, default: true },
      unsubscribeLink: { type: Boolean, default: true },
      personalizeSubject: { type: Boolean, default: false },
      aiOptimization: { type: Boolean, default: false },
    },
    analytics: {
      sent: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      clicked: { type: Number, default: 0 },
      bounced: { type: Number, default: 0 },
      unsubscribed: { type: Number, default: 0 },
      complained: { type: Number, default: 0 },
      openRate: { type: Number, default: 0 },
      clickRate: { type: Number, default: 0 },
      conversionRate: { type: Number, default: 0 },
    },
    abTest: {
      enabled: { type: Boolean, default: false },
      variant: { type: String, enum: ["A", "B"] },
      testSubject: { type: String },
      testContent: { type: String },
      winnerCriteria: { type: String, enum: ["open_rate", "click_rate"], default: "open_rate" },
      testDuration: { type: Number, default: 24 }, // hours
    },
    template: {
      id: { type: String },
      name: { type: String },
    },
  },
  {
    timestamps: true,
  },
)

CampaignSchema.index({ userId: 1, status: 1 })
CampaignSchema.index({ userId: 1, createdAt: -1 })

export const Campaign = mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema)
