'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';

interface VideoPlayerProps {
  src: string;
}

export function VideoPlayer({ src }: VideoPlayerProps) {
  const { theme } = useTheme();
  const { components: { video: videoConfig }, colors } = theme;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    if (!videoRef.current) return;
    setStarted(true);
    if (videoConfig.fullscreenOnPlay) {
      videoRef.current.requestFullscreen?.();
    }
    videoRef.current.play();
  };

  // ── Cinema screen ──
  if (videoConfig.frameStyle === 'cinemaScreen') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative mx-auto overflow-hidden"
        style={{
          maxWidth: 800,
          background: '#000',
          borderTop: `8px solid ${colors.accent}22`,
          borderBottom: `8px solid ${colors.accent}22`,
        }}
      >
        <video ref={videoRef} src={src} className="w-full" controls={started} />
        {!started && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/60 backdrop-blur-sm"
            onClick={play}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{ background: colors.accent, color: '#000' }}
            >
              ▶
            </motion.div>
            <p className="mt-4 text-sm tracking-widest uppercase opacity-60" style={{ color: colors.accent }}>
              Play Memory
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // ── Phone mockup ──
  if (videoConfig.frameStyle === 'phoneMockup') {
    return (
      <div className="flex justify-center">
        <div
          className="relative overflow-hidden rounded-3xl shadow-2xl"
          style={{
            width: 220,
            border: `8px solid ${colors.text}`,
            borderRadius: 36,
          }}
        >
          <video ref={videoRef} src={src} className="w-full rounded-2xl" controls />
        </div>
      </div>
    );
  }

  // ── Vintage frame ──
  if (videoConfig.frameStyle === 'vintage') {
    return (
      <div
        className="relative mx-auto p-4 shadow-xl"
        style={{
          maxWidth: 600,
          background: '#F5ECD7',
          border: `4px solid ${colors.secondary}`,
          borderRadius: 4,
        }}
      >
        <video ref={videoRef} src={src} className="w-full" controls />
        <div className="absolute inset-3 pointer-events-none" style={{ border: `2px solid ${colors.accent}44`, borderRadius: 2 }} />
      </div>
    );
  }

  // ── Default: rounded ──
  return (
    <div className="mx-auto rounded-2xl overflow-hidden shadow-lg" style={{ maxWidth: 640 }}>
      <video ref={videoRef} src={src} className="w-full" controls />
    </div>
  );
}
