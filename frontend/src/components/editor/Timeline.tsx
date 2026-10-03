import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  Plus,
  Video,
  Music,
  Mic,
  FileText,
  Type,
  ZoomIn,
  ZoomOut,
  Scissors,
  Wand2
} from 'lucide-react';
import { TimelineTrackItem, ScriptData, MediaAsset } from '../../types/project';
import { TrackItem } from './TrackItem';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

interface TimelineProps {
  timeline: TimelineTrackItem[];
  totalDuration: number;
  currentTime: number;
  isPlaying: boolean;
  onSeek: (seconds: number) => void;
  onUpdateTimeline: (items: TimelineTrackItem[]) => void;
  onAutoAssemble: () => void;
}

export const Timeline: React.FC<TimelineProps> = ({
  timeline,
  totalDuration = 45,
  currentTime,
  isPlaying,
  onSeek,
  onUpdateTimeline,
  onAutoAssemble,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const { showToast } = useToast();

  const tracks: { type: TimelineTrackItem['trackType']; label: string; icon: any; color: string }[] = [
    { type: 'VIDEO', label: 'Video Track', icon: Video, color: 'text-cyan-400' },
    { type: 'AUDIO', label: 'Audio / SFX', icon: Music, color: 'text-purple-400' },
    { type: 'VOICE', label: 'Voiceover', icon: Mic, color: 'text-amber-400' },
    { type: 'CAPTIONS', label: 'Captions', icon: FileText, color: 'text-crimson-400' },
    { type: 'TEXT', label: 'Graphic Text', icon: Type, color: 'text-emerald-400' },
  ];

  const handleDeleteItem = (id: string) => {
    const updated = timeline.filter((item) => item.id !== id);
    onUpdateTimeline(updated);
    showToast({ type: 'info', title: 'Clip Removed', message: 'Item deleted from timeline.' });
  };

  const handleUpdateDuration = (id: string, newDuration: number) => {
    const updated = timeline.map((item) =>
      item.id === id ? { ...item, duration: newDuration } : item
    );
    onUpdateTimeline(updated);
  };

  const handleTrackTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedSeconds = Math.max(0, Math.min(totalDuration, (x / rect.width) * totalDuration));
    onSeek(parseFloat(clickedSeconds.toFixed(1)));
  };

  // Generate ruler markers
  const rulerTicks = [];
  const tickStep = totalDuration <= 30 ? 2 : 5;
  for (let s = 0; s <= totalDuration; s += tickStep) {
    rulerTicks.push(s);
  }

  const playheadLeftPct = (currentTime / totalDuration) * 100;

  return (
    <div className="bg-forge-900 border border-forge-700/80 rounded-2xl p-4 space-y-3 shadow-2xl flex flex-col select-none">
      {/* Top Timeline Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-forge-700/60">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold text-white uppercase tracking-wider font-display">
            Multi-Track Timeline
          </span>

          <span className="text-[11px] font-mono text-forge-400 bg-forge-850 px-2 py-0.5 rounded border border-forge-700">
            Total: {totalDuration}s
          </span>
        </div>

        {/* AI Auto-Assemble Button */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ai"
            onClick={onAutoAssemble}
            icon={<Wand2 className="w-3.5 h-3.5 text-purple-300" />}
          >
            Auto-Assemble Timeline with AI
          </Button>
        </div>
      </div>

      {/* Main Timeline Workspace */}
      <div className="relative overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Time Ruler */}
          <div
            onClick={handleTrackTimelineClick}
            className="relative h-7 bg-forge-950/90 border-b border-forge-700/60 cursor-pointer ml-32 flex items-center"
          >
            {rulerTicks.map((sec) => {
              const leftPct = (sec / totalDuration) * 100;
              return (
                <div
                  key={sec}
                  style={{ left: `${leftPct}%` }}
                  className="absolute top-0 bottom-0 flex flex-col justify-between -translate-x-1/2 pointer-events-none"
                >
                  <span className="text-[9px] font-mono text-forge-400 font-bold">
                    0:{sec.toString().padStart(2, '0')}
                  </span>
                  <div className="w-px h-2 bg-forge-700" />
                </div>
              );
            })}
          </div>

          {/* 5 Track Lanes */}
          <div className="space-y-2 mt-2 relative">
            {tracks.map((track) => {
              const itemsInTrack = timeline.filter((i) => i.trackType === track.type);

              return (
                <div key={track.type} className="flex items-center gap-2">
                  {/* Track Label Header */}
                  <div className="w-30 shrink-0 flex items-center justify-between p-2 rounded-xl bg-forge-850 border border-forge-700/60 text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <track.icon className={`w-3.5 h-3.5 ${track.color} shrink-0`} />
                      <span className="font-bold text-white text-[11px] truncate">
                        {track.label}
                      </span>
                    </div>
                  </div>

                  {/* Track Content Lane */}
                  <div
                    onClick={handleTrackTimelineClick}
                    className="relative flex-1 h-12 bg-forge-950/80 rounded-xl border border-forge-800/80 timeline-track-grid cursor-pointer overflow-hidden"
                  >
                    {itemsInTrack.map((item) => (
                      <TrackItem
                        key={item.id}
                        item={item}
                        totalDuration={totalDuration}
                        isSelected={selectedItemId === item.id}
                        onSelect={(t) => setSelectedItemId(t.id)}
                        onDelete={handleDeleteItem}
                        onUpdateDuration={handleUpdateDuration}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Draggable Red Playhead Line */}
            <div
              style={{ left: `calc(8.5rem + ${playheadLeftPct * 0.82}%)` }}
              className="absolute top-0 bottom-0 w-0.5 bg-crimson-500 shadow-glow-crimson pointer-events-none z-20 transition-all duration-75"
            >
              <div className="w-3 h-3 bg-crimson-500 rounded-full -translate-x-[5px] -translate-y-1 shadow-glow-crimson" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
