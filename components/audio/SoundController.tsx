"use client";

import React, { useEffect, useState } from "react";
import { soundEngine } from "@/lib/audio/sound-engine";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

interface SoundControllerProps {
  ambientType?: string;
  themeColor?: string;
}

export default function SoundController({
  ambientType = "orchestral",
  themeColor = "#f5a623",
}: SoundControllerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Start ambient when user clicks or mounts
    const startAudio = () => {
      soundEngine.startAmbientSoundscape(ambientType);
      setHasStarted(true);
    };

    window.addEventListener("click", startAudio, { once: true });
    window.addEventListener("touchstart", startAudio, { once: true });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };
  }, [ambientType]);

  const handleToggle = () => {
    const newState = soundEngine.toggleMute();
    setIsMuted(newState);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-pill text-xs font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
        style={{
          boxShadow: `0 0 15px ${themeColor}22`,
        }}
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-rose-400" />
            <span className="text-rose-300">Muted</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" style={{ color: themeColor }} />
            <span className="text-slate-200">Audio On</span>
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: themeColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: themeColor }}
              />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
