import React from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  active?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = false,
  active = false,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-forge-850/90 backdrop-blur-md border border-forge-700/60 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden',
          hoverable && 'hover:border-crimson-500/40 hover:bg-forge-800/90 hover:shadow-glow-crimson cursor-pointer',
          active && 'border-crimson-500/80 bg-forge-800 shadow-glow-crimson ring-1 ring-crimson-500/50',
          glow && 'shadow-glow-crimson border-crimson-600/40',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
