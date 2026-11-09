"use client";

import React, { useState } from "react";
import { QrCode, KeyRound, Lock, Unlock, ExternalLink, ShieldAlert, CheckCircle2 } from "lucide-react";

interface AdminRecipientCardProps {
  recipient: {
    recipientId: string;
    name: string;
    relation: string;
    token: string;
    pin: string;
    failedAttempts: number;
    isLocked: boolean;
    lockoutRemainingSeconds: number;
    lastUsedAt: string | null;
    inviteUrl: string;
    qrDataUrl: string;
  };
  onOpenQR: (rec: AdminRecipientCardProps["recipient"]) => void;
  onResetLock: (recipientId: string) => void;
}

export default function AdminRecipientCard({
  recipient,
  onOpenQR,
  onResetLock,
}: AdminRecipientCardProps) {
  const [isResetting, setIsResetting] = useState(false);

  const handleUnlock = async () => {
    setIsResetting(true);
    await onResetLock(recipient.recipientId);
    setIsResetting(false);
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-cinematic text-lg font-bold text-white tracking-wide">
              {recipient.name}
            </h4>
            <p className="text-xs text-amber-400/90 font-medium">{recipient.relation}</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 uppercase">
            ID: {recipient.recipientId}
          </span>
        </div>

        {/* Credentials Display */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">PIN:</span>
            <span className="font-mono font-bold text-amber-300 tracking-wider">
              {recipient.pin}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Token:</span>
            <span className="font-mono text-slate-300 truncate max-w-[140px]">
              {recipient.token}
            </span>
          </div>
        </div>

        {/* Security / Lockout Status */}
        <div className="mb-4">
          {recipient.isLocked ? (
            <div className="p-2.5 rounded-xl bg-rose-950/50 border border-rose-500/30 flex items-center justify-between text-xs text-rose-300">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-rose-400" />
                <span>Locked ({Math.ceil(recipient.lockoutRemainingSeconds / 60)}m left)</span>
              </div>
              <button
                onClick={handleUnlock}
                disabled={isResetting}
                className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-[10px] font-bold uppercase transition-all"
              >
                {isResetting ? "Unlocking..." : "Unlock"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {recipient.lastUsedAt ? "Accessed Active" : "Invitation Pending Access"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-white/5 flex items-center gap-2">
        <button
          onClick={() => onOpenQR(recipient)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all shadow-md"
        >
          <QrCode className="w-3.5 h-3.5 text-amber-400" />
          <span>View QR</span>
        </button>

        <a
          href={recipient.inviteUrl}
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          title="Open Universe"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

