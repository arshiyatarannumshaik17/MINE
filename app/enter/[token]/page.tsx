"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CosmicBackground from "@/components/canvas/CosmicBackground";
import PinInput from "@/components/ui/PinInput";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import { Sparkles, ShieldCheck, Lock, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";

interface TokenInfo {
  valid: boolean;
  recipientId?: string;
  name?: string;
  relation?: string;
  themeColor?: string;
  accentColor?: string;
  avatarIcon?: string;
  isLocked?: boolean;
  remainingSeconds?: number;
  error?: string;
}

export default function DedicatedEntrancePage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [pinError, setPinError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [shake, setShake] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchTokenInfo = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/auth/token-info?token=${encodeURIComponent(token)}`);
        const data = await res.json();
        setTokenInfo(data);
        if (data.isLocked) {
          setIsLocked(true);
        }
      } catch {
        setTokenInfo({ valid: false, error: "Unable to connect to the cosmos" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokenInfo();
  }, [token]);

  const handlePinSubmit = async (pin: string) => {
    if (!tokenInfo?.recipientId) return;

    setIsVerifying(true);
    setPinError("");
    setShake(false);

    try {
      const res = await fetch("/api/auth/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: tokenInfo.recipientId,
          pin,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSuccess(true);
        soundEngine.playSuccessChime();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });

        setTimeout(() => {
          router.push(data.redirectUrl || `/universe/${tokenInfo.recipientId}`);
        }, 1200);
      } else {
        soundEngine.playBuzzer();
        setShake(true);
        if (data.isLocked) {
          setIsLocked(true);
        }
        setPinError(data.error || "Incorrect PIN");
        setTimeout(() => setShake(false), 600);
      }
    } catch {
      setPinError("Verification interrupted. Please retry.");
    } finally {
      setIsVerifying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-400">
        <Sparkles className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!tokenInfo || !tokenInfo.valid) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative">
        <CosmicBackground primaryColor="#f43f5e" secondaryColor="#6366f1" />
        <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-8 border border-rose-500/30 text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-rose-950/40 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="font-cinematic text-xl font-bold text-white mb-2">
            Invalid Cosmic Key
          </h2>
          <p className="text-xs text-slate-300 mb-6 font-light leading-relaxed">
            {tokenInfo?.error || "This invitation link or QR code is unrecognized or has expired."}
          </p>
          <button
            onClick={() => router.push("/portal")}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Portal</span>
          </button>
        </div>
      </main>
    );
  }

  const themeColor = tokenInfo.themeColor || "#f5a623";

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <CosmicBackground
        primaryColor={themeColor}
        secondaryColor={tokenInfo.accentColor || "#8b5cf6"}
      />

      <div
        className={`relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-center transition-all duration-300 ${
          shake ? "animate-bounce" : ""
        } ${isSuccess ? "scale-105 shadow-[0_0_50px_rgba(245,166,35,0.5)]" : ""}`}
      >
        {/* Animated Welcome Avatar Badge */}
        <div
          className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center border-2 shadow-2xl relative"
          style={{
            borderColor: themeColor,
            backgroundColor: `${themeColor}20`,
            boxShadow: `0 0 35px ${themeColor}60`,
          }}
        >
          <span className="text-4xl animate-float">{tokenInfo.avatarIcon}</span>
          <div
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center bg-black/80 border"
            style={{ borderColor: themeColor }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: themeColor }} />
          </div>
        </div>

        {/* Personalized Welcome Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[11px] font-mono tracking-wider uppercase text-slate-300 mb-2">
          <span>Private Constellation Chamber</span>
        </div>

        <h1 className="font-cinematic text-2xl sm:text-3xl font-black text-white tracking-wider mb-1">
          Welcome, {tokenInfo.name}
        </h1>
        <p className="text-xs text-amber-300/90 font-medium mb-6">
          {tokenInfo.relation}
        </p>

        {isSuccess ? (
          <div className="py-6 space-y-2 animate-in fade-in">
            <h3 className="font-cinematic text-xl font-bold text-white">
              Identity Verified!
            </h3>
            <p className="text-xs text-slate-300 font-mono">
              Opening your dedicated universe...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 mb-3 font-light">
                Enter your private 4-digit PIN to unlock your universe:
              </label>

              <PinInput
                length={4}
                onComplete={handlePinSubmit}
                disabled={isVerifying || isLocked}
                hasError={!!pinError}
              />
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-xs text-rose-300 flex items-center justify-center gap-2 animate-in fade-in">
                {isLocked ? <Lock className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                <span>{pinError}</span>
              </div>
            )}

            {isVerifying && (
              <p className="text-xs font-mono text-amber-300 animate-pulse">
                Decrypting Starlight Session...
              </p>
            )}
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Server-Side Isolated Session Security</span>
        </div>
      </div>
    </main>
  );
}

