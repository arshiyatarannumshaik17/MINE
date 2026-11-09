"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function WafeeqaButterflyGame({ onComplete, themeColor }: MiniGameProps) {
  const [butterfliesCaught, setButterfliesCaught] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const handleCatch = () => {
    soundEngine.playSuccessChime();
    const next = butterfliesCaught + 1;
    setButterfliesCaught(next);

    if (next >= 5 && !isWon) {
      setIsWon(true);
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-300" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Wafeeqa&apos;s Butterfly Meadow
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-200">
            Butterflies: {butterfliesCaught} / 5
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap the fluttering pastel butterflies 🦋 to land them on sweet baby Wafeeqa&apos;s flower crown!
        </p>

        <div className="relative h-64 w-full rounded-2xl bg-gradient-to-b from-orange-950/20 via-slate-950 to-pink-950/20 border border-white/10 overflow-hidden flex items-center justify-center">
          <button
            onClick={handleCatch}
            className="p-4 rounded-full text-4xl animate-bounce hover:scale-125 transition-transform"
          >
            🦋🌸
          </button>
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-orange-950/40 border border-orange-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-orange-300">
              <Heart className="w-5 h-5 fill-orange-300" />
              <h4 className="font-cinematic font-bold">Sweet Giggles Unlocked!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;Sweet giggles unlocked! Wafeeqa&apos;s pure smile brightened the whole universe!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Wafeeqa&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

