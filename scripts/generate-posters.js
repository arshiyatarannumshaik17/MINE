const fs = require("fs");
const path = require("path");

const POSTERS = [
  {
    id: "abbu",
    title: "Abbu: My First Hero",
    sub: "A Daughter's Eternal Cinematic Tribute",
    quote: "నా ప్రతి అడుగు వెనుక ఉన్న ధైర్యం... నా అబ్బు",
    primary: "#f5a623",
    secondary: "#1e3a8a",
    icon: "👑",
  },
  {
    id: "afrid",
    title: "Seven Years, One Universe",
    sub: "2,555 Days. Countless Memories. One Destiny.",
    quote: "Every star in my sky has your name on it.",
    primary: "#f43f5e",
    secondary: "#6366f1",
    icon: "💫",
  },
  {
    id: "sameer",
    title: "The Brother Who Hides His Heart",
    sub: "Cold Water Battles & A Heart of Pure Gold",
    quote: "I didn't pinch you, your arm just hit my fingers!",
    primary: "#14b8a6",
    secondary: "#f43f5e",
    icon: "🧃",
  },
  {
    id: "jhansi",
    title: "The Stubborn Adventure Queen",
    sub: "B.Tech Escapades & Street Food Debates",
    quote: "Stubborn together, fearless forever.",
    primary: "#ea580c",
    secondary: "#eab308",
    icon: "🔥",
  },
  {
    id: "awez",
    title: "Arshad Bhai's Little Brother",
    sub: "Loyalty, Respect & The Warmth of Family",
    quote: "True brothers aren't just by blood; they are chosen by love.",
    primary: "#d97706",
    secondary: "#059669",
    icon: "🛡️",
  },
  {
    id: "manohar",
    title: "The Comedy King",
    sub: "High Voltage AMBAAA & Barreshiya Banter",
    quote: "AMBAAAAA! Barreshiya has entered the building!",
    primary: "#ec4899",
    secondary: "#8b5cf6",
    icon: "🎭",
  },
  {
    id: "mubeena",
    title: "Pudeena's Dance Universe",
    sub: "Dance Floor Diva & Partner in Crime",
    quote: "When we dance together, even the stars follow our rhythm.",
    primary: "#10b981",
    secondary: "#db2777",
    icon: "💃",
  },
  {
    id: "qurayba",
    title: "My First Little Jaan",
    sub: "Fairytale Castles & Royal Nakhre",
    quote: "The day you arrived, my heart learned a new kind of love.",
    primary: "#f472b6",
    secondary: "#c084fc",
    icon: "👑",
  },
  {
    id: "wafeeqa",
    title: "Another Little Jaan",
    sub: "Chubby Cheeks & Sweet Baby Giggles",
    quote: "In your tiny hands rests the sweetness of the entire world.",
    primary: "#fb923c",
    secondary: "#fde047",
    icon: "👼",
  },
  {
    id: "shahid",
    title: "Pappa Says: Aan Beta",
    sub: "The Booming Voice & Timeless Wisdom",
    quote: "Aan Beta... Kaise ho? Suno dhyan se meri baat.",
    primary: "#b45309",
    secondary: "#78350f",
    icon: "🎙️",
  },
  {
    id: "muskan",
    title: "The Cute Chaos Duo",
    sub: "Twin-Flame Shenanigans & Snack Cravings",
    quote: "We eat, we laugh, we conquer!",
    primary: "#f43f5e",
    secondary: "#a855f7",
    icon: "🧁",
  },
  {
    id: "sana",
    title: "The Elegant Strongheart",
    sub: "Poise, Grace & The Sisterhood of Wisdom",
    quote: "True strength never needs to raise its voice to be heard.",
    primary: "#94a3b8",
    secondary: "#f43f5e",
    icon: "🕊️",
  },
];

const targetDir = path.join(process.cwd(), "public", "images");

POSTERS.forEach((p) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <radialGradient id="bg-${p.id}" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${p.secondary}" stop-opacity="0.45" />
      <stop offset="60%" stop-color="#05070f" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#020306" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="gold-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.primary}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <filter id="glow-${p.id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="25" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bg-${p.id})" />

  <!-- Stars -->
  <g opacity="0.6">
    <circle cx="150" cy="120" r="2" fill="#fff" opacity="0.8" />
    <circle cx="340" cy="240" r="1.5" fill="#fff" opacity="0.5" />
    <circle cx="890" cy="180" r="2.5" fill="#fff" opacity="0.7" />
    <circle cx="1100" cy="320" r="1.5" fill="#fff" opacity="0.4" />
    <circle cx="210" cy="540" r="2" fill="#fff" opacity="0.6" />
    <circle cx="980" cy="580" r="1.5" fill="#fff" opacity="0.5" />
    <circle cx="640" cy="110" r="3" fill="${p.primary}" opacity="0.9" />
  </g>

  <!-- Cinema Border Frame -->
  <rect x="40" y="40" width="1200" height="640" rx="24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
  <rect x="50" y="50" width="1180" height="620" rx="16" fill="none" stroke="${p.primary}" stroke-opacity="0.25" stroke-width="1" />

  <!-- Central Emblem Glow -->
  <circle cx="640" cy="280" r="90" fill="${p.primary}" opacity="0.18" filter="url(#glow-${p.id})" />
  <circle cx="640" cy="280" r="65" fill="#0b0e1b" stroke="${p.primary}" stroke-width="3" />
  <text x="640" y="295" font-size="48" text-anchor="middle" dominant-baseline="middle">${p.icon}</text>

  <!-- Badge -->
  <rect x="500" y="380" width="280" height="32" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
  <text x="640" y="401" font-family="'Cinzel', serif" font-size="12" fill="${p.primary}" font-weight="700" letter-spacing="3" text-anchor="middle">AN ARSHIYA ORIGINAL FILM</text>

  <!-- Titles -->
  <text x="640" y="465" font-family="'Cinzel', serif" font-size="44" fill="#ffffff" font-weight="900" letter-spacing="4" text-anchor="middle">${p.title.toUpperCase()}</text>
  <text x="640" y="505" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" fill="#cbd5e1" font-weight="400" letter-spacing="1" text-anchor="middle">${p.sub}</text>

  <!-- Quote -->
  <text x="640" y="565" font-family="'Playfair Display', serif" font-style="italic" font-size="20" fill="${p.primary}" opacity="0.95" text-anchor="middle">&ldquo;${p.quote}&rdquo;</text>

  <!-- Bottom Cinema Meta -->
  <text x="90" y="640" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="rgba(255,255,255,0.4)" letter-spacing="2">4K CINEMATIC ANAMORPHIC</text>
  <text x="1190" y="640" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="rgba(255,255,255,0.4)" letter-spacing="2" text-anchor="end">12 LITTLE UNIVERSES</text>
</svg>`;

  const filePath = path.join(targetDir, `${p.id}-cinematic-poster.svg`);
  fs.writeFileSync(filePath, svg, "utf-8");
  console.log(`[Generated Poster] ${p.id}-cinematic-poster.svg`);
});

console.log("All 12 universe posters generated successfully!");
