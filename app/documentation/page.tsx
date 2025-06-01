"use client"

import { useRef, useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, ChevronRight, FileText, Book, Code, Lightbulb, ArrowRight } from "lucide-react"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const scrollRevealRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1 },
    )

    scrollRevealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      scrollRevealRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !scrollRevealRefs.current.includes(el)) {
      scrollRevealRefs.current.push(el)
    }
  }

  const docCategories = [
    {
      title: "Getting Started",
      icon: <FileText className="h-5 w-5" />,
      docs: [
        { title: "Creating Your Account", link: "#" },
        { title: "Platform Overview", link: "#" },
        { title: "Importing Contacts", link: "#" },
        { title: "Setting Up Your First Campaign", link: "#" },
        { title: "Understanding Analytics", link: "#" },
      ],
    },
    {
      title: "AI Features",
      icon: <Lightbulb className="h-5 w-5" />,
      docs: [
        { title: "AI Personalization Engine", link: "#" },
        { title: "Using the AI Chat Assistant", link: "#" },
        { title: "AI Content Generation", link: "#" },
        { title: "Predictive Analytics", link: "#" },
        { title: "Automated Segmentation", link: "#" },
      ],
    },
    {
      title: "Campaign Management",
      icon: <Book className="h-5 w-5" />,
      docs: [
        { title: "Visual Campaign Builder", link: "#" },
        { title: "Email Templates", link: "#" },
        { title: "A/B Testing", link: "#" },
        { title: "Campaign Scheduling", link: "#" },
        { title: "Automation Workflows", link: "#" },
      ],
    },
    {
      title: "Integrations",
      icon: <Code className="h-5 w-5" />,
      docs: [
        { title: "CRM Integrations", link: "#" },
        { title: "E-commerce Platforms", link: "#" },
        { title: "Social Media Integration", link: "#" },
        { title: "API Documentation", link: "#" },
        { title: "Custom Webhooks", link: "#" },
      ],
    },
  ]

  const popularArticles = [
    { title: "How to Set Up Domain Authentication", link: "#" },
    { title: "Creating Dynamic Content with AI", link: "#" },
    { title: "Advanced Segmentation Strategies", link: "#" },
    { title: "Optimizing Email Deliverability", link: "#" },
    { title: "Understanding Campaign Analytics", link: "#" },
    { title: "Setting Up Automated Workflows", link: "#" },
  ]

  const videoTutorials = [
    { title: "Getting Started with LeadNest", duration: "5:32", link: "#" },
    { title: "Creating Your First Campaign", duration: "8:17", link: "#" },
    { title: "Advanced AI Personalization", duration: "12:45", link: "#" },
    { title: "Mastering Contact Segmentation", duration: "10:23", link: "#" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Documentation</h1>
              <p className="text-xl text-blue-100/80 mb-8">
                Everything you need to know about using LeadNest to its full potential.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div
              className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {docCategories.map((category, index) => (
                <div key={index} className="border rounded-lg p-6 bg-white">
                  <div className="flex items-center space-x-4">
                    {category.icon}
                    <h2 className="text-xl font-semibold">{category.title}</h2>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {category.docs.map((doc, docIndex) => (
                      <li key={docIndex} className="text-sm">
                        <Link href={doc.link} className="flex items-center justify-between">
                          {doc.title}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-6">Popular Articles</h2>
            <ul className="space-y-4">
              {popularArticles.map((article, index) => (
                <li key={index} className="text-sm">
                  <Link href={article.link} className="flex items-center justify-between">
                    {article.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Video Tutorials */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-6">Video Tutorials</h2>
            <ul className="space-y-4">
              {videoTutorials.map((tutorial, index) => (
                <li key={index} className="text-sm">
                  <Link href={tutorial.link} className="flex items-center justify-between">
                    {tutorial.title}
                    <span className="text-muted-foreground">{tutorial.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
