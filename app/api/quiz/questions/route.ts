import { NextRequest, NextResponse } from "next/server";
import { QuizRepository } from "@/lib/db/repositories/quiz-repository";
import { UniverseId } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipientId = searchParams.get("recipientId") as UniverseId;

    if (!recipientId) {
      return NextResponse.json({ success: false, error: "Recipient ID required" }, { status: 400 });
    }

    // Scrubbed questions (No answer leak!)
    const questions = QuizRepository.getQuestionsForClient(recipientId);

    return NextResponse.json({ success: true, questions });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to load quiz" }, { status: 500 });
  }
}

