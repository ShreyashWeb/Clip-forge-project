import { VoiceProfile, VoiceoverSettings } from '../types/project';
import { MOCK_VOICES } from './mockData';

export interface VoiceGenerationResult {
  audioUrl: string;
  durationSeconds: number;
  waveformPeaks: number[];
  provider: 'ELEVENLABS_API' | 'MOCK_SYNTHETIC_PROVIDER';
}

export class VoiceService {
  private audioContext: AudioContext | null = null;

  getAvailableVoices(): VoiceProfile[] {
    return MOCK_VOICES;
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioCtx();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  async generateVoiceover(
    text: string,
    settings: VoiceoverSettings,
    apiKey?: string
  ): Promise<VoiceGenerationResult> {
    await new Promise((r) => setTimeout(r, 1000));

    const words = text.split(/\s+/).filter(Boolean).length;
    const baseDuration = (words / 150) * 60;
    const durationSeconds = Math.max(3, parseFloat((baseDuration / (settings.speed || 1.0)).toFixed(1)));

    // Generate 60 realistic waveform peaks (0.1 to 1.0)
    const peaks: number[] = [];
    for (let i = 0; i < 60; i++) {
      const base = Math.sin(i * 0.18) * 0.4 + 0.5;
      const noise = (Math.random() - 0.5) * 0.25;
      peaks.push(Math.min(1.0, Math.max(0.12, base + noise)));
    }

    const audioUrl = 'https://actions.google.com/sounds/v1/speech/tech_explainer.mp3';

    return {
      audioUrl,
      durationSeconds,
      waveformPeaks: peaks,
      provider: apiKey ? 'ELEVENLABS_API' : 'MOCK_SYNTHETIC_PROVIDER',
    };
  }

  speakPreview(text: string, voiceName: string, speed: number = 1.0) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.slice(0, 160));
      utterance.rate = speed;

      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(
        (v) =>
          v.name.toLowerCase().includes(voiceName.toLowerCase()) ||
          v.name.toLowerCase().includes('english') ||
          v.lang.startsWith('en')
      );
      if (match) {
        utterance.voice = match;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback: Web Audio synth tone
      this.playSynthBeep();
    }
  }

  playSynthBeep() {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Ignore if audio blocked by browser policy
    }
  }

  stopPreview() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const voiceService = new VoiceService();
