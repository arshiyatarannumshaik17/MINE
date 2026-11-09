"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Crown, Heart, Sparkles, Smartphone, PenTool } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function NakhreSpoilMeterGame({ onComplete, themeColor }: MiniGameProps) {
  const [meter, setMeter] = useState(20);
  const [activeMessage, setActiveMessage] = useState("Pamper Little Princess Qurayba (Age 5-6)!");
  const [isWon, setIsWon] = useState(false);

  const activities = [
    { name: "Watch Rhymes on Phone Together 📱", boost: 20, text: "Curled up together laughing at funny cartoons!" },
    { name: "Draw Doodles on Arshiya's Hands ✍️", boost: 20, text: "Turning Arshiya's hands into colorful doodle art!" },
    { name: "Running Bear Hug on Visit! 🫂", boost: 20, text: "Running across the room into Arshiya's arms!" },
    { name: "Chulbuli's Secret Chocolates 🍫", boost: 20, text: "Pilla Pichuka gets unlimited chocolate treats!" },
  ];

  const handleSpoil = (item: { boost: number; text: string }) => {
    soundEngine.playSuccessChime();
    const newMeter = meter + item.boost;
    setMeter(newMeter);
    setActiveMessage(item.text);

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
              Qurayba&apos;s Doodle &amp; Spoil-O-Meter
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300">
            Spoil Level: {Math.min(100, meter)}%
          </span>
        </div>

        {/* Live Activity Ticker */}
        <div className="p-3 mb-6 rounded-xl bg-pink-950/40 border border-pink-500/20 text-pink-200 text-xs font-mono font-bold animate-pulse">
          {activeMessage}
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Pamper our 5-6 year old Princess! Watch phone videos, draw doodles on Arshiya&apos;s hands, and share big hugs!
        </p>

        {/* Activity Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {activities.map((t, idx) => (
            <button
              key={idx}
              onClick={() => handleSpoil(t)}
              className="p-3.5 rounded-2xl border border-pink-400/30 bg-pink-950/20 hover:bg-pink-900/40 text-pink-100 text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.name}</span>
            </button>
          ))}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-pink-950/50 border border-pink-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-300">
              <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
              <h4 className="font-cinematic font-bold">First Little Jaan 100% Pampered!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;Ashi Shaitaan! Arshiya!&rdquo; — Endless doodles, running hugs, and unconditional love forever!
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Qurayba&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
