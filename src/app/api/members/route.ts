import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

const DEFAULT_ADMIN = {
  username: "adminfytlocalization-com",
  name: "Fatima Yusuf",
  email: "admin@fytlocalization.com",
  role: "admin" as const,
  location: "Bauchi State, Nigeria",
  nativeLanguage: "Hausa & English",
  languagePairs: ["Hausa ↔ English", "Arabic → Hausa", "French → English"],
  skills: ["Translation", "AI Localization", "Transcription", "Interpretation"],
  bio: "Linguist and co-founder of FYTLOCALIZATION. Over 10+ years coordinating enterprise language solutions across Africa and the Middle East.",
  badge: "Admin" as const,
  isAdmin: true,
  isApproved: true,
  status: "approved" as const,
  isOnline: true,
  completedJobs: 480,
  rating: 5.0,
  avatarBg: "bg-blue-600",
  avatarText: "FY",
};

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const includePending = searchParams.get("includePending") === "true";

    const filter: Record<string, any> = includePending
      ? {}
      : {
          $or: [
            { isApproved: true },
            { role: "admin" },
            { isAdmin: true },
            { username: "adminfytlocalization-com" },
          ],
        };

    let members = await User.find(filter).sort({ createdAt: -1 }).lean();

    // If database has no users yet, seed the default Administrator account
    if (members.length === 0) {
      await User.create(DEFAULT_ADMIN);
      members = await User.find({}).lean();
    }

    return NextResponse.json({ success: true, members });
  } catch (error) {
    console.error("[Members API GET Error]", error);
    // Fallback if offline/connecting
    return NextResponse.json({ success: true, members: [DEFAULT_ADMIN] });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, email, specialty, password } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const username =
      email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "member";

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username }],
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "An account with this email or username already exists" },
        { status: 400 }
      );
    }

    const initials = name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "MB";

    const chosenSpecialty = specialty || "Translation & Localization";

    const newUser = await User.create({
      username,
      name,
      email: email.toLowerCase(),
      password: password || "fytmember2026",
      role: "member",
      specialty: chosenSpecialty,
      avatarBg: "bg-teal-600",
      avatarText: initials,
      languagePairs: [],
      skills: [chosenSpecialty],
      badge: "Verified Member",
      isAdmin: false,
      isApproved: false,
      status: "pending",
      isOnline: true,
    });

    return NextResponse.json({ success: true, member: newUser }, { status: 201 });
  } catch (error) {
    console.error("[Members API POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to create member" },
      { status: 500 }
    );
  }
}

