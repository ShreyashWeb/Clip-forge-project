import React from 'react';

interface WaveformVisualizerProps {
  isPlaying: boolean;
  peaks?: number[];
  progress?: number; // 0 to 100
  onScrub?: (percentage: number) => void;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isPlaying,
  peaks = [
    0.2, 0.4, 0.7, 0.9, 0.5, 0.3, 0.6, 0.8, 0.4, 0.2,
    0.5, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.5, 0.3, 0.7,
    0.9, 0.6, 0.4, 0.8, 0.5, 0.3, 0.7, 0.9, 0.6, 0.4,
    0.3, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3,
    0.6, 0.9, 0.7, 0.4, 0.8, 0.5, 0.3, 0.6, 0.8, 0.4
  ],
  progress = 0,
  onScrub,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onScrub) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    onScrub(pct);
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-24 bg-forge-950/90 rounded-2xl border border-forge-700/80 p-3 flex items-center justify-between gap-1 cursor-pointer overflow-hidden group select-none"
    >
      {/* Background track line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-forge-800 pointer-events-none" />

      {/* Progress fill overlay */}
      <div
        className="absolute inset-y-0 left-0 bg-crimson-600/10 pointer-events-none border-r-2 border-crimson-500 shadow-glow-crimson transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Waveform Bars */}
      {peaks.map((peak, idx) => {
        const barPct = (idx / peaks.length) * 100;
        const isPast = barPct <= progress;
        const heightPx = Math.max(8, peak * 64);

        return (
          <div
            key={idx}
            className={`w-1.5 rounded-full transition-all duration-150 ${
              isPast
                ? 'bg-crimson-500 shadow-glow-crimson'
                : 'bg-forge-700 group-hover:bg-forge-600'
            } ${isPlaying ? 'animate-pulse' : ''}`}
            style={{
              height: `${heightPx}px`,
              animationDelay: `${(idx % 10) * 80}ms`,
            }}
          />
        );
      })}
    </div>
  );
};
