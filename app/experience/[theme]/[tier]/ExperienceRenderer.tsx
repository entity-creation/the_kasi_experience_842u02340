'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/components/themes/ThemeProvider';
import { ExperienceData } from '@/components/types';

// ── Dynamically import tier components (code-split per tier) ──
const TierMoment    = dynamic(() => import('@/components/tiers/TierMoment').then(m => ({ default: m.TierMoment })));
const TierJourney   = dynamic(() => import('@/components/tiers/TierJourney').then(m => ({ default: m.TierJourney })));
const TierSignature = dynamic(() => import('@/components/tiers/TierSignature').then(m => ({ default: m.TierSignature })));
const TierLuxury    = dynamic(() => import('@/components/tiers/TierLuxury').then(m => ({ default: m.TierLuxury })));
const TierEternal   = dynamic(() => import('@/components/tiers/TierEternal').then(m => ({ default: m.TierEternal })));

interface ExperienceRendererProps {
  data: ExperienceData;
  themeKey: string;
  tierKey: string;
}

/**
 * ExperienceRenderer
 *
 * Client boundary that:
 * 1. Wraps everything in ThemeProvider (sets CSS variables + context)
 * 2. Dynamically renders the correct tier component
 *
 * Tier → component mapping:
 *   moment    → TierMoment
 *   journey   → TierJourney
 *   signature → TierSignature
 *   luxury    → TierLuxury
 *   eternal   → TierEternal
 */
export function ExperienceRenderer({ data, themeKey, tierKey }: ExperienceRendererProps) {
  const TierComponent = resolveTier(tierKey);

  return (
    <ThemeProvider themeKey={themeKey}>
      <TierComponent data={data} />
    </ThemeProvider>
  );
}

function resolveTier(tier: string) {
  switch (tier) {
    case 'moment':    return TierMoment;
    case 'journey':   return TierJourney;
    case 'signature': return TierSignature;
    case 'luxury':    return TierLuxury;
    case 'eternal':   return TierEternal;
    default:          return TierMoment;
  }
}
