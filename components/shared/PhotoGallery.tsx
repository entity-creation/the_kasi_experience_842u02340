'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '../themes/ThemeProvider';

interface PhotoGalleryProps {
  photos: string[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const { theme } = useTheme();
  const { components: { photos: photoConfig }, colors } = theme;
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [kenBurnsIndex, setKenBurnsIndex] = useState(0);

  const visible = photos.slice(0, photoConfig.maxPerPage);

  // Ken Burns: full-screen rotating slideshow for cinematic.
  // Each photo displays for SLIDE_DURATION ms, then cross-fades to the next.
  // We use a useEffect timer rather than onAnimationComplete to avoid
  // double-firing (AnimatePresence triggers onAnimationComplete for both
  // enter and exit animations, which caused photos to be skipped).
  const SLIDE_DURATION = 5000; // ms each photo is shown before cross-fade

  useEffect(() => {
    if (photoConfig.transition !== 'kenBurns' || visible.length <= 1) return;
    const id = setInterval(() => {
      setKenBurnsIndex(i => (i + 1) % visible.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [visible.length, photoConfig.transition]);

  if (photoConfig.transition === 'kenBurns') {
    return (
      <div className="relative w-full overflow-hidden" style={{ height: '80vh' }}>
        {/* Render ALL slides stacked; only the current one is visible.
            This avoids AnimatePresence mode="wait" swallowing photos. */}
        {visible.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === kenBurnsIndex ? 1 : 0,
              scale:   i === kenBurnsIndex ? 1.08 : 1,
              zIndex:  i === kenBurnsIndex ? 1 : 0,
            }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          >
            <Image
              src={src}
              alt={`Memory ${i + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        ))}

        {/* Slide counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {visible.map((_, i) => (
            <button
              key={i}
              onClick={() => setKenBurnsIndex(i)}
              className="transition-all rounded-full"
              style={{
                width:   i === kenBurnsIndex ? 20 : 6,
                height:  6,
                background: i === kenBurnsIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Polaroid frame style
  if (photoConfig.frameStyle === 'polaroid') {
    return (
      <>
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {visible.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: Math.random() * 8 - 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
              className="cursor-pointer bg-white p-3 pb-8 shadow-xl"
              style={{ width: 180, boxShadow: `0 8px 32px ${colors.shadow}` }}
              onClick={() => setLightbox(src)}
            >
              <div className="relative w-full" style={{ height: 140 }}>
                <Image src={src} alt={`Memory ${i + 1}`} fill className="object-cover" unoptimized />
              </div>
            </motion.div>
          ))}
        </div>
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      </>
    );
  }

  // Spotlight style (luxury)
  if (photoConfig.frameStyle === 'spotlight') {
    return (
      <>
        <div className="grid gap-8 px-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {visible.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative overflow-hidden cursor-pointer"
              style={{ height: 220 }}
              whileHover={{ boxShadow: `0 0 60px ${colors.accent}44` }}
              onClick={() => setLightbox(src)}
            >
              <Image src={src} alt={`Memory ${i + 1}`} fill className="object-cover" unoptimized />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, transparent 40%, ${colors.background}CC 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      </>
    );
  }

  // Tilted sticker style (playful)
  if (photoConfig.frameStyle === 'tilted') {
    return (
      <>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {visible.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 1) }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg border-4 border-white"
              style={{ width: 160, height: 120 }}
              onClick={() => setLightbox(src)}
            >
              <Image src={src} alt={`Memory ${i + 1}`} fill className="object-cover" unoptimized />
            </motion.div>
          ))}
        </div>
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      </>
    );
  }

  // Default: clean rounded grid
  return (
    <>
      <div className="grid gap-4 px-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {visible.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={photoConfig.hoverEffect === 'zoom'
              ? { scale: 1.04 }
              : photoConfig.hoverEffect === 'glow'
              ? { boxShadow: `0 0 32px ${colors.accent}66` }
              : {}}
            className="relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ height: 200 }}
            onClick={() => setLightbox(src)}
          >
            <Image src={src} alt={`Memory ${i + 1}`} fill className="object-cover" unoptimized />
          </motion.div>
        ))}
      </div>
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────
function Lightbox({ src, onClose }: { src: string | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
            className="relative max-w-4xl max-h-[85vh] w-full mx-4"
            style={{ aspectRatio: '4/3' }}
          >
            <Image src={src} alt="Full view" fill className="object-contain" unoptimized />
          </motion.div>
          <button
            className="absolute top-6 right-8 text-white text-4xl font-thin opacity-70 hover:opacity-100"
            onClick={onClose}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}