"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, ShieldCheck, ArrowRight, Lock, Hash, Sparkles } from "lucide-react";
import CosmicBackground from "@/components/canvas/CosmicBackground";
import PinInput from "@/components/ui/PinInput";
import { soundEngine } from "@/lib/audio/sound-engine";
import { UniverseId } from "@/lib/types";

function PortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authMode, setAuthMode] = useState<"token" | "pin">("token");

  // Token Mode States
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // PIN Mode States
  const [selectedRecipient, setSelectedRecipient] = useState<UniverseId>("abbu");
  const [pinError, setPinError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const directKey = searchParams.get("key") || searchParams.get("token") || searchParams.get("access_key");

  useEffect(() => {
    if (directKey) {
      setAccessKey(directKey);
      verifyToken(directKey);
    }
  }, [directKey]);

  const verifyToken = async (tokenToVerify: string) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToVerify }),
      });

      const data = await res.json();
      if (data.success && data.universeId) {
        soundEngine.playSuccessChime();
        router.push(data.redirectUrl || `/universe/${data.universeId}`);
      } else {
        soundEngine.playBuzzer();
        setErrorMessage(data.error || "Invalid cosmic key. Please verify your invitation link.");
      }
    } catch {
      setErrorMessage("Connection to the cosmos interrupted. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) return;
    verifyToken(accessKey);
  };

  const handlePinComplete = async (pin: string) => {
    setIsLoading(true);
    setPinError("");
    setIsLocked(false);

    try {
      const res = await fetch("/api/auth/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: selectedRecipient,
          pin,
        }),
      });

      const data = await res.json();
      if (data.success && data.universeId) {
        soundEngine.playSuccessChime();
        router.push(data.redirectUrl || `/universe/${data.universeId}`);
      } else {
        soundEngine.playBuzzer();
        if (data.isLocked) {
          setIsLocked(true);
        }
        setPinError(data.error || "Incorrect PIN");
      }
    } catch {
      setPinError("Connection to the cosmos interrupted. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <CosmicBackground primaryColor="#f5a623" secondaryColor="#8b5cf6" />

      <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-center">
        {/* Glowing Portal Emblem */}
        <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center border-2 border-amber-400/40 bg-amber-950/20 shadow-[0_0_35px_rgba(245,166,35,0.3)] animate-pulse-slow">
          <KeyRound className="w-9 h-9 text-amber-400" />
        </div>

        <h1 className="font-cinematic text-2xl sm:text-3xl font-black text-white tracking-wider mb-2">
          Celestial Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-light mb-6">
          Authenticate with your invitation key, QR code, or 4-digit PIN.
        </p>

        {/* Auth Mode Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-white/10 mb-6">
          <button
            type="button"
            onClick={() => {
              setAuthMode("token");
              setErrorMessage("");
              setPinError("");
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              authMode === "token"
                ? "bg-amber-500 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Invitation Key / QR</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode("pin");
              setErrorMessage("");
              setPinError("");
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              authMode === "pin"
                ? "bg-amber-500 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>4-Digit PIN</span>
          </button>
        </div>

        {/* MODE 1: INVITATION TOKEN / QR URL */}
        {authMode === "token" && (
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Paste your secret invitation key"
                required
                className="w-full py-3.5 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-all font-mono text-center"
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/20">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || !accessKey.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white tracking-wide transition-all transform hover:scale-[1.02] active:scale-98 shadow-xl bg-gradient-to-r from-amber-500 to-amber-600 disabled:opacity-50"
              style={{
                boxShadow: "0 0 25px rgba(245, 166, 35, 0.4)",
              }}
            >
              {isLoading ? (
                <span>Aligning Celestial Coordinates...</span>
              ) : (
                <>
                  <span>Unlock Universe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* MODE 2: 4-DIGIT PIN AUTHENTICATION */}
        {authMode === "pin" && (
          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1.5">
                Select Your Universe:
              </label>
              <select
                value={selectedRecipient}
                onChange={(e) => {
                  setSelectedRecipient(e.target.value as UniverseId);
                  setPinError("");
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-950/80 border border-white/15 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="abbu">Abbu (Father)</option>
                <option value="afrid">AFRID</option>
                <option value="sameer">Sameer</option>
                <option value="jhansi">Jhansi</option>
                <option value="awez">Awez</option>
                <option value="manohar">Manohar</option>
                <option value="mubeena">Mubeena (Pudeena)</option>
                <option value="qurayba">Qurayba</option>
                <option value="wafeeqa">Wafeeqa</option>
                <option value="shahid">Shahid Pappa</option>
                <option value="muskan">Muskan</option>
                <option value="sana">Sana</option>
              </select>
            </div>

            <div className="py-2">
              <label className="block text-xs text-slate-300 mb-3">
                Enter your private 4-digit PIN:
              </label>
              <PinInput
                length={4}
                onComplete={handlePinComplete}
                disabled={isLoading || isLocked}
                hasError={!!pinError}
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/20">
                {pinError}
              </p>
            )}

            {isLoading && (
              <p className="text-xs text-amber-300 font-mono animate-pulse">
                Verifying secret PIN...
              </p>
            )}
          </div>
        )}

        {/* Security Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>PBKDF2 &amp; HMAC-SHA256 Multi-Factor Security</span>
        </div>
      </div>
    </main>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PortalContent />
    </Suspense>
  );
}
