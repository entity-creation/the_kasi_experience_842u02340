'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { SceneTransition } from '../shared/SceneTransition';
import { Letter } from '../shared/Letter';
import { PhotoGallery } from '../shared/PhotoGallery';
import { AudioPlayer } from '../shared/AudioPlayer';
import { VideoPlayer } from '../shared/VideoPlayer';
import { GiftReveal } from '../shared/GiftReveal';
import { GroupMessages } from '../shared/GroupMessages';
import { ExperienceData } from '../types';

type Scene =
  | 'waxSeal'
  | 'intro'
  | 'memories'
  | 'gift'
  | 'physical'
  | 'futureUnlock'
  | 'ending';

export function TierLuxury({ data }: { data: ExperienceData }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scene, setScene] = useState<Scene>('waxSeal');
  const [unlocked, setUnlocked] = useState<number | null>(null);

  const futureUnlocks = data.futureUnlocks ?? [];

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <SceneTransition sceneKey={scene} className="scene w-full min-h-screen">

        {/* ── WAX SEAL INTRO ── */}
        {scene === 'waxSeal' && (
          <div className="scene text-center px-6">
            {/* Gold atmospheric glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${colors.accent}11 0%, transparent 70%)`,
              }}
            />

            <motion.div
              initial={{ scale: 0, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 180, damping: 18 }}
              className="mx-auto mb-10"
            >
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="58" fill={colors.accent} />
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <text x="60" y="68" textAnchor="middle" fontSize="32" fill={colors.surface} fontFamily={theme.typography.headingFont} fontWeight="300">
                  K
                </text>
              </svg>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.3em' }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="text-xs uppercase mb-12"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.accent }}
            >
              The Luxury Experience
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-lg font-light mb-10"
              style={{ fontFamily: theme.typography.headingFont, color: colors.text }}
            >
              For {data.recipientName}
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
              onClick={() => setScene('intro')}
              className="kasi-btn"
              whileHover={{ boxShadow: `0 0 24px ${colors.accent}44` }}
            >
              Enter →
            </motion.button>
          </div>
        )}

        {/* ── CINEMATIC INTRO ── */}
        {scene === 'intro' && (
          <div className="scene px-6 py-16">
            <div className="max-w-2xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs tracking-[0.4em] uppercase mb-8 text-center"
                style={{ color: colors.accent, fontFamily: theme.typography.bodyFont }}
              >
                {data.eventType}
              </motion.p>
              <Letter
                text={data.letter}
                recipientName={data.recipientName}
                senderName={data.senderName}
              />
              {data.soundtrack && (
                <div className="mt-8">
                  <AudioPlayer src={data.soundtrack} title="Your personal soundtrack" />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center mt-12"
              >
                <button onClick={() => setScene('memories')} className="kasi-btn">
                  Journey into memories →
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* ── EMOTIONAL MEMORY JOURNEY ── */}
        {scene === 'memories' && (
          <div className="w-full py-16">
            <div className="text-center px-6 mb-12">
              <p className="text-xs tracking-[0.4em] uppercase opacity-30 mb-2" style={{ fontFamily: theme.typography.bodyFont }}>
                Memory Vault
              </p>
              <h2
                className="text-3xl font-light"
                style={{ fontFamily: theme.typography.headingFont, color: colors.text }}
              >
                The moments that matter
              </h2>
            </div>

            {data.photos && <PhotoGallery photos={data.photos} />}

            {data.voiceNote && (
              <div className="mt-10 px-6">
                <AudioPlayer src={data.voiceNote} title="A message saved just for you" />
              </div>
            )}

            {data.video && (
              <div className="mt-10 px-6">
                <VideoPlayer src={data.video} />
              </div>
            )}

            {data.messagesFromGroup && data.messagesFromGroup.length > 0 && (
              <div className="mt-12">
                <p className="text-center text-xs tracking-[0.3em] uppercase opacity-30 mb-8 px-6" style={{ fontFamily: theme.typography.bodyFont }}>
                  From those who love you
                </p>
                <GroupMessages messages={data.messagesFromGroup} />
              </div>
            )}

            <div className="flex justify-center mt-14 px-6">
              <button onClick={() => setScene('gift')} className="kasi-btn">
                Your gift awaits →
              </button>
            </div>
          </div>
        )}

        {/* ── GIFT COUNTDOWN REVEAL ── */}
        {scene === 'gift' && (
          <div className="scene px-6 py-16">
            <div className="max-w-md mx-auto text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs tracking-[0.4em] uppercase mb-4 opacity-30"
                style={{ fontFamily: theme.typography.bodyFont }}
              >
                Gift Reveal
              </motion.p>
              <GiftReveal
                items={data.rewardItems ?? ['A curated evening, just for you']}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <button onClick={() => setScene('physical')} className="kasi-btn">
                  Continue →
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* ── PHYSICAL GIFT SYNC ── */}
        {scene === 'physical' && (
          <div className="scene px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-sm mx-auto"
            >
              {/* Physical gift UI placeholder */}
              <div
                className="rounded-2xl p-10 mb-8"
                style={{
                  border: `1px solid ${colors.accent}44`,
                  background: colors.surface,
                }}
              >
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  📦
                </motion.div>
                <p className="text-lg mb-2" style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}>
                  Your delivery has arrived.
                </p>
                <p className="text-sm opacity-50" style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}>
                  A physical piece of this experience<br />has been prepared for you.
                </p>
              </div>
              <button onClick={() => setScene(futureUnlocks.length > 0 ? 'futureUnlock' : 'ending')} className="kasi-btn">
                {futureUnlocks.length > 0 ? 'See future surprises →' : 'Close this chapter →'}
              </button>
            </motion.div>
          </div>
        )}

        {/* ── FUTURE UNLOCKS ── */}
        {scene === 'futureUnlock' && futureUnlocks.length > 0 && (
          <div className="scene px-6 py-16">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.4em] uppercase opacity-30 mb-2" style={{ fontFamily: theme.typography.bodyFont }}>
                  The journey continues
                </p>
                <h2 className="text-2xl font-light" style={{ fontFamily: theme.typography.headingFont, color: colors.text }}>
                  Future Surprises
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {futureUnlocks.map((unlock, i) => {
                  const isOpen = unlocked === i;
                  const isPast = new Date(unlock.date) <= new Date();
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div
                        className="rounded-2xl p-5 cursor-pointer transition-all"
                        style={{
                          background: colors.surface,
                          border: `1px solid ${isOpen ? colors.accent : colors.accent + '22'}`,
                        }}
                        onClick={() => isPast && setUnlocked(isOpen ? null : i)}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs uppercase tracking-widest" style={{ color: colors.accent, fontFamily: theme.typography.bodyFont }}>
                            {new Date(unlock.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                          <span className="text-xs opacity-40">
                            {isPast ? (isOpen ? '▲' : '▼') : '🔒'}
                          </span>
                        </div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="mt-3 text-sm leading-relaxed"
                              style={{ fontFamily: theme.typography.letterFont, color: colors.text }}
                            >
                              {unlock.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        {!isPast && (
                          <p className="mt-2 text-xs opacity-30" style={{ fontFamily: theme.typography.bodyFont }}>
                            Opens {new Date(unlock.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-center mt-12">
                <button onClick={() => setScene('ending')} className="kasi-btn">
                  Close this chapter →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ENDING ── */}
        {scene === 'ending' && (
          <div className="scene text-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5 }}
            >
              <p
                className="text-4xl md:text-5xl font-thin leading-relaxed"
                style={{ fontFamily: theme.typography.headingFont, color: colors.text, letterSpacing: '0.02em' }}
              >
                Part of the Luxury<br />
                <span style={{ color: colors.accent }}>Experience Collection.</span>
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.8, duration: 1.2 }}
                className="mx-auto mt-10 h-px"
                style={{ width: 80, background: colors.accent }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="mt-6 text-xs tracking-[0.4em] uppercase opacity-20"
                style={{ fontFamily: theme.typography.bodyFont }}
              >
                The Kasi Experience · Luxury
              </motion.p>
            </motion.div>
          </div>
        )}
      </SceneTransition>
    </div>
  );
}
