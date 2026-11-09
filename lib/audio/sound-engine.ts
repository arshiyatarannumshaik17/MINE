"use client";

/**
 * Procedural Web Audio API Sound Engine
 * Synthesizes ambient chords, celestial arpeggios, typewriter clicks, and mini-game SFX.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];
  private ambientGain: GainNode | null = null;
  private isAmbientRunning: boolean = false;
  private currentTrackType: string = "";

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(
        muted ? 0 : 0.25,
        this.ctx?.currentTime || 0
      );
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Subtle typewriter tick for dialogue
   */
  public playTypewriterTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  /**
   * Chime for correct answer or level win
   */
  public playSuccessChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.08;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {}
  }

  /**
   * Playful comic boing or incorrect buzz
   */
  public playBuzzer() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {}
  }

  /**
   * Comic boing sound for games (Sameer/Manohar)
   */
  public playBoing() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {}
  }

  /**
   * Start procedural ambient pad tailored to universe theme
   */
  public startAmbientSoundscape(themeType: string) {
    if (this.isAmbientRunning && this.currentTrackType === themeType) return;
    this.stopAmbientSoundscape();

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      this.currentTrackType = themeType;
      this.isAmbientRunning = true;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.18, ctx.currentTime);
      masterGain.connect(ctx.destination);
      this.ambientGain = masterGain;

      // Select chord frequency base based on theme
      let chord = [220, 277.18, 329.63, 440]; // A Major
      if (themeType === "romantic" || themeType === "piano") {
        chord = [261.63, 329.63, 392.0, 523.25]; // C Major 7
      } else if (themeType === "orchestral" || themeType === "vintage") {
        chord = [196.0, 246.94, 293.66, 392.0]; // G Major
      } else if (themeType === "fairytale" || themeType === "lullaby") {
        chord = [349.23, 440.0, 523.25, 698.46]; // F Major
      } else if (themeType === "comic" || themeType === "sitcom") {
        chord = [261.63, 329.63, 392.0, 466.16]; // C Dominant 7
      }

      this.ambientOscillators = chord.map((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Low frequency modulation (LFO) for breathing effect
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + i * 0.05;
        lfoGain.gain.value = 4;
        lfo.connect(osc.frequency);
        lfo.start();

        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start();

        return { osc, gain };
      });
    } catch {}
  }

  /**
   * Stop ambient soundscape
   */
  public stopAmbientSoundscape() {
    this.ambientOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.linearRampToValueAtTime(0, (this.ctx?.currentTime || 0) + 0.5);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {}
        }, 500);
      } catch {}
    });
    this.ambientOscillators = [];
    this.isAmbientRunning = false;
    this.currentTrackType = "";
  }
}

export const soundEngine = new SoundEngine();

