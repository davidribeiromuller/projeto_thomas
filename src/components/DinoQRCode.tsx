import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import QRCode from 'qrcode';
import { Sparkles, Play, Copy, Check, Printer, Settings, Share2, Volume2, VolumeX } from 'lucide-react';
import { AppConfig } from '../types';
import { DinoRex } from './DinoCharacters';
import { audioEngine } from '../services/audioEngine';

interface DinoQRCodeProps {
  config: AppConfig;
  onStartSurprise: () => void;
}

export const DinoQRCode: React.FC<DinoQRCodeProps> = ({
  config,
  onStartSurprise,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(audioEngine.getMuted());
  const [targetUrl, setTargetUrl] = useState('');

  // Compute final QR target link (100% public, zero login required)
  useEffect(() => {
    let base = config.customUrl.trim();
    if (!base) {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('mode', 'surprise');
        base = url.toString();
      } else {
        base = 'https://ais-pre-rtc52utxtbqra4ouh22ov2-596868878915.us-west2.run.app?mode=surprise';
      }
    } else {
      try {
        const url = new URL(base);
        if (!url.searchParams.has('mode')) {
          url.searchParams.set('mode', 'surprise');
        }
        base = url.toString();
      } catch {
        // If relative or raw
      }
    }
    setTargetUrl(base);
  }, [config.customUrl]);

  // Render High Quality Scannable QR Code
  useEffect(() => {
    if (!canvasRef.current || !targetUrl) return;

    QRCode.toCanvas(
      canvasRef.current,
      targetUrl,
      {
        width: 260,
        margin: 2, // Sufficient quiet zone for high scannability
        color: {
          dark: '#0f172a', // Deep slate high contrast
          light: '#ffffff', // Pure white background
        },
        errorCorrectionLevel: 'H', // High error resilience
      },
      (error) => {
        if (error) console.error('Error generating QR code:', error);
      }
    );
  }, [targetUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleToggleAudio = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioEngine.playCuteDinoRoar();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-slate-100 flex flex-col justify-between items-center px-4 py-6 relative overflow-hidden">
      {/* Background Animated Starlight / Dino Spores */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-emerald-500 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-amber-500 blur-3xl" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-lg flex justify-between items-center z-10">
        <div className="flex items-center gap-2 bg-emerald-900/60 backdrop-blur-md border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Surpresa de Aniversário 🎂 • 6 Anos!</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleAudio}
            title={isMuted ? 'Ativar som' : 'Silenciar'}
            className="p-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white transition shadow-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Roaming Mini Dinosaurs at Top/Sides */}
      <motion.div
        className="absolute top-20 -left-10 select-none pointer-events-none z-0"
        animate={{ x: [-50, 450] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
      >
        <span className="text-3xl opacity-40">🦖</span>
      </motion.div>

      {/* Main Cute Dino QR Poster Container */}
      <main className="w-full max-w-md my-auto flex flex-col items-center z-10">
        {/* Upper Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/40 text-amber-300 text-sm md:text-base font-bold px-4 py-1.5 rounded-full mb-2 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Escaneie para desbloquear uma surpresa 🦖</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white drop-shadow-md">
            Surpresa do <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">{config.birthdayName}</span>!
          </h1>
          <p className="text-amber-400 font-bold text-sm sm:text-base mt-0.5">
            🎉 Feliz 6 anos!! 🦖
          </p>
        </motion.div>

        {/* CUSTOM DINOSAUR FRAMED QR CODE */}
        <motion.div
          className="relative bg-gradient-to-b from-emerald-600 via-emerald-700 to-emerald-800 p-6 sm:p-7 rounded-3xl shadow-[0_20px_50px_rgba(5,150,105,0.35)] border-4 border-emerald-400/80 flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 18, stiffness: 120 }}
          whileHover={{ scale: 1.015 }}
        >
          {/* Cute Dinosaur Head Peeking Over Top */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 h-16 pointer-events-none select-none z-20">
            <svg viewBox="0 0 120 70" className="w-full h-full drop-shadow-lg" fill="none">
              {/* Dino Head Shape */}
              <path
                d="M 20 70 C 15 35, 30 10, 60 10 C 90 10, 105 35, 100 70 Z"
                fill="#22c55e"
                stroke="#15803d"
                strokeWidth="3"
              />
              {/* Spikes on Top of Head */}
              <polygon points="40,14 48,0 56,12" fill="#eab308" />
              <polygon points="62,12 70,0 78,14" fill="#eab308" />

              {/* Eyes */}
              <circle cx="42" cy="36" r="10" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
              <circle cx="44" cy="34" r="5.5" fill="#0f172a" />
              <circle cx="46" cy="32" r="2.5" fill="#ffffff" />

              <circle cx="78" cy="36" r="10" fill="#ffffff" stroke="#15803d" strokeWidth="2" />
              <circle cx="76" cy="34" r="5.5" fill="#0f172a" />
              <circle cx="78" cy="32" r="2.5" fill="#ffffff" />

              {/* Rosy Cheeks */}
              <ellipse cx="32" cy="48" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />
              <ellipse cx="88" cy="48" rx="5" ry="3" fill="#f43f5e" opacity="0.6" />

              {/* Nostrils */}
              <circle cx="56" cy="46" r="1.5" fill="#15803d" />
              <circle cx="64" cy="46" r="1.5" fill="#15803d" />

              {/* Tiny Smile */}
              <path d="M 52 54 Q 60 62 68 54" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Left Paws Grasping Frame */}
          <div className="absolute top-1/3 -left-5 w-8 h-12 pointer-events-none select-none z-20">
            <svg viewBox="0 0 30 50" className="w-full h-full" fill="none">
              <path d="M 30 5 C 10 5, 0 18, 0 25 C 0 32, 10 45, 30 45 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
              <circle cx="8" cy="18" r="3" fill="#fef08a" />
              <circle cx="6" cy="25" r="3" fill="#fef08a" />
              <circle cx="8" cy="32" r="3" fill="#fef08a" />
            </svg>
          </div>

          {/* Right Paws Grasping Frame */}
          <div className="absolute top-1/3 -right-5 w-8 h-12 pointer-events-none select-none z-20">
            <svg viewBox="0 0 30 50" className="w-full h-full" fill="none">
              <path d="M 0 5 C 20 5, 30 18, 30 25 C 30 32, 20 45, 0 45 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
              <circle cx="22" cy="18" r="3" fill="#fef08a" />
              <circle cx="24" cy="25" r="3" fill="#fef08a" />
              <circle cx="22" cy="32" r="3" fill="#fef08a" />
            </svg>
          </div>

          {/* Dino Tail Curling at Bottom Right */}
          <div className="absolute -bottom-7 -right-8 w-20 h-20 pointer-events-none select-none z-0">
            <svg viewBox="0 0 80 80" className="w-full h-full" fill="none">
              <path
                d="M 10 20 C 30 15, 65 30, 70 55 C 75 75, 45 78, 35 60 C 28 48, 15 35, 10 20 Z"
                fill="#22c55e"
                stroke="#15803d"
                strokeWidth="2.5"
              />
              <polygon points="58,34 68,24 66,38" fill="#eab308" />
              <polygon points="70,52 80,48 74,60" fill="#eab308" />
            </svg>
          </div>

          {/* Little Cute Dino Footprints Stamped in corners */}
          <div className="absolute top-3 left-3 opacity-70 rotate-[-25deg] pointer-events-none">
            <FootprintIcon />
          </div>
          <div className="absolute top-3 right-3 opacity-70 rotate-[25deg] pointer-events-none">
            <FootprintIcon />
          </div>
          <div className="absolute bottom-3 left-3 opacity-70 rotate-[15deg] pointer-events-none">
            <FootprintIcon />
          </div>

          {/* Crisp White High-Contrast Box for QR Code (High Scannability) */}
          <div className="relative bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center border-2 border-emerald-200">
            <canvas ref={canvasRef} className="rounded-xl block max-w-[240px] sm:max-w-[260px] w-full h-auto" />
            {/* Center Dino Logo Badge inside QR Code */}
            <div className="absolute w-10 h-10 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-lg pointer-events-none">
              🦖
            </div>
          </div>

          {/* Bottom Dinosaur Stamp / Feet */}
          <div className="flex gap-16 mt-2">
            <div className="flex gap-1">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300" />
              <div className="w-4 h-4 rounded-full bg-amber-300" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300" />
            </div>
            <div className="flex gap-1">
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300" />
              <div className="w-4 h-4 rounded-full bg-amber-300" />
              <div className="w-3.5 h-3.5 rounded-full bg-amber-300" />
            </div>
          </div>
        </motion.div>

        {/* Lower Caption */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-5"
        >
          <p className="text-emerald-300 font-semibold text-base sm:text-lg drop-shadow-sm flex items-center justify-center gap-1.5">
            <span>Tem uma surpresa especial para você, {config.birthdayName}!</span>
          </p>
          <p className="text-slate-400 text-xs mt-1">
            Abra a câmera do seu celular e aponte para o código acima.
          </p>
        </motion.div>

        {/* PRIMARY ACTION BUTTONS */}
        <div className="w-full mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onStartSurprise}
            className="flex-1 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold text-base py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 fill-slate-950 group-hover:animate-bounce" />
            <span>Abrir Surpresa Agora</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-medium py-3.5 px-4 rounded-2xl border border-slate-700 hover:border-slate-600 transition flex items-center justify-center gap-2 text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Link</span>
              </>
            )}
          </button>
        </div>

        {/* Print Poster shortcut */}
        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
          <button
            onClick={handlePrint}
            className="hover:text-slate-200 transition flex items-center gap-1 underline underline-offset-4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Cartão de Aniversário</span>
          </button>
        </div>
      </main>

      {/* Bottom Animated Footer with Roaming Dinos */}
      <footer className="w-full max-w-lg mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-500 z-10">
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ rotate: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="inline-block"
          >
            🦖
          </motion.span>
          <span>Surpresa do {config.birthdayName} • 6 Anos</span>
        </div>

        <span className="text-[11px] text-emerald-400/90 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/50">
          Acesso Livre & Direto 📱
        </span>
      </footer>
    </div>
  );
};

// Little cute dinosaur footprint icon
const FootprintIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#fde047">
    {/* Heel Pad */}
    <ellipse cx="12" cy="16" rx="5" ry="4" />
    {/* 3 Toes / Claws */}
    <ellipse cx="6" cy="8" rx="2.5" ry="3.5" transform="rotate(-20 6 8)" />
    <ellipse cx="12" cy="6" rx="2.5" ry="4" />
    <ellipse cx="18" cy="8" rx="2.5" ry="3.5" transform="rotate(20 18 8)" />
  </svg>
);
