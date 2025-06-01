
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""),
    })
  } catch (error) {
    console.error("Email sending failed:", error)
    throw new Error("Failed to send email")
  }
}

export async function sendWelcomeEmail(email: string, name: string, otp: string): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0c7ff2;">Welcome to LeadNest!</h1>
      <p>Hi ${name},</p>
      <p>Welcome to LeadNest! Please verify your email address with the OTP below:</p>
      <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; text-align: center;">
        <h2 style="color: #0c7ff2; font-size: 32px; letter-spacing: 4px;">${otp}</h2>
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>Best regards,<br>The LeadNest Team</p>
    </div>
  `

  await sendEmail({
    to: email,
    subject: "Welcome to LeadNest - Verify Your Email",
    html,
  })
}

export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0c7ff2;">Password Reset Request</h1>
      <p>You requested a password reset for your LeadNest account.</p>
      <p>Click the button below to reset your password:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background: #0c7ff2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p>If you didn't request this reset, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
      <p>Best regards,<br>The LeadNest Team</p>
    </div>
  `

  await sendEmail({
    to: email,
    subject: "LeadNest - Password Reset Request",
    html,
  })
}
