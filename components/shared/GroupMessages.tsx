'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useCelebrationVariant } from '../themes/ThemeProvider';
import { GroupMessage } from '../types';

interface GroupMessagesProps {
  messages: GroupMessage[];
}

export function GroupMessages({ messages }: GroupMessagesProps) {
  const { theme } = useTheme();
  const { components: { groupMessages: gmConfig }, colors } = theme;
  const variant = useCelebrationVariant(); // null for non-celebration themes
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // For celebration theme, override presentation from variant
  const presentation = variant ? variant.messagesPresentation : gmConfig.presentation;

  // ── LANTERNS (Eid, Eyo Festival) ────────────────────────────
  if (presentation === 'lanterns') {
    return (
      <div className="flex flex-wrap gap-8 justify-center p-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25, duration: 0.8 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Lantern SVG */}
              <svg width="56" height="88" viewBox="0 0 56 88">
                <line x1="28" y1="0" x2="28" y2="10" stroke={colors.accent} strokeWidth="2" />
                <ellipse cx="28" cy="12" rx="14" ry="4" fill={colors.accent} />
                <rect x="14" y="12" width="28" height="56" rx="4" fill={colors.surface} stroke={colors.accent} strokeWidth="1.5" />
                {/* Glow */}
                <ellipse cx="28" cy="40" rx="10" ry="16" fill="rgba(255,230,100,0.2)" />
                <text x="28" y="45" textAnchor="middle" fontSize="16" fill={colors.accent}>☽</text>
                <ellipse cx="28" cy="68" rx="14" ry="4" fill={colors.accent} />
                <line x1="28" y1="72" x2="28" y2="88" stroke={colors.accent} strokeWidth="2" />
              </svg>
            </motion.div>

            <p className="mt-2 text-xs text-center opacity-60" style={{ fontFamily: theme.typography.bodyFont, color: colors.accent }}>
              {msg.name}
            </p>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="rounded-2xl p-4 shadow-xl mt-3 max-w-xs text-center"
                  style={{ background: colors.surface, border: `1.5px solid ${colors.accent}`, width: 200 }}
                >
                  <p className="font-semibold mb-1 text-sm" style={{ color: colors.accent, fontFamily: theme.typography.headingFont }}>{msg.name}</p>
                  <p className="text-sm" style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}>{msg.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── STOCKINGS (Christmas, Russian New Year) ──────────────────
  if (presentation === 'stockings') {
    const stockingColors = ['#C8372D', '#2E5C2E', '#C8372D', '#2E5C2E'];
    return (
      <div className="flex flex-wrap gap-6 justify-center p-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <motion.div whileHover={{ scale: 1.08, rotate: 3 }}>
              {/* Stocking SVG */}
              <svg width="60" height="90" viewBox="0 0 60 90">
                <rect x="18" y="0" width="24" height="40" rx="4" fill={stockingColors[i % stockingColors.length]} />
                <path d="M 18 38 Q 18 70, 10 76 Q 2 82, 8 88 Q 20 96, 40 86 Q 52 80, 48 70 Q 44 58, 36 50 Q 30 44, 30 38 Z" fill={stockingColors[i % stockingColors.length]} />
                {/* White cuff */}
                <rect x="14" y="0" width="32" height="14" rx="6" fill="white" fillOpacity="0.9" />
                <text x="30" y="10" textAnchor="middle" fontSize="9" fill={stockingColors[i % stockingColors.length]} fontWeight="bold" fontFamily="sans-serif">
                  {msg.name.slice(0, 5)}
                </text>
              </svg>
            </motion.div>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden rounded-xl p-4 mt-2 text-center"
                  style={{ background: colors.surface, border: `1px solid ${colors.accent}44`, width: 180 }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: colors.accent }}>{msg.name}</p>
                  <p className="text-xs" style={{ color: colors.text, fontFamily: theme.typography.bodyFont }}>{msg.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── ROCKETS (Nigerian Independence) ─────────────────────────
  if (presentation === 'rockets') {
    return (
      <div className="flex flex-wrap gap-6 justify-center p-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1 }}
            >
              {/* Rocket */}
              <svg width="40" height="80" viewBox="0 0 40 80">
                <ellipse cx="20" cy="18" rx="12" ry="18" fill="#006600" />
                <rect x="8" y="20" width="24" height="36" fill="#FFFFFF" />
                <text x="20" y="44" textAnchor="middle" fontSize="14">🇳🇬</text>
                <polygon points="8,56 0,72 8,68" fill="#C8372D" />
                <polygon points="32,56 40,72 32,68" fill="#C8372D" />
                <ellipse cx="20" cy="72" rx="10" ry="4" fill={colors.accent} fillOpacity="0.6" />
              </svg>
            </motion.div>
            <p className="mt-1 text-xs opacity-60" style={{ color: colors.accent }}>{msg.name}</p>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-2 rounded-xl p-4 text-center"
                  style={{ background: colors.surface, border: `1.5px solid ${colors.accent}`, width: 200 }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: colors.accent }}>{msg.name}</p>
                  <p className="text-xs" style={{ color: colors.text }}>{msg.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── POTS / CLAY VESSELS (New Yam Festival) ───────────────────
  if (presentation === 'pots') {
    return (
      <div className="flex flex-wrap gap-8 justify-center p-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="cursor-pointer flex flex-col items-center"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <motion.div whileHover={{ scale: 1.06, rotate: -2 }}>
              <svg width="64" height="72" viewBox="0 0 64 72">
                {/* Pot body */}
                <ellipse cx="32" cy="54" rx="28" ry="18" fill={colors.primary} />
                <path d="M 10 36 Q 4 54, 32 72 Q 60 54, 54 36 Z" fill={colors.primary} />
                <ellipse cx="32" cy="36" rx="22" ry="10" fill={colors.secondary} />
                {/* Rim */}
                <ellipse cx="32" cy="26" rx="26" ry="8" fill={colors.accent} fillOpacity="0.7" />
                <ellipse cx="32" cy="26" rx="20" ry="6" fill="none" stroke={colors.accent} strokeWidth="1" />
                {/* Pattern lines */}
                <path d="M 14 45 Q 32 38, 50 45" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeOpacity="0.5" />
              </svg>
            </motion.div>
            <p className="mt-1 text-xs opacity-60 text-center" style={{ color: colors.accent, fontFamily: theme.typography.bodyFont }}>{msg.name}</p>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="mt-2 rounded-xl p-4 text-center"
                  style={{ background: colors.surface, border: `1px solid ${colors.accent}44`, width: 190 }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: colors.accent }}>{msg.name}</p>
                  <p className="text-xs leading-relaxed" style={{ color: colors.text, fontFamily: theme.typography.letterFont }}>{msg.message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── HEART BALLOONS (romantic) ──
  if (presentation === 'heartBalloons') {
    return (
      <div className="relative min-h-96 overflow-hidden">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1, x: Math.sin(i * 1.5) * 20 }}
            transition={{ delay: i * 0.3, duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: `${10 + (i % 4) * 22}%`,
              bottom: 0,
            }}
          >
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              {/* Heart */}
              <svg width="60" height="56" viewBox="0 0 60 56">
                <path
                  d="M30 50 C10 35 0 25 0 14 C0 5 7 0 15 0 C21 0 27 4 30 8 C33 4 39 0 45 0 C53 0 60 5 60 14 C60 25 50 35 30 50Z"
                  fill={colors.primary}
                  stroke={colors.accent}
                  strokeWidth="1.5"
                />
                <text x="30" y="28" textAnchor="middle" fontSize="10" fill={colors.text} fontFamily={theme.typography.bodyFont}>
                  {msg.name.slice(0, 6)}
                </text>
              </svg>
              {/* String */}
              <svg width="2" height="40"><line x1="1" y1="0" x2="1" y2="40" stroke={colors.accent} strokeWidth="1.5" /></svg>
            </motion.div>
            {/* Message popup */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 rounded-2xl p-4 shadow-xl z-10"
                  style={{
                    background: colors.surface,
                    border: `1.5px solid ${colors.accent}`,
                    width: 200,
                    textAlign: 'center',
                  }}
                >
                  <p className="font-semibold mb-1" style={{ color: colors.accent, fontFamily: theme.typography.headingFont }}>
                    {msg.name}
                  </p>
                  <p className="text-sm" style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}>
                    {msg.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── FILM STRIPS (cinematic) ──
  if (presentation === 'filmStrips') {
    return (
      <div className="overflow-x-auto py-8">
        <motion.div
          className="flex gap-0"
          animate={messages.length > 3 ? { x: [0, -(messages.length * 160)] } : {}}
          transition={{ duration: messages.length * 4, repeat: Infinity, ease: 'linear' }}
        >
          {[...messages, ...messages].map((msg, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: 160 }}
            >
              {/* Film perforations */}
              <div className="flex flex-col" style={{ background: '#111', padding: '8px 0' }}>
                <div className="flex justify-between px-2 mb-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="bg-white/20 rounded-sm" style={{ width: 12, height: 8 }} />
                  ))}
                </div>
                {/* Content */}
                <div
                  className="mx-2 p-3 text-center"
                  style={{ background: colors.surface, minHeight: 120 }}
                >
                  <p className="text-xs font-bold mb-1" style={{ color: colors.accent }}>{msg.name}</p>
                  <p className="text-xs" style={{ color: colors.text, lineHeight: 1.5 }}>{msg.message}</p>
                </div>
                <div className="flex justify-between px-2 mt-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="bg-white/20 rounded-sm" style={{ width: 12, height: 8 }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  // ── BOUNCING BUBBLES (playful) ──
  if (presentation === 'bouncingBubbles') {
    return (
      <div className="flex flex-wrap gap-4 justify-center p-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.06, rotate: Math.random() * 4 - 2 }}
            className="rounded-3xl p-5 shadow-lg cursor-pointer max-w-xs"
            style={{
              background: [colors.primary, colors.secondary, colors.accent + '33'][i % 3],
              border: `2px solid ${colors.accent}`,
            }}
          >
            <p className="font-bold mb-1" style={{ fontFamily: theme.typography.headingFont, color: colors.text }}>
              {msg.name} 💬
            </p>
            <p className="text-sm" style={{ color: colors.text, fontFamily: theme.typography.bodyFont }}>
              {msg.message}
            </p>
          </motion.div>
        ))}
      </div>
    );
  }

  // ── GOLD ENVELOPES (generic + luxury) ──
  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="cursor-pointer"
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        >
          {/* Envelope */}
          <motion.div
            whileHover={{ y: -4 }}
            className="relative"
            style={{ width: 160 }}
          >
            <svg width="160" height="100" viewBox="0 0 160 100">
              {/* Body */}
              <rect x="0" y="0" width="160" height="100" rx="4" fill={colors.surface} stroke={colors.accent} strokeWidth="1.5" />
              {/* Flap */}
              <motion.path
                d={openIndex === i ? 'M 0 0 L 80 30 L 160 0' : 'M 0 0 L 80 50 L 160 0'}
                fill={colors.primary}
                stroke={colors.accent}
                strokeWidth="1.5"
                animate={{ d: openIndex === i ? 'M 0 0 L 80 30 L 160 0' : 'M 0 0 L 80 50 L 160 0' }}
                transition={{ duration: 0.4 }}
              />
              <text x="80" y="75" textAnchor="middle" fontSize="11" fill={colors.accent} fontFamily={theme.typography.bodyFont}>
                {msg.name}
              </text>
            </svg>
          </motion.div>

          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden rounded-b-xl p-4 shadow-lg"
                style={{ background: colors.surface, border: `1px solid ${colors.accent}44`, width: 160 }}
              >
                <p className="text-xs" style={{ color: colors.text, fontFamily: theme.typography.letterFont, lineHeight: 1.6 }}>
                  {msg.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
