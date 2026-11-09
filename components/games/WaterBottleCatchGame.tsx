"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { GlassWater, Zap, Laugh } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function WaterBottleCatchGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(6);
  const [isWon, setIsWon] = useState(false);
  const [items, setItems] = useState<{ id: number; type: "bottle" | "chappal"; x: number; y: number }[]>([]);

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
      setItems((prev) => prev.filter((i) => i.id !== item.id));

      if (newScore >= target) {
        setIsWon(true);
        soundEngine.playSuccessChime();
        confetti({ particleCount: 80, spread: 60 });
      }
    } else {
      soundEngine.playBuzzer();
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
              The Cold Water Bottle Heist
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-300">
            Bottles Pinched: {score} / {target}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-4">
          Tap the ice-cold water bottles 🧊! Don&apos;t tap Arshiya&apos;s flying slippers 🩴!
        </p>

        {/* Playfield */}
        <div className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 border border-white/10 overflow-hidden select-none">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-2xl text-2xl animate-bounce hover:scale-125 transition-transform"
              style={{ left: `${item.x}%`, top: `${Math.random() * 60 + 20}%` }}
            >
              {item.type === "bottle" ? "🧊🍾" : "🩴💢"}
            </button>
          ))}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-teal-950/50 border border-teal-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-teal-400">
              <Laugh className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Heist Succeeded!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;Mission Accomplished! You stole the water bottle, but you still have to refill the tray, Sameer!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Sameer&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
