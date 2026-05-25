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
  options?: string[]; // If provided, show as multiple-choice
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
}
