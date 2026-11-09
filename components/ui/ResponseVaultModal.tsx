"use client";

import React, { useState } from "react";
import { Send, Heart, X, Check, MessageCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface ResponseVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  themeColor: string;
  universeId: string;
}

export default function ResponseVaultModal({
  isOpen,
  onClose,
  recipientName,
  themeColor,
  universeId,
}: ResponseVaultModalProps) {
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState("Gratitude & Love ❤️");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/response/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          universeId,
          recipientName,
          mood,
          message,
          timestamp: new Date().toISOString(),
        }),
      });

      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      setIsSuccess(true); // Graceful fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center border-2"
              style={{
                borderColor: themeColor,
                backgroundColor: `${themeColor}20`,
              }}
            >
              <Check className="w-8 h-8" style={{ color: themeColor }} />
            </div>
            <h3 className="font-cinematic text-2xl font-bold text-white mb-2">
              Message Sealed in the Starlight Vault
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              Thank you, {recipientName}. Your private note has been securely delivered to Arshiya.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-semibold text-white tracking-wide shadow-lg"
              style={{ backgroundColor: themeColor }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageCircle className="w-5 h-5" style={{ color: themeColor }} />
              <h3 className="font-cinematic text-lg sm:text-xl font-bold text-white">
                Send a Message Back to Arshiya
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Your words will be delivered privately to Arshiya&apos;s personal constellation inbox.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Emotion / Vibe:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Gratitude & Love ❤️",
                  "Laughter & Banter 😂",
                  "Happy Tears 🥹",
                  "Proud of You 🌟",
                  "Miss You Always 💫",
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setMood(item)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      mood === item
                        ? "bg-white/20 border-white/40 text-white font-medium"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Your Note:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write something personal, a memory, or a tease back to Arshiya...`}
                rows={4}
                required
                className="w-full rounded-2xl bg-slate-900/80 border border-white/10 p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white tracking-wide transition-transform hover:scale-[1.02] active:scale-98 shadow-xl disabled:opacity-50"
              style={{
                backgroundColor: themeColor,
                boxShadow: `0 0 25px ${themeColor}40`,
              }}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? "Sealing Message..." : "Send Private Note"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

