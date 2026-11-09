"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, ArrowLeft, ArrowUp, ArrowRight, Award, Music } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function DanceStepSyncGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(6);
  const [activeStep, setActiveStep] = useState<"left" | "up" | "right">("up");
  const [activeBeat, setActiveBeat] = useState("Water Pump Motor Rhythm: Dhug-Dhug-Dhug! 🌊");
  const [isWon, setIsWon] = useState(false);

  const beats = [
    "Water Pump Motor Beat: Dhug-Dhug-Dhug! 🌊",
    "Pudeena's Bollywood Wedding Hookstep! 🌿",
    "Vadina's Living Room Sangeet Groove! 💃",
    "Motor Vibration Rhythm Max Speed! ⚡",
    "Viral Dance Reel Completed! ✨",
  ];

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
      setActiveBeat(beats[Math.min(beats.length - 1, newScore - 1)]);

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
            <Music className="w-5 h-5 text-emerald-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Pudeena&apos;s Motor Beat Dance Sync
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-300">
            Dance Beats: {score} / {target}
          </span>
        </div>

        {/* Live Rhythm Ticker */}
        <div className="p-3 mb-6 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-200 text-xs font-mono font-bold animate-pulse">
          {activeBeat}
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Hit the glowing arrows in sync with the motor beats! Vadina can dance to anything!
        </p>

        {/* Dance Arrow Buttons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => handleStepClick("left")}
            className={`p-5 rounded-2xl border transition-all duration-300 transform active:scale-90 cursor-pointer ${
              activeStep === "left"
                ? "bg-emerald-500 border-emerald-300 text-white shadow-xl shadow-emerald-500/40 scale-110 animate-bounce"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <ArrowLeft className="w-7 h-7" />
          </button>

          <button
            onClick={() => handleStepClick("up")}
            className={`p-5 rounded-2xl border transition-all duration-300 transform active:scale-90 cursor-pointer ${
              activeStep === "up"
                ? "bg-emerald-500 border-emerald-300 text-white shadow-xl shadow-emerald-500/40 scale-110 animate-bounce"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <ArrowUp className="w-7 h-7" />
          </button>

          <button
            onClick={() => handleStepClick("right")}
            className={`p-5 rounded-2xl border transition-all duration-300 transform active:scale-90 cursor-pointer ${
              activeStep === "right"
                ? "bg-emerald-500 border-emerald-300 text-white shadow-xl shadow-emerald-500/40 scale-110 animate-bounce"
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            <ArrowRight className="w-7 h-7" />
          </button>
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-emerald-300">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h4 className="font-cinematic font-bold">Motor Rhythm Mastered, Vadina!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Pudeena drops a beat to any vibration! Pure sisterhood and festival joy.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Mubeena&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
