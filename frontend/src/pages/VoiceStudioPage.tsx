import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Cpu,
  CheckCircle2,
  Sliders,
  Shield,
  Zap
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { VoiceoverSettings } from '../types/project';
import { VoiceSelector } from '../components/voice/VoiceSelector';
import { WaveformVisualizer } from '../components/voice/WaveformVisualizer';
import { ThreeAudioVisualizer } from '../components/three/ThreeAudioVisualizer';
import { voiceService } from '../services/voiceService';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';
import { MOCK_ASSETS } from '../services/mockData';

export const VoiceStudioPage: React.FC = () => {
  const { activeProject, updateProjectVoiceover, updateProjectAssets } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<VoiceoverSettings>(
    activeProject?.voiceover || {
      voiceId: 'voice-1',
      speed: 1.05,
      pitch: 0,
      emotion: 'Authoritative',
      stability: 85,
      clarityBoost: 90,
      generatedDurationSeconds: 44.2,
      audioUrl: 'https://actions.google.com/sounds/v1/speech/tech_explainer.mp3'
    }
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);

  const scriptFullText =
    activeProject?.script?.sections.map((s) => s.content).join(' ') ||
    'Stop thinking of AI as just a fancy autocomplete. In 2026, AI agents don’t just suggest code—they test, debug, and run it.';

  const handleGenerateVoice = async () => {
    setIsGenerating(true);
    try {
      const res = await voiceService.generateVoiceover(scriptFullText, settings);
      const updated = {
        ...settings,
        audioUrl: res.audioUrl,
        generatedDurationSeconds: res.durationSeconds,
      };
      setSettings(updated);
      await updateProjectVoiceover(updated);

      showToast({
        type: 'success',
        title: 'Voiceover Synthesized',
        message: `Generated ${res.durationSeconds}s master voice track with neural pacing.`,
      });
    } catch (err) {
      showToast({ type: 'error', title: 'Generation Failed', message: 'Could not synthesize voiceover.' });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTogglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Simulate play progress
      let current = playProgress >= 100 ? 0 : playProgress;
      const interval = setInterval(() => {
        current += 2.5;
        if (current >= 100) {
          setPlayProgress(100);
          setIsPlaying(false);
          clearInterval(interval);
        } else {
          setPlayProgress(current);
        }
      }, 100);
    }
  };

  const handleProceedToAssets = async () => {
    if (!activeProject?.assets || activeProject.assets.length === 0) {
      await updateProjectAssets(MOCK_ASSETS);
    }
    navigate('/studio/assets');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-400 font-mono uppercase tracking-wider bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-800">
              STAGE 04
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Neural Voice Studio
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            ElevenLabs studio synthesis with speech pacing, tone inflections, and audio waveform generation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ai"
            size="sm"
            onClick={handleGenerateVoice}
            isLoading={isGenerating}
            icon={<Cpu className="w-3.5 h-3.5" />}
          >
            Synthesize Voiceover
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleProceedToAssets}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Match Visual B-Roll (Stage 05)
          </Button>
        </div>
      </div>

      {/* ElevenLabs API Status Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-forge-900 to-forge-900 border border-amber-600/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-950 border border-amber-700 text-amber-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              ElevenLabs Neural Audio Engine
            </h3>
            <p className="text-[11px] text-amber-300">
              High-fidelity voice synthesis with speech-to-speech cadence and phonetic accuracy.
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-amber-950 text-amber-300 font-mono px-2.5 py-1 rounded-full border border-amber-700 font-bold">
          STUDIO ENGINE READY
        </span>
      </div>

      {/* Voiceover Master Waveform & Three.js 3D Spectrum Player */}
      <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl glow-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white font-display">
              Three.js 3D Audio Spectrum & Waveform Track
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-forge-300">
            ~{settings.generatedDurationSeconds || 44.2}s Duration
          </span>
        </div>

        {/* Three.js 3D WebGL Audio Visualizer */}
        <ThreeAudioVisualizer isPlaying={isPlaying} color="#f59e0b" height={130} />

        <WaveformVisualizer
          isPlaying={isPlaying}
          progress={playProgress}
          onScrub={(pct) => setPlayProgress(pct)}
        />

        {/* Audio Player Controls */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlayback}
              className="p-2.5 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white shadow-glow-crimson transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setPlayProgress(0);
                setIsPlaying(false);
              }}
              className="p-2 rounded-xl bg-forge-800 hover:bg-forge-750 text-forge-300 hover:text-white transition-colors"
              title="Reset Audio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-forge-400 italic">
            Full script audio preview ({activeProject?.script?.totalWords || 118} words)
          </p>
        </div>
      </div>

      {/* Voice Actor Selection & Acoustics Slider Controls */}
      <VoiceSelector
        selectedVoiceId={settings.voiceId}
        onSelectVoice={(id) => {
          const updated = { ...settings, voiceId: id };
          setSettings(updated);
          updateProjectVoiceover(updated);
        }}
        settings={settings}
        onUpdateSettings={(newSettings) => {
          setSettings(newSettings);
          updateProjectVoiceover(newSettings);
        }}
        sampleScriptText={scriptFullText}
      />
    </div>
  );
};
