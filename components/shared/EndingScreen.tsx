'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, useCelebrationVariant } from '../themes/ThemeProvider';

interface EndingScreenProps {
  customMessage?: string;
  tierLabel?: string;
}

/**
 * EndingScreen
 *
 * Renders the closing scene for any tier. For the celebration theme,
 * it pulls the event-specific endingMessage and endingAnimation from
 * useCelebrationVariant(). For all other themes, it falls back to
 * theme.endingScreen.message.
 */
export function EndingScreen({ customMessage, tierLabel }: EndingScreenProps) {
  const { theme, themeKey } = useTheme();
  const variant = useCelebrationVariant();
  const [particlesVisible, setParticlesVisible] = useState(false);

  const message =
    customMessage ??
    (variant ? variant.endingMessage : theme.endingScreen.message);

  const animationType = variant
    ? variant.endingAnimation
    : theme.endingScreen.animation;

  const { colors } = theme;

  useEffect(() => {
    const t = setTimeout(() => setParticlesVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="scene text-center px-6 relative overflow-hidden">
      {/* Event-specific particle layer */}
      {particlesVisible && <EndingParticles type={animationType} color={colors.accent} />}

      {/* Main message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        style={{
          fontFamily: theme.typography.headingFont,
          color: colors.text,
          fontSize: 'clamp(1.6rem, 4vw, 3.5rem)',
          fontWeight: 300,
          lineHeight: 1.4,
          maxWidth: '720px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {message}
      </motion.p>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.2 }}
        className="mx-auto mt-10 h-px"
        style={{ width: 60, background: colors.accent, position: 'relative', zIndex: 1 }}
      />

      {/* Tier label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-6 text-xs tracking-[0.4em] uppercase"
        style={{
          fontFamily: theme.typography.bodyFont,
          color: colors.textLight ?? colors.accent,
          opacity: 0.3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {tierLabel ? `The Kasi Experience · ${tierLabel}` : 'The Kasi Experience'}
      </motion.p>

      {/* Celebration event label badge */}
      {variant && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="mt-3 text-xs tracking-widest uppercase"
          style={{
            fontFamily: theme.typography.bodyFont,
            color: colors.accent,
            opacity: 0.5,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {variant.eventLabel}
        </motion.p>
      )}
    </div>
  );
}

// =============================================================
// ENDING PARTICLE SYSTEMS
// =============================================================

function EndingParticles({ type, color }: { type: string; color: string }) {
  const count = type === 'starfall' ? 30 : type === 'snowfall' ? 24 : 20;

  switch (type) {

    case 'starfall':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: -10,
                opacity: 0,
              }}
              animate={{
                y: ['0vh', '105vh'],
                opacity: [0, 0.9, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              <svg width={6 + Math.random() * 8} height={6 + Math.random() * 8} viewBox="0 0 24 24">
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill={color}
                />
              </svg>
            </motion.div>
          ))}
        </div>
      );

    case 'snowfall':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 4 + Math.random() * 6,
                height: 4 + Math.random() * 6,
                left: `${Math.random() * 100}%`,
                top: -10,
                background: color,
                opacity: 0,
              }}
              animate={{
                y: ['0vh', '105vh'],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      );

    case 'fireworks':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {['#FFD700', '#FFFFFF', '#00CC00', '#FF6600'].map((c, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 22}%`,
                top: `${10 + (i % 2) * 15}%`,
              }}
              animate={{ scale: [0, 1.8, 0], opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
            >
              <FireworkBurst color={c} />
            </motion.div>
          ))}
        </div>
      );

    case 'petals':
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 8 + Math.random() * 8,
                height: 12 + Math.random() * 8,
                left: `${Math.random() * 100}%`,
                top: -20,
                background: color,
                borderRadius: '50% 50% 50% 0',
                opacity: 0,
              }}
              animate={{
                y: ['0vh', '105vh'],
                rotate: [0, Math.random() > 0.5 ? 360 : -360],
                opacity: [0, 0.5, 0],
                x: [0, Math.random() * 60 - 30],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      );

    case 'confetti':
      const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', color];
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: 8,
                height: 8,
                left: `${Math.random() * 100}%`,
                top: -10,
                background: confettiColors[i % confettiColors.length],
                borderRadius: Math.random() > 0.5 ? '50%' : 2,
                opacity: 0,
              }}
              animate={{
                y: ['0vh', '105vh'],
                rotate: [0, Math.random() * 720],
                opacity: [0, 0.8, 0],
                x: [0, Math.random() * 80 - 40],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      );

    default:
      return null;
  }
}

function FireworkBurst({ color }: { color: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 100 100">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1="50" y1="50"
            x2={50 + 45 * Math.cos(rad)}
            y2={50 + 45 * Math.sin(rad)}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="50" cy="50" r="6" fill={color} />
    </svg>
  );
}
