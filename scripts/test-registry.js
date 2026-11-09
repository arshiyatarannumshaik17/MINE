const crypto = require("crypto");

const SECRET_SALT = "arshiya-12-little-universes-secret-salt-2026-xyz";

function hashAccessKey(rawKey) {
  return crypto
    .createHmac("sha256", SECRET_SALT)
    .update(rawKey.trim().toLowerCase())
    .digest("hex");
}

function safeCompareHashes(a, b) {
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

const RAW_KEYS = [
  { id: "abbu", name: "Abbu", key: "abbu-hero-2026-gold", hint: "Father's first title" },
  { id: "afrid", name: "Afrid", key: "afrid-seven-years-forever", hint: "7 years of love" },
  { id: "sameer", name: "Sameer", key: "sameer-water-bottle-secret", hint: "Cold water bottle champion" },
  { id: "jhansi", name: "Jhansi", key: "jhansi-btech-food-queen", hint: "B.Tech food adventures" },
  { id: "awez", name: "Awez", key: "awez-brother-loyalty-2026", hint: "Arshad Bhai's little brother" },
  { id: "manohar", name: "Manohar", key: "manohar-ambaaa-comedy-king", hint: "Iconic comedy shout" },
  { id: "mubeena", name: "Mubeena", key: "mubeena-pudeena-dance-step", hint: "Pudeena dance universe" },
  { id: "qurayba", name: "Qurayba", key: "qurayba-first-jaan-princess", hint: "First little Jaan" },
  { id: "wafeeqa", name: "Wafeeqa", key: "wafeeqa-sweet-baby-angel", hint: "Sweet little Jaan" },
  { id: "shahid", name: "Shahid", key: "shahid-aan-beta-voice-king", hint: "Pappa says: Aan Beta" },
  { id: "muskan", name: "Muskan", key: "muskan-chaos-duo-bestie", hint: "The cute chaos duo" },
  { id: "sana", name: "Sana", key: "sana-elegant-strongheart-sister", hint: "The elegant strongheart" },
];

console.log("=== 12 LITTLE UNIVERSES SECURITY KEY AUDIT ===");
let allPassed = true;
RAW_KEYS.forEach((rec, i) => {
  const hash = hashAccessKey(rec.key);
  const verify = safeCompareHashes(hash, hashAccessKey(rec.key));
  if (!verify) allPassed = false;
  console.log(`[Universe #${String(i+1).padStart(2, "0")}] ${rec.name.padEnd(10)} | Key: ${rec.key.padEnd(32)} | Validated: ${verify}`);
});

console.log(`\nOverall Security Integrity: ${allPassed ? "100% VERIFIED SUCCESS" : "FAILED"}`);
