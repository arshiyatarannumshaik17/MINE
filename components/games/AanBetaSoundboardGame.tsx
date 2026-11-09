"use client";

import React, { useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Mic, Award, Sparkles } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function AanBetaSoundboardGame({ onComplete, themeColor }: MiniGameProps) {
  const [listened, setListened] = useState<string[]>([]);
  const [isWon, setIsWon] = useState(false);

  const moods = [
    { id: "warm", title: "Warm Greeting", quote: "Aan Beta... Kaise ho? Sab theek chal raha hai?" },
    { id: "tease", title: "Teasing Mentor", quote: "Aan Beta... Bahut hoshiyaar ban rahe ho aaj kal!" },
    { id: "advice", title: "Deep Life Advice", quote: "Aan Beta... Life me decisions dil se lo aur darr ko bhool jao." },
    { id: "scold", title: "Affectionate Scold", quote: "Aan Beta... Phir se wahi galti? Suno meri baat dhyan se!" },
  ];

  const handleListen = (id: string) => {
    soundEngine.playSuccessChime();
    if (!listened.includes(id)) {
      const updated = [...listened, id];
      setListened(updated);
      if (updated.length === moods.length && !isWon) {
        setIsWon(true);
        confetti({ particleCount: 80, spread: 60 });
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-amber-500" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The &apos;Aan Beta&apos; Soundboard
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-400">
            Resonances: {listened.length} / {moods.length}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Listen to Shahid Pappa&apos;s iconic 4 moods of &ldquo;Aan Beta...&rdquo;!
        </p>

        <div className="space-y-3 mb-6">
          {moods.map((m) => {
            const isHeard = listened.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => handleListen(m.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                  isHeard
                    ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-white mb-0.5">{m.title}</div>
                  <div className="text-xs italic text-slate-300">&ldquo;{m.quote}&rdquo;</div>
                </div>
                <Mic className={`w-5 h-5 ${isHeard ? "text-amber-400" : "text-slate-500"}`} />
              </button>
            );
          })}
        </div>

        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-950/50 border border-amber-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
              <Award className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">Certified &apos;Aan Beta&apos; Legend!</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-4">
              &ldquo;CERTIFIED AAN BETA MOMENT! Shahid Pappa&apos;s wisdom and affection is 100% undisputed!&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Shahid&apos;s Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
