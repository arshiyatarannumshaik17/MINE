"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Award, Heart } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function SnackAttackChaosGame({ onComplete, themeColor }: MiniGameProps) {
  const [snacks, setSnacks] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);

  const treats = [
    { id: "boba", name: "Strawberry Boba Tea 🧋" },
    { id: "cake", name: "Fluffy Japanese Cheesecake 🍰" },
    { id: "macaron", name: "Pastel Macarons 🍬" },
    { id: "fries", name: "Cheesy Loaded Fries 🍟" },
    { id: "waffle", name: "Nutella Belgian Waffle 🧇" },
  ];

  const handleSnack = (id: string) => {
    if (snacks.includes(id)) return;
    soundEngine.playBoing();
    const updated = [...snacks, id];
    setSnacks(updated);

    if (updated.length === treats.length && !isWon) {
      setIsWon(true);
      soundEngine.playSuccessChime();
      confetti({ particleCount: 90, spread: 70 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Snack Attack Chaos
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300">
            Snacks Munched: {snacks.length} / {treats.length}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap each delicious treat 🧋🍰 to cancel the diet and activate 100% bestie happiness!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {treats.map((t) => {
            const eaten = snacks.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => handleSnack(t.id)}
                disabled={eaten}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all transform active:scale-95 ${
                  eaten
                    ? "bg-pink-950/40 border-pink-500/50 text-pink-300 line-through opacity-70"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200 hover:scale-105"
                }`}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-pink-950/50 border border-pink-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-400">
              <Award className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Chaos Level: 1000%!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;CHAOS LEVEL: 1000%! Double trouble certified forever! Food and laughter win every time!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Muskan&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

