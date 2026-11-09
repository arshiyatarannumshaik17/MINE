import { db } from "../index";
import { UniverseId, normalizeUniverseId } from "@/lib/types";
import { verifyPin, hashPin, generateSalt, isCredentialLocked } from "@/lib/security/pin-hasher";
import { hashAccessKey, safeCompareHashes } from "@/lib/security/token-verifier";
import { UNIVERSES_DATA } from "@/lib/universes/data";
import crypto from "crypto";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export const CredentialRepository = {
  /**
   * Get public metadata for a token without revealing PIN, answers, or private letters
   */
  getTokenInfo(rawToken: string) {
    if (!rawToken) return { valid: false, error: "Token is required" };
    const providedHash = hashAccessKey(rawToken.trim().toLowerCase());
    const state = db.getState();

    const cred = state.credentials.find(
      (c) => c.type === "TOKEN" && safeCompareHashes(c.secretHash, providedHash)
    );

    if (!cred) {
      return { valid: false, error: "Invalid or unrecognized invitation token" };
    }

    const universeId = normalizeUniverseId(cred.recipientId);
    const recipient = state.recipients.find((r) => r.id === universeId);
    const universeSpec = UNIVERSES_DATA[universeId];

    // Check PIN lockout status for this recipient
    const pinCred = state.credentials.find(
      (c) => c.recipientId === universeId && c.type === "PIN"
    );
    const lockout = isCredentialLocked(pinCred?.lockedUntil || null);

    return {
      valid: true,
      recipientId: universeId,
      name: universeSpec ? universeSpec.character.name : (recipient?.fullName || "Special Guest"),
      relation: recipient?.relation || universeSpec?.relation || "Beloved One",
      themeColor: universeSpec?.theme.primary || "#f5a623",
      accentColor: universeSpec?.theme.accent || "#fbbf24",
      avatarIcon: universeSpec?.character.avatarIcon || "✨",
      isLocked: lockout.isLocked,
      remainingSeconds: lockout.remainingSeconds,
    };
  },

  /**
   * Verify an opaque access token (used via URL query or QR code scan)
   */
  verifyToken(rawToken: string): UniverseId | null {
    if (!rawToken) return null;
    const providedHash = hashAccessKey(rawToken.trim().toLowerCase());
    const state = db.getState();

    const cred = state.credentials.find(
      (c) => c.type === "TOKEN" && safeCompareHashes(c.secretHash, providedHash)
    );

    if (cred) {
      db.mutate((s) => {
        const target = s.credentials.find((c) => c.id === cred.id);
        if (target) {
          target.lastUsedAt = new Date().toISOString();
          target.failedAttempts = 0;
        }
      });
      return normalizeUniverseId(cred.recipientId);
    }

    return null;
  },

  /**
   * Combined verification: verifies both QR token AND PIN
   */
  verifyTokenAndPin(
    rawToken: string,
    rawPin: string
  ): {
    success: boolean;
    universeId?: UniverseId;
    isLocked?: boolean;
    remainingSeconds?: number;
    attemptsLeft?: number;
    error?: string;
  } {
    const universeId = this.verifyToken(rawToken);
    if (!universeId) {
      return { success: false, error: "Invalid invitation token" };
    }

    const pinVerification = this.verifyPin(universeId, rawPin);
    if (pinVerification.isLocked) {
      return {
        success: false,
        universeId,
        isLocked: true,
        remainingSeconds: pinVerification.remainingSeconds,
        error: `Account locked due to repeated incorrect PIN attempts. Try again in ${Math.ceil((pinVerification.remainingSeconds || 0) / 60)} minute(s).`,
      };
    }

    if (!pinVerification.success) {
      return {
        success: false,
        universeId,
        attemptsLeft: pinVerification.attemptsLeft,
        error: `Incorrect PIN. ${pinVerification.attemptsLeft} attempt(s) remaining before temporary lockout.`,
      };
    }

    return {
      success: true,
      universeId,
    };
  },

  /**
   * Verify a recipient's 4-digit PIN with brute-force lockout defense
   */
  verifyPin(
    recipientId: UniverseId | string,
    rawPin: string
  ): {
    success: boolean;
    isLocked?: boolean;
    remainingSeconds?: number;
    attemptsLeft?: number;
  } {
    const normalizedId = normalizeUniverseId(recipientId);
    const state = db.getState();
    const cred = state.credentials.find(
      (c) => c.recipientId === normalizedId && c.type === "PIN"
    );

    if (!cred) {
      return { success: false, attemptsLeft: 0 };
    }

    // Check if locked
    const lockout = isCredentialLocked(cred.lockedUntil);
    if (lockout.isLocked) {
      return {
        success: false,
        isLocked: true,
        remainingSeconds: lockout.remainingSeconds,
      };
    }

    const isValid = verifyPin(rawPin, cred.salt, cred.secretHash);

    if (isValid) {
      db.mutate((s) => {
        const target = s.credentials.find((c) => c.id === cred.id);
        if (target) {
          target.failedAttempts = 0;
          target.lockedUntil = null;
          target.lastUsedAt = new Date().toISOString();
        }
      });
      return { success: true };
    }

    // Record failure
    let attemptsLeft = MAX_FAILED_ATTEMPTS;
    db.mutate((s) => {
      const target = s.credentials.find((c) => c.id === cred.id);
      if (target) {
        target.failedAttempts += 1;
        attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - target.failedAttempts);

        if (target.failedAttempts >= MAX_FAILED_ATTEMPTS) {
          const lockTime = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000).toISOString();
          target.lockedUntil = lockTime;
        }
      }
    });

    if (attemptsLeft === 0) {
      return {
        success: false,
        isLocked: true,
        remainingSeconds: LOCKOUT_MINUTES * 60,
        attemptsLeft: 0,
      };
    }

    return { success: false, attemptsLeft };
  },

  /**
   * Reset lockout for a recipient (Admin function)
   */
  resetLockout(recipientId: UniverseId | string) {
    const normalizedId = normalizeUniverseId(recipientId);
    db.mutate((s) => {
      s.credentials
        .filter((c) => c.recipientId === normalizedId)
        .forEach((c) => {
          c.failedAttempts = 0;
          c.lockedUntil = null;
        });
    });
  },

  /**
   * Regenerate token for a recipient (Admin function)
   */
  regenerateToken(recipientId: UniverseId | string): string {
    const normalizedId = normalizeUniverseId(recipientId);
    const newToken = `k_sec_${normalizedId}_${crypto.randomBytes(12).toString("hex")}`;
    const newHash = hashAccessKey(newToken);

    db.mutate((s) => {
      const tokenCred = s.credentials.find(
        (c) => c.recipientId === normalizedId && c.type === "TOKEN"
      );
      if (tokenCred) {
        tokenCred.secretHash = newHash;
        tokenCred.displayHint = newToken;
        tokenCred.failedAttempts = 0;
        tokenCred.lockedUntil = null;
      }
    });

    return newToken;
  },

  /**
   * Update or regenerate PIN for a recipient (Admin function)
   */
  updatePin(recipientId: UniverseId | string, newPin: string) {
    const normalizedId = normalizeUniverseId(recipientId);
    const salt = generateSalt(16);
    const hash = hashPin(newPin, salt);

    db.mutate((s) => {
      const pinCred = s.credentials.find(
        (c) => c.recipientId === normalizedId && c.type === "PIN"
      );
      if (pinCred) {
        pinCred.secretHash = hash;
        pinCred.salt = salt;
        pinCred.displayHint = newPin;
        pinCred.failedAttempts = 0;
        pinCred.lockedUntil = null;
      }
    });
  },

  /**
   * Revoke access for a recipient (Admin function)
   */
  revokeAccess(recipientId: UniverseId | string) {
    const normalizedId = normalizeUniverseId(recipientId);
    db.mutate((s) => {
      const rec = s.recipients.find((r) => r.id === normalizedId);
      if (rec) rec.isActive = false;

      // Invalidate credentials
      s.credentials
        .filter((c) => c.recipientId === normalizedId)
        .forEach((c) => {
          c.lockedUntil = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
        });
    });
  },

  /**
   * Restore revoked access
   */
  restoreAccess(recipientId: UniverseId | string) {
    const normalizedId = normalizeUniverseId(recipientId);
    db.mutate((s) => {
      const rec = s.recipients.find((r) => r.id === normalizedId);
      if (rec) rec.isActive = true;

      s.credentials
        .filter((c) => c.recipientId === normalizedId)
        .forEach((c) => {
          c.failedAttempts = 0;
          c.lockedUntil = null;
        });
    });
  },

  /**
   * Return credential status for admin dashboard
   */
  getCredentialsOverview() {
    const state = db.getState();
    return state.recipients.map((rec) => {
      const tokenCred = state.credentials.find(
        (c) => c.recipientId === rec.id && c.type === "TOKEN"
      );
      const pinCred = state.credentials.find(
        (c) => c.recipientId === rec.id && c.type === "PIN"
      );
      const lockout = isCredentialLocked(pinCred?.lockedUntil || null);

      return {
        recipientId: rec.id,
        name: rec.fullName,
        relation: rec.relation,
        token: tokenCred?.displayHint || "N/A",
        pin: pinCred?.displayHint || "N/A",
        failedAttempts: pinCred?.failedAttempts || 0,
        isLocked: lockout.isLocked,
        lockoutRemainingSeconds: lockout.remainingSeconds,
        lastUsedAt: pinCred?.lastUsedAt || tokenCred?.lastUsedAt || null,
        isActive: rec.isActive,
      };
    });
  },
};
