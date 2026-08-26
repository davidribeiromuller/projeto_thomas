import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audioEngine } from '../services/audioEngine';

interface BalloonItem {
  id: number;
  left: number;
  color: string;
  size: number;
  speed: number;
  stringLength: number;
  delay: number;
}

const BALLOON_COLORS = [
  '#ef4444', // Red
  '#22c55e', // Dino Green
  '#3b82f6', // Spider Blue
  '#eab308', // Gold Yellow
  '#ec4899', // Pink
  '#a855f7', // Purple
  '#06b6d4', // Steve Cyan
  '#f97316', // Orange
];

export const InteractiveBalloons: React.FC<{ active?: boolean; maxBalloons?: number }> = ({
  active = true,
  maxBalloons = 12,
}) => {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!active) {
      setBalloons([]);
      return;
    }

    // Generate balanced random balloons
    const list: BalloonItem[] = [];
    for (let i = 0; i < maxBalloons; i++) {
      list.push({
        id: Date.now() + i,
        left: 5 + Math.random() * 88,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        size: 54 + Math.random() * 26,
        speed: 12 + Math.random() * 10,
        stringLength: 35 + Math.random() * 20,
        delay: Math.random() * 6,
      });
    }
    setBalloons(list);
  }, [active, maxBalloons]);

  const handlePop = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (poppedIds.has(id)) return;

    audioEngine.playBalloonPop();
    setPoppedIds((prev) => new Set([...prev, id]));

    // Respawn balloon after 4s
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                id: Date.now() + Math.random(),
                left: 5 + Math.random() * 88,
                color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
                delay: 0,
              }
            : b
        )
      );
      setPoppedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 4000);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <AnimatePresence>
        {balloons.map((b) => {
          if (poppedIds.has(b.id)) return null;

          return (
            <motion.div
              key={b.id}
              className="absolute pointer-events-auto cursor-pointer select-none"
              style={{
                left: `${b.left}%`,
                bottom: '-120px',
                width: b.size,
                height: b.size * 1.25 + b.stringLength,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{
                y: '-130vh',
                x: [0, 14, -14, 0],
                rotate: [-6, 6, -6],
                opacity: [0, 1, 1, 0.9, 0],
              }}
              transition={{
                y: {
                  duration: b.speed,
                  repeat: Infinity,
                  delay: b.delay,
                  ease: 'linear',
                },
                x: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: b.speed,
                  repeat: Infinity,
                  delay: b.delay,
                },
              }}
              onClick={(e) => handlePop(b.id, e)}
              onTouchStart={(e) => handlePop(b.id, e)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-lg" fill="none">
                <defs>
                  <radialGradient id={`balloonGleam-${b.id}`} cx="35%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                    <stop offset="40%" stopColor={b.color} />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                  </radialGradient>
                </defs>
                {/* Balloon Body */}
                <ellipse cx="50" cy="50" rx="40" ry="48" fill={b.color} />
                <ellipse cx="50" cy="50" rx="40" ry="48" fill={`url(#balloonGleam-${b.id})`} />

                {/* Knot */}
                <polygon points="46,96 54,96 52,102 48,102" fill={b.color} />

                {/* String with curve */}
                <path
                  d="M 50 102 Q 44 118 54 132 Q 46 142 50 150"
                  stroke="#cbd5e1"
                  strokeWidth="1.8"
                  fill="none"
                  strokeDasharray="2 1"
                />
              </svg>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
