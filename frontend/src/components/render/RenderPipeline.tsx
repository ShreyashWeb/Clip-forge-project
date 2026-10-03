import React from 'react';
import { CheckCircle2, Loader2, Cpu, FileCheck, Mic, Video, Sparkles, Terminal } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

interface RenderPipelineProps {
  progress: number;
  currentStepIndex: number;
  logs: string[];
  isCompleted: boolean;
}

export const RenderPipeline: React.FC<RenderPipelineProps> = ({
  progress,
  currentStepIndex,
  logs,
  isCompleted,
}) => {
  const steps = [
    { title: 'Asset Ingestion & Scaling', desc: 'Conforming 9:16 portrait viewport & caching B-roll layers', icon: Video },
    { title: 'Neural Voice Synthesis', desc: 'Syncing ElevenLabs voice actor & generating speech waveform', icon: Mic },
    { title: 'Timeline Video Compositing', desc: 'Applying trimming, overlays, and GPU transitions', icon: Cpu },
    { title: 'Dynamic Animated Subtitles', desc: 'Burning word-level pop captions into video stream', icon: Sparkles },
    { title: 'FFmpeg H.264 Video Encoding', desc: '1080x1920 60FPS high bitrate rendering', icon: FileCheck },
  ];

  return (
    <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      {/* Progress Bar & Status Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${isCompleted ? 'bg-emerald-950 border-emerald-700 text-emerald-400' : 'bg-crimson-950 border-crimson-700 text-crimson-400 shadow-glow-crimson'}`}>
              <Cpu className={`w-5 h-5 ${isCompleted ? '' : 'animate-spin'}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {isCompleted ? 'Rendering Complete & Ready to Publish' : 'Rendering Production Short'}
              </h3>
              <p className="text-xs text-forge-400">
                {isCompleted ? '1080x1920 60FPS Master video generated successfully' : 'Processing research-backed timeline and audio tracks'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black font-mono text-white tracking-tight">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        <ProgressBar progress={progress} size="lg" animated={!isCompleted} />
      </div>

      {/* 5-Step Pipeline Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex || isCompleted;
          const isCurrent = idx === currentStepIndex && !isCompleted;

          return (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : isCurrent
                  ? 'bg-crimson-950/60 border-crimson-500/80 text-white shadow-glow-crimson ring-1 ring-crimson-500/40 animate-pulse'
                  : 'bg-forge-850/60 border-forge-700/40 text-forge-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <step.icon className={`w-4 h-4 ${isDone ? 'text-emerald-400' : isCurrent ? 'text-crimson-400' : 'text-forge-600'}`} />
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-crimson-400 animate-spin" />
                ) : (
                  <span className="text-[10px] font-mono text-forge-600">0{idx + 1}</span>
                )}
              </div>

              <div>
                <p className="text-xs font-bold leading-tight line-clamp-1">{step.title}</p>
                <p className="text-[10px] text-forge-400 mt-1 line-clamp-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live FFmpeg & Render Log Stream */}
      <div className="bg-forge-950 rounded-2xl border border-forge-800 p-4 font-mono text-xs text-forge-300 space-y-2">
        <div className="flex items-center justify-between pb-2 border-b border-forge-800 text-[11px] text-forge-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-crimson-400" />
            <span className="font-bold uppercase tracking-wider text-forge-300">Live Render Log Console</span>
          </div>
          <span className="text-emerald-400 font-bold">FFmpeg Hardware Pipe: ACTIVE</span>
        </div>

        <div className="max-h-32 overflow-y-auto space-y-1 text-[11px] text-forge-300 pt-1">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-forge-600 select-none">›</span>
              <span className={log.includes('COMPLETE') ? 'text-emerald-400 font-bold' : log.includes('ENCODING') ? 'text-crimson-300' : 'text-forge-300'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
