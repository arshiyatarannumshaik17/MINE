"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Mic, Volume2 } from "lucide-react";
import { soundEngine } from "@/lib/audio/sound-engine";

interface VoiceNotePlayerProps {
  duration?: string;
  themeColor: string;
  recipientName: string;
}

export default function VoiceNotePlayer({
  duration = "1:45",
  themeColor,
  recipientName,
}: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);

  const togglePlay = () => {
    if (!isPlaying) {
      soundEngine.playSuccessChime();
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Procedural waveform bars heights
  const bars = [
    20, 45, 60, 30, 80, 95, 65, 40, 70, 90, 50, 85, 30, 75, 60, 95, 40, 65,
    80, 50, 70, 40, 85, 90, 35, 60, 45, 75, 30, 20,
  ];

  return (
    <div className="w-full my-6 p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center gap-4 bg-slate-950/60 shadow-xl">
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 flex-shrink-0 shadow-lg"
        style={{
          backgroundColor: themeColor,
          boxShadow: `0 0 20px ${themeColor}60`,
        }}
        aria-label={isPlaying ? "Pause voice note" : "Play voice note"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-white" />
        ) : (
          <Play className="w-5 h-5 fill-white ml-0.5" />
        )}
      </button>

      {/* Waveform & Info */}
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Mic className="w-3.5 h-3.5" style={{ color: themeColor }} />
            <span>Arshiya&apos;s Voice Note for {recipientName}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">
            {isPlaying
              ? `${Math.floor((progress / 100) * 105)}s / ${duration}`
              : duration}
          </span>
        </div>

        {/* Animated Waveform Bars */}
        <div className="h-8 flex items-center gap-1 w-full overflow-hidden">
          {bars.map((height, idx) => {
            const barProgress = (idx / bars.length) * 100;
            const isPlayed = progress >= barProgress;

            return (
              <div
                key={idx}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: isPlaying ? `${Math.max(15, (height * (Math.sin(progress + idx) + 1.2)) / 2)}%` : `${height}%`,
                  backgroundColor: isPlayed ? themeColor : "rgba(255, 255, 255, 0.15)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

