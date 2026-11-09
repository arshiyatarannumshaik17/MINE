"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { GlassWater, Zap, Laugh, ShieldAlert } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function WaterBottleCatchGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(6);
  const [isWon, setIsWon] = useState(false);
  const [activeQuote, setActiveQuote] = useState("Snatch the cold water bottles before Arshiya cries!");
  const [items, setItems] = useState<{ id: number; type: "bottle" | "chappal"; x: number; y: number }[]>([]);

  const roasts = [
    "Kottinan anukoo tirgutav barre! 🐮",
    "Actually... 1, 2, 3! ⏰",
    "I am the HR of this fridge! 📋",
    "Arshiyaaa Arshiyaaaaa! 📢",
    "Cold water heist successful! ❄️",
  ];

  // Spawn game items
  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      const type = Math.random() > 0.35 ? "bottle" : "chappal";
      const newItem = {
        id: Date.now() + Math.random(),
        type: type as "bottle" | "chappal",
        x: Math.random() * 80 + 10,
        y: 10,
      };
      setItems((prev) => [...prev.slice(-6), newItem]);
    }, 900);

    return () => clearInterval(interval);
  }, [isWon]);

  const handleItemClick = (item: { id: number; type: "bottle" | "chappal" }) => {
    if (item.type === "bottle") {
      soundEngine.playBoing();
      const newScore = score + 1;
      setScore(newScore);
      setActiveQuote(roasts[Math.floor(Math.random() * roasts.length)]);
      setItems((prev) => prev.filter((i) => i.id !== item.id));

      if (newScore >= target) {
        setIsWon(true);
        soundEngine.playSuccessChime();
        confetti({ particleCount: 85, spread: 65 });
      }
    } else {
      soundEngine.playBuzzer();
      setActiveQuote("Ouch! Slipper hit! 'Arshiyaaa Arshiyaaaaa!' 🩴");
      setScore((prev) => Math.max(0, prev - 1));
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GlassWater className="w-5 h-5 text-teal-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Water Bottle &amp; Pinch Gauntlet
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-300">
            Bottles Pinched: {score} / {target}
          </span>
        </div>

        {/* Live Sibling Banter Ticker */}
        <div className="p-3 mb-4 rounded-xl bg-teal-950/40 border border-teal-500/20 text-teal-200 text-xs font-mono font-bold animate-pulse">
          {activeQuote}
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap the ice-cold fridge bottles 🧊 to pinch them, but DODGE the flying slippers 🩴!
        </p>

        {/* Game Arena */}
        <div className="relative h-64 w-full rounded-2xl bg-gradient-to-b from-teal-950/30 via-slate-950 to-teal-950/20 border border-white/10 overflow-hidden">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{ left: `${item.x}%`, top: `40%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-3 text-3xl animate-bounce hover:scale-125 transition-transform"
            >
              {item.type === "bottle" ? "🧊🧃" : "🩴"}
            </button>
          ))}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-teal-950/50 border border-teal-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-teal-300">
              <Zap className="w-5 h-5 text-teal-400" />
              <h4 className="font-cinematic font-bold">Fridge Conquered, Sameerbasha!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;Actually... 1, 2, 3! Kottinan anukoo tirgutav barre!&rdquo; — You won the fridge heist!
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg"
            >
              Continue to Sameer&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
