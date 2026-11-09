"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { UniverseId, UniverseSpecification } from "@/lib/types";
import { getUniverseSpecification } from "@/lib/universes/data";
import CosmicBackground from "@/components/canvas/CosmicBackground";
import Avatar3DViewer from "@/components/canvas/Avatar3DViewer";
import SoundController from "@/components/audio/SoundController";
import CinematicLetterbox from "@/components/cinematic/CinematicLetterbox";
import DialogueBox from "@/components/cinematic/DialogueBox";
import MiniGameDispatcher from "@/components/games/MiniGameDispatcher";
import QuizContainer from "@/components/quiz/QuizContainer";
import VideoCinematicModal from "@/components/cinematic/VideoCinematicModal";
import ResponseVaultModal from "@/components/ui/ResponseVaultModal";
import VoiceNotePlayer from "@/components/ui/VoiceNotePlayer";
import { soundEngine } from "@/lib/audio/sound-engine";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Play,
  Heart,
  ChevronRight,
  Film,
  MessageCircle,
  HelpCircle,
  Gamepad2,
  BookOpen,
} from "lucide-react";

export default function UniverseStage() {
  const params = useParams();
  const router = useRouter();
  const universeId = params.slug as UniverseId;

  const [universe, setUniverse] = useState<UniverseSpecification | null>(null);
  const [currentAct, setCurrentAct] = useState<number>(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  useEffect(() => {
    if (!universeId) return;
    const spec = getUniverseSpecification(universeId);
    if (!spec) {
      router.push("/portal");
      return;
    }
    setUniverse(spec);
  }, [universeId, router]);

  if (!universe) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-slate-400">
        <Sparkles className="w-8 h-8 animate-spin text-amber-400" />
      </div>
    );
  }

  const { theme, character, openingCinematic, storyActs, quiz, aiVideo, privateLetter } = universe;

  return (
    <CinematicLetterbox active={true}>
      <CosmicBackground
        primaryColor={theme.primary}
        secondaryColor={theme.secondary}
      />

      <SoundController
        ambientType={theme.ambientSoundType}
        themeColor={theme.primary}
      />

      {/* Main Narrative Container */}
      <div className="w-full max-w-5xl mx-auto px-4 py-8 relative z-20 flex flex-col items-center">
        {/* Act Progress Stepper */}
        <div className="flex items-center gap-1.5 sm:gap-3 mb-8 p-1.5 rounded-full glass-panel border border-white/10 text-xs">
          {[
            { num: 1, label: "Prologue", icon: BookOpen },
            { num: 2, label: "Story", icon: Sparkles },
            { num: 3, label: "Mini-Game", icon: Gamepad2 },
            { num: 4, label: "Quiz", icon: HelpCircle },
            { num: 5, label: "AI Film", icon: Film },
            { num: 6, label: "Letter", icon: Heart },
          ].map((step) => {
            const Icon = step.icon;
            const isActive = currentAct === step.num;
            const isPassed = currentAct > step.num;

            return (
              <button
                key={step.num}
                onClick={() => isPassed && setCurrentAct(step.num)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-white font-bold shadow-md"
                    : isPassed
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-500 opacity-60"
                }`}
                style={{
                  backgroundColor: isActive ? theme.primary : "transparent",
                  boxShadow: isActive ? `0 0 15px ${theme.primary}60` : "none",
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* ACT 1: OPENING CINEMATIC & PROLOGUE */}
        {currentAct === 1 && (
          <div className="w-full max-w-3xl text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <span
              className="text-xs uppercase font-mono tracking-widest px-3.5 py-1 rounded-full glass-pill mb-4"
              style={{ color: theme.primary }}
            >
              {openingCinematic.headline}
            </span>

            <h1 className="font-cinematic text-3xl sm:text-5xl font-black text-white tracking-wider mb-4 leading-tight">
              {universe.title}
            </h1>

            <p className="text-base sm:text-xl font-light text-slate-300 mb-8 max-w-xl">
              {openingCinematic.subheadline}
            </p>

            {openingCinematic.teluguQuote && (
              <div className="font-telugu text-lg sm:text-2xl text-amber-300 font-semibold mb-4 leading-relaxed glow-text-gold">
                &ldquo;{openingCinematic.teluguQuote}&rdquo;
              </div>
            )}

            <div className="text-sm sm:text-base italic text-slate-200 mb-10 max-w-md font-script">
              &ldquo;{openingCinematic.quote}&rdquo;
            </div>

            {/* 3D Character Avatar Preview */}
            <Avatar3DViewer
              character={character}
              themeColor={theme.primary}
              accentColor={theme.accent}
            />

            <button
              onClick={() => {
                soundEngine.playSuccessChime();
                setCurrentAct(2);
              }}
              className="mt-8 flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 35px ${theme.primary}60`,
              }}
            >
              <span>Enter The Story Arc</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ACT 2: INTERACTIVE STORY ARC & DIALOGUES */}
        {currentAct === 2 && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
            <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
              Act II: The Journey &amp; Memories
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 text-center">
              A private dialogue between Arshiya and {universe.recipientName}
            </p>

            {/* Typewriter Dialogue Container */}
            <DialogueBox
              dialogues={storyActs.flatMap((act) => act.dialogues)}
              onComplete={() => {
                soundEngine.playSuccessChime();
                setCurrentAct(3);
              }}
              themeColor={theme.primary}
            />
          </div>
        )}

        {/* ACT 3: BESPOKE MINI-GAME */}
        {currentAct === 3 && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
            <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-white mb-1 text-center">
              {universe.miniGameTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-4 text-center">
              {universe.miniGameInstructions}
            </p>

            <MiniGameDispatcher
              gameType={universe.miniGameType}
              onComplete={() => {
                soundEngine.playSuccessChime();
                setCurrentAct(4);
              }}
              themeColor={theme.primary}
            />
          </div>
        )}

        {/* ACT 4: HOW WELL DO YOU KNOW ARSHIYA? QUIZ */}
        {currentAct === 4 && (
          <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
            <QuizContainer
              questions={quiz}
              recipientName={universe.recipientName}
              recipientId={universe.id}
              themeColor={theme.primary}
              onComplete={() => {
                soundEngine.playSuccessChime();
                setCurrentAct(5);
              }}
            />
          </div>
        )}

        {/* ACT 5: AI CINEMATIC VIDEO CLIMAX */}
        {currentAct === 5 && (
          <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center animate-in fade-in duration-500">
            <span
              className="text-xs uppercase font-mono tracking-widest px-3.5 py-1 rounded-full glass-pill mb-3"
              style={{ color: theme.primary }}
            >
              Act V: The Cinematic Crescendo
            </span>

            <h2 className="font-cinematic text-3xl font-bold text-white mb-3">
              {aiVideo.title}
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mb-8 leading-relaxed font-light">
              {aiVideo.description}
            </p>

            {/* Video Play Card */}
            <div
              onClick={() => setIsVideoModalOpen(true)}
              className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl cursor-pointer group flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-gradient-to-tr from-black via-slate-900 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"
              />

              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 active:scale-95"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 35px ${theme.primary}80`,
                }}
              >
                <Play className="w-8 h-8 fill-white text-white ml-1" />
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-300">
                <span className="font-mono">AI Directed by Arshiya</span>
                <span>{aiVideo.durationSeconds}s Cinematic Film</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playSuccessChime();
                setCurrentAct(6);
              }}
              className="mt-8 flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white tracking-wide transition-all transform hover:scale-105 active:scale-95 shadow-xl"
              style={{
                backgroundColor: theme.primary,
                boxShadow: `0 0 30px ${theme.primary}50`,
              }}
            >
              <span>Read Arshiya&apos;s Private Letter</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* ACT 6: ARSHIYA'S PRIVATE EMOTIONAL LETTER */}
        {currentAct === 6 && (
          <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl relative overflow-hidden">
              <div
                className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: theme.primary }}
              />

              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" style={{ color: theme.primary }} />
                  <span className="font-cinematic text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-300">
                    Private Letter from Arshiya
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Sealed with Love
                </span>
              </div>

              <h3 className="font-script text-2xl sm:text-3xl font-bold text-white mb-4">
                {privateLetter.salutation}
              </h3>

              {/* Voice Note Player */}
              <VoiceNotePlayer
                duration={privateLetter.voiceNoteDuration || "1:35"}
                themeColor={theme.primary}
                recipientName={universe.recipientName}
              />

              <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
                {privateLetter.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400 italic">
                    {privateLetter.closing}
                  </div>
                  <div className="font-script text-lg sm:text-xl font-bold text-white mt-1">
                    {privateLetter.signature}
                  </div>
                </div>

                <button
                  onClick={() => setIsResponseModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white tracking-wide transition-transform hover:scale-105 active:scale-95 shadow-xl"
                  style={{
                    backgroundColor: theme.primary,
                    boxShadow: `0 0 20px ${theme.primary}40`,
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reply to Arshiya</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <VideoCinematicModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title={aiVideo.title}
        description={aiVideo.description}
        prompt={aiVideo.prompt}
        themeColor={theme.primary}
      />

      {/* Response Modal */}
      <ResponseVaultModal
        isOpen={isResponseModalOpen}
        onClose={() => setIsResponseModalOpen(false)}
        recipientName={universe.recipientName}
        themeColor={theme.primary}
        universeId={universe.id}
      />
    </CinematicLetterbox>
  );
}

