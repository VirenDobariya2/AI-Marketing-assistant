export interface User {
  _id: string
  name: string
  email: string
  role: "user" | "admin"
  isVerified: boolean
  subscription?: {
    plan: "starter" | "pro" | "business"
    status: "active" | "cancelled" | "past_due"
  }
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
  message?: string
}
