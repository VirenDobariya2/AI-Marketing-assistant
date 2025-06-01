import { BarChart3, Mail, Users, Zap, Brain, LineChart, Calendar, Sparkles } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Smart Contact Segmentation",
      description: "Organize your audience with intelligent tagging and filtering based on behavior and preferences.",
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "AI Email Automation",
      description: "Create and schedule personalized email campaigns that convert with AI-powered content suggestions.",
    },
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "AI Content Generation",
      description: "Generate engaging email content, subject lines, and CTAs tailored to your audience segments.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Campaign Scheduling",
      description:
        "Schedule campaigns at optimal times determined by AI analysis of your audience's engagement patterns.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Comprehensive Analytics",
      description: "Track open rates, click-through rates, and conversions with detailed visual reports.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Performance Insights",
      description: "Get actionable insights to improve your marketing strategy based on campaign performance.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Marketing Workflows",
      description: "Create automated workflows that respond to customer actions and engagement.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: "AI Recommendations",
      description: "Receive personalized recommendations to optimize your marketing efforts and increase ROI.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful Features for Your Marketing Needs
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to create, manage, and optimize your marketing campaigns.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-bold text-center">{feature.title}</h3>
              <p className="text-sm text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
