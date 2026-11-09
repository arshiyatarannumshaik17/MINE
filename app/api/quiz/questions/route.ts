import { NextRequest, NextResponse } from "next/server";
import { QuizRepository } from "@/lib/db/repositories/quiz-repository";
import { verifySignedSessionToken } from "@/lib/security/token-verifier";
import { UniverseId, normalizeUniverseId } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipientId = searchParams.get("recipientId") as UniverseId;

    if (!recipientId) {
      return NextResponse.json({ success: false, error: "Recipient ID required" }, { status: 400 });
    }

    // Verify session authorization
    const sessionCookie = req.cookies.get("universe_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Authentication required to access quiz" },
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

    // ANTI-IDOR ENFORCEMENT
    if (normalizeUniverseId(authenticatedId) !== normalizeUniverseId(recipientId)) {
      return NextResponse.json(
        { success: false, error: "Access denied: You are not authorized to view this recipient's quiz" },
        { status: 403 }
      );
    }

    // Scrubbed questions (Correct answer indices stripped!)
    const questions = QuizRepository.getQuestionsForClient(recipientId);

    return NextResponse.json({ success: true, questions });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load quiz" }, { status: 500 });
  }
}
