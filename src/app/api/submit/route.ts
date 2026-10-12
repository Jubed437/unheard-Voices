import { NextRequest, NextResponse } from "next/server";
import { sendManuscript } from "@/lib/emailService";
import { rateLimit } from "@/lib/rateLimit";
import { sessions } from "@/lib/sessions";
import { headers } from "next/headers";

const FIVE_MINUTES = 5 * 60 * 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for") ?? "unknown";

  if (!rateLimit(`submit:${ip}`, 5, 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { email, sessionId } = await req.json();

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!sessionId) {
    return NextResponse.json({ error: "no_session" }, { status: 400 });
  }

  const session = sessions.get(sessionId);

  if (!session) {
    return NextResponse.json({ error: "session_expired" }, { status: 403 });
  }

  const elapsed = Date.now() - session.startedAt;
  if (elapsed < FIVE_MINUTES) {
    return NextResponse.json({ error: "session_not_ready" }, { status: 403 });
  }

  try {
    await sendManuscript({ to: email });
    console.log(`[submit] Manuscript sent to ${email}`);
  } catch (err) {
    console.error("[submit] Email send failed:", err);
    return NextResponse.json({ error: "email_failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
