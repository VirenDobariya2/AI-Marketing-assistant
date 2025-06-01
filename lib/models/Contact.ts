import mongoose, { type Document, Schema } from "mongoose"

export interface IContact extends Document {
  _id: string
  userId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  website?: string
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
  }
  tags: string[]
  segments: string[]
  status: "active" | "unsubscribed" | "bounced" | "complained"
  source: string
  customFields: Record<string, any>
  engagement: {
    emailsOpened: number
    emailsClicked: number
    lastEngagementDate?: Date
    score: number
  }
  preferences: {
    emailMarketing: boolean
    smsMarketing: boolean
    frequency: "daily" | "weekly" | "monthly"
  }
  notes: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    userId: { type: String, required: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    position: { type: String },
    website: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },
    tags: [{ type: String }],
    segments: [{ type: String }],
    status: { type: String, enum: ["active", "unsubscribed", "bounced", "complained"], default: "active" },
    source: { type: String, required: true },
    customFields: { type: Schema.Types.Mixed, default: {} },
    engagement: {
      emailsOpened: { type: Number, default: 0 },
      emailsClicked: { type: Number, default: 0 },
      lastEngagementDate: { type: Date },
      score: { type: Number, default: 0 },
    },
    preferences: {
      emailMarketing: { type: Boolean, default: true },
      smsMarketing: { type: Boolean, default: false },
      frequency: { type: String, enum: ["daily", "weekly", "monthly"], default: "weekly" },
    },
    notes: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
)

ContactSchema.index({ userId: 1, email: 1 }, { unique: true })
ContactSchema.index({ userId: 1, status: 1 })
ContactSchema.index({ userId: 1, tags: 1 })
ContactSchema.index({ userId: 1, segments: 1 })

export const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema)
