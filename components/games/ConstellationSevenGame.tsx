"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Star, Compass } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

const MILESTONES = [
  { year: 1, title: "Year 1: Starlight Beginning", text: "When our paths first crossed and Offu ga became my universe." },
  { year: 2, title: "Year 2: Rollapadu Grasslands", text: "Gentle breeze across open plains, discovering true companionship." },
  { year: 3, title: "Year 3: Holy Peace at Darga", text: "Quiet prayers, heartfelt peace, and praying for each other." },
  { year: 4, title: "Year 4: City Forest Escapes", text: "Surrounded by greenery, deep conversations, and shared laughter." },
  { year: 5, title: "Year 5: Belum Caves Wonder", text: "Exploring underground wonders side-by-side, holding hands." },
  { year: 6, title: "Year 6: Sunkesla Road (IYKYK!)", text: "Unforgettable long drives on Sunkesla Road. Empty highway, twilight sky, holding hands... IYKYK!" },
  { year: 7, title: "Year 7: An In Sha Allah Forever", text: "2,555 days of devotion. Ready to build our blessed home together, In Sha Allah." },
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
            <Compass className="w-5 h-5 text-rose-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Constellation of Seven &amp; Sunkesla Trails
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-rose-300">
            Milestones: {unlockedStars.length} / 7
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Connect all 7 stars — from Rollapadu to Sunkesla Road — to light up our seven-year love constellation!
        </p>

        {/* 7 Star Nodes */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
          {MILESTONES.map((m) => {
            const isLit = unlockedStars.includes(m.year);
            return (
              <button
                key={m.year}
                onClick={() => handleStarClick(m.year)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isLit
                    ? "bg-rose-500/20 border-rose-400/60 text-rose-200 shadow-lg shadow-rose-500/20"
                    : "bg-white/5 border-white/10 text-slate-500 hover:text-slate-300"
                }`}
              >
                <Star className={`w-5 h-5 mb-1 ${isLit ? "fill-rose-400 text-rose-400 animate-pulse" : ""}`} />
                <span className="text-[10px] font-mono font-bold">Y{m.year}</span>
              </button>
            );
          })}
        </div>

        {/* Active Memory Card */}
        {activeMemory && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-100 text-xs sm:text-sm leading-relaxed mb-6 animate-in fade-in">
            {activeMemory}
          </div>
        )}

        {isCompleted && (
          <div className="mt-4 p-5 rounded-2xl bg-rose-950/50 border border-rose-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-rose-300">
              <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
              <h4 className="font-cinematic font-bold">Seven Years Written in the Stars!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              From Rollapadu, Darga, City Forest, and Belum Caves to Sunkesla Road (IYKYK!), our journey is eternal.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg"
            >
              Continue to Afrid&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
