'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../themes/ThemeProvider';

interface SpinWheelProps {
  items: string[];
  onResult?: (item: string) => void;
}

export function SpinWheel({ items, onResult }: SpinWheelProps) {
  const { theme } = useTheme();
  const { colors } = theme;
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const spinCountRef = useRef(0);

  const segmentAngle = 360 / items.length;

  // Color palette for segments
  const segColors = [
    colors.primary, colors.secondary, colors.accent + '88',
    colors.primary + 'cc', colors.secondary + 'cc', colors.accent + '55',
  ];

  const spin = () => {
    if (spinning || result) return;
    setSpinning(true);
    spinCountRef.current += 1;

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const targetSegment = Math.floor(Math.random() * items.length);
    const targetAngle = 360 * extraSpins + targetSegment * segmentAngle + segmentAngle / 2;
    const newRotation = rotation + targetAngle;

    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(items[targetSegment]);
      onResult?.(items[targetSegment]);
    }, 4200);
  };

  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  // Build SVG pie segments
  const segments = items.map((item, i) => {
    const startAngle = ((i * segmentAngle - 90) * Math.PI) / 180;
    const endAngle = (((i + 1) * segmentAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const midAngle = ((i * segmentAngle + segmentAngle / 2 - 90) * Math.PI) / 180;
    const textX = cx + (r * 0.65) * Math.cos(midAngle);
    const textY = cy + (r * 0.65) * Math.sin(midAngle);
    const largeArc = segmentAngle > 180 ? 1 : 0;

    return (
      <g key={i}>
        <path
          d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
          fill={segColors[i % segColors.length]}
          stroke={colors.surface}
          strokeWidth="2"
        />
        <text
          x={textX}
          y={textY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontFamily={theme.typography.bodyFont}
          fill={colors.text}
          transform={`rotate(${i * segmentAngle + segmentAngle / 2}, ${textX}, ${textY})`}
          style={{ maxWidth: 60 }}
        >
          {item.length > 10 ? item.slice(0, 9) + '…' : item}
        </text>
      </g>
    );
  });

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Pointer */}
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className="absolute z-10"
          style={{
            top: -10, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `24px solid ${colors.accent}`,
            filter: `drop-shadow(0 2px 4px ${colors.shadow})`,
          }}
        />
        <motion.svg
          width={size}
          height={size}
          style={{ transform: `rotate(${rotation}deg)` }}
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.17, 0.67, 0.12, 0.99] }}
        >
          {segments}
          {/* Center circle */}
          <circle cx={cx} cy={cy} r={18} fill={colors.surface} stroke={colors.accent} strokeWidth="2" />
        </motion.svg>
      </div>

      {/* Spin button */}
      {!result && (
        <motion.button
          onClick={spin}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          disabled={spinning}
          className="px-8 py-3 rounded-full text-sm tracking-wider uppercase transition-all"
          style={{
            background: spinning ? colors.secondary : colors.accent,
            color: colors.surface,
            fontFamily: theme.typography.bodyFont,
            opacity: spinning ? 0.7 : 1,
            cursor: spinning ? 'not-allowed' : 'pointer',
          }}
        >
          {spinning ? 'Spinning…' : 'Spin the Wheel'}
        </motion.button>
      )}

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="text-center px-8 py-5 rounded-2xl shadow-lg"
          style={{ background: colors.surface, border: `2px solid ${colors.accent}` }}
        >
          <p className="text-sm opacity-50 mb-1 tracking-widest uppercase">You won</p>
          <p className="text-xl font-semibold" style={{ fontFamily: theme.typography.headingFont, color: colors.accent }}>
            {result}
          </p>
        </motion.div>
      )}
    </div>
  );
}
