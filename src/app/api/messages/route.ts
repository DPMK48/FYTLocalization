import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/models/Message";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user")?.trim().toLowerCase();
    const withUser = searchParams.get("with")?.trim().toLowerCase();

    await connectToDatabase();

    let query: Record<string, any> = {};

    if (user && withUser) {
      query = {
        $or: [
          { sender: user, recipient: withUser },
          { sender: withUser, recipient: user },
          { sender: new RegExp(`^${user}$`, "i"), recipient: new RegExp(`^${withUser}$`, "i") },
          { sender: new RegExp(`^${withUser}$`, "i"), recipient: new RegExp(`^${user}$`, "i") },
        ],
      };
    } else if (user) {
      query = {
        $or: [
          { sender: user },
          { recipient: user },
          { sender: new RegExp(`^${user}$`, "i") },
          { recipient: new RegExp(`^${user}$`, "i") },
        ],
      };
    }

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
    const { sender, recipient, recipients, text, action } = body;

    await connectToDatabase();

    // Mark messages as read
    if (action === "markRead" && sender && recipient) {
      const s = sender.trim().toLowerCase();
      const r = recipient.trim().toLowerCase();
      await Message.updateMany(
        { sender: s, recipient: r, read: false },
        { $set: { read: true } }
      );
      return NextResponse.json({ success: true, message: "Marked as read" });
    }

    if (!sender || !text) {
      return NextResponse.json(
        { success: false, error: "Sender and text are required" },
        { status: 400 }
      );
    }

    const normSender = sender.trim().toLowerCase();

    // Handle Mass / Broadcast message to multiple recipients
    if (Array.isArray(recipients) && recipients.length > 0) {
      const docs = recipients.map((r: string) => ({
        sender: normSender,
        recipient: r.trim().toLowerCase(),
        text: text.trim(),
        read: false,
      }));

      const createdDocs = await Message.insertMany(docs);
      return NextResponse.json(
        { success: true, count: createdDocs.length, messages: createdDocs },
        { status: 201 }
      );
    }

    // Handle single 1-on-1 direct message
    if (!recipient) {
      return NextResponse.json(
        { success: false, error: "Recipient is required" },
        { status: 400 }
      );
    }

    const normRecipient = recipient.trim().toLowerCase();

    const newMessage = await Message.create({
      sender: normSender,
      recipient: normRecipient,
      text: text.trim(),
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

