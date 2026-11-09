"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Shield, Sparkles, Flower2, RefreshCw } from "lucide-react";

interface MiniGameProps {
  onComplete: () => void;
  themeColor: string;
}

export default function HeroShieldGame({ onComplete, themeColor }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [target] = useState(8);
  const [shieldX, setShieldX] = useState(50); // percentage
  const [raindropX, setRaindropX] = useState(50);
  const [raindropY, setRaindropY] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Raindrop loop
  useEffect(() => {
    if (isWon) return;

    const interval = setInterval(() => {
      setRaindropY((prev) => {
        if (prev >= 82) {
          // Check collision with shield
          if (Math.abs(raindropX - shieldX) < 18) {
            soundEngine.playSuccessChime();
            setScore((s) => {
              const newScore = s + 1;
              if (newScore >= target) {
                setIsWon(true);
                confetti({ particleCount: 75, spread: 65 });
              }
              return newScore;
            });
          }
          // Reset drop
          setRaindropX(Math.random() * 80 + 10);
          return 0;
        }
        return prev + 4;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [shieldX, raindropX, isWon, target]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setShieldX(Math.max(10, Math.min(90, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setShieldX(Math.max(10, Math.min(90, x)));
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <div className="glass-panel rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinematic text-base font-bold text-white">
              The Hero&apos;s Shield — నాన్న రక్షణ ఛత్రం
            </h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300">
            మల్లెపూలు: {score} / {target}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-2 font-telugu leading-relaxed">
          అబ్బు రక్షణ ఛత్రాన్ని కదిలించి జీవితంలోని కష్టాల వర్షాన్ని తాకి, వాటిని సువాసనల బంగారు మల్లెపూలుగా మార్చండి!
        </p>
        <p className="text-[11px] text-slate-400 mb-4">
          Move Abbu&apos;s golden shield left and right to catch raindrops into jasmine blooms.
        </p>

        {/* Interactive Play Arena */}
        <div
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative h-64 sm:h-72 w-full rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950/20 border border-white/10 overflow-hidden cursor-ew-resize select-none"
        >
          {/* Falling Raindrop / Sparkle */}
          {!isWon && (
            <div
              className="absolute -translate-x-1/2 transition-all duration-75 flex flex-col items-center"
              style={{ left: `${raindropX}%`, top: `${raindropY}%` }}
            >
              <div className="w-3.5 h-5 rounded-full bg-cyan-400 blur-[1px] shadow-[0_0_12px_#22d3ee]" />
            </div>
          )}

          {/* Golden Shield at Bottom */}
          <div
            className="absolute bottom-4 -translate-x-1/2 transition-all duration-75 flex flex-col items-center pointer-events-none"
            style={{ left: `${shieldX}%` }}
          >
            <div
              className="px-4 py-2 rounded-xl flex items-center gap-2 shadow-2xl border-2"
              style={{
                backgroundColor: `${themeColor}33`,
                borderColor: themeColor,
                boxShadow: `0 0 20px ${themeColor}88`,
              }}
            >
              <Shield className="w-6 h-6" style={{ color: themeColor }} />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-telugu">
                నాన్న రక్షణ
              </span>
            </div>
          </div>
        </div>

        {/* Win State Modal */}
        {isWon && (
          <div className="mt-4 p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 animate-in fade-in">
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-400">
              <Flower2 className="w-5 h-5" />
              <h4 className="font-cinematic font-bold">నాన్న ప్రేమలో సురక్షితం</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 italic mb-2 font-telugu">
              &ldquo;నాపై ఏ తుఫాను పడకుండా మీ ప్రేమే నాకు గొడుగుగా నిలిచింది అబ్బు. ఎప్పటికీ మీ చిట్టి తల్లిని.&rdquo;
            </p>
            <p className="text-xs text-slate-300 mb-4">
              &ldquo;No storm ever touched me, because your love was my shelter. Always your little princess, Abbu.&rdquo;
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-xl cursor-pointer"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Abbu&apos;s Quiz (అబ్బు క్విజ్)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
