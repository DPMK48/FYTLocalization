import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, coverUrl } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });
    }

    await connectToDatabase();
    const normalizedEmail = email.trim().toLowerCase();

    await User.findOneAndUpdate(
      {
        $or: [{ email: normalizedEmail }, { username: normalizedEmail }],
      },
      { coverUrl },
      { new: true }
    );

    return NextResponse.json({ success: true, message: "Cover photo updated in database" });
  } catch (error) {
    console.error("[Profile Cover API Error]", error);
    return NextResponse.json({ success: false, error: "Failed to update cover photo" }, { status: 500 });
  }
}

