import type { NextRequest } from "next/server"

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(config: RateLimitConfig) {
  return async (request: NextRequest, identifier?: string) => {
    const key =
      identifier ||
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "anonymous"
    const now = Date.now()
    const windowStart = now - config.windowMs

    // Clean up old entries
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k)
      }
    }

    const current = rateLimitStore.get(key)

    if (!current || current.resetTime < now) {
      // First request or window expired
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return { success: true, remaining: config.maxRequests - 1 }
    }

    if (current.count >= config.maxRequests) {
      return {
        success: false,
        error: config.message || "Too many requests",
        retryAfter: Math.ceil((current.resetTime - now) / 1000),
      }
    }

    current.count++
    return { success: true, remaining: config.maxRequests - current.count }
  }
}

// Predefined rate limit configurations
export const rateLimits = {
  auth: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: "Too many authentication attempts, please try again later",
  }),
  api: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100,
    message: "API rate limit exceeded",
  }),
  ai: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    message: "AI generation rate limit exceeded",
  }),
  upload: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    message: "Upload rate limit exceeded",
  }),
}
