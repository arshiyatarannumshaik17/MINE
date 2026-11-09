"use client";

import React, { useRef, useState, useEffect } from "react";

interface PinInputProps {
  length?: number;
  onComplete: (pin: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

export default function PinInput({
  length = 4,
  onComplete,
  disabled = false,
  hasError = false,
}: PinInputProps) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (disabled) return;
    const cleanValue = value.replace(/\D/g, "");

    if (cleanValue.length > 1) {
      // Handle paste
      const pasted = cleanValue.slice(0, length).split("");
      const nextDigits = [...digits];
      pasted.forEach((char, i) => {
        if (i < length) nextDigits[i] = char;
      });
      setDigits(nextDigits);
      if (nextDigits.every((d) => d !== "")) {
        onComplete(nextDigits.join(""));
      }
      inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
      return;
    }

    const nextDigits = [...digits];
    nextDigits[index] = cleanValue;
    setDigits(nextDigits);

    if (cleanValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (nextDigits.every((d) => d !== "")) {
      onComplete(nextDigits.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border transition-all duration-200 outline-none ${
            hasError
              ? "border-rose-500 bg-rose-950/20 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              : digit
              ? "border-amber-400/60 bg-amber-950/30 text-amber-200 shadow-[0_0_15px_rgba(245,166,35,0.2)]"
              : "border-white/15 bg-slate-950/60 text-white focus:border-amber-400 focus:bg-slate-900"
          } disabled:opacity-50`}
        />
      ))}
    </div>
  );
}
