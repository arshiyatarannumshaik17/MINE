import { db } from "../index";
import { UniverseId } from "@/lib/types";
import { verifyPin, isCredentialLocked } from "@/lib/security/pin-hasher";
import { hashAccessKey, safeCompareHashes } from "@/lib/security/token-verifier";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export const CredentialRepository = {
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
      return cred.recipientId;
    }

    return null;
  },

  /**
   * Verify a recipient's 4-digit PIN with brute-force lockout defense
   */
  verifyPin(
    recipientId: UniverseId,
    rawPin: string
  ): {
    success: boolean;
    isLocked?: boolean;
    remainingSeconds?: number;
    attemptsLeft?: number;
  } {
    const state = db.getState();
    const cred = state.credentials.find(
      (c) => c.recipientId === recipientId && c.type === "PIN"
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
  resetLockout(recipientId: UniverseId) {
    db.mutate((s) => {
      s.credentials
        .filter((c) => c.recipientId === recipientId)
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
      };
    });
  },
};
