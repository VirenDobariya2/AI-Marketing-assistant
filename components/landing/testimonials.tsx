import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, GrowFast",
      content:
        "The AI Marketing Assistant has transformed how we approach email campaigns. Our open rates have increased by 35% and we're saving hours each week on content creation.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Founder, TechStart",
      content:
        "As a small business owner, I don't have time for complex marketing tools. This platform makes it simple to create professional campaigns that actually convert.",
      avatar: "MC",
    },
    {
      name: "Emily Rodriguez",
      role: "E-commerce Manager, StyleShop",
      content:
        "The segmentation features are incredible. We can now target customers based on their actual behaviors and preferences, resulting in a 28% increase in sales.",
      avatar: "ER",
    },
    {
      name: "David Kim",
      role: "Digital Strategist, ConsultPro",
      content:
        "The AI-generated content suggestions have been spot on. It's like having an expert copywriter on our team without the additional headcount.",
      avatar: "DK",
    },
  ]

  return (
    <section id="testimonials" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Businesses Like Yours
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              See what our customers have to say about their experience with our platform.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border bg-card shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
