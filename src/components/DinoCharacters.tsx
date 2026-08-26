import React from 'react';
import { motion } from 'motion/react';

interface CharacterProps {
  className?: string;
  animateState?: 'idle' | 'walking' | 'dancing' | 'cheering' | 'landing' | 'peeking';
  onClick?: () => void;
  size?: number;
}

/**
 * Rexy the Friendly T-Rex Dinosaur
 */
export const DinoRex: React.FC<CharacterProps> = ({
  className = '',
  animateState = 'idle',
  onClick,
  size = 180,
}) => {
  return (
    <motion.div
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 1.15 }}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      animate={
        animateState === 'dancing'
          ? {
              y: [0, -18, 0, -12, 0],
              rotate: [-3, 4, -4, 3, 0],
              transition: { repeat: Infinity, duration: 0.75, ease: 'easeInOut' },
            }
          : animateState === 'walking'
          ? {
              x: [-10, 10, -10],
              y: [0, -8, 0],
              rotate: [-4, 4, -4],
              transition: { repeat: Infinity, duration: 0.6 },
            }
          : animateState === 'cheering'
          ? {
              scale: [1, 1.1, 1],
              y: [0, -25, 0],
              transition: { repeat: Infinity, duration: 0.5 },
            }
          : animateState === 'peeking'
          ? {
              rotate: [0, 8, -4, 0],
              transition: { repeat: Infinity, duration: 1.8 },
            }
          : {
              y: [0, -5, 0],
              transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
            }
      }
    >
      <svg viewBox="0 0 200 230" className="w-full h-full drop-shadow-xl" fill="none">
        <defs>
          <linearGradient id="dinoSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
          <linearGradient id="dinoBelly" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>

        {/* Tail */}
        <motion.path
          d="M 65 145 C 30 150, 10 180, 5 195 C 2 202, 12 205, 25 192 C 45 175, 65 168, 75 160 Z"
          fill="url(#dinoSkin)"
          animate={
            animateState === 'dancing' || animateState === 'cheering'
              ? { rotate: [0, 12, -8, 0], transformOrigin: '65px 150px' }
              : { rotate: [0, 5, -5, 0], transformOrigin: '65px 150px' }
          }
          transition={{ repeat: Infinity, duration: 1.2 }}
        />

        {/* Tail Spikes */}
        <polygon points="12,192 18,178 28,188" fill="#eab308" />
        <polygon points="35,176 42,162 52,172" fill="#eab308" />
        <polygon points="60,158 68,144 76,155" fill="#eab308" />

        {/* Back Spikes on Head & Spine */}
        <polygon points="110,38 120,24 130,39" fill="#eab308" />
        <polygon points="90,52 98,36 108,54" fill="#eab308" />
        <polygon points="75,75 80,60 92,76" fill="#eab308" />
        <polygon points="68,105 70,88 82,104" fill="#eab308" />

        {/* Back Leg (Left) */}
        <ellipse cx="85" cy="180" rx="16" ry="18" fill="#16a34a" />
        <rect x="75" y="190" width="22" height="18" rx="8" fill="#15803d" />
        <circle cx="78" cy="206" r="4" fill="#fef08a" />
        <circle cx="86" cy="207" r="4" fill="#fef08a" />
        <circle cx="94" cy="206" r="4" fill="#fef08a" />

        {/* Main Body */}
        <path
          d="M 75 90 C 85 75, 120 75, 140 95 C 160 115, 160 155, 145 178 C 130 195, 95 198, 80 180 C 65 160, 65 110, 75 90 Z"
          fill="url(#dinoSkin)"
        />

        {/* Cute Yellow Belly */}
        <path
          d="M 105 98 C 122 105, 145 125, 142 160 C 138 178, 120 188, 105 186 C 112 165, 115 130, 105 98 Z"
          fill="url(#dinoBelly)"
        />

        {/* Front Leg (Right) */}
        <ellipse cx="125" cy="178" rx="18" ry="20" fill="#22c55e" />
        <rect x="114" y="188" width="24" height="20" rx="9" fill="#16a34a" />
        <circle cx="118" cy="206" r="4.5" fill="#fef08a" />
        <circle cx="126" cy="207" r="4.5" fill="#fef08a" />
        <circle cx="134" cy="206" r="4.5" fill="#fef08a" />

        {/* Dino Head */}
        <path
          d="M 100 45 C 100 25, 130 20, 165 25 C 185 28, 192 45, 192 65 C 192 82, 175 92, 150 92 C 125 92, 100 80, 100 45 Z"
          fill="url(#dinoSkin)"
        />

        {/* Dino Cute Cheeks */}
        <ellipse cx="145" cy="68" rx="10" ry="6" fill="#f43f5e" opacity="0.4" />

        {/* Cute Big Eye */}
        <circle cx="135" cy="42" r="14" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
        <circle cx="138" cy="40" r="8" fill="#1e293b" />
        {/* Eye Shine */}
        <circle cx="141" cy="37" r="3.5" fill="#ffffff" />
        <circle cx="135" cy="44" r="1.5" fill="#ffffff" />

        {/* Friendly Snout and Nostril */}
        <circle cx="180" cy="48" r="2.5" fill="#15803d" />

        {/* Happy Toothy Smile */}
        <path d="M 148 66 Q 168 76 182 62" stroke="#15803d" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="158,68 162,75 166,69" fill="#ffffff" />
        <polygon points="168,70 172,77 176,68" fill="#ffffff" />

        {/* Tiny Front Cute Paw / Arm */}
        <motion.g
          animate={
            animateState === 'cheering' || animateState === 'dancing'
              ? { rotate: [-15, 25, -15], transformOrigin: '128px 115px' }
              : { rotate: [-5, 8, -5], transformOrigin: '128px 115px' }
          }
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          <path
            d="M 125 110 C 138 108, 155 118, 152 128 C 150 135, 138 132, 132 125 C 128 120, 122 118, 125 110 Z"
            fill="#22c55e"
            stroke="#15803d"
            strokeWidth="1.5"
          />
          <circle cx="151" cy="126" r="2" fill="#fef08a" />
          <circle cx="147" cy="130" r="2" fill="#fef08a" />
        </motion.g>

        {/* Party Hat */}
        <polygon points="120,24 135,-6 148,22" fill="url(#hatGrad)" />
        <circle cx="135" cy="-7" r="5" fill="#fef08a" />
        <path d="M 124,14 Q 135,18 144,13" stroke="#fde047" strokeWidth="3" fill="none" />
        <path d="M 128,4 Q 135,8 140,4" stroke="#60a5fa" strokeWidth="3" fill="none" />
      </svg>
    </motion.div>
  );
};

/**
 * Pop Star Inspired by Bruno Mars (Cartoon Funk Edition)
 */
export const PopStarBruno: React.FC<CharacterProps> = ({
  className = '',
  animateState = 'dancing',
  onClick,
  size = 170,
}) => {
  return (
    <motion.div
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 1.25 }}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={
        animateState === 'dancing'
          ? {
              y: [0, -12, 0, -8, 0],
              x: [-6, 6, -6],
              rotate: [-4, 4, -4],
              transition: { repeat: Infinity, duration: 0.65, ease: 'easeInOut' },
            }
          : {
              y: [0, -4, 0],
              transition: { repeat: Infinity, duration: 1.8 },
            }
      }
    >
      <svg viewBox="0 0 180 230" className="w-full h-full drop-shadow-xl" fill="none">
        <defs>
          <linearGradient id="jacketGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Dancing Legs */}
        <rect x="68" y="152" width="16" height="52" rx="6" fill="#1e293b" />
        <rect x="96" y="152" width="16" height="52" rx="6" fill="#1e293b" />
        {/* Shiny White/Gold Shoes */}
        <path d="M 60 200 L 86 200 L 86 210 L 56 210 Q 56 204 60 200 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M 94 200 L 120 200 Q 124 204 124 210 L 94 210 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

        {/* Silky Red & Gold Velvet Jacket / Body */}
        <path
          d="M 55 98 L 125 98 L 122 160 L 58 160 Z"
          fill="url(#jacketGold)"
          stroke="#7f1d1d"
          strokeWidth="2"
        />
        {/* Gold Chain / Necklace & Open Collar Shirt */}
        <polygon points="76,98 90,126 104,98" fill="#fef08a" />
        <path d="M 80,105 Q 90,122 100,105" stroke="#f59e0b" strokeWidth="3" fill="none" />
        <circle cx="90" cy="120" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />

        {/* Left Arm holding Golden Mic */}
        <motion.g
          animate={
            animateState === 'dancing'
              ? { rotate: [-10, 15, -10], transformOrigin: '55px 105px' }
              : {}
          }
          transition={{ repeat: Infinity, duration: 0.65 }}
        >
          <path d="M 58 105 L 36 130 L 48 145" stroke="#b91c1c" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Hand */}
          <circle cx="48" cy="145" r="7" fill="#b45309" />
          {/* Golden Microphone */}
          <rect x="42" y="148" width="6" height="22" rx="2" fill="#334155" />
          <circle cx="45" cy="144" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
          {/* Musical sparkle notes */}
          <path d="M 28 135 Q 24 130 30 126" stroke="#fbbf24" strokeWidth="2" fill="none" />
          <circle cx="28" cy="135" r="2.5" fill="#f59e0b" />
        </motion.g>

        {/* Right Arm (Dance Groove pose) */}
        <motion.g
          animate={
            animateState === 'dancing'
              ? { rotate: [15, -20, 15], transformOrigin: '125px 105px' }
              : {}
          }
          transition={{ repeat: Infinity, duration: 0.65 }}
        >
          <path d="M 122 105 L 148 118 L 140 142" stroke="#b91c1c" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="140" cy="142" r="7" fill="#b45309" />
          {/* Gold Ring */}
          <circle cx="142" cy="142" r="3" stroke="#fbbf24" strokeWidth="2" fill="none" />
        </motion.g>

        {/* Neck */}
        <rect x="80" y="80" width="20" height="20" rx="4" fill="#b45309" />

        {/* Head & Curly Hair */}
        <ellipse cx="90" cy="62" rx="22" ry="24" fill="#b45309" />
        {/* Afro curls around head */}
        <circle cx="70" cy="50" r="10" fill="#1e1b4b" />
        <circle cx="68" cy="64" r="9" fill="#1e1b4b" />
        <circle cx="110" cy="50" r="10" fill="#1e1b4b" />
        <circle cx="112" cy="64" r="9" fill="#1e1b4b" />
        <circle cx="90" cy="38" r="12" fill="#1e1b4b" />
        <circle cx="78" cy="40" r="10" fill="#1e1b4b" />
        <circle cx="102" cy="40" r="10" fill="#1e1b4b" />

        {/* Retro Aviator Sunglasses (Gold Frames) */}
        <rect x="70" y="52" width="18" height="14" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="2.5" />
        <rect x="92" y="52" width="18" height="14" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="2.5" />
        <line x1="88" y1="56" x2="92" y2="56" stroke="#f59e0b" strokeWidth="2.5" />
        {/* Lens Glint */}
        <line x1="73" y1="55" x2="80" y2="63" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="95" y1="55" x2="102" y2="63" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Funky Mustache & Smile */}
        <path d="M 82 72 Q 90 70 98 72" stroke="#18181b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 84 76 Q 90 82 96 76" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

        {/* Iconic White Fedora Hat with Leopard/Gold Ribbon */}
        <ellipse cx="90" cy="42" rx="34" ry="9" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M 68 40 C 68 18, 112 18, 112 40 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        {/* Hat Ribbon */}
        <path d="M 68 36 Q 90 39 112 36" stroke="#f59e0b" strokeWidth="6" fill="none" />
        <circle cx="90" cy="37" r="2" fill="#b45309" />
        <circle cx="82" cy="37" r="2" fill="#b45309" />
        <circle cx="98" cy="37" r="2" fill="#b45309" />
      </svg>
    </motion.div>
  );
};

/**
 * Cartoon Spider Superhero (Web-slinger Inspiration)
 */
export const SpiderHero: React.FC<CharacterProps> = ({
  className = '',
  animateState = 'landing',
  onClick,
  size = 170,
}) => {
  return (
    <motion.div
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 1.25 }}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={
        animateState === 'landing'
          ? {
              y: [-120, 0],
              scale: [0.7, 1.05, 1],
              transition: { duration: 0.65, ease: 'easeOut' },
            }
          : animateState === 'dancing' || animateState === 'cheering'
          ? {
              y: [0, -16, 0],
              rotate: [-5, 5, -5],
              transition: { repeat: Infinity, duration: 0.65 },
            }
          : {
              y: [0, -6, 0],
              transition: { repeat: Infinity, duration: 2.0 },
            }
      }
    >
      <svg viewBox="0 0 180 230" className="w-full h-full drop-shadow-xl" fill="none">
        {/* Web Line from top */}
        <line x1="90" y1="0" x2="90" y2="40" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.75" />

        {/* Hero Body / Suit */}
        {/* Legs in Heroic Crouching / Dynamic Stand */}
        <path d="M 62 145 L 42 185 L 34 205 L 56 205" stroke="#1d4ed8" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M 118 145 L 138 185 L 146 205 L 124 205" stroke="#1d4ed8" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Red Boots */}
        <path d="M 32 196 L 58 196 L 58 207 L 28 207 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
        <path d="M 122 196 L 148 196 L 152 207 L 122 207 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />

        {/* Torso */}
        <path d="M 64 96 L 116 96 L 110 152 L 70 152 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
        {/* Blue Side Panels */}
        <path d="M 64 100 L 74 100 L 72 152 L 68 152 Z" fill="#1d4ed8" />
        <path d="M 116 100 L 106 100 L 108 152 L 112 152 Z" fill="#1d4ed8" />

        {/* Spider Emblem on Chest */}
        <circle cx="90" cy="120" r="5" fill="#0f172a" />
        {/* 8 Spider legs */}
        <path d="M 90 118 Q 78 110 74 116" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 90 118 Q 102 110 106 116" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 90 120 Q 76 120 72 128" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 90 120 Q 104 120 108 128" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 90 122 Q 78 132 76 140" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 90 122 Q 102 132 104 140" stroke="#0f172a" strokeWidth="2" fill="none" />

        {/* Arms Shooting Web */}
        <motion.g
          animate={
            animateState === 'landing' || animateState === 'cheering'
              ? { rotate: [-10, 15, -10], transformOrigin: '65px 105px' }
              : {}
          }
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <path d="M 66 102 L 35 125 L 30 110" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="30" cy="110" r="6" fill="#dc2626" />
          {/* Web shooter blast */}
          <path d="M 28 108 L 12 90 L 4 82" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
          <polygon points="12,90 2,80 14,76" fill="#ffffff" opacity="0.8" />
        </motion.g>

        <motion.g
          animate={
            animateState === 'landing' || animateState === 'cheering'
              ? { rotate: [10, -15, 10], transformOrigin: '115px 105px' }
              : {}
          }
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <path d="M 114 102 L 145 125 L 150 110" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="150" cy="110" r="6" fill="#dc2626" />
        </motion.g>

        {/* Head Mask */}
        <ellipse cx="90" cy="62" rx="26" ry="28" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />

        {/* Web pattern lines on mask */}
        <path d="M 90 34 L 90 90" stroke="#b91c1c" strokeWidth="1.5" opacity="0.6" />
        <path d="M 64 62 L 116 62" stroke="#b91c1c" strokeWidth="1.5" opacity="0.6" />
        <path d="M 72 42 Q 90 52 108 42" stroke="#b91c1c" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M 70 78 Q 90 68 110 78" stroke="#b91c1c" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* Large Iconic Superhero Eyes */}
        <path
          d="M 68 54 Q 82 48 87 64 Q 78 72 68 62 Z"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="3.5"
        />
        <path
          d="M 112 54 Q 98 48 93 64 Q 102 72 112 62 Z"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="3.5"
        />
      </svg>
    </motion.div>
  );
};

/**
 * Pixel Hero (Minecraft Steve Inspiration)
 */
export const PixelSteve: React.FC<CharacterProps> = ({
  className = '',
  animateState = 'walking',
  onClick,
  size = 165,
}) => {
  return (
    <motion.div
      className={`relative inline-block cursor-pointer select-none ${className}`}
      style={{ width: size, height: size * 1.25 }}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      animate={
        animateState === 'walking' || animateState === 'dancing'
          ? {
              y: [0, -10, 0],
              transition: { repeat: Infinity, duration: 0.55 },
            }
          : {
              y: [0, -4, 0],
              transition: { repeat: Infinity, duration: 2.0 },
            }
      }
    >
      <svg viewBox="0 0 180 230" className="w-full h-full drop-shadow-xl" fill="none">
        {/* Pixel Block Style Body */}
        {/* Legs (Indigo Block Pants) */}
        <motion.rect
          x="68"
          y="152"
          width="20"
          height="48"
          fill="#2563eb"
          stroke="#1e3a8a"
          strokeWidth="2"
          animate={
            animateState === 'walking' || animateState === 'dancing'
              ? { y: [0, -6, 0] }
              : {}
          }
          transition={{ repeat: Infinity, duration: 0.55 }}
        />
        <motion.rect
          x="92"
          y="152"
          width="20"
          height="48"
          fill="#1d4ed8"
          stroke="#1e3a8a"
          strokeWidth="2"
          animate={
            animateState === 'walking' || animateState === 'dancing'
              ? { y: [-6, 0, -6] }
              : {}
          }
          transition={{ repeat: Infinity, duration: 0.55 }}
        />

        {/* Gray Block Shoes */}
        <rect x="68" y="200" width="20" height="12" fill="#475569" />
        <rect x="92" y="200" width="20" height="12" fill="#334155" />

        {/* Torso (Cyan / Turquoise Shirt) */}
        <rect x="62" y="96" width="56" height="58" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
        {/* Shirt Neck Cut */}
        <polygon points="82,96 90,110 98,96" fill="#a16207" />

        {/* Left Arm */}
        <motion.g
          animate={
            animateState === 'walking' || animateState === 'dancing'
              ? { rotate: [-20, 20, -20], transformOrigin: '62px 96px' }
              : {}
          }
          transition={{ repeat: Infinity, duration: 0.55 }}
        >
          <rect x="42" y="96" width="18" height="24" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />
          <rect x="42" y="120" width="18" height="34" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />
        </motion.g>

        {/* Right Arm Holding Birthday Cake Block */}
        <motion.g
          animate={
            animateState === 'walking' || animateState === 'dancing'
              ? { rotate: [20, -20, 20], transformOrigin: '118px 96px' }
              : {}
          }
          transition={{ repeat: Infinity, duration: 0.55 }}
        >
          <rect x="120" y="96" width="18" height="24" fill="#06b6d4" stroke="#0891b2" strokeWidth="1.5" />
          <rect x="120" y="120" width="18" height="34" fill="#d97706" stroke="#b45309" strokeWidth="1.5" />

          {/* Minecraft Pixel Birthday Cake in Hand */}
          <g transform="translate(110, 85)">
            {/* Cake Base */}
            <rect x="0" y="14" width="36" height="22" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
            {/* Frosting / Icing */}
            <rect x="0" y="10" width="36" height="8" fill="#f8fafc" />
            <rect x="4" y="18" width="6" height="4" fill="#f8fafc" />
            <rect x="16" y="18" width="6" height="5" fill="#f8fafc" />
            <rect x="28" y="18" width="5" height="3" fill="#f8fafc" />
            {/* Red sprinkles */}
            <rect x="6" y="12" width="3" height="3" fill="#ef4444" />
            <rect x="18" y="12" width="3" height="3" fill="#ef4444" />
            <rect x="26" y="12" width="3" height="3" fill="#ef4444" />
            {/* Candle */}
            <rect x="16" y="0" width="4" height="10" fill="#facc15" />
            {/* Flickering Flame */}
            <circle cx="18" cy="-2" r="3.5" fill="#f97316" className="animate-ping" />
            <circle cx="18" cy="-2" r="2.5" fill="#fef08a" />
          </g>
        </motion.g>

        {/* Head (Pixel Block Head) */}
        <rect x="60" y="36" width="60" height="60" fill="#d97706" stroke="#b45309" strokeWidth="2" />

        {/* Dark Brown Pixel Hair */}
        <rect x="60" y="36" width="60" height="16" fill="#451a03" />
        <rect x="60" y="52" width="10" height="14" fill="#451a03" />
        <rect x="110" y="52" width="10" height="14" fill="#451a03" />
        <rect x="70" y="52" width="10" height="6" fill="#451a03" />
        <rect x="100" y="52" width="10" height="6" fill="#451a03" />

        {/* Pixel Eyes (White + Blue/Indigo Pupil) */}
        <rect x="68" y="64" width="8" height="8" fill="#ffffff" />
        <rect x="76" y="64" width="8" height="8" fill="#4338ca" />

        <rect x="96" y="64" width="8" height="8" fill="#4338ca" />
        <rect x="104" y="64" width="8" height="8" fill="#ffffff" />

        {/* Pixel Nose */}
        <rect x="84" y="72" width="12" height="6" fill="#b45309" />

        {/* Pixel Beard / Smile */}
        <rect x="80" y="80" width="20" height="6" fill="#78350f" />
        <rect x="84" y="86" width="12" height="4" fill="#ffffff" />
      </svg>
    </motion.div>
  );
};

/**
 * Flying Pterodactyl Dinosaur
 */
export const Pterodactyl: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 110,
}) => {
  return (
    <motion.div
      className={`absolute select-none pointer-events-none ${className}`}
      style={{ width: size, height: size * 0.7 }}
      animate={{
        y: [0, -15, 5, 0],
        rotate: [-4, 6, -3],
      }}
      transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 140 90" className="w-full h-full drop-shadow-md" fill="none">
        {/* Wings */}
        <motion.path
          d="M 20 50 Q 70 10 120 50 Q 70 40 20 50 Z"
          fill="#f97316"
          stroke="#c2410c"
          strokeWidth="2"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 0.5, ease: 'easeInOut' }}
        />
        {/* Body */}
        <ellipse cx="70" cy="46" rx="18" ry="10" fill="#fb923c" />
        {/* Head with Crest */}
        <polygon points="82,42 112,30 84,36" fill="#ea580c" />
        <circle cx="86" cy="42" r="8" fill="#fb923c" />
        <circle cx="89" cy="40" r="3" fill="#ffffff" />
        <circle cx="90" cy="40" r="1.5" fill="#0f172a" />
        {/* Beak */}
        <polygon points="90,44 116,48 90,48" fill="#facc15" />
      </svg>
    </motion.div>
  );
};
