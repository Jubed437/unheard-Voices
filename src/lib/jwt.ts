import { createHmac, timingSafeEqual } from "crypto";

const ALG = "sha256";

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return secret;
}

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function signToken(payload: Record<string, unknown>): string {
  const header = base64url(Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body = base64url(Buffer.from(JSON.stringify(payload)));
  const sig = base64url(
    createHmac(ALG, getSecret()).update(`${header}.${body}`).digest()
  );
  return `${header}.${body}.${sig}`;
}

export function verifyToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, body, sig] = parts;
    const expected = base64url(
      createHmac(ALG, getSecret()).update(`${header}.${body}`).digest()
    );

    const sigBuf = Buffer.from(sig, "base64");
    const expBuf = Buffer.from(expected, "base64");

    if (sigBuf.length !== expBuf.length) return null;
    if (!timingSafeEqual(sigBuf, expBuf)) return null;

    return JSON.parse(Buffer.from(body, "base64").toString());
  } catch {
    return null;
  }
}
