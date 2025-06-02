import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

// Simple JWT validation without any database dependencies
function validateToken(token: string): boolean {
  try {
    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log("Middleware running for:", pathname)

  // Allow all static files and API routes to pass through
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }

  // Allow public pages
  const publicPaths = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/verify",
    "/features",
    "/pricing",
    "/blog",
    "/contact",
    "/team",
    "/faq",
    "/documentation",
    "/privacy-policy",
    "/terms",
  ]

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for authentication token for protected routes
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("auth-token")?.value

    if (!token || !validateToken(token)) {
      const url = new URL("/auth/signin", request.url)
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }
  }

  // Allow the request to continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
