import React, { useState } from 'react';
import { Check, Edit3, X, Sparkles, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';
import { ClaimVerification } from '../../types/project';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface ClaimCardProps {
  claim: ClaimVerification;
  onApplyRewrite: (id: string, rewriteText: string) => void;
  onEdit: (id: string, updatedClaim: string) => void;
  onDismiss: (id: string) => void;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({
  claim,
  onApplyRewrite,
  onEdit,
  onDismiss,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState(claim.suggestedRewrite || claim.claimText);

  const handleSaveEdit = () => {
    onEdit(claim.id, customText);
    setIsEditing(false);
  };

  const isWarning = claim.status === 'NEEDS_REVIEW' || claim.status === 'POTENTIALLY_UNSUPPORTED';

  return (
    <div
      className={`rounded-2xl p-5 border transition-all ${
        claim.isApplied
          ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
          : isWarning
          ? 'bg-forge-850/90 border-amber-500/40 shadow-lg'
          : 'bg-forge-850/90 border-forge-700/60'
      }`}
    >
      {/* Top Header: Claim Status & Confidence */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Badge status={claim.status} size="sm" />
          {claim.isApplied && (
            <span className="text-[11px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-700/40">
              REWRITE APPLIED
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs font-mono font-bold text-forge-300">
          <span>Confidence:</span>
          <span className={claim.confidenceScore > 80 ? 'text-emerald-400' : 'text-amber-400'}>
            {claim.confidenceScore}%
          </span>
        </div>
      </div>

      {/* Original Claim Text */}
      <div className="mb-3">
        <span className="text-[10px] font-bold text-forge-400 uppercase tracking-wider block mb-1">
          Stated Claim:
        </span>
        <p className="text-sm text-white font-medium bg-forge-950/70 p-3 rounded-xl border border-forge-800">
          "{claim.claimText}"
        </p>
      </div>

      {/* Reason / Fact-Check Analysis */}
      <div className="mb-4 text-xs bg-forge-900/80 p-3 rounded-xl border border-forge-700/50">
        <div className="flex items-center gap-1.5 text-forge-400 font-semibold mb-1">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Research Analysis & Evidence:</span>
        </div>
        <p className="text-forge-300 leading-relaxed">{claim.reason}</p>
        {claim.sourceAttribution && (
          <p className="text-[11px] text-cyan-400 mt-1.5 font-mono">
            Source: {claim.sourceAttribution}
          </p>
        )}
      </div>

      {/* Suggested Rewrite Section */}
      {isEditing ? (
        <div className="mb-4 space-y-2">
          <label className="text-xs font-bold text-forge-300 uppercase tracking-wider block">
            Custom Edit:
          </label>
          <textarea
            rows={3}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full bg-forge-900 border border-forge-600 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-crimson-500"
          />
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-crimson-950/30 border border-crimson-700/40 mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-crimson-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-crimson-400" />
              <span>AI Suggested Rewrite (Research-Backed):</span>
            </span>
          </div>
          <p className="text-xs text-forge-100 font-medium leading-relaxed">
            "{claim.suggestedRewrite}"
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-forge-700/50">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            disabled={claim.isApplied}
            onClick={() => onApplyRewrite(claim.id, claim.suggestedRewrite)}
            icon={<Check className="w-3.5 h-3.5" />}
          >
            {claim.isApplied ? 'Applied' : 'Apply Rewrite'}
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(true)}
            icon={<Edit3 className="w-3.5 h-3.5" />}
          >
            Edit
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDismiss(claim.id)}
          icon={<X className="w-3.5 h-3.5" />}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
};
