'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export function AudioPlayer({ src, title = 'Voice Note' }: AudioPlayerProps) {
  const { theme } = useTheme();
  const { components: { audio: audioConfig }, colors } = theme;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [vinylRotation, setVinylRotation] = useState(0);
  const rafRef = useRef<number>(0);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  // Animate vinyl rotation
  useEffect(() => {
    if (playing) {
      const spin = () => {
        setVinylRotation(r => r + 0.5);
        rafRef.current = requestAnimationFrame(spin);
      };
      rafRef.current = requestAnimationFrame(spin);
    } else {
      cancelAnimationFrame(rafRef.current);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  const style = audioConfig.playerStyle;

  // ── WAVEFORM BARS ──
  const WaveformBars = () => (
    <div className="flex items-end gap-0.5 h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ background: colors.accent }}
          animate={playing
            ? { height: [4, Math.random() * 24 + 4, 4] }
            : { height: 4 }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );

  // ── VINYL ──
  if (style === 'vinyl' || style === 'luxuryVinyl') {
    const isLuxury = style === 'luxuryVinyl';
    return (
      <div
        className="rounded-3xl p-8 flex flex-col items-center gap-6"
        style={{
          background: isLuxury ? colors.surface : colors.primary,
          border: `1px solid ${colors.accent}44`,
          maxWidth: 340,
          margin: '0 auto',
        }}
      >
        <audio ref={audioRef} src={src} />

        {/* Vinyl disc */}
        <div
          className="relative flex items-center justify-center rounded-full shadow-xl"
          style={{
            width: 180, height: 180,
            background: `conic-gradient(
              #111 0deg, #222 30deg, #111 60deg, #222 90deg,
              #111 120deg, #222 150deg, #111 180deg, #222 210deg,
              #111 240deg, #222 270deg, #111 300deg, #222 330deg, #111 360deg
            )`,
            transform: `rotate(${vinylRotation}deg)`,
            border: `3px solid ${colors.accent}`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: 60, height: 60,
              background: `radial-gradient(circle, ${colors.accent} 0%, #333 60%)`,
            }}
          />
        </div>

        <p style={{ color: colors.accent, fontFamily: theme.typography.letterFont, fontSize: '0.9rem' }}>
          {title}
        </p>

        {audioConfig.waveformAnimation && playing && <WaveformBars />}

        <button
          onClick={toggle}
          className="w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110"
          style={{ background: colors.accent, color: colors.surface }}
        >
          {playing ? '⏸' : '▶'}
        </button>

        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-1 cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (audioRef.current) audioRef.current.currentTime = pct * duration;
          }}
        >
          <div className="h-1 rounded-full transition-all" style={{ width: `${progress * 100}%`, background: colors.accent }} />
        </div>
      </div>
    );
  }

  // ── BOOMBOX ──
  if (style === 'boombox') {
    return (
      <div
        className="rounded-3xl p-6 mx-auto"
        style={{ background: colors.primary, maxWidth: 360, border: `3px solid ${colors.accent}` }}
      >
        <audio ref={audioRef} src={src} />
        <p className="text-center font-bold mb-4" style={{ fontFamily: theme.typography.headingFont, color: colors.text }}>
          🎵 {title}
        </p>
        <div className="flex gap-3 items-center justify-center mb-4">
          <WaveformBars />
        </div>
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            className="px-6 py-3 rounded-full font-bold text-lg"
            style={{ background: colors.accent, color: colors.surface }}
          >
            {playing ? '⏸ PAUSE' : '▶ PLAY'}
          </motion.button>
        </div>
        <div className="w-full bg-white/30 rounded-full h-2 mt-4 cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (audioRef.current) audioRef.current.currentTime = pct * duration;
          }}
        >
          <div className="h-2 rounded-full" style={{ width: `${progress * 100}%`, background: colors.accent }} />
        </div>
      </div>
    );
  }

  // ── FILM SCORE ──
  if (style === 'filmScore') {
    return (
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-2xl mx-auto"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${colors.accent}22`,
          maxWidth: 480,
        }}
      >
        <audio ref={audioRef} src={src} />
        <button
          onClick={toggle}
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
          style={{ background: colors.accent, color: colors.background }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm truncate" style={{ color: colors.accent }}>{title}</p>
          {audioConfig.waveformAnimation && <WaveformBars />}
          <div className="w-full bg-white/10 rounded-full h-0.5 mt-2 cursor-pointer"
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) audioRef.current.currentTime = pct * duration;
            }}
          >
            <div className="h-0.5 rounded-full" style={{ width: `${progress * 100}%`, background: colors.accent }} />
          </div>
        </div>
        <span className="text-xs opacity-50 flex-shrink-0">
          {fmt(progress * duration)} / {fmt(duration)}
        </span>
      </div>
    );
  }

  // ── MINIMAL (default) ──
  return (
    <div
      className="flex items-center gap-4 px-6 py-4 rounded-2xl mx-auto shadow"
      style={{ background: colors.surface, maxWidth: 400 }}
    >
      <audio ref={audioRef} src={src} />
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: colors.accent, color: colors.surface }}
      >
        {playing ? '⏸' : '▶'}
      </button>
      <div className="flex-1">
        <p className="text-xs mb-1 opacity-60">{title}</p>
        <div className="w-full bg-gray-200 rounded-full h-1 cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = (e.clientX - rect.left) / rect.width;
            if (audioRef.current) audioRef.current.currentTime = pct * duration;
          }}
        >
          <div className="h-1 rounded-full transition-all" style={{ width: `${progress * 100}%`, background: colors.accent }} />
        </div>
      </div>
    </div>
  );
}
