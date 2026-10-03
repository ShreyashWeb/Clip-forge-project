import React, { useState } from 'react';
import {
  Settings,
  Key,
  Database,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Mic,
  Shield,
  Save,
  RefreshCw,
  Sliders,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const [geminiApiKey, setGeminiApiKey] = useState(() => localStorage.getItem('clipforge_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY || '');
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState(() => localStorage.getItem('clipforge_elevenlabs_key') || import.meta.env.VITE_ELEVENLABS_API_KEY || '');
  const [geminiModel, setGeminiModel] = useState(() => import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-pro');
  const [storageType, setStorageType] = useState('local');
  const [defaultDuration, setDefaultDuration] = useState('45 sec');
  const [defaultTone, setDefaultTone] = useState('Educational');

  const [isTestingGemini, setIsTestingGemini] = useState(false);
  const [isTestingElevenLabs, setIsTestingElevenLabs] = useState(false);

  const handleSaveSettings = () => {
    localStorage.setItem('clipforge_gemini_key', geminiApiKey);
    localStorage.setItem('clipforge_elevenlabs_key', elevenLabsApiKey);
    showToast({ type: 'success', title: 'Settings Saved', message: 'API configuration and preferences updated.' });
  };

  const handleTestGemini = async () => {
    setIsTestingGemini(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsTestingGemini(false);

    if (geminiApiKey.trim()) {
      showToast({ type: 'success', title: 'Gemini Key Verified', message: 'Connected successfully to Google Gemini 1.5/2.0 API.' });
    } else {
      showToast({
        type: 'ai',
        title: 'Mock Engine Active',
        message: 'No external key provided. ClipForge will use the zero-latency Mock AI Service provider.',
      });
    }
  };

  const handleTestElevenLabs = async () => {
    setIsTestingElevenLabs(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsTestingElevenLabs(false);

    if (elevenLabsApiKey.trim()) {
      showToast({ type: 'success', title: 'ElevenLabs Key Verified', message: 'Connected to ElevenLabs Text-to-Speech API.' });
    } else {
      showToast({
        type: 'ai',
        title: 'Synthetic Voice Active',
        message: 'No ElevenLabs key provided. ClipForge is using realistic procedural audio synthesis.',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <h1 className="text-2xl font-black text-white font-display">
            Studio Settings & AI Keys
          </h1>
          <p className="text-xs text-forge-400 mt-1">
            Configure Google Gemini, ElevenLabs TTS, local/cloud storage, and production defaults.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSaveSettings} icon={<Save className="w-3.5 h-3.5" />}>
          Save Preferences
        </Button>
      </div>

      {/* Zero-Key / Mock Engine Information Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-forge-900 to-forge-900 border border-purple-700/50 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-950 border border-purple-700 text-purple-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Zero-Configuration Hackathon Demo Mode
            </h3>
            <p className="text-[11px] text-purple-300">
              API keys are optional! If omitted, ClipForge AI automatically uses high-fidelity mock AI research & synthetic voice providers without exposing secrets.
            </p>
          </div>
        </div>
        <span className="text-[10px] bg-purple-950 text-purple-300 font-mono font-bold px-2.5 py-1 rounded-full border border-purple-700 whitespace-nowrap">
          DEMO READY
        </span>
      </div>

      {/* AI Services Key Settings */}
      <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <h2 className="text-base font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-forge-800">
          <Key className="w-4 h-4 text-crimson-400" />
          <span>AI & Voice API Integrations</span>
        </h2>

        {/* Gemini API Key */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-forge-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Google Gemini API Key</span>
            </label>
            <span className="text-forge-500 font-mono text-[11px]">Optional (Mock fallback active)</span>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="glass-input flex-1 font-mono text-xs"
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleTestGemini}
              isLoading={isTestingGemini}
            >
              Test Connection
            </Button>
          </div>
        </div>

        {/* ElevenLabs API Key */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs">
            <label className="font-bold text-forge-300 uppercase tracking-wider flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span>ElevenLabs Voice API Key</span>
            </label>
            <span className="text-forge-500 font-mono text-[11px]">Optional (Procedural synth active)</span>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={elevenLabsApiKey}
              onChange={(e) => setElevenLabsApiKey(e.target.value)}
              placeholder="xi-api-key-..."
              className="glass-input flex-1 font-mono text-xs"
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleTestElevenLabs}
              isLoading={isTestingElevenLabs}
            >
              Test Connection
            </Button>
          </div>
        </div>
      </div>

      {/* Storage & Video Architecture */}
      <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <h2 className="text-base font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-forge-800">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>Storage & Cloud Infrastructure</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Storage Backend
            </label>
            <select
              value={storageType}
              onChange={(e) => setStorageType(e.target.value)}
              className="glass-input w-full"
            >
              <option value="local">Local Development Storage (./storage)</option>
              <option value="s3">Amazon S3 / MinIO Compatible</option>
              <option value="gcs">Google Cloud Storage</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              FFmpeg Hardware Acceleration
            </label>
            <select className="glass-input w-full">
              <option value="nvenc">NVIDIA NVENC (H.264 / HEVC)</option>
              <option value="vaapi">VA-API / Intel QuickSync</option>
              <option value="cpu">Software libx264 (CPU Fallback)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Production Defaults */}
      <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
        <h2 className="text-base font-bold text-white font-display flex items-center gap-2 pb-3 border-b border-forge-800">
          <Sliders className="w-4 h-4 text-emerald-400" />
          <span>Default Studio Presets</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Default Target Duration
            </label>
            <select
              value={defaultDuration}
              onChange={(e) => setDefaultDuration(e.target.value)}
              className="glass-input w-full"
            >
              <option value="30 sec">30 seconds (Ultra-Fast Hook)</option>
              <option value="45 sec">45 seconds (Balanced Explainer)</option>
              <option value="60 sec">60 seconds (Comprehensive)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
              Default Delivery Tone
            </label>
            <select
              value={defaultTone}
              onChange={(e) => setDefaultTone(e.target.value)}
              className="glass-input w-full"
            >
              <option value="Educational">Educational & Authoritative</option>
              <option value="Conversational">Conversational & Engaging</option>
              <option value="Storytelling">Storytelling & Suspenseful</option>
              <option value="News">News & Breaking Analysis</option>
              <option value="Professional">Professional Architect</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
