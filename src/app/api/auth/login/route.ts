import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: normalizedEmail },
      ],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    if (user.password && user.password !== password) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Enforce Admin Approval: ONLY approved staff/members can log in
    const isAdmin =
      user.role === "admin" ||
      user.isAdmin === true ||
      user.email === "admin@fytlocalization.com" ||
      user.username === "adminfytlocalization-com";

    if (!isAdmin && (user.isApproved !== true || user.status !== "approved")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your account is pending administrator approval. Only approved staff members can log in. Please wait for an administrator to approve your registration.",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        specialty: user.specialty || "Translation & Localization",
        isAdmin: user.role === "admin" || user.isAdmin === true,
        badge: user.badge,
        bio: user.bio,
        location: user.location,
        nativeLanguage: user.nativeLanguage,
        languagePairs: user.languagePairs,
        skills: user.skills,
        avatarBg: user.avatarBg,
        avatarText: user.avatarText,
        avatarUrl: user.avatarUrl,
        coverUrl: user.coverUrl,
      },
    });
  } catch (error) {
    console.error("[Login API Error]", error);
    return NextResponse.json(
      { success: false, error: "Server authentication error" },
      { status: 500 }
    );
  }
}

