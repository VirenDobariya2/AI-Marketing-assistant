import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"
import { connectDB } from "./mongodb"
import { User } from "./models/User"

const JWT_SECRET = process.env.JWT_SECRET!

export interface TokenPayload {
  userId: string
  email: string
  role?: string
  iat?: number
  exp?: number
}

export function validateToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    return null
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get("authorization")
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  // Check cookies
  const tokenCookie = request.cookies.get("auth-token")
  if (tokenCookie?.value) {
    return tokenCookie.value
  }

  return null
}

export function isAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request)
  if (!token) return false

  const payload = validateToken(token)
  return payload !== null
}

export function getUserFromRequest(request: NextRequest): TokenPayload | null {
  const token = getTokenFromRequest(request)
  if (!token) return null

  return validateToken(token)
}

export async function getUserFromDatabase(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) return null

    await connectDB()
    const dbUser = await User.findById(user.userId).select("-password")
    return dbUser
  } catch (error) {
    console.error("Error fetching user from database:", error)
    return null
  }
}
