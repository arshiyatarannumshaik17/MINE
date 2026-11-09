"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Mic, Award, Sparkles, Radio } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function AanBetaSoundboardGame({ onComplete, themeColor }: MiniGameProps) {
  const [listened, setListened] = useState<string[]>([]);
  const [activeVoiceLine, setActiveVoiceLine] = useState("Tap each booming 'Aan Beta...' mode!");
  const [isWon, setIsWon] = useState(false);

  const moods = [
    {
      id: "greeting",
      title: "Pappa's Morning Radio",
      quote: "Pappa says: Aan Beta... Haa Beta... Kaise ho? Lagta hai aaj kal bahut busy chal rahi ho!",
    },
    {
      id: "tease",
      title: "Teddy Nickname Challenge",
      quote: "Aan Beta... Itni hoshiyaari kahan se laati ho?! Suno meri baat dhyan se!",
    },
    {
      id: "advice",
      title: "Deep Career Wisdom",
      quote: "Aan Beta... Decisions dil se lo, niyat saaf rakho, darr ko bhool jao. Stand tall always.",
    },
    {
      id: "paternal",
      title: "Adopted Daughter Blessing",
      quote: "Aan Beta... Mere radio station pe tumhare liye 24/7 VIP seat reserved hai!",
    },
  ];

  const handleListen = (m: { id: string; quote: string }) => {
    soundEngine.playSuccessChime();
    setActiveVoiceLine(m.quote);
    if (!listened.includes(m.id)) {
      const updated = [...listened, m.id];
      setListened(updated);
      if (updated.length === moods.length && !isWon) {
        setIsWon(true);
        confetti({ particleCount: 85, spread: 65 });
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-amber-500" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The &apos;Aan Beta&apos; Soundboard &amp; Nickname Challenge
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400">
            Resonances: {listened.length} / {moods.length}
          </span>
        </div>

        {/* Live Audio Dialogue Bubble */}
        <div className="p-3 mb-6 rounded-xl bg-amber-950/40 border border-amber-500/20 text-amber-200 text-xs sm:text-sm font-mono font-bold leading-relaxed animate-pulse">
          &ldquo;{activeVoiceLine}&rdquo;
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Listen to Shahid Pappa&apos;s iconic 4 deep bass modes of &ldquo;Aan Beta...&rdquo; to unlock the Certified Adopted Daughter Trophy!
        </p>

        <div className="space-y-3 mb-6">
          {moods.map((m) => {
            const isHeard = listened.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => handleListen(m)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isHeard
                    ? "bg-amber-500/20 border-amber-400/40 text-amber-200"
                    : "bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mic className={`w-5 h-5 ${isHeard ? "text-amber-400" : "text-slate-500"}`} />
                  <div>
                    <div className="font-bold text-xs sm:text-sm">{m.title}</div>
                    <div className="text-[11px] text-slate-400 font-mono">Deep Bass Frequency 88.5 FM</div>
                  </div>
                </div>
                <span className="text-xs font-mono">{isHeard ? "✓ Heard" : "▶ Play"}</span>
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-950/50 border border-amber-400/40 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-300">
              <Award className="w-5 h-5 text-amber-400" />
              <h4 className="font-cinematic font-bold">Certified Adopted Daughter Trophy Unlocked!</h4>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;Pappa says: Aan Beta...&rdquo; — Teddy warmth, booming bass, and fatherly wisdom forever!
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs tracking-wider transition-all shadow-lg cursor-pointer"
            >
              Continue to Shahid Pappa&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
