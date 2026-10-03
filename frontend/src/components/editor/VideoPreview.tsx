import React from 'react';
import { TimelineTrackItem } from '../../types/project';
import { ThreeVideoViewport } from '../three/ThreeVideoViewport';

interface VideoPreviewProps {
  currentTime: number;
  totalDuration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  timeline: TimelineTrackItem[];
  activeCaptionText?: string;
  projectTitle: string;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  currentTime,
  totalDuration,
  isPlaying,
  onTogglePlay,
  onSeek,
  timeline,
  activeCaptionText,
  projectTitle,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2">
      <ThreeVideoViewport
        currentTime={currentTime}
        totalDuration={totalDuration}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        onSeek={onSeek}
        timeline={timeline}
        activeCaptionText={activeCaptionText}
        projectTitle={projectTitle}
      />
    </div>
  );
};

