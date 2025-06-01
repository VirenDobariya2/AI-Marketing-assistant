import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import type { NextRequest } from "next/server"
import { connectDB } from "./mongodb"
import { IUser, User } from "./models/User"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
const BCRYPT_SALT_ROUNDS = Number.parseInt(process.env.BCRYPT_SALT_ROUNDS || "12")

// Password Hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// JWT Token Handling
export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export function validateToken(token: string): boolean {
  return !!verifyToken(token)
}

// Get User from Token
export async function getUserFromToken(token: string): Promise<IUser | null> {
  const decoded = verifyToken(token)
  if (!decoded) return null

  await connectDB()
  const user = await User.findById(decoded.userId).lean()
  return user as IUser | null
}

// Generate OTP or Reset Token
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 32)
}

// Extract and Authenticate User from Request
export async function getAuthUser(request: NextRequest): Promise<IUser | null> {
  const token =
    request.headers.get("authorization")?.replace("Bearer ", "") ||
    request.cookies.get("auth-token")?.value

  if (!token) return null

  return await getUserFromToken(token)
}
