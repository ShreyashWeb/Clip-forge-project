import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Plus,
  ArrowRight,
  FileText,
  AlertTriangle,
  BookOpen,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { aiService } from '../services/aiService';
import { useToast } from '../context/ToastContext';
import { SourceCard } from '../components/research/SourceCard';
import { ClaimCard } from '../components/research/ClaimCard';
import { AddSourceModal } from '../components/research/AddSourceModal';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ResearchWorkspacePage: React.FC = () => {
  const { activeProject, updateProjectResearch, updateProjectScript } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  const research = activeProject?.research;

  const handleApplyRewrite = (claimId: string, rewriteText: string) => {
    if (!research) return;
    const updatedClaims = research.claims.map((c) =>
      c.id === claimId
        ? { ...c, isApplied: true, status: 'USER_APPROVED' as const, claimText: rewriteText }
        : c
    );
    updateProjectResearch({ ...research, claims: updatedClaims });
    showToast({ type: 'success', title: 'Rewrite Applied', message: 'The verified claim has been updated.' });
  };

  const handleEditClaim = (claimId: string, customText: string) => {
    if (!research) return;
    const updatedClaims = research.claims.map((c) =>
      c.id === claimId
        ? { ...c, isApplied: true, status: 'USER_APPROVED' as const, claimText: customText }
        : c
    );
    updateProjectResearch({ ...research, claims: updatedClaims });
    showToast({ type: 'info', title: 'Claim Saved', message: 'Manual edit recorded.' });
  };

  const handleDismissClaim = (claimId: string) => {
    if (!research) return;
    const updatedClaims = research.claims.filter((c) => c.id !== claimId);
    updateProjectResearch({ ...research, claims: updatedClaims });
    showToast({ type: 'info', title: 'Claim Dismissed', message: 'Claim removed from review queue.' });
  };

  const handleAddSource = (source: any) => {
    if (!research) return;
    const updatedSources = [source, ...research.sources];
    updateProjectResearch({ ...research, sources: updatedSources });
    showToast({ type: 'success', title: 'Source Added', message: 'New citation attached to project.' });
  };

  const handleDeleteSource = (sourceId: string) => {
    if (!research) return;
    const updatedSources = research.sources.filter((s) => s.id !== sourceId);
    updateProjectResearch({ ...research, sources: updatedSources });
    showToast({ type: 'info', title: 'Source Removed', message: 'Citation removed.' });
  };

  const handleGenerateScript = async () => {
    if (!activeProject?.brief) {
      showToast({ type: 'warning', title: 'Brief Missing', message: 'Please create a brief first.' });
      return;
    }

    setIsGeneratingScript(true);
    try {
      const scriptData = await aiService.generateScript(
        activeProject.brief,
        research?.summary
      );

      await updateProjectScript({
        id: 'script-' + Date.now(),
        projectId: activeProject.id,
        title: `${activeProject.title} (Short Script)`,
        ...scriptData,
        readingSpeedWpm: 160
      });

      showToast({ type: 'ai', title: 'Script Generated', message: 'Created 6-section verified script with B-roll prompts.' });
      navigate('/studio/script');
    } catch (err) {
      showToast({ type: 'error', title: 'Script Error', message: 'Failed to generate script.' });
    } finally {
      setIsGeneratingScript(false);
    }
  };

  if (!research) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center bg-forge-900 rounded-3xl border border-forge-800 space-y-4">
        <ShieldCheck className="w-12 h-12 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white font-display">No Research Data Initialized</h2>
        <p className="text-xs text-forge-400">Initialize the AI brief first to automatically pull research citations.</p>
        <Button variant="primary" onClick={() => navigate('/studio/brief')}>
          Go to AI Brief
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Stage Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-forge-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-800">
              STAGE 02
            </span>
            <h1 className="text-2xl font-black text-white font-display">
              Research & Claim Verification Workspace
            </h1>
          </div>
          <p className="text-xs text-forge-400">
            Cross-check claims against peer-reviewed citations. AI assists, but the creator approves every assertion.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAddSourceOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Citation
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerateScript}
            isLoading={isGeneratingScript}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Generate Fact-Checked Script (Stage 03)
          </Button>
        </div>
      </div>

      {/* Trust & Fact-Check Guardrail Banner */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-forge-900 to-forge-900 border border-cyan-700/50 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-700 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Fact-Checking Guardrails Active
            </h3>
            <p className="text-[11px] text-cyan-300">
              ClipForge flags exaggerated assertions and suggests peer-reviewed rewrites with direct citations.
            </p>
          </div>
        </div>
        <Badge status="VERIFIED" size="sm" />
      </div>

      {/* Research Summary Card */}
      <div className="bg-forge-900 border border-forge-700/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Executive Research Synthesis</span>
          </h3>
          <span className="text-[10px] bg-forge-800 text-forge-300 font-mono px-2 py-0.5 rounded">
            STANFORD / PRINCETON NLP BENCHMARKS
          </span>
        </div>

        <p className="text-xs sm:text-sm text-forge-200 leading-relaxed">
          {research.summary}
        </p>

        {/* Key Verified Facts */}
        {research.keyFacts && (
          <div className="mt-4 pt-4 border-t border-forge-800 space-y-2">
            <span className="text-[11px] font-bold text-forge-400 uppercase tracking-wider block">
              Verified Benchmark Facts:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {research.keyFacts.map((fact, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-forge-950 border border-forge-800 text-xs text-forge-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Claim Verification Review Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-forge-800">
          <div>
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Claim Verification & Rewrite Inspector</span>
            </h3>
            <p className="text-xs text-forge-400">
              Review flagged assertions before baking them into your script.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
            {research.claims.length} Claims Inspected
          </span>
        </div>

        <div className="space-y-4">
          {research.claims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              onApplyRewrite={handleApplyRewrite}
              onEdit={handleEditClaim}
              onDismiss={handleDismissClaim}
            />
          ))}
        </div>
      </div>

      {/* Verified Research Sources List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-forge-800">
          <div>
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Attached Research Citations & Literature</span>
            </h3>
            <p className="text-xs text-forge-400">
              Academic papers, industry surveys, and technical documentation.
            </p>
          </div>
          <Button size="sm" variant="secondary" onClick={() => setIsAddSourceOpen(true)} icon={<Plus className="w-3.5 h-3.5" />}>
            Add Source
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {research.sources.map((source) => (
            <SourceCard key={source.id} source={source} onDelete={handleDeleteSource} />
          ))}
        </div>
      </div>

      {/* Add Source Modal */}
      <AddSourceModal
        isOpen={isAddSourceOpen}
        onClose={() => setIsAddSourceOpen(false)}
        onAdd={handleAddSource}
      />
    </div>
  );
};
