import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for small businesses just getting started with email marketing.",
      features: [
        "Up to 1,000 contacts",
        "5 email campaigns per month",
        "Basic segmentation",
        "AI content suggestions",
        "Email templates",
        "Basic analytics",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      description: "For growing businesses that need more advanced marketing capabilities.",
      features: [
        "Up to 10,000 contacts",
        "Unlimited email campaigns",
        "Advanced segmentation",
        "AI content generation",
        "Custom workflows",
        "Detailed analytics",
        "A/B testing",
        "Priority support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      description: "For established businesses with complex marketing needs.",
      features: [
        "Unlimited contacts",
        "Unlimited campaigns",
        "Advanced AI features",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics & reporting",
        "Team collaboration tools",
        "API access",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg border bg-card p-6 shadow-sm ${
                plan.popular ? "border-primary shadow-md relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mt-6 space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto pt-6">
                <Link href="/auth/signup">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
