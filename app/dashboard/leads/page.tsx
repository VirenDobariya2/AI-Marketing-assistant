"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, MoreHorizontal, Upload, Trash, Edit, Tag, Mail, Star, Filter, ArrowUpDown } from "lucide-react"

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedLeads, setSelectedLeads] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date-desc")

  const leads = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Inc.",
      status: "Hot",
      source: "Website",
      dateAdded: "2023-06-15",
      lastContact: "2023-06-18",
      score: 85,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+1 (555) 987-6543",
      company: "TechCorp",
      status: "Warm",
      source: "Referral",
      dateAdded: "2023-06-12",
      lastContact: "2023-06-17",
      score: 72,
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.c@example.com",
      phone: "+1 (555) 456-7890",
      company: "InnoSys",
      status: "Cold",
      source: "LinkedIn",
      dateAdded: "2023-06-10",
      lastContact: "2023-06-10",
      score: 34,
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      phone: "+1 (555) 234-5678",
      company: "GrowFast",
      status: "Warm",
      source: "Webinar",
      dateAdded: "2023-06-08",
      lastContact: "2023-06-15",
      score: 68,
    },
    {
      id: "5",
      name: "David Kim",
      email: "david.k@example.com",
      phone: "+1 (555) 876-5432",
      company: "Elite Partners",
      status: "Hot",
      source: "Trade Show",
      dateAdded: "2023-06-05",
      lastContact: "2023-06-16",
      score: 91,
    },
    {
      id: "6",
      name: "Jessica Lee",
      email: "jessica.l@example.com",
      phone: "+1 (555) 345-6789",
      company: "Zeta Media",
      status: "Warm",
      source: "Email Campaign",
      dateAdded: "2023-06-03",
      lastContact: "2023-06-12",
      score: 76,
    },
    {
      id: "7",
      name: "Robert Taylor",
      email: "robert.t@example.com",
      phone: "+1 (555) 654-3210",
      company: "Vista Group",
      status: "Cold",
      source: "Google Ads",
      dateAdded: "2023-06-01",
      lastContact: "2023-06-02",
      score: 28,
    },
  ]

  // Filter and sort leads
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery)

      const matchesStatus = statusFilter === "all" || lead.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "date-asc":
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        case "date-desc":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        case "score-asc":
          return a.score - b.score
        case "score-desc":
          return b.score - a.score
        default:
          return 0
      }
    })

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(filteredLeads.map((lead) => lead.id))
    }
  }

  const toggleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id))
    } else {
      setSelectedLeads([...selectedLeads, id])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads</h2>
          <p className="text-muted-foreground">Manage and track your leads throughout the sales pipeline</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Lead</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Management</CardTitle>
          <CardDescription>View, filter, and manage all your leads in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="warm">Warm</SelectItem>
                  <SelectItem value="cold">Cold</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="score-desc">Score (High-Low)</SelectItem>
                  <SelectItem value="score-asc">Score (Low-High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedLeads.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-md">
              <span className="text-sm">{selectedLeads.length} selected</span>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="gap-1">
                <Tag className="h-3.5 w-3.5" />
                <span>Tag</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Mail className="h-3.5 w-3.5" />
                <span>Email Selected</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-3.5 w-3.5" />
                <span>Edit Status</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive">
                <Trash className="h-3.5 w-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all leads"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      No leads found. Try adjusting your filters or add new leads.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => toggleSelectLead(lead.id)}
                          aria-label={`Select ${lead.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${lead.status === "Hot" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : ""}
                            ${lead.status === "Warm" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" : ""}
                            ${lead.status === "Cold" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : ""}
                          `}
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>{new Date(lead.dateAdded).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full ${
                                lead.score >= 70 ? "bg-green-500" : lead.score >= 40 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                          <span className="text-xs">{lead.score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Contact</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              <span>Change Status</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
