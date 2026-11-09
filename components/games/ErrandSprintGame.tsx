"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { ShoppingBag, Award, Heart } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function ErrandSprintGame({ onComplete, themeColor }: MiniGameProps) {
  const [itemsCollected, setItemsCollected] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);

  const marketItems = [
    { name: "Royal Mithai Box 🍬", id: "mithai" },
    { name: "Biryani Special Saffron 🌾", id: "saffron" },
    { name: "Kashmiri Dry Fruits 🌰", id: "dryfruits" },
    { name: "Crisp Evening Samosas 🥟", id: "samosas" },
    { name: "Fresh Fragrant Mint 🌿", id: "mint" },
  ];

  const handleCollect = (id: string) => {
    if (itemsCollected.includes(id)) return;
    soundEngine.playSuccessChime();
    const updated = [...itemsCollected, id];
    setItemsCollected(updated);

    if (updated.length === marketItems.length) {
      setIsWon(true);
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Awez&apos;s Family Errand Sprint
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300">
            Collected: {itemsCollected.length} / {marketItems.length}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Collect all the special ingredients for the family dinner gathering!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {marketItems.map((item) => {
            const collected = itemsCollected.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleCollect(item.id)}
                disabled={collected}
                className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all transform active:scale-95 ${
                  collected
                    ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300 line-through opacity-70"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-200 hover:scale-105"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-950/50 border border-amber-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
              <Award className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Family Dinner Saved!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;No one handles family business with as much heart, loyalty, and style as Awez!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Awez&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
