import { NextRequest, NextResponse } from "next/server";
import { QuizRepository } from "@/lib/db/repositories/quiz-repository";
import { UniverseId } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { recipientId, answers } = await req.json();

    if (!recipientId || !Array.isArray(answers)) {
      return NextResponse.json({ success: false, error: "Invalid quiz submission data" }, { status: 400 });
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
