const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const filePath = path.join(__dirname, '../lib/universes/quiz-data.ts');
let code = fs.readFileSync(filePath, 'utf8');

// Replace import with empty object or mock
code = code.replace(/import\s*\{[^}]*\}\s*from\s*["'][^"']+["'];?/g, '');

// Transpile with TypeScript
const jsCode = ts.transpileModule(code, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;

// Evaluate in sandbox context
const myExports = {};
const moduleObj = { exports: myExports };
const fn = new Function('exports', 'module', jsCode);
fn(myExports, moduleObj);

const quizData = moduleObj.exports.UNIVERSES_QUIZ_DATA || myExports.UNIVERSES_QUIZ_DATA;

if (!quizData) {
  console.error("FAIL: UNIVERSES_QUIZ_DATA not found in exports");
  process.exit(1);
}

const EXPECTED_RECIPIENTS = [
  "abbu", "afrid", "sameer", "jhansi", "awez", "manohar",
  "mubeena", "qurayba", "wafeeqa", "shahid", "muskan", "sana"
];

let totalQuestions = 0;
let errors = [];
const typeCounts = {
  multiple_choice: 0,
  true_false: 0,
  fill_blank: 0,
  memory_challenge: 0
};

console.log("=== VERIFYING 12 UNIVERSES QUIZ DATA ===");

for (const recipientId of EXPECTED_RECIPIENTS) {
  const list = quizData[recipientId];
  if (!list) {
    errors.push(`Missing recipient: ${recipientId}`);
    continue;
  }

  if (list.length !== 12) {
    errors.push(`Recipient ${recipientId} has ${list.length} questions, expected exactly 12`);
  }

  totalQuestions += list.length;
  console.log(`✓ Recipient: ${recipientId.padEnd(10)} -> ${list.length} questions`);

  list.forEach((q, idx) => {
    if (!q.id) errors.push(`${recipientId}[${idx}]: missing id`);
    if (!q.question) errors.push(`${recipientId}[${idx}]: missing question`);
    if (!q.explanation) errors.push(`${recipientId}[${idx}]: missing explanation`);

    if (!typeCounts[q.type]) {
      typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
    } else {
      typeCounts[q.type]++;
    }

    if (!Array.isArray(q.options) || q.options.length < 2) {
      errors.push(`${recipientId}[${idx}]: options must have >= 2 items`);
    } else {
      const correctCount = q.options.filter(o => o.isCorrect).length;
      if (correctCount !== 1) {
        errors.push(`${recipientId}[${idx}] (${q.id}): expected 1 correct option, found ${correctCount}`);
      }
      q.options.forEach((opt, oIdx) => {
        if (!opt.text) errors.push(`${recipientId}[${idx}] option[${oIdx}]: missing text`);
        if (!opt.reaction) errors.push(`${recipientId}[${idx}] option[${oIdx}]: missing reaction`);
      });
    }

    // Constraint: Qurayba and Wafeeqa must NEVER mention Saudi, Arabia, Islamic, supernatural
    if (recipientId === "qurayba" || recipientId === "wafeeqa") {
      const fullText = JSON.stringify(q).toLowerCase();
      const forbidden = ["saudi", "arabia", "islamic", "supernatural"];
      for (const word of forbidden) {
        if (fullText.includes(word)) {
          errors.push(`CRITICAL VIOLATION: ${recipientId}[${idx}] contains forbidden word "${word}"`);
        }
      }
    }

    // Constraint: Pappa (abbu) must have teluguQuestion and telugu content
    if (recipientId === "abbu") {
      if (!q.teluguQuestion) {
        errors.push(`abbu[${idx}]: missing teluguQuestion`);
      }
    }
  });
}

console.log("\n=== QUESTION TYPE DISTRIBUTION ===");
console.log(typeCounts);
console.log(`Total questions across all 12 recipients: ${totalQuestions}`);

if (errors.length > 0) {
  console.error(`\nFAILED WITH ${errors.length} ERRORS:`);
  errors.forEach(e => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("\n✅ ALL 144 QUIZ QUESTIONS PERFECTLY VALIDATED!");
}
