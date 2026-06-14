import { safeLocalStorage } from "./storage";

class CyberSynth {
  constructor() {
    this.ctx = null;
    // Default audio to off to respect browser policies and user comfort
    this.enabled = safeLocalStorage.getItem('cyber_audio') === 'true';
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    // Resume context if suspended (browser security policies)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    safeLocalStorage.setItem('cyber_audio', this.enabled ? 'true' : 'false');
    if (this.enabled) {
      this.init();
      this.playChime();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  playTick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      // A tiny clicky/tick noise
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 600, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const playTone = (freq, time, duration, vol) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
        
        osc.start(time);
        osc.stop(time + duration);
      };

      // Retro 2-tone chime
      playTone(587.33, now, 0.08, 0.03); // D5
      playTone(880.00, now + 0.07, 0.15, 0.03); // A5
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }

  playBoot() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sawtooth';
      // Retro pitch slide upward
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.start();
      osc.stop(now + 0.35);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }

  playAlarm() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      // Siren style sweep
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.2);
      osc.frequency.linearRampToValueAtTime(600, now + 0.4);
      osc.frequency.linearRampToValueAtTime(900, now + 0.6);
      osc.frequency.linearRampToValueAtTime(400, now + 0.8);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.start();
      osc.stop(now + 0.85);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }

  playBeep() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }

  playExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 1.2);
      
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      
      osc.start();
      osc.stop(now + 1.2);

      const sizzle = this.ctx.createOscillator();
      const sizzleGain = this.ctx.createGain();
      sizzle.connect(sizzleGain);
      sizzleGain.connect(this.ctx.destination);
      sizzle.type = 'triangle';
      sizzle.frequency.setValueAtTime(800, now);
      sizzle.frequency.setValueAtTime(200, now + 0.15);
      sizzleGain.gain.setValueAtTime(0.03, now);
      sizzleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      sizzle.start();
      sizzle.stop(now + 0.4);
    } catch (e) {
      console.warn("Synth error:", e);
    }
  }
}

export const cyberSynth = new CyberSynth();
