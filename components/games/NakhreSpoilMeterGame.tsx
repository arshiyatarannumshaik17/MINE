"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Crown, Heart, Sparkles } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function NakhreSpoilMeterGame({ onComplete, themeColor }: MiniGameProps) {
  const [meter, setMeter] = useState(20);
  const [isWon, setIsWon] = useState(false);

  const treats = [
    { name: "Princess Tiara 👑", boost: 20 },
    { name: "Giant Teddy Bear 🧸", boost: 20 },
    { name: "Secret Chocolates 🍫", boost: 20 },
    { name: "Strawberry Cupcake 🧁", boost: 20 },
  ];

  const handleSpoil = (boost: number) => {
    soundEngine.playSuccessChime();
    const newMeter = meter + boost;
    setMeter(newMeter);

    if (newMeter >= 100 && !isWon) {
      setIsWon(true);
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-pink-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Nakhre Spoil-O-Meter
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300">
            Spoil Level: {Math.min(100, meter)}%
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Shower Little Queen Qurayba with all her royal demands until the meter explodes!
        </p>

        {/* Spoil Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {treats.map((t, idx) => (
            <button
              key={idx}
              onClick={() => handleSpoil(t.boost)}
              className="p-3.5 rounded-xl border border-pink-400/30 bg-pink-950/20 hover:bg-pink-900/40 text-pink-200 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2"
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {/* Meter Bar */}
        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden border border-white/10 mb-4">
          <div
            className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300"
            style={{ width: `${Math.min(100, meter)}%` }}
          />
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-pink-950/50 border border-pink-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-400">
              <Heart className="w-5 h-5 fill-pink-400" />
              <h4 className="font-cinematic font-bold">10,000% Spoiled!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;METER EXPLODED! Qurayba is officially 10,000% Spoiled by Khala Arshiya!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Qurayba&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

