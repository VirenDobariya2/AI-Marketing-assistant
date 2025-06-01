"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

export interface AnalyticsData {
  overview: {
    totalContacts: number
    totalCampaigns: number
    totalEmailsSent: number
    averageOpenRate: number
    averageClickRate: number
    conversionRate: number
  }
  campaignPerformance: Array<{
    name: string
    sent: number
    opened: number
    clicked: number
    openRate: number
    clickRate: number
    date: string
  }>
  contactGrowth: Array<{
    date: string
    contacts: number
    newContacts: number
  }>
  topPerformingCampaigns: Array<{
    name: string
    openRate: number
    clickRate: number
    sent: number
  }>
  segmentPerformance: Array<{
    segment: string
    contacts: number
    openRate: number
    clickRate: number
  }>
  timeBasedMetrics: Array<{
    hour: number
    opens: number
    clicks: number
  }>
}

export function useAnalytics(timeRange = "30d") {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async (range = timeRange) => {
    try {
      setLoading(true)
      const response = await apiClient.getAnalytics(range)

      if (response.data) {
        setAnalytics(response.data as AnalyticsData)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch analytics")
      }
    } catch (error) {
      setError("An error occurred while fetching analytics")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics(timeRange)
  }, [timeRange])

  return {
    analytics,
    loading,
    error,
    fetchAnalytics,
  }
}
