"use client"
import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SmoothScroll } from "@/components/smooth-scroll"
import { TeamHero3D } from "@/components/team/team-hero-3d"

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "CEO & Co-Founder",
    bio: "Alex has over 15 years of experience in marketing technology and previously founded two successful SaaS companies.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Sarah Chen",
    role: "CTO & Co-Founder",
    bio: "Sarah is an AI expert with a PhD in Machine Learning from MIT and previously led engineering teams at Google and OpenAI.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "Head of Product",
    bio: "Michael brings 10+ years of product management experience from leading marketing platforms like Mailchimp and HubSpot.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "Head of AI Research",
    bio: "Priya leads our AI research team, focusing on developing cutting-edge personalization algorithms and natural language processing.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Kim",
    role: "Head of Customer Success",
    bio: "David ensures our customers get the most out of LeadNest with his extensive background in customer experience and marketing strategy.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Emma Wilson",
    role: "Head of Marketing",
    bio: "Emma brings her creative vision and strategic expertise to LeadNest's marketing efforts, having previously led campaigns for major tech brands.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
]

const advisors = [
  {
    name: "Dr. Robert Chang",
    role: "AI Ethics Advisor",
    bio: "Dr. Chang is a leading expert in AI ethics and responsible technology development, ensuring LeadNest's AI systems are fair and transparent.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "#",
    },
  },
  {
    name: "Jennifer Lopez",
    role: "Marketing Strategy Advisor",
    bio: "Jennifer is a renowned marketing strategist who has helped scale multiple unicorn startups and Fortune 500 companies.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Thomas Wright",
    role: "Investment Advisor",
    bio: "Thomas brings 20+ years of experience in venture capital and has helped numerous SaaS companies navigate growth and funding strategies.",
    image: "/placeholder.svg?height=400&width=400",
    social: {
      linkedin: "#",
    },
  },
]

export default function TeamClientPage() {
  return (
    <SmoothScroll>
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28">
          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                  Our Amazing Team
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Meet the <span className="text-primary">Minds</span> Behind LeadNest
                </h1>
                <p className="text-xl text-muted-foreground">
                  We're a diverse team of experts passionate about transforming marketing through AI and innovation.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[400px] lg:h-[500px] relative"
              >
                <TeamHero3D />
              </motion.div>
            </div>
          </div>
        </section>
        {/* Team Members Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-12">
              Team Members
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <Card key={member.name}>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    {member.social.twitter && (
                      <Link href={member.social.twitter} target="_blank">
                        <Button variant="outline" className="mr-2">
                          <Twitter className="mr-2 h-4 w-4" />
                          Twitter
                        </Button>
                      </Link>
                    )}
                    {member.social.linkedin && (
                      <Link href={member.social.linkedin} target="_blank">
                        <Button variant="outline" className="mr-2">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </Button>
                      </Link>
                    )}
                    {member.social.github && (
                      <Link href={member.social.github} target="_blank">
                        <Button variant="outline">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Advisors Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center mb-12">Advisors</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {advisors.map((advisor) => (
                <Card key={advisor.name}>
                  <CardHeader>
                    <CardTitle>{advisor.name}</CardTitle>
                    <CardDescription>{advisor.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{advisor.bio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    {advisor.social.twitter && (
                      <Link href={advisor.social.twitter} target="_blank">
                        <Button variant="outline" className="mr-2">
                          <Twitter className="mr-2 h-4 w-4" />
                          Twitter
                        </Button>
                      </Link>
                    )}
                    {advisor.social.linkedin && (
                      <Link href={advisor.social.linkedin} target="_blank">
                        <Button variant="outline" className="mr-2">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </Button>
                      </Link>
                    )}
                    {advisor.social.github && (
                      <Link href={advisor.social.github} target="_blank">
                        <Button variant="outline">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  )
}
