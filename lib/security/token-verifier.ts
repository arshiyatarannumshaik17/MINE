import crypto from "crypto";

const SECRET_SALT = process.env.UNIVERSE_SECURITY_SALT || "arshiya-12-little-universes-secret-salt-2026-xyz";

/**
 * Hash a plain access key using SHA-256 with server salt
 */
export function hashAccessKey(rawKey: string): string {
  return crypto
    .createHmac("sha256", SECRET_SALT)
    .update(rawKey.trim().toLowerCase())
    .digest("hex");
}

/**
 * Constant-time comparison between two hash strings to prevent timing attacks
 */
export function safeCompareHashes(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Create a signed session payload
 */
export function createSignedSessionToken(recipientId: string): string {
  const payload = {
    sub: recipientId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
  };

  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET_SALT)
    .update(payloadStr)
    .digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Verify a signed session payload and return recipientId if valid
 */
export function verifySignedSessionToken(token: string): string | null {
  try {
    const [payloadStr, signature] = token.split(".");
    if (!payloadStr || !signature) return null;

    const expectedSig = crypto
      .createHmac("sha256", SECRET_SALT)
      .update(payloadStr)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSig)
      )
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(payloadStr, "base64url").toString("utf-8")
    );

    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload.sub;
  } catch {
    return null;
  }
}

