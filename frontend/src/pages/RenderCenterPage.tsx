import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Cpu,
  Sparkles,
  Download,
  Share2,
  Play,
  RotateCcw,
  CheckCircle2,
  BarChart3,
  Sliders,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { RenderPipeline } from '../components/render/RenderPipeline';
import { ExportModal } from '../components/render/ExportModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export const RenderCenterPage: React.FC = () => {
  const { activeProject, updateActiveProject, setProjectStatus } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(activeProject?.renderProgress || 0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Hardware H.264 Encoder Loaded',
    '[INIT] Workspace Target: 1080x1920 (9:16 Portrait)',
  ]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const isCompleted = renderProgress >= 100;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EF4444', '#DC2626', '#8B5CF6', '#10B981', '#FFFFFF'],
    });
  };

  const startRenderJob = () => {
    setIsRendering(true);
    setRenderProgress(5);
    setCurrentStepIndex(0);
    setLogs([
      '[INIT] FFmpeg Pipe Open: /usr/local/bin/ffmpeg -y -f concat',
      '[STAGE 1] Ingesting 3 video B-roll streams & conforming to 1080x1920',
    ]);

    const steps = [
      { pct: 20, step: 0, log: '[STAGE 1] Conformed 9:16 viewport • Resolution 1080x1920 60fps' },
      { pct: 40, step: 1, log: '[STAGE 2] Synthesizing ElevenLabs neural voiceover (Marcus Vance @ 1.05x)' },
      { pct: 65, step: 2, log: '[STAGE 3] Compositing 5 multi-track layers & Lo-fi audio bed' },
      { pct: 85, step: 3, log: '[STAGE 4] Burning dynamic word-level pop subtitles & fact-check watermark' },
      { pct: 98, step: 4, log: '[STAGE 5] Hardware NVENC H.264 High Profile encoding' },
      { pct: 100, step: 5, log: '[COMPLETE] 1080x1920 Master Short Rendered Successfully (12.4 MB)' },
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < steps.length) {
        const s = steps[currentIdx];
        setRenderProgress(s.pct);
        setCurrentStepIndex(s.step);
        setLogs((prev) => [...prev, s.log]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsRendering(false);
        setProjectStatus('COMPLETED');
        updateActiveProject({
          renderProgress: 100,
          renderedVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4',
        });
        triggerConfetti();
        showToast({
          type: 'success',
          title: 'Video Rendered!',
          message: 'Your research-backed short is ready for publishing.',
        });
      }
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-purple-400 font-mono uppercase tracking-wider bg-purple-950 px-2.5 py-0.5 rounded-full border border-purple-800">
              STAGE 07
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Render Center & Publishing
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            Hardware-accelerated rendering with burned dynamic subtitles and multi-platform packaging.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/studio/editor')}
            icon={<Sliders className="w-3.5 h-3.5" />}
          >
            Back to Editor
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/studio/analytics')}
            rightIcon={<BarChart3 className="w-4 h-4" />}
          >
            View Retention Analytics
          </Button>
        </div>
      </div>

      {/* Render Action Control */}
      {!isCompleted && !isRendering && (
        <div className="bg-gradient-to-r from-forge-850 via-forge-900 to-crimson-950/40 border border-crimson-500/50 rounded-3xl p-8 text-center space-y-5 shadow-2xl glow-border">
          <div className="w-16 h-16 rounded-2xl bg-crimson-950/80 border border-crimson-700/50 text-crimson-400 flex items-center justify-center mx-auto shadow-glow-crimson">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-1">
            <h2 className="text-xl font-bold text-white font-display">
              Ready to Render Production Master Video?
            </h2>
            <p className="text-xs text-forge-300">
              All 5 tracks (Video, Voice, Audio, Captions, Text) are verified and staged.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={startRenderJob}
            icon={<Sparkles className="w-5 h-5" />}
          >
            Start 60FPS High-Bitrate Render
          </Button>
        </div>
      )}

      {/* Live Pipeline Visualizer */}
      {(isRendering || isCompleted) && (
        <RenderPipeline
          progress={renderProgress}
          currentStepIndex={currentStepIndex}
          logs={logs}
          isCompleted={isCompleted}
        />
      )}

      {/* Completed Output Card with Preview & Export */}
      {isCompleted && (
        <div className="bg-forge-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-forge-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  1080x1920 Master Short Ready
                </h3>
                <p className="text-xs text-emerald-300">
                  Encoded at 1080x1920 60FPS • AAC 320kbps Audio • Burned Dynamic Subtitles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={startRenderJob}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Re-Render
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsExportModalOpen(true)}
                icon={<Share2 className="w-4 h-4" />}
              >
                Publishing Pack & Download
              </Button>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
            <div className="relative w-64 aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-forge-800 shadow-glow-crimson">
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1738-large.mp4"
                controls
                autoPlay
                loop
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <span className="text-xs font-bold text-forge-400 uppercase tracking-wider">
                  Master File Metadata
                </span>
                <div className="p-4 rounded-2xl bg-forge-950 border border-forge-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-forge-400">File Format:</span>
                    <span className="text-white font-mono font-bold">MP4 (H.264 / AAC)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forge-400">Resolution:</span>
                    <span className="text-white font-mono font-bold">1080 x 1920 (9:16)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forge-400">Frame Rate:</span>
                    <span className="text-white font-mono font-bold">60.00 FPS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forge-400">File Size:</span>
                    <span className="text-emerald-400 font-mono font-bold">12.4 MB</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => setIsExportModalOpen(true)}
                icon={<Download className="w-4 h-4" />}
              >
                Download Master MP4 File
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {activeProject && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          project={activeProject}
        />
      )}
    </div>
  );
};
