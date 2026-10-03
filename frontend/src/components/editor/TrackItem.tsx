import React from 'react';
import { TimelineTrackItem } from '../../types/project';
import { Video, Music, Mic, FileText, Type, Trash2, GripVertical } from 'lucide-react';

interface TrackItemProps {
  item: TimelineTrackItem;
  totalDuration: number;
  isSelected: boolean;
  onSelect: (item: TimelineTrackItem) => void;
  onDelete: (id: string) => void;
  onUpdateDuration: (id: string, newDuration: number) => void;
}

export const TrackItem: React.FC<TrackItemProps> = ({
  item,
  totalDuration,
  isSelected,
  onSelect,
  onDelete,
  onUpdateDuration,
}) => {
  const leftPct = (item.startTime / totalDuration) * 100;
  const widthPct = Math.max(4, (item.duration / totalDuration) * 100);

  const getTrackStyles = (type: TimelineTrackItem['trackType']) => {
    switch (type) {
      case 'VIDEO':
        return 'bg-cyan-950/80 border-cyan-600/60 text-cyan-300';
      case 'AUDIO':
        return 'bg-purple-950/80 border-purple-600/60 text-purple-300';
      case 'VOICE':
        return 'bg-amber-950/80 border-amber-600/60 text-amber-300';
      case 'CAPTIONS':
        return 'bg-crimson-950/90 border-crimson-600/80 text-crimson-200';
      case 'TEXT':
        return 'bg-emerald-950/80 border-emerald-600/60 text-emerald-300';
      default:
        return 'bg-forge-800 border-forge-700 text-forge-200';
    }
  };

  const getTrackIcon = (type: TimelineTrackItem['trackType']) => {
    switch (type) {
      case 'VIDEO':
        return <Video className="w-3 h-3" />;
      case 'AUDIO':
        return <Music className="w-3 h-3" />;
      case 'VOICE':
        return <Mic className="w-3 h-3" />;
      case 'CAPTIONS':
        return <FileText className="w-3 h-3" />;
      case 'TEXT':
        return <Type className="w-3 h-3" />;
    }
  };

  return (
    <div
      onClick={() => onSelect(item)}
      style={{
        left: `${leftPct}%`,
        width: `${widthPct}%`,
      }}
      className={`absolute top-1 bottom-1 rounded-xl border p-2 flex items-center justify-between gap-1 select-none transition-all cursor-pointer group overflow-hidden ${getTrackStyles(
        item.trackType
      )} ${
        isSelected ? 'ring-2 ring-white shadow-glow-crimson z-10' : 'hover:brightness-110 z-0'
      }`}
    >
      {/* Left Trim Handle */}
      <div className="absolute left-0 inset-y-0 w-1.5 bg-white/20 hover:bg-white/60 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Content Label */}
      <div className="flex items-center gap-1.5 min-w-0 pointer-events-none">
        <span className="shrink-0">{getTrackIcon(item.trackType)}</span>
        <span className="text-[11px] font-bold truncate tracking-wide">
          {item.title || item.text || item.trackType}
        </span>
      </div>

      {/* Duration Badge */}
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-[10px] font-mono opacity-80 bg-black/40 px-1 rounded">
          {item.duration}s
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="p-0.5 rounded text-white/60 hover:text-rose-400 hover:bg-rose-950/60 opacity-0 group-hover:opacity-100 transition-opacity"
          title="Delete clip"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Right Trim Handle */}
      <div
        className="absolute right-0 inset-y-0 w-1.5 bg-white/20 hover:bg-white/60 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity"
        onMouseDown={(e) => {
          e.stopPropagation();
          const startX = e.clientX;
          const initialDuration = item.duration;
          const handleMouseMove = (moveEvent: MouseEvent) => {
            const diffX = moveEvent.clientX - startX;
            const addedSecs = Math.round(diffX / 15);
            const newDur = Math.max(1, initialDuration + addedSecs);
            onUpdateDuration(item.id, newDur);
          };
          const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
          };
          window.addEventListener('mousemove', handleMouseMove);
          window.addEventListener('mouseup', handleMouseUp);
        }}
      />
    </div>
  );
};
