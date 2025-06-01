import crypto from "crypto"
import type { NextRequest } from "next/server"

// Security utilities
export class SecurityUtils {
  // Generate secure random token
  static generateSecureToken(length = 32): string {
    return crypto.randomBytes(length).toString("hex")
  }

  // Hash sensitive data
  static hashData(data: string, salt?: string): string {
    const actualSalt = salt || crypto.randomBytes(16).toString("hex")
    const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, "sha512")
    return `${actualSalt}:${hash.toString("hex")}`
  }

  // Verify hashed data
  static verifyHash(data: string, hash: string): boolean {
    const [salt, originalHash] = hash.split(":")
    const verifyHash = crypto.pbkdf2Sync(data, salt, 10000, 64, "sha512")
    return originalHash === verifyHash.toString("hex")
  }

  // Sanitize input to prevent XSS
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+=/gi, "")
      .trim()
  }

  // Validate webhook signature
  static verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex")
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  }

  // Generate API key
  static generateApiKey(): string {
    const prefix = "lnk_" // LeadNest Key
    const randomPart = crypto.randomBytes(24).toString("base64url")
    return `${prefix}${randomPart}`
  }

  // Mask sensitive data for logging
  static maskSensitiveData(data: any): any {
    const sensitiveFields = ["password", "token", "secret", "key", "apiKey", "email"]
    const masked = { ...data }

    for (const field of sensitiveFields) {
      if (masked[field]) {
        masked[field] = "***MASKED***"
      }
    }

    return masked
  }

  // Check for suspicious patterns
  static detectSuspiciousActivity(request: NextRequest): boolean {
    const userAgent = request.headers.get("user-agent") || ""
    const referer = request.headers.get("referer") || ""

    // Check for common bot patterns
    const botPatterns = [/bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i, /python/i, /php/i]

    if (botPatterns.some((pattern) => pattern.test(userAgent))) {
      return true
    }

    // Check for suspicious referers
    const suspiciousReferers = ["malicious-site.com", "spam-domain.net"]
    if (suspiciousReferers.some((domain) => referer.includes(domain))) {
      return true
    }

    return false
  }

  // Generate CSRF token
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString("base64url")
  }

  // Validate CSRF token
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(sessionToken))
  }
}

// Content Security Policy
export const cspHeader = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.openai.com https://api.stripe.com",
    "frame-src 'self' https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
}

// Security headers
export const securityHeaders = {
  ...cspHeader,
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
}
