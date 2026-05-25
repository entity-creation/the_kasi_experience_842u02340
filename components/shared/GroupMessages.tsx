'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { GroupMessage } from '../types';

interface GroupMessagesProps {
  messages: GroupMessage[];
}

export function GroupMessages({ messages }: GroupMessagesProps) {
  const { theme } = useTheme();
  const { components: { groupMessages: gmConfig }, colors } = theme;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // ── HEART BALLOONS (romantic) ──
  if (gmConfig.presentation === 'heartBalloons') {
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
  if (gmConfig.presentation === 'filmStrips') {
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
  if (gmConfig.presentation === 'bouncingBubbles') {
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
