/**
 * Web Audio API ambient sound synthesizer for Peace Gainer.
 * Generates procedural audio for Rain, Ocean, Forest, Zen Bowl, and Sound Effects.
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isInitialized = false;

  // Active generators
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private rainInterval: number | null = null;

  private oceanGain: GainNode | null = null;
  private oceanOsc: OscillatorNode | null = null;

  private forestGain: GainNode | null = null;
  private forestInterval: number | null = null;

  private zenGain: GainNode | null = null;

  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isInitialized = true;
  }

  // --- Rain Generator ---
  public startRain(volume = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.rainGain) {
      this.rainGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      return;
    }

    // Create noise buffer for rain
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    // Filter to sound like rain
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    whiteNoise.start();
    this.rainNode = whiteNoise;

    // Periodic raindrop drops
    this.rainInterval = window.setInterval(() => {
      if (!this.ctx || !this.rainGain) return;
      const dropOsc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      dropOsc.type = 'sine';
      dropOsc.frequency.setValueAtTime(1000 + Math.random() * 800, this.ctx.currentTime);
      dropOsc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      dropGain.gain.setValueAtTime(0.05 * volume, this.ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      dropOsc.connect(dropGain);
      dropGain.connect(this.masterGain);

      dropOsc.start();
      dropOsc.stop(this.ctx.currentTime + 0.06);
    }, 150);
  }

  public stopRain() {
    if (this.rainNode) {
      try { (this.rainNode as AudioBufferSourceNode).stop(); } catch {}
      this.rainNode = null;
    }
    if (this.rainGain) {
      this.rainGain.disconnect();
      this.rainGain = null;
    }
    if (this.rainInterval) {
      clearInterval(this.rainInterval);
      this.rainInterval = null;
    }
  }

  // --- Ocean Generator ---
  public startOcean(volume = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.oceanGain) {
      this.oceanGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      return;
    }

    // Create noise for ocean
    const bufferSize = this.ctx.sampleRate * 3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const pinkNoise = this.ctx.createBufferSource();
    pinkNoise.buffer = buffer;
    pinkNoise.loop = true;

    // Filter modulated by LFO to simulate wave swell
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);

    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(300, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.oceanGain = this.ctx.createGain();
    this.oceanGain.gain.setValueAtTime(volume, this.ctx.currentTime);

    pinkNoise.connect(filter);
    filter.connect(this.oceanGain);
    this.oceanGain.connect(this.masterGain);

    pinkNoise.start();
    lfo.start();
    this.oceanOsc = lfo;
  }

  public stopOcean() {
    if (this.oceanOsc) {
      try { this.oceanOsc.stop(); } catch {}
      this.oceanOsc = null;
    }
    if (this.oceanGain) {
      this.oceanGain.disconnect();
      this.oceanGain = null;
    }
  }

  // --- Forest / Birdsong Generator ---
  public startForest(volume = 0.5) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.forestGain) {
      this.forestGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      return;
    }

    this.forestGain = this.ctx.createGain();
    this.forestGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.forestGain.connect(this.masterGain);

    // Subtle wind background
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const wind = this.ctx.createBufferSource();
    wind.buffer = buffer;
    wind.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(350, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(3, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    wind.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.forestGain);
    wind.start();

    // Occasional gentle bird chirps
    this.forestInterval = window.setInterval(() => {
      if (!this.ctx || !this.forestGain) return;
      const baseFreq = 2200 + Math.random() * 1200;
      const chirpOsc = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();

      chirpOsc.type = 'sine';
      const now = this.ctx.currentTime;
      chirpOsc.frequency.setValueAtTime(baseFreq, now);
      chirpOsc.frequency.linearRampToValueAtTime(baseFreq + 400, now + 0.08);
      chirpOsc.frequency.linearRampToValueAtTime(baseFreq - 200, now + 0.16);

      chirpGain.gain.setValueAtTime(0.04 * volume, now);
      chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      chirpOsc.connect(chirpGain);
      chirpGain.connect(this.forestGain);

      chirpOsc.start(now);
      chirpOsc.stop(now + 0.22);
    }, 2500);
  }

  public stopForest() {
    if (this.forestGain) {
      this.forestGain.disconnect();
      this.forestGain = null;
    }
    if (this.forestInterval) {
      clearInterval(this.forestInterval);
      this.forestInterval = null;
    }
  }

  // --- Zen Bowl Chime ---
  public playZenBowl(freq = 432) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic overtone
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 4.6);
    osc2.stop(now + 4.6);
  }

  // --- Sound Effects ---
  public playBubblePop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startFreq = 300 + Math.random() * 400;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  public playSquishSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  public playChimeSuccess() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.65);
    });
  }
}

export const audioSynth = new AudioSynthesizer();
