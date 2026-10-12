import nodemailer from "nodemailer";
import { manuscriptEmailHtml } from "@/lib/emailTemplate";

interface SendManuscriptOptions {
  to: string;
}

export async function sendManuscript({ to }: SendManuscriptOptions) {
  const manuscriptUrl = process.env.MANUSCRIPT_URL;
  const from = process.env.EMAIL_FROM;
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT ?? 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!manuscriptUrl || !from || !host || !user || !pass) {
    console.warn("[emailService] Email not configured — skipping send.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: "Unheard Voices — your manuscript",
    html: manuscriptEmailHtml(manuscriptUrl),
  });
}
