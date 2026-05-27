'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme, useCelebrationVariant } from '../themes/ThemeProvider';

interface LetterProps {
  text: string;
  senderName?: string;
  recipientName?: string;
}

// =============================================================
// WAX SEAL
// Renders different icons based on the active celebration event.
// For non-celebration themes it always renders 'K'.
// =============================================================
function WaxSeal({ color, icon = 'K' }: { color: string; icon?: string }) {
  const isSvgIcon = ['crescent', 'snowflake', 'star', 'tree', 'flag', 'flame', 'sun'].includes(icon);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
      className="mx-auto mb-6 flex items-center justify-center rounded-full"
      style={{
        width: 64, height: 64,
        background: color,
        boxShadow: `0 4px 24px ${color}66`,
      }}
    >
      {isSvgIcon ? (
        <SealIcon icon={icon} />
      ) : (
        <span style={{ color: 'rgba(255,255,255,0.9)', fontFamily: 'serif', fontSize: 22 }}>
          {icon}
        </span>
      )}
    </motion.div>
  );
}

function SealIcon({ icon }: { icon: string }) {
  const style = { fill: 'rgba(255,255,255,0.9)', width: 28, height: 28 };
  switch (icon) {
    case 'crescent':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      );
    case 'snowflake':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22v-2z" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      );
    case 'tree':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path d="M17 12h-3.88L16 5H8l2.88 7H7l5 9 5-9z" />
        </svg>
      );
    case 'flag':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z" />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z" />
        </svg>
      );
    default:
      return <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 20 }}>✦</span>;
  }
}

// =============================================================
// PAPER TEXTURE RESOLVER
// Maps variant.letterTexture → CSS class or inline style.
// =============================================================
function resolveTexture(
  textureKey: string,
  accentColor: string,
): { className: string; style?: React.CSSProperties } {
  switch (textureKey) {
    case 'silk':
      return {
        className: '',
        style: {
          background: 'linear-gradient(135deg, #0d5c35 25%, #0a4a2a 50%, #0d5c35 75%)',
          backgroundSize: '4px 4px',
        },
      };
    case 'vintageCard':
      return { className: 'paper-vintage' };
    case 'goldLeaf':
      return { className: 'paper-gold-embossed' };
    case 'linen':
      return {
        className: '',
        style: { background: '#F5ECD7', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(180,150,100,0.08) 28px)' },
      };
    case 'parchment':
      return {
        className: '',
        style: { background: 'linear-gradient(160deg, #E8D5B0 0%, #D4B896 100%)' },
      };
    // themeConfigs static values
    case 'vintage-paper':
      return { className: 'paper-vintage' };
    case 'gold-embossed':
      return { className: 'paper-gold-embossed' };
    case 'subtitle-overlay':
      return { className: 'paper-subtitle-overlay' };
    default:
      return { className: 'paper-vintage' };
  }
}

// =============================================================
// TYPEWRITER EFFECT
// =============================================================
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

// =============================================================
// LETTER COMPONENT
// =============================================================
export function Letter({ text, senderName, recipientName }: LetterProps) {
  const { theme } = useTheme();
  const variant = useCelebrationVariant(); // null for non-celebration themes
  const { components: { letter: letterConfig }, animations, colors } = theme;

  const isSubtitle   = animations.letterReveal === 'subtitle';
  const isInkSpread  = animations.letterReveal === 'inkSpread';
  const isTypewriter = animations.letterReveal === 'typewriter';

  // For celebration theme, use variant.letterTexture; otherwise use config
  const textureKey = variant ? variant.letterTexture : letterConfig.backgroundTexture;
  const { className: textureClass, style: textureStyle } = resolveTexture(textureKey, colors.accent);

  // Wax seal icon: event-specific or default 'K'
  const sealIcon = variant ? variant.waxSealIcon : undefined;
  const showWaxSeal = letterConfig.waxSealAnimation;

  // Greeting prefix from event variant
  const greetingPrefix = variant?.greeting;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showWaxSeal && (
        <WaxSeal color={colors.accent} icon={sealIcon} />
      )}

      <motion.div
        initial={letterConfig.paperFoldEffect
          ? { scaleY: 0, originY: 0, opacity: 0 }
          : { opacity: 0, y: 20 }}
        animate={{ scaleY: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: showWaxSeal ? 0.6 : 0 }}
        className={`${textureClass} rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden`}
        style={{
          borderColor: colors.accent,
          borderWidth: (textureKey === 'gold-embossed' || textureKey === 'goldLeaf' || textureKey === 'silk') ? '1px' : '0',
          borderStyle: 'solid',
          ...textureStyle,
        }}
      >
        {/* Corner flourish */}
        <div className="absolute top-4 left-4 w-8 h-8 opacity-20"
          style={{ border: `1px solid ${colors.accent}`, borderRight: 'none', borderBottom: 'none' }} />
        <div className="absolute bottom-4 right-4 w-8 h-8 opacity-20"
          style={{ border: `1px solid ${colors.accent}`, borderLeft: 'none', borderTop: 'none' }} />

        {/* Event greeting */}
        {greetingPrefix && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs tracking-widest uppercase mb-3 opacity-60"
            style={{ fontFamily: theme.typography.bodyFont, color: colors.accent }}
          >
            {greetingPrefix}
          </motion.p>
        )}

        {/* Recipient greeting */}
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

        {/* Letter body */}
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
