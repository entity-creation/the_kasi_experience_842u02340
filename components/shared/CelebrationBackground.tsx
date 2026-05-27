'use client';

import { motion } from 'framer-motion';
import { useCelebrationVariant } from '../themes/ThemeProvider';
import { useTheme } from '../themes/ThemeProvider';

/**
 * CelebrationBackground
 *
 * Renders a full-screen ambient background pattern matching the active
 * celebration event. Layered behind all content via absolute positioning.
 * Each pattern is pure SVG/CSS — no external assets required.
 *
 * To add a new pattern:
 *   1. Add a case in the switch below returning JSX
 *   2. Map your new CelebrationEvent to the pattern key in celebrationVariants.ts
 */
export function CelebrationBackground() {
  const variant = useCelebrationVariant();
  const { theme } = useTheme();
  if (!variant) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {renderPattern(variant.backgroundPattern, variant.colors.accent, theme.colors.text)}
    </div>
  );
}

function renderPattern(
  pattern: string,
  accentColor: string,
  textColor: string,
) {
  switch (pattern) {

    // ── Crescent moon + stars (Eid) ──────────────────────────
    case 'crescentStars':
      return (
        <>
          {/* Large crescent */}
          <motion.svg
            className="absolute"
            style={{ top: '5%', right: '8%', width: 160, height: 160, opacity: 0.15 }}
            animate={{ rotate: [0, 4, 0], y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            viewBox="0 0 100 100"
          >
            <path
              d="M 60 10 A 40 40 0 1 0 60 90 A 28 28 0 1 1 60 10 Z"
              fill={accentColor}
            />
          </motion.svg>

          {/* Scattered stars */}
          {STAR_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: pos.x, top: pos.y, opacity: 0 }}
              animate={{ opacity: [0, pos.brightness, 0] }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
            >
              <StarSVG size={pos.size} color={accentColor} />
            </motion.div>
          ))}

          {/* Floating lanterns */}
          {LANTERN_POSITIONS.map((pos, i) => (
            <motion.div
              key={`lantern-${i}`}
              className="absolute"
              style={{ left: pos.x, top: pos.y }}
              animate={{ y: [0, -12, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            >
              <LanternSVG color={accentColor} opacity={0.12} />
            </motion.div>
          ))}
        </>
      );

    // ── Snowflakes (Christmas + Russian New Year) ─────────────
    case 'snowflakes':
      return (
        <>
          {SNOWFLAKE_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: pos.x, top: -20 }}
              animate={{ y: ['0vh', '105vh'], rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)], opacity: [0, 0.5, 0] }}
              transition={{
                duration: 8 + i * 1.2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'linear',
              }}
            >
              <SnowflakeSVG size={pos.size} color={accentColor} />
            </motion.div>
          ))}
        </>
      );

    // ── Fireworks (Nigerian Independence) ─────────────────────
    case 'fireworks':
      return (
        <>
          {FIREWORK_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: pos.x, top: pos.y }}
              animate={{ scale: [0, 1.4, 0], opacity: [0, 0.4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
            >
              <FireworkSVG color={pos.color} size={pos.size} />
            </motion.div>
          ))}
        </>
      );

    // ── Masquerade fans/feathers (Eyo Festival) ───────────────
    case 'masquerade':
      return (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${10 + i * 16}%`,
                bottom: 0,
                opacity: 0.06,
              }}
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            >
              <FeatherSVG color={accentColor} height={180 + i * 20} />
            </motion.div>
          ))}
        </>
      );

    // ── Harvest (New Yam Festival) ────────────────────────────
    case 'harvest':
      return (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${5 + i * 12}%`,
                bottom: `${5 + (i % 3) * 8}%`,
                opacity: 0.08,
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            >
              <LeafSVG color={accentColor} size={30 + (i % 3) * 12} />
            </motion.div>
          ))}
          {/* Warm glow orbs */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`glow-${i}`}
              className="absolute rounded-full"
              style={{
                width: 200 + i * 60,
                height: 200 + i * 60,
                left: `${i * 25}%`,
                top: `${20 + i * 15}%`,
                background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            />
          ))}
        </>
      );

    // ── Blini sun circles (Maslenitsa) ────────────────────────
    case 'blini':
      return (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 80 + i * 30,
                height: 80 + i * 30,
                left: `${5 + i * 16}%`,
                top: `${10 + (i % 3) * 25}%`,
                border: `2px solid ${accentColor}`,
                opacity: 0.08,
              }}
              animate={{ scale: [1, 1.06, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            />
          ))}
        </>
      );

    // ── Generic festive sparkles (fallback) ───────────────────
    case 'festive':
    default:
      return (
        <>
          {STAR_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: pos.x, top: pos.y, opacity: 0 }}
              animate={{ opacity: [0, pos.brightness * 0.6, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
            >
              <StarSVG size={pos.size * 0.7} color={accentColor} />
            </motion.div>
          ))}
        </>
      );
  }
}

// =============================================================
// SVG ATOMS
// =============================================================

function StarSVG({ size = 12, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill={color}
      />
    </svg>
  );
}

function LanternSVG({ color, opacity = 0.3 }: { color: string; opacity?: number }) {
  return (
    <svg width="32" height="48" viewBox="0 0 32 48" style={{ opacity }}>
      <line x1="16" y1="0" x2="16" y2="6" stroke={color} strokeWidth="1.5" />
      <ellipse cx="16" cy="8" rx="10" ry="3" fill={color} />
      <rect x="6" y="8" width="20" height="28" rx="2" fill={color} fillOpacity="0.7" />
      <line x1="6" y1="16" x2="26" y2="16" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <line x1="6" y1="24" x2="26" y2="24" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <ellipse cx="16" cy="36" rx="10" ry="3" fill={color} />
      <line x1="16" y1="39" x2="16" y2="48" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function SnowflakeSVG({ size = 16, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity: 0.7 }}>
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1.5" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5" />
      <line x1="5" y1="5" x2="19" y2="19" stroke={color} strokeWidth="1.5" />
      <line x1="19" y1="5" x2="5" y2="19" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </svg>
  );
}

function FireworkSVG({ color, size = 40 }: { color: string; size?: number }) {
  const rays = 8;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {Array.from({ length: rays }).map((_, i) => {
        const angle = (i / rays) * 360;
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + 45 * Math.cos(rad);
        const y2 = 50 + 45 * Math.sin(rad);
        return <line key={i} x1="50" y1="50" x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round" />;
      })}
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
  );
}

function FeatherSVG({ color, height = 160 }: { color: string; height?: number }) {
  return (
    <svg width={height * 0.3} height={height} viewBox="0 0 60 200">
      <path d="M 30 200 C 10 150, 0 100, 20 50 C 25 30, 35 10, 30 0 C 25 10, 15 30, 10 60 C 5 90, 5 140, 30 200 Z"
        fill={color} />
      <path d="M 30 200 C 50 150, 60 100, 40 50 C 35 30, 25 10, 30 0 C 35 10, 45 30, 50 60 C 55 90, 55 140, 30 200 Z"
        fill={color} fillOpacity="0.7" />
      <line x1="30" y1="0" x2="30" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
    </svg>
  );
}

function LeafSVG({ color, size = 30 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56">
      <path d="M 20 55 C 5 40, 0 20, 20 2 C 40 20, 35 40, 20 55 Z" fill={color} fillOpacity="0.6" />
      <line x1="20" y1="55" x2="20" y2="5" stroke={color} strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

// =============================================================
// POSITION DATA (deterministic pseudo-random — no re-renders)
// =============================================================

const STAR_POSITIONS = [
  { x: '8%',  y: '12%', size: 10, brightness: 0.7 },
  { x: '20%', y: '5%',  size: 6,  brightness: 0.5 },
  { x: '35%', y: '18%', size: 8,  brightness: 0.6 },
  { x: '55%', y: '8%',  size: 12, brightness: 0.8 },
  { x: '70%', y: '15%', size: 7,  brightness: 0.5 },
  { x: '85%', y: '6%',  size: 10, brightness: 0.7 },
  { x: '92%', y: '22%', size: 6,  brightness: 0.4 },
  { x: '15%', y: '30%', size: 5,  brightness: 0.3 },
  { x: '78%', y: '35%', size: 8,  brightness: 0.5 },
  { x: '45%', y: '40%', size: 6,  brightness: 0.4 },
  { x: '60%', y: '55%', size: 5,  brightness: 0.3 },
  { x: '25%', y: '65%', size: 7,  brightness: 0.4 },
];

const LANTERN_POSITIONS = [
  { x: '5%',  y: '15%' },
  { x: '82%', y: '10%' },
  { x: '48%', y: '8%'  },
  { x: '22%', y: '20%' },
  { x: '68%', y: '18%' },
];

const SNOWFLAKE_POSITIONS = [
  { x: '5%',  size: 12 },
  { x: '14%', size: 8  },
  { x: '26%', size: 16 },
  { x: '38%', size: 10 },
  { x: '50%', size: 14 },
  { x: '62%', size: 8  },
  { x: '74%', size: 12 },
  { x: '85%', size: 10 },
  { x: '93%', size: 16 },
  { x: '32%', size: 6  },
  { x: '58%', size: 18 },
  { x: '78%', size: 8  },
];

const FIREWORK_POSITIONS = [
  { x: '10%', y: '15%', color: '#FFD700', size: 50 },
  { x: '30%', y: '8%',  color: '#FFFFFF', size: 35 },
  { x: '55%', y: '20%', color: '#00CC00', size: 45 },
  { x: '75%', y: '10%', color: '#FFD700', size: 40 },
  { x: '88%', y: '25%', color: '#FFFFFF', size: 30 },
  { x: '45%', y: '5%',  color: '#00CC00', size: 55 },
];
