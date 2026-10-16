// Lightweight Web Audio API engine providing authentic sound effects
// synchronized directly to HTML5 Safari video playback.

export type VideoSoundType =
  | 'lion-roar'
  | 'river-crossing'
  | 'elephant-rumble'
  | 'cheetah-sprint'
  | 'kalimba-bush'
  | 'tsavo-evening'
  | 'maasai-chants'
  | 'lake-birds'
  | 'coastal-surf';

class VideoAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private activeNodes: (AudioNode | { stop?: () => void })[] = [];
  private intervalIds: number[] = [];
  private volume: number = 0.75;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];

    this.activeNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        if ('disconnect' in node && typeof node.disconnect === 'function') {
          node.disconnect();
        }
      } catch {
        // ignore cleanup errors
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public play(type: VideoSoundType) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.isPlaying = true;

    switch (type) {
      case 'lion-roar':
        this.playLionRoar();
        break;
      case 'river-crossing':
        this.playRiverCrossing();
        break;
      case 'elephant-rumble':
        this.playElephantRumble();
        break;
      case 'cheetah-sprint':
        this.playCheetahSprint();
        break;
      case 'kalimba-bush':
        this.playKalimba();
        break;
      case 'tsavo-evening':
        this.playTsavoEvening();
        break;
      case 'maasai-chants':
        this.playMaasaiChants();
        break;
      case 'lake-birds':
        this.playLakeBirds();
        break;
      case 'coastal-surf':
        this.playCoastalSurf();
        break;
    }
  }

  // Pink savannah wind noise
  private createSavannahWind(freq = 360, q = 2, gainLevel = 0.12) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.1;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = freq;
    filter.Q.value = q;

    const gain = this.ctx.createGain();
    gain.gain.value = gainLevel;

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start();
    this.activeNodes.push(noiseSource, filter, gain);
  }

  // 1. Lion Roar
  private playLionRoar() {
    this.createSavannahWind(320, 2.5, 0.14);

    const trigger = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(85, now);
      osc.frequency.linearRampToValueAtTime(115, now + 0.8);
      osc.frequency.linearRampToValueAtTime(70, now + 2.5);
      osc.frequency.linearRampToValueAtTime(50, now + 4.2);

      const f1 = this.ctx.createBiquadFilter();
      f1.type = 'bandpass';
      f1.frequency.value = 260;
      f1.Q.value = 4.0;

      const roarGain = this.ctx.createGain();
      roarGain.gain.setValueAtTime(0.001, now);
      roarGain.gain.exponentialRampToValueAtTime(0.4, now + 0.9);
      roarGain.gain.linearRampToValueAtTime(0.3, now + 2.6);
      roarGain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

      osc.connect(f1);
      f1.connect(roarGain);
      roarGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 4.6);
    };

    trigger();
    this.intervalIds.push(window.setInterval(trigger, 8500));
  }

  // 2. Mara River Crossing
  private playRiverCrossing() {
    this.createSavannahWind(650, 1.2, 0.22);
    this.createSavannahWind(220, 2.5, 0.18);

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      [0, 0.14].forEach((offset) => {
        if (!this.ctx || !this.masterGain) return;
        const t = now + offset;
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, t);
        osc.frequency.exponentialRampToValueAtTime(35, t + 0.08);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.12, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.1);
      });
    }, 400);

    this.intervalIds.push(interval);
  }

  // 3. Elephant Rumble
  private playElephantRumble() {
    this.createSavannahWind(260, 2.2, 0.12);

    const trigger = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(45, now);
      osc.frequency.linearRampToValueAtTime(65, now + 1.5);
      osc.frequency.linearRampToValueAtTime(40, now + 3.5);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.35, now + 1.0);
      g.gain.exponentialRampToValueAtTime(0.001, now + 4.0);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 4.2);
    };

    trigger();
    this.intervalIds.push(window.setInterval(trigger, 7500));
  }

  // 4. Cheetah Sprint
  private playCheetahSprint() {
    this.createSavannahWind(440, 2.0, 0.15);

    // Rapid footsteps rhythm
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.1, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.07);
    }, 180);

    this.intervalIds.push(interval);
  }

  // 5. Kalimba Bush
  private playKalimba() {
    this.createSavannahWind(300, 2.0, 0.05);

    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
    const sequence = [0, 2, 4, 3, 5, 4, 2, 1, 3, 5, 6, 4];
    let step = 0;

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const freq = scale[sequence[step % sequence.length]];

      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.16, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 1.3);

      step++;
    }, 450);

    this.intervalIds.push(interval);
  }

  // 6. Tsavo Evening
  private playTsavoEvening() {
    this.createSavannahWind(350, 1.8, 0.06);

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      for (let i = 0; i < 3; i++) {
        const t = now + i * 0.05;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4600 + Math.random() * 200, t);

        const g = this.ctx.createGain();
        g.gain.setValueAtTime(0.001, t);
        g.gain.linearRampToValueAtTime(0.03, t + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

        osc.connect(g);
        g.connect(this.masterGain);
        osc.start(t);
        osc.stop(t + 0.05);
      }
    }, 600);

    this.intervalIds.push(interval);
  }

  // 7. Maasai Chants
  private playMaasaiChants() {
    this.createSavannahWind(280, 2.5, 0.04);

    let beat = 0;
    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Stomp
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.16);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.28, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.22);

      // Vocal resonance
      if (beat % 2 === 0) {
        const chant = this.ctx.createOscillator();
        chant.type = 'sawtooth';
        chant.frequency.setValueAtTime(140, now + 0.05);
        chant.frequency.linearRampToValueAtTime(120, now + 0.3);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 450;
        filter.Q.value = 5.0;

        const cGain = this.ctx.createGain();
        cGain.gain.setValueAtTime(0.001, now + 0.05);
        cGain.gain.linearRampToValueAtTime(0.18, now + 0.1);
        cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        chant.connect(filter);
        filter.connect(cGain);
        cGain.connect(this.masterGain);

        chant.start(now + 0.05);
        chant.stop(now + 0.4);
      }

      beat++;
    }, 550);

    this.intervalIds.push(interval);
  }

  // 8. Lake Birds
  private playLakeBirds() {
    this.createSavannahWind(480, 1.5, 0.1);

    const interval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.4);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.08, now + 0.08);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.5);
    }, 1800);

    this.intervalIds.push(interval);
  }

  // 9. Coastal Surf
  private playCoastalSurf() {
    this.createSavannahWind(280, 1.8, 0.18);
    this.createSavannahWind(600, 2.0, 0.12);
  }
}

export const videoAudioEngine = new VideoAudioEngine();
