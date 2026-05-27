// =============================================================
// CELEBRATION VARIANTS
//
// This is the single source of truth for every event-specific
// visual override. All shared components (Letter, GiftReveal,
// GroupMessages, etc.) read from here via useCelebrationVariant().
//
// HOW TO ADD A NEW EVENT (e.g. Diwali):
// ─────────────────────────────────────
//  1. Add 'diwali' to the CelebrationEvent union in types.ts
//  2. Add a CelebrationVariant object to CELEBRATION_VARIANTS below
//  3. Done. No component code needs touching.
//
// =============================================================

import type { CelebrationEvent } from '../types';

// ── Shape of a full event variant ─────────────────────────────

export interface CelebrationColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textLight: string;
  shadow: string;
}

export interface CelebrationVariant {
  // Color palette overrides (merged over the base celebration theme)
  colors: CelebrationColors;

  // Background – SVG pattern key rendered by CelebrationBackground
  backgroundPattern: 'crescentStars' | 'snowflakes' | 'fireworks' | 'masquerade' | 'harvest' | 'blini' | 'festive';

  // Particle effect used by ParticleBurst in GiftReveal
  particleEffect: 'sparkles' | 'snowflakes' | 'fireworks' | 'petals' | 'goldDust' | 'confetti';

  // Wax seal SVG icon key rendered on the Letter
  waxSealIcon: 'crescent' | 'snowflake' | 'star' | 'tree' | 'flag' | 'flame' | 'sun';

  // CSS class or texture key for the letter paper
  letterTexture: 'silk' | 'vintageCard' | 'parchment' | 'linen' | 'goldLeaf';

  // Gift reveal animation variant
  giftAnimation: 'giftBag' | 'boxOpen' | 'fireworksBurst' | 'lanternOpen';

  // GroupMessages visual container
  messagesPresentation: 'lanterns' | 'stockings' | 'rockets' | 'envelopes' | 'pots';

  // Ending screen
  endingMessage: string;
  endingAnimation: 'starfall' | 'confetti' | 'fireworks' | 'petals' | 'snowfall';

  // Human-readable label shown in the intro
  eventLabel: string;

  // Optional greeting phrase (used in letter salutation area)
  greeting?: string;
}

// =============================================================
// VARIANT MAP
// =============================================================

export const CELEBRATION_VARIANTS: Record<CelebrationEvent, CelebrationVariant> = {

  // ── EID ──────────────────────────────────────────────────────
  eid: {
    colors: {
      background: '#0A0A0A',
      surface:    '#0F6B3D',
      primary:    '#1A7A48',
      secondary:  '#C9A84C',
      accent:     '#D4AF37',
      text:       '#A3A3A3',
      textLight:  '#C9D9C4',
      shadow:     'rgba(0,0,0,0.5)',
    },
    backgroundPattern: 'crescentStars',
    particleEffect:    'sparkles',
    waxSealIcon:       'crescent',
    letterTexture:     'silk',
    giftAnimation:     'giftBag',
    messagesPresentation: 'lanterns',
    endingMessage:     'Eid Mubarak – May your days be blessed',
    endingAnimation:   'starfall',
    eventLabel:        'Eid Mubarak',
    greeting:          'As-salamu alaykum',
  },

  // ── CHRISTMAS ────────────────────────────────────────────────
  christmas: {
    colors: {
      background: '#1A2F1A',
      surface:    '#1E3A1E',
      primary:    '#C8372D',
      secondary:  '#2E5C2E',
      accent:     '#F5C842',
      text:       '#FFF8F0',
      textLight:  '#B8CEB8',
      shadow:     'rgba(0,0,0,0.4)',
    },
    backgroundPattern: 'snowflakes',
    particleEffect:    'snowflakes',
    waxSealIcon:       'tree',
    letterTexture:     'vintageCard',
    giftAnimation:     'boxOpen',
    messagesPresentation: 'stockings',
    endingMessage:     'Merry Christmas – Peace, joy, and wonder to you',
    endingAnimation:   'confetti',
    eventLabel:        'Merry Christmas',
    greeting:          'With love this Christmas',
  },

  // ── NIGERIAN INDEPENDENCE ─────────────────────────────────────
  'nigerian-independence': {
    colors: {
      background: '#006600',
      surface:    '#004D00',
      primary:    '#FFFFFF',
      secondary:  '#008000',
      accent:     '#FFD700',
      text:       '#FFFFFF',
      textLight:  '#C8E6C9',
      shadow:     'rgba(0,0,0,0.4)',
    },
    backgroundPattern: 'fireworks',
    particleEffect:    'fireworks',
    waxSealIcon:       'flag',
    letterTexture:     'parchment',
    giftAnimation:     'fireworksBurst',
    messagesPresentation: 'rockets',
    endingMessage:     'Happy Independence Day – Nigeria, we hail thee',
    endingAnimation:   'fireworks',
    eventLabel:        'Happy Independence Day 🇳🇬',
    greeting:          'Naija no dey carry last',
  },

  // ── EYO FESTIVAL (Lagos) ──────────────────────────────────────
  'eyo-festival': {
    colors: {
      background: '#F5F0E8',
      surface:    '#FFFFFF',
      primary:    '#E8E0D0',
      secondary:  '#C9A84C',
      accent:     '#D4AF37',
      text:       '#2C1810',
      textLight:  '#7A6558',
      shadow:     'rgba(0,0,0,0.1)',
    },
    backgroundPattern: 'masquerade',
    particleEffect:    'petals',
    waxSealIcon:       'sun',
    letterTexture:     'linen',
    giftAnimation:     'lanternOpen',
    messagesPresentation: 'envelopes',
    endingMessage:     'The spirit of Eyo walks with you – Ẹkú ìjókòó',
    endingAnimation:   'petals',
    eventLabel:        'Eyo Festival',
    greeting:          'Ẹkú àárọ̀',
  },

  // ── NEW YAM FESTIVAL (Igbo Iri Ji) ───────────────────────────
  'new-yam-festival': {
    colors: {
      background: '#3D1C02',
      surface:    '#5A2D0C',
      primary:    '#C17A2E',
      secondary:  '#8B4513',
      accent:     '#E8A838',
      text:       '#FFF8E7',
      textLight:  '#D4B896',
      shadow:     'rgba(0,0,0,0.5)',
    },
    backgroundPattern: 'harvest',
    particleEffect:    'goldDust',
    waxSealIcon:       'flame',
    letterTexture:     'parchment',
    giftAnimation:     'lanternOpen',
    messagesPresentation: 'pots',
    endingMessage:     'Iri Ji Ọhụrụ – May the harvest multiply your blessings',
    endingAnimation:   'petals',
    eventLabel:        'New Yam Festival',
    greeting:          'Nnọọ – Welcome',
  },

  // ── RUSSIAN NEW YEAR (Новый год) ──────────────────────────────
  'new-year-russian': {
    colors: {
      background: '#0D1B3E',
      surface:    '#122550',
      primary:    '#1E3A6E',
      secondary:  '#C0C0C0',
      accent:     '#E8D44D',
      text:       '#F0F4FF',
      textLight:  '#9AAAC8',
      shadow:     'rgba(0,0,0,0.6)',
    },
    backgroundPattern: 'snowflakes',
    particleEffect:    'snowflakes',
    waxSealIcon:       'snowflake',
    letterTexture:     'vintageCard',
    giftAnimation:     'boxOpen',
    messagesPresentation: 'stockings',
    endingMessage:     'С Новым Годом – May the new year bring you everything you deserve',
    endingAnimation:   'snowfall',
    eventLabel:        'С Новым Годом 🎄',
    greeting:          'С Новым Годом',
  },

  // ── MASLENITSA (Масленица) ─────────────────────────────────────
  maslenitsa: {
    colors: {
      background: '#3D1F00',
      surface:    '#5C2E00',
      primary:    '#E07820',
      secondary:  '#C85C10',
      accent:     '#F5C842',
      text:       '#FFF3E0',
      textLight:  '#D4A870',
      shadow:     'rgba(0,0,0,0.4)',
    },
    backgroundPattern: 'blini',
    particleEffect:    'confetti',
    waxSealIcon:       'sun',
    letterTexture:     'linen',
    giftAnimation:     'fireworksBurst',
    messagesPresentation: 'envelopes',
    endingMessage:     'Масленица – Let go of winter, welcome the sun',
    endingAnimation:   'petals',
    eventLabel:        'Масленица',
    greeting:          'Прощай зима – Farewell winter',
  },
};

// ── Fallback used when celebrationEvent is missing ────────────
export const CELEBRATION_FALLBACK: CelebrationVariant = {
  colors: {
    background: '#1A1A2E',
    surface:    '#16213E',
    primary:    '#0F3460',
    secondary:  '#533483',
    accent:     '#E94560',
    text:       '#FFFFFF',
    textLight:  '#A8A8C0',
    shadow:     'rgba(0,0,0,0.5)',
  },
  backgroundPattern: 'festive',
  particleEffect:    'confetti',
  waxSealIcon:       'star',
  letterTexture:     'goldLeaf',
  giftAnimation:     'boxOpen',
  messagesPresentation: 'envelopes',
  endingMessage:     'May this celebration be remembered forever',
  endingAnimation:   'confetti',
  eventLabel:        'Celebrations',
  greeting:          'With warm wishes',
};

// ── Helper ─────────────────────────────────────────────────────
export function getCelebrationVariant(event?: string | null): CelebrationVariant {
  if (!event) return CELEBRATION_FALLBACK;
  return CELEBRATION_VARIANTS[event as CelebrationEvent] ?? CELEBRATION_FALLBACK;
}
