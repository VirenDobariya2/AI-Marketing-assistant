import mongoose, { type Document, Schema } from "mongoose"

export interface ITemplate extends Document {
  _id: string
  userId?: string // null for system templates
  name: string
  description: string
  category: string
  type: "email" | "sms" | "social"
  subject?: string
  content: string
  thumbnail?: string
  isPublic: boolean
  tags: string[]
  variables: Array<{
    name: string
    type: "text" | "number" | "date" | "url"
    required: boolean
    defaultValue?: string
    description?: string
  }>
  analytics: {
    timesUsed: number
    averageOpenRate: number
    averageClickRate: number
    lastUsedAt?: Date
  }
  settings: {
    responsive: boolean
    darkModeSupport: boolean
    preheaderText?: string
  }
  createdAt: Date
  updatedAt: Date
}

const TemplateSchema = new Schema<ITemplate>(
  {
    userId: { type: String, index: true }, // null for system templates
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "social"], default: "email" },
    subject: { type: String },
    content: { type: String, required: true },
    thumbnail: { type: String },
    isPublic: { type: Boolean, default: false },
    tags: [{ type: String }],
    variables: [
      {
        name: { type: String, required: true },
        type: { type: String, enum: ["text", "number", "date", "url"], default: "text" },
        required: { type: Boolean, default: false },
        defaultValue: { type: String },
        description: { type: String },
      },
    ],
    analytics: {
      timesUsed: { type: Number, default: 0 },
      averageOpenRate: { type: Number, default: 0 },
      averageClickRate: { type: Number, default: 0 },
      lastUsedAt: { type: Date },
    },
    settings: {
      responsive: { type: Boolean, default: true },
      darkModeSupport: { type: Boolean, default: false },
      preheaderText: { type: String },
    },
  },
  {
    timestamps: true,
  },
)

TemplateSchema.index({ userId: 1, category: 1 })
TemplateSchema.index({ isPublic: 1, category: 1 })
TemplateSchema.index({ tags: 1 })

export const Template = mongoose.models.Template || mongoose.model<ITemplate>("Template", TemplateSchema)
