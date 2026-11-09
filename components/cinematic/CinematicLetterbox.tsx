"use client";

import React, { ReactNode } from "react";

interface CinematicLetterboxProps {
  children: ReactNode;
  active?: boolean;
}

export default function CinematicLetterbox({
  children,
  active = true,
}: CinematicLetterboxProps) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Top Anamorphic Cinema Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-black transition-all duration-700 pointer-events-none ${
          active ? "h-6 sm:h-10" : "h-0"
        }`}
      />

      {/* Main Content Stage */}
      <div className="relative z-10 w-full flex-1 flex flex-col pt-8 pb-12">
        {children}
      </div>

      {/* Bottom Anamorphic Cinema Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-black transition-all duration-700 pointer-events-none ${
          active ? "h-6 sm:h-10" : "h-0"
        }`}
      />

      {/* Film Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)]" />
    </div>
  );
}
