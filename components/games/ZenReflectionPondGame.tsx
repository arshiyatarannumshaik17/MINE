"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, Moon, Award, Compass } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function ZenReflectionPondGame({ onComplete, themeColor }: MiniGameProps) {
  const [ripples, setRipples] = useState<{ id: number; title: string; text: string }[]>([]);
  const [isWon, setIsWon] = useState(false);

  const wisdomQuotes = [
    {
      title: "The Golden Boundary",
      text: "“Draw a line if you don't like it.” — Your peace and self-worth are sacred; protect them with clarity.",
    },
    {
      title: "Thoughtful Counsel",
      text: "When something feels unusual, pause and seek grounded wisdom. Never make rushed decisions.",
    },
    {
      title: "Poise Over Noise",
      text: "True strength never needs to raise its voice to command respect. Dignity speaks louder than shouting.",
    },
    {
      title: "Unspoken Trust",
      text: "A sacred sisterhood that needs no everyday words — rooted in deep loyalty, honest advice, and love.",
    },
  ];

  const handlePondClick = () => {
    soundEngine.playSuccessChime();
    const nextIdx = ripples.length;
    if (nextIdx < wisdomQuotes.length) {
      const newRipple = {
        id: Date.now(),
        title: wisdomQuotes[nextIdx].title,
        text: wisdomQuotes[nextIdx].text,
      };
      const updated = [...ripples, newRipple];
      setRipples(updated);

      if (updated.length === wisdomQuotes.length && !isWon) {
        setIsWon(true);
        confetti({ particleCount: 75, spread: 65 });
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-slate-300" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Boundary Line &amp; Zen Reflection Pond
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
            Reflections: {ripples.length} / {wisdomQuotes.length}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap the calm lunar water surface 💧 to establish the 4 Golden Boundaries of Sisterhood &amp; Wisdom.
        </p>

        {/* Interactive Water Ripple Area */}
        <div
          onClick={handlePondClick}
          className="relative h-44 w-full rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950/30 border border-white/10 flex items-center justify-center cursor-pointer group mb-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial from-slate-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform">
            <span className="text-4xl animate-pulse">💧</span>
            <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200">
              {ripples.length < wisdomQuotes.length ? "Tap water to create a ripple" : "All 4 Boundaries Established"}
            </span>
          </div>
        </div>

        {/* Revealed Reflections */}
        <div className="space-y-2.5 mb-6 text-left">
          {ripples.map((r, idx) => (
            <div
              key={r.id}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 animate-in fade-in"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-1">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span>{r.title}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light italic">
                {r.text}
              </p>
            </div>
          ))}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-slate-200">
              <Sparkles className="w-5 h-5 text-slate-300" />
              <h4 className="font-cinematic font-bold">Sanctuary of Wisdom Completed!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;Draw a line if you don&apos;t like it.&rdquo; — The boundary of self-respect and poise forever honored.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-slate-600 hover:bg-slate-500 text-white font-bold text-xs tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Sana&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
