"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { ShoppingBag, Award, Heart, Shield } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function ErrandSprintGame({ onComplete, themeColor }: MiniGameProps) {
  const [itemsCollected, setItemsCollected] = useState<string[]>([]);
  const [activeQuote, setActiveQuote] = useState("Collect the family dinner items for Arshiya Baji!");
  const [isWon, setIsWon] = useState(false);

  const marketItems = [
    { name: "Royal Mithai Box 🍬", id: "mithai", quote: "Banagram's favorite dessert stash secured!" },
    { name: "Arshad Bhai Special Biryani 🌾", id: "biryani", quote: "'Arshad bhaii!' Family dinner is on!" },
    { name: "Shadaaoonn Energy Drink ⚡", id: "shadaaoonn", quote: "'Shadaaoonn!' Sprinting at maximum speed!" },
    { name: "Aunty-Joke Memory Scroll 📜", id: "aunty_joke", quote: "The legendary aunty-joke! Still laughing!" },
    { name: "Loyal Sibling Shield 🛡️", id: "shield", quote: "Standing right behind Arshiya Baji forever!" },
  ];

  const handleCollect = (item: { id: string; quote: string }) => {
    if (itemsCollected.includes(item.id)) return;
    soundEngine.playSuccessChime();
    const updated = [...itemsCollected, item.id];
    setItemsCollected(updated);
    setActiveQuote(item.quote);

    if (updated.length === marketItems.length) {
      setIsWon(true);
      confetti({ particleCount: 85, spread: 65 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              Awez&apos;s Sibling Errand &amp; Joke Sprint
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300">
            Collected: {itemsCollected.length} / {marketItems.length}
          </span>
        </div>

        {/* Live Joke Ticker */}
        <div className="p-3 mb-4 rounded-xl bg-amber-950/40 border border-amber-500/20 text-amber-200 text-xs font-mono font-bold animate-pulse">
          {activeQuote}
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Collect all 5 items to prepare the family dinner gathering and unlock our secret jokes!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {marketItems.map((item) => {
            const collected = itemsCollected.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleCollect(item)}
                disabled={collected}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-between ${
                  collected
                    ? "bg-amber-500/20 border-amber-400/50 text-amber-200 opacity-80"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{item.name}</span>
                <span className="text-xs font-mono font-bold">
                  {collected ? "✓ Done" : "+ Take"}
                </span>
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-950/50 border border-amber-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-300">
              <Shield className="w-5 h-5 text-amber-400" />
              <h4 className="font-cinematic font-bold">Banagram Triumph!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;Arshad bhaii! Shadaaoonn!&rdquo; — Loyal brother, family champion, standing behind you always.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg"
            >
              Continue to Awez&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
