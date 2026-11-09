"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Star } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

const MILESTONES = [
  { year: 1, title: "Year 1: The Shy Beginning", text: "Stolen glances and discovering a universe in your smile." },
  { year: 2, title: "Year 2: Growing Together", text: "Long late-night calls and sharing our deepest ambitions." },
  { year: 3, title: "Year 3: Through Every Storm", text: "Your patience and loyalty showing me what true care is." },
  { year: 4, title: "Year 4: Trips & Long Drives", text: "Empty roads, favorite songs on loop, your hand in mine." },
  { year: 5, title: "Year 5: Deep Maturity", text: "Knowing what the other thinks before a single word is spoken." },
  { year: 6, title: "Year 6: Unshakable Faith", text: "Building dreams and praying for our future side by side." },
  { year: 7, title: "Year 7: One Universe", text: "Seven beautiful years. An In Sha Allah forever together." },
];

export default function ConstellationSevenGame({ onComplete, themeColor }: MiniGameProps) {
  const [unlockedStars, setUnlockedStars] = useState<number[]>([]);
  const [activeMemory, setActiveMemory] = useState<string | null>(null);

  const handleStarClick = (year: number) => {
    if (!unlockedStars.includes(year)) {
      soundEngine.playSuccessChime();
      const updated = [...unlockedStars, year];
      setUnlockedStars(updated);
      setActiveMemory(MILESTONES[year - 1].text);

      if (updated.length === 7) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } else {
      setActiveMemory(MILESTONES[year - 1].text);
    }
  };

  const isCompleted = unlockedStars.length === 7;

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Constellation of Seven
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-rose-300">
            Stars Lit: {unlockedStars.length} / 7
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Tap each of the 7 celestial stars to illuminate our 7-year journey together.
        </p>

        {/* Constellation Star Map */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-b from-indigo-950/60 via-slate-950 to-rose-950/40 border border-white/10 overflow-hidden flex items-center justify-center p-4">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-2 w-full max-w-md z-10">
            {MILESTONES.map((m) => {
              const isLit = unlockedStars.includes(m.year);
              return (
                <button
                  key={m.year}
                  onClick={() => handleStarClick(m.year)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    isLit
                      ? "bg-rose-900/40 border-rose-400 shadow-[0_0_15px_#f43f5e] text-rose-200"
                      : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                  }`}
                >
                  <Star
                    className={`w-6 h-6 mb-1 ${
                      isLit ? "fill-rose-400 text-rose-400 animate-pulse" : "text-slate-500"
                    }`}
                  />
                  <span className="text-[10px] font-bold">Yr {m.year}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Revealed Memory Banner */}
        {activeMemory && (
          <div className="mt-4 p-3.5 rounded-xl bg-slate-900/80 border border-white/10 text-xs text-rose-200 italic animate-in fade-in">
            &ldquo;{activeMemory}&rdquo;
          </div>
        )}

        {/* Completion Message */}
        {isCompleted && (
          <div className="mt-4 p-5 rounded-2xl bg-rose-950/50 border border-rose-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-rose-400">
              <Heart className="w-5 h-5 fill-rose-400" />
              <h4 className="font-cinematic font-bold">Seven Years, One Universe</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;Every star in my sky has your name on it. Seven down, a lifetime to go. In Sha Allah.&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Afrid&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

