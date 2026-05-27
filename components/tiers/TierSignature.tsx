'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { SceneTransition } from '../shared/SceneTransition';
import { Letter } from '../shared/Letter';
import { PhotoGallery } from '../shared/PhotoGallery';
import { AudioPlayer } from '../shared/AudioPlayer';
import { VideoPlayer } from '../shared/VideoPlayer';
import { GroupMessages } from '../shared/GroupMessages';
import { SpinWheel } from '../shared/SpinWheel';
import { EndingScreen } from '../shared/EndingScreen';
import { ExperienceData } from '../types';

type Scene =
  | 'intro'
  | 'chapter1'
  | 'chapter2'
  | 'chapter3'
  | 'chapter4-reward'
  | 'chapter5-video'
  | 'ending';

export function TierSignature({ data }: { data: ExperienceData }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const [scene, setScene] = useState<Scene>('intro');
  const [revealedReward, setRevealedReward] = useState<string | null>(null);

  const chapters = data.chapters ?? [];

  const SceneHeading = ({ label, title }: { label: string; title: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-30" style={{ fontFamily: theme.typography.bodyFont }}>
        {label}
      </p>
      <h2
        className="kasi-heading"
        style={{ fontSize: `calc(${theme.typography.headingSize} * 0.8)` }}
      >
        {title}
      </h2>
    </motion.div>
  );

  return (
    <div style={{ minHeight: '100vh', background: colors.background }}>
      <SceneTransition sceneKey={scene} className="scene w-full min-h-screen">

        {/* ── INTRO ── */}
        {scene === 'intro' && (
          <div className="scene text-center px-6">
            {/* Cinematic bars for cinematic theme */}
            {theme.layout.cardStyle === 'letterbox' && (
              <>
                <div className="fixed top-0 left-0 right-0 h-16 bg-black z-50" />
                <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-50" />
              </>
            )}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-xs tracking-[0.5em] uppercase mb-8 opacity-20"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              Tonight is about you
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.5em' }}
              animate={{ opacity: 1, letterSpacing: '-0.02em' }}
              transition={{ delay: 0.8, duration: 1.8 }}
              className="kasi-heading mb-4"
              style={{ fontSize: theme.typography.headingSize }}
            >
              {data.recipientName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mb-14 opacity-40 tracking-widest text-sm"
              style={{ fontFamily: theme.typography.bodyFont }}
            >
              A Signature Experience · {data.eventType}
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              onClick={() => setScene('chapter1')}
              className="kasi-btn"
              whileHover={{ scale: 1.04 }}
            >
              Begin →
            </motion.button>
          </div>
        )}

        {/* ── CHAPTER 1: THE BEGINNING ── */}
        {scene === 'chapter1' && (
          <div className="scene px-6 py-16">
            <div className="max-w-2xl mx-auto">
              <SceneHeading
                label="Chapter 1"
                title={chapters[0]?.title ?? 'The Beginning'}
              />
              <Letter text={chapters[0]?.content ?? data.letter} recipientName={data.recipientName} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="flex justify-center mt-10"
              >
                <button onClick={() => setScene('chapter2')} className="kasi-btn">
                  Chapter 2 →
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* ── CHAPTER 2: MEMORIES ── */}
        {scene === 'chapter2' && (
          <div className="w-full py-16">
            <div className="text-center mb-10 px-6">
              <SceneHeading
                label="Chapter 2"
                title={chapters[1]?.title ?? 'Memories'}
              />
              {chapters[1]?.content && (
                <p className="max-w-xl mx-auto opacity-60 text-sm leading-relaxed" style={{ fontFamily: theme.typography.bodyFont }}>
                  {chapters[1].content}
                </p>
              )}
            </div>

            {data.photos && <PhotoGallery photos={data.photos} />}

            {data.voiceNote && (
              <div className="mt-10 px-6">
                <AudioPlayer src={data.voiceNote} title="A voice from the past…" />
              </div>
            )}

            {data.messagesFromGroup && data.messagesFromGroup.length > 0 && (
              <div className="mt-10">
                <p className="text-center text-xs tracking-widest uppercase mb-6 opacity-30 px-6" style={{ fontFamily: theme.typography.bodyFont }}>
                  Messages from those who love you
                </p>
                <GroupMessages messages={data.messagesFromGroup} />
              </div>
            )}

            <div className="flex justify-center mt-12 px-6">
              <button onClick={() => setScene('chapter3')} className="kasi-btn">Chapter 3 →</button>
            </div>
          </div>
        )}

        {/* ── CHAPTER 3: INTERACTIVE REVEAL ── */}
        {scene === 'chapter3' && (
          <div className="scene px-6 py-16">
            <div className="max-w-lg mx-auto text-center">
              <SceneHeading
                label="Chapter 3"
                title={chapters[2]?.title ?? 'A Hidden Reveal'}
              />
              {chapters[2]?.content && (
                <p className="opacity-60 text-sm mb-8 leading-relaxed" style={{ fontFamily: theme.typography.bodyFont }}>
                  {chapters[2].content}
                </p>
              )}

              {/* Hidden surprise card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl p-8 mb-10"
                style={{ background: colors.surface, border: `1px solid ${colors.accent}33` }}
              >
                <p className="text-lg mb-2" style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}>
                  ✦
                </p>
                <p className="opacity-60 text-sm" style={{ fontFamily: theme.typography.letterFont }}>
                  {data.letter}
                </p>
              </motion.div>

              <button onClick={() => setScene('chapter4-reward')} className="kasi-btn">
                Claim your reward →
              </button>
            </div>
          </div>
        )}

        {/* ── CHAPTER 4: REWARD WHEEL ── */}
        {scene === 'chapter4-reward' && (
          <div className="scene px-6 py-16">
            <div className="max-w-md mx-auto text-center">
              <SceneHeading
                label="Chapter 4"
                title={chapters[3]?.title ?? 'Your Reward'}
              />
              {data.rewardItems && data.rewardItems.length > 0 ? (
                <>
                  <SpinWheel
                    items={data.rewardItems}
                    onResult={(item) => setRevealedReward(item)}
                  />
                  {revealedReward && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6"
                    >
                      <button onClick={() => setScene('chapter5-video')} className="kasi-btn">
                        Final chapter →
                      </button>
                    </motion.div>
                  )}
                </>
              ) : (
                <div>
                  <p className="opacity-50 mb-8" style={{ fontFamily: theme.typography.bodyFont }}>
                    No reward items defined – add them to the JSON!
                  </p>
                  <button onClick={() => setScene('chapter5-video')} className="kasi-btn">
                    Continue →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CHAPTER 5: VIDEO REVEAL ── */}
        {scene === 'chapter5-video' && (
          <div className="scene px-6 py-16">
            <div className="w-full max-w-4xl mx-auto">
              <SceneHeading
                label="Chapter 5 · Final"
                title={chapters[4]?.title ?? 'The Final Reveal'}
              />
              {data.video ? (
                <VideoPlayer src={data.video} />
              ) : (
                <p className="text-center opacity-40 text-sm" style={{ fontFamily: theme.typography.bodyFont }}>
                  No video provided for this experience.
                </p>
              )}
              <div className="flex justify-center mt-12">
                <button onClick={() => setScene('ending')} className="kasi-btn">
                  The end →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── ENDING ── */}
        {scene === 'ending' && (
          <EndingScreen
            customMessage={data.customClosingMessage ?? 'Crafted as a Signature Experience.'}
            tierLabel="Signature Experience"
          />
        )}
      </SceneTransition>
    </div>
  );
}
