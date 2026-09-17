import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      service = "Translation",
      sourceLang = "English",
      targetLang = "Various",
      volume = "Unspecified",
      fullName = "Client",
      email = "",
      notes = "",
      budgetModel = "Per Word",
    } = body;

    // Log to server console
    console.log("[FYT Lead - Booking Enquiry]", {
      timestamp: new Date().toISOString(),
      service,
      sourceLang,
      targetLang,
      volume,
      fullName,
      email,
      notes,
      budgetModel,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your booking request has been logged successfully.",
        referenceId: `FYT-${Date.now().toString().slice(-6)}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}
