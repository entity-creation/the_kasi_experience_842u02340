'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useCelebrationVariant } from '../themes/ThemeProvider';

interface GiftRevealProps {
  items: string[];
  countdownDate?: Date;
}

// =============================================================
// PARTICLE BURST
// Supports all original types + celebration-specific ones.
// =============================================================
function ParticleBurst({ type, accentColor }: { type: string; accentColor: string }) {
  const colorMap: Record<string, string[]> = {
    petals:      ['#FFB7C5', '#FFD1DC', '#FF69B4', '#FFC0CB'],
    confetti:    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'],
    goldDust:    ['#C8A24A', '#F5E6B8', '#D4AF37', '#FFD700'],
    lightBeams:  ['#4DA3FF', '#E0E7FF', '#7EB8FF', '#FFFFFF'],
    // celebration-specific
    sparkles:    [accentColor, '#FFFFFF', accentColor, '#FFF8E7'],
    snowflakes:  ['#FFFFFF', '#E0F4FF', '#B0D8F0', '#FFFFFF'],
    fireworks:   ['#FFD700', '#FF4500', '#00CC00', '#FFFFFF', '#FF6B35'],
  };
  const palette = colorMap[type] ?? colorMap.confetti;
  const count = 28;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * 360;
        const distance = 80 + Math.random() * 120;
        const color = palette[i % palette.length];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%', top: '40%',
              width: type === 'goldDust' || type === 'sparkles' ? 4 : 8,
              height: type === 'goldDust' || type === 'sparkles' ? 4 : 8,
              borderRadius: type === 'confetti' ? 2 : '50%',
              background: color,
              transformOrigin: '0 0',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((angle * Math.PI) / 180) * distance,
              y: Math.sin((angle * Math.PI) / 180) * distance - 40,
              opacity: 0,
              scale: 0,
              rotate: angle * 3,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        );
      })}
    </div>
  );
}

// =============================================================
// GIFT BAG (Eid / celebration events)
// =============================================================
function GiftBagClosed({ color, onClick }: { color: string; onClick: () => void }) {
  return (
    <motion.div className="cursor-pointer text-center" onClick={onClick} whileHover={{ y: -6 }}>
      <svg width="120" height="140" viewBox="0 0 120 140" className="mx-auto mb-4">
        {/* Bag body */}
        <rect x="10" y="40" width="100" height="90" rx="8" fill={color} fillOpacity="0.85" />
        {/* Bag top fold */}
        <rect x="10" y="32" width="100" height="16" rx="4" fill={color} />
        {/* Handle */}
        <path d="M 38 32 C 38 12, 82 12, 82 32" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
        {/* Star emblem */}
        <polygon points="60,58 63.5,68 74,68 65.5,74 69,84 60,78 51,84 54.5,74 46,68 56.5,68"
          fill="rgba(255,255,255,0.7)" />
        {/* Ribbon */}
        <line x1="60" y1="40" x2="60" y2="130" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        <line x1="10" y1="85" x2="110" y2="85" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      </svg>
      <p className="text-sm tracking-widest uppercase opacity-50">Tap to open</p>
    </motion.div>
  );
}

// =============================================================
// LANTERN OPEN (Eyo / New Yam festivals)
// =============================================================
function LanternClosed({ color, onClick }: { color: string; onClick: () => void }) {
  return (
    <motion.div
      className="cursor-pointer text-center"
      onClick={onClick}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.06 }}
    >
      <svg width="80" height="120" viewBox="0 0 80 120" className="mx-auto mb-4">
        <line x1="40" y1="0" x2="40" y2="12" stroke={color} strokeWidth="2" />
        <ellipse cx="40" cy="14" rx="18" ry="5" fill={color} />
        <rect x="22" y="14" width="36" height="70" rx="4" fill={color} fillOpacity="0.8" />
        <ellipse cx="40" cy="84" rx="18" ry="5" fill={color} />
        <line x1="40" y1="89" x2="40" y2="104" stroke={color} strokeWidth="2" />
        {/* Glow */}
        <ellipse cx="40" cy="49" rx="12" ry="18" fill="rgba(255,230,100,0.3)" />
        <text x="40" y="55" textAnchor="middle" fontSize="20" fill="rgba(255,255,255,0.7)">✦</text>
      </svg>
      <p className="text-sm tracking-widest uppercase opacity-50">Open your gift</p>
    </motion.div>
  );
}

// =============================================================
// FIREWORKS BURST (Nigerian Independence)
// =============================================================
function FireworksClosed({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="cursor-pointer text-center" onClick={onClick} whileHover={{ scale: 1.06 }}>
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-7xl mx-auto mb-4"
      >
        🎆
      </motion.div>
      <p className="text-sm tracking-widest uppercase opacity-50">Tap to reveal</p>
    </motion.div>
  );
}

// =============================================================
// GIFT REVEAL COMPONENT
// =============================================================
export function GiftReveal({ items, countdownDate }: GiftRevealProps) {
  const { theme } = useTheme();
  const variant = useCelebrationVariant(); // null for non-celebration themes
  const { components: { giftReveal: giftConfig }, colors } = theme;

  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // For celebration theme, override animation + particle from variant
  const animationType = variant ? variant.giftAnimation : giftConfig.animation;
  const particleType  = variant ? variant.particleEffect : giftConfig.particleEffect;

  // Countdown timer
  useEffect(() => {
    if (!countdownDate) return;
    const tick = () => {
      const diff = countdownDate.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(''); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [countdownDate]);

  const open = () => {
    setRevealed(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 1600);
  };

  // Revealed items list (shared across all animation types)
  const RevealedItems = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center w-full max-w-sm"
    >
      <p className="text-lg mb-6" style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}>
        {variant ? variant.eventLabel : '🎉 You\'ve unlocked:'}
      </p>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.18 }}
            className="flex items-center gap-3 px-5 py-3 rounded-xl text-sm"
            style={{ background: colors.surface, border: `1.5px solid ${colors.accent}55` }}
          >
            <span style={{ color: colors.accent }}>★</span>
            <span style={{ color: colors.text }}>{item}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Countdown still active
  if (countdownDate && timeLeft) {
    return (
      <div className="text-center py-12">
        <p className="text-sm tracking-widest uppercase mb-4 opacity-60">Your surprise arrives in</p>
        <motion.p
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-6xl font-thin tracking-widest"
          style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}
        >
          {timeLeft}
        </motion.p>
      </div>
    );
  }

  // ── GIFT BAG (Eid) ──────────────────────────────────────────
  if (animationType === 'giftBag') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type={particleType} accentColor={colors.accent} />}
        <AnimatePresence mode="wait">
          {!revealed
            ? <GiftBagClosed key="closed" color={colors.accent} onClick={open} />
            : <RevealedItems key="open" />}
        </AnimatePresence>
      </div>
    );
  }

  // ── LANTERN OPEN (Eyo / Harvest) ────────────────────────────
  if (animationType === 'lanternOpen') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type={particleType} accentColor={colors.accent} />}
        <AnimatePresence mode="wait">
          {!revealed
            ? <LanternClosed key="closed" color={colors.accent} onClick={open} />
            : <RevealedItems key="open" />}
        </AnimatePresence>
      </div>
    );
  }

  // ── FIREWORKS BURST (Nigerian Independence) ─────────────────
  if (animationType === 'fireworksBurst') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type="fireworks" accentColor={colors.accent} />}
        <AnimatePresence mode="wait">
          {!revealed
            ? <FireworksClosed key="closed" onClick={open} />
            : <RevealedItems key="open" />}
        </AnimatePresence>
      </div>
    );
  }

  // ── HOLOGRAM (cinematic) ────────────────────────────────────
  if (animationType === 'hologram') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type={particleType} accentColor={colors.accent} />}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="hologram-closed" className="cursor-pointer text-center" onClick={open} whileHover={{ scale: 1.04 }}>
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="mx-auto mb-6"
                style={{
                  width: 100, height: 100,
                  border: `2px solid ${colors.accent}`,
                  borderRadius: 4,
                  background: `radial-gradient(circle, ${colors.accent}22 0%, transparent 70%)`,
                  boxShadow: `0 0 40px ${colors.accent}44`,
                }}
              />
              <p className="text-sm tracking-widest uppercase" style={{ color: colors.accent }}>Tap to Reveal</p>
            </motion.div>
          ) : (
            <RevealedItems key="open" />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── JEWELRY BOX (luxury) ────────────────────────────────────
  if (animationType === 'jewelryBox') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type={particleType} accentColor={colors.accent} />}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="box-closed" className="cursor-pointer" onClick={open} whileHover={{ y: -4 }}>
              <div className="mx-auto text-center" style={{ width: 120 }}>
                <div style={{ height: 20, background: `linear-gradient(to right, ${colors.accent}, ${colors.primary}, ${colors.accent})`, borderRadius: '4px 4px 0 0' }} />
                <div style={{ height: 80, background: colors.surface, border: `1px solid ${colors.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>✦</div>
              </div>
              <p className="mt-4 text-sm tracking-widest text-center" style={{ color: colors.accent }}>Open Your Gift</p>
            </motion.div>
          ) : (
            <RevealedItems key="open" />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── BOX OPEN / DEFAULT ──────────────────────────────────────
  return (
    <div className="relative flex flex-col items-center py-12">
      {burst && <ParticleBurst type={particleType} accentColor={colors.accent} />}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="gift-closed"
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer text-center"
            onClick={open}
          >
            <div className="text-6xl mb-4" style={{ filter: `drop-shadow(0 4px 12px ${colors.accent}66)` }}>🎁</div>
            <p className="text-sm opacity-60 tracking-widest uppercase">Tap to unwrap</p>
          </motion.div>
        ) : (
          <RevealedItems key="open" />
        )}
      </AnimatePresence>
    </div>
  );
}
