import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  role: "user" | "admin"
  isVerified: boolean
  verificationToken?: string
  resetToken?: string
  resetTokenExpiry?: Date
  subscription?: {
    plan: "starter" | "pro" | "business"
    status: "active" | "inactive" | "cancelled"
    stripeCustomerId?: string
    stripeSubscriptionId?: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date,
    },
    subscription: {
      plan: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "cancelled"],
        default: "inactive",
      },
      stripeCustomerId: String,
      stripeSubscriptionId: String,
    },
  },
  {
    timestamps: true,
  },
)

// Remove all indexing to prevent Edge Runtime issues
// Indexes will be created manually in MongoDB or via migration scripts

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
