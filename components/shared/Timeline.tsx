'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '../themes/ThemeProvider';
import { TimelineEvent } from '../types';

interface TimelineProps {
  events: TimelineEvent[];
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const { theme } = useTheme();
  const { colors } = theme;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-start gap-8 mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex-1 rounded-2xl p-6 shadow-md"
        style={{ background: colors.surface, border: `1px solid ${colors.accent}22` }}
      >
        <p className="text-xs tracking-widest uppercase mb-1 opacity-50" style={{ color: colors.accent }}>
          {event.date}
        </p>
        <p className="text-lg font-semibold mb-2" style={{ fontFamily: theme.typography.headingFont, color: colors.text }}>
          {event.title}
        </p>
        {event.description && (
          <p className="text-sm opacity-70" style={{ fontFamily: theme.typography.bodyFont, color: colors.text }}>
            {event.description}
          </p>
        )}
        {event.media && (
          <div className="relative mt-3 rounded-lg overflow-hidden" style={{ height: 140 }}>
            <Image src={event.media} alt={event.title} fill className="object-cover" unoptimized />
          </div>
        )}
      </motion.div>

      {/* Timeline spine dot */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 32 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-4 h-4 rounded-full"
          style={{
            background: colors.accent,
            boxShadow: `0 0 12px ${colors.accent}66`,
          }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1" />
    </div>
  );
}

export function Timeline({ events }: TimelineProps) {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8">
      {/* Vertical line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
        style={{ background: `linear-gradient(to bottom, transparent, ${colors.accent}44, transparent)` }}
      />

      {events.map((event, i) => (
        <TimelineItem key={i} event={event} index={i} />
      ))}
    </div>
  );
}
