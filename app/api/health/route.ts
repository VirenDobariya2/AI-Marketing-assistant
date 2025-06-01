import { NextResponse } from "next/server"
import { monitoring } from "@/lib/monitoring"
import { cache } from "@/lib/cache"

export async function GET() {
  try {
    const healthChecks = await monitoring.getAllHealthChecks()
    const systemMetrics = monitoring.getSystemMetrics()
    const cacheStats = cache.getStats()

    const overallStatus = Object.values(healthChecks).every((check) => check.status === "healthy")
      ? "healthy"
      : Object.values(healthChecks).some((check) => check.status === "unhealthy")
        ? "unhealthy"
        : "degraded"

    return NextResponse.json({
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV,
      services: healthChecks,
      metrics: systemMetrics,
      cache: cacheStats,
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
