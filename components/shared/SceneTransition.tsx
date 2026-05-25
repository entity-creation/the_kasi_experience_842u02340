'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';

interface SceneTransitionProps {
  children: React.ReactNode;
  sceneKey: string | number;
  className?: string;
}

/**
 * SceneTransition
 *
 * Wraps each scene in a Framer Motion variant that matches the
 * active theme's transitionPreset. Import once; use everywhere.
 */
export function SceneTransition({ children, sceneKey, className }: SceneTransitionProps) {
  const { theme } = useTheme();
  const { sceneTransition, duration, easing } = theme.transitions;

  // Per-preset variant definitions
  const variants: Record<string, {
    initial: object;
    animate: object;
    exit: object;
  }> = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit:    { opacity: 0 },
    },
    fadeSlow: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit:    { opacity: 0 },
    },
    fadeToBlack: {
      initial: { opacity: 0, backgroundColor: '#000' },
      animate: { opacity: 1 },
      exit:    { opacity: 0, backgroundColor: '#000' },
    },
    cinematic: {
      initial: { opacity: 0, scale: 1.04 },
      animate: { opacity: 1, scale: 1 },
      exit:    { opacity: 0, scale: 0.96 },
    },
    bloom: {
      initial: { opacity: 0, filter: 'blur(24px)', scale: 1.08 },
      animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
      exit:    { opacity: 0, filter: 'blur(16px)', scale: 0.95 },
    },
    bounce: {
      initial: { opacity: 0, y: 40, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit:    { opacity: 0, y: -20 },
    },
    slideBounce: {
      initial: { opacity: 0, x: 60 },
      animate: { opacity: 1, x: 0 },
      exit:    { opacity: 0, x: -40 },
    },
  };

  const preset = variants[sceneTransition] ?? variants.fade;
  const easingMap: Record<string, string | number[]> = {
    easeInOut:   'easeInOut',
    easeOutBack: [0.34, 1.56, 0.64, 1],
  };
  const resolvedEasing = easingMap[easing] ?? 'easeInOut';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={{ duration, ease: resolvedEasing }}
        className={className}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
