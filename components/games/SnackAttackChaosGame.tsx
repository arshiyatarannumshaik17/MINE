"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Award, Heart, Smile } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function SnackAttackChaosGame({ onComplete, themeColor }: MiniGameProps) {
  const [snacks, setSnacks] = useState<string[]>([]);
  const [activeReaction, setActiveReaction] = useState("Tap treats to match twin expressions & cancel diets!");
  const [isWon, setIsWon] = useState(false);

  const treats = [
    { id: "waffle", name: "Nutella Belgian Waffle 🧇", reaction: "Diet canceled in 12 seconds flat! Worth it!" },
    { id: "boba", name: "Strawberry Boba Tea 🧋", reaction: "Twin eyebrow raise across the cafe table!" },
    { id: "fries", name: "Cheesy Loaded Fries 🍟", reaction: "'Dubbi & Hippo' snack attack activated!" },
    { id: "cake", name: "Fluffy Cheesecake 🍰", reaction: "Telepathic giggles echoing through the room!" },
    { id: "macaron", name: "Pastel Macarons 🍬", reaction: "Zero judgment, pure joy, twin souls forever!" },
  ];

  const handleSnack = (item: { id: string; reaction: string }) => {
    if (snacks.includes(item.id)) return;
    soundEngine.playBoing();
    const updated = [...snacks, item.id];
    setSnacks(updated);
    setActiveReaction(item.reaction);

    if (updated.length === treats.length && !isWon) {
      setIsWon(true);
      soundEngine.playSuccessChime();
      confetti({ particleCount: 90, spread: 70 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-pink-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Twin Expression &amp; Snack Chaos
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300">
            Munched: {snacks.length} / {treats.length}
          </span>
        </div>

        {/* Live Reaction Ticker */}
        <div className="p-3 mb-6 rounded-xl bg-pink-950/40 border border-pink-500/20 text-pink-200 text-xs sm:text-sm font-mono font-bold animate-pulse">
          {activeReaction}
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Match twin expressions, celebrate &ldquo;Dubbi &amp; Hippo&rdquo; humor, and cancel the diet with waffles and boba!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {treats.map((t) => {
            const eaten = snacks.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => handleSnack(t)}
                disabled={eaten}
                className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-md flex items-center justify-between cursor-pointer ${
                  eaten
                    ? "bg-pink-500/20 border-pink-400/50 text-pink-200 opacity-80"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{t.name}</span>
                <span className="text-xs font-mono font-bold">
                  {eaten ? "✓ Devoured" : "+ Munch"}
                </span>
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-pink-950/50 border border-pink-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-300">
              <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
              <h4 className="font-cinematic font-bold">Dubbi &amp; Hippo Happiness 100%!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Twin expressions matched! Shared laughter and snack therapy forever.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Muskan&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
