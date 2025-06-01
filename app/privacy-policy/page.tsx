"use client"

import { useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: May 15, 2023</p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section ref={addToRefs} className="py-12 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl prose dark:prose-invert">
              <h2>Introduction</h2>
              <p>
                LeadNest ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website and use our
                services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site or use our services.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, information we collect automatically when you
                use our services, and information from third-party sources.
              </p>

              <h3>Information You Provide to Us</h3>
              <p>We may collect personal information that you provide to us, such as:</p>
              <ul>
                <li>Name, email address, and contact information</li>
                <li>Billing information and payment details</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>Content you upload to our platform</li>
                <li>Communications with us</li>
                <li>Survey responses</li>
              </ul>

              <h3>Information We Collect Automatically</h3>
              <p>When you use our services, we may automatically collect certain information, including:</p>
              <ul>
                <li>Log information (IP address, browser type, pages visited, etc.)</li>
                <li>Device information</li>
                <li>Location information</li>
                <li>Usage information</li>
                <li>Cookies and similar technologies</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul>
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing transactions and sending related information</li>
                <li>Sending technical notices, updates, and administrative messages</li>
                <li>Responding to your comments, questions, and requests</li>
                <li>Providing customer service and support</li>
                <li>Sending marketing communications</li>
                <li>Monitoring and analyzing trends, usage, and activities</li>
                <li>Detecting, preventing, and addressing fraud and other illegal activities</li>
                <li>Personalizing and improving your experience</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h2>Sharing of Information</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul>
                <li>With service providers who perform services on our behalf</li>
                <li>With business partners with your consent</li>
                <li>In connection with a business transaction (e.g., merger, acquisition)</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>With your consent or at your direction</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, no method of transmission over the Internet or electronic storage is 100% secure,
                so we cannot guarantee absolute security.
              </p>

              <h2>Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul>
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
                <li>Withdrawal of consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>

              <h2>International Data Transfers</h2>
              <p>
                Your information may be transferred to, and processed in, countries other than the country in which you
                reside. These countries may have data protection laws that are different from the laws of your country.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to children under the age of 13, and we do not knowingly collect personal
                information from children under 13. If we learn that we have collected personal information from a child
                under 13, we will take steps to delete such information.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
                email or by posting a notice on our website prior to the change becoming effective.
              </p>

              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p>
                Email: privacy@leadnest.com
                <br />
                Address: 123 Marketing St, San Francisco, CA 94103
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={addToRefs} className="py-12 bg-muted scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold mb-4">Have Questions About Our Privacy Practices?</h2>
              <p className="text-muted-foreground mb-6">
                We're committed to transparency and are happy to answer any questions you may have about how we handle
                your data.
              </p>
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
