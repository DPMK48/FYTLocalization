import nodemailer from "nodemailer";

export interface SendMailOptions {
  to?: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail({
  to,
  replyTo,
  subject,
  text,
  html,
}: SendMailOptions): Promise<{ success: boolean; simulated?: boolean; messageId?: string; error?: string }> {
  const host = process.env.SMTP_HOST || "mail.fytlocalization.com";
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || "admin@fytlocalization.com";
  const pass = process.env.SMTP_PASS || "";
  const fromName = process.env.SMTP_FROM_NAME || "FYTLOCALIZATION";
  const defaultTo = process.env.SMTP_TO_EMAIL || "admin@fytlocalization.com";

  const targetTo = to || defaultTo;

  // If password has not yet been filled into .env.local, log payload gracefully without throwing
  if (!pass || pass.trim() === "") {
    console.warn(
      `[Mailer Notice] SMTP_PASS is empty in .env.local. Email was not transmitted over network. Add your password for ${user} to send live emails.`
    );
    console.log("[Simulated Email Delivery]", {
      from: `"${fromName}" <${user}>`,
      to: targetTo,
      replyTo,
      subject,
      textPreview: text.slice(0, 150) + "...",
    });
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // SSL on 465
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false, // Prevents certificate mismatches on shared cPanel hosts
      },
    });

    const info = await transporter.sendMail({
      from: `"${fromName}" <${user}>`,
      to: targetTo,
      replyTo: replyTo || user,
      subject,
      text,
      html: html || text.replace(/\n/g, "<br/>"),
    });

    console.log(`[Mailer Success] Email sent to ${targetTo}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown SMTP transport error";
    console.error("[Mailer Error] Failed to send email via Truehost SMTP:", errMessage);
    return { success: false, error: errMessage };
  }
}
