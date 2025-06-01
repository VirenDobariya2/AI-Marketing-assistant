import type { Metadata } from "next"
import FeaturesPageClient from "./FeaturesPageClient"

export const metadata: Metadata = {
  title: "Features | LeadNest",
  description: "Discover the powerful features of LeadNest, your AI-powered contact marketing assistant.",
}

export default function FeaturesPage() {
  return <FeaturesPageClient />
}
