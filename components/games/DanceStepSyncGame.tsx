"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, ArrowLeft, ArrowUp, ArrowRight, Award } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function DanceStepSyncGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(6);
  const [activeStep, setActiveStep] = useState<"left" | "up" | "right">("up");
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    if (isWon) return;

    const steps: ("left" | "up" | "right")[] = ["left", "up", "right"];
    const interval = setInterval(() => {
      const nextStep = steps[Math.floor(Math.random() * steps.length)];
      setActiveStep(nextStep);
    }, 1100);

    return () => clearInterval(interval);
  }, [isWon]);

  const handleStepClick = (step: "left" | "up" | "right") => {
    if (step === activeStep) {
      soundEngine.playSuccessChime();
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= target) {
        setIsWon(true);
        confetti({ particleCount: 90, spread: 70 });
      }
    } else {
      soundEngine.playBuzzer();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Pudeena&apos;s Dance Step Sync
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-300">
            Dance Beats: {score} / {target}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Match the flashing dance step arrow 💃 to synchronize the Bollywood routine!
        </p>

        {/* 3 Step Arrows */}
        <div className="flex items-center justify-center gap-4 py-6">
          <button
            onClick={() => handleStepClick("left")}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 transform active:scale-90 ${
              activeStep === "left"
                ? "bg-emerald-500/40 border-emerald-400 shadow-[0_0_25px_#10b981] scale-110"
                : "bg-white/5 border-white/10 opacity-70"
            }`}
          >
            <ArrowLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={() => handleStepClick("up")}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 transform active:scale-90 ${
              activeStep === "up"
                ? "bg-fuchsia-500/40 border-fuchsia-400 shadow-[0_0_25px_#d946ef] scale-110"
                : "bg-white/5 border-white/10 opacity-70"
            }`}
          >
            <ArrowUp className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={() => handleStepClick("right")}
            className={`p-5 rounded-2xl border-2 transition-all duration-200 transform active:scale-90 ${
              activeStep === "right"
                ? "bg-emerald-500/40 border-emerald-400 shadow-[0_0_25px_#10b981] scale-110"
                : "bg-white/5 border-white/10 opacity-70"
            }`}
          >
            <ArrowRight className="w-8 h-8 text-white" />
          </button>
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400">
              <Award className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Dance Floor Conquered!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;100% SYNC! Bollywood is officially calling Mubeena &amp; Arshiya!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Mubeena&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

