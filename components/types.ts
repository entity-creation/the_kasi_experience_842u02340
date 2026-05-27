// =============================================================
// EXPERIENCE DATA MODEL
// Every customer experience is driven by a single JSON file.
// All fields except id, recipientName, eventType, theme, tier,
// and letter are optional – UI must gracefully handle absence.
// =============================================================

export interface GroupMessage {
  name: string;
  message: string;
}

export interface QuizQuestion {
  text: string;
  correctAnswer: string;
  options?: string[];
}

export interface Chapter {
  title: string;
  content: string;
  media?: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  media?: string;
}

export interface FutureUnlock {
  date: string;
  message: string;
  media?: string;
}

// =============================================================
// CELEBRATION EVENT TYPE
// Only meaningful when theme === 'celebration'.
//
// To add a new event (e.g. 'diwali'):
//   1. Add 'diwali' to this union type below
//   2. Add a matching entry in celebrationVariants.ts
//   All components pick it up automatically — nothing else changes.
// =============================================================
export type CelebrationEvent =
  | 'eid'
  | 'christmas'
  // ── Nigerian celebrations ──────────────────────────────────
  | 'nigerian-independence'   // Oct 1 – green/white/gold, fireworks
  | 'eyo-festival'            // Lagos Eyo masquerade – white, gold, ancestral
  | 'new-yam-festival'        // Igbo Iri ji – harvest red, gold, earthy
  // ── Russian celebrations ───────────────────────────────────
  | 'new-year-russian'        // Новый год – blue/silver, snowflakes, champagne
  | 'maslenitsa'              // Масленица – warm orange/gold, straw, blini
  // ── Add more here – see celebrationVariants.ts for the pattern ──

export interface ExperienceData {
  id: string;
  recipientName: string;
  eventType: string;
  theme: string;
  tier: 'moment' | 'journey' | 'signature' | 'luxury' | 'eternal';

  // Core content
  letter: string;
  photos?: string[];
  voiceNote?: string;
  video?: string;

  // Extended content
  messagesFromGroup?: GroupMessage[];
  quiz?: { questions: QuizQuestion[] };
  chapters?: Chapter[];
  timelineEvents?: TimelineEvent[];
  futureUnlocks?: FutureUnlock[];
  rewardItems?: string[];

  // Metadata
  senderName?: string;
  occasion?: string;
  customClosingMessage?: string;
  soundtrack?: string;

  // Celebration theme only – drives all event-specific visual overrides.
  // If theme === 'celebration' and this is absent, festive fallback defaults are used.
  celebrationEvent?: CelebrationEvent;
}
