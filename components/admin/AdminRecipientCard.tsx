"use client";

import React, { useState } from "react";
import {
  QrCode,
  KeyRound,
  Lock,
  Unlock,
  ExternalLink,
  RefreshCw,
  Edit3,
  ShieldBan,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

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
    isActive?: boolean;
  };
  onOpenQR: (rec: AdminRecipientCardProps["recipient"]) => void;
  onRefresh: () => void;
}

export default function AdminRecipientCard({
  recipient,
  onOpenQR,
  onRefresh,
}: AdminRecipientCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEditPin, setShowEditPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleAction = async (action: string, payload?: Record<string, string>) => {
    setIsProcessing(true);
    setFeedback("");
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          recipientId: recipient.recipientId,
          ...payload,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(data.message);
        setTimeout(() => setFeedback(""), 3000);
        onRefresh();
      } else {
        setFeedback(data.error || "Action failed");
      }
    } catch {
      setFeedback("Request error");
    } finally {
      setIsProcessing(false);
      setShowEditPin(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-cinematic text-lg font-bold text-white tracking-wide">
                {recipient.name}
              </h4>
              {recipient.isActive === false && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300">
                  REVOKED
                </span>
              )}
            </div>
            <p className="text-xs text-amber-400/90 font-medium">{recipient.relation}</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 uppercase">
            ID: {recipient.recipientId}
          </span>
        </div>

        {/* Credentials Display */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>PIN:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-amber-300 tracking-wider">
                {recipient.pin}
              </span>
              <button
                onClick={() => setShowEditPin(!showEditPin)}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                title="Change PIN"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Edit PIN Inline Form */}
          {showEditPin && (
            <div className="p-2.5 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-2 animate-in fade-in">
              <input
                type="text"
                maxLength={6}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="New 4-digit PIN"
                className="flex-1 px-2.5 py-1 rounded bg-black/60 border border-white/10 text-white text-xs font-mono"
              />
              <button
                onClick={() => handleAction("update_pin", { newPin })}
                disabled={isProcessing || newPin.length < 4}
                className="px-3 py-1 rounded bg-amber-500 text-white text-[11px] font-bold disabled:opacity-50"
              >
                Save
              </button>
            </div>
          )}

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
            <span className="text-slate-400">Token:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-300 truncate max-w-[120px]" title={recipient.token}>
                {recipient.token}
              </span>
              <button
                onClick={() => handleAction("regenerate_token")}
                disabled={isProcessing}
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
                title="Regenerate Token & QR"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
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
                onClick={() => handleAction("reset_lock")}
                disabled={isProcessing}
                className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/40 text-[10px] font-bold uppercase transition-all"
              >
                Unlock
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{recipient.lastUsedAt ? "Accessed Active" : "Invitation Pending"}</span>
              </div>
              {recipient.isActive === false ? (
                <button
                  onClick={() => handleAction("restore")}
                  className="text-emerald-400 hover:underline"
                >
                  Restore
                </button>
              ) : (
                <button
                  onClick={() => handleAction("revoke")}
                  className="text-rose-400 hover:underline text-[10px]"
                >
                  Revoke
                </button>
              )}
            </div>
          )}
        </div>

        {feedback && (
          <div className="text-[11px] font-mono text-amber-300 bg-amber-950/30 p-2 rounded-lg border border-amber-500/20 mb-3 animate-in fade-in">
            {feedback}
          </div>
        )}
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
