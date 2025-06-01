interface LogLevel {
  ERROR: 0
  WARN: 1
  INFO: 2
  DEBUG: 3
}

const LOG_LEVELS: LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
}

const currentLogLevel = process.env.NODE_ENV === "production" ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG

interface LogEntry {
  timestamp: string
  level: keyof LogLevel
  message: string
  data?: any
  userId?: string
  requestId?: string
  ip?: string
}

class Logger {
  private formatLog(entry: LogEntry): string {
    return JSON.stringify({
      ...entry,
      timestamp: new Date().toISOString(),
    })
  }

  private log(level: keyof LogLevel, message: string, data?: any, context?: Partial<LogEntry>) {
    if (LOG_LEVELS[level] > currentLogLevel) return

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      ...context,
    }

    const formattedLog = this.formatLog(entry)

    switch (level) {
      case "ERROR":
        console.error(formattedLog)
        break
      case "WARN":
        console.warn(formattedLog)
        break
      case "INFO":
        console.info(formattedLog)
        break
      case "DEBUG":
        console.debug(formattedLog)
        break
    }

    // In production, you might want to send logs to external service
    if (process.env.NODE_ENV === "production" && level === "ERROR") {
      // Send to error tracking service (e.g., Sentry)
      this.sendToErrorTracking(entry)
    }
  }

  private async sendToErrorTracking(entry: LogEntry) {
    // Implementation for external error tracking
    // e.g., Sentry, LogRocket, etc.
  }

  error(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log("ERROR", message, data, context)
  }

  warn(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log("WARN", message, data, context)
  }

  info(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log("INFO", message, data, context)
  }

  debug(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log("DEBUG", message, data, context)
  }

  // API-specific logging methods
  apiRequest(method: string, path: string, userId?: string, ip?: string) {
    this.info(`API Request: ${method} ${path}`, undefined, { userId, ip })
  }

  apiResponse(method: string, path: string, status: number, duration: number, userId?: string) {
    this.info(`API Response: ${method} ${path} - ${status} (${duration}ms)`, undefined, { userId })
  }

  apiError(method: string, path: string, error: any, userId?: string, ip?: string) {
    this.error(`API Error: ${method} ${path}`, error, { userId, ip })
  }
}

export const logger = new Logger()
