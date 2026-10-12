import nodemailer from "nodemailer";

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
    html: `
      <div style="background:#0d0d0d;color:#e8e4dc;font-family:Georgia,serif;padding:48px 32px;max-width:560px;margin:0 auto;">
        <h1 style="font-size:22px;letter-spacing:0.15em;font-weight:400;margin-bottom:32px;">UNHEARD VOICES</h1>
        <p style="font-size:16px;line-height:1.8;margin-bottom:24px;">You stayed.<br/>Thank you for that.</p>
        <p style="font-size:16px;line-height:1.8;margin-bottom:40px;">Here is what I wanted to share with you.</p>
        <a href="${manuscriptUrl}" style="display:inline-block;background:#e8e4dc;color:#0d0d0d;padding:14px 32px;text-decoration:none;letter-spacing:0.12em;font-size:13px;font-family:Arial,sans-serif;">READ UNHEARD VOICES</a>
        <p style="font-size:13px;color:#666;margin-top:48px;line-height:1.6;">If the button doesn't work, copy this link:<br/>${manuscriptUrl}</p>
      </div>
    `,
  });
}
