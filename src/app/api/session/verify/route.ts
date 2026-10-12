import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/lib/sessions";

const FIVE_MINUTES = 5 * 60 * 1000;

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();

  if (!sessionId) {
    return NextResponse.json({ eligible: false, error: "no_session" }, { status: 400 });
  }

  const session = sessions.get(sessionId);

  if (!session) {
    return NextResponse.json({ eligible: false, error: "session_expired" }, { status: 404 });
  }

  const elapsed = Date.now() - session.startedAt;

  if (elapsed < FIVE_MINUTES) {
    const remaining = Math.ceil((FIVE_MINUTES - elapsed) / 1000);
    return NextResponse.json({ eligible: false, remaining });
  }

  return NextResponse.json({ eligible: true });
}
