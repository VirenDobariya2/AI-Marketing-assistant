"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FeaturesHero3D } from "@/components/features/features-hero-3d"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function FeaturesPageClient() {
  return (
    <SmoothScroll>
      <SiteHeader/>
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
                  Powerful AI-Driven Features
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Supercharge Your <span className="text-primary">Marketing</span> with LeadNest
                </h1>
                <p className="text-xl text-muted-foreground">
                  Our AI-powered platform helps you create personalized marketing campaigns that convert leads into
                  loyal customers.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <Button size="lg" asChild>
                    <Link href="/auth/signup">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/documentation">View Documentation</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[400px] lg:h-[500px] relative"
              >
                <FeaturesHero3D />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Tabs */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Core Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                LeadNest offers a comprehensive suite of tools designed to elevate your marketing efforts
              </p>
            </motion.div>

            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-12">
                <TabsTrigger value="ai">AI Engine</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="segmentation">Segmentation</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 h-[400px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* This would be replaced with a 3D animation component */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse flex items-center justify-center">
                          <Zap className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">AI Personalization Engine</h3>
                    <p className="text-muted-foreground mb-6">
                      Our advanced AI analyzes customer data to create hyper-personalized marketing messages that
                      resonate with your audience on an individual level.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Smart content generation based on user preferences",
                        "Predictive analytics for optimal send times",
                        "Sentiment analysis to gauge customer reactions",
                        "Automated A/B testing for continuous improvement",
                        "Natural language processing for conversational marketing",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="email">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4">Email Deliverability</h3>
                    <p className="text-muted-foreground mb-6">
                      Ensure your messages reach the inbox with our advanced email deliverability tools and best
                      practices.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "SPF, DKIM, and DMARC authentication setup",
                        "Reputation monitoring and improvement tools",
                        "Bounce management and list cleaning",
                        "Deliverability testing across major email clients",
                        "Real-time delivery reporting and analytics",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-8 h-[400px] flex items-center justify-center order-1 md:order-2">
                    {/* Email visualization placeholder */}
                    <div className="w-full max-w-md bg-background rounded-lg shadow-lg p-4">
                      <div className="h-6 w-32 bg-muted rounded mb-4"></div>
                      <div className="h-4 w-full bg-muted rounded mb-2"></div>
                      <div className="h-4 w-5/6 bg-muted rounded mb-2"></div>
                      <div className="h-4 w-4/6 bg-muted rounded mb-6"></div>
                      <div className="h-32 w-full bg-muted/50 rounded mb-4"></div>
                      <div className="h-10 w-32 bg-primary rounded"></div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="segmentation">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl p-8 h-[400px] flex items-center justify-center">
                    {/* Segmentation visualization */}
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-20 rounded-lg ${
                            i % 3 === 0
                              ? "bg-purple-200 dark:bg-purple-900/30"
                              : i % 3 === 1
                                ? "bg-purple-300 dark:bg-purple-800/40"
                                : "bg-purple-400 dark:bg-purple-700/50"
                          } flex items-center justify-center`}
                        >
                          <div className="h-8 w-8 rounded-full bg-background"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Contact Segmentation Algorithms</h3>
                    <p className="text-muted-foreground mb-6">
                      Divide your audience into highly targeted segments for more effective and personalized marketing
                      campaigns.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Behavioral segmentation based on user actions",
                        "Demographic and psychographic profiling",
                        "Engagement-based segmentation",
                        "Purchase history and product interest analysis",
                        "Dynamic segments that update in real-time",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="tracking">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4">User Behavior Tracking</h3>
                    <p className="text-muted-foreground mb-6">
                      Gain deep insights into how your audience interacts with your content and campaigns.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Website activity tracking with heatmaps",
                        "Email engagement metrics (opens, clicks, forwards)",
                        "Customer journey mapping across touchpoints",
                        "Conversion funnel analysis and optimization",
                        "Privacy-compliant tracking methods",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-8 h-[400px] flex items-center justify-center order-1 md:order-2">
                    {/* Tracking visualization */}
                    <div className="w-full max-w-md">
                      <div className="grid grid-cols-1 gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                            <div
                              className={`h-6 rounded bg-green-200 dark:bg-green-900/30`}
                              style={{ width: `${(5 - i) * 15 + 10}%` }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="templates">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-8 h-[400px] flex items-center justify-center">
                    {/* Templates visualization */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-background rounded-lg shadow-md p-3">
                          <div className="h-4 w-20 bg-muted rounded mb-2"></div>
                          <div className="h-3 w-full bg-muted rounded mb-1"></div>
                          <div className="h-3 w-5/6 bg-muted rounded mb-3"></div>
                          <div className="h-16 w-full bg-muted/50 rounded mb-2"></div>
                          <div className="h-6 w-16 bg-primary rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">Template Optimization</h3>
                    <p className="text-muted-foreground mb-6">
                      Create stunning, high-converting templates that adapt to your brand and audience preferences.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Responsive design for all devices and email clients",
                        "AI-powered content suggestions and improvements",
                        "Dynamic content blocks that personalize for each recipient",
                        "Template performance analytics and recommendations",
                        "Drag-and-drop editor with advanced customization options",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="analytics">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-4">In-depth Analytics with Benchmarks</h3>
                    <p className="text-muted-foreground mb-6">
                      Measure your performance against industry standards and make data-driven decisions.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Real-time campaign performance dashboards",
                        "Industry and competitor benchmarking",
                        "Revenue attribution modeling",
                        "Predictive analytics for future campaign planning",
                        "Custom report builder with shareable insights",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-purple-600/5 rounded-2xl p-8 h-[400px] flex items-center justify-center order-1 md:order-2">
                    {/* Analytics visualization */}
                    <div className="w-full max-w-md">
                      <div className="flex justify-between mb-4">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div
                              className="w-8 bg-primary/80 rounded-t-sm"
                              style={{ height: `${Math.random() * 80 + 40}px` }}
                            ></div>
                            <div className="h-4 w-4 bg-muted rounded mt-2"></div>
                          </div>
                        ))}
                      </div>
                      <div className="h-px w-full bg-border mb-6"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-muted rounded"></div>
                        <div className="h-4 w-5/6 bg-muted rounded"></div>
                        <div className="h-4 w-4/6 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Implementations</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Powerful tools designed to transform your marketing strategy and boost your results
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Visual Campaign Builder",
                  description:
                    "Create stunning campaigns with our intuitive drag-and-drop interface that requires no coding knowledge.",
                  icon: "🎨",
                },
                {
                  title: "Live AI Chat Assistant",
                  description:
                    "Get real-time help and suggestions from our AI assistant as you build and optimize your campaigns.",
                  icon: "🤖",
                },
                {
                  title: "Gamification",
                  description:
                    "Engage your audience with interactive elements, rewards, and challenges that boost participation.",
                  icon: "🎮",
                },
                {
                  title: "Built-in Templates",
                  description:
                    "Start quickly with our library of professionally designed templates for various industries and goals.",
                  icon: "📝",
                },
                {
                  title: "In-depth Analytics",
                  description:
                    "Track performance with comprehensive analytics that provide actionable insights for improvement.",
                  icon: "📊",
                },
                {
                  title: "AI Personalization Engine",
                  description:
                    "Deliver hyper-personalized content to each recipient based on their behavior and preferences.",
                  icon: "✨",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="text-4xl mb-2">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="group" asChild>
                        <Link href="/documentation">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of marketers who are already using LeadNest to create more effective, personalized
                campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </SmoothScroll>
  )
}
