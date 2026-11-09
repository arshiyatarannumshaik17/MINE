"use client";

import React, { useState } from "react";
import { Play, Pause, X, Sparkles, Film, RotateCcw } from "lucide-react";

interface VideoCinematicModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  prompt: string;
  themeColor: string;
}

export default function VideoCinematicModal({
  isOpen,
  onClose,
  title,
  description,
  prompt,
  themeColor,
}: VideoCinematicModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5" style={{ color: themeColor }} />
            <span className="font-cinematic text-sm sm:text-base font-bold tracking-wider text-white">
              {title}
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
              AI Cinematic 4K
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center overflow-hidden">
          {/* Animated Cinematic Scene Simulation */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div
              className={`transition-all duration-700 transform ${
                isPlaying ? "scale-105 opacity-90" : "scale-100 opacity-60"
              }`}
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-dashed animate-spin-slow"
                style={{ borderColor: `${themeColor}88` }}
              >
                <Sparkles className="w-10 h-10 sm:w-14 sm:h-14" style={{ color: themeColor }} />
              </div>

              <h2 className="font-cinematic text-xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
                {title}
              </h2>
              <p className="max-w-lg text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {description}
              </p>
            </div>

            {/* Play/Pause Center Button */}
            <button
              onClick={togglePlay}
              className="mt-6 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold tracking-wide text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              style={{
                backgroundColor: themeColor,
                boxShadow: `0 0 30px ${themeColor}60`,
              }}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Experience</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Cinematic Film</span>
                </>
              )}
            </button>
          </div>

          {/* Film Grain Shader / Noise Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* Cinematic Prompt / Director's Cut Notes */}
        <div className="p-5 sm:p-6 bg-slate-950/70 border-t border-white/5 max-h-48 overflow-y-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-mono tracking-wider uppercase text-slate-300">
              Creative Director & AI Video Prompt Specification:
            </h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-white/5">
            &ldquo;{prompt}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
