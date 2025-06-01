"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Users, BarChart3, ArrowRight, Plus, Sparkles, Clock, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const stats = [
    {
      title: "Total Campaigns",
      value: "12",
      description: "3 active campaigns",
      icon: Mail,
      change: "+2 this month",
      href: "/dashboard/campaigns",
    },
    {
      title: "Total Contacts",
      value: "2,345",
      description: "Across 5 segments",
      icon: Users,
      change: "+120 this month",
      href: "/dashboard/contacts",
    },
    {
      title: "Open Rate",
      value: "32%",
      description: "Industry avg: 21%",
      icon: BarChart3,
      change: "+5% from last month",
      href: "/dashboard/analytics",
    },
    {
      title: "Click Rate",
      value: "4.8%",
      description: "Industry avg: 2.5%",
      icon: BarChart3,
      change: "+1.2% from last month",
      href: "/dashboard/analytics",
    },
  ]

  const aiTips = [
    {
      title: "Subject Line Optimization",
      description: "Try using emojis in your subject lines to increase open rates by up to 15%.",
      icon: Sparkles,
    },
    {
      title: "Best Send Time",
      description: "Your audience is most active on Tuesdays at 10 AM. Consider scheduling your next campaign then.",
      icon: Clock,
    },
    {
      title: "Segment Opportunity",
      description: "Create a segment for customers who haven't engaged in 30+ days for a re-engagement campaign.",
      icon: Zap,
    },
  ]

  const recentCampaigns = [
    {
      name: "Summer Sale Announcement",
      status: "Sent",
      date: "Jun 15, 2023",
      openRate: 34.2,
      clickRate: 5.7,
    },
    {
      name: "Product Update Newsletter",
      status: "Sent",
      date: "Jun 8, 2023",
      openRate: 28.9,
      clickRate: 3.2,
    },
    {
      name: "Customer Feedback Survey",
      status: "Draft",
      date: "Scheduled for Jun 22, 2023",
      openRate: null,
      clickRate: null,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}! Here's what's happening with your marketing.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/campaigns/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              <span>New Campaign</span>
            </Button>
          </Link>
          <Link href="/dashboard/contacts/import">
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              <span>Import Contacts</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{stat.change}</p>
                <Link href={stat.href}>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>Your campaign performance over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.status === "Draft" ? campaign.date : `Sent on ${campaign.date}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {campaign.status === "Sent" ? (
                        <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-800/30 dark:text-green-500">
                          Sent
                        </div>
                      ) : (
                        <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
                          Draft
                        </div>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">View campaign</span>
                      </Button>
                    </div>
                  </div>
                  {campaign.status === "Sent" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Open Rate</div>
                        <div className="flex items-center gap-2">
                          <Progress value={campaign.openRate} className="h-2" />
                          <span className="text-sm font-medium">{campaign.openRate}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Click Rate</div>
                        <div className="flex items-center gap-2">
                          <Progress value={campaign.clickRate! * 5} className="h-2" />
                          <span className="text-sm font-medium">{campaign.clickRate}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/campaigns">
                <Button variant="outline" className="gap-2">
                  <span>View all campaigns</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>AI Marketing Tips</CardTitle>
            <CardDescription>Personalized suggestions to improve your marketing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiTips.map((tip, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <tip.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/dashboard/ai-assistant">
                <Button variant="outline" className="gap-2">
                  <span>View all AI suggestions</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
