"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/lib/types";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, Award, Sparkles } from "lucide-react";

interface QuizContainerProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
  themeColor?: string;
  recipientName: string;
}

export default function QuizContainer({
  questions,
  onComplete,
  themeColor = "#f5a623",
  recipientName,
}: QuizContainerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      soundEngine.playSuccessChime();
      setScore((prev) => prev + 1);
    } else {
      soundEngine.playBuzzer();
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      onComplete(score);
    }
  };

  if (quizFinished) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 text-center">
        <div className="glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
            style={{
              borderColor: themeColor,
              backgroundColor: `${themeColor}22`,
            }}
          >
            <Award className="w-10 h-10" style={{ color: themeColor }} />
          </div>

          <h3 className="font-cinematic text-2xl font-bold text-white mb-2">
            Universe Bond Verified!
          </h3>
          <p className="text-slate-300 text-sm mb-6">
            {recipientName}, you scored{" "}
            <span className="font-bold text-lg" style={{ color: themeColor }}>
              {score} / {questions.length}
            </span>
            ! Your connection with Arshiya is timeless.
          </p>

          <button
            onClick={() => onComplete(score)}
            className="px-6 py-3 rounded-xl font-semibold text-white tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-xl"
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 0 25px ${themeColor}50`,
            }}
          >
            Proceed to Arshiya&apos;s Private Letter & Climax
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" style={{ color: themeColor }} />
            <h3 className="font-cinematic text-sm sm:text-base font-bold tracking-wide text-white">
              How Well Do You Know Arshiya?
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Question {currentIdx + 1} of {questions.length}
          </span>
        </div>

        {/* Telugu Question if available */}
        {currentQ.teluguQuestion && (
          <p className="font-telugu text-sm text-amber-300/90 mb-1.5 italic font-medium">
            {currentQ.teluguQuestion}
          </p>
        )}

        {/* English Question */}
        <h4 className="text-lg sm:text-xl font-semibold text-slate-100 mb-6 leading-snug">
          {currentQ.question}
        </h4>

        {/* Multiple Choice Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((opt, idx) => {
            let optionStyles =
              "border-white/10 bg-white/5 hover:bg-white/10 text-slate-200";

            if (isAnswered) {
              if (opt.isCorrect) {
                optionStyles =
                  "border-emerald-500/60 bg-emerald-950/40 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
              } else if (selectedOption === idx) {
                optionStyles =
                  "border-rose-500/60 bg-rose-950/40 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.2)]";
              } else {
                optionStyles = "border-white/5 bg-white/2 text-slate-500 opacity-60";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl text-left border transition-all duration-200 flex items-center justify-between group ${optionStyles}`}
              >
                <span className="text-sm sm:text-base font-medium">{opt.text}</span>
                {isAnswered && (
                  <span>
                    {opt.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : selectedOption === idx ? (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    ) : null}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Reaction Dialogue Feedback */}
        {isAnswered && selectedOption !== null && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 mb-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Arshiya&apos;s Reaction:
              </span>
            </div>
            <p className="text-sm text-slate-200 italic">
              &ldquo;{currentQ.options[selectedOption].reaction}&rdquo;
            </p>
          </div>
        )}

        {/* Continue Button */}
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white tracking-wide transition-transform hover:scale-[1.02] active:scale-98 shadow-xl"
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 0 25px ${themeColor}40`,
            }}
          >
            <span>
              {currentIdx < questions.length - 1 ? "Next Question" : "View Results"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
