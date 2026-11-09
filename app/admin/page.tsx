"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CosmicBackground from "@/components/canvas/CosmicBackground";
import AdminRecipientCard from "@/components/admin/AdminRecipientCard";
import QRCodeModal from "@/components/admin/QRCodeModal";
import {
  Sparkles,
  Users,
  Award,
  MessageSquare,
  QrCode,
  ShieldCheck,
  RefreshCw,
  LogOut,
  Heart,
  CheckCircle2,
} from "lucide-react";

interface AdminData {
  recipients: {
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
  }[];
  attempts: {
    id: string;
    recipientId: string;
    recipientName: string;
    score: number;
    totalQuestions: number;
    completedAt: string;
  }[];
  responses: {
    id: string;
    recipientId: string;
    recipientName: string;
    mood: string;
    messageText: string;
    createdAt: string;
  }[];
  stats: {
    totalRecipients: number;
    totalAttempts: number;
    totalResponses: number;
  };
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"recipients" | "attempts" | "responses">("recipients");
  const [selectedQRRecipient, setSelectedQRRecipient] = useState<AdminData["recipients"][0] | null>(null);

  const fetchOverview = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/overview");
      if (res.status === 403) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleResetLock = async (recipientId: string) => {
    await fetch("/api/admin/reset-lock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipientId }),
    });
    fetchOverview();
  };

  if (isLoading && !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-400">
        <Sparkles className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  return (
    <main className="min-h-screen relative p-4 sm:p-8">
      <CosmicBackground primaryColor="#f5a623" secondaryColor="#8b5cf6" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        {/* Top Navbar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl glass-panel border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-cinematic text-xl font-bold text-white tracking-wide">
                Creator Control Hub
              </h1>
              <p className="text-xs text-slate-400">Arshiya&apos;s 12 Little Universes Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchOverview}
              className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white transition-all"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                document.cookie = "admin_session=; Max-Age=0; path=/";
                router.push("/admin/login");
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-rose-300 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </header>

        {/* Stats Row */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">{data.stats.totalRecipients}</div>
                <div className="text-xs text-slate-400">Total Universes Active</div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">{data.stats.totalAttempts}</div>
                <div className="text-xs text-slate-400">Quiz Attempts Graded</div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white">{data.stats.totalResponses}</div>
                <div className="text-xs text-slate-400">Vault Responses Received</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          {[
            { id: "recipients", label: "12 Universes & QR Access", icon: Users },
            { id: "attempts", label: "Quiz Audit Logs", icon: Award },
            { id: "responses", label: "Starlight Vault Inbox", icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: RECIPIENT CARDS GRID */}
        {activeTab === "recipients" && data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.recipients.map((rec) => (
              <AdminRecipientCard
                key={rec.recipientId}
                recipient={rec}
                onOpenQR={(r) => setSelectedQRRecipient(r)}
                onResetLock={handleResetLock}
              />
            ))}
          </div>
        )}

        {/* TAB 2: QUIZ ATTEMPTS AUDIT */}
        {activeTab === "attempts" && data && (
          <div className="glass-panel rounded-3xl p-6 border border-white/10 overflow-hidden">
            <h3 className="font-cinematic text-lg font-bold text-white mb-4">
              Quiz Attempts Audit Log
            </h3>
            {data.attempts.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">
                No quiz attempts logged yet. As recipients complete their quizzes, server scores will appear here.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono">
                      <th className="py-3 px-4">Recipient</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Percentage</th>
                      <th className="py-3 px-4">Completed At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-slate-300">
                    {data.attempts.map((att) => (
                      <tr key={att.id} className="hover:bg-white/5">
                        <td className="py-3 px-4 font-bold text-white">{att.recipientName}</td>
                        <td className="py-3 px-4 text-amber-300">
                          {att.score} / {att.totalQuestions}
                        </td>
                        <td className="py-3 px-4 text-emerald-400">
                          {Math.round((att.score / att.totalQuestions) * 100)}%
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {new Date(att.completedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: STARLIGHT VAULT INBOX */}
        {activeTab === "responses" && data && (
          <div className="space-y-4">
            <h3 className="font-cinematic text-lg font-bold text-white">
              Starlight Vault Letters Received
            </h3>
            {data.responses.length === 0 ? (
              <div className="glass-panel rounded-3xl p-8 border border-white/10 text-center text-xs text-slate-400 italic">
                The vault is currently awaiting letters. Messages sent by recipients will be stored here privately.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.responses.map((resp) => (
                  <div
                    key={resp.id}
                    className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-cinematic font-bold text-white text-base">
                        {resp.recipientName}
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-amber-300 font-medium">
                        {resp.mood}
                      </span>
                    </div>

                    <p className="text-sm text-slate-200 leading-relaxed italic bg-slate-950/60 p-3 rounded-xl border border-white/5">
                      &ldquo;{resp.messageText}&rdquo;
                    </p>

                    <div className="text-[11px] text-slate-500 font-mono text-right">
                      {new Date(resp.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* QR Code Inspection Modal */}
      <QRCodeModal
        isOpen={!!selectedQRRecipient}
        onClose={() => setSelectedQRRecipient(null)}
        recipient={selectedQRRecipient}
      />
    </main>
  );
}

