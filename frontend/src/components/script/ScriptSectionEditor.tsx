import React from 'react';
import { ScriptSection } from '../../types/project';
import { Sparkles, Video, Clock, AlignLeft, RefreshCw } from 'lucide-react';

interface ScriptSectionEditorProps {
  section: ScriptSection;
  index: number;
  onUpdate: (updated: ScriptSection) => void;
  onSelectForAi: (section: ScriptSection) => void;
  isActive: boolean;
}

export const ScriptSectionEditor: React.FC<ScriptSectionEditorProps> = ({
  section,
  index,
  onUpdate,
  onSelectForAi,
  isActive,
}) => {
  const handleContentChange = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean).length;
    const estSec = Math.max(1, Math.round((words / 160) * 60));
    onUpdate({
      ...section,
      content: text,
      wordCount: words,
      estimatedSeconds: estSec,
    });
  };

  const getSectionBadgeColor = (type: ScriptSection['type']) => {
    switch (type) {
      case 'HOOK':
        return 'bg-crimson-950/80 text-crimson-400 border-crimson-700/50';
      case 'CONTEXT':
        return 'bg-amber-950/80 text-amber-400 border-amber-700/50';
      case 'KEY_POINT_1':
      case 'KEY_POINT_2':
        return 'bg-purple-950/80 text-purple-400 border-purple-700/50';
      case 'EXAMPLE':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-700/50';
      case 'CTA':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50';
      default:
        return 'bg-forge-800 text-forge-300';
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isActive
          ? 'bg-forge-850/95 border-crimson-500/60 shadow-glow-crimson ring-1 ring-crimson-500/30'
          : 'bg-forge-900/80 border-forge-700/60 hover:border-forge-600'
      }`}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between p-3.5 bg-forge-950/60 border-b border-forge-700/50">
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-forge-800 text-forge-300 text-[11px] font-bold font-mono flex items-center justify-center border border-forge-700">
            {index + 1}
          </span>
          <span
            className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getSectionBadgeColor(
              section.type
            )}`}
          >
            {section.title}
          </span>
        </div>

        {/* Stats & AI Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[11px] font-mono text-forge-400">
            <span className="flex items-center gap-1">
              <AlignLeft className="w-3 h-3 text-forge-500" />
              {section.wordCount} words
            </span>
            <span className="text-forge-600">•</span>
            <span className="flex items-center gap-1 text-forge-300 font-semibold">
              <Clock className="w-3 h-3 text-amber-400" />
              ~{section.estimatedSeconds}s
            </span>
          </div>

          <button
            onClick={() => onSelectForAi(section)}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isActive
                ? 'bg-crimson-600 text-white shadow-glow-crimson'
                : 'bg-forge-800 hover:bg-forge-750 text-forge-300 hover:text-white border border-forge-700'
            }`}
            title="Open AI Copilot for this section"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Script Text Body */}
      <div className="p-4 space-y-3">
        <textarea
          rows={3}
          value={section.content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={`Write script for ${section.title}...`}
          className="w-full bg-transparent text-sm sm:text-base text-forge-100 placeholder-forge-600 focus:outline-none resize-none leading-relaxed font-sans"
        />

        {/* AI Suggested Visual B-Roll Prompt Pill */}
        {section.suggestedBrollPrompt && (
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-forge-950/80 border border-forge-700/50 text-xs">
            <Video className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-0.5">
                Suggested Visual / B-Roll Prompt:
              </span>
              <p className="text-forge-300 text-[11px] italic truncate">
                "{section.suggestedBrollPrompt}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
