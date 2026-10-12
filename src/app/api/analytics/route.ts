import { NextRequest, NextResponse } from "next/server";

const ALLOWED_EVENTS = new Set([
  "landing_visited",
  "experience_started",
  "experience_completed",
  "email_form_viewed",
  "email_submitted",
  "manuscript_requested",
]);

export async function POST(req: NextRequest) {
  const { event } = await req.json();

  if (!event || !ALLOWED_EVENTS.has(event)) {
    return NextResponse.json({ error: "invalid_event" }, { status: 400 });
  }

  console.log(`[analytics] ${event} at ${new Date().toISOString()}`);
  return NextResponse.json({ ok: true });
}
