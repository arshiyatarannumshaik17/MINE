"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Megaphone, Award, Laugh } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function AmbaaaSoundboardGame({ onComplete, themeColor }: MiniGameProps) {
  const [power, setPower] = useState(0);
  const [shoutText, setShoutText] = useState("Tap the Megaphone!");
  const [isWon, setIsWon] = useState(false);

  const shouts = [
    "AMBAAA! 📣",
    "BARRESHIYA! 🐮",
    "DIALOGUE KING ARRIVED! 👑",
    "WHAT A PERFORMANCE! 🎭",
    "AMBAAA MAXIMUM POWER! ⚡",
  ];

  const handleShout = () => {
    soundEngine.playBoing();
    const nextPower = power + 20;
    setPower(nextPower);
    setShoutText(shouts[Math.min(shouts.length - 1, Math.floor(nextPower / 20) - 1)] || "AMBAAA!");

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
              The AMBAAA Comedy Meter
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-pink-300">
            Comedy Power: {Math.min(100, power)}%
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Tap the retro megaphone to charge Manohar&apos;s legendary AMBAAA dialogue to 100%!
        </p>

        {/* Megaphone Trigger Button */}
        <div className="py-6 flex flex-col items-center justify-center">
          <button
            onClick={handleShout}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-transform transform active:scale-90 hover:scale-105 border-4"
            style={{
              backgroundColor: themeColor,
              borderColor: "#fff",
              boxShadow: `0 0 35px ${themeColor}88`,
            }}
          >
            <Megaphone className="w-10 h-10 text-white fill-white animate-pulse" />
            <span className="text-xs font-black tracking-widest text-white mt-1">
              SHOUT!
            </span>
          </button>

          <div className="mt-6 text-xl sm:text-2xl font-black font-cinematic text-pink-300 tracking-wider">
            {shoutText}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs h-3 bg-white/10 rounded-full mt-4 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-200"
              style={{ width: `${Math.min(100, power)}%` }}
            />
          </div>
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-pink-950/50 border border-pink-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-400">
              <Laugh className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Comedy Crown Unlocked!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;HIGH VOLTAGE COMEDY! Manohar is officially crowned the 2026 Comedy Champion!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Manohar&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
