import { NextRequest, NextResponse } from "next/server";
import { CredentialRepository } from "@/lib/db/repositories/credential-repository";
import { createSignedSessionToken } from "@/lib/security/token-verifier";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ success: false, error: "Access token required" }, { status: 400 });
    }

    const universeId = CredentialRepository.verifyToken(token);

    if (!universeId) {
      return NextResponse.json({ success: false, error: "Invalid invitation token" }, { status: 401 });
    }

    const sessionCookie = createSignedSessionToken(universeId);
    const res = NextResponse.json({
      success: true,
      universeId,
      redirectUrl: `/universe/${universeId}`,
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
    return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
  }
}

