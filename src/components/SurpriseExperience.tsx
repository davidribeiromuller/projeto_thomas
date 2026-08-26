import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RotateCcw, Volume2, VolumeX, QrCode, Play, SkipForward, Music } from 'lucide-react';
import { AppConfig, SceneId } from '../types';
import { DinoRex, PopStarBruno, SpiderHero, PixelSteve, Pterodactyl } from './DinoCharacters';
import { PrehistoricBackground } from './PrehistoricBackground';
import { InteractiveBalloons } from './InteractiveBalloons';
import { fireGrandConfetti, fireGentleConfetti } from './ConfettiEffect';
import { audioEngine } from '../services/audioEngine';

interface SurpriseExperienceProps {
  config: AppConfig;
  onBackToPoster: () => void;
}

export const SurpriseExperience: React.FC<SurpriseExperienceProps> = ({
  config,
  onBackToPoster,
}) => {
  const [currentScene, setCurrentScene] = useState<SceneId>('sound_gate');
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(audioEngine.getMuted());
  const [screenShake, setScreenShake] = useState(false);

  // Scene 1 footstep counter & dino peek state
  const [footstepStep, setFootstepStep] = useState(0);
  const [dinoPeekState, setDinoPeekState] = useState<'hidden' | 'peeking' | 'dashing'>('hidden');

  // Scene 3 character entrance states
  const [char1Entered, setChar1Entered] = useState(false);
  const [char2Entered, setChar2Entered] = useState(false);
  const [char3Entered, setChar3Entered] = useState(false);

  // Scene 4 party celebration subtitle banner
  const [partyBannerRevealed, setPartyBannerRevealed] = useState(false);

  // Popup modal visibility in Scene 5
  const [showFinalPopup, setShowFinalPopup] = useState(false);

  // Interactive tap feedback for characters in final state
  const [characterTappedNotice, setCharacterTappedNotice] = useState<string | null>(null);

  const sceneTimeoutRef = useRef<number | null>(null);

  const triggerScreenShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 380);
  };

  const clearAllSceneTimers = () => {
    if (sceneTimeoutRef.current) {
      window.clearTimeout(sceneTimeoutRef.current);
      sceneTimeoutRef.current = null;
    }
  };

  // Start the entire experience (Instant guest access - zero login needed)
  const handleStartExperience = () => {
    audioEngine.init();
    audioEngine.setMasterVolume(config.musicVolume);
    setIsAudioStarted(true);
    goToScene('scene1_intro');
  };

  const goToScene = (scene: SceneId) => {
    clearAllSceneTimers();
    setCurrentScene(scene);

    if (scene === 'scene1_intro') {
      runScene1();
    } else if (scene === 'scene2_dinosaurs') {
      runScene2();
    } else if (scene === 'scene3_characters') {
      runScene3();
    } else if (scene === 'scene4_party') {
      runScene4();
    } else if (scene === 'scene5_popup_final') {
      runScene5();
    }
  };

  // SCENE 1: SUSPENSE & FOOTPRINTS
  const runScene1 = () => {
    audioEngine.setMusicTheme('suspense');
    setFootstepStep(0);
    setDinoPeekState('hidden');
    setShowFinalPopup(false);

    // Footstep 1
    setTimeout(() => {
      setFootstepStep(1);
      audioEngine.playDinoFootstep(0.7);
      triggerScreenShake();
    }, 1000);

    // Footstep 2 (Closer)
    setTimeout(() => {
      setFootstepStep(2);
      audioEngine.playDinoFootstep(0.9);
      triggerScreenShake();
    }, 2200);

    // Footstep 3 (Right here!)
    setTimeout(() => {
      setFootstepStep(3);
      audioEngine.playDinoFootstep(1.2);
      triggerScreenShake();
    }, 3400);

    // Dino Peeks out
    setTimeout(() => {
      setDinoPeekState('peeking');
      audioEngine.playCuteDinoRoar();
    }, 4200);

    // Dino Dashes across screen
    setTimeout(() => {
      setDinoPeekState('dashing');
      audioEngine.playCuteDinoRoar();
    }, 5500);

    // Transition to Scene 2
    sceneTimeoutRef.current = window.setTimeout(() => {
      goToScene('scene2_dinosaurs');
    }, config.scene1Duration * 1000);
  };

  // SCENE 2: PREHISTORIC DINOLAND
  const runScene2 = () => {
    audioEngine.setMusicTheme('adventure');
    fireGentleConfetti();

    // After duration, transition to characters
    sceneTimeoutRef.current = window.setTimeout(() => {
      goToScene('scene3_characters');
    }, config.scene2Duration * 1000);
  };

  // SCENE 3: THE 3 CHARACTERS ENTER
  const runScene3 = () => {
    audioEngine.setMusicTheme('characters');
    setChar1Entered(false);
    setChar2Entered(false);
    setChar3Entered(false);

    // Character 1: Bruno Mars Pop Star
    setTimeout(() => {
      setChar1Entered(true);
      audioEngine.playFunkyStab();
    }, 700);

    // Character 2: Spider Hero swings in
    setTimeout(() => {
      setChar2Entered(true);
      audioEngine.playWebWhoosh();
    }, 2200);

    // Character 3: Steve Minecraft walks in with Cake
    setTimeout(() => {
      setChar3Entered(true);
      audioEngine.playBlockJumpSound();
    }, 3700);

    // Transition to Scene 4 (A Festa!)
    sceneTimeoutRef.current = window.setTimeout(() => {
      goToScene('scene4_party');
    }, config.scene3Duration * 1000);
  };

  // SCENE 4: A GRANDE FESTA (TODOS OS PERSONAGENS DANÇANDO JUNTO)
  const runScene4 = () => {
    audioEngine.setMusicTheme('celebration');
    setPartyBannerRevealed(false);
    setShowFinalPopup(false);
    fireGentleConfetti();

    // Banner drops in
    setTimeout(() => {
      setPartyBannerRevealed(true);
      audioEngine.playMagicSparkle();
    }, 1200);

    // Confetti bursts during party
    setTimeout(() => fireGrandConfetti(), 2500);
    setTimeout(() => fireGentleConfetti(), 5000);

    // No final da festa: abre o POPUP FINAL DE FELIZ ANIVERSÁRIO!
    sceneTimeoutRef.current = window.setTimeout(() => {
      goToScene('scene5_popup_final');
    }, config.scene4Duration * 1000);
  };

  // SCENE 5: O GRANDE POPUP DE FELIZ ANIVERSÁRIO AO FINAL DA FESTA!
  const runScene5 = () => {
    audioEngine.setMusicTheme('final');
    setShowFinalPopup(true);
    audioEngine.playGrandFanfare();
    audioEngine.playConfettiBlast();
    fireGrandConfetti();
    triggerScreenShake();
  };

  // Skip to next scene
  const handleSkipNext = () => {
    const sequence: SceneId[] = [
      'scene1_intro',
      'scene2_dinosaurs',
      'scene3_characters',
      'scene4_party',
      'scene5_popup_final',
    ];
    const currentIndex = sequence.indexOf(currentScene);
    if (currentIndex < sequence.length - 1) {
      goToScene(sequence[currentIndex + 1]);
    }
  };

  const handleRestart = () => {
    goToScene('scene1_intro');
  };

  const handleToggleAudio = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  // Interactive Character Click in Finale
  const handleCharacterClick = (name: string, soundFn: () => void, textNotice: string) => {
    soundFn();
    setCharacterTappedNotice(textNotice);
    setTimeout(() => setCharacterTappedNotice(null), 2500);
    fireGentleConfetti();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllSceneTimers();
      audioEngine.stopAll();
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 w-full h-full overflow-hidden select-none bg-slate-950 text-white ${
        screenShake ? 'screen-shake' : ''
      }`}
    >
      {/* Sound Gate Screen (Direct Instant Guest Access - No Login Required) */}
      <AnimatePresence>
        {currentScene === 'sound_gate' && (
          <motion.div
            className="absolute inset-0 z-50 bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ambient Background Glows */}
            <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute w-60 h-60 rounded-full bg-amber-500/20 blur-3xl -bottom-10" />

            <motion.div
              className="relative z-10 max-w-sm flex flex-col items-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-amber-400 p-1 shadow-2xl mb-6 shadow-emerald-500/30 flex items-center justify-center animate-float">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl">
                  🦖
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Experiência Interativa • 6 Anos 🎉</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-1">
                Surpresa para o <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">{config.birthdayName}</span>!
              </h1>

              <p className="text-amber-400 font-bold text-base mb-3">
                {config.ageText || 'Feliz 6 anos!! 🎉🦖'}
              </p>

              <p className="text-slate-300 text-xs sm:text-sm mb-8 leading-relaxed">
                Coloque o fone de ouvido ou aumente o volume para uma festa cheia de música e magia! 🎵✨
              </p>

              {/* Big Start Button */}
              <button
                onClick={handleStartExperience}
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 text-slate-950 font-extrabold text-lg py-4 px-8 rounded-2xl shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-3 group"
              >
                <Music className="w-6 h-6 text-slate-950 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
                <span>🎵 Começar surpresa</span>
              </button>

              <button
                onClick={onBackToPoster}
                className="mt-4 text-xs text-slate-400 hover:text-slate-200 transition flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Ver QR Code</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Floating Controls Bar */}
      {currentScene !== 'sound_gate' && (
        <div className="absolute top-4 inset-x-4 z-40 flex justify-between items-center pointer-events-none">
          {/* Back to QR poster button */}
          <button
            onClick={onBackToPoster}
            className="pointer-events-auto p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition shadow-lg flex items-center gap-2 text-xs font-semibold"
          >
            <QrCode className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Pôster QR</span>
          </button>

          {/* Timeline Mini Bar */}
          <div className="bg-slate-900/75 backdrop-blur-md border border-slate-700/60 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium capitalize text-[11px]">
              {currentScene === 'scene1_intro' && '1. O Mistério... 🐾'}
              {currentScene === 'scene2_dinosaurs' && '2. Vale dos Dinossauros 🦖'}
              {currentScene === 'scene3_characters' && '3. Convidados Especiais 🌟'}
              {currentScene === 'scene4_party' && '4. A Festa & Dança! 🥳'}
              {currentScene === 'scene5_popup_final' && '5. Parabéns Thomas! 🎂'}
            </span>
          </div>

          {/* Audio & Skip Controls */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={handleToggleAudio}
              className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition shadow-lg"
              title={isMuted ? 'Ativar som' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {currentScene !== 'scene5_popup_final' && (
              <button
                onClick={handleSkipNext}
                className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/70 text-slate-200 hover:bg-slate-800 transition shadow-lg"
                title="Avançar cena"
              >
                <SkipForward className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Balloons Layer in Scenes 4 & 5 */}
      <InteractiveBalloons
        active={
          currentScene === 'scene4_party' ||
          currentScene === 'scene5_popup_final'
        }
      />

      {/* Notice bubble when user taps characters in final state */}
      <AnimatePresence>
        {characterTappedNotice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-2xl shadow-xl text-sm border-2 border-white flex items-center gap-2"
          >
            <span>{characterTappedNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* SCENE 1: INTRO / SUSPENSE & FOOTPRINTS */}
      {/* ========================================================================= */}
      {currentScene === 'scene1_intro' && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden">
          {/* Starfield with glowing stars */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 45 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${(i * 19) % 95}%`,
                  left: `${(i * 23) % 95}%`,
                  width: `${(i % 3) + 1.5}px`,
                  height: `${(i % 3) + 1.5}px`,
                  opacity: (i % 5) * 0.2 + 0.3,
                  animation: `float-slow ${3 + (i % 4)}s infinite ease-in-out`,
                }}
              />
            ))}
          </div>

          {/* Camera Zoom In Simulation Wrapper */}
          <motion.div
            className="relative w-full h-full flex flex-col items-center justify-center"
            animate={{
              scale: footstepStep === 1 ? 1.05 : footstepStep === 2 ? 1.12 : footstepStep >= 3 ? 1.22 : 1,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Glowing Footprints Appearing Step-by-Step */}
            {footstepStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.85, scale: 0.7 }}
                className="absolute top-1/4 left-1/3 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] rotate-[-15deg]"
              >
                <FootprintSVG size={50} />
              </motion.div>
            )}

            {footstepStep >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.95, scale: 1.0 }}
                className="absolute top-1/2 right-1/3 text-amber-300 drop-shadow-[0_0_16px_rgba(252,211,77,0.9)] rotate-[20deg]"
              >
                <FootprintSVG size={70} />
              </motion.div>
            )}

            {footstepStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.35 }}
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-rose-400 drop-shadow-[0_0_24px_rgba(251,113,133,1)] rotate-[-5deg]"
              >
                <FootprintSVG size={90} />
              </motion.div>
            )}

            {/* Peeking Cute Dino Behind Screen */}
            <AnimatePresence>
              {dinoPeekState === 'peeking' && (
                <motion.div
                  initial={{ y: 200, opacity: 0, scale: 0.7 }}
                  animate={{ y: 20, opacity: 1, scale: 1 }}
                  exit={{ y: 200, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="absolute bottom-10 z-20 flex flex-col items-center"
                >
                  <DinoRex animateState="peeking" size={240} />
                  <div className="bg-emerald-500/90 text-slate-950 font-bold px-4 py-1.5 rounded-full text-sm shadow-xl border-2 border-white mt-[-20px] animate-bounce">
                    ROAAR! 🦖✨
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dashing Dino across screen */}
            {dinoPeekState === 'dashing' && (
              <motion.div
                initial={{ x: '-100vw', y: 40 }}
                animate={{ x: '100vw', y: 40 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="absolute z-30"
              >
                <DinoRex animateState="walking" size={200} />
              </motion.div>
            )}

            {/* Suspense Text Caption */}
            <div className="absolute top-20 text-center px-4">
              <p className="text-slate-400 tracking-widest uppercase text-xs font-semibold animate-pulse">
                Algo está se aproximando... 🐾
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 2: DINOSAURS & PREHISTORIC JURASSIC CELEBRATION */}
      {/* ========================================================================= */}
      {currentScene === 'scene2_dinosaurs' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-4 overflow-hidden">
          <PrehistoricBackground />

          {/* Flying Pterodactyl */}
          <Pterodactyl className="top-16 left-1/4" size={130} />

          {/* Main Stage: Dancing Center Friendly Dino */}
          <div className="relative my-auto flex flex-col items-center z-10">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 100 }}
              className="flex flex-col items-center"
            >
              <DinoRex animateState="dancing" size={220} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-emerald-900/80 backdrop-blur-md border border-emerald-400/50 text-emerald-200 px-5 py-2 rounded-2xl shadow-xl font-bold text-sm mt-3"
            >
              🌿 Bem-vindo à terra dos dinossauros! 🦕
            </motion.div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 3: ENTRANCE OF THE 3 CHARACTERS */}
      {/* ========================================================================= */}
      {currentScene === 'scene3_characters' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-4 overflow-hidden">
          <PrehistoricBackground />

          {/* Flying Pterodactyl in background */}
          <Pterodactyl className="top-14 right-10" size={100} />

          {/* Characters Row Container */}
          <div className="relative my-auto w-full max-w-4xl flex items-end justify-center gap-2 sm:gap-6 z-10 px-2">
            {/* Personagem 1: Bruno Mars Pop Star */}
            <div className="flex flex-col items-center">
              <AnimatePresence>
                {char1Entered && (
                  <motion.div
                    initial={{ x: -180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14 }}
                    className="flex flex-col items-center"
                  >
                    <PopStarBruno animateState="dancing" size={145} />
                    <span className="bg-red-950/80 border border-red-500/50 text-red-200 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mt-1 shadow">
                      🎤 Pop Star
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Friendly Dino Center Host */}
            <div className="flex flex-col items-center">
              <DinoRex animateState="dancing" size={160} />
              <span className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mt-1 shadow">
                🦖 Dino Host
              </span>
            </div>

            {/* Personagem 2: Spider Hero (Swings in) */}
            <div className="flex flex-col items-center">
              <AnimatePresence>
                {char2Entered && (
                  <motion.div
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="flex flex-col items-center"
                  >
                    <SpiderHero animateState="landing" size={145} />
                    <span className="bg-blue-950/80 border border-blue-500/50 text-blue-200 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mt-1 shadow">
                      🕷️ Herói Aracnídeo
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Personagem 3: Pixel Steve with Cake */}
            <div className="flex flex-col items-center">
              <AnimatePresence>
                {char3Entered && (
                  <motion.div
                    initial={{ x: 180, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14 }}
                    className="flex flex-col items-center"
                  >
                    <PixelSteve animateState="walking" size={140} />
                    <span className="bg-cyan-950/80 border border-cyan-500/50 text-cyan-200 text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mt-1 shadow font-pixel text-[9px]">
                      🎂 Pixel Steve
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="z-20 mb-4 bg-slate-950/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-700 text-xs font-medium text-amber-300">
            🌟 Os convidados especiais chegaram para a festa do Thomas!
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 4: A GRANDE FESTA (TODOS OS PERSONAGENS DANÇANDO JUNTOS) */}
      {/* ========================================================================= */}
      {currentScene === 'scene4_party' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-4 overflow-hidden">
          <PrehistoricBackground />

          {/* Flying Pterodactyl */}
          <Pterodactyl className="top-12 left-10" size={110} />

          {/* Top Party Title Banner */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="z-20 text-center pt-8 px-4"
          >
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/50 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold mb-2 shadow-lg">
              <span>🎉 Festa dos 6 Anos do {config.birthdayName}! 🦖</span>
            </div>

            {/* Subtitle Banner: "Que seu dia seja incrível! 🎂🎉🦖" */}
            <AnimatePresence>
              {partyBannerRevealed && (
                <motion.p
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="text-base sm:text-2xl font-extrabold text-white bg-slate-950/75 backdrop-blur-md px-6 py-2 rounded-2xl inline-block border border-emerald-400/40 shadow-xl"
                >
                  {config.surpriseSubtitle}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Dancing Characters Stage */}
          <div className="relative my-auto w-full max-w-4xl flex items-end justify-center gap-3 sm:gap-6 z-10 px-2 pb-6">
            <PopStarBruno animateState="dancing" size={135} />
            <DinoRex animateState="dancing" size={160} />
            <SpiderHero animateState="dancing" size={135} />
            <PixelSteve animateState="dancing" size={130} />
          </div>

          <div className="z-20 mb-4 bg-emerald-950/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/40 text-xs font-semibold text-emerald-300 animate-pulse">
            🎵 Dançando e comemorando no Vale dos Dinossauros! 🦖✨
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 5: O GRANDE POPUP DE FELIZ ANIVERSÁRIO AO FINAL DA FESTA */}
      {/* ========================================================================= */}
      {currentScene === 'scene5_popup_final' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 overflow-y-auto z-10">
          <PrehistoricBackground />

          {/* Animated Background Characters (Dinos + Guests partying in the background) */}
          <div className="absolute bottom-4 inset-x-0 flex items-end justify-center gap-4 opacity-40 pointer-events-none scale-90">
            <PopStarBruno animateState="dancing" size={90} />
            <DinoRex animateState="dancing" size={110} />
            <SpiderHero animateState="dancing" size={90} />
            <PixelSteve animateState="dancing" size={85} />
          </div>

          {/* Grand Celebration Modal Popup */}
          <AnimatePresence>
            {showFinalPopup && (
              <motion.div
                initial={{ scale: 0.3, opacity: 0, y: 50 }}
                animate={{
                  scale: [0.3, 1.05, 1],
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: 'easeOut',
                }}
                className="my-auto w-full max-w-lg bg-gradient-to-b from-slate-900/95 via-slate-900/95 to-emerald-950/95 backdrop-blur-2xl border-4 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] text-center flex flex-col items-center relative z-30"
              >
                {/* Glowing Crown on Top */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white shadow-[0_0_25px_rgba(251,191,36,0.9)] flex items-center justify-center text-3xl animate-bounce">
                  👑
                </div>

                {/* Top Badge: "Feliz 6 anos!!" prominent highlight */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 px-5 py-2 rounded-full font-black text-sm sm:text-base mb-3 shadow-lg uppercase tracking-wide mt-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Feliz 6 anos!! 🎉🎂🦖</span>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                </motion.div>

                {/* Grand Header Message: "Feliz aniversário, Thomas!! 🎉🦖" */}
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2 leading-tight drop-shadow-md">
                  Feliz aniversário,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-yellow-400">
                    {config.birthdayName}
                  </span>
                  !! 🎉🦖
                </h1>

                {/* Subtitle Message: "Que seu dia seja incrível! 🎂🎉🦖" */}
                <p className="text-emerald-300 font-bold text-sm sm:text-base mb-1">
                  {config.surpriseSubtitle}
                </p>

                {/* Subtext: "Essa surpresa foi feita especialmente para você 🦖❤️" */}
                <p className="text-slate-300 text-xs sm:text-sm mb-5">
                  {config.finalSubmessage}
                </p>

                {/* Interactive Characters Grid: Tap to interact! */}
                <div className="w-full bg-slate-950/70 border border-slate-800/90 rounded-2xl p-3 mb-5">
                  <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider mb-2">
                    👇 Toque nos personagens para ouvir uma mensagem!
                  </p>
                  <div className="grid grid-cols-4 gap-1 items-end justify-items-center">
                    {/* Bruno */}
                    <div
                      onClick={() =>
                        handleCharacterClick(
                          'Bruno',
                          () => audioEngine.playFunkyStab(),
                          '🎤 Bruno Mars: "24K Magic nos seus 6 anos, Thomas!"'
                        )
                      }
                      className="flex flex-col items-center hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      <PopStarBruno animateState="dancing" size={72} />
                      <span className="text-[10px] font-bold text-red-300 mt-1">Bruno 🎤</span>
                    </div>

                    {/* Dino */}
                    <div
                      onClick={() =>
                        handleCharacterClick(
                          'Dino',
                          () => audioEngine.playCuteDinoRoar(),
                          '🦖 Dino Rex: "ROAAAR! Parabéns pelos 6 anos!"'
                        )
                      }
                      className="flex flex-col items-center hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      <DinoRex animateState="cheering" size={82} />
                      <span className="text-[10px] font-bold text-emerald-300 mt-1">Rexy 🦖</span>
                    </div>

                    {/* Spider Hero */}
                    <div
                      onClick={() =>
                        handleCharacterClick(
                          'Spider',
                          () => audioEngine.playWebWhoosh(),
                          '🕷️ Spider-Hero: "Com 6 anos vêm superpoderes incríveis!"'
                        )
                      }
                      className="flex flex-col items-center hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      <SpiderHero animateState="landing" size={72} />
                      <span className="text-[10px] font-bold text-blue-300 mt-1">Spider 🕷️</span>
                    </div>

                    {/* Steve */}
                    <div
                      onClick={() =>
                        handleCharacterClick(
                          'Steve',
                          () => audioEngine.playBlockJumpSound(),
                          '🎂 Steve: "Bolo de 6 anos desbloqueado no Minecraft!"'
                        )
                      }
                      className="flex flex-col items-center hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                      <PixelSteve animateState="walking" size={70} />
                      <span className="text-[10px] font-bold text-cyan-300 mt-1">Steve 🎂</span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="w-full flex flex-col sm:flex-row gap-2.5">
                  {/* "🔄 Assistir novamente" */}
                  <button
                    onClick={handleRestart}
                    className="flex-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>🔄 Assistir novamente</span>
                  </button>

                  {/* Back to QR Code Poster */}
                  <button
                    onClick={onBackToPoster}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-3.5 px-5 rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <QrCode className="w-4 h-4 text-emerald-400" />
                    <span>Ver QR Code</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// Reusable SVG Dinosaur Footprint
const FootprintSVG: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="currentColor">
    {/* Center Palm */}
    <ellipse cx="50" cy="65" rx="24" ry="18" />
    {/* 3 Toes / Claws */}
    <ellipse cx="26" cy="32" rx="10" ry="18" transform="rotate(-25 26 32)" />
    <ellipse cx="50" cy="24" rx="11" ry="20" />
    <ellipse cx="74" cy="32" rx="10" ry="18" transform="rotate(25 74 32)" />
  </svg>
);
