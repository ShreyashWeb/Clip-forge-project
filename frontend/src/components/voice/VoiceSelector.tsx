import React, { useState } from 'react';
import { Play, Pause, Check, Volume2, Sparkles, Mic, Sliders, Shield } from 'lucide-react';
import { VoiceProfile, VoiceoverSettings } from '../../types/project';
import { MOCK_VOICES } from '../../services/mockData';
import { voiceService } from '../../services/voiceService';
import { Badge } from '../common/Badge';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onSelectVoice: (id: string) => void;
  settings: VoiceoverSettings;
  onUpdateSettings: (settings: VoiceoverSettings) => void;
  sampleScriptText?: string;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  onSelectVoice,
  settings,
  onUpdateSettings,
  sampleScriptText = 'Stop thinking of AI as just a fancy autocomplete. In 2026, AI agents test, debug, and ship code.',
}) => {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const handleTogglePreview = (voice: VoiceProfile) => {
    if (playingVoiceId === voice.id) {
      voiceService.stopPreview();
      setPlayingVoiceId(null);
    } else {
      voiceService.stopPreview();
      setPlayingVoiceId(voice.id);
      voiceService.speakPreview(sampleScriptText, voice.name, settings.speed || 1.0);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Cast Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold text-forge-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mic className="w-4 h-4 text-crimson-400" />
            <span>Select AI Voice Actor</span>
          </label>
          <span className="text-[11px] text-forge-400">
            {MOCK_VOICES.length} voices available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_VOICES.map((voice) => {
            const isSelected = selectedVoiceId === voice.id;
            const isPreviewing = playingVoiceId === voice.id;

            return (
              <div
                key={voice.id}
                onClick={() => onSelectVoice(voice.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-crimson-950/40 border-crimson-500/80 shadow-glow-crimson ring-1 ring-crimson-500/40'
                    : 'bg-forge-850/80 border-forge-700/60 hover:bg-forge-800 hover:border-forge-600'
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm tracking-wide">{voice.name}</span>
                    {voice.isPremium && (
                      <span className="text-[9px] bg-amber-950 text-amber-400 font-mono font-bold px-1.5 py-0.5 rounded border border-amber-700/40">
                        ELEVENLABS
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-forge-300 mt-0.5 truncate">{voice.style}</p>
                  <p className="text-[10px] text-forge-500 font-mono">{voice.accent} • {voice.gender}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePreview(voice);
                    }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isPreviewing
                        ? 'bg-crimson-600 text-white animate-pulse shadow-glow-crimson'
                        : 'bg-forge-800 hover:bg-forge-700 text-forge-300 hover:text-white border border-forge-700'
                    }`}
                    title="Preview voice sample"
                  >
                    {isPreviewing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'bg-crimson-600 border-crimson-500 text-white'
                        : 'border-forge-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Tuning Controls */}
      <div className="bg-forge-900 border border-forge-700/70 rounded-2xl p-5 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-forge-700/60">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-crimson-400" />
            <span>Voice Acoustics & Delivery Controls</span>
          </div>
          <span className="text-[10px] bg-forge-800 text-forge-400 font-mono px-2 py-0.5 rounded">
            REAL-TIME
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Speed Slider */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-forge-400 font-medium">Pacing / Speed</span>
              <span className="font-mono font-bold text-white">{settings.speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.50"
              step="0.05"
              value={settings.speed}
              onChange={(e) =>
                onUpdateSettings({ ...settings, speed: parseFloat(e.target.value) })
              }
              className="w-full h-1.5 bg-forge-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-forge-500 font-mono mt-1">
              <span>0.75x Slow</span>
              <span>1.0x Normal</span>
              <span>1.5x Fast</span>
            </div>
          </div>

          {/* Emotion Preset */}
          <div>
            <label className="block text-xs text-forge-400 font-medium mb-2">
              Emotional Inflection
            </label>
            <select
              value={settings.emotion}
              onChange={(e) =>
                onUpdateSettings({ ...settings, emotion: e.target.value as any })
              }
              className="glass-input w-full"
            >
              <option value="Authoritative">Authoritative (Tech Explainer)</option>
              <option value="Energetic">Energetic (High Velocity Short)</option>
              <option value="Neutral">Neutral & Balanced</option>
              <option value="Empathetic">Empathetic (Storytelling)</option>
              <option value="Suspenseful">Suspenseful (Curiosity Hook)</option>
            </select>
          </div>

          {/* Clarity / Stability Slider */}
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-forge-400 font-medium">Stability & Clarity</span>
              <span className="font-mono font-bold text-white">{settings.stability}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={settings.stability}
              onChange={(e) =>
                onUpdateSettings({ ...settings, stability: parseInt(e.target.value) })
              }
              className="w-full h-1.5 bg-forge-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-forge-500 font-mono mt-1">
              <span>Dynamic Expression</span>
              <span>Rock Solid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
