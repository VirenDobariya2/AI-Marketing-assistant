import mongoose, { Schema, Document } from "mongoose";
import type { ObjectId } from "mongodb";

export interface IUser extends Document {
  _id: ObjectId | string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isVerified: boolean;
  otp?: string;
  otpExpires?: Date;
  verificationToken?: string;
  resetToken?: string;
  resetTokenExpires?: Date;
  subscription?: {
    status: "active" | "cancelled" | "past_due";
    plan: "starter" | "pro" | "business";
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodEnd?: Date;
  };
  profile?: {
    company?: string;
    website?: string;
    phone?: string;
    industry?: string;
    teamSize?: string;
    avatar?: string;
    timezone?: string;
  };
  preferences?: {
    emailNotifications: boolean;
    marketingEmails: boolean;
    timezone: string;
    language: string;
    theme?: "light" | "dark" | "system";
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    subscription: {
      status: { type: String, enum: ["active", "cancelled", "past_due"], default: "active" },
      plan: { type: String, enum: ["starter", "pro", "business"], default: "starter" },
      stripeCustomerId: { type: String },
      stripeSubscriptionId: { type: String },
      currentPeriodEnd: { type: Date },
    },
    profile: {
      company: { type: String },
      website: { type: String },
      phone: { type: String },
      industry: { type: String },
      teamSize: { type: String },
      avatar: { type: String },
      timezone: { type: String },
    },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      marketingEmails: { type: Boolean, default: true },
      timezone: { type: String, default: "UTC" },
      language: { type: String, default: "en" },
      theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ resetToken: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
