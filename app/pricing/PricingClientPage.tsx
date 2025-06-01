"use client"

import Link from "next/link"
import { Check, HelpCircle, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PricingHero3D } from "@/components/pricing/pricing-hero-3d"

const pricingPlans = {
  monthly: [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started with email marketing.",
      price: "$29",
      features: [
        { name: "Up to 5,000 contacts", included: true },
        { name: "Basic AI personalization", included: true },
        { name: "Email campaigns", included: true },
        { name: "Basic templates", included: true },
        { name: "Standard analytics", included: true },
        { name: "Email support", included: true },
        { name: "Advanced segmentation", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses looking to scale their marketing efforts.",
      price: "$79",
      features: [
        { name: "Up to 25,000 contacts", included: true },
        { name: "Advanced AI personalization", included: true },
        { name: "Email & SMS campaigns", included: true },
        { name: "Premium templates", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced segmentation", included: true },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring advanced features and dedicated support.",
      price: "$199",
      features: [
        { name: "Unlimited contacts", included: true },
        { name: "Enterprise AI personalization", included: true },
        { name: "Omnichannel campaigns", included: true },
        { name: "Custom templates", included: true },
        { name: "Enterprise analytics", included: true },
        { name: "24/7 phone & email support", included: true },
        { name: "Advanced segmentation", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ],
  annual: [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started with email marketing.",
      price: "$24",
      features: [
        { name: "Up to 5,000 contacts", included: true },
        { name: "Basic AI personalization", included: true },
        { name: "Email campaigns", included: true },
        { name: "Basic templates", included: true },
        { name: "Standard analytics", included: true },
        { name: "Email support", included: true },
        { name: "Advanced segmentation", included: false },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses looking to scale their marketing efforts.",
      price: "$65",
      features: [
        { name: "Up to 25,000 contacts", included: true },
        { name: "Advanced AI personalization", included: true },
        { name: "Email & SMS campaigns", included: true },
        { name: "Premium templates", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced segmentation", included: true },
        { name: "Custom integrations", included: false },
        { name: "Dedicated account manager", included: false },
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      description: "For large organizations requiring advanced features and dedicated support.",
      price: "$169",
      features: [
        { name: "Unlimited contacts", included: true },
        { name: "Enterprise AI personalization", included: true },
        { name: "Omnichannel campaigns", included: true },
        { name: "Custom templates", included: true },
        { name: "Enterprise analytics", included: true },
        { name: "24/7 phone & email support", included: true },
        { name: "Advanced segmentation", included: true },
        { name: "Custom integrations", included: true },
        { name: "Dedicated account manager", included: true },
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ],
}

export default function PricingClientPage() {
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
                  Transparent Pricing
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Choose the Perfect <span className="text-primary">Plan</span> for Your Business
                </h1>
                <p className="text-xl text-muted-foreground">
                  Flexible pricing options designed to scale with your business needs. No hidden fees, no surprises.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-[400px] lg:h-[500px] relative"
              >
                <PricingHero3D />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the plan that works best for your business. All plans include a 14-day free trial.
              </p>
            </motion.div>

            <Tabs defaultValue="monthly" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                  <TabsTrigger value="annual">Annual Billing (Save 20%)</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="monthly">
                <div className="grid md:grid-cols-3 gap-8">
                  {pricingPlans.monthly.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Card className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                            <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                              MOST POPULAR
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground ml-2">/month</span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <ul className="space-y-3">
                            {plan.features.map((feature) => (
                              <li key={feature.name} className="flex items-start">
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                )}
                                <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-4 w-4 ml-1.5 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60">
                                        {feature.name.includes("contacts")
                                          ? "The maximum number of contacts you can store and manage in your account."
                                          : feature.name.includes("AI personalization")
                                            ? "AI-powered tools to create personalized content for your audience."
                                            : feature.name.includes("campaigns")
                                              ? "Different types of marketing campaigns you can create and send."
                                              : feature.name.includes("templates")
                                                ? "Pre-designed templates for your marketing campaigns."
                                                : feature.name.includes("analytics")
                                                  ? "Tools to track and analyze your marketing performance."
                                                  : feature.name.includes("support")
                                                    ? "The level of customer support available to you."
                                                    : feature.name.includes("segmentation")
                                                      ? "Advanced tools to segment your audience for targeted campaigns."
                                                      : feature.name.includes("integrations")
                                                        ? "Ability to connect with other tools and platforms."
                                                        : "A dedicated expert to help you maximize your results."}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                            <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/signup"}>{plan.cta}</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="annual">
                <div className="grid md:grid-cols-3 gap-8">
                  {pricingPlans.annual.map((plan, i) => (
                    <motion.div
                      key={plan.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Card className={`h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                        {plan.popular && (
                          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                            <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                              MOST POPULAR
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle>{plan.name}</CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                          <div className="mt-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground ml-2">/month</span>
                            <div className="text-sm text-emerald-500 font-medium mt-1">
                              Save 20% with annual billing
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <ul className="space-y-3">
                            {plan.features.map((feature) => (
                              <li key={feature.name} className="flex items-start">
                                {feature.included ? (
                                  <Check className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" />
                                ) : (
                                  <X className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                                )}
                                <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-4 w-4 ml-1.5 text-muted-foreground" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="w-60">
                                        {feature.name.includes("contacts")
                                          ? "The maximum number of contacts you can store and manage in your account."
                                          : feature.name.includes("AI personalization")
                                            ? "AI-powered tools to create personalized content for your audience."
                                            : feature.name.includes("campaigns")
                                              ? "Different types of marketing campaigns you can create and send."
                                              : feature.name.includes("templates")
                                                ? "Pre-designed templates for your marketing campaigns."
                                                : feature.name.includes("analytics")
                                                  ? "Tools to track and analyze your marketing performance."
                                                  : feature.name.includes("support")
                                                    ? "The level of customer support available to you."
                                                    : feature.name.includes("segmentation")
                                                      ? "Advanced tools to segment your audience for targeted campaigns."
                                                      : feature.name.includes("integrations")
                                                        ? "Ability to connect with other tools and platforms."
                                                        : "A dedicated expert to help you maximize your results."}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                            <Link href={plan.name === "Enterprise" ? "/contact" : "/auth/signup"}>{plan.cta}</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Have questions about our pricing? Find answers to common questions below.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Can I change plans later?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be reflected in your next billing cycle.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes, all plans come with a 14-day free trial. No credit card required to start your trial.",
                },
                {
                  question: "What happens if I exceed my contact limit?",
                  answer:
                    "If you exceed your contact limit, we'll notify you and provide options to upgrade to a higher plan or remove contacts to stay within your limit.",
                },
                {
                  question: "Can I cancel my subscription?",
                  answer:
                    "Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your account until the end of your current billing period.",
                },
                {
                  question: "Do you offer discounts for nonprofits?",
                  answer:
                    "Yes, we offer special pricing for nonprofit organizations. Please contact our sales team for more information.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">Still have questions? We're here to help.</p>
              <Button asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of marketers who are already using LeadNest to create more effective, personalized
                campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth/signup">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  )
}
