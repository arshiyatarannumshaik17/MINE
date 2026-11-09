import { UniverseId, UniverseTheme, CharacterConcept, StoryAct } from "@/lib/types";

export interface RecipientRecord {
  id: UniverseId;
  slug: string;
  fullName: string;
  relation: string;
  themeId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccessCredentialRecord {
  id: string;
  recipientId: UniverseId;
  type: "TOKEN" | "PIN";
  secretHash: string;
  salt: string;
  displayHint: string;
  failedAttempts: number;
  lockedUntil: string | null;
  lastUsedAt: string | null;
  createdAt: string;
}

export interface ExperienceConfigRecord {
  id: string;
  recipientId: UniverseId;
  title: string;
  subtitle: string;
  themeConfig: UniverseTheme;
  characterConfig: CharacterConcept;
  openingCinematic: {
    headline: string;
    subheadline: string;
    quote: string;
    teluguQuote?: string;
    backdropStyle: string;
  };
  storyActs: StoryAct[];
  miniGameType: UniverseId;
  miniGameTitle: string;
  miniGameInstructions: string;
  aiVideoConfig: {
    title: string;
    description: string;
    prompt: string;
    durationSeconds: number;
    posterUrl: string;
    videoUrl?: string;
  };
  letterContent: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    hasVoiceNote?: boolean;
    voiceNoteDuration?: string;
  };
}

export interface QuizQuestionRecord {
  id: string;
  recipientId: UniverseId;
  orderIndex: number;
  type?: string;
  questionText: string;
  teluguText?: string;
  options: {
    text: string;
    reaction: string;
  }[];
  correctOptionIndex: number; // SERVER ONLY - NEVER RETURNED IN PUBLIC QUIZ ENDPOINTS
  explanation: string;
}

export interface QuizAttemptRecord {
  id: string;
  recipientId: UniverseId;
  startedAt: string;
  completedAt: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  clientIpHash?: string;
}

export interface MediaAssetRecord {
  id: string;
  recipientId: UniverseId;
  type: "VIDEO" | "AUDIO" | "POSTER" | "MODEL";
  assetPath: string;
  mimeType: string;
  checksum: string;
  isProtected: boolean;
  createdAt: string;
}

export interface RecipientResponseRecord {
  id: string;
  recipientId: UniverseId;
  recipientName: string;
  mood: string;
  messageText: string;
  audioAssetPath?: string;
  isRead: boolean;
  createdAt: string;
}

export interface DatabaseState {
  recipients: RecipientRecord[];
  credentials: AccessCredentialRecord[];
  experiences: ExperienceConfigRecord[];
  quizQuestions: QuizQuestionRecord[];
  quizAttempts: QuizAttemptRecord[];
  mediaAssets: MediaAssetRecord[];
  responses: RecipientResponseRecord[];
}

