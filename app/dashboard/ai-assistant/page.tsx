import { aiApi } from "@/lib/api-client"

// Add functions for AI operations:
const generateEmail = async (data: {
  type: string
  tone: string
  audience: string
  topic: string
  additionalContext?: string
}) => {
  try {
    const response = await aiApi.generateEmail(data)
    if (response.success && response.data) {
      return response.data
    }
  } catch (error: any) {
    toast({
      title: "Generation failed",
      description: error.message || "Please try again.",
      variant: "destructive",
    })
  }
}

const suggestReply = async (originalMessage: string, context?: string) => {
  try {
    const response = await aiApi.suggestReply({ originalMessage, context })
    if (response.success && response.data) {
      return response.data.suggestions
    }
  } catch (error: any) {
    toast({
      title: "Suggestion failed",
      description: error.message || "Please try again.",
      variant: "destructive",
    })
  }
}
