import { NextRequest, NextResponse } from "next/server";
import { QuizRepository } from "@/lib/db/repositories/quiz-repository";
import { verifySignedSessionToken } from "@/lib/security/token-verifier";
import { UniverseId, normalizeUniverseId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { recipientId, answers } = await req.json();

    if (!recipientId || !Array.isArray(answers)) {
      return NextResponse.json({ success: false, error: "Invalid quiz submission data" }, { status: 400 });
    }

    // Verify session
    const sessionCookie = req.cookies.get("universe_session")?.value;
    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Authentication required to submit quiz" },
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

    // Anti-IDOR enforcement: verify session matches submitted recipient
    if (normalizeUniverseId(authenticatedId) !== normalizeUniverseId(recipientId)) {
      return NextResponse.json(
        { success: false, error: "Access denied: Cannot submit quiz for another recipient" },
        { status: 403 }
      );
    }

    const clientIp = req.headers.get("x-forwarded-for") || "local";
    const result = QuizRepository.gradeAttempt(recipientId as UniverseId, answers, clientIp);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to grade quiz" }, { status: 500 });
  }
}
