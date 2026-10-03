import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'ai';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  icon,
  rightIcon,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white shadow-lg shadow-crimson-900/30 hover:shadow-glow-crimson border border-crimson-500/30',
    secondary: 'bg-forge-850 hover:bg-forge-800 text-forge-100 hover:text-white border border-forge-700/70 shadow-sm',
    ghost: 'bg-transparent hover:bg-forge-800/60 text-forge-300 hover:text-white',
    danger: 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-700/50',
    ai: 'bg-gradient-to-r from-purple-900/80 to-crimson-900/80 hover:from-purple-800 hover:to-crimson-800 text-purple-200 hover:text-white border border-purple-500/40 shadow-glow-crimson',
  }[variant];

  return (
    <button
      type={type}
      className={twMerge(clsx(baseClasses, sizeClasses, variantClasses, className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
