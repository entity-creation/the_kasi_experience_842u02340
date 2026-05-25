# The Kasi Experience

A production-ready Next.js (App Router) application for creating highly personalized, cinematic digital gift experiences.

> **Not a SaaS product.** Each experience is a standalone, interactive webpage generated from a single JSON file — deployed per customer. Every interaction should feel intentional, slow, and emotional.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to the sample cinematic/signature experience.

**Direct experience URLs:**

| Experience | URL |
|---|---|
| Cinematic · Signature (Ada) | `/experience/cinematic/signature?id=abc123` |
| Romantic · Journey (Zara) | `/experience/romantic/journey?id=def456` |
| Luxury · Eternal (Elara) | `/experience/luxury/eternal?id=ghi789` |
| Playful · Moment (Temi) | `/experience/playful/moment?id=jkl012` |

---

## How to Create a New Experience

**No code changes required. Three steps:**

### 1. Copy an existing JSON

```bash
cp data/experiences/abc123.json data/experiences/myNewId.json
```

### 2. Edit the JSON

Open `data/experiences/myNewId.json` and update:

```json
{
  "id": "myNewId",
  "recipientName": "Diana",
  "eventType": "Birthday",
  "theme": "romantic",
  "tier": "journey",
  "letter": "Your personal letter here...",
  "photos": ["/images/photo1.jpg", "/images/photo2.jpg"],
  "voiceNote": "/audio/voice.mp3"
}
```

**Required fields:** `id`, `recipientName`, `eventType`, `theme`, `tier`, `letter`

**Optional fields:** `photos`, `voiceNote`, `video`, `messagesFromGroup`, `quiz`, `chapters`, `timelineEvents`, `futureUnlocks`, `rewardItems`, `senderName`, `customClosingMessage`, `soundtrack`

All optional fields are gracefully skipped if absent.

### 3. Add media files

Place images, audio, and video in `/public/`:

```
public/
  images/   ← JPG/PNG photos
  audio/    ← MP3 voice notes, soundtracks
  video/    ← MP4 memory videos
```

Reference them in JSON as `/images/photo.jpg`, `/audio/voice.mp3`, etc.

**Or use external URLs:** Unsplash, Cloudinary, etc. work directly.

### 4. Share the link

```
https://yourdomain.com/experience/romantic/journey?id=myNewId
```

---

## Themes

| Theme | Description | Colors |
|---|---|---|
| `generic` | Clean, minimal, universally warm | Soft white, beige, warm sans-serif |
| `romantic` | Soft pinks, gold, wax seals | Pink, cream, gold |
| `cinematic` | Dark navy, neon blue, film aesthetic | Navy, electric blue |
| `playful` | Bright gradients, bouncy cards | Pastel gradients, vivid accents |
| `luxury` | Black & gold, museum-quality | Black, gold, deep shadows |

---

## Tiers

| Tier | URL slug | Description |
|---|---|---|
| The Moment | `moment` | Minimal, single letter + photos |
| The Journey | `journey` | Quiz + voice + gallery |
| Signature Experience | `signature` | 5-chapter cinematic story + spin wheel |
| Luxury Experience | `luxury` | Wax seal + countdown + future unlocks |
| Eternal Experience | `eternal` | Timeline + memory vault + future reveals |

---

## Architecture

### How theme switching works

1. URL parameter `[theme]` (e.g. `cinematic`) is read by the Next.js server page
2. `ThemeProvider` receives the theme key, looks up `themeConfigs.ts`, and writes all values as **CSS custom properties** on a wrapper `<div>`
3. Tailwind utilities reference these vars (e.g. `kasi-bg`, `kasi-accent`)
4. All shared components call `useTheme()` to access the full `ThemeConfig` object for animation presets, component styles, etc.

### How tiers are dynamically loaded

The `ExperienceRenderer` client component uses `next/dynamic` to code-split each tier:

```ts
const TierSignature = dynamic(() => import('@/components/tiers/TierSignature')...)
```

This means only the relevant tier's JavaScript is downloaded for each experience.

### How animation presets are applied

`SceneTransition` reads `theme.transitions` and picks the correct Framer Motion variant:

- `fade` / `fadeSlow` → simple opacity transition
- `cinematic` → opacity + subtle scale
- `bloom` → opacity + blur + scale
- `slideBounce` → x-axis slide with spring

Each shared component also reads `theme.animations` for component-level effects (letter reveal style, photo frame, button hover, etc.)

---

## Folder Structure

```
thekasiexperience/
├── app/
│   ├── experience/[theme]/[tier]/
│   │   ├── page.tsx              ← server: loads JSON, validates, passes to renderer
│   │   └── ExperienceRenderer.tsx ← client: ThemeProvider + dynamic tier loader
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx                  ← redirects to sample experience
│   └── globals.css
├── components/
│   ├── themes/
│   │   ├── ThemeProvider.tsx     ← CSS vars + React context
│   │   └── themeConfigs.ts       ← all 5 ThemeConfig objects
│   ├── tiers/
│   │   ├── TierMoment.tsx
│   │   ├── TierJourney.tsx
│   │   ├── TierSignature.tsx
│   │   ├── TierLuxury.tsx
│   │   └── TierEternal.tsx
│   ├── shared/
│   │   ├── Letter.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── AudioPlayer.tsx
│   │   ├── VideoPlayer.tsx
│   │   ├── Quiz.tsx
│   │   ├── GroupMessages.tsx
│   │   ├── GiftReveal.tsx
│   │   ├── Timeline.tsx
│   │   ├── SpinWheel.tsx
│   │   └── SceneTransition.tsx
│   └── types.ts                  ← ExperienceData interface
├── data/
│   └── experiences/
│       ├── abc123.json           ← cinematic/signature
│       ├── def456.json           ← romantic/journey
│       ├── ghi789.json           ← luxury/eternal
│       └── jkl012.json           ← playful/moment
├── public/
│   ├── images/
│   ├── audio/
│   └── video/
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Adding New Themes or Tiers

### New Theme
1. Add a new entry to `components/themes/themeConfigs.ts`
2. Follow the `ThemeConfig` TypeScript interface exactly
3. Use the theme key as the URL `[theme]` segment

### New Tier
1. Create `components/tiers/TierNew.tsx` implementing the tier flow
2. Import it in `ExperienceRenderer.tsx` and add a case to `resolveTier()`
3. Add the new tier slug to the ExperienceData type if needed

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework, routing, server components |
| TypeScript | Strict typing throughout |
| Tailwind CSS | Utility styling + CSS variable integration |
| Framer Motion | All animations (scenes, letters, reveals, particles) |
| next/image | Optimized image loading |
| next/dynamic | Code-split tier components |

---

## Design Philosophy

Every tier must feel like **a scene in a film**, not a webpage.

- Transitions must feel **emotional**, **slow**, and **intentional**
- No dashboard patterns, no SaaS UI, no generic cards
- Each theme is a complete visual system — colors, typography, motion, texture
- The JSON drives everything — no code changes to create a new experience
