# 12 Little Universes — Arshiya's Edition 🌌

> **An anthology of 12 bespoke, highly personalized interactive animated cinematic experiences.**  
> Crafted with emotional storytelling, WebGL/Three.js 3D character avatars, procedural audio, interactive mini-games, personalized quizzes, and server-side zero-leakage security.

---

## 🌟 The 12 Little Universes

| # | Recipient | Universe Title | Key Theme | Bespoke Mini-Game | Access Key (Portal) |
| :- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Abbu** | *Abbu: My First Hero* | Telugu cinematic tribute, father-daughter bond, family pride | *The Hero's Shield* (Raindrop & Jasmine game) | `abbu-hero-2026-gold` |
| **02** | **AFRID** | *Seven Years, One Universe* | 7-year romantic journey, long drives, In Sha Allah future | *Constellation of Seven* (7-Year timeline) | `afrid-seven-years-forever` |
| **03** | **Sameer** | *The Brother Who Hides His Heart* | Brotherhood comedy, sneaky pinches, cold water bottle battles | *Cold Water Bottle Heist* (Pinch arcade) | `sameer-water-bottle-secret` |
| **04** | **Jhansi** | *The Stubborn Adventure Queen* | B.Tech final-year memories, street food runs, stubborn loyalty | *Street Food Scramble* (Panipuri & chai) | `jhansi-btech-food-queen` |
| **05** | **Awez** | *Arshad Bhai's Little Brother* | Sibling loyalty, family humor, dessert raiding | *Family Errand Sprint* (Feast ingredients) | `awez-brother-loyalty-2026` |
| **06** | **Manohar** | *The Comedy King* | High-voltage AMBAAA shouts, Barreshiya jokes, comedic genius | *The AMBAAA Megaphone Meter* | `manohar-ambaaa-comedy-king` |
| **07** | **Mubeena** | *Pudeena's Dance Universe* | Bollywood dance queen, sister-in-law (Vadina) bonding | *Pudeena's Dance Step Sync* (Rhythm arrows) | `mubeena-pudeena-dance-step` |
| **08** | **Qurayba** | *My First Little Jaan* | Fairytale cloud realm, first niece, royal nakhre | *The Nakhre Spoil-O-Meter* (Princess treats) | `qurayba-first-jaan-princess` |
| **09** | **Wafeeqa** | *Another Little Jaan* | Sweet baby niece, chubby cheeks, pure angelic giggles | *Wafeeqa's Butterfly Meadow* | `wafeeqa-sweet-baby-angel` |
| **10** | **Shahid** | *Pappa Says: Aan Beta* | Booming voice, adoptive father dynamic, heartfelt mentorship | *The 'Aan Beta' Soundboard* (4 iconic moods) | `shahid-aan-beta-voice-king` |
| **11** | **Muskan** | *The Cute Chaos Duo* | Twin-flame mischief, canceling diets, body-positive laughter | *The Snack Attack Chaos* (Boba & waffles) | `muskan-chaos-duo-bestie` |
| **12** | **Sana** | *The Elegant Strongheart* | Poise, boundaries of dignity, sisterhood of quiet wisdom | *The Zen Reflection Pond* (Lunar ripples) | `sana-elegant-strongheart-sister` |

---

## 🔒 Privacy & Security Architecture

1. **Zero Public Directory:** The website root (`/`) does NOT reveal recipient names, relationships, photos, or links to their universes.
2. **Server-Side Cryptographic Token Verification:** URLs cannot be guessed. Only access keys validated via HMAC-SHA256 with server-side secrets can unlock a universe.
3. **No Bundle Leakage:** Data for one person (e.g. Abbu or Afrid) is never exposed to another recipient.
4. **The Starlight Response Vault:** Each recipient has a private response modal (`/api/response/submit`) to send a sealed letter back to Arshiya.

---

## 🛠️ Technology Architecture

- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
- **3D Graphics & Shaders:** Three.js (Procedural particle starfield, WebGL lighting rig, 3D character avatars with hover/tilt physics)
- **Audio Synthesis Engine:** Native Web Audio API Sound Engine (Synthesizes ambient chords, celesta arpeggios, typewriter clicks, and game SFX natively with zero external dependencies)
- **Motion & FX:** Framer Motion + Canvas Confetti
- **Styling:** Tailwind CSS with 12 bespoke aesthetic matrices (aspect ratio 21:9 cinema mode, film grain, glassmorphism)

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see the cosmic landing page, or enter the portal at `http://localhost:3000/portal`.

### Direct Recipient Invitation Links
Recipients can jump directly into their private universe using their invitation link:
- **Abbu:** `http://localhost:3000/portal?key=abbu-hero-2026-gold`
- **Afrid:** `http://localhost:3000/portal?key=afrid-seven-years-forever`
- **Sameer:** `http://localhost:3000/portal?key=sameer-water-bottle-secret`
- **Jhansi:** `http://localhost:3000/portal?key=jhansi-btech-food-queen`
- **Awez:** `http://localhost:3000/portal?key=awez-brother-loyalty-2026`
- **Manohar:** `http://localhost:3000/portal?key=manohar-ambaaa-comedy-king`
- **Mubeena:** `http://localhost:3000/portal?key=mubeena-pudeena-dance-step`
- **Qurayba:** `http://localhost:3000/portal?key=qurayba-first-jaan-princess`
- **Wafeeqa:** `http://localhost:3000/portal?key=wafeeqa-sweet-baby-angel`
- **Shahid:** `http://localhost:3000/portal?key=shahid-aan-beta-voice-king`
- **Muskan:** `http://localhost:3000/portal?key=muskan-chaos-duo-bestie`
- **Sana:** `http://localhost:3000/portal?key=sana-elegant-strongheart-sister`

### Production Build
```bash
npm run build
npm run start
```
Verified compile: **100% static & server-side rendering pass with 0 errors**.

