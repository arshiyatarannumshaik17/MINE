import { DatabaseState, RecipientRecord, AccessCredentialRecord, QuizQuestionRecord, MediaAssetRecord } from "./schema";
import { UNIVERSES_DATA } from "@/lib/universes/data";
import { generateSalt, hashPin } from "@/lib/security/pin-hasher";
import { hashAccessKey } from "@/lib/security/token-verifier";
import { UniverseId } from "@/lib/types";

// Standard preset PINs for each recipient (4 digits)
export const RECIPIENT_PINS: Record<UniverseId, string> = {
  abbu: "1001",
  afrid: "2555", // 2,555 days of love
  sameer: "7777",
  jhansi: "4004",
  awez: "5005",
  manohar: "9999", // High voltage
  mubeena: "3333",
  qurayba: "1111", // First little jaan
  wafeeqa: "2222", // Second little jaan
  shahid: "8888",
  muskan: "1234",
  sana: "5555",
};

export function createInitialDatabaseState(): DatabaseState {
  const now = new Date().toISOString();
  const recipients: RecipientRecord[] = [];
  const credentials: AccessCredentialRecord[] = [];
  const experiences = Object.values(UNIVERSES_DATA).map((u) => ({
    id: `exp-${u.id}`,
    recipientId: u.id,
    title: u.title,
    subtitle: u.subtitle,
    themeConfig: u.theme,
    characterConfig: u.character,
    openingCinematic: u.openingCinematic,
    storyActs: u.storyActs,
    miniGameType: u.miniGameType,
    miniGameTitle: u.miniGameTitle,
    miniGameInstructions: u.miniGameInstructions,
    aiVideoConfig: u.aiVideo,
    letterContent: u.privateLetter,
  }));

  const quizQuestions: QuizQuestionRecord[] = [];
  const mediaAssets: MediaAssetRecord[] = [];

  for (const [id, spec] of Object.entries(UNIVERSES_DATA)) {
    const universeId = id as UniverseId;

    // Recipient Record
    recipients.push({
      id: universeId,
      slug: universeId,
      fullName: spec.recipientName,
      relation: spec.relation,
      themeId: spec.theme.primary,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });

    // 1. TOKEN Credential
    credentials.push({
      id: `cred-token-${universeId}`,
      recipientId: universeId,
      type: "TOKEN",
      secretHash: hashAccessKey(spec.secretPasscode),
      salt: "static-token-salt",
      displayHint: spec.secretPasscode,
      failedAttempts: 0,
      lockedUntil: null,
      lastUsedAt: null,
      createdAt: now,
    });

    // 2. PIN Credential
    const pin = RECIPIENT_PINS[universeId] || "1234";
    const pinSalt = generateSalt(16);
    credentials.push({
      id: `cred-pin-${universeId}`,
      recipientId: universeId,
      type: "PIN",
      secretHash: hashPin(pin, pinSalt),
      salt: pinSalt,
      displayHint: pin,
      failedAttempts: 0,
      lockedUntil: null,
      lastUsedAt: null,
      createdAt: now,
    });

    // Quiz Questions with Server-Only correctOptionIndex
    spec.quiz.forEach((q, idx) => {
      const correctIdx = q.options.findIndex((opt) => opt.isCorrect);
      quizQuestions.push({
        id: `q-${q.id}`,
        recipientId: universeId,
        orderIndex: idx + 1,
        questionText: q.question,
        teluguText: q.teluguQuestion,
        options: q.options.map((opt) => ({
          text: opt.text,
          reaction: opt.reaction,
        })),
        correctOptionIndex: correctIdx >= 0 ? correctIdx : 0,
        explanation: q.explanation,
      });
    });

    // Media Assets References
    mediaAssets.push(
      {
        id: `media-vid-${universeId}`,
        recipientId: universeId,
        type: "VIDEO",
        assetPath: `/videos/${universeId}-cinematic.mp4`,
        mimeType: "video/mp4",
        checksum: "sha256-precomputed-video",
        isProtected: true,
        createdAt: now,
      },
      {
        id: `media-poster-${universeId}`,
        recipientId: universeId,
        type: "POSTER",
        assetPath: `/images/${universeId}-cinematic-poster.webp`,
        mimeType: "image/webp",
        checksum: "sha256-precomputed-poster",
        isProtected: false,
        createdAt: now,
      }
    );
  }

  return {
    recipients,
    credentials,
    experiences,
    quizQuestions,
    quizAttempts: [],
    mediaAssets,
    responses: [],
  };
}

