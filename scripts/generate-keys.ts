/**
 * Key Generation & Invitation Dispatcher CLI Script
 * Run with: npx tsx scripts/generate-keys.ts
 */
import { getAdminKeyIndex } from "../lib/security/universe-registry";

function printInvitations() {
  const domain = process.env.NEXT_PUBLIC_APP_URL || "https://12-little-universes.internal";
  const records = getAdminKeyIndex();

  console.log("\n=======================================================");
  console.log("   12 LITTLE UNIVERSES — ARSHIYA'S INVITATION VAULT    ");
  console.log("=======================================================\n");

  records.forEach((rec, idx) => {
    const inviteUrl = `${domain}/portal?key=${rec.key}`;
    console.log(`[Universe #${String(idx + 1).padStart(2, "0")}] ${rec.name.toUpperCase()}`);
    console.log(`  Key:        ${rec.key}`);
    console.log(`  Hint:       ${rec.hint}`);
    console.log(`  Portal URL: ${inviteUrl}`);
    console.log("-------------------------------------------------------");
  });

  console.log("\n[!] SECURITY NOTICE: Share each link ONLY with its designated recipient.");
  console.log("    Server-side authorization prevents cross-universe access.\n");
}

printInvitations();

