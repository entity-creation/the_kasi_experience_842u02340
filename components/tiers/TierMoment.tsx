'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { SceneTransition } from '../shared/SceneTransition';
import { Letter } from '../shared/Letter';
import { PhotoGallery } from '../shared/PhotoGallery';
import { AudioPlayer } from '../shared/AudioPlayer';
import { VideoPlayer } from '../shared/VideoPlayer';
import { ExperienceData } from '../types';

type Scene = 'intro' | 'envelope' | 'letter' | 'photos' | 'ending';

interface TierMomentProps {
  data: ExperienceData;
}

export function TierMoment({ data }: TierMomentProps) {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scene, setScene] = useState<Scene>('intro');

  const next = (to: Scene) => setScene(to);

  return (
    <div className="scene" style={{ minHeight: '100vh', padding: 0 }}>
      <SceneTransition sceneKey={scene} className="scene w-full">
        {/* ── INTRO ── */}
        {scene === 'intro' && (
          <div className="scene text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-sm tracking-[0.3em] uppercase mb-8 opacity-40"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}
            >
              Someone created a moment for you
            </motion.p>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="kasi-heading mb-4"
              style={{ fontSize: theme.typography.headingSize }}
            >
              {data.recipientName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="opacity-50 mb-12 text-sm tracking-widest"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}
            >
              {data.eventType}
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => next('envelope')}
              whileHover={{ scale: 1.04 }}
              className="kasi-btn"
            >
              Open Your Moment
            </motion.button>
          </div>
        )}

        {/* ── ENVELOPE ANIMATION ── */}
        {scene === 'envelope' && (
          <div className="scene text-center px-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="cursor-pointer"
              onClick={() => next('letter')}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              {/* Envelope SVG */}
              <svg width="200" height="140" viewBox="0 0 200 140" className="mx-auto mb-6">
                <rect x="0" y="0" width="200" height="140" rx="8" fill={colors.surface} stroke={colors.accent} strokeWidth="1.5" />
                {/* Flap */}
                <path d="M 0 0 L 100 70 L 200 0" fill={colors.primary} stroke={colors.accent} strokeWidth="1.5" />
                {/* Bottom chevron */}
                <path d="M 0 140 L 100 80 L 200 140" fill={colors.primary + 'cc'} stroke="none" />
                {/* Wax seal */}
                <circle cx="100" cy="75" r="16" fill={colors.accent} />
                <text x="100" y="80" textAnchor="middle" fontSize="14" fill="white" fontFamily="serif">K</text>
              </svg>
              <p className="text-sm opacity-50 tracking-widest" style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}>
                Tap to open
              </p>
            </motion.div>
          </div>
        )}

        {/* ── LETTER ── */}
        {scene === 'letter' && (
          <div className="scene px-6 py-12">
            <div className="w-full max-w-2xl mx-auto">
              <Letter
                text={data.letter}
                recipientName={data.recipientName}
                senderName={data.senderName}
              />
              {data.voiceNote && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8"
                >
                  <AudioPlayer src={data.voiceNote} title="A message for you" />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-10 flex justify-center"
              >
                {data.photos && data.photos.length > 0
                  ? <button onClick={() => next('photos')} className="kasi-btn">See our memories →</button>
                  : <button onClick={() => next('ending')} className="kasi-btn">See the closing →</button>
                }
              </motion.div>
            </div>
          </div>
        )}

        {/* ── PHOTOS ── */}
        {scene === 'photos' && (
          <div className="w-full py-12 px-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm tracking-widest uppercase mb-8 opacity-40"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}
            >
              Memories
            </motion.p>
            <PhotoGallery photos={data.photos ?? []} />
            {data.video && (
              <div className="mt-12 px-4">
                <VideoPlayer src={data.video} />
              </div>
            )}
            <div className="flex justify-center mt-12">
              <button onClick={() => next('ending')} className="kasi-btn">
                {theme.endingScreen.message === 'Made with care for you' ? 'Finish →' : 'Continue →'}
              </button>
            </div>
          </div>
        )}

        {/* ── ENDING ── */}
        {scene === 'ending' && (
          <div className="scene text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              <p
                className="text-3xl md:text-5xl font-light"
                style={{ fontFamily: theme.typography.headingFont, color: colors.text, lineHeight: 1.4 }}
              >
                {data.customClosingMessage ?? theme.endingScreen.message}
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6 text-sm tracking-widest uppercase opacity-30"
                style={{ fontFamily: theme.typography.bodyFont }}
              >
                The Kasi Experience
              </motion.p>
            </motion.div>
          </div>
        )}
      </SceneTransition>
    </div>
  );
}
