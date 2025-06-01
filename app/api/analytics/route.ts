// app/api/campaigns/analytics/route.ts (or wherever your API route is)

import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Campaign } from "@/lib/models/Campaign";
import { Contact } from "@/lib/models/Contact";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const baseFilter = { userId: user._id };

    // Campaign stats aggregation using Mongoose aggregate
    const campaignStats = await Campaign.aggregate([
      { $match: baseFilter },
      {
        $group: {
          _id: null,
          totalCampaigns: { $sum: 1 },
          totalSent: { $sum: "$analytics.sent" },
          totalDelivered: { $sum: "$analytics.delivered" },
          totalOpened: { $sum: "$analytics.opened" },
          totalClicked: { $sum: "$analytics.clicked" },
          totalBounced: { $sum: "$analytics.bounced" },
          totalUnsubscribed: { $sum: "$analytics.unsubscribed" },
        },
      },
    ]);

    // Contact stats aggregation using Mongoose aggregate
    const contactStats = await Contact.aggregate([
      { $match: baseFilter },
      {
        $group: {
          _id: null,
          totalContacts: { $sum: 1 },
          activeContacts: {
            $sum: {
              $cond: [{ $eq: ["$status", "active"] }, 1, 0],
            },
          },
          unsubscribedContacts: {
            $sum: {
              $cond: [{ $eq: ["$status", "unsubscribed"] }, 1, 0],
            },
          },
          bouncedContacts: {
            $sum: {
              $cond: [{ $eq: ["$status", "bounced"] }, 1, 0],
            },
          },
          complainedContacts: {
            $sum: {
              $cond: [{ $eq: ["$status", "complained"] }, 1, 0],
            },
          },
        },
      },
    ]);

    // Use default values if empty
    const campaignData = campaignStats[0] || {
      totalCampaigns: 0,
      totalSent: 0,
      totalDelivered: 0,
      totalOpened: 0,
      totalClicked: 0,
      totalBounced: 0,
      totalUnsubscribed: 0,
    };

    const contactData = contactStats[0] || {
      totalContacts: 0,
      activeContacts: 0,
      unsubscribedContacts: 0,
      bouncedContacts: 0,
      complainedContacts: 0,
    };

    return NextResponse.json({
      campaignStats: campaignData,
      contactStats: contactData,
    });
  } catch (error) {
    console.error("Error in analytics GET:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
