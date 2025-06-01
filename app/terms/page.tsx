"use client"

import { useRef, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TermsPage() {
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
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: May 15, 2023</p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section ref={addToRefs} className="py-12 scroll-reveal">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl prose dark:prose-invert">
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing or using LeadNest's services, website, or any applications made available by LeadNest
                (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not
                agree to these Terms, you may not access or use the Service.
              </p>

              <h2>2. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of any material changes
                by posting the updated Terms on our website or by sending you an email. Your continued use of the
                Service after such modifications will constitute your acknowledgment of the modified Terms.
              </p>

              <h2>3. Account Registration</h2>
              <p>
                To use certain features of the Service, you must register for an account. You agree to provide accurate,
                current, and complete information during the registration process and to update such information to keep
                it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your password and for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2>4. Subscription and Payments</h2>
              <p>
                Some aspects of the Service may be provided on a subscription basis. You agree to pay all fees
                associated with your subscription plan. Fees are non-refundable except as required by law or as
                explicitly stated in these Terms.
              </p>
              <p>
                We may change our subscription fees at any time. We will give you reasonable notice of any such changes.
                If you do not agree to the changes, you may cancel your subscription before the changes take effect.
              </p>

              <h2>5. User Content</h2>
              <p>
                Our Service allows you to upload, store, and share content, including but not limited to text, graphics,
                videos, and other materials ("User Content"). You retain all rights in, and are solely responsible for,
                the User Content you upload to the Service.
              </p>
              <p>
                By uploading User Content to the Service, you grant us a worldwide, non-exclusive, royalty-free license
                to use, reproduce, modify, adapt, publish, translate, distribute, and display such User Content in
                connection with providing the Service.
              </p>

              <h2>6. Prohibited Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use the Service for any illegal purpose or in violation of any laws</li>
                <li>Violate or infringe other people's intellectual property, privacy, or other rights</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                <li>Attempt to gain unauthorized access to the Service or other users' accounts</li>
                <li>Use the Service to send spam, chain letters, or other unsolicited communications</li>
                <li>Use the Service to distribute viruses or other malicious code</li>
                <li>
                  Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or
                  entity
                </li>
              </ul>

              <h2>7. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are owned by LeadNest and are
                protected by international copyright, trademark, patent, trade secret, and other intellectual property
                or proprietary rights laws.
              </p>

              <h2>8. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the Service immediately, without prior notice or
                liability, for any reason, including if you breach these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>

              <h2>9. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. LEADNEST EXPRESSLY DISCLAIMS ALL
                WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2>10. Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL LEADNEST, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS,
                DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO
                ACCESS OR USE THE SERVICE.
              </p>

              <h2>11. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless LeadNest and its officers, directors, employees, and
                agents, from and against any claims, liabilities, damages, losses, and expenses, including, without
                limitation, reasonable legal and accounting fees, arising out of or in any way connected with your
                access to or use of the Service or your violation of these Terms.
              </p>

              <h2>12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California,
                without regard to its conflict of law provisions.
              </p>

              <h2>13. Dispute Resolution</h2>
              <p>
                Any dispute arising from or relating to these Terms or the Service will be resolved through binding
                arbitration in accordance with the American Arbitration Association's rules. The arbitration will be
                conducted in San Francisco, California.
              </p>

              <h2>14. Entire Agreement</h2>
              <p>
                These Terms constitute the entire agreement between you and LeadNest regarding the Service and supersede
                all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the
                subject matter.
              </p>

              <h2>15. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p>
                Email: legal@leadnest.com
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
              <h2 className="text-2xl font-bold mb-4">Have Questions About Our Terms?</h2>
              <p className="text-muted-foreground mb-6">
                We're here to help you understand our terms and conditions. Feel free to reach out with any questions.
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
