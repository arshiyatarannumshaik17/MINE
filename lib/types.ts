export type UniverseId =
  | "abbu"
  | "afrid"
  | "sameer"
  | "jhansi"
  | "awez"
  | "manohar"
  | "mubeena"
  | "qurayba"
  | "wafeeqa"
  | "shahid"
  | "muskan"
  | "sana";

export interface UniverseTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  borderColor: string;
  textColor: string;
  glowClass: string;
  bgGradient: string;
  ambientSoundType: "orchestral" | "romantic" | "comic" | "roadtrip" | "lofi" | "sitcom" | "bollywood" | "fairytale" | "lullaby" | "vintage" | "pastel" | "piano";
}

export interface CharacterConcept {
  name: string;
  subtitle: string;
  avatarIcon: string;
  tagline: string;
  expression: string;
  clothingDescription: string;
  accessories: string[];
  signatureQuote: string;
}

export interface DialogueNode {
  speaker: string;
  text: string;
  teluguText?: string;
  emotion?: "warm" | "laugh" | "touching" | "dramatic" | "sassy" | "teasing";
  avatarMood?: string;
}

export interface StoryAct {
  actNumber: number;
  actTitle: string;
  dialogues: DialogueNode[];
  interactivePrompt?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  teluguQuestion?: string;
  options: {
    text: string;
    isCorrect: boolean;
    reaction: string;
  }[];
  explanation: string;
}

export interface UniverseSpecification {
  id: UniverseId;
  title: string;
  subtitle: string;
  recipientName: string;
  relation: string;
  secretPasscode: string;
  theme: UniverseTheme;
  character: CharacterConcept;
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
  quiz: QuizQuestion[];
  aiVideo: {
    title: string;
    description: string;
    prompt: string;
    durationSeconds: number;
    posterUrl: string;
    videoUrl?: string;
  };
  privateLetter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    hasVoiceNote?: boolean;
    voiceNoteDuration?: string;
  };
}

export interface RecipientSession {
  recipientId: UniverseId;
  name: string;
  verifiedAt: number;
  token: string;
}

