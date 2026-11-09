import crypto from "crypto";

const PBKDF2_ITERATIONS = 10000;
const KEY_LEN = 32;
const DIGEST = "sha256";

/**
 * Generate a cryptographically random salt
 */
export function generateSalt(bytes = 16): string {
  return crypto.randomBytes(bytes).toString("hex");
}

/**
 * Hash a numeric PIN using PBKDF2
 */
export function hashPin(rawPin: string, salt: string): string {
  const cleaned = rawPin.trim();
  return crypto
    .pbkdf2Sync(cleaned, salt, PBKDF2_ITERATIONS, KEY_LEN, DIGEST)
    .toString("hex");
}

/**
 * Constant-time PIN verification
 */
export function verifyPin(rawPin: string, salt: string, expectedHash: string): boolean {
  try {
    const computedHash = hashPin(rawPin, salt);
    const bufA = Buffer.from(computedHash, "hex");
    const bufB = Buffer.from(expectedHash, "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

/**
 * Check if a lockout is active
 */
export function isCredentialLocked(lockedUntilStr: string | null): { isLocked: boolean; remainingSeconds: number } {
  if (!lockedUntilStr) return { isLocked: false, remainingSeconds: 0 };
  const lockedUntil = new Date(lockedUntilStr).getTime();
  const now = Date.now();
  if (lockedUntil > now) {
    const remainingSeconds = Math.ceil((lockedUntil - now) / 1000);
    return { isLocked: true, remainingSeconds };
  }
  return { isLocked: false, remainingSeconds: 0 };
}

