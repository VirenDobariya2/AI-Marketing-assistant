"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { toast } from "@/hooks/use-toast"

export interface Contact {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  tags: string[]
  segments: string[]
  status: "active" | "unsubscribed" | "bounced" | "complained"
  source: string
  engagement: {
    emailsOpened: number
    emailsClicked: number
    score: number
  }
  createdAt: string
  updatedAt: string
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async (params?: any) => {
    try {
      setLoading(true)
      const response = await apiClient.getContacts(params)

      if (response.data) {
        setContacts(response.data)
        setError(null)
      } else {
        setError(response.error || "Failed to fetch contacts")
      }
    } catch (error) {
      setError("An error occurred while fetching contacts")
    } finally {
      setLoading(false)
    }
  }

  const createContact = async (contactData: Omit<Contact, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await apiClient.createContact(contactData)

      if (response.data) {
        setContacts((prev) => [response.data, ...prev])
        toast({
          title: "Contact Created",
          description: "Contact has been created successfully",
        })
        return response.data
      } else {
        toast({
          title: "Failed to Create Contact",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Failed to Create Contact",
        description: "An error occurred while creating contact",
        variant: "destructive",
      })
      return null
    }
  }

  const updateContact = async (id: string, contactData: Partial<Contact>) => {
    try {
      const response = await apiClient.updateContact(id, contactData)

      if (response.data) {
        setContacts((prev) => prev.map((contact) => (contact._id === id ? response.data : contact)))
        toast({
          title: "Contact Updated",
          description: "Contact has been updated successfully",
        })
        return response.data
      } else {
        toast({
          title: "Failed to Update Contact",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Failed to Update Contact",
        description: "An error occurred while updating contact",
        variant: "destructive",
      })
      return null
    }
  }

  const deleteContact = async (id: string) => {
    try {
      const response = await apiClient.deleteContact(id)

      if (response.data) {
        setContacts((prev) => prev.filter((contact) => contact._id !== id))
        toast({
          title: "Contact Deleted",
          description: "Contact has been deleted successfully",
        })
        return true
      } else {
        toast({
          title: "Failed to Delete Contact",
          description: response.error || "An error occurred",
          variant: "destructive",
        })
        return false
      }
    } catch (error) {
      toast({
        title: "Failed to Delete Contact",
        description: "An error occurred while deleting contact",
        variant: "destructive",
      })
      return false
    }
  }

  const importContacts = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await apiClient.importContacts(formData)

      if (response.data) {
        await fetchContacts() // Refresh contacts list
        toast({
          title: "Contacts Imported",
          description: `Successfully imported ${response.data.count} contacts`,
        })
        return response.data
      } else {
        toast({
          title: "Import Failed",
          description: response.error || "An error occurred during import",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "An error occurred while importing contacts",
        variant: "destructive",
      })
      return null
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    importContacts,
  }
}
