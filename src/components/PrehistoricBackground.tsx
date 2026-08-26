import React from 'react';
import { motion } from 'motion/react';

export const PrehistoricBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky Gradient with Sun */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-amber-200 to-emerald-200" />

      {/* Sunburst Rays in Sky */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-amber-300/40 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
      <div className="absolute top-8 right-12 w-24 h-24 rounded-full bg-amber-300 shadow-[0_0_60px_rgba(251,191,36,0.8)] border-4 border-amber-100" />

      {/* Floating Clouds */}
      <motion.div
        className="absolute top-12 left-6 opacity-80"
        animate={{ x: [-20, 40, -20] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
      >
        <svg width="120" height="50" viewBox="0 0 120 50" fill="#ffffff">
          <ellipse cx="40" cy="30" rx="30" ry="18" />
          <ellipse cx="70" cy="24" rx="25" ry="20" />
          <ellipse cx="95" cy="32" rx="20" ry="14" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-20 right-48 opacity-75 hidden sm:block"
        animate={{ x: [30, -30, 30] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
      >
        <svg width="140" height="60" viewBox="0 0 140 60" fill="#ffffff">
          <ellipse cx="45" cy="35" rx="35" ry="20" />
          <ellipse cx="80" cy="28" rx="30" ry="24" />
          <ellipse cx="110" cy="36" rx="22" ry="16" />
        </svg>
      </motion.div>

      {/* Distant Mountains & Prehistoric Smoking Volcano */}
      <div className="absolute bottom-32 w-full flex justify-between items-end px-2">
        {/* Distant Blue/Teal Mountains */}
        <svg viewBox="0 0 500 160" className="w-2/3 h-36 opacity-60" fill="none">
          <polygon points="0,160 80,40 180,160" fill="#0284c7" />
          <polygon points="120,160 220,20 340,160" fill="#0369a1" />
          <polygon points="280,160 380,50 480,160" fill="#075985" />
          {/* Snow/Light Caps */}
          <polygon points="70,55 80,40 90,55 80,50" fill="#e0f2fe" />
          <polygon points="208,36 220,20 232,36 220,30" fill="#e0f2fe" />
        </svg>

        {/* Volcano on Right */}
        <div className="relative w-44 h-40">
          <svg viewBox="0 0 160 140" className="w-full h-full" fill="none">
            {/* Mountain Body */}
            <polygon points="10,140 65,30 95,30 150,140" fill="#78350f" />
            <polygon points="25,140 68,30 92,30 135,140" fill="#92400e" />
            {/* Crater */}
            <ellipse cx="80" cy="30" rx="16" ry="6" fill="#451a03" />
            {/* Lava Flow Lines */}
            <path d="M 74 32 Q 70 60 64 85" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
            <path d="M 86 32 Q 90 55 94 75" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
            <path d="M 80 32 L 80 50" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            {/* Crater Lava Glow */}
            <ellipse cx="80" cy="30" rx="12" ry="4" fill="#ef4444" className="animate-pulse" />
          </svg>

          {/* Animated Heart/Puff Smoke from Volcano */}
          <motion.div
            className="absolute -top-12 left-14"
            animate={{
              y: [-10, -50],
              x: [0, 18],
              scale: [0.5, 1.4],
              opacity: [0.9, 0],
            }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeOut' }}
          >
            <div className="w-8 h-8 rounded-full bg-slate-300/80 shadow-md blur-[1px]" />
          </motion.div>

          <motion.div
            className="absolute -top-10 left-16"
            animate={{
              y: [-5, -60],
              x: [0, 24],
              scale: [0.6, 1.6],
              opacity: [0.8, 0],
            }}
            transition={{ repeat: Infinity, duration: 3.8, delay: 1.5, ease: 'easeOut' }}
          >
            <div className="w-10 h-10 rounded-full bg-slate-200/70 shadow-md blur-[1px]" />
          </motion.div>
        </div>
      </div>

      {/* Middle Green Hills */}
      <div className="absolute bottom-20 w-full">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="w-full h-28 fill-emerald-600/90">
          <path d="M 0 60 Q 250 10 500 50 T 1000 30 L 1000 120 L 0 120 Z" />
        </svg>
      </div>

      {/* Foreground Prehistoric Jungle Floor & Giant Ferns */}
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1000 140" preserveAspectRatio="none" className="w-full h-32 fill-emerald-700">
          <path d="M 0 40 Q 300 80 600 30 T 1000 50 L 1000 140 L 0 140 Z" />
        </svg>

        {/* Grass Texture & Prehistoric Flowers */}
        <div className="absolute bottom-2 w-full h-10 bg-emerald-800 flex justify-around items-center px-4">
          <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-emerald-900" />
          <div className="w-4 h-4 rounded-full bg-rose-400 border-2 border-emerald-900" />
          <div className="w-8 h-4 bg-emerald-900 rounded-t-full" />
          <div className="w-5 h-5 rounded-full bg-pink-400 border-2 border-emerald-900" />
          <div className="w-6 h-6 rounded-full bg-cyan-300 border-2 border-emerald-900" />
        </div>
      </div>

      {/* Jungle Palm Trees / Giant Prehistoric Leaves on Edges */}
      {/* Left Palm */}
      <div className="absolute -bottom-6 -left-8 w-44 h-72 pointer-events-none select-none z-10 opacity-95">
        <svg viewBox="0 0 160 220" className="w-full h-full" fill="none">
          {/* Trunk */}
          <path d="M 40 220 Q 55 120 75 70" stroke="#78350f" strokeWidth="18" strokeLinecap="round" />
          <path d="M 40 220 Q 55 120 75 70" stroke="#92400e" strokeWidth="12" strokeLinecap="round" />
          {/* Giant Fronds */}
          <path d="M 75 70 Q 20 20 -10 60" stroke="#15803d" strokeWidth="14" strokeLinecap="round" />
          <path d="M 75 70 Q 60 0 40 -20" stroke="#16a34a" strokeWidth="12" strokeLinecap="round" />
          <path d="M 75 70 Q 120 10 150 40" stroke="#22c55e" strokeWidth="13" strokeLinecap="round" />
          <path d="M 75 70 Q 110 50 140 90" stroke="#15803d" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>

      {/* Right Palm */}
      <div className="absolute -bottom-6 -right-8 w-44 h-72 pointer-events-none select-none z-10 opacity-95">
        <svg viewBox="0 0 160 220" className="w-full h-full" fill="none">
          {/* Trunk */}
          <path d="M 120 220 Q 105 120 85 70" stroke="#78350f" strokeWidth="18" strokeLinecap="round" />
          <path d="M 120 220 Q 105 120 85 70" stroke="#92400e" strokeWidth="12" strokeLinecap="round" />
          {/* Giant Fronds */}
          <path d="M 85 70 Q 140 20 170 60" stroke="#15803d" strokeWidth="14" strokeLinecap="round" />
          <path d="M 85 70 Q 100 0 120 -20" stroke="#16a34a" strokeWidth="12" strokeLinecap="round" />
          <path d="M 85 70 Q 40 10 10 40" stroke="#22c55e" strokeWidth="13" strokeLinecap="round" />
          <path d="M 85 70 Q 50 50 20 90" stroke="#15803d" strokeWidth="12" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
