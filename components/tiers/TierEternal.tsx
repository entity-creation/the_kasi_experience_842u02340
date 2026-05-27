'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { SceneTransition } from '../shared/SceneTransition';
import { Letter } from '../shared/Letter';
import { PhotoGallery } from '../shared/PhotoGallery';
import { AudioPlayer } from '../shared/AudioPlayer';
import { VideoPlayer } from '../shared/VideoPlayer';
import { Timeline } from '../shared/Timeline';
import { GroupMessages } from '../shared/GroupMessages';
import { EndingScreen } from '../shared/EndingScreen';
import { ExperienceData } from '../types';

type Scene =
  | 'intro'
  | 'timeline'
  | 'story'
  | 'futureReveal'
  | 'vault'
  | 'continuation';

export function TierEternal({ data }: { data: ExperienceData }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scene, setScene] = useState<Scene>('intro');
  const [unlockedFuture, setUnlockedFuture] = useState<number | null>(null);

  const futureUnlocks = data.futureUnlocks ?? [];
  const timelineEvents = data.timelineEvents ?? [];

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <SceneTransition sceneKey={scene} className="w-full min-h-screen">

        {/* ── INTRO ── */}
        {scene === 'intro' && (
          <div className="scene text-center px-6">
            {/* Subtle ambient particle background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 2 + Math.random() * 4,
                    height: 2 + Math.random() * 4,
                    background: colors.accent,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: 0.3,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.5, 0.1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 4,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="text-xs tracking-[0.5em] uppercase mb-8 opacity-30"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}
            >
              This story does not end today
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 2 }}
              className="kasi-heading mb-4"
              style={{ fontSize: theme.typography.headingSize }}
            >
              {data.recipientName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="opacity-30 mb-4 tracking-widest text-sm"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              {data.eventType}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.4, duration: 1.2 }}
              className="mx-auto mb-10 h-px"
              style={{ width: 60, background: colors.accent }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8 }}
              className="max-w-xs mx-auto text-sm opacity-50 leading-relaxed mb-12"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}
            >
              An experience designed to grow with you. Past, present, and the years still to come.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              onClick={() => setScene('timeline')}
              className="kasi-btn"
              whileHover={{ scale: 1.04 }}
            >
              Begin the journey →
            </motion.button>
          </div>
        )}

        {/* ── TIMELINE JOURNEY ── */}
        {scene === 'timeline' && (
          <div className="w-full py-16">
            <div className="text-center px-6 mb-6">
              <p
                className="text-xs tracking-[0.4em] uppercase opacity-30 mb-2"
                style={{ fontFamily: theme.typography.bodyFont }}
              >
                Your journey through time
              </p>
              <h2
                className="text-3xl font-light"
                style={{ fontFamily: theme.typography.headingFont, color: colors.text }}
              >
                The Timeline
              </h2>
            </div>

            {timelineEvents.length > 0 ? (
              <Timeline events={timelineEvents} />
            ) : (
              <div className="text-center px-6 py-12 opacity-40">
                <p className="text-sm" style={{ fontFamily: theme.typography.bodyFont }}>
                  No timeline events defined yet.
                  Add <code>timelineEvents</code> to your JSON to populate this section.
                </p>
              </div>
            )}

            <div className="flex justify-center mt-10 px-6">
              <button onClick={() => setScene('story')} className="kasi-btn">
                Emotional chapters →
              </button>
            </div>
          </div>
        )}

        {/* ── EMOTIONAL STORYTELLING & MEMORY CHAPTERS ── */}
        {scene === 'story' && (
          <div className="w-full py-16">
            {/* Letter */}
            <div className="px-6 mb-14">
              <div className="text-center mb-8">
                <p className="text-xs tracking-[0.4em] uppercase opacity-30 mb-2" style={{ fontFamily: theme.typography.bodyFont }}>
                  Past & Present
                </p>
                <h2 className="text-3xl font-light" style={{ fontFamily: theme.typography.headingFont, color: colors.text }}>
                  Our Story
                </h2>
              </div>
              <Letter text={data.letter} recipientName={data.recipientName} senderName={data.senderName} />
            </div>

            {/* Chapters */}
            {data.chapters && data.chapters.length > 0 && (
              <div className="px-6 mb-12">
                <div className="flex flex-col gap-8 max-w-2xl mx-auto">
                  {data.chapters.map((ch, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl p-8"
                      style={{ background: colors.surface, border: `1px solid ${colors.accent}22` }}
                    >
                      <p className="text-xs tracking-widest uppercase mb-2 opacity-40" style={{ fontFamily: theme.typography.bodyFont }}>
                        Chapter {i + 1}
                      </p>
                      <h3
                        className="text-xl mb-3"
                        style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}
                      >
                        {ch.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed opacity-70"
                        style={{ fontFamily: theme.typography.letterFont, color: colors.text }}
                      >
                        {ch.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Photos */}
            {data.photos && (
              <div className="mb-12">
                <p className="text-center text-xs tracking-[0.4em] uppercase opacity-30 mb-6 px-6" style={{ fontFamily: theme.typography.bodyFont }}>
                  Memory archive
                </p>
                <PhotoGallery photos={data.photos} />
              </div>
            )}

            {/* Voice & Audio */}
            {data.voiceNote && (
              <div className="px-6 mb-10">
                <AudioPlayer src={data.voiceNote} title="A voice across time" />
              </div>
            )}

            {/* Video */}
            {data.video && (
              <div className="px-6 mb-10">
                <VideoPlayer src={data.video} />
              </div>
            )}

            {/* Group messages */}
            {data.messagesFromGroup && data.messagesFromGroup.length > 0 && (
              <div className="mb-12">
                <p className="text-center text-xs tracking-[0.4em] uppercase opacity-30 mb-6 px-6" style={{ fontFamily: theme.typography.bodyFont }}>
                  From those who have been part of your story
                </p>
                <GroupMessages messages={data.messagesFromGroup} />
              </div>
            )}

            <div className="flex justify-center px-6 mt-10">
              <button onClick={() => setScene('futureReveal')} className="kasi-btn">
                See what's ahead →
              </button>
            </div>
          </div>
        )}

        {/* ── FUTURE TIMELINE REVEAL ── */}
        {scene === 'futureReveal' && (
          <div className="scene px-6 py-16">
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-10">
                <p className="text-xs tracking-[0.4em] uppercase opacity-30 mb-2" style={{ fontFamily: theme.typography.bodyFont }}>
                  What lies ahead
                </p>
                <h2
                  className="text-3xl font-light"
                  style={{ fontFamily: theme.typography.headingFont, color: colors.text }}
                >
                  Future Reveals
                </h2>
                <p className="mt-3 text-sm opacity-40" style={{ fontFamily: theme.typography.bodyFont }}>
                  Surprises locked in time. Each one opens on its date.
                </p>
              </div>

              {futureUnlocks.length > 0 ? (
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div
                    className="absolute left-4 top-0 bottom-0 w-px"
                    style={{ background: `linear-gradient(to bottom, ${colors.accent}44, transparent)` }}
                  />
                  <div className="flex flex-col gap-6 pl-12">
                    {futureUnlocks.map((unlock, i) => {
                      const isPast = new Date(unlock.date) <= new Date();
                      const isOpen = unlockedFuture === i;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="relative"
                        >
                          {/* Dot on timeline */}
                          <div
                            className="absolute -left-9 top-4 w-3 h-3 rounded-full"
                            style={{
                              background: isPast ? colors.accent : colors.secondary,
                              boxShadow: isPast ? `0 0 10px ${colors.accent}66` : 'none',
                            }}
                          />

                          <div
                            className="rounded-2xl p-5 cursor-pointer transition-all"
                            style={{
                              background: colors.surface,
                              border: `1px solid ${isOpen ? colors.accent : colors.accent + '22'}`,
                            }}
                            onClick={() => isPast && setUnlockedFuture(isOpen ? null : i)}
                          >
                            <div className="flex items-center justify-between">
                              <p
                                className="text-xs uppercase tracking-widest"
                                style={{ color: isPast ? colors.accent : colors.textLight, fontFamily: theme.typography.bodyFont }}
                              >
                                {new Date(unlock.date).toLocaleDateString('en-US', {
                                  month: 'long', day: 'numeric', year: 'numeric',
                                })}
                              </p>
                              <span className="text-xs opacity-40">{isPast ? (isOpen ? '▲' : '▼') : '🔒'}</span>
                            </div>

                            <AnimatePresence>
                              {isOpen && isPast && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <p
                                    className="mt-4 text-sm leading-relaxed"
                                    style={{ fontFamily: theme.typography.letterFont, color: colors.text }}
                                  >
                                    {unlock.message}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            {!isPast && (
                              <p className="mt-2 text-xs opacity-30" style={{ fontFamily: theme.typography.bodyFont }}>
                                Unlocks {new Date(unlock.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm opacity-30" style={{ fontFamily: theme.typography.bodyFont }}>
                  No future unlocks defined. Add <code>futureUnlocks</code> to your JSON.
                </p>
              )}

              <div className="flex justify-center mt-12">
                <button onClick={() => setScene('vault')} className="kasi-btn">
                  The Memory Vault →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MEMORY VAULT ── */}
        {scene === 'vault' && (
          <div className="scene text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <div
                className="rounded-3xl p-10 mb-8"
                style={{ background: colors.surface, border: `1px solid ${colors.accent}33` }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ border: `1px solid ${colors.accent}44` }}
                >
                  <span style={{ color: colors.accent, fontSize: 24 }}>✦</span>
                </motion.div>

                <p
                  className="text-xl mb-3"
                  style={{ fontFamily: theme.typography.headingFont, color: colors.text }}
                >
                  Legacy Memory Vault
                </p>
                <p className="text-sm opacity-50 leading-relaxed" style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}>
                  This experience is archived and will continue to receive memories, letters, and surprises over time. It belongs to {data.recipientName}, forever.
                </p>

                {/* Vault stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {[
                    { label: 'Memories', value: data.photos?.length ?? 0 },
                    { label: 'Letters', value: (data.chapters?.length ?? 0) + 1 },
                    { label: 'Unlocks', value: futureUnlocks.length },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-light" style={{ color: colors.accent, fontFamily: theme.typography.headingFont }}>
                        {stat.value}
                      </p>
                      <p className="text-xs opacity-40 mt-1" style={{ fontFamily: theme.typography.bodyFont }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setScene('continuation')} className="kasi-btn">
                Final message →
              </button>
            </motion.div>
          </div>
        )}

        {/* ── CONTINUATION ── */}
        {scene === 'continuation' && (
          <EndingScreen
            customMessage={data.customClosingMessage ?? 'Your journey will continue…'}
            tierLabel="Eternal Experience"
          />
        )}
      </SceneTransition>
    </div>
  );
}
