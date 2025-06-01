"use client"

import { useRef, useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Search } from "lucide-react"

export default function FAQPage() {
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

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I sign up for LeadNest?",
          answer:
            "Signing up for LeadNest is easy! Simply click the 'Sign Up' button on our homepage, enter your email address and create a password, and you'll be guided through the setup process. You can start with a 14-day free trial with no credit card required.",
        },
        {
          question: "Do I need a credit card to start the free trial?",
          answer:
            "No, you don't need a credit card to start your 14-day free trial. You'll only be asked for payment information if you decide to continue using LeadNest after the trial period ends.",
        },
        {
          question: "How long does it take to set up LeadNest?",
          answer:
            "Most users can set up their LeadNest account in just a few minutes. After signing up, you'll be guided through a simple onboarding process that includes importing your contacts, setting up your first campaign, and customizing your settings.",
        },
        {
          question: "Can I import my existing contacts?",
          answer:
            "Yes, LeadNest makes it easy to import your existing contacts from CSV files, Excel spreadsheets, or directly from other popular marketing platforms and CRMs. Our import wizard will guide you through mapping your fields and ensuring your data is transferred correctly.",
        },
        {
          question: "What kind of support is available during setup?",
          answer:
            "All new users have access to our comprehensive knowledge base, video tutorials, and email support. Pro and Enterprise plan users also receive priority support and personalized onboarding assistance.",
        },
      ],
    },
    {
      title: "Features & Functionality",
      faqs: [
        {
          question: "What is the AI Personalization Engine?",
          answer:
            "Our AI Personalization Engine analyzes your contacts' behavior, preferences, and engagement patterns to automatically generate personalized content for each segment of your audience. This includes email subject lines, body content, CTAs, and even optimal send times, resulting in higher open and conversion rates.",
        },
        {
          question: "How does the Visual Campaign Builder work?",
          answer:
            "The Visual Campaign Builder is our drag-and-drop interface that allows you to create beautiful, responsive email campaigns without any coding knowledge. Simply select from pre-designed components, customize them to match your brand, and arrange them in your desired layout.",
        },
        {
          question: "What is the Live AI Chat Assistant?",
          answer:
            "The Live AI Chat Assistant is your marketing co-pilot that provides real-time guidance and suggestions as you create campaigns. It can answer questions about platform features, suggest improvements to your content, and provide data-driven insights to optimize your marketing strategy.",
        },
        {
          question: "How does contact segmentation work?",
          answer:
            "LeadNest's advanced segmentation allows you to group contacts based on demographics, behavior, engagement level, purchase history, and custom fields. Our AI algorithms can also automatically create dynamic segments based on patterns it identifies in your data, helping you target the right audience with the right message.",
        },
        {
          question: "What analytics and reporting features are available?",
          answer:
            "LeadNest provides comprehensive analytics including open rates, click rates, conversion tracking, revenue attribution, geographical data, device statistics, and more. You can view this data through customizable dashboards and generate detailed reports to track your marketing performance over time.",
        },
      ],
    },
    {
      title: "Billing & Pricing",
      faqs: [
        {
          question: "How does pricing work?",
          answer:
            "LeadNest offers three main pricing tiers: Basic, Pro, and Enterprise. Pricing is based primarily on the number of contacts in your account and the features you need. You can choose to pay monthly or annually, with annual plans offering a 20% discount.",
        },
        {
          question: "Can I change my plan later?",
          answer:
            "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be applied immediately and you'll be charged the prorated difference. If you downgrade, the new pricing will take effect at the start of your next billing cycle.",
        },
        {
          question: "What happens if I exceed my contact limit?",
          answer:
            "If you approach your contact limit, we'll notify you so you can either remove contacts or upgrade to a higher plan. We won't automatically charge you for exceeding your limit, and your existing contacts will continue to be managed normally.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "We offer a 30-day money-back guarantee for new customers. If you're not satisfied with LeadNest within the first 30 days after your initial purchase, contact our support team for a full refund.",
        },
        {
          question: "Do you offer discounts for nonprofits or educational institutions?",
          answer:
            "Yes, we offer special pricing for qualified nonprofits and educational institutions. Please contact our sales team for more information and to verify your organization's eligibility.",
        },
      ],
    },
    {
      title: "Technical Questions",
      faqs: [
        {
          question: "Is LeadNest compatible with my existing tools?",
          answer:
            "LeadNest integrates with a wide range of popular business tools including CRM systems (Salesforce, HubSpot, etc.), e-commerce platforms (Shopify, WooCommerce, etc.), content management systems, and analytics tools. We also offer an API for custom integrations.",
        },
        {
          question: "How secure is my data with LeadNest?",
          answer:
            "We take data security very seriously. LeadNest uses industry-standard encryption for all data, both in transit and at rest. We maintain strict access controls, regular security audits, and compliance with major data protection regulations including GDPR and CCPA.",
        },
        {
          question: "Can I use my own domain for sending emails?",
          answer:
            "Yes, we recommend using your own domain for sending emails to improve deliverability and brand recognition. LeadNest provides easy-to-follow instructions for setting up domain authentication (SPF, DKIM, and DMARC records).",
        },
        {
          question: "What is your uptime guarantee?",
          answer:
            "LeadNest guarantees 99.9% uptime for our platform. In the rare event of service disruptions, we provide real-time status updates and work diligently to resolve issues as quickly as possible.",
        },
        {
          question: "Can I access LeadNest on mobile devices?",
          answer:
            "Yes, LeadNest is fully responsive and works on all modern mobile devices. You can create campaigns, monitor performance, and manage your contacts from your smartphone or tablet. We also offer dedicated mobile apps for iOS and Android for an optimized experience.",
        },
      ],
    },
    {
      title: "Support & Training",
      faqs: [
        {
          question: "What kind of customer support do you offer?",
          answer:
            "All LeadNest customers have access to our comprehensive knowledge base, community forum, and email support. Pro plan customers receive priority email support with faster response times, while Enterprise customers get dedicated account managers and phone support.",
        },
        {
          question: "Do you offer training for new users?",
          answer:
            "Yes, we provide a variety of training resources including video tutorials, webinars, and step-by-step guides. Pro and Enterprise customers also receive personalized onboarding sessions to help them get the most out of LeadNest.",
        },
        {
          question: "What are your support hours?",
          answer:
            "Our standard email support is available Monday through Friday, 9am to 6pm Eastern Time. Pro and Enterprise customers with priority support receive extended hours and faster response times. Our knowledge base and community forum are available 24/7.",
        },
        {
          question: "Do you offer consulting services?",
          answer:
            "Yes, we offer professional services including strategy consulting, campaign optimization, custom integration development, and advanced training. These services are available at additional cost and can be customized to your specific needs.",
        },
        {
          question: "How can I request a new feature?",
          answer:
            "We welcome feature requests from our customers! You can submit suggestions through our product feedback portal, where other users can vote on and discuss ideas. Our product team regularly reviews these suggestions and incorporates them into our development roadmap.",
        },
      ],
    },
  ]

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqCategories

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-blue-100/80 mb-8">
                Find answers to common questions about LeadNest and how it can help your business.
              </p>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
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

        {/* FAQ Categories */}
        <section ref={addToRefs} className="py-20 scroll-reveal">
          <div className="container px-4 md:px-6">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  Try a different search term or browse our categories below.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="space-y-16">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold">{category.title}</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground">{faq.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section ref={addToRefs} className="py-20 bg-secondary/50 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl mb-8">
                Our team is here to help. Reach out to us and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="gap-2">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/documentation">
                  <Button size="lg" variant="outline" className="gap-2">
                    View Documentation
                  </Button>
                </Link>
              </div>
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
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    View Pricing
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
