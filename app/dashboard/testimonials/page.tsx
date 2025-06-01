"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, MoreHorizontal, Search, Edit, Trash, Upload, ImageIcon, Eye, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function TestimonialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
  })

  const handleAddTestimonial = () => {
    // Simulating adding a testimonial
    toast({
      title: "Testimonial Added",
      description: "The testimonial has been successfully added.",
    })
    setIsAddingTestimonial(false)
    setNewTestimonial({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
    })
  }

  const testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "GrowFast",
      content:
        "LeadNest has transformed how we approach email campaigns. Our open rates have increased by 35% and we're saving hours each week on content creation.",
      rating: 5,
      date: "June 15, 2023",
      status: "Published",
      avatar: "SJ",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Founder",
      company: "TechStart",
      content:
        "As a small business owner, I don't have time for complex marketing tools. LeadNest makes it simple to create professional campaigns that actually convert.",
      rating: 5,
      date: "June 8, 2023",
      status: "Published",
      avatar: "MC",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "E-commerce Manager",
      company: "StyleShop",
      content:
        "The segmentation features are incredible. We can now target customers based on their actual behaviors and preferences, resulting in a 28% increase in sales.",
      rating: 4,
      date: "May 28, 2023",
      status: "Published",
      avatar: "ER",
    },
    {
      id: "4",
      name: "David Kim",
      role: "Digital Strategist",
      company: "ConsultPro",
      content:
        "The AI-generated content suggestions have been spot on. It's like having an expert copywriter on our team without the additional headcount.",
      rating: 5,
      date: "May 22, 2023",
      status: "Published",
      avatar: "DK",
    },
    {
      id: "5",
      name: "Jessica Lee",
      role: "CMO",
      company: "InnoTech",
      content:
        "We've tried several marketing automation tools, but LeadNest offers the perfect balance of powerful features and user-friendly interface. Highly recommended!",
      rating: 4,
      date: "May 15, 2023",
      status: "Pending",
      avatar: "JL",
    },
  ]

  const filteredTestimonials = testimonials.filter((testimonial) => {
    return (
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">Manage customer testimonials and reviews to showcase on your website</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddingTestimonial} onOpenChange={setIsAddingTestimonial}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Testimonial</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Testimonial</DialogTitle>
                <DialogDescription>Add a new customer testimonial to showcase on your website.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      placeholder="Customer Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      placeholder="Job Title"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newTestimonial.company}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Testimonial</Label>
                  <Textarea
                    id="content"
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                    placeholder="What did they say about your product or service?"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewTestimonial({ ...newTestimonial, rating })}
                        className="text-muted-foreground hover:text-yellow-400"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            rating <= newTestimonial.rating ? "fill-yellow-400 text-yellow-400" : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Customer Photo (optional)</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
                    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop an image or click to browse</p>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingTestimonial(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleAddTestimonial}>
                  Add Testimonial
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Testimonials</CardTitle>
          <CardDescription>Manage and publish customer testimonials to build social proof</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="relative w-full md:w-96 mb-4 md:mb-0">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search testimonials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredTestimonials.length === 0 ? (
              <div className="md:col-span-2 text-center py-12">
                <p className="text-muted-foreground">No testimonials found. Try adjusting your search.</p>
              </div>
            ) : (
              filteredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Badge variant={testimonial.status === "Published" ? "outline" : "secondary"}>
                          {testimonial.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {testimonial.status === "Published" ? (
                                <>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Unpublish</span>
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  <span>Publish</span>
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <blockquote className="text-sm italic mb-2">"{testimonial.content}"</blockquote>
                    <p className="text-xs text-muted-foreground">Added on {testimonial.date}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
