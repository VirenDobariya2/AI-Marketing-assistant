import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import { User } from "@/lib/models/User";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  timezone: z.string().optional(),
  preferences: z
    .object({
      emailNotifications: z.boolean().optional(),
      marketingEmails: z.boolean().optional(),
      theme: z.enum(["light", "dark", "system"]).optional(),
    })
    .optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        subscription: user.subscription,
        preferences: user.preferences,
        profile: user.profile,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    await connectDB();

    const updateData: any = { updatedAt: new Date() };

    if (validatedData.name) updateData.name = validatedData.name;

    if (
      validatedData.company ||
      validatedData.phone ||
      validatedData.avatar ||
      validatedData.timezone
    ) {
      updateData.profile = {
        ...user.profile,
        ...(validatedData.company && { company: validatedData.company }),
        ...(validatedData.phone && { phone: validatedData.phone }),
        ...(validatedData.avatar && { avatar: validatedData.avatar }),
        ...(validatedData.timezone && { timezone: validatedData.timezone }),
      };
    }

    if (validatedData.preferences) {
      updateData.preferences = {
        ...user.preferences,
        ...validatedData.preferences,
      };
    }

    await User.updateOne({ _id: user._id }, { $set: updateData });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }

    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
