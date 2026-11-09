import { db } from "../index";
import { UniverseId } from "@/lib/types";
import { QuizAttemptRecord } from "../schema";

export const QuizRepository = {
  /**
   * Get scrubbed questions for a recipient (SERVER-ONLY CORRECT ANSWERS STRIPPED)
   */
  getQuestionsForClient(recipientId: UniverseId) {
    const state = db.getState();
    const questions = state.quizQuestions
      .filter((q) => q.recipientId === recipientId)
      .sort((a, b) => a.orderIndex - b.orderIndex);

    // Explicitly scrub correctOptionIndex
    return questions.map((q) => ({
      id: q.id,
      orderIndex: q.orderIndex,
      type: q.type || "multiple_choice",
      question: q.questionText,
      teluguQuestion: q.teluguText,
      options: q.options.map((opt) => ({
        text: opt.text,
        reaction: opt.reaction,
      })),
      explanation: q.explanation,
    }));
  },

  /**
   * Grade a recipient's submitted answers on the server and record the attempt
   */
  gradeAttempt(
    recipientId: UniverseId,
    answers: number[],
    clientIpHash?: string
  ) {
    const state = db.getState();
    const canonicalQuestions = state.quizQuestions
      .filter((q) => q.recipientId === recipientId)
      .sort((a, b) => a.orderIndex - b.orderIndex);

    let score = 0;
    const feedbackList = canonicalQuestions.map((q, idx) => {
      const chosenOptionIdx = answers[idx] ?? -1;
      const isCorrect = chosenOptionIdx === q.correctOptionIndex;

      if (isCorrect) score += 1;

      return {
        questionId: q.id,
        isCorrect,
        chosenOptionIndex: chosenOptionIdx,
        correctOptionIndex: q.correctOptionIndex,
        reaction: q.options[chosenOptionIdx]?.reaction || "Nice try!",
        explanation: q.explanation,
      };
    });

    const now = new Date().toISOString();
    const attempt: QuizAttemptRecord = {
      id: `att-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      recipientId,
      startedAt: now,
      completedAt: now,
      score,
      totalQuestions: canonicalQuestions.length,
      answers,
      clientIpHash,
    };

    db.mutate((s) => {
      s.quizAttempts.push(attempt);
    });

    const total = canonicalQuestions.length || 1;
    const percentage = Math.round((score / total) * 100);
    const isHighScore = percentage >= 80;

    // Personalized result message per tier
    let resultTitle = "Celestial Bond Verified!";
    let resultMessage = "Your connection with Arshiya is deep and timeless.";
    if (percentage === 100) {
      resultTitle = "Legendary 100% Celestial Match! 🌟";
      resultMessage = "Incredible! You know Arshiya through and through! Not a single memory or inside joke was missed.";
    } else if (percentage >= 80) {
      resultTitle = "Deep Soul Connection! ✨";
      resultMessage = "Remarkable! You understand Arshiya's heart, humor, and values on a truly profound level.";
    } else if (percentage >= 50) {
      resultTitle = "Heartwarming Bond! 💖";
      resultMessage = "Great job! You know the real Arshiya and share so many unforgettable cherished moments.";
    } else {
      resultTitle = "Growing Celestial Bond! 🌱";
      resultMessage = "You know her warm heart, and our journey together is full of new memories waiting to be made.";
    }

    return {
      score,
      totalQuestions: canonicalQuestions.length,
      percentage,
      isHighScore,
      resultTitle,
      resultMessage,
      feedback: feedbackList,
      attemptId: attempt.id,
    };
  },

  /**
   * Get all quiz attempts for admin review
   */
  getAllAttempts() {
    const state = db.getState();
    return state.quizAttempts.map((att) => {
      const rec = state.recipients.find((r) => r.id === att.recipientId);
      return {
        ...att,
        recipientName: rec?.fullName || att.recipientId,
      };
    });
  },
};

