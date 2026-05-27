'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { themes, ThemeConfig } from './themeConfigs';
import {
  getCelebrationVariant,
  CelebrationVariant,
} from './celebrationVariants';
import type { CelebrationEvent } from '../types';

// =============================================================
// CONTEXT
// =============================================================

interface ThemeContextValue {
  themeKey: string;
  theme: ThemeConfig;
  // Only populated when themeKey === 'celebration'
  celebrationEvent: CelebrationEvent | null;
  celebrationVariant: CelebrationVariant | null;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeKey: 'generic',
  theme: themes.generic,
  celebrationEvent: null,
  celebrationVariant: null,
});

/** Access the active theme config and (when relevant) the celebration variant. */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * useCelebrationVariant
 *
 * Convenience hook for shared components that need event-specific overrides.
 * Returns the resolved CelebrationVariant when theme === 'celebration',
 * or null for all other themes. Safe to call from any component.
 */
export function useCelebrationVariant(): CelebrationVariant | null {
  const { themeKey, celebrationVariant } = useContext(ThemeContext);
  if (themeKey !== 'celebration') return null;
  return celebrationVariant;
}

// =============================================================
// THEME PROVIDER
// =============================================================

interface ThemeProviderProps {
  themeKey: string;
  celebrationEvent?: CelebrationEvent | null;
  children: React.ReactNode;
}

/**
 * ThemeProvider
 *
 * 1. Resolves the ThemeConfig for `themeKey`.
 * 2. For the 'celebration' theme, merges the event-specific color
 *    palette on top of the base celebration config.
 * 3. Writes all resolved values as CSS custom properties on the
 *    wrapper <div> (scoped, not on <html> — allows previews).
 * 4. Exposes the full config + celebrationVariant via React context.
 * 5. When theme === 'celebration', lazily renders CelebrationBackground
 *    inside the wrapper so no tier component needs to import it.
 */
export function ThemeProvider({ themeKey, celebrationEvent, children }: ThemeProviderProps) {
  const baseTheme = themes[themeKey] ?? themes.generic;
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Resolve the celebration variant (null for all non-celebration themes)
  const variant = themeKey === 'celebration'
    ? getCelebrationVariant(celebrationEvent)
    : null;

  // Merge event colors into the theme when in celebration mode
  const theme: ThemeConfig = (themeKey === 'celebration' && variant)
    ? { ...baseTheme, colors: { ...baseTheme.colors, ...variant.colors } }
    : baseTheme;

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const { colors, typography, transitions } = theme;

    // ── Colors ────────────────────────────────────────────────
    el.style.setProperty('--color-background', colors.background);
    el.style.setProperty('--color-surface',    colors.surface);
    el.style.setProperty('--color-primary',    colors.primary);
    el.style.setProperty('--color-secondary',  colors.secondary);
    el.style.setProperty('--color-accent',     colors.accent);
    el.style.setProperty('--color-text',       colors.text);
    el.style.setProperty('--color-textLight',  colors.textLight ?? '#888');
    el.style.setProperty('--color-shadow',     colors.shadow);

    // ── Typography ────────────────────────────────────────────
    el.style.setProperty('--font-heading', typography.headingFont);
    el.style.setProperty('--font-body',    typography.bodyFont);
    el.style.setProperty('--font-letter',  typography.letterFont ?? typography.bodyFont);

    // ── Transitions ───────────────────────────────────────────
    el.style.setProperty('--transition-duration', `${transitions.duration * 1000}ms`);
    el.style.setProperty('--transition-easing',   transitions.easing);

    // ── Background ────────────────────────────────────────────
    // For celebration, the CelebrationBackground component handles
    // ambient pattern; we only set the base colour here.
    if (colors.background.startsWith('linear') || colors.background.startsWith('radial')) {
      el.style.background = colors.background;
    } else {
      el.style.backgroundColor = colors.background;
      el.style.background = '';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        themeKey,
        theme,
        celebrationEvent: celebrationEvent ?? null,
        celebrationVariant: variant,
      }}
    >
      <div
        ref={wrapperRef}
        className="kasi-theme-root"
        style={{
          minHeight: '100vh',
          color: theme.colors.text,
          fontFamily: theme.typography.bodyFont,
          position: 'relative',
        }}
      >
        {/*
          CelebrationBackground is rendered here — inside the theme
          wrapper but behind all tier content — so no tier component
          needs to import or know about it. The lazy import avoids
          adding bundle weight for the 5 non-celebration themes.
        */}
        {themeKey === 'celebration' && <CelebrationBackgroundLazy />}

        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Lazy-loaded so it only enters the bundle for the celebration theme.
// Using a simple dynamic wrapper avoids a next/dynamic import here
// (ThemeProvider is already a client component).
function CelebrationBackgroundLazy() {
  // We import lazily via React.lazy inside a Suspense. Since this is a
  // purely decorative layer, a null fallback is perfectly fine.
  const [Bg, setBg] = React.useState<React.ComponentType | null>(null);

  useEffect(() => {
    import('../shared/CelebrationBackground').then((mod) => {
      setBg(() => mod.CelebrationBackground);
    });
  }, []);

  if (!Bg) return null;
  return <Bg />;
}
