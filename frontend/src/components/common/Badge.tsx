import React from 'react';
import { ProjectStatus } from '../../types/project';
import { Sparkles, ShieldCheck, AlertCircle, AlertTriangle, Clock, CheckCircle, Video, FileText, Mic, Layers, Cpu } from 'lucide-react';

interface BadgeProps {
  status?: ProjectStatus | 'VERIFIED' | 'NEEDS_REVIEW' | 'POTENTIALLY_UNSUPPORTED' | 'AI_GENERATED' | 'USER_APPROVED' | string;
  variant?: 'crimson' | 'emerald' | 'amber' | 'purple' | 'cyan' | 'slate';
  children?: React.ReactNode;
  size?: 'sm' | 'md';
  icon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  variant,
  children,
  size = 'md',
  icon = true,
}) => {
  let badgeText = children;
  let computedVariant = variant || 'slate';
  let badgeIcon: React.ReactNode = null;

  if (status) {
    switch (status) {
      case 'IDEA':
        badgeText = badgeText || 'Idea Phase';
        computedVariant = 'purple';
        badgeIcon = <Sparkles className="w-3 h-3" />;
        break;
      case 'RESEARCHING':
        badgeText = badgeText || 'Researching';
        computedVariant = 'cyan';
        badgeIcon = <ShieldCheck className="w-3 h-3" />;
        break;
      case 'SCRIPT_READY':
        badgeText = badgeText || 'Script Ready';
        computedVariant = 'emerald';
        badgeIcon = <FileText className="w-3 h-3" />;
        break;
      case 'VOICE_READY':
        badgeText = badgeText || 'Voice Synced';
        computedVariant = 'amber';
        badgeIcon = <Mic className="w-3 h-3" />;
        break;
      case 'EDITING':
        badgeText = badgeText || 'Editing Studio';
        computedVariant = 'crimson';
        badgeIcon = <Layers className="w-3 h-3" />;
        break;
      case 'RENDERING':
        badgeText = badgeText || 'Rendering Video';
        computedVariant = 'purple';
        badgeIcon = <Cpu className="w-3 h-3 animate-spin" />;
        break;
      case 'COMPLETED':
        badgeText = badgeText || 'Ready to Publish';
        computedVariant = 'emerald';
        badgeIcon = <CheckCircle className="w-3 h-3" />;
        break;
      case 'VERIFIED':
        badgeText = badgeText || 'Verified Source';
        computedVariant = 'emerald';
        badgeIcon = <ShieldCheck className="w-3 h-3" />;
        break;
      case 'NEEDS_REVIEW':
        badgeText = badgeText || 'Needs Review';
        computedVariant = 'amber';
        badgeIcon = <AlertTriangle className="w-3 h-3" />;
        break;
      case 'POTENTIALLY_UNSUPPORTED':
        badgeText = badgeText || 'Unsupported Claim';
        computedVariant = 'crimson';
        badgeIcon = <AlertCircle className="w-3 h-3" />;
        break;
      case 'USER_APPROVED':
        badgeText = badgeText || 'Creator Approved';
        computedVariant = 'emerald';
        badgeIcon = <CheckCircle className="w-3 h-3" />;
        break;
      case 'AI_GENERATED':
        badgeText = badgeText || 'AI Copilot Suggestion';
        computedVariant = 'purple';
        badgeIcon = <Sparkles className="w-3 h-3" />;
        break;
      default:
        badgeText = badgeText || status;
        break;
    }
  }

  const variantStyles = {
    crimson: 'bg-crimson-950/80 text-crimson-400 border-crimson-700/50',
    emerald: 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50',
    amber: 'bg-amber-950/80 text-amber-400 border-amber-700/50',
    purple: 'bg-purple-950/80 text-purple-400 border-purple-700/50',
    cyan: 'bg-cyan-950/80 text-cyan-400 border-cyan-700/50',
    slate: 'bg-forge-800 text-forge-300 border-forge-700',
  }[computedVariant];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide uppercase ${variantStyles} ${sizeStyles}`}
    >
      {icon && badgeIcon}
      <span>{badgeText}</span>
    </span>
  );
};
