import { NextRequest, NextResponse } from "next/server";
import { ResponseRepository } from "@/lib/db/repositories/response-repository";
import { verifySignedSessionToken } from "@/lib/security/token-verifier";
import { UniverseId, normalizeUniverseId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { universeId, recipientName, mood, message } = data;

    if (!universeId || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Verify session
    const sessionCookie = req.cookies.get("universe_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Authentication required to send message" },
        { status: 401 }
      );
    }

    const authenticatedId = verifySignedSessionToken(sessionCookie);
    if (!authenticatedId) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired session" },
        { status: 401 }
      );
    }

    // Anti-IDOR enforcement: verify session matches sender universe
    if (normalizeUniverseId(authenticatedId) !== normalizeUniverseId(universeId)) {
      return NextResponse.json(
        { success: false, error: "Access denied: Cannot submit response on behalf of another recipient" },
        { status: 403 }
      );
    }

    const saved = ResponseRepository.addResponse({
      universeId: normalizeUniverseId(universeId),
      recipientName: recipientName || universeId,
      mood: mood || "Heartfelt Love",
      message: message.trim(),
    });

    return NextResponse.json({ success: true, message: "Response sealed in the Starlight Vault", recordId: saved.id });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to vault response" }, { status: 500 });
  }
}
