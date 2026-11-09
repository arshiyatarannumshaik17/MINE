"use client";

import React, { useState, useEffect } from "react";
import { DialogueNode } from "@/lib/types";
import { soundEngine } from "@/lib/audio/sound-engine";
import { ChevronRight, FastForward, MessageSquareQuote, Sparkles } from "lucide-react";

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
  const isArshiya = currentDialogue?.speaker === "Arshiya";

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
          style={{ backgroundColor: isArshiya ? "#ec4899" : themeColor }}
        />

        {/* Header / Speaker Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <span
              className="p-1.5 rounded-lg text-white"
              style={{ backgroundColor: isArshiya ? "#ec489930" : "rgba(255,255,255,0.1)" }}
            >
              {isArshiya ? (
                <Sparkles className="w-4 h-4 text-pink-400" />
              ) : (
                <MessageSquareQuote className="w-4 h-4" style={{ color: themeColor }} />
              )}
            </span>

            <span
              className="font-cinematic text-sm sm:text-base font-bold tracking-wider uppercase"
              style={{ color: isArshiya ? "#f472b6" : themeColor }}
            >
              {currentDialogue.speaker}
            </span>

            {isArshiya && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300">
                Arshiya (Storyteller)
              </span>
            )}

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

        {/* Telugu Subtitle / Primary Text (If available) */}
        {currentDialogue.teluguText && (
          <div className="font-telugu text-base sm:text-lg text-amber-300 font-semibold mb-3 leading-relaxed border-l-2 pl-3 border-amber-400/50">
            {currentDialogue.teluguText}
          </div>
        )}

        {/* Main Dialogue Text */}
        <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed min-h-[4rem]">
          {displayedText}
          {isTyping && (
            <span
              className="inline-block w-2 h-4 ml-1 translate-y-0.5 animate-pulse"
              style={{ backgroundColor: isArshiya ? "#ec4899" : themeColor }}
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
              backgroundColor: isArshiya ? "#ec4899" : themeColor,
              boxShadow: `0 0 20px ${isArshiya ? "#ec489940" : `${themeColor}40`}`,
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
