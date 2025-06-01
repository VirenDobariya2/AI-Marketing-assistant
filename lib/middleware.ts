// import { type NextRequest, NextResponse } from "next/server"
// import { rateLimits } from "./rate-limit"
// import { logger } from "./logger"
// import { getAuthUser } from "./auth"

// export async function withRateLimit(
//   request: NextRequest,
//   handler: (request: NextRequest) => Promise<NextResponse>,
//   limitType: keyof typeof rateLimits = "api",
// ) {
//   const startTime = Date.now()
//   const method = request.method
//   const path = request.nextUrl.pathname

//   try {
//     // Apply rate limiting
//     const rateLimitResult = await rateLimits[limitType](request)

//     if (!rateLimitResult.success) {
//       logger.warn(`Rate limit exceeded: ${method} ${path}`, {
//         ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
//         retryAfter: rateLimitResult.retryAfter,
//       })

//       return NextResponse.json(
//         { error: rateLimitResult.error },
//         {
//           status: 429,  
//           headers: {
//             "Retry-After": rateLimitResult.retryAfter?.toString() || "60",
//             "X-RateLimit-Remaining": "0",
//           },
//         },
//       )
//     }

//     // Log API request
//     const user = await getAuthUser(request).catch(() => null)
//     logger.apiRequest(
//       method,
//       path,
//       user?._id?.toString(),
//       request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
//     )

//     // Execute handler
//     const response = await handler(request)
//     const duration = Date.now() - startTime

//     // Log API response
//     logger.apiResponse(method, path, response.status, duration, user?._id?.toString())

//     // Add rate limit headers if needed (currently not implemented here)

//     return response
//   } catch (error) {
//     const duration = Date.now() - startTime
//     logger.apiError(
//       method,
//       path,
//       error,
//       undefined,
//       request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
//     )

//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }

// export async function withAuth(
//   request: NextRequest,
//   handler: (request: NextRequest, user: any) => Promise<NextResponse>,
// ) {
//   try {
//     const user = await getAuthUser(request)

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//     }

//     return handler(request, user)
//   } catch (error) {
//     logger.error("Authentication error", error)
//     return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
//   }
// }

// export function withCors(response: NextResponse, origin?: string) {
//   const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [process.env.NEXT_PUBLIC_APP_URL!]

//   if (origin && allowedOrigins.includes(origin)) {
//     response.headers.set("Access-Control-Allow-Origin", origin)
//   }

//   response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//   response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
//   response.headers.set("Access-Control-Max-Age", "86400")

//   return response
// }

import { type NextRequest, NextResponse } from "next/server";
import { rateLimits } from "./rate-limit";
import { logger } from "./logger";
import { getAuthUser } from "./auth";


export async function middleware(request: NextRequest) {
  const startTime = Date.now();
  const method = request.method;
  const path = request.nextUrl.pathname;

  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimits.api(request); // using 'api' limitType by default

    if (!rateLimitResult.success) {
      logger.warn(`Rate limit exceeded: ${method} ${path}`, {
        ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
        retryAfter: rateLimitResult.retryAfter,
      });

      return NextResponse.json(
        { error: rateLimitResult.error },
        {
          status: 429,
          headers: {
            "Retry-After": rateLimitResult.retryAfter?.toString() || "60",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    // Log API request
    const user = await getAuthUser(request).catch(() => null);
    logger.apiRequest(
      method,
      path,
      user?._id?.toString(),
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    );

    // Let the request proceed to the actual handler
    return NextResponse.next();

  } catch (error) {
    const duration = Date.now() - startTime;
    logger.apiError(
      method,
      path,
      error,
      undefined,
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    );

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const config = {
  matcher: "/api/special/:path*",
};


