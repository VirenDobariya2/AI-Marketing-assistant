import { type NextRequest, NextResponse } from "next/server"
import { rateLimits } from "./lib/rate-limit"
import { SecurityUtils, securityHeaders } from "./lib/security"
import { logger } from "./lib/logger"
import { validateToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const startTime = Date.now()
  const { pathname } = request.nextUrl

  // Skip middleware for static files, internal Next.js routes, public routes, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/api/docs") ||
    pathname === "/" ||
    pathname === "/auth/signin" ||
    pathname === "/auth/signup" ||
    pathname === "/auth/forgot-password" ||
    pathname === "/auth/verify" ||
    pathname === "/features" ||
    pathname === "/pricing" ||
    pathname === "/blog" ||
    pathname === "/contact" ||
    pathname === "/team" ||
    pathname === "/faq" ||
    pathname === "/documentation" ||
    pathname === "/privacy-policy" ||
    pathname === "/terms" ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  try {
    // Security checks
    if (SecurityUtils.detectSuspiciousActivity(request)) {
      logger.warn("Suspicious activity detected", {
        ip: request.ip,
        userAgent: request.headers.get("user-agent"),
        path: pathname,
      })
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // Apply rate limiting for API routes
    if (pathname.startsWith("/api/")) {
      const limitType = pathname.startsWith("/api/auth/") ? "auth" : pathname.startsWith("/api/ai/") ? "ai" : "api"

      const rateLimitResult = await rateLimits[limitType](request)

      if (!rateLimitResult.success) {
        logger.warn(`Rate limit exceeded: ${pathname}`, {
          ip: request.ip,
          retryAfter: rateLimitResult.retryAfter,
        })

        return NextResponse.json(
          { error: rateLimitResult.error },
          {
            status: 429,
            headers: {
              "Retry-After": rateLimitResult.retryAfter?.toString() || "60",
              "X-RateLimit-Remaining": "0",
            },
          },
        )
      }
    }

    // Check for authentication token
    const token = request.cookies.get("authToken")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }

    const payload = await validateToken(token)

    // Add user info to headers for use in API routes
    const response = NextResponse.next()
    response.headers.set("X-User-ID", payload.userId)
    response.headers.set("X-User-Email", payload.email)

    // Add security headers
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    // Add performance headers
    const duration = Date.now() - startTime
    response.headers.set("X-Response-Time", `${duration}ms`)

    // Log request
    logger.info(`${request.method} ${pathname}`, {
      ip: request.ip,
      userAgent: request.headers.get("user-agent"),
      duration,
    })

    return response
  } catch (error) {
    logger.error("Middleware error", error, {
      path: pathname,
      ip: request.ip,
    })

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
