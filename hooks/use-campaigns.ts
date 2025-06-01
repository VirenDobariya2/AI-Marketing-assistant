"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { toast } from "@/hooks/use-toast"

export interface Campaign {
  _id: string
  name: string
  subject: string
  content: string
  type: "email" | "sms" | "social"
  status: "draft" | "scheduled" | "sending" | "sent" | "paused" | "cancelled"
  recipients: {
    segments: string[]
    tags: string[]
    totalCount: number
  }
  scheduling: {
    type: "immediate" | "scheduled" | "automated"
    scheduledDate?: string
  }
  analytics: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    openRate: number
    clickRate: number
  }
  createdAt: string
  updatedAt: string
}

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getCampaigns()

      if (response.data) {
        setCampaigns(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch campaigns")
      }
    } catch (error) {
      setError("An error occurred while fetching campaigns")
    } finally {
      setLoading(false)
    }
  }

  const createCampaign = async (campaignData: Partial<Campaign>) => {
    try {
      const response = await apiClient.createCampaign(campaignData)

      if (response.data) {
        setCampaigns((prev) => [response.data, ...prev])
        toast({
          title: "Campaign Created",
          description: "Campaign has been created successfully",
        })
        return response.data
      } else {
        toast({
          title: "Failed to Create Campaign",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Failed to Create Campaign",
        description: "An error occurred while creating campaign",
        variant: "destructive",
      })
      return null
    }
  }

  const updateCampaign = async (id: string, campaignData: Partial<Campaign>) => {
    try {
      const response = await apiClient.updateCampaign(id, campaignData)

      if (response.data) {
        setCampaigns((prev) => prev.map((campaign) => (campaign._id === id ? response.data : campaign)))
        toast({
          title: "Campaign Updated",
          description: "Campaign has been updated successfully",
        })
        return response.data
      } else {
        toast({
          title: "Failed to Update Campaign",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Failed to Update Campaign",
        description: "An error occurred while updating campaign",
        variant: "destructive",
      })
      return null
    }
  }

  const deleteCampaign = async (id: string) => {
    try {
      const response = await apiClient.deleteCampaign(id)

      if (response.data) {
        setCampaigns((prev) => prev.filter((campaign) => campaign._id !== id))
        toast({
          title: "Campaign Deleted",
          description: "Campaign has been deleted successfully",
        })
        return true
      } else {
        toast({
          title: "Failed to Delete Campaign",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Failed to Delete Campaign",
        description: "An error occurred while deleting campaign",
        variant: "destructive",
      })
      return false
    }
  }

  const sendCampaign = async (id: string) => {
    try {
      const response = await apiClient.sendCampaign(id)

      if (response.data) {
        setCampaigns((prev) =>
          prev.map((campaign) => (campaign._id === id ? { ...campaign, status: "sending" as const } : campaign)),
        )
        toast({
          title: "Campaign Sent",
          description: "Campaign is being sent to recipients",
        })
        return true
      } else {
        toast({
          title: "Failed to Send Campaign",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Failed to Send Campaign",
        description: "An error occurred while sending campaign",
        variant: "destructive",
      })
      return false
    }
  }

  const duplicateCampaign = async (id: string) => {
    try {
      const response = await apiClient.duplicateCampaign(id)

      if (response.data) {
        setCampaigns((prev) => [response.data, ...prev])
        toast({
          title: "Campaign Duplicated",
          description: "Campaign has been duplicated successfully",
        })
        return response.data
      } else {
        toast({
          title: "Failed to Duplicate Campaign",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Failed to Duplicate Campaign",
        description: "An error occurred while duplicating campaign",
        variant: "destructive",
      })
      return null
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    sendCampaign,
    duplicateCampaign,
  }
}
