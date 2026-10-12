import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { sessions } from "@/lib/sessions";

export async function POST(req: NextRequest) {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for") ?? "unknown";

  if (!rateLimit(`session:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const { dev } = await req.json().catch(() => ({}));
  const startedAt = dev && process.env.NODE_ENV !== "production"
    ? Date.now() - 6 * 60 * 1000  // backdate by 6 mins in dev
    : Date.now();

  const id = randomUUID();
  sessions.set(id, { startedAt });

  return NextResponse.json({ sessionId: id });
}
