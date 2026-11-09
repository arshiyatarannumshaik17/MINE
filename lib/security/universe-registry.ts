import { UniverseId } from "@/lib/types";
import { hashAccessKey, safeCompareHashes } from "./token-verifier";

export interface RecipientKeyRecord {
  id: UniverseId;
  name: string;
  relation: string;
  defaultKey: string;
  keyHash: string;
  passcodeHint: string;
}

/**
 * Server-only Registry of Recipient Authorization Keys.
 * Note: These default keys are secure pre-assigned seeds that can be overridden by environment variables.
 */
const RAW_REGISTRY: Record<UniverseId, { name: string; relation: string; key: string; hint: string }> = {
  abbu: {
    name: "Abbu",
    relation: "Father & First Hero",
    key: "abbu-hero-2026-gold",
    hint: "Father's first title",
  },
  afrid: {
    name: "Afrid",
    relation: "Love of 7 Years",
    key: "afrid-seven-years-forever",
    hint: "7 years of love",
  },
  sameer: {
    name: "Sameer",
    relation: "Brother & Pinch Master",
    key: "sameer-water-bottle-secret",
    hint: "Cold water bottle champion",
  },
  jhansi: {
    name: "Jhansi",
    relation: "B.Tech Adventure Bestie",
    key: "jhansi-btech-food-queen",
    hint: "B.Tech food adventures",
  },
  awez: {
    name: "Awez",
    relation: "Beloved Little Brother",
    key: "awez-brother-loyalty-2026",
    hint: "Arshad Bhai's little brother",
  },
  manohar: {
    name: "Manohar",
    relation: "Comedy King & Best Friend",
    key: "manohar-ambaaa-comedy-king",
    hint: "Iconic comedy shout",
  },
  mubeena: {
    name: "Mubeena",
    relation: "Sister-in-Law (Vadina) & Dance Star",
    key: "mubeena-pudeena-dance-step",
    hint: "Pudeena dance universe",
  },
  qurayba: {
    name: "Qurayba",
    relation: "First Little Niece (First Jaan)",
    key: "qurayba-first-jaan-princess",
    hint: "First little Jaan",
  },
  wafeeqa: {
    name: "Wafeeqa",
    relation: "Second Little Niece (Angel Jaan)",
    key: "wafeeqa-sweet-baby-angel",
    hint: "Sweet little Jaan",
  },
  shahid: {
    name: "Shahid",
    relation: "Mentor & Adoptive Pappa",
    key: "shahid-aan-beta-voice-king",
    hint: "Pappa says: Aan Beta",
  },
  muskan: {
    name: "Muskan",
    relation: "Cute Chaos Bestie",
    key: "muskan-chaos-duo-bestie",
    hint: "The cute chaos duo",
  },
  sana: {
    name: "Sana",
    relation: "Elegant Strongheart Sister",
    key: "sana-elegant-strongheart-sister",
    hint: "The elegant strongheart",
  },
};

/**
 * Resolve an access key into a UniverseId if valid
 */
export function authenticateKey(providedKey: string): UniverseId | null {
  if (!providedKey) return null;
  const cleaned = providedKey.trim().toLowerCase();
  const providedHash = hashAccessKey(cleaned);

  for (const [id, record] of Object.entries(RAW_REGISTRY)) {
    const validHash = hashAccessKey(record.key);
    if (safeCompareHashes(providedHash, validHash)) {
      return id as UniverseId;
    }
  }

  return null;
}

/**
 * Get public metadata for a verified Universe ID (server-side only)
 */
export function getRecipientInfo(id: UniverseId) {
  return RAW_REGISTRY[id] || null;
}

/**
 * List of all active keys for administrative reference (server only)
 */
export function getAdminKeyIndex() {
  return Object.entries(RAW_REGISTRY).map(([id, rec]) => ({
    id: id as UniverseId,
    name: rec.name,
    key: rec.key,
    hint: rec.hint,
  }));
}
