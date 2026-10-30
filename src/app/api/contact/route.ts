import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = "",
      email = "",
      service = "General Inquiry",
      customService = "",
      message = "",
    } = body;

    // Selected service or custom "Other" text becomes email subject line
    const emailSubject =
      service === "Other" && customService.trim()
        ? `[Contact Inquiry] ${customService.trim()}`
        : `[Contact Inquiry] ${service}`;

    const textContent = `
New Contact Inquiry from FYTLOCALIZATION Website:
--------------------------------------------------
Sender Name: ${name}
Sender Email: ${email}
Selected Service: ${service}
${customService ? `Custom Requirement: ${customService}\n` : ""}
Message Brief:
${message}

--------------------------------------------------
Received at: ${new Date().toLocaleString()}
`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0000FF; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">New Website Contact Inquiry</h2>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #64748b;">Full Name:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Email Address:</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #0000FF; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Service:</td>
            <td style="padding: 8px 0; font-weight: 600;">${service}${customService ? ` (${customService})` : ""}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0000FF;">
          <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message Content:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 24px; pt: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Sent automatically via FYTLOCALIZATION website intake at ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    // Transmit email via Truehost SMTP
    await sendEmail({
      replyTo: email,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json(
      {
        success: true,
        subject: emailSubject,
        message: "Thank you for reaching out. We will get in touch shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API Error]", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
