"use client"

import { useRef, useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Check, HelpCircle } from "lucide-react"

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
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

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-blue-100/80 mb-8">
                Choose the plan that's right for your business. All plans include a 14-day free trial.
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

        {/* Pricing Tables */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
              <div className="flex justify-center mb-12">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Basic Plan */}
                  <div
                    className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${
                      selectedPlan === "basic" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold">Basic</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$19</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perfect for small businesses just getting started.
                      </p>
                    </div>
                    <div className="mt-6 space-y-4 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Up to 1,000 contacts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">5 email campaigns per month</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Basic segmentation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Basic analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Email templates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Standard support</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto pt-6">
                      <Button
                        className="w-full"
                        variant={selectedPlan === "basic" ? "default" : "outline"}
                        onClick={() => handlePlanSelect("basic")}
                      >
                        {selectedPlan === "basic" ? "Selected" : "Select Plan"}
                      </Button>
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div
                    className={`flex flex-col rounded-lg border bg-card p-6 shadow-md relative ${
                      selectedPlan === "pro" ? "ring-2 ring-primary" : "border-primary"
                    }`}
                  >
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold">Pro</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$49</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For growing businesses that need more advanced capabilities.
                      </p>
                    </div>
                    <div className="mt-6 space-y-4 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Up to 10,000 contacts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited email campaigns</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Advanced segmentation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">AI content generation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Custom workflows</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Detailed analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">A/B testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Priority support</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto pt-6">
                      <Button className="w-full" onClick={() => handlePlanSelect("pro")}>
                        {selectedPlan === "pro" ? "Selected" : "Select Plan"}
                      </Button>
                    </div>
                  </div>

                  {/* Enterprise Plan */}
                  <div
                    className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${
                      selectedPlan === "enterprise" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold">Enterprise</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">Custom</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For established businesses with complex marketing needs.
                      </p>
                    </div>
                    <div className="mt-6 space-y-4 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited contacts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited campaigns</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Advanced AI features</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Custom integrations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Dedicated account manager</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Advanced analytics & reporting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Team collaboration tools</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">API access</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto pt-6">
                      <Link href="/contact">
                        <Button
                          className="w-full"
                          variant={selectedPlan === "enterprise" ? "default" : "outline"}
                          onClick={() => handlePlanSelect("enterprise")}
                        >
                          Contact Sales
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {selectedPlan && (
                  <div className="mt-8 text-center">
                    <Link href="/auth/signup">
                      <Button size="lg" className="gap-2">
                        Start 14-Day Free Trial
                      </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-2">No credit card required. Cancel anytime.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="annual" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Basic Plan Annual */}
                  <div
                    className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${
                      selectedPlan === "basic-annual" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold">Basic</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$15</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Perfect for small businesses just getting started.
                        <span className="block mt-1 text-xs text-primary">Billed annually ($180/year)</span>
                      </p>
                    </div>
                    <div className="mt-6 space-y-4 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Up to 1,000 contacts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">5 email campaigns per month</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Basic segmentation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Basic analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Email templates</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Standard support</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto pt-6">
                      <Button
                        className="w-full"
                        variant={selectedPlan === "basic-annual" ? "default" : "outline"}
                        onClick={() => handlePlanSelect("basic-annual")}
                      >
                        {selectedPlan === "basic-annual" ? "Selected" : "Select Plan"}
                      </Button>
                    </div>
                  </div>

                  {/* Pro Plan Annual */}
                  <div
                    className={`flex flex-col rounded-lg border bg-card p-6 shadow-md relative ${
                      selectedPlan === "pro-annual" ? "ring-2 ring-primary" : "border-primary"
                    }`}
                  >
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold">Pro</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$39</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For growing businesses that need more advanced capabilities.
                        <span className="block mt-1 text-xs text-primary">Billed annually ($468/year)</span>
                      </p>
                    </div>
                    <div className="mt-6 space-y-4 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Up to 10,000 contacts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited email campaigns</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Advanced segmentation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">AI content generation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Custom workflows</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Detailed analytics</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">A/B testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Priority support</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto pt-6">
                      <Button className="w-full" onClick={() => handlePlanSelect("pro-annual")}>
                        {selectedPlan === "pro-annual" ? "Selected" : "Select Plan"}
                      </Button>
                    </div>
                  </div>

                  {/* Enterprise Plan Annual */}
                  <div
                    className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${
                      selectedPlan === "enterprise-annual" ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold">Enterprise</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">Custom</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        For established businesses with complex marketing needs.
                      </p>
                    </div>
                    <div className="mt-6 space-y-4 flex-1">
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited contacts</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Unlimited campaigns</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Advanced AI features</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Custom integrations</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Dedicated account manager</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Advanced analytics & reporting</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">Team collaboration tools</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">API access</span>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-auto pt-6">
                      <Link href="/contact">
                        <Button
                          className="w-full"
                          variant={selectedPlan === "enterprise-annual" ? "default" : "outline"}
                          onClick={() => handlePlanSelect("enterprise-annual")}
                        >
                          Contact Sales
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {selectedPlan && (
                  <div className="mt-8 text-center">
                    <Link href="/auth/signup">
                      <Button size="lg" className="gap-2">
                        Start 14-Day Free Trial
                      </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-2">No credit card required. Cancel anytime.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Feature Comparison */}
        <section ref={addToRefs} className="py-20 bg-secondary/50 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Compare Plan Features
              </h2>
              <p className="text-muted-foreground md:text-xl">See which plan is right for your business needs</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Feature</th>
                    <th className="p-4 font-medium text-center">Basic</th>
                    <th className="p-4 font-medium text-center">Pro</th>
                    <th className="p-4 font-medium text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Contacts</td>
                    <td className="p-4 text-center">1,000</td>
                    <td className="p-4 text-center">10,000</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Email Campaigns</td>
                    <td className="p-4 text-center">5 / month</td>
                    <td className="p-4 text-center">Unlimited</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">AI Content Generation</td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">—</span>
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Live AI Chat Assistant</td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">—</span>
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Visual Campaign Builder</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Advanced</td>
                    <td className="p-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Contact Segmentation</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Advanced</td>
                    <td className="p-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Analytics</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Detailed</td>
                    <td className="p-4 text-center">Advanced</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">A/B Testing</td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">—</span>
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Custom Integrations</td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">—</span>
                    </td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">API Access</td>
                    <td className="p-4 text-center">
                      <span className="text-muted-foreground">—</span>
                    </td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Support</td>
                    <td className="p-4 text-center">Standard</td>
                    <td className="p-4 text-center">Priority</td>
                    <td className="p-4 text-center">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Find answers to common questions about our pricing and plans
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does the 14-day free trial work?</AccordionTrigger>
                  <AccordionContent>
                    Our 14-day free trial gives you full access to all features of your selected plan. No credit card is
                    required to start, and you can cancel anytime during the trial period with no obligation. At the end
                    of the trial, you'll be prompted to enter payment information to continue using the service.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I change plans later?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be
                    applied immediately and you'll be charged the prorated difference. If you downgrade, the new pricing
                    will take effect at the start of your next billing cycle.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What happens if I exceed my contact limit?</AccordionTrigger>
                  <AccordionContent>
                    If you approach your contact limit, we'll notify you so you can either remove contacts or upgrade to
                    a higher plan. We won't automatically charge you for exceeding your limit, and your existing
                    contacts will continue to be managed normally.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Do you offer discounts for nonprofits or educational institutions?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer special pricing for qualified nonprofits and educational institutions. Please contact
                    our sales team for more information and to verify your organization's eligibility.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal.
                    For Enterprise plans, we can also accommodate invoicing and bank transfers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>Is there a setup fee?</AccordionTrigger>
                  <AccordionContent>
                    No, there are no setup fees for any of our plans. You only pay the advertised monthly or annual
                    subscription price.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-12 text-center">
              <p className="mb-4">Still have questions?</p>
              <Link href="/contact">
                <Button variant="outline" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Contact Our Sales Team
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
                    Schedule a Demo
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
