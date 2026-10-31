import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  try {
    await connectToDatabase();
    const pendingMembers = await User.find({
      $and: [
        { isApproved: { $ne: true } },
        { status: { $ne: "approved" } },
        { role: { $ne: "admin" } },
        { isAdmin: { $ne: true } },
        { username: { $ne: "adminfytlocalization-com" } },
      ],
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, pendingMembers });
  } catch (error) {
    console.error("[Admin Approvals GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pending approvals" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { memberId, username, email, action } = await request.json();

    let user = null;
    if (memberId) {
      if (mongoose.isValidObjectId(memberId)) {
        user = await User.findById(memberId);
      } else {
        user = await User.findOne({ _id: memberId });
      }
    }
    if (!user && username) {
      user = await User.findOne({ username });
    }
    if (!user && email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      user.isApproved = true;
      user.status = "approved";
      await user.save();
      await User.updateOne(
        { _id: user._id },
        { $set: { isApproved: true, status: "approved" } }
      );
      return NextResponse.json({
        success: true,
        message: `Member ${user.name} has been approved.`,
        user,
      });
    } else if (action === "reject") {
      user.isApproved = false;
      user.status = "rejected";
      await user.save();
      await User.updateOne(
        { _id: user._id },
        { $set: { isApproved: false, status: "rejected" } }
      );
      return NextResponse.json({
        success: true,
        message: `Member ${user.name} registration was rejected.`,
        user,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Must be 'approve' or 'reject'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Admin Approvals POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process approval" },
      { status: 500 }
    );
  }
}

