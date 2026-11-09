"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Utensils, Award } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function StreetFoodScrambleGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(6);
  const [isWon, setIsWon] = useState(false);
  const [snacks, setSnacks] = useState<{ id: number; icon: string; name: string; x: number }[]>([]);

  const foodOptions = [
    { icon: "🥟", name: "Panipuri" },
    { icon: "☕", name: "Cutting Chai" },
    { icon: "🍛", name: "Biryani" },
    { icon: "🥪", name: "Sandwich" },
    { icon: "🍟", name: "Peri Fries" },
  ];

  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      const food = foodOptions[Math.floor(Math.random() * foodOptions.length)];
      const newSnack = {
        id: Date.now() + Math.random(),
        icon: food.icon,
        name: food.name,
        x: Math.random() * 80 + 10,
      };
      setSnacks((prev) => [...prev.slice(-5), newSnack]);
    }, 850);

    return () => clearInterval(interval);
  }, [isWon]);

  const handleCatchSnack = (id: number) => {
    soundEngine.playSuccessChime();
    const newScore = score + 1;
    setScore(newScore);
    setSnacks((prev) => prev.filter((s) => s.id !== id));

    if (newScore >= target) {
      setIsWon(true);
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-500" />
            <h3 className="font-cinematic text-base font-bold text-white">
              B.Tech Street Food Scramble
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400">
            Snacks Gathered: {score} / {target}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Tap the tasty college street snacks 🥟☕ to power through final-year B.Tech!
        </p>

        <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 border border-white/10 overflow-hidden select-none flex items-center justify-center">
          {snacks.map((snack) => (
            <button
              key={snack.id}
              onClick={() => handleCatchSnack(snack.id)}
              className="absolute -translate-x-1/2 p-3 rounded-2xl text-3xl animate-bounce hover:scale-125 transition-transform"
              style={{ left: `${snack.x}%`, top: `${Math.random() * 50 + 20}%` }}
              title={snack.name}
            >
              {snack.icon}
            </button>
          ))}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-950/50 border border-amber-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
              <Award className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Food Queens of B.Tech!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;Diet canceled! Jhansi and Arshiya officially reign as the ultimate B.Tech Food Queens!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Jhansi&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
