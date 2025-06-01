"use client"

import { useCampaigns } from "@/hooks/use-campaigns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Copy, Trash, Eye, Edit } from "lucide-react"
import { TableRow, TableCell } from "@/components/ui/table"
import { getStatusBadge } from "@/lib/utils"
import { useRouter } from "next/navigation"

const CampaignsPage = () => {
  const {
    campaigns,
    loading,
    total,
    page,
    totalPages,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    sendCampaign,
    duplicateCampaign,
    filteredCampaigns,
  } = useCampaigns()

  const router = useRouter()

  const handleDuplicate = async (campaignId: string) => {
    try {
      await duplicateCampaign(campaignId)
    } catch (error) {
      // Error is handled in the hook
    }
  }

  const handleDelete = async (campaignId: string) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      try {
        await deleteCampaign(campaignId)
      } catch (error) {
        // Error is handled in the hook
      }
    }
  }

  return (
    <div>
      <h1>Campaigns</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Total Campaigns: {total}</p>
          <p>Page: {page}</p>
          <p>Total Pages: {totalPages}</p>
          <ul>
            {filteredCampaigns.map((campaign) => (
              <TableRow key={campaign._id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{campaign.name}</div>
                    <div className="text-sm text-muted-foreground">{campaign.subject}</div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell>{campaign.recipients.total.toLocaleString()}</TableCell>
                <TableCell>{campaign.analytics.openRate.toFixed(1)}%</TableCell>
                <TableCell>{campaign.analytics.clickRate.toFixed(1)}%</TableCell>
                <TableCell>{new Date(campaign.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/campaigns/${campaign._id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/campaigns/${campaign._id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(campaign._id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(campaign._id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </ul>
          <button onClick={() => fetchCampaigns(page - 1)}>Previous Page</button>
          <button onClick={() => fetchCampaigns(page + 1)}>Next Page</button>
          <button onClick={() => createCampaign({ name: "New Campaign", status: "Draft" })}>Create Campaign</button>
        </>
      )}
    </div>
  )
}

export default CampaignsPage
