import { logger } from "./logger"

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  tags?: Record<string, string>
}

interface HealthCheck {
  service: string
  status: "healthy" | "unhealthy" | "degraded"
  responseTime?: number
  error?: string
  timestamp: number
}

class MonitoringService {
  private metrics: PerformanceMetric[] = []
  private healthChecks: Map<string, HealthCheck> = new Map()

  // Record performance metric
  recordMetric(name: string, value: number, tags?: Record<string, string>) {
    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      tags,
    }

    this.metrics.push(metric)

    // Keep only last 1000 metrics in memory
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000)
    }

    logger.debug(`Metric recorded: ${name} = ${value}`, { tags })
  }

  // Record API response time
  recordApiResponseTime(endpoint: string, method: string, statusCode: number, duration: number) {
    this.recordMetric("api_response_time", duration, {
      endpoint,
      method,
      status_code: statusCode.toString(),
    })
  }

  // Record database query time
  recordDbQueryTime(operation: string, collection: string, duration: number) {
    this.recordMetric("db_query_time", duration, {
      operation,
      collection,
    })
  }

  // Record AI API usage
  recordAiApiUsage(model: string, tokens: number, duration: number) {
    this.recordMetric("ai_api_tokens", tokens, { model })
    this.recordMetric("ai_api_duration", duration, { model })
  }

  // Record email delivery
  recordEmailDelivery(type: string, status: "sent" | "failed" | "bounced") {
    this.recordMetric("email_delivery", 1, { type, status })
  }

  // Health check for database
  async checkDatabaseHealth(): Promise<HealthCheck> {
    const startTime = Date.now()
    try {
      // Simple database ping
      const { connectDB } = await import("./mongodb")
      const db = await connectDB()
      await db.admin().ping()

      const responseTime = Date.now() - startTime
      const healthCheck: HealthCheck = {
        service: "database",
        status: responseTime < 1000 ? "healthy" : "degraded",
        responseTime,
        timestamp: Date.now(),
      }

      this.healthChecks.set("database", healthCheck)
      return healthCheck
    } catch (error) {
      const healthCheck: HealthCheck = {
        service: "database",
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: Date.now(),
      }

      this.healthChecks.set("database", healthCheck)
      return healthCheck
    }
  }

  // Health check for OpenAI API
  async checkOpenAiHealth(): Promise<HealthCheck> {
    const startTime = Date.now()
    try {
      // Simple API test
      const response = await fetch("https://api.openai.com/v1/models", {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      })

      const responseTime = Date.now() - startTime
      const healthCheck: HealthCheck = {
        service: "openai",
        status: response.ok ? "healthy" : "degraded",
        responseTime,
        timestamp: Date.now(),
      }

      this.healthChecks.set("openai", healthCheck)
      return healthCheck
    } catch (error) {
      const healthCheck: HealthCheck = {
        service: "openai",
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: Date.now(),
      }

      this.healthChecks.set("openai", healthCheck)
      return healthCheck
    }
  }

  // Health check for email service
  async checkEmailHealth(): Promise<HealthCheck> {
    try {
      // Test SMTP connection
      const nodemailer = await import("nodemailer")
      const transporter = nodemailer.createTransporter({
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.verify()

      const healthCheck: HealthCheck = {
        service: "email",
        status: "healthy",
        timestamp: Date.now(),
      }

      this.healthChecks.set("email", healthCheck)
      return healthCheck
    } catch (error) {
      const healthCheck: HealthCheck = {
        service: "email",
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: Date.now(),
      }

      this.healthChecks.set("email", healthCheck)
      return healthCheck
    }
  }

  // Get all health checks
  async getAllHealthChecks(): Promise<Record<string, HealthCheck>> {
    await Promise.all([this.checkDatabaseHealth(), this.checkOpenAiHealth(), this.checkEmailHealth()])

    return Object.fromEntries(this.healthChecks)
  }

  // Get system metrics
  getSystemMetrics() {
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000

    const recentMetrics = this.metrics.filter((m) => m.timestamp > oneHourAgo)

    const metricsByName = recentMetrics.reduce(
      (acc, metric) => {
        if (!acc[metric.name]) {
          acc[metric.name] = []
        }
        acc[metric.name].push(metric.value)
        return acc
      },
      {} as Record<string, number[]>,
    )

    const aggregated = Object.entries(metricsByName).map(([name, values]) => ({
      name,
      count: values.length,
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      p95: this.percentile(values, 0.95),
      p99: this.percentile(values, 0.99),
    }))

    return {
      period: "1h",
      metrics: aggregated,
      totalMetrics: recentMetrics.length,
    }
  }

  private percentile(values: number[], p: number): number {
    const sorted = values.sort((a, b) => a - b)
    const index = Math.ceil(sorted.length * p) - 1
    return sorted[index] || 0
  }

  // Alert on critical metrics
  checkAlerts() {
    const metrics = this.getSystemMetrics()

    for (const metric of metrics.metrics) {
      // Alert on high API response times
      if (metric.name === "api_response_time" && metric.p95 > 5000) {
        logger.error(`High API response time detected: P95 = ${metric.p95}ms`)
      }

      // Alert on high database query times
      if (metric.name === "db_query_time" && metric.p95 > 2000) {
        logger.error(`High database query time detected: P95 = ${metric.p95}ms`)
      }

      // Alert on email delivery failures
      if (metric.name === "email_delivery" && metric.avg < 0.9) {
        logger.error(`Low email delivery rate detected: ${(metric.avg * 100).toFixed(1)}%`)
      }
    }

    // Check service health
    for (const [service, health] of this.healthChecks) {
      if (health.status === "unhealthy") {
        logger.error(`Service ${service} is unhealthy: ${health.error}`)
      }
    }
  }
}

export const monitoring = new MonitoringService()

// Middleware to track API performance
export function withMonitoring<T>(operation: string, fn: () => Promise<T>, tags?: Record<string, string>): Promise<T> {
  const startTime = Date.now()

  return fn()
    .then((result) => {
      const duration = Date.now() - startTime
      monitoring.recordMetric(operation, duration, tags)
      return result
    })
    .catch((error) => {
      const duration = Date.now() - startTime
      monitoring.recordMetric(`${operation}_error`, duration, tags)
      throw error
    })
}
