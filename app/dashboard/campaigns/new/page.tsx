"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Save, Calendar, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function NewCampaignPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    content: "",
    type: "email",
    scheduledAt: "",
    segments: [] as string[],
    tags: [] as string[],
  })

  const handleSubmit = async (status: "draft" | "scheduled") => {
    if (!formData.name || !formData.subject || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          scheduledAt: status === "scheduled" ? formData.scheduledAt : undefined,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Campaign ${status === "draft" ? "saved as draft" : "scheduled"} successfully`,
        })
        router.push("/dashboard/campaigns")
      } else {
        throw new Error("Failed to create campaign")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const generateAIContent = async () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Please enter a campaign name first",
        variant: "destructive",
      })
      return
    }

    setAiLoading(true)
    try {
      const response = await fetch("/api/ai/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Create an email campaign for: ${formData.name}`,
          tone: "professional",
          type: "promotional",
          includeSubjects: true,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev) => ({
          ...prev,
          content: data.content,
          subject: data.subjects[0] || prev.subject,
        }))
        toast({
          title: "Success",
          description: "AI content generated successfully",
        })
      } else {
        throw new Error("Failed to generate content")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate AI content",
        variant: "destructive",
      })
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Create New Campaign</h2>
          <p className="text-muted-foreground">Design and schedule your email marketing campaign</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>Configure your campaign settings and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="audience">Audience</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter campaign name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Enter email subject line"
                      value={formData.subject}
                      onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Campaign Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduledAt">Schedule (Optional)</Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, scheduledAt: e.target.value }))}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="content">Email Content *</Label>
                    <Button variant="outline" size="sm" onClick={generateAIContent} disabled={aiLoading}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      {aiLoading ? "Generating..." : "AI Generate"}
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    placeholder="Enter your email content here..."
                    className="min-h-[300px]"
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                  />
                </TabsContent>

                <TabsContent value="audience" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Segments</Label>
                    <div className="flex flex-wrap gap-2">
                      {["All Contacts", "New Subscribers", "Active Users", "High Value"].map((segment) => (
                        <Badge
                          key={segment}
                          variant={formData.segments.includes(segment) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              segments: prev.segments.includes(segment)
                                ? prev.segments.filter((s) => s !== segment)
                                : [...prev.segments, segment],
                            }))
                          }}
                        >
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Newsletter", "Promotion", "Product Update", "Event"].map((tag) => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              tags: prev.tags.includes(tag) ? prev.tags.filter((t) => t !== tag) : [...prev.tags, tag],
                            }))
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => handleSubmit("draft")} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleSubmit("scheduled")}
                disabled={loading || !formData.scheduledAt}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Campaign
              </Button>
              <Button className="w-full" variant="secondary" disabled={loading}>
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Subject:</strong> {formData.subject || "No subject"}
                </div>
                <div>
                  <strong>Type:</strong> {formData.type}
                </div>
                <div>
                  <strong>Segments:</strong> {formData.segments.length || "None"}
                </div>
                <div>
                  <strong>Content:</strong> {formData.content ? `${formData.content.slice(0, 100)}...` : "No content"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
