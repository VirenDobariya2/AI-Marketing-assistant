import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  const featuredPost = {
    id: "1",
    title: "10 AI Marketing Trends That Will Transform Your Business in 2023",
    description:
      "Discover how artificial intelligence is revolutionizing marketing strategies and how you can leverage these trends to grow your business.",
    date: "June 15, 2023",
    author: "Sarah Johnson",
    category: "AI Marketing",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=800",
  }

  const recentPosts = [
    {
      id: "2",
      title: "How to Build an Effective Lead Nurturing Strategy",
      description:
        "Learn the key components of a successful lead nurturing campaign and how to implement them for better conversion rates.",
      date: "June 10, 2023",
      author: "Michael Chen",
      category: "Lead Generation",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "3",
      title: "Email Marketing Automation: A Beginner's Guide",
      description:
        "Everything you need to know about setting up your first automated email marketing campaigns for maximum efficiency.",
      date: "June 5, 2023",
      author: "Emily Rodriguez",
      category: "Email Marketing",
      readTime: "5 min read",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "4",
      title: "Segmentation Strategies That Actually Work",
      description:
        "Effective audience segmentation techniques that can dramatically improve your marketing campaigns' performance.",
      date: "May 28, 2023",
      author: "David Kim",
      category: "Segmentation",
      readTime: "7 min read",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "5",
      title: "The ROI of AI in Small Business Marketing",
      description:
        "Real-world case studies showcasing the return on investment when small businesses adopt AI marketing tools.",
      date: "May 22, 2023",
      author: "Jessica Lee",
      category: "AI Marketing",
      readTime: "9 min read",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "6",
      title: "Creating High-Converting Landing Pages",
      description:
        "Essential elements and design principles for landing pages that turn visitors into leads and customers.",
      date: "May 15, 2023",
      author: "Robert Taylor",
      category: "Conversion",
      readTime: "6 min read",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const categories = [
    "All Posts",
    "AI Marketing",
    "Lead Generation",
    "Email Marketing",
    "Segmentation",
    "Conversion",
    "Analytics",
    "Automation",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">LeadNest Blog</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Expert insights, tips, and strategies to elevate your marketing and grow your business.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4 overflow-auto pb-2">
              {categories.map((category, i) => (
                <Button key={i} variant={i === 0 ? "default" : "outline"} size="sm">
                  {category}
                </Button>
              ))}
            </div>

            <div className="mt-12">
              <Link href={`/blog/${featuredPost.id}`}>
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={featuredPost.image || "/placeholder.svg"}
                        alt={featuredPost.title}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">{featuredPost.category}</Badge>
                        <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{featuredPost.title}</h2>
                      <p className="text-muted-foreground mb-4">{featuredPost.description}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">
                            {featuredPost.author.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">{featuredPost.author}</p>
                            <p className="text-muted-foreground">{featuredPost.date}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Read more
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <Card className="h-full overflow-hidden flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="object-cover w-full h-full transition-transform hover:scale-105"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="mt-auto pt-2">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-muted h-8 w-8 flex items-center justify-center">
                            {post.author.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <p className="font-medium">{post.author}</p>
                            <p className="text-muted-foreground">{post.date}</p>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <Button>Load More Articles</Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary/50 border-t">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest marketing insights, strategies, and tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
