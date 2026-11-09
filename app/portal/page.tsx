"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Sparkles, ArrowRight, ShieldCheck, Compass } from "lucide-react";
import CosmicBackground from "@/components/canvas/CosmicBackground";
import { soundEngine } from "@/lib/audio/sound-engine";

function PortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const directKey = searchParams.get("key") || searchParams.get("token") || searchParams.get("access_key");

  useEffect(() => {
    if (directKey) {
      setAccessKey(directKey);
      verifyKey(directKey);
    }
  }, [directKey]);

  const verifyKey = async (keyToVerify: string) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: keyToVerify }),
      });

      const data = await res.json();
      if (data.success && data.universeId) {
        soundEngine.playSuccessChime();
        router.push(`/universe/${data.universeId}`);
      } else {
        soundEngine.playBuzzer();
        setErrorMessage(data.error || "Invalid cosmic key. Please verify your private invitation.");
      }
    } catch {
      setErrorMessage("Connection to the cosmos interrupted. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) return;
    verifyKey(accessKey);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      <CosmicBackground primaryColor="#f5a623" secondaryColor="#8b5cf6" />

      <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-center">
        {/* Glowing Portal Emblem */}
        <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-amber-400/40 bg-amber-950/20 shadow-[0_0_35px_rgba(245,166,35,0.3)] animate-pulse-slow">
          <KeyRound className="w-9 h-9 text-amber-400" />
        </div>

        <h1 className="font-cinematic text-2xl sm:text-3xl font-black text-white tracking-wider mb-2">
          Celestial Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 font-light mb-6">
          Enter your private invitation key to enter your dedicated universe in Arshiya&apos;s constellation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="e.g. your-private-cosmic-key"
              required
              className="w-full py-3.5 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-all font-mono"
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
                <span>Unlock Your Universe</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Server-Side End-to-End Cryptographic Privacy</span>
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
