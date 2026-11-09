"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, KeyRound, ArrowRight, Sparkles } from "lucide-react";
import CosmicBackground from "@/components/canvas/CosmicBackground";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Invalid creator key");
      }
    } catch {
      setError("Authorization request failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <CosmicBackground primaryColor="#f5a623" secondaryColor="#6366f1" />

      <div className="relative z-10 w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h1 className="font-cinematic text-2xl font-bold text-white mb-2">
          Creator Control Chamber
        </h1>
        <p className="text-xs text-slate-300 mb-6 font-light">
          Enter Arshiya&apos;s master key to access the 12 Universes creator management dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Master Key"
            required
            className="w-full py-3.5 px-4 rounded-xl bg-slate-950/80 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-all font-mono"
          />

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white tracking-wide transition-all transform hover:scale-[1.02] active:scale-98 shadow-xl bg-gradient-to-r from-amber-500 to-amber-600 disabled:opacity-50"
          >
            <span>{isLoading ? "Authenticating Master Key..." : "Unlock Dashboard"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </main>
  );
}

