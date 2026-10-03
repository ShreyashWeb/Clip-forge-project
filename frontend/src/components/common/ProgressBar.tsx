import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'crimson' | 'emerald' | 'purple';
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  showPercentage = true,
  size = 'md',
  variant = 'crimson',
  animated = true,
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const gradientClasses = {
    crimson: 'from-crimson-600 via-crimson-500 to-rose-400 shadow-glow-crimson',
    emerald: 'from-emerald-600 via-teal-500 to-cyan-400',
    purple: 'from-purple-600 via-violet-500 to-crimson-500',
  }[variant];

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs">
          {label && <span className="font-medium text-forge-300">{label}</span>}
          {showPercentage && <span className="font-mono font-semibold text-white">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div className={`w-full bg-forge-800 rounded-full overflow-hidden border border-forge-700/50 ${heightClasses}`}>
        <div
          className={`h-full bg-gradient-to-r ${gradientClasses} rounded-full transition-all duration-500 ease-out ${
            animated ? 'relative overflow-hidden' : ''
          }`}
          style={{ width: `${clamped}%` }}
        >
          {animated && clamped > 0 && (
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          )}
        </div>
      </div>
    </div>
  );
};
