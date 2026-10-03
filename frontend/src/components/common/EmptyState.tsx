import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  actionIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 bg-forge-900/60 border border-dashed border-forge-700/80 rounded-2xl">
      <div className="w-16 h-16 rounded-2xl bg-forge-800/80 border border-forge-700 flex items-center justify-center text-crimson-500 mb-4 shadow-glow-crimson">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white font-display mb-1">{title}</h3>
      <p className="text-sm text-forge-400 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction} icon={actionIcon}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string }> = ({
  rows = 3,
  height = 'h-12',
}) => {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`w-full bg-forge-850/80 rounded-xl border border-forge-700/40 ${height}`}
        />
      ))}
    </div>
  );
};
