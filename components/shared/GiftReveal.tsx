'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';

interface GiftRevealProps {
  items: string[];
  countdownDate?: Date;
}

// ─── Particle burst ───────────────────────────────────────────
function ParticleBurst({ type, colors }: { type: string; colors: { accent: string; primary: string } }) {
  const particles = Array.from({ length: 24 });

  const colorMap: Record<string, string[]> = {
    petals: ['#FFB7C5', '#FFD1DC', '#FF69B4', '#FFC0CB'],
    confetti: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#2AB7CA'],
    goldDust: ['#C8A24A', '#F5E6B8', '#D4AF37', '#FFD700'],
    lightBeams: ['#4DA3FF', '#E0E7FF', '#7EB8FF', '#FFFFFF'],
  };

  const palette = colorMap[type] ?? colorMap.confetti;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * 360;
        const color = palette[i % palette.length];
        const distance = 80 + Math.random() * 120;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '50%', top: '40%',
              width: type === 'goldDust' ? 4 : 8,
              height: type === 'goldDust' ? 4 : 8,
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

export function GiftReveal({ items, countdownDate }: GiftRevealProps) {
  const { theme } = useTheme();
  const { components: { giftReveal: giftConfig }, colors } = theme;
  const [revealed, setRevealed] = useState(false);
  const [burst, setBurst] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

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
    setTimeout(() => setBurst(false), 1500);
  };

  // Countdown still running
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

  // ── HOLOGRAM (cinematic) ──
  if (giftConfig.animation === 'hologram') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type={giftConfig.particleEffect} colors={colors} />}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="hologram-closed"
              className="cursor-pointer text-center"
              onClick={open}
              whileHover={{ scale: 1.04 }}
            >
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
              <p className="text-sm tracking-widest uppercase" style={{ color: colors.accent }}>
                Tap to Reveal
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="hologram-open"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <p className="text-xl mb-6" style={{ color: colors.accent, fontFamily: theme.typography.headingFont }}>
                Your Rewards
              </p>
              <div className="flex flex-col gap-3">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl"
                    style={{ background: colors.surface, border: `1px solid ${colors.accent}44` }}
                  >
                    <span style={{ color: colors.accent }}>◈</span>
                    <span style={{ color: colors.text, fontFamily: theme.typography.bodyFont }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── JEWELRY BOX (luxury) ──
  if (giftConfig.animation === 'jewelryBox') {
    return (
      <div className="relative flex flex-col items-center py-12">
        {burst && <ParticleBurst type="goldDust" colors={colors} />}
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="box-closed" className="cursor-pointer" onClick={open} whileHover={{ y: -4 }}>
              <div
                className="mx-auto text-center"
                style={{ width: 120 }}
              >
                <div
                  style={{
                    height: 20,
                    background: `linear-gradient(to right, ${colors.accent}, ${colors.primary}, ${colors.accent})`,
                    borderRadius: '4px 4px 0 0',
                  }}
                />
                <div
                  style={{
                    height: 80,
                    background: colors.surface,
                    border: `1px solid ${colors.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                  }}
                >
                  ✦
                </div>
              </div>
              <p className="mt-4 text-sm tracking-widest text-center" style={{ color: colors.accent }}>
                Open Your Gift
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="box-open"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center w-full max-w-sm"
            >
              <p className="text-lg mb-6 tracking-wider" style={{ color: colors.accent, fontFamily: theme.typography.headingFont }}>
                A Gift, Carefully Chosen
              </p>
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.3 }}
                  className="px-6 py-4 mb-3 text-sm tracking-wide"
                  style={{
                    border: `1px solid ${colors.accent}`,
                    color: colors.accent,
                    fontFamily: theme.typography.letterFont,
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── BOX OPEN / CONFETTI (default) ──
  return (
    <div className="relative flex flex-col items-center py-12">
      {burst && <ParticleBurst type={giftConfig.particleEffect} colors={colors} />}
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="gift-closed"
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.96 }}
            className="cursor-pointer text-center"
            onClick={open}
          >
            <div
              className="text-6xl mb-4"
              style={{ filter: `drop-shadow(0 4px 12px ${colors.accent}66)` }}
            >
              🎁
            </div>
            <p className="text-sm opacity-60 tracking-widest uppercase">Tap to unwrap</p>
          </motion.div>
        ) : (
          <motion.div
            key="gift-open"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full max-w-sm"
          >
            <p className="text-xl mb-6" style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}>
              🎉 You've unlocked:
            </p>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl text-sm"
                  style={{ background: colors.surface, border: `1.5px solid ${colors.accent}55` }}
                >
                  <span style={{ color: colors.accent }}>★</span>
                  <span style={{ color: colors.text }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
