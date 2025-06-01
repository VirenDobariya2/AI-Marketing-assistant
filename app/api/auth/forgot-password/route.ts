import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import { generateOTP } from "@/lib/auth"
import { sendEmail } from "@/lib/email"
import { User } from "@/lib/models/User"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      // Don't reveal if user exists or not
      return NextResponse.json({
        message: "If an account with that email exists, we sent a password reset code.",
      })
    }

    // Generate reset token
    const resetToken = generateOTP()
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Update user with reset token
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: resetExpires,
          updatedAt: new Date(),
        },
      },
    )

    // Send reset email
    await sendEmail({
      to: email,
      subject: "LeadNest - Password Reset Request",
      html: `<p>Your password reset code is: <strong>${resetToken}</strong></p>`,
    })

    return NextResponse.json({
      message: "If an account with that email exists, we sent a password reset code.",
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 })
    }

    console.error("Forgot password error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
