"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Megaphone, Award, Laugh, Flame } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function AmbaaaSoundboardGame({ onComplete, themeColor }: MiniGameProps) {
  const [power, setPower] = useState(0);
  const [shoutText, setShoutText] = useState("Tap the Megaphone to unleash Comedy King power!");
  const [isWon, setIsWon] = useState(false);

  const comedyLines = [
    "AMBAAA! 📣 (Maximum Decibels)",
    "BARRESHIYA! 🐮 (The Cow Legend Lives)",
    "Nduk phn chesnave phn pettey office lo unna! 📞",
    "Hand directly into Arshiya's chicken curry! 🍗",
    "Bot detected! Tollywood dialog awards unlocked! 👑",
  ];

  const handleShout = () => {
    soundEngine.playBoing();
    const nextPower = power + 20;
    setPower(nextPower);
    const lineIndex = Math.min(comedyLines.length - 1, Math.floor(nextPower / 20) - 1);
    setShoutText(comedyLines[lineIndex] || "AMBAAA!");

    if (nextPower >= 100 && !isWon) {
      setIsWon(true);
      soundEngine.playSuccessChime();
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-pink-500" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The AMBAAA Comedy Meter &amp; Curry Heist
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300">
            Power: {Math.min(100, power)}%
          </span>
        </div>

        {/* Live Shout Bubble */}
        <div className="p-3 mb-6 rounded-xl bg-pink-950/40 border border-pink-500/20 text-pink-200 text-xs sm:text-sm font-mono font-bold animate-pulse">
          {shoutText}
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap the retro megaphone to charge Manohar&apos;s legendary AMBAAA yell and chicken curry dialogues to 100%!
        </p>

        {/* Megaphone Trigger Button */}
        <div className="py-6 flex flex-col items-center justify-center">
          <button
            onClick={handleShout}
            className="w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-tr from-pink-600 to-purple-600 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border-4 border-pink-300/40"
          >
            <Megaphone className="w-12 h-12" />
          </button>
          <span className="text-xs text-slate-400 mt-3 font-mono">Tap for comedy blast!</span>
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-pink-950/50 border border-pink-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-300">
              <Laugh className="w-5 h-5 text-pink-400" />
              <h4 className="font-cinematic font-bold">Comedy King Supremacy!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;AMBAAA! Barreshiya! Nduk phn chesnave phn pettey office lo unna!&rdquo; — Pure spontaneous genius!
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Manohar&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
