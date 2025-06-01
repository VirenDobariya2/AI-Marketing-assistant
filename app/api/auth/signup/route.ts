import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { hashPassword, generateOTP } from "@/lib/auth"
import { sendPasswordResetEmail } from "@/lib/email"
import { z } from "zod"
import { User } from "@/lib/models/User"

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = signupSchema.parse(body)

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
    }

    // Hash password and generate OTP
    const hashedPassword = await hashPassword(validatedData.password)
    const verificationToken = generateOTP()

    // Create user
    const user = new User({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
      verificationToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await user.save()

    // Send verification email
    await sendPasswordResetEmail(validatedData.email, verificationToken)

    return NextResponse.json({
      message: "User created successfully. Please check your email for verification code.",
      userId: result._id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
