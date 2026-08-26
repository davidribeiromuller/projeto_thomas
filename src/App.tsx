import React, { useState, useEffect } from 'react';
import { AppConfig } from './types';
import { DinoQRCode } from './components/DinoQRCode';
import { SurpriseExperience } from './components/SurpriseExperience';

const DEFAULT_CONFIG: AppConfig = {
  birthdayName: 'Thomas',
  ageText: 'Feliz 6 anos!! 🎉🦖',
  surpriseTitle: 'Feliz aniversário, Thomas!! 🎉🦖',
  surpriseSubtitle: 'Que seu dia seja incrível! 🎂🎉🦖',
  finalMessage: 'Feliz aniversário, Thomas!! 🎉',
  finalSubmessage: 'Essa surpresa foi feita especialmente para você 🦖❤️',
  customUrl: '',
  soundEnabled: true,
  musicVolume: 0.8,
  sfxVolume: 0.85,
  scene1Duration: 6,
  scene2Duration: 5,
  scene3Duration: 6.5,
  scene4Duration: 7.5,
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [currentMode, setCurrentMode] = useState<'poster' | 'surprise'>('poster');

  // Check URL query parameters on load for direct instant surprise opening (no login required)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'surprise' || params.get('surprise') === 'true') {
        setCurrentMode('surprise');
      }
      if (params.get('name')) {
        setConfig((prev) => ({
          ...prev,
          birthdayName: params.get('name') || prev.birthdayName,
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {currentMode === 'poster' ? (
        <DinoQRCode
          config={config}
          onStartSurprise={() => setCurrentMode('surprise')}
        />
      ) : (
        <SurpriseExperience
          config={config}
          onBackToPoster={() => setCurrentMode('poster')}
        />
      )}
    </div>
  );
}
