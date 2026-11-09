import { NextRequest, NextResponse } from "next/server";
import { authenticateKey } from "@/lib/security/universe-registry";
import { createSignedSessionToken } from "@/lib/security/token-verifier";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { key } = body;

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { success: false, error: "Access key is required" },
        { status: 400 }
      );
    }

    const universeId = authenticateKey(key);

    if (!universeId) {
      return NextResponse.json(
        { success: false, error: "Invalid or unrecognized cosmic key" },
        { status: 401 }
      );
    }

    // Create session token
    const sessionToken = createSignedSessionToken(universeId);

    const response = NextResponse.json({
      success: true,
      universeId,
      redirectUrl: `/universe/${universeId}`,
    });

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: "universe_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication failed" },
      { status: 500 }
    );
  }
}
