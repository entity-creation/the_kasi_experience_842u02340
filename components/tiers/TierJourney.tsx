'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { SceneTransition } from '../shared/SceneTransition';
import { Letter } from '../shared/Letter';
import { PhotoGallery } from '../shared/PhotoGallery';
import { AudioPlayer } from '../shared/AudioPlayer';
import { Quiz } from '../shared/Quiz';
import { ExperienceData } from '../types';

type Scene = 'intro' | 'letter' | 'quiz' | 'voice' | 'gallery' | 'ending';

export function TierJourney({ data }: { data: ExperienceData }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scene, setScene] = useState<Scene>('intro');
  const [quizDone, setQuizDone] = useState(false);

  const next = (to: Scene) => setScene(to);

  return (
    <div style={{ minHeight: '100vh' }}>
      <SceneTransition sceneKey={scene} className="scene w-full min-h-screen">

        {/* ── INTRO ── */}
        {scene === 'intro' && (
          <div className="scene text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="text-xs tracking-[0.4em] uppercase mb-6 opacity-30"
              style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}
            >
              A journey made for you
            </motion.p>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.4 }}
              className="kasi-heading mb-3"
              style={{ fontSize: theme.typography.headingSize }}
            >
              {data.recipientName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="mb-12 opacity-40 text-sm tracking-widest"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              {data.eventType}
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => next('letter')}
              whileHover={{ scale: 1.04 }}
              className="kasi-btn"
            >
              Begin your journey →
            </motion.button>
          </div>
        )}

        {/* ── LETTER ── */}
        {scene === 'letter' && (
          <div className="scene px-6 py-12">
            <div className="w-full max-w-2xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs tracking-widest uppercase mb-8 text-center opacity-30"
                style={{ fontFamily: theme.typography.bodyFont }}
              >
                A letter for you
              </motion.p>
              <Letter text={data.letter} recipientName={data.recipientName} senderName={data.senderName} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-10 flex justify-center"
              >
                <button
                  onClick={() => next(data.quiz ? 'quiz' : (data.voiceNote ? 'voice' : 'gallery'))}
                  className="kasi-btn"
                >
                  {data.quiz ? 'Continue the journey →' : 'See memories →'}
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* ── QUIZ ── */}
        {scene === 'quiz' && data.quiz && (
          <div className="scene px-6 py-12">
            <div className="w-full max-w-lg mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm mb-2 tracking-widest uppercase opacity-40"
                style={{ fontFamily: theme.typography.bodyFont }}
              >
                How well do you know them?
              </motion.p>
              <Quiz
                questions={data.quiz.questions}
                onComplete={() => {
                  setQuizDone(true);
                  setTimeout(() => next(data.voiceNote ? 'voice' : 'gallery'), 2000);
                }}
              />
              {!quizDone && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => next(data.voiceNote ? 'voice' : 'gallery')}
                    className="text-xs opacity-30 hover:opacity-60 underline"
                    style={{ fontFamily: theme.typography.bodyFont }}
                  >
                    Skip quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── VOICE NOTE ── */}
        {scene === 'voice' && data.voiceNote && (
          <div className="scene px-6 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm tracking-widest uppercase mb-8 opacity-40"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              A voice from the heart
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-10"
            >
              <AudioPlayer src={data.voiceNote} title="Listen to this…" />
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => next('gallery')}
              className="kasi-btn"
            >
              See our memories →
            </motion.button>
          </div>
        )}

        {/* ── GALLERY ── */}
        {scene === 'gallery' && (
          <div className="w-full py-12 px-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm tracking-widest uppercase mb-8 opacity-40"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              Our memories
            </motion.p>
            {data.photos && <PhotoGallery photos={data.photos} />}
            {data.soundtrack && (
              <div className="mt-8">
                <AudioPlayer src={data.soundtrack} title="Our soundtrack" />
              </div>
            )}
            <div className="flex justify-center mt-12">
              <button onClick={() => next('ending')} className="kasi-btn">Close the chapter →</button>
            </div>
          </div>
        )}

        {/* ── ENDING ── */}
        {scene === 'ending' && (
          <div className="scene text-center px-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-3xl md:text-4xl font-light leading-relaxed"
              style={{ fontFamily: theme.typography.headingFont, color: colors.text }}
            >
              Every memory led<br />to this moment.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1.2 }}
              className="mx-auto mt-8 h-px"
              style={{ width: 80, background: colors.accent }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-6 text-xs tracking-[0.3em] uppercase opacity-30"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              The Kasi Experience · The Journey
            </motion.p>
          </div>
        )}
      </SceneTransition>
    </div>
  );
}
