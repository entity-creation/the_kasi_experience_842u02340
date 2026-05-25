'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const { theme } = useTheme();
  const { components: { quiz: quizConfig }, colors } = theme;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const q = questions[current];

  // Build options: correct + distractors (or use provided options)
  const options = q.options ?? shuffleWithCorrect(q.correctAnswer, [
    'In the park', 'At school', 'Online', 'At a party',
  ].filter(o => o !== q.correctAnswer));

  function shuffleWithCorrect(correct: string, others: string[]): string[] {
    const pool = [correct, ...others.slice(0, 3)];
    return pool.sort(() => Math.random() - 0.5);
  }

  const choose = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    if (answer === q.correctAnswer) setCorrect(c => c + 1);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setDone(true);
        onComplete?.();
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
        setFlipped(false);
      }
    }, 1400);
  };

  // ── COMPLETION SCREEN ──
  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <p className="text-5xl mb-4">{correct === questions.length ? '🎉' : '💫'}</p>
        <p className="text-2xl font-semibold" style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}>
          {correct} / {questions.length} correct
        </p>
        <p className="mt-2 opacity-60">
          {correct === questions.length
            ? 'You know them better than anyone!'
            : 'Every answer unlocks another memory.'}
        </p>
      </motion.div>
    );
  }

  // ── TAROT STYLE (luxury) ──
  if (quizConfig.cardStyle === 'tarot') {
    return (
      <div className="max-w-sm mx-auto py-8">
        <p className="text-center text-sm tracking-widest uppercase mb-8 opacity-40">
          Question {current + 1} of {questions.length}
        </p>
        <div
          className="flip-card cursor-pointer mx-auto mb-6"
          style={{ width: 220, height: 320 }}
          onClick={() => setFlipped(true)}
        >
          <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
            <div
              className="flip-card-front flex items-center justify-center"
              style={{ background: colors.surface, border: `1px solid ${colors.accent}` }}
            >
              <span style={{ color: colors.accent, fontSize: 48 }}>✦</span>
            </div>
            <div
              className="flip-card-back flex items-center justify-center p-6 text-center"
              style={{ background: colors.surface, border: `1px solid ${colors.accent}` }}
            >
              <p style={{ fontFamily: theme.typography.letterFont, color: colors.text }}>{q.text}</p>
            </div>
          </div>
        </div>
        {flipped && (
          <div className="flex flex-col gap-3">
            {options.map((opt) => (
              <motion.button
                key={opt}
                onClick={() => choose(opt)}
                whileHover={{ x: 4 }}
                className="text-left px-4 py-3 transition-all text-sm"
                style={{
                  border: `1px solid ${selected
                    ? opt === q.correctAnswer ? '#4ade80'
                    : opt === selected ? '#f87171'
                    : colors.accent + '44'
                    : colors.accent + '44'}`,
                  color: colors.text,
                  background: selected === opt ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── GAME SHOW STYLE (playful) ──
  if (quizConfig.cardStyle === 'gameShow') {
    return (
      <div className="max-w-lg mx-auto py-8 px-4">
        <div
          className="rounded-3xl p-6 mb-6 text-center"
          style={{ background: colors.primary }}
        >
          <p className="text-xs uppercase tracking-widest mb-2 opacity-60">Question {current + 1}</p>
          <p className="text-lg font-bold" style={{ fontFamily: theme.typography.headingFont }}>{q.text}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {options.map((opt, i) => {
            const label = ['A', 'B', 'C', 'D'][i];
            const isCorrect = opt === q.correctAnswer;
            const isSelected = opt === selected;
            return (
              <motion.button
                key={opt}
                onClick={() => choose(opt)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
                style={{
                  background: selected
                    ? isCorrect ? '#4ade80'
                    : isSelected ? '#f87171'
                    : colors.surface
                    : colors.surface,
                  border: `2px solid ${colors.accent}`,
                  color: colors.text,
                }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: colors.accent, color: colors.surface }}
                >
                  {label}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── FLOATING 3D (cinematic) ──
  if (quizConfig.cardStyle === 'floating3D') {
    return (
      <div className="max-w-lg mx-auto py-12 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="rounded-2xl p-8 mb-8 text-center"
          style={{ background: colors.surface, boxShadow: `0 20px 80px ${colors.shadow}` }}
        >
          <p className="text-xs tracking-widest uppercase mb-4 opacity-40">
            Memory {current + 1} of {questions.length}
          </p>
          <p style={{ fontFamily: theme.typography.letterFont, color: colors.accent, fontSize: '1.1rem' }}>{q.text}</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          {options.map((opt) => (
            <motion.button
              key={opt}
              onClick={() => choose(opt)}
              whileHover={{ x: 8, background: colors.secondary }}
              className="text-left px-6 py-4 rounded-xl text-sm backdrop-blur transition-all"
              style={{
                background: selected
                  ? opt === q.correctAnswer ? '#4ade8033'
                  : opt === selected ? '#f8717133'
                  : 'rgba(255,255,255,0.04)'
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${colors.accent}33`,
                color: colors.text,
              }}
            >
              {opt}
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // ── LOVE LETTER (default, romantic/generic) ──
  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div
        className="paper-vintage rounded-2xl p-8 mb-6 text-center shadow-lg"
        style={{ border: `1px solid ${colors.accent}44` }}
      >
        <p className="text-xs uppercase tracking-widest mb-4 opacity-50">How well do you know them?</p>
        <p style={{ fontFamily: theme.typography.letterFont, fontSize: '1.2rem', color: colors.text }}>
          {q.text}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <motion.button
            key={opt}
            onClick={() => choose(opt)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl text-sm transition-all text-left"
            style={{
              background: selected
                ? opt === q.correctAnswer ? '#4ade8022'
                : opt === selected ? '#f8717122'
                : colors.surface
                : colors.surface,
              border: `1.5px solid ${selected && opt === q.correctAnswer ? '#4ade80' : colors.accent + '66'}`,
              color: colors.text,
              fontFamily: theme.typography.bodyFont,
            }}
          >
            {opt}
          </motion.button>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: i === current ? colors.accent : colors.primary }}
          />
        ))}
      </div>
    </div>
  );
}
