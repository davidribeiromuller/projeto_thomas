/**
 * Web Audio API procedural sound synthesizer and music engine.
 * 100% original, copyright-free, reliable on both mobile and desktop.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;
  private musicGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private masterGainNode: GainNode | null = null;
  private musicInterval: number | null = null;
  private currentMusicTheme: string | null = null;
  private isInitialized: boolean = false;

  public init() {
    if (this.isInitialized && this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.value = this.masterVolume;
      this.masterGainNode.connect(this.ctx.destination);

      this.musicGainNode = this.ctx.createGain();
      this.musicGainNode.gain.value = 0.55;
      this.musicGainNode.connect(this.masterGainNode);

      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.value = 0.85;
      this.sfxGainNode.connect(this.masterGainNode);

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- SOUND EFFECTS ---

  // Dino Footstep (Heavy deep stomp)
  public playDinoFootstep(intensity: number = 1.0) {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110 * intensity, t);
    osc.frequency.exponentialRampToValueAtTime(28, t + 0.22);

    gain.gain.setValueAtTime(0.7 * intensity, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(t);
    osc.stop(t + 0.25);

    // Add brief low-pass noise crackle
    this.playNoiseCrack(0.12, 0.3 * intensity);
  }

  // Friendly Dino Roar / Cute Chirp
  public playCuteDinoRoar() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    // Fun playful chirp-roar slide
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(420, t + 0.12);
    osc.frequency.linearRampToValueAtTime(220, t + 0.3);
    osc.frequency.exponentialRampToValueAtTime(130, t + 0.55);

    // Soft filter for friendly cartoon feel
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, t);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.6, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(t);
    osc.stop(t + 0.55);
  }

  // Spider Web Swing Whoosh
  public playWebWhoosh() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const t = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, t);
    filter.frequency.exponentialRampToValueAtTime(2400, t + 0.2);
    filter.frequency.exponentialRampToValueAtTime(400, t + 0.4);
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(0.5, t + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGainNode);

    noise.start(t);
    noise.stop(t + 0.4);

    // High harmonic zip
    this.playTone(880, 0.15, 'sine', 0.2);
  }

  // Minecraft Steve 8-bit block / jump sound
  public playBlockJumpSound() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    // Arpeggio 8-bit classic style
    osc.frequency.setValueAtTime(261.63, t); // C4
    osc.frequency.setValueAtTime(329.63, t + 0.05); // E4
    osc.frequency.setValueAtTime(392.00, t + 0.1); // G4
    osc.frequency.setValueAtTime(523.25, t + 0.15); // C5

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  // Bruno Mars Funky Brass / Guitar Pluck
  public playFunkyStab() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const chords = [440, 554.37, 659.25, 830.61]; // A major 7th funky hit
    const t = this.ctx.currentTime;

    chords.forEach((freq, i) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t + i * 0.02);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2800, t);
      filter.frequency.exponentialRampToValueAtTime(400, t + 0.28);

      gain.gain.setValueAtTime(0.25, t + i * 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.32);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t + i * 0.02);
      osc.stop(t + 0.35);
    });
  }

  // Magical Sparkle Glitter
  public playMagicSparkle() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
    const t = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.045);

      gain.gain.setValueAtTime(0.2, t + idx * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.045 + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t + idx * 0.045);
      osc.stop(t + idx * 0.045 + 0.3);
    });
  }

  // Balloon Pop
  public playBalloonPop() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.09);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(t);
    osc.stop(t + 0.1);

    this.playNoiseCrack(0.08, 0.5);
  }

  // Confetti Cannon Blast
  public playConfettiBlast() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    this.playNoiseCrack(0.35, 0.8);
    this.playMagicSparkle();
  }

  // Grand Birthday Fanfare
  public playGrandFanfare() {
    this.ensureContext();
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;

    const t = this.ctx.currentTime;
    // Fanfare motif (Ta-da-da-daaaa!)
    const notes = [
      { f: 523.25, d: 0.15, time: 0 },
      { f: 523.25, d: 0.15, time: 0.16 },
      { f: 523.25, d: 0.15, time: 0.32 },
      { f: 659.25, d: 0.25, time: 0.48 },
      { f: 783.99, d: 0.5, time: 0.75 },
      { f: 1046.50, d: 0.9, time: 1.1 },
    ];

    notes.forEach(n => {
      if (!this.ctx || !this.sfxGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, t + n.time);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, t + n.time);

      gain.gain.setValueAtTime(0.3, t + n.time);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.time + n.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGainNode);

      osc.start(t + n.time);
      osc.stop(t + n.time + n.d + 0.05);
    });
  }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', vol = 0.3) {
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(t);
    osc.stop(t + duration);
  }

  private playNoiseCrack(duration: number, vol = 0.4) {
    if (!this.ctx || !this.sfxGainNode || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    noise.connect(gain);
    gain.connect(this.sfxGainNode);

    noise.start();
    noise.stop(this.ctx.currentTime + duration);
  }

  // --- DYNAMIC MUSIC SOUNDTRACK ---

  public setMusicTheme(theme: 'suspense' | 'adventure' | 'characters' | 'surprise_quiet' | 'celebration' | 'final' | 'stop') {
    if (this.currentMusicTheme === theme) return;
    this.currentMusicTheme = theme;

    if (this.musicInterval) {
      window.clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    if (theme === 'stop') return;

    this.ensureContext();
    if (!this.ctx || !this.musicGainNode || this.isMuted) return;

    if (theme === 'suspense') {
      this.playSuspenseTrack();
    } else if (theme === 'adventure') {
      this.playAdventureTrack();
    } else if (theme === 'characters') {
      this.playFunkyTrack();
    } else if (theme === 'surprise_quiet') {
      // Brief quiet build-up before the big pop!
      this.playMagicSparkle();
    } else if (theme === 'celebration' || theme === 'final') {
      this.playCelebrationTrack();
    }
  }

  private playSuspenseTrack() {
    let step = 0;
    const suspenseLoop = () => {
      if (this.currentMusicTheme !== 'suspense' || !this.ctx || !this.musicGainNode || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Soft bass heartbeat pulse
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(step % 2 === 0 ? 65 : 55, t);
      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(gain);
      gain.connect(this.musicGainNode);
      osc.start(t);
      osc.stop(t + 0.4);

      // Mysterious crystal ping on every 4th beat
      if (step % 4 === 0) {
        const ping = this.ctx.createOscillator();
        const pingGain = this.ctx.createGain();
        ping.type = 'sine';
        ping.frequency.setValueAtTime(880, t + 0.1);
        pingGain.gain.setValueAtTime(0.1, t + 0.1);
        pingGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
        ping.connect(pingGain);
        pingGain.connect(this.musicGainNode);
        ping.start(t + 0.1);
        ping.stop(t + 0.9);
      }

      step++;
    };

    suspenseLoop();
    this.musicInterval = window.setInterval(suspenseLoop, 750);
  }

  private playAdventureTrack() {
    // Cheerful Jurassic / Mario / adventure melody notes
    const melody = [
      261.63, 329.63, 392.00, 523.25, // C E G C
      440.00, 392.00, 329.63, 349.23, // A G E F
      392.00, 523.25, 440.00, 392.00, // G C A G
      329.63, 293.66, 261.63, 392.00  // E D C G
    ];
    let noteIndex = 0;

    const adventureLoop = () => {
      if (this.currentMusicTheme !== 'adventure' || !this.ctx || !this.musicGainNode || this.isMuted) return;
      const t = this.ctx.currentTime;
      const freq = melody[noteIndex % melody.length];

      // Cheerful synth lead
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);
      osc.connect(gain);
      gain.connect(this.musicGainNode);
      osc.start(t);
      osc.stop(t + 0.3);

      // Bass note
      if (noteIndex % 2 === 0) {
        const bass = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bass.type = 'sawtooth';
        bass.frequency.setValueAtTime(freq / 4, t);
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 250;
        bassGain.gain.setValueAtTime(0.25, t);
        bassGain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
        bass.connect(filter);
        filter.connect(bassGain);
        bassGain.connect(this.musicGainNode);
        bass.start(t);
        bass.stop(t + 0.38);
      }

      noteIndex++;
    };

    adventureLoop();
    this.musicInterval = window.setInterval(adventureLoop, 280);
  }

  private playFunkyTrack() {
    // Upbeat funky Bruno Mars + video game crossover groove
    const bassline = [110, 110, 130.81, 146.83, 164.81, 146.83, 130.81, 98];
    const chords = [
      [440, 554, 659],
      [493.88, 587.33, 739.99],
      [523.25, 659.25, 783.99],
      [392, 493.88, 587.33]
    ];
    let step = 0;

    const funkyLoop = () => {
      if (this.currentMusicTheme !== 'characters' || !this.ctx || !this.musicGainNode || this.isMuted) return;
      const t = this.ctx.currentTime;
      const bassFreq = bassline[step % bassline.length];

      // Funky Slap Bass Synth
      const bass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bass.type = 'sawtooth';
      bass.frequency.setValueAtTime(bassFreq, t);
      const bassFilter = this.ctx.createBiquadFilter();
      bassFilter.type = 'lowpass';
      bassFilter.frequency.setValueAtTime(900, t);
      bassFilter.frequency.exponentialRampToValueAtTime(150, t + 0.2);

      bassGain.gain.setValueAtTime(0.3, t);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      bass.connect(bassFilter);
      bassFilter.connect(bassGain);
      bassGain.connect(this.musicGainNode);
      bass.start(t);
      bass.stop(t + 0.24);

      // Syncopated funky chord stab on beats 2 & 4
      if (step % 2 === 1) {
        const chord = chords[Math.floor(step / 2) % chords.length];
        chord.forEach(f => {
          if (!this.ctx || !this.musicGainNode) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, t);
          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
          osc.connect(gain);
          gain.connect(this.musicGainNode);
          osc.start(t);
          osc.stop(t + 0.2);
        });
      }

      step++;
    };

    funkyLoop();
    this.musicInterval = window.setInterval(funkyLoop, 220);
  }

  private playCelebrationTrack() {
    // Happy Birthday Theme variation with energetic high vibes
    const birthdayNotes = [
      { f: 523.25, d: 250 }, // C
      { f: 523.25, d: 250 }, // C
      { f: 587.33, d: 450 }, // D
      { f: 523.25, d: 450 }, // C
      { f: 698.46, d: 450 }, // F
      { f: 659.25, d: 750 }, // E
      { f: 523.25, d: 250 }, // C
      { f: 523.25, d: 250 }, // C
      { f: 587.33, d: 450 }, // D
      { f: 523.25, d: 450 }, // C
      { f: 783.99, d: 450 }, // G
      { f: 698.46, d: 750 }, // F
      { f: 523.25, d: 250 }, // C
      { f: 523.25, d: 250 }, // C
      { f: 1046.50, d: 450 }, // High C
      { f: 880.00, d: 450 }, // A
      { f: 698.46, d: 450 }, // F
      { f: 659.25, d: 450 }, // E
      { f: 587.33, d: 650 }, // D
      { f: 932.33, d: 250 }, // Bb
      { f: 932.33, d: 250 }, // Bb
      { f: 880.00, d: 450 }, // A
      { f: 698.46, d: 450 }, // F
      { f: 783.99, d: 450 }, // G
      { f: 698.46, d: 850 }, // F
    ];

    let noteIdx = 0;

    const playNext = () => {
      if (this.currentMusicTheme !== 'celebration' && this.currentMusicTheme !== 'final') return;
      if (!this.ctx || !this.musicGainNode || this.isMuted) return;

      const current = birthdayNotes[noteIdx % birthdayNotes.length];
      const t = this.ctx.currentTime;

      // Bright bells/chimes for birthday melody
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(current.f, t);

      // Second harmonic overtone
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(current.f * 2, t);

      gain.gain.setValueAtTime(0.24, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + (current.d / 1000) * 0.95);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.musicGainNode);

      osc.start(t);
      osc2.start(t);
      osc.stop(t + current.d / 1000);
      osc2.stop(t + current.d / 1000);

      // Bass boom backing
      const bass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bass.type = 'sine';
      bass.frequency.setValueAtTime(current.f / 4, t);
      bassGain.gain.setValueAtTime(0.22, t);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      bass.connect(bassGain);
      bassGain.connect(this.musicGainNode);
      bass.start(t);
      bass.stop(t + 0.38);

      noteIdx++;
      this.musicInterval = window.setTimeout(playNext, current.d);
    };

    playNext();
  }

  public stopAll() {
    if (this.musicInterval) {
      window.clearInterval(this.musicInterval);
      window.clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
    this.currentMusicTheme = 'stop';
  }
}

export const audioEngine = new AudioEngine();
