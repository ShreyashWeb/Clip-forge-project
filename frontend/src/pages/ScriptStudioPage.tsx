import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  AlignLeft,
  Volume2,
  Mic,
  ShieldCheck,
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { ScriptSection, ScriptData } from '../types/project';
import { ScriptSectionEditor } from '../components/script/ScriptSectionEditor';
import { AICopilotPanel } from '../components/script/AICopilotPanel';
import { Button } from '../components/common/Button';
import { useToast } from '../context/ToastContext';

export const ScriptStudioPage: React.FC = () => {
  const { activeProject, updateProjectScript, updateProjectVoiceover } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const script = activeProject?.script;
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    script?.sections[0]?.id || ''
  );

  if (!script) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center bg-forge-900 rounded-3xl border border-forge-800 space-y-4">
        <FileText className="w-12 h-12 text-emerald-400 mx-auto" />
        <h2 className="text-xl font-bold text-white font-display">No Script Initialized</h2>
        <p className="text-xs text-forge-400">Generate a fact-checked script from the research workspace first.</p>
        <Button variant="primary" onClick={() => navigate('/studio/research')}>
          Go to Research Workspace
        </Button>
      </div>
    );
  }

  const selectedSection = script.sections.find((s) => s.id === selectedSectionId) || script.sections[0];

  const handleUpdateSection = (updated: ScriptSection) => {
    const updatedSections = script.sections.map((s) => (s.id === updated.id ? updated : s));
    const totalWords = updatedSections.reduce((acc, s) => acc + s.wordCount, 0);
    const estSec = Math.round((totalWords / 160) * 60);

    updateProjectScript({
      ...script,
      sections: updatedSections,
      totalWords,
      estimatedDurationSeconds: estSec,
    });
  };

  const handleApplyAiSuggestion = (sectionId: string, newContent: string) => {
    const target = script.sections.find((s) => s.id === sectionId);
    if (!target) return;

    const words = newContent.split(/\s+/).filter(Boolean).length;
    const estSec = Math.max(1, Math.round((words / 160) * 60));

    handleUpdateSection({
      ...target,
      content: newContent,
      wordCount: words,
      estimatedSeconds: estSec,
    });
  };

  const handleProceedToVoice = async () => {
    if (!activeProject?.voiceover) {
      await updateProjectVoiceover({
        voiceId: 'voice-1',
        speed: 1.05,
        pitch: 0,
        emotion: 'Authoritative',
        stability: 85,
        clarityBoost: 90,
        generatedDurationSeconds: script?.estimatedDurationSeconds || 44.2,
        audioUrl: 'https://actions.google.com/sounds/v1/speech/tech_explainer.mp3'
      });
    }
    navigate('/studio/voice');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
              STAGE 03
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Fact-Checked Script Studio
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            Pacing, duration estimator, and AI rewrite suggestions with human-in-the-loop review.
          </p>
        </div>

        {/* Header Stats & Proceed CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 bg-forge-900 border border-forge-700/60 rounded-xl px-3.5 py-2 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-forge-300">
              <AlignLeft className="w-3.5 h-3.5 text-forge-400" />
              <strong className="text-white">{script.totalWords}</strong> words
            </span>
            <span className="text-forge-700">|</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              ~{script.estimatedDurationSeconds}s (160 WPM)
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleProceedToVoice}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Approve Script & Voiceover (Stage 04)
          </Button>
        </div>
      </div>

      {/* Main Studio Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7 Cols: 6 Structured Script Sections */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-forge-400 uppercase tracking-wider font-mono">
              6-Part Short Architecture
            </h3>
            <span className="text-[11px] text-forge-400">
              Click any section to trigger AI Copilot
            </span>
          </div>

          {script.sections.map((section, idx) => (
            <ScriptSectionEditor
              key={section.id}
              section={section}
              index={idx}
              isActive={selectedSectionId === section.id}
              onUpdate={handleUpdateSection}
              onSelectForAi={(s) => setSelectedSectionId(s.id)}
            />
          ))}
        </div>

        {/* Right 5 Cols: AI Assistant & Optimizers */}
        <div className="lg:col-span-5">
          <AICopilotPanel
            selectedSection={selectedSection}
            onApplySuggestion={handleApplyAiSuggestion}
            tone={activeProject?.tone || 'Educational'}
          />
        </div>
      </div>
    </div>
  );
};
