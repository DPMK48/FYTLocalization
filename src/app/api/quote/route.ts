import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { connectToDatabase } from "@/lib/mongodb";
import { Quote } from "@/models/Quote";

export async function GET() {
  try {
    await connectToDatabase();
    const quotes = await Quote.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, quotes });
  } catch (error) {
    console.error("[Quote API GET Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      category = "localization",
      service = "Translation",
      fullName = "Client",
      email = "",
      volume = "",
      notes = "",
      // Localization fields
      sourceLang = "English",
      targetLang = "",
      // AI Data fields
      dataType = "",
      targetRegion = "",
      collectionTool = "",
    } = body;

    const categoryTitle =
      category === "ai-data" ? "AI Data Services" : "Localization Services";
    const subject = `[Quote Request - ${categoryTitle}] ${service}`;
    const referenceId = `FYT-${Date.now().toString().slice(-6)}`;

    // 1. Save directly to MongoDB Atlas
    try {
      await connectToDatabase();
      await Quote.create({
        category,
        service,
        subject,
        fullName,
        email,
        volume,
        notes,
        sourceLang,
        targetLang,
        dataType,
        targetRegion,
        collectionTool,
        status: "pending",
      });
    } catch (dbError) {
      console.error("[MongoDB Quote Save Warning]", dbError);
    }

    const textContent = `
New Quote Request on FYTLOCALIZATION:
--------------------------------------------------
Reference ID: ${referenceId}
Category: ${categoryTitle}
Service: ${service}
Client Name: ${fullName}
Client Email: ${email}
Estimated Volume / Duration: ${volume || "Not specified"}

${category === "localization" ? `Source Language: ${sourceLang}\nTarget Language: ${targetLang || "Multiple"}\n` : ""}
${category === "ai-data" ? `Data / Multimedia Type: ${dataType || "Not specified"}\nTarget Region: ${targetRegion || "Global"}\nCollection Tool Preference: ${collectionTool || "Standard"}\n` : ""}

Project Brief / Notes:
${notes || "None provided"}

--------------------------------------------------
Received at: ${new Date().toLocaleString()}
`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0000FF; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">New Project Quote Request</h2>
          <span style="color: #93c5fd; font-size: 12px;">Reference: ${referenceId} • ${categoryTitle}</span>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 180px; color: #64748b;">Client Name:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Client Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0000FF; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Requested Service:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0000FF;">${service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Est. Volume / Duration:</td>
            <td style="padding: 8px 0;">${volume || "Not specified"}</td>
          </tr>
          ${
            category === "localization"
              ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Language Flow:</td>
            <td style="padding: 8px 0; font-weight: 600;">${sourceLang} → ${targetLang || "Multiple"}</td>
          </tr>`
              : `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Data Type:</td>
            <td style="padding: 8px 0; font-weight: 600;">${dataType || "Standard"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Target Region:</td>
            <td style="padding: 8px 0;">${targetRegion || "Global"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Tool Preference:</td>
            <td style="padding: 8px 0;">${collectionTool || "Standard / App"}</td>
          </tr>`
          }
        </table>

        ${
          notes
            ? `
        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0000FF;">
          <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 13px; text-transform: uppercase;">Project Brief & Special Requirements:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${notes}</p>
        </div>`
            : ""
        }

        <div style="margin-top: 24px; pt: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent automatically via FYTLOCALIZATION intake engine at ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // Transmit email via Truehost SMTP (if configured)
    try {
      await sendEmail({
        replyTo: email,
        subject,
        text: textContent,
        html: htmlContent,
      });
    } catch (mailErr) {
      console.warn("[SMTP Dispatch Notice]", mailErr);
    }

    return NextResponse.json(
      {
        success: true,
        subject,
        message: "Your quote request has been received. Our project coordinator will send a customized proposal shortly.",
        referenceId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Quote API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process quote request" },
      { status: 500 }
    );
  }
}
