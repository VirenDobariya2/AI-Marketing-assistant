interface CacheEntry<T> {
  data: T
  expiry: number
}

class MemoryCache {
  private cache = new Map<string, CacheEntry<any>>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup()
      },
      5 * 60 * 1000,
    )
  }

  set<T>(key: string, data: T, ttlSeconds = 300): void {
    const expiry = Date.now() + ttlSeconds * 1000
    this.cache.set(key, { data, expiry })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    if (!entry) return false

    if (Date.now() > entry.expiry) {
      this.cache.delete(key)
      return false
    }

    return true
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key)
      }
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.clear()
  }
}

export const cache = new MemoryCache()

// Cache utility functions
export function cacheKey(...parts: (string | number)[]): string {
  return parts.join(":")
}

export async function withCache<T>(key: string, fetcher: () => Promise<T>, ttlSeconds = 300): Promise<T> {
  // Try to get from cache first
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  // Fetch fresh data
  const data = await fetcher()

  // Store in cache
  cache.set(key, data, ttlSeconds)

  return data
}

// Predefined cache keys and TTLs
export const cacheKeys = {
  user: (userId: string) => cacheKey("user", userId),
  contacts: (userId: string, filters: string) => cacheKey("contacts", userId, filters),
  campaigns: (userId: string, filters: string) => cacheKey("campaigns", userId, filters),
  analytics: (userId: string, period: string) => cacheKey("analytics", userId, period),
  templates: (category: string, page: number) => cacheKey("templates", category, page),
}

export const cacheTTL = {
  user: 300, // 5 minutes
  contacts: 60, // 1 minute
  campaigns: 60, // 1 minute
  analytics: 300, // 5 minutes
  templates: 600, // 10 minutes
  static: 3600, // 1 hour
}
