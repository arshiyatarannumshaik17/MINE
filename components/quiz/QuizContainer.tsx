"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/lib/types";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import VoiceNotePlayer from "@/components/ui/VoiceNotePlayer";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  Sparkles,
  Loader2,
  RotateCcw,
  Trophy,
  ChevronDown,
  ChevronUp,
  Heart,
  Volume2,
  Check,
} from "lucide-react";

interface FeedbackItem {
  questionId: string;
  isCorrect: boolean;
  chosenOptionIndex: number;
  correctOptionIndex: number;
  reaction: string;
  explanation: string;
}

interface QuizGradingResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  isHighScore: boolean;
  resultTitle: string;
  resultMessage: string;
  feedback: FeedbackItem[];
  attemptId?: string;
}

interface QuizContainerProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  themeColor?: string;
  recipientName: string;
  recipientId?: string;
}

export default function QuizContainer({
  questions,
  onComplete,
  themeColor = "#f5a623",
  recipientName,
  recipientId = "abbu",
}: QuizContainerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isGrading, setIsGrading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [gradingResult, setGradingResult] = useState<QuizGradingResult | null>(null);
  const [showReview, setShowReview] = useState(false);

  const currentQ = questions[currentIdx];

  const getQuestionTypeBadge = (type?: string) => {
    switch (type) {
      case "true_false":
        return { label: "True or False", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" };
      case "fill_blank":
        return { label: "Fill in the Blank", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" };
      case "memory_challenge":
        return { label: "Memory Challenge", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" };
      case "funny_habit":
        return { label: "Funny Habit", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" };
      case "core_values":
        return { label: "Core Values", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" };
      case "emotional":
        return { label: "Heart & Soul", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" };
      case "nickname":
        return { label: "Secret Nickname", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" };
      case "personality":
        return { label: "Personality Insight", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" };
      default:
        return { label: "Multiple Choice", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" };
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    soundEngine.playSuccessChime();
  };

  const handleNextQuestion = async () => {
    const updatedAnswers = [...answers, selectedOption ?? 0];
    setAnswers(updatedAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Final Question Answered -> Submit to Server for Grading
      setIsGrading(true);
      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipientId,
            answers: updatedAnswers,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setGradingResult({
            score: data.score,
            totalQuestions: data.totalQuestions,
            percentage: data.percentage,
            isHighScore: data.isHighScore,
            resultTitle: data.resultTitle,
            resultMessage: data.resultMessage,
            feedback: data.feedback,
            attemptId: data.attemptId,
          });
        } else {
          fallbackGrading(updatedAnswers);
        }
      } catch {
        fallbackGrading(updatedAnswers);
      } finally {
        setIsGrading(false);
        setQuizFinished(true);
        fireCelebrationConfetti();
      }
    }
  };

  const fallbackGrading = (submittedAnswers: number[]) => {
    let localScore = 0;
    const feedbackList: FeedbackItem[] = questions.map((q, idx) => {
      const chosen = submittedAnswers[idx] ?? -1;
      const correctIdx = q.options.findIndex((o) => o.isCorrect);
      const isCorrect = chosen === correctIdx;
      if (isCorrect) localScore++;

      return {
        questionId: q.id,
        isCorrect,
        chosenOptionIndex: chosen,
        correctOptionIndex: correctIdx >= 0 ? correctIdx : 0,
        reaction: q.options[chosen]?.reaction || "Cherished moment!",
        explanation: q.explanation,
      };
    });

    const percentage = Math.round((localScore / questions.length) * 100);
    const isHighScore = percentage >= 80;

    let resultTitle = "Celestial Bond Verified!";
    let resultMessage = "Your connection with Arshiya is deep and timeless.";
    if (percentage === 100) {
      resultTitle = "Legendary 100% Celestial Match! 🌟";
      resultMessage = "Incredible! You know Arshiya through and through! Not a single memory was missed.";
    } else if (percentage >= 80) {
      resultTitle = "Deep Soul Connection! ✨";
      resultMessage = "Remarkable! You understand Arshiya's heart, humor, and values on a profound level.";
    } else if (percentage >= 50) {
      resultTitle = "Heartwarming Bond! 💖";
      resultMessage = "Great job! You know the real Arshiya and share so many unforgettable cherished moments.";
    } else {
      resultTitle = "Growing Celestial Bond! 🌱";
      resultMessage = "You know her warm heart, and our journey together is full of new memories waiting to be made.";
    }

    setGradingResult({
      score: localScore,
      totalQuestions: questions.length,
      percentage,
      isHighScore,
      resultTitle,
      resultMessage,
      feedback: feedbackList,
    });
  };

  const fireCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);
    } catch {
      // Graceful fallback if confetti unavailable
    }
  };

  const handleReplayQuiz = () => {
    soundEngine.playSuccessChime();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setAnswers([]);
    setQuizFinished(false);
    setGradingResult(null);
    setShowReview(false);
  };

  // -------------------------------------------------------------------------
  // LOADING / GRADING SCREEN
  // -------------------------------------------------------------------------
  if (isGrading) {
    return (
      <div className="w-full max-w-xl mx-auto p-12 text-center glass-panel rounded-3xl border border-white/10 shadow-2xl">
        <Loader2 className="w-10 h-10 animate-spin mx-auto text-amber-400 mb-4" />
        <h4 className="font-cinematic text-xl text-white font-bold mb-2">
          Grading Celestial Answers...
        </h4>
        <p className="text-sm text-slate-300">
          Comparing your memories with the eternal Starlight Archive
        </p>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // QUIZ FINISHED / RESULTS SCREEN
  // -------------------------------------------------------------------------
  if (quizFinished && gradingResult) {
    const isHighScore = gradingResult.isHighScore || gradingResult.percentage >= 80;
    const badge = getQuestionTypeBadge();

    return (
      <div className="w-full max-w-2xl mx-auto px-4 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top Crest / Trophy */}
          <div className="relative mb-4">
            <div
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center border-2 shadow-2xl transition-all duration-300"
              style={{
                borderColor: themeColor,
                backgroundColor: `${themeColor}22`,
                boxShadow: `0 0 30px ${themeColor}60`,
              }}
            >
              {isHighScore ? (
                <Trophy className="w-12 h-12 text-amber-300 animate-pulse" />
              ) : (
                <Award className="w-12 h-12" style={{ color: themeColor }} />
              )}
            </div>
            {isHighScore && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500 text-black shadow-lg">
                High Honor 🏆
              </span>
            )}
          </div>

          {/* Title & Tier Message */}
          <h3 className="font-cinematic text-2xl sm:text-3xl font-bold text-white mb-2">
            {gradingResult.resultTitle}
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6">
            {gradingResult.resultMessage}
          </p>

          {/* Score & Percentage Banner */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-mono">
                Accuracy Score
              </span>
              <span className="text-2xl sm:text-3xl font-bold" style={{ color: themeColor }}>
                {gradingResult.score} / {gradingResult.totalQuestions}
              </span>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-mono">
                Celestial Match
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-300">
                {gradingResult.percentage}%
              </span>
            </div>
          </div>

          {/* 🌟 FINAL SURPRISE FOR HIGH SCORES (>= 80%) 🌟 */}
          {isHighScore && (
            <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/30 text-left relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h4 className="font-cinematic text-base sm:text-lg font-bold text-amber-200 tracking-wide">
                  High-Score Reward: Arshiya&apos;s Secret Voice Note
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-4">
                You scored above 80%! As a special high-score tribute, you have unlocked an exclusive, private audio message from Arshiya created especially for you.
              </p>
              <VoiceNotePlayer
                themeColor={themeColor}
                recipientName={recipientName}
                duration="2:10"
              />
            </div>
          )}

          {/* Review Answers Toggle Button */}
          <button
            onClick={() => setShowReview(!showReview)}
            className="w-full mb-6 py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-medium text-slate-300 flex items-center justify-center gap-2 transition-colors"
          >
            <span>{showReview ? "Hide Question Review" : "Review All 12 Questions & Explanations"}</span>
            {showReview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Accordion Review of All 12 Questions */}
          {showReview && (
            <div className="space-y-4 text-left mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, idx) => {
                const fb = gradingResult.feedback[idx];
                const chosenIdx = answers[idx];
                const isCorrect = fb ? fb.isCorrect : chosenIdx === q.options.findIndex((o) => o.isCorrect);

                return (
                  <div
                    key={q.id || idx}
                    className="p-4 rounded-xl bg-slate-900/90 border border-white/10 relative"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-slate-300">
                          #{idx + 1}
                        </span>
                        {q.teluguQuestion && (
                          <span className="font-telugu text-xs text-amber-300/90 font-medium">
                            {q.teluguQuestion}
                          </span>
                        )}
                      </div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-4 h-4" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-rose-400 font-semibold">
                          <XCircle className="w-4 h-4" /> Missed
                        </span>
                      )}
                    </div>

                    <h5 className="text-sm font-medium text-white mb-2">{q.question}</h5>

                    <div className="text-xs space-y-1 mb-2">
                      <p className="text-slate-400">
                        <span className="text-slate-500">Your Answer:</span>{" "}
                        <span className={isCorrect ? "text-emerald-300 font-medium" : "text-rose-300 font-medium"}>
                          {q.options[chosenIdx]?.text || "None"}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-300">
                          <span className="text-slate-500">Correct Answer:</span>{" "}
                          <span className="font-medium">
                            {q.options[fb?.correctOptionIndex ?? q.options.findIndex((o) => o.isCorrect)]?.text}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400 italic">
                      💡 {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action Buttons: Replay vs Continue */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleReplayQuiz}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => onComplete(gradingResult.score)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
              style={{
                backgroundColor: themeColor,
                boxShadow: `0 0 25px ${themeColor}60`,
              }}
            >
              <span>Proceed to Arshiya&apos;s Private Letter & Climax</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // ACTIVE QUESTION SCREEN
  // -------------------------------------------------------------------------
  const badge = getQuestionTypeBadge(currentQ.type);
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Header: Title, Question Type Badge, Progress Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" style={{ color: themeColor }} />
            <h3 className="font-cinematic text-sm sm:text-base font-bold tracking-wide text-white">
              How Well Do You Know Arshiya?
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}
            >
              {badge.label}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {currentIdx + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full transition-all duration-300 rounded-full"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: themeColor,
              boxShadow: `0 0 10px ${themeColor}`,
            }}
          />
        </div>

        {/* Telugu Question if available */}
        {currentQ.teluguQuestion && (
          <p className="font-telugu text-sm sm:text-base text-amber-300/90 mb-2 font-medium">
            {currentQ.teluguQuestion}
          </p>
        )}

        {/* Main English Question */}
        <h4 className="text-lg sm:text-xl font-semibold text-slate-100 mb-6 leading-snug">
          {currentQ.question}
        </h4>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const optionLetters = ["A", "B", "C", "D"];

            let optionStyles =
              "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-200";

            if (isSelected) {
              optionStyles =
                "border-amber-400/80 bg-amber-500/15 text-white shadow-[0_0_20px_rgba(245,166,35,0.25)]";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between group ${optionStyles}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      isSelected
                        ? "bg-amber-400 text-black"
                        : "bg-white/10 text-slate-300 group-hover:bg-white/20"
                    }`}
                  >
                    {optionLetters[idx] || idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                </div>

                {isSelected && (
                  <Check
                    className="w-5 h-5 flex-shrink-0 animate-in zoom-in-75 duration-200"
                    style={{ color: themeColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Reaction Dialogue Feedback on Selection */}
        {isAnswered && selectedOption !== null && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 mb-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Arshiya&apos;s Reaction:
              </span>
            </div>
            <p className="text-sm text-slate-200 italic leading-relaxed">
              &ldquo;{currentQ.options[selectedOption].reaction}&rdquo;
            </p>
          </div>
        )}

        {/* Next Question / Finish Button */}
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white tracking-wide transition-transform hover:scale-[1.01] active:scale-98 shadow-xl"
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 0 25px ${themeColor}50`,
            }}
          >
            <span>
              {currentIdx < questions.length - 1
                ? "Next Question"
                : "Submit Answers & Verify Celestial Bond"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
