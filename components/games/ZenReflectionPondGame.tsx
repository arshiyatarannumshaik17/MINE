"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Moon, Award } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function ZenReflectionPondGame({ onComplete, themeColor }: MiniGameProps) {
  const [ripples, setRipples] = useState<{ id: number; text: string }[]>([]);
  const [isWon, setIsWon] = useState(false);

  const wisdomQuotes = [
    "Grace under pressure is your quiet strength.",
    "True boundaries protect the purity of your peace.",
    "In silence and trust, our sisterhood needs no words.",
    "You are an anchor when the world gets loud.",
  ];

  const handlePondClick = () => {
    soundEngine.playSuccessChime();
    const nextIdx = ripples.length;
    if (nextIdx < wisdomQuotes.length) {
      const newRipple = {
        id: Date.now(),
        text: wisdomQuotes[nextIdx],
      };
      const updated = [...ripples, newRipple];
      setRipples(updated);

      if (updated.length === wisdomQuotes.length && !isWon) {
        setIsWon(true);
        confetti({ particleCount: 70, spread: 60 });
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-slate-300" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Zen Reflection Pond
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Reflections: {ripples.length} / 4
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap the calm lunar waters 💧 to create gentle ripples of wisdom and sisterhood.
        </p>

        {/* Pond Interactive Area */}
        <div
          onClick={handlePondClick}
          className="relative h-60 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/40 border border-white/15 overflow-hidden flex flex-col items-center justify-center cursor-pointer p-4 select-none group"
        >
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
            🌕
          </div>
          <span className="text-xs text-slate-400 font-mono tracking-wider uppercase">
            Tap surface to ripple
          </span>

          {/* Active wisdom text */}
          {ripples.length > 0 && (
            <div className="mt-3 text-xs sm:text-sm text-slate-200 italic font-medium px-4 py-2 rounded-xl bg-slate-950/70 border border-white/10 animate-in fade-in">
              &ldquo;{ripples[ripples.length - 1].text}&rdquo;
            </div>
          )}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-900/60 border border-white/20 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-slate-200">
              <Award className="w-5 h-5 text-amber-300" />
              <h4 className="font-cinematic font-bold">Anchored in Wisdom</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic mb-4">
              &ldquo;In a world of noise, your wisdom is my calm. Thank you for being my anchor, Sana.&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Sana&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
