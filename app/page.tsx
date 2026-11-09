"use client";

import React from "react";
import Link from "next/link";
import CosmicBackground from "@/components/canvas/CosmicBackground";
import { Sparkles, KeyRound, Shield, Compass, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between p-6 overflow-hidden">
      <CosmicBackground primaryColor="#f5a623" secondaryColor="#8b5cf6" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-cinematic text-sm sm:text-base font-bold tracking-wider text-white">
            12 Little Universes
          </span>
        </div>

        <Link
          href="/portal"
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-pill text-xs font-medium text-slate-300 hover:text-white transition-all shadow-md"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
          <span>Enter Portal</span>
        </Link>
      </header>

      {/* Hero Core */}
      <div className="relative z-10 max-w-2xl text-center my-auto py-12 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono tracking-widest uppercase text-amber-300 mb-6 border border-amber-400/20">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>Arshiya&apos;s Edition</span>
        </div>

        <h1 className="font-cinematic text-4xl sm:text-6xl font-black text-white tracking-wider mb-6 leading-tight drop-shadow-2xl">
          12 Little Universes
        </h1>

        <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8 max-w-lg font-dialogue">
          Twelve private interactive worlds crafted for twelve unique souls. Each universe is sealed with a secret key and contains its own story, 3D character, mini-game, and cinematic journey.
        </p>

        <Link
          href="/portal"
          className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:shadow-[0_0_35px_rgba(244,63,94,0.5)]"
        >
          <KeyRound className="w-5 h-5" />
          <span>Unlock Your Universe</span>
        </Link>
      </div>

      {/* Footer Info */}
      <footer className="relative z-10 w-full max-w-5xl py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero-Leakage Server-Side Cryptographic Privacy</span>
        </div>
        <div>
          <span>Crafted with love &amp; code by Arshiya</span>
        </div>
      </footer>
    </main>
  );
}

