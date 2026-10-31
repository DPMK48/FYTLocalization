import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");

    await connectToDatabase();
    const query = user
      ? { $or: [{ sender: user }, { recipient: user }] }
      : {};

    const messages = await Message.find(query).sort({ createdAt: 1 }).lean();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("[Messages API GET Error]", error);
    return NextResponse.json({ success: true, messages: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sender, recipient, text } = body;

    if (!sender || !recipient || !text) {
      return NextResponse.json(
        { success: false, error: "Sender, recipient, and text are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const newMessage = await Message.create({
      sender,
      recipient,
      text,
      read: false,
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("[Messages API POST Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

