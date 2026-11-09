"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Utensils, Award, Sparkles, MapPin } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function StreetFoodScrambleGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(6);
  const [isWon, setIsWon] = useState(false);
  const [activeSpot, setActiveSpot] = useState("Random Park Street Food Corner");
  const [snacks, setSnacks] = useState<{ id: number; icon: string; name: string; spot: string; x: number }[]>([]);

  const foodOptions = [
    { icon: "🥟", name: "Final Year Panipuri", spot: "Random Park Gate" },
    { icon: "☕", name: "Dump-Fellow Cutting Chai", spot: "Campus Backlane" },
    { icon: "🍛", name: "Engineering Stress Biryani", spot: "Food Street" },
    { icon: "🥪", name: "Stubborn Queen Grilled Toast", spot: "Library Corner" },
    { icon: "🍟", name: "Fast Food Peri Peri Fries", spot: "Adventure Spot" },
  ];

  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      const food = foodOptions[Math.floor(Math.random() * foodOptions.length)];
      const newSnack = {
        id: Date.now() + Math.random(),
        icon: food.icon,
        name: food.name,
        spot: food.spot,
        x: Math.random() * 80 + 10,
      };
      setSnacks((prev) => [...prev.slice(-5), newSnack]);
    }, 850);

    return () => clearInterval(interval);
  }, [isWon]);

  const handleCatchSnack = (snack: { id: number; spot: string }) => {
    soundEngine.playSuccessChime();
    const newScore = score + 1;
    setScore(newScore);
    setActiveSpot(snack.spot);
    setSnacks((prev) => prev.filter((s) => s.id !== snack.id));

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
            <Utensils className="w-5 h-5 text-orange-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Street Food Scramble &amp; Dump-Fellow Trek
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-orange-300">
            Food Treats: {score} / {target}
          </span>
        </div>

        {/* Spot Indicator */}
        <div className="flex items-center justify-center gap-1.5 p-2 mb-4 rounded-xl bg-orange-950/40 border border-orange-500/20 text-orange-200 text-xs font-semibold">
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          <span>Spot: {activeSpot}</span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Catch 6 fast food delicacies across random parks to survive B.Tech final year stress!
        </p>

        {/* Catch Arena */}
        <div className="relative h-64 w-full rounded-2xl bg-gradient-to-b from-orange-950/30 via-slate-950 to-orange-950/20 border border-white/10 overflow-hidden">
          {snacks.map((s) => (
            <button
              key={s.id}
              onClick={() => handleCatchSnack(s)}
              style={{ left: `${s.x}%`, top: "45%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl bg-white/10 border border-white/20 text-3xl animate-bounce hover:scale-125 transition-transform flex flex-col items-center"
            >
              <span>{s.icon}</span>
              <span className="text-[9px] font-sans font-bold text-orange-200 mt-0.5">{s.name}</span>
            </button>
          ))}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-orange-950/50 border border-orange-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-orange-300">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <h4 className="font-cinematic font-bold">Food Queens Victorious!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Dump-fellow adventures conquered! No engineering exam could ever stop our street food quests.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg"
            >
              Continue to Jhansi&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
