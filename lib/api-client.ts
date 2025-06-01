// Client-side API utilities
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message)
    this.name = "APIError"
  }
}

export async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/api${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
    ...options,
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new APIError(errorData.error || "An error occurred", response.status, errorData.code)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError("Network error", 0)
  }
}

// Auth API calls
export const apiClient = {
  signin: (email: string, password: string) =>
    apiRequest("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  signup: (name: string, email: string, password: string, confirmPassword: string) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, confirmPassword }),
    }),

  verifyOTP: (email: string, otp: string) =>
    apiRequest("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
    }),

  forgotPassword: (email: string) =>
    apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (token: string, password: string) =>
    apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    }),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  getProfile: () => apiRequest("/user/profile"),
}

// Contacts API calls
export const contactsAPI = {
  getAll: () => apiRequest("/contacts"),
  create: (contact: any) =>
    apiRequest("/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    }),
  update: (id: string, contact: any) =>
    apiRequest(`/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(contact),
    }),
  delete: (id: string) =>
    apiRequest(`/contacts/${id}`, {
      method: "DELETE",
    }),
  import: (file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return apiRequest("/contacts/import", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    })
  },
}

// Campaigns API calls
export const campaignsAPI = {
  getAll: () => apiRequest("/campaigns"),
  getById: (id: string) => apiRequest(`/campaigns/${id}`),
  create: (campaign: any) =>
    apiRequest("/campaigns", {
      method: "POST",
      body: JSON.stringify(campaign),
    }),
  update: (id: string, campaign: any) =>
    apiRequest(`/campaigns/${id}`, {
      method: "PUT",
      body: JSON.stringify(campaign),
    }),
  delete: (id: string) =>
    apiRequest(`/campaigns/${id}`, {
      method: "DELETE",
    }),
  send: (id: string) =>
    apiRequest(`/campaigns/${id}/send`, {
      method: "POST",
    }),
  duplicate: (id: string) =>
    apiRequest(`/campaigns/${id}/duplicate`, {
      method: "POST",
    }),
}

// Templates API calls
export const templatesAPI = {
  getAll: () => apiRequest("/templates"),
  create: (template: any) =>
    apiRequest("/templates", {
      method: "POST",
      body: JSON.stringify(template),
    }),
  update: (id: string, template: any) =>
    apiRequest(`/templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(template),
    }),
  delete: (id: string) =>
    apiRequest(`/templates/${id}`, {
      method: "DELETE",
    }),
}

// AI API calls
export const aiAPI = {
  generateEmail: (prompt: string, context?: any) =>
    apiRequest("/ai/generate-email", {
      method: "POST",
      body: JSON.stringify({ prompt, context }),
    }),
  suggestReply: (emailContent: string, context?: any) =>
    apiRequest("/ai/suggest-reply", {
      method: "POST",
      body: JSON.stringify({ emailContent, context }),
    }),
  scoreContacts: (contacts: any[]) =>
    apiRequest("/ai/score-contacts", {
      method: "POST",
      body: JSON.stringify({ contacts }),
    }),
}

// Analytics API calls
export const analyticsAPI = {
  getDashboard: () => apiRequest("/analytics"),
  getCampaignStats: (campaignId: string) => apiRequest(`/analytics/campaigns/${campaignId}`),
}

// Billing API calls
export const billingAPI = {
  createCheckout: (priceId: string) =>
    apiRequest("/billing/create-checkout", {
      method: "POST",
      body: JSON.stringify({ priceId }),
    }),
}
