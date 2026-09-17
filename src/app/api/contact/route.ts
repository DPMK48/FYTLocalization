import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name = "", email = "", service = "General", message = "" } = body;

    console.log("[FYT Contact Enquiry]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      service,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. We will get in touch shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
