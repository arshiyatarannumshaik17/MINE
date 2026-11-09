"use client";

import React, { useState, useEffect } from "react";
import { DialogueNode } from "@/lib/types";
import { soundEngine } from "@/lib/audio/sound-engine";
import { ChevronRight, FastForward, MessageSquareQuote } from "lucide-react";

interface DialogueBoxProps {
  dialogues: DialogueNode[];
  onComplete: () => void;
  themeColor?: string;
}

export default function DialogueBox({
  dialogues,
  onComplete,
  themeColor = "#f5a623",
}: DialogueBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentDialogue = dialogues[currentIndex];

  useEffect(() => {
    if (!currentDialogue) return;

    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const fullText = currentDialogue.text;
    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        if (charIndex % 3 === 0) {
          soundEngine.playTypewriterTick();
        }
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [currentIndex, currentDialogue]);

  const handleNext = () => {
    if (isTyping) {
      // Instant reveal
      setDisplayedText(currentDialogue.text);
      setIsTyping(false);
      return;
    }

    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  if (!currentDialogue) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-6">
      <div className="glass-panel rounded-2xl p-5 sm:p-7 relative border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-16 left-1/4 w-72 h-32 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: themeColor }}
        />

        {/* Header / Speaker Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-white/10 text-white">
              <MessageSquareQuote className="w-4 h-4" style={{ color: themeColor }} />
            </span>
            <span
              className="font-cinematic text-sm sm:text-base font-bold tracking-wider uppercase"
              style={{ color: themeColor }}
            >
              {currentDialogue.speaker}
            </span>
            {currentDialogue.emotion && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 capitalize">
                {currentDialogue.emotion}
              </span>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400">
            {currentIndex + 1} / {dialogues.length}
          </div>
        </div>

        {/* Telugu Subtitle (If available) */}
        {currentDialogue.teluguText && (
          <div className="font-telugu text-sm sm:text-base text-amber-300/90 mb-2.5 font-medium leading-relaxed italic border-l-2 pl-3 border-amber-400/40">
            {currentDialogue.teluguText}
          </div>
        )}

        {/* Main Dialogue Text */}
        <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed min-h-[4.5rem]">
          {displayedText}
          {isTyping && (
            <span
              className="inline-block w-2 h-4 ml-1 translate-y-0.5 animate-pulse"
              style={{ backgroundColor: themeColor }}
            />
          )}
        </p>

        {/* Action Controls */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/5">
          <button
            onClick={() => {
              setDisplayedText(currentDialogue.text);
              setIsTyping(false);
            }}
            disabled={!isTyping}
            className={`text-xs flex items-center gap-1 transition-opacity ${
              isTyping ? "text-slate-400 hover:text-slate-200" : "opacity-0 pointer-events-none"
            }`}
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip typing</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
            style={{
              backgroundColor: themeColor,
              boxShadow: `0 0 20px ${themeColor}40`,
            }}
          >
            <span>
              {currentIndex < dialogues.length - 1 ? "Continue" : "Complete Story"}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
