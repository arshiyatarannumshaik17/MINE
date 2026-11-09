"use client";

import React, { useState } from "react";
import { X, Copy, Check, Download, QrCode, KeyRound, ExternalLink } from "lucide-react";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    recipientId: string;
    name: string;
    relation: string;
    token: string;
    pin: string;
    inviteUrl: string;
    qrDataUrl: string;
  } | null;
}

export default function QRCodeModal({ isOpen, onClose, recipient }: QRCodeModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  if (!isOpen || !recipient) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(recipient.inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(recipient.pin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-1">
          <QrCode className="w-5 h-5 text-amber-400" />
          <h3 className="font-cinematic text-xl font-bold text-white">
            {recipient.name}&apos;s Invitation QR
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">{recipient.relation}</p>

        {/* QR Code Graphic Frame */}
        <div className="w-64 h-64 mx-auto p-4 bg-white rounded-2xl shadow-2xl flex items-center justify-center mb-6">
          {recipient.qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={recipient.qrDataUrl}
              alt={`QR Code for ${recipient.name}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-xs text-slate-600">Generating QR...</div>
          )}
        </div>

        {/* PIN Badge */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-white/10 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">Secret 4-Digit PIN:</span>
            <span className="font-mono font-bold text-amber-300 text-sm tracking-widest">
              {recipient.pin}
            </span>
          </div>
          <button
            onClick={handleCopyPin}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white"
            title="Copy PIN"
          >
            {copiedPin ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs tracking-wide shadow-lg transition-all"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? "Invitation Link Copied!" : "Copy Invitation Link"}</span>
          </button>

          <a
            href={recipient.inviteUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-all"
          >
            <span>Open in New Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
