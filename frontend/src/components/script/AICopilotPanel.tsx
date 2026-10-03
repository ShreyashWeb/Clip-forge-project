import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Scissors,
  MessageSquare,
  Smile,
  ShieldCheck,
  Megaphone,
  Check,
  X,
  RefreshCw,
  Send
} from 'lucide-react';
import { ScriptSection } from '../../types/project';
import { aiService } from '../../services/aiService';
import { Button } from '../common/Button';
import { useToast } from '../../context/ToastContext';

interface AICopilotPanelProps {
  selectedSection: ScriptSection;
  onApplySuggestion: (sectionId: string, newContent: string) => void;
  tone: string;
}

export const AICopilotPanel: React.FC<AICopilotPanelProps> = ({
  selectedSection,
  onApplySuggestion,
  tone,
}) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [proposedText, setProposedText] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleAiAction = async (actionPrompt: string) => {
    setIsProcessing(true);
    try {
      const res = await aiService.rewriteSection(selectedSection, actionPrompt, tone);
      setProposedText(res.rewrittenContent);
      setExplanation(res.explanation);
      showToast({ type: 'ai', title: 'AI Copilot Ready', message: 'Review proposed script changes below.' });
    } catch (err) {
      showToast({ type: 'error', title: 'Action Failed', message: 'Could not generate rewrite suggestion.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAccept = () => {
    if (proposedText) {
      onApplySuggestion(selectedSection.id, proposedText);
      setProposedText(null);
      setExplanation(null);
      showToast({ type: 'success', title: 'Script Updated', message: `Applied AI rewrite to ${selectedSection.title}.` });
    }
  };

  const handleDiscard = () => {
    setProposedText(null);
    setExplanation(null);
  };

  const quickActions = [
    { label: 'Improve Hook', icon: Zap, prompt: 'Make the hook far punchier with a high curiosity gap' },
    { label: 'Make Shorter', icon: Scissors, prompt: 'Trim fluff words and make it 25% shorter' },
    { label: 'Conversational', icon: MessageSquare, prompt: 'Make more conversational and engaging to hear spoken out loud' },
    { label: 'Simplify', icon: Smile, prompt: 'Simplify with an everyday real world analogy' },
    { label: 'Fact Check', icon: ShieldCheck, prompt: 'Verify research alignment and tighten claim precision' },
    { label: 'Punchy CTA', icon: Megaphone, prompt: 'Generate an irresistible call to action' },
  ];

  return (
    <div className="bg-forge-900 border border-purple-500/30 rounded-2xl p-5 shadow-2xl space-y-5 sticky top-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-forge-700/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 border border-purple-700/50 text-purple-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">AI Script Intelligence</h3>
            <p className="text-[11px] text-purple-300/80">
              Active: <span className="text-white font-semibold">{selectedSection.title}</span>
            </p>
          </div>
        </div>

        <span className="text-[10px] bg-purple-950 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-800">
          GEMINI 2.0
        </span>
      </div>

      {/* Quick Action Presets */}
      <div>
        <label className="block text-[11px] font-bold text-forge-400 uppercase tracking-wider mb-2">
          One-Click AI Optimizers
        </label>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              disabled={isProcessing}
              onClick={() => handleAiAction(action.prompt)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-forge-850 hover:bg-forge-800 border border-forge-700/60 hover:border-purple-500/50 text-xs font-semibold text-forge-200 hover:text-white transition-all text-left group disabled:opacity-50"
            >
              <action.icon className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="truncate">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt Input */}
      <div>
        <label className="block text-[11px] font-bold text-forge-400 uppercase tracking-wider mb-1.5">
          Custom Instruction
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="e.g. Add a funny metaphor about coffee..."
            className="flex-1 bg-forge-950 border border-forge-700 rounded-xl px-3 py-2 text-xs text-white placeholder-forge-500 focus:outline-none focus:border-purple-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && customPrompt.trim()) {
                handleAiAction(customPrompt);
              }
            }}
          />
          <button
            disabled={isProcessing || !customPrompt.trim()}
            onClick={() => handleAiAction(customPrompt)}
            className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Proposed Suggestion Review Box */}
      {proposedText && (
        <div className="p-4 rounded-xl bg-forge-950 border border-purple-500/50 space-y-3 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-purple-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Suggestion Preview</span>
            </span>
            <span className="text-[10px] text-forge-400 font-mono">Review Diff</span>
          </div>

          <p className="text-xs text-forge-300 italic border-l-2 border-purple-500 pl-2">
            {explanation}
          </p>

          <div className="p-3 bg-forge-900 rounded-lg text-xs text-white font-medium leading-relaxed border border-forge-800">
            "{proposedText}"
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-forge-800">
            <Button size="sm" variant="ghost" onClick={handleDiscard} icon={<X className="w-3.5 h-3.5" />}>
              Discard
            </Button>
            <Button size="sm" variant="primary" onClick={handleAccept} icon={<Check className="w-3.5 h-3.5" />}>
              Accept Rewrite
            </Button>
          </div>
        </div>
      )}

      {/* Loading state indicator */}
      {isProcessing && (
        <div className="p-4 rounded-xl bg-forge-950/80 border border-purple-500/30 flex items-center justify-center gap-3 text-xs text-purple-300 animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Generating human-in-the-loop suggestion...</span>
        </div>
      )}
    </div>
  );
};
