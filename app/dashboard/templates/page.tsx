"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Search, Filter, Eye, Edit, Copy, Trash2, Star, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Template {
  _id: string
  name: string
  description?: string
  subject: string
  content: string
  category: string
  type: string
  isPublic: boolean
  usageCount: number
  rating: {
    average: number
    count: number
  }
  tags: string[]
  createdAt: string
  updatedAt: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    subject: "",
    content: "",
    category: "other",
    type: "email",
    isPublic: false,
    tags: [] as string[],
  })
  const { toast } = useToast()

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "newsletter", label: "Newsletter" },
    { value: "promotional", label: "Promotional" },
    { value: "transactional", label: "Transactional" },
    { value: "welcome", label: "Welcome" },
    { value: "announcement", label: "Announcement" },
    { value: "other", label: "Other" },
  ]

  useEffect(() => {
    fetchTemplates()
  }, [selectedCategory, searchTerm])

  const fetchTemplates = async () => {
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        includePublic: "true",
      })

      const response = await fetch(`/api/templates?${params}`)
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch templates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTemplate = async () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTemplate),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Template created successfully",
        })
        setShowCreateDialog(false)
        setNewTemplate({
          name: "",
          description: "",
          subject: "",
          content: "",
          category: "other",
          type: "email",
          isPublic: false,
          tags: [],
        })
        fetchTemplates()
      } else {
        throw new Error("Failed to create template")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      })
    }
  }

  const handleUseTemplate = async (template: Template) => {
    try {
      // Increment usage count
      await fetch(`/api/templates/${template._id}/use`, {
        method: "POST",
      })

      // Navigate to campaign creation with template data
      const templateData = {
        name: `Campaign from ${template.name}`,
        subject: template.subject,
        content: template.content,
        templateId: template._id,
      }

      localStorage.setItem("campaignTemplate", JSON.stringify(templateData))
      window.location.href = "/dashboard/campaigns/new"
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to use template",
        variant: "destructive",
      })
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      newsletter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      promotional: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      transactional: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      welcome: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      announcement: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      other: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    }
    return colors[category as keyof typeof colors] || colors.other
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
            <p className="text-muted-foreground">Manage your email templates and browse the library</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
          <p className="text-muted-foreground">Manage your email templates and browse the library</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>Create a reusable email template for your campaigns</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name *</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter template name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-category">Category</Label>
                  <Select
                    value={newTemplate.category}
                    onValueChange={(value) => setNewTemplate((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-subject">Subject Line *</Label>
                <Input
                  id="template-subject"
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="Email subject line"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-content">Content *</Label>
                <Textarea
                  id="template-content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Email content..."
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="template-public"
                  checked={newTemplate.isPublic}
                  onCheckedChange={(checked) => setNewTemplate((prev) => ({ ...prev, isPublic: checked }))}
                />
                <Label htmlFor="template-public">Make this template public</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>Create Template</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="my">My Templates</TabsTrigger>
          <TabsTrigger value="public">Public Library</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template._id} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.description && (
                        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                      )}
                    </div>
                    <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Subject:</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{template.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Content Preview:</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.content}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{template.usageCount} uses</span>
                      </div>
                      {template.rating.count > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating.average.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" onClick={() => handleUseTemplate(template)}>
                        Use Template
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates
              .filter((template) => !template.isPublic)
              .map((template) => (
                <Card key={template._id} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.description && (
                          <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Subject:</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{template.subject}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Used {template.usageCount} times</span>
                        <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                      </div>
                      <Button size="sm" className="w-full" onClick={() => handleUseTemplate(template)}>
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="public" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates
              .filter((template) => template.isPublic)
              .map((template) => (
                <Card key={template._id} className="group hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.description && (
                          <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                        )}
                      </div>
                      <Badge variant="secondary">Public</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium">Subject:</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{template.subject}</p>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>{template.usageCount} uses</span>
                        </div>
                        {template.rating.count > 0 && (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating.average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <Button size="sm" className="w-full" onClick={() => handleUseTemplate(template)}>
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {templates.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first template to get started"}
          </p>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}
    </div>
  )
}
