import { NextRequest, NextResponse } from "next/server";
import { CredentialRepository } from "@/lib/db/repositories/credential-repository";
import { createSignedSessionToken } from "@/lib/security/token-verifier";
import { UniverseId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { recipientId, pin } = await req.json();

    if (!recipientId || !pin) {
      return NextResponse.json(
        { success: false, error: "Recipient ID and PIN are required" },
        { status: 400 }
      );
    }

    const verification = CredentialRepository.verifyPin(recipientId as UniverseId, String(pin));

    if (verification.isLocked) {
      const mins = Math.ceil((verification.remainingSeconds || 0) / 60);
      return NextResponse.json(
        {
          success: false,
          isLocked: true,
          error: `Universe access temporarily locked due to repeated incorrect attempts. Please try again in ${mins} minute(s) or contact Arshiya.`,
        },
        { status: 429 }
      );
    }

    if (!verification.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Incorrect secret PIN. You have ${verification.attemptsLeft} attempt(s) remaining.`,
          attemptsLeft: verification.attemptsLeft,
        },
        { status: 401 }
      );
    }

    // Success: create signed session
    const sessionCookie = createSignedSessionToken(recipientId);
    const res = NextResponse.json({
      success: true,
      universeId: recipientId,
      redirectUrl: `/universe/${recipientId}`,
    });

    res.cookies.set({
      name: "universe_session",
      value: sessionCookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch {
    return NextResponse.json({ success: false, error: "PIN verification failed" }, { status: 500 });
  }
}
