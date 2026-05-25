'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { themes, ThemeConfig } from './themeConfigs';

// =============================================================
// CONTEXT
// =============================================================

interface ThemeContextValue {
  themeKey: string;
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeKey: 'generic',
  theme: themes.generic,
});

export function useTheme() {
  return useContext(ThemeContext);
}

// =============================================================
// THEME PROVIDER
// =============================================================

interface ThemeProviderProps {
  themeKey: string;
  children: React.ReactNode;
}

/**
 * ThemeProvider
 *
 * Reads the theme config for `themeKey`, writes all values as
 * CSS custom properties onto the wrapper <div>, and exposes
 * the full config object through React context.
 *
 * Tier components and shared components use `useTheme()` to
 * access animation presets, component styles, etc.
 */
export function ThemeProvider({ themeKey, children }: ThemeProviderProps) {
  const theme = themes[themeKey] ?? themes.generic;
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Write CSS variables onto the wrapper element.
  // This scopes theme variables without touching <html>, which
  // allows multiple experiences on the same page (preview).
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const { colors, typography, transitions } = theme;

    // Colors
    el.style.setProperty('--color-background',  colors.background);
    el.style.setProperty('--color-surface',      colors.surface);
    el.style.setProperty('--color-primary',      colors.primary);
    el.style.setProperty('--color-secondary',    colors.secondary);
    el.style.setProperty('--color-accent',       colors.accent);
    el.style.setProperty('--color-text',         colors.text);
    el.style.setProperty('--color-textLight',    colors.textLight ?? '#888');
    el.style.setProperty('--color-shadow',       colors.shadow);

    // Typography
    el.style.setProperty('--font-heading', typography.headingFont);
    el.style.setProperty('--font-body',    typography.bodyFont);
    el.style.setProperty('--font-letter',  typography.letterFont ?? typography.bodyFont);

    // Transitions
    el.style.setProperty('--transition-duration', `${transitions.duration * 1000}ms`);
    el.style.setProperty('--transition-easing',   transitions.easing);

    // Background (may be a gradient string)
    if (colors.background.startsWith('linear') || colors.background.startsWith('radial')) {
      el.style.background = colors.background;
    } else {
      el.style.backgroundColor = colors.background;
      el.style.background = '';
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ themeKey, theme }}>
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
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
