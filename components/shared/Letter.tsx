'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';

interface LetterProps {
  text: string;
  senderName?: string;
  recipientName?: string;
}

// ─── Wax Seal SVG ────────────────────────────────────────────
function WaxSeal({ color }: { color: string }) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
      width="64" height="64" viewBox="0 0 64 64"
      className="mx-auto mb-6"
    >
      <circle cx="32" cy="32" r="30" fill={color} />
      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <text x="32" y="37" textAnchor="middle" fontSize="18" fill="rgba(255,255,255,0.9)" fontFamily="serif">K</text>
    </motion.svg>
  );
}

// ─── Typewriter Effect ────────────────────────────────────────
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayed(text.slice(0, indexRef.current + 1));
          indexRef.current += 1;
        } else {
          clearInterval(interval);
        }
      }, 28);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayed}<span className="animate-pulse">|</span></span>;
}

// ─── Letter Component ─────────────────────────────────────────
export function Letter({ text, senderName, recipientName }: LetterProps) {
  const { theme } = useTheme();
  const { components: { letter: letterConfig }, animations, colors } = theme;

  const isSubtitle    = animations.letterReveal === 'subtitle';
  const isInkSpread   = animations.letterReveal === 'inkSpread';
  const isTypewriter  = animations.letterReveal === 'typewriter';

  // Texture class
  const textureClass =
    letterConfig.backgroundTexture === 'vintage-paper'    ? 'paper-vintage' :
    letterConfig.backgroundTexture === 'gold-embossed'    ? 'paper-gold-embossed' :
    letterConfig.backgroundTexture === 'subtitle-overlay' ? 'paper-subtitle-overlay' :
    'paper-vintage';

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Wax seal – appears before letter unfolds */}
      {letterConfig.waxSealAnimation && (
        <WaxSeal color={colors.accent} />
      )}

      {/* Paper fold effect container */}
      <motion.div
        initial={letterConfig.paperFoldEffect
          ? { scaleY: 0, originY: 0, opacity: 0 }
          : { opacity: 0, y: 20 }}
        animate={{ scaleY: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: letterConfig.waxSealAnimation ? 0.6 : 0 }}
        className={`${textureClass} rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden`}
        style={{
          borderColor: colors.accent,
          borderWidth: letterConfig.backgroundTexture === 'gold-embossed' ? '1px' : '0',
          borderStyle: 'solid',
        }}
      >
        {/* Decorative corner flourish */}
        <div
          className="absolute top-4 left-4 w-8 h-8 opacity-20"
          style={{
            border: `1px solid ${colors.accent}`,
            borderRight: 'none', borderBottom: 'none',
          }}
        />
        <div
          className="absolute bottom-4 right-4 w-8 h-8 opacity-20"
          style={{
            border: `1px solid ${colors.accent}`,
            borderLeft: 'none', borderTop: 'none',
          }}
        />

        {/* Greeting */}
        {recipientName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="kasi-letter-text mb-4 opacity-80"
            style={{ fontFamily: theme.typography.letterFont }}
          >
            Dear {recipientName},
          </motion.p>
        )}

        {/* Main letter body */}
        <motion.div
          initial={isInkSpread ? { opacity: 0, letterSpacing: '0.4em' } : { opacity: 0 }}
          animate={isInkSpread ? { opacity: 1, letterSpacing: 'normal' } : { opacity: 1 }}
          transition={isInkSpread
            ? { duration: 2.5, ease: 'easeOut', delay: 0.5 }
            : { duration: 0.6, delay: 0.5 }}
          className="kasi-letter-text whitespace-pre-line leading-loose"
          style={{
            fontFamily: theme.typography.letterFont,
            fontSize: isSubtitle ? '1.1rem' : '1.1rem',
            color: isSubtitle ? colors.accent : colors.text,
            textAlign: isSubtitle ? 'center' : 'left',
          }}
        >
          {isTypewriter
            ? <TypewriterText text={text} delay={0.8} />
            : text}
        </motion.div>

        {/* Sign-off */}
        {senderName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isTypewriter ? (text.length * 0.028 + 1) : 2 }}
            className="kasi-letter-text mt-8 text-right"
            style={{ fontFamily: theme.typography.letterFont }}
          >
            With love,<br /><em>{senderName}</em>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
