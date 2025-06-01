"use client"

import { useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Linkedin, Twitter, Mail } from "lucide-react"

export default function TeamPage() {
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

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Sarah has over 15 years of experience in marketing technology. Before founding LeadNest, she led product teams at major marketing platforms, where she identified the need for more accessible AI-powered tools for small businesses.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@leadnest.com",
      },
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-Founder",
      bio: "Michael brings deep expertise in AI and machine learning to LeadNest. With a PhD in Computer Science and previous roles at tech giants, he leads our engineering team in developing cutting-edge AI marketing solutions.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "michael@leadnest.com",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Chief Marketing Officer",
      bio: "Emily is a seasoned marketing executive with experience spanning both B2B and B2C sectors. She oversees LeadNest's marketing strategy and is passionate about helping businesses leverage AI to create more meaningful customer connections.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@leadnest.com",
      },
    },
    {
      name: "David Kim",
      role: "Head of Product",
      bio: "David leads product development at LeadNest, focusing on creating intuitive, powerful tools that solve real marketing challenges. His background in UX design and product management ensures our platform is both powerful and easy to use.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@leadnest.com",
      },
    },
    {
      name: "Jessica Lee",
      role: "Head of Customer Success",
      bio: "Jessica ensures our customers get maximum value from LeadNest. With her background in customer experience and marketing strategy, she leads a team dedicated to helping businesses achieve their marketing goals.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "jessica@leadnest.com",
      },
    },
    {
      name: "Robert Taylor",
      role: "Head of AI Research",
      bio: "Robert leads our AI research initiatives, constantly pushing the boundaries of what's possible with marketing automation. His team develops the algorithms that power LeadNest's personalization and optimization features.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "robert@leadnest.com",
      },
    },
    {
      name: "Sophia Martinez",
      role: "Head of Sales",
      bio: "Sophia brings over a decade of experience in SaaS sales to LeadNest. She leads our sales team with a consultative approach, ensuring that each customer finds the right solution for their unique marketing needs.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sophia@leadnest.com",
      },
    },
    {
      name: "James Wilson",
      role: "Head of Partnerships",
      bio: "James manages LeadNest's strategic partnerships and integrations. His background in business development helps us build relationships that enhance our platform's capabilities and reach.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "james@leadnest.com",
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">Meet Our Team</h1>
              <p className="text-xl text-blue-100/80 mb-8">
                The passionate people behind LeadNest who are dedicated to transforming marketing for small businesses.
              </p>
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

        {/* Our Mission */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Our Mission</h2>
              <p className="text-xl mb-8">
                At LeadNest, we're on a mission to democratize advanced marketing technology. We believe that small
                businesses deserve the same powerful AI-driven tools that were previously only accessible to large
                corporations with big budgets.
              </p>
              <p className="text-xl mb-8">
                Our team combines expertise in artificial intelligence, marketing strategy, and user experience design
                to create a platform that makes sophisticated marketing simple and accessible for everyone.
              </p>
              <p className="text-xl">
                We're passionate about helping businesses of all sizes build meaningful connections with their audiences
                and achieve remarkable growth through smart, automated marketing.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section ref={addToRefs} className="py-20 bg-secondary/50 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Leadership Team</h2>
              <p className="text-muted-foreground md:text-xl">
                Meet the experienced leaders guiding LeadNest's vision and growth
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{member.bio}</p>
                    <div className="flex gap-2">
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </Button>
                      </a>
                      <a href={`mailto:${member.social.email}`}>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our Team</h2>
              <p className="text-muted-foreground md:text-xl">The talented individuals who make LeadNest possible</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(4).map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="object-cover w-full h-full transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{member.bio}</p>
                    <div className="flex gap-2">
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </Button>
                      </a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </Button>
                      </a>
                      <a href={`mailto:${member.social.email}`}>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section ref={addToRefs} className="py-20 bg-secondary/50 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Our Values</h2>
              <p className="text-muted-foreground md:text-xl">The principles that guide everything we do at LeadNest</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Innovation",
                  description:
                    "We constantly push the boundaries of what's possible with marketing technology, leveraging the latest advances in AI to create powerful, accessible tools.",
                },
                {
                  title: "Accessibility",
                  description:
                    "We believe advanced marketing tools should be accessible to businesses of all sizes, not just those with enterprise budgets and dedicated teams.",
                },
                {
                  title: "Customer Success",
                  description:
                    "Our success is measured by our customers' success. We're committed to providing the support, education, and tools needed for our users to thrive.",
                },
                {
                  title: "Integrity",
                  description:
                    "We believe in ethical marketing practices and transparent communication. We help our customers build authentic relationships with their audiences.",
                },
                {
                  title: "Continuous Improvement",
                  description:
                    "We're never satisfied with the status quo. We constantly seek feedback and iterate on our platform to better serve our customers' evolving needs.",
                },
                {
                  title: "Collaboration",
                  description:
                    "We believe the best solutions come from diverse perspectives working together. We foster a collaborative environment both internally and with our customers.",
                },
              ].map((value, index) => (
                <Card key={index} className="border bg-card shadow-sm transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Join Our Team</h2>
              <p className="text-xl mb-8">
                We're always looking for talented, passionate people to join our mission of transforming marketing for
                small businesses. If you're excited about AI, marketing, and creating tools that help businesses grow,
                we'd love to hear from you.
              </p>
              <Link href="/careers">
                <Button size="lg" className="gap-2">
                  View Open Positions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={addToRefs} className="py-20 bg-primary text-primary-foreground scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Marketing?
                </h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join thousands of small businesses already using LeadNest to grow their audience and boost
                  conversions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/auth/signup">
                  <Button size="lg" variant="secondary" className="gap-2">
                    Start Free Trial
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
              <p className="text-sm mt-4">No credit card required for 14-day trial</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
