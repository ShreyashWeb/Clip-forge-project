import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sliders,
  Sparkles,
  ArrowRight,
  Save,
  RotateCcw,
  Undo2,
  Redo2,
  Play,
  Pause,
  Layers,
  FileText,
  Video,
  Music,
  Type,
  Wand2,
  Cpu,
  Plus,
  Check
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { TimelineTrackItem, MediaAsset } from '../types/project';
import { VideoPreview } from '../components/editor/VideoPreview';
import { Timeline } from '../components/editor/Timeline';
import { CaptionStylingPanel } from '../components/editor/CaptionStylingPanel';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const VideoEditorPage: React.FC = () => {
  const { activeProject, updateProjectTimeline, setProjectStatus } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [leftTab, setLeftTab] = useState<'media' | 'captions' | 'audio' | 'ai'>('media');

  const timeline = activeProject?.timeline || [];
  const totalDuration = 45; // seconds

  // Playback timer ticker
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return parseFloat((prev + 0.1).toFixed(1));
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Handle AI Auto-Assembly of Timeline based on Script
  const handleAutoAssemble = () => {
    const assets = activeProject?.assets || [];
    const script = activeProject?.script;

    const newTimeline: TimelineTrackItem[] = [
      {
        id: 'trk-vid-1',
        trackType: 'VIDEO',
        assetId: assets[0]?.id || 'asset-1',
        title: assets[0]?.title || 'Neural Coding Loop',
        startTime: 0,
        duration: 14,
      },
      {
        id: 'trk-vid-2',
        trackType: 'VIDEO',
        assetId: assets[3]?.id || 'asset-4',
        title: assets[3]?.title || 'Data Grid & Benchmarks',
        startTime: 14,
        duration: 12,
      },
      {
        id: 'trk-vid-3',
        trackType: 'VIDEO',
        assetId: assets[1]?.id || 'asset-2',
        title: assets[1]?.title || 'Architect Workflow',
        startTime: 26,
        duration: 19,
      },
      {
        id: 'trk-voice-1',
        trackType: 'VOICE',
        title: 'Master Voiceover (Marcus Vance)',
        startTime: 0,
        duration: 44,
        volume: 100,
      },
      {
        id: 'trk-audio-1',
        trackType: 'AUDIO',
        title: 'Intro Sub Bass SFX',
        startTime: 0,
        duration: 3,
        volume: 70,
      },
      {
        id: 'trk-audio-2',
        trackType: 'AUDIO',
        title: 'Cyber Pulse BGM (Lo-fi)',
        startTime: 1,
        duration: 44,
        volume: 18,
      },
      {
        id: 'trk-cap-1',
        trackType: 'CAPTIONS',
        title: 'Dynamic Pop Subtitles',
        startTime: 0,
        duration: 44,
        text: 'Dynamic Animated Words',
      },
      {
        id: 'trk-txt-1',
        trackType: 'TEXT',
        title: 'Headline Hook Overlay',
        startTime: 0.5,
        duration: 5,
        text: 'AI AGENTS ≠ CHATBOTS',
      },
    ];

    updateProjectTimeline(newTimeline);
    showToast({
      type: 'ai',
      title: 'Timeline Auto-Assembled',
      message: 'AI aligned 5 tracks with your research script and B-roll.',
    });
  };

  const handleProceedToRender = () => {
    navigate('/studio/render');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Studio Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-crimson-400 font-mono uppercase tracking-wider bg-crimson-950 px-2.5 py-0.5 rounded-full border border-crimson-800">
              STAGE 06
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Multi-Track Video Editor
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            Professional browser NLE with 9:16 canvas preview, layer trimming, and dynamic burned-in pop captions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-forge-900 border border-forge-700/60 rounded-xl p-1">
            <button
              onClick={() => showToast({ type: 'info', title: 'Undo', message: 'Reverted previous timeline action.' })}
              className="p-1.5 rounded-lg hover:bg-forge-800 text-forge-400 hover:text-white transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => showToast({ type: 'info', title: 'Redo', message: 'Restored timeline action.' })}
              className="p-1.5 rounded-lg hover:bg-forge-800 text-forge-400 hover:text-white transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleAutoAssemble}
            icon={<Wand2 className="w-3.5 h-3.5 text-purple-400" />}
          >
            Auto Assemble
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleProceedToRender}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Final Render & Export (Stage 07)
          </Button>
        </div>
      </div>

      {/* Main Studio Viewport (Left Asset/Tool Inspector + Center 9:16 Video Player) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Switchable Tools / Media / Captions Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-forge-900 p-1.5 rounded-2xl border border-forge-700/60">
            <button
              onClick={() => setLeftTab('media')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'media'
                  ? 'bg-crimson-600 text-white shadow-glow-crimson'
                  : 'text-forge-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Media</span>
            </button>

            <button
              onClick={() => setLeftTab('captions')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'captions'
                  ? 'bg-crimson-600 text-white shadow-glow-crimson'
                  : 'text-forge-400 hover:text-white'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Captions</span>
            </button>

            <button
              onClick={() => setLeftTab('audio')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'audio'
                  ? 'bg-crimson-600 text-white shadow-glow-crimson'
                  : 'text-forge-400 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Audio</span>
            </button>

            <button
              onClick={() => setLeftTab('ai')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                leftTab === 'ai'
                  ? 'bg-purple-600 text-white shadow-glow-crimson'
                  : 'text-purple-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Copilot</span>
            </button>
          </div>

          {/* Tab Content Box */}
          {leftTab === 'media' && (
            <div className="bg-forge-900 border border-forge-700/80 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-forge-800">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Project Assets & B-Roll
                </span>
                <span className="text-[10px] text-forge-400">Click to add</span>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                {(activeProject?.assets || []).map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      const newTrackItem: TimelineTrackItem = {
                        id: 'trk-' + Date.now(),
                        trackType: (asset.type === 'video' ? 'VIDEO' : asset.type === 'audio' ? 'AUDIO' : 'VIDEO') as any,
                        assetId: asset.id,
                        title: asset.title,
                        startTime: currentTime,
                        duration: asset.durationSeconds || 10,
                      };
                      updateProjectTimeline([...timeline, newTrackItem]);
                      showToast({ type: 'success', title: 'Added Clip', message: `Inserted at ${currentTime}s.` });
                    }}
                    className="p-2 rounded-xl bg-forge-950 border border-forge-800 hover:border-crimson-500/50 cursor-pointer group transition-all"
                  >
                    <div className="aspect-video bg-black rounded-lg overflow-hidden mb-1.5 relative">
                      <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono text-white px-1 rounded">
                        {asset.durationSeconds || 10}s
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-white truncate">{asset.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {leftTab === 'captions' && <CaptionStylingPanel />}

          {leftTab === 'audio' && (
            <div className="bg-forge-900 border border-forge-700/80 rounded-2xl p-4 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider block pb-2 border-b border-forge-800">
                Audio & Sound Design
              </span>
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-forge-950 border border-forge-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Cyber Pulse Bed (Lo-fi Tech)</p>
                    <p className="text-[10px] text-forge-400">Background Ambient Music (Volume: 18%)</p>
                  </div>
                  <span className="text-[10px] bg-purple-950 text-purple-300 px-2 py-0.5 rounded font-mono font-bold">
                    ACTIVE
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-forge-950 border border-forge-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">Cinematic Sub-Bass Impact</p>
                    <p className="text-[10px] text-forge-400">Hook Transition SFX (Volume: 75%)</p>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          )}

          {leftTab === 'ai' && (
            <div className="bg-forge-900 border border-purple-500/40 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-forge-800">
                <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  AI Editorial Assistant
                </span>
              </div>
              <p className="text-xs text-forge-300 leading-relaxed">
                ClipForage AI automatically aligned your B-roll cuts with the vocal cadence of your script.
              </p>
              <Button size="sm" variant="ai" className="w-full" onClick={handleAutoAssemble}>
                Re-Sync Cuts with Pacing
              </Button>
            </div>
          )}
        </div>

        {/* Right 7 Cols: 9:16 Video Canvas Preview */}
        <div className="lg:col-span-7 flex justify-center">
          <VideoPreview
            currentTime={currentTime}
            totalDuration={totalDuration}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(!isPlaying)}
            onSeek={(t) => setCurrentTime(t)}
            timeline={timeline}
            projectTitle={activeProject?.title || 'ClipForage AI Short'}
          />
        </div>
      </div>

      {/* Bottom Full-Width Multi-Track Timeline */}
      <Timeline
        timeline={timeline}
        totalDuration={totalDuration}
        currentTime={currentTime}
        isPlaying={isPlaying}
        onSeek={(sec) => setCurrentTime(sec)}
        onUpdateTimeline={(items) => updateProjectTimeline(items)}
        onAutoAssemble={handleAutoAssemble}
      />
    </div>
  );
};
