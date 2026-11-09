import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "arshiya-creator-admin-2026";
const SIGNING_SALT = process.env.UNIVERSE_SECURITY_SALT || "arshiya-12-little-universes-secret-salt-2026-prod-xyz";

export function verifyAdminPassword(input: string): boolean {
  if (!input) return false;
  return input.trim() === ADMIN_SECRET;
}

export function createAdminSessionToken(): string {
  const payload = {
    role: "creator_admin",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SIGNING_SALT).update(str).digest("base64url");
  return `${str}.${sig}`;
}

export function verifyAdminSessionToken(token: string): boolean {
  try {
    const [payloadStr, sig] = token.split(".");
    if (!payloadStr || !sig) return false;
    const expected = crypto.createHmac("sha256", SIGNING_SALT).update(payloadStr).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
    const data = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
    return data.role === "creator_admin" && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function isCurrentUserAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;
  return verifyAdminSessionToken(token);
}

