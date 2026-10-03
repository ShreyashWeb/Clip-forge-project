import React from 'react';
import { Sparkles, Plus, Eye, Check, X, Video, Image, Music, ArrowRight } from 'lucide-react';
import { MediaAsset } from '../../types/project';
import { Button } from '../common/Button';

interface BrollMatcherProps {
  suggestions: MediaAsset[];
  onAddToTimeline: (asset: MediaAsset) => void;
  onPreview: (asset: MediaAsset) => void;
  onReject: (assetId: string) => void;
}

export const BrollMatcher: React.FC<BrollMatcherProps> = ({
  suggestions,
  onAddToTimeline,
  onPreview,
  onReject,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-950 border border-purple-700/50 text-purple-400">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Semantic AI B-Roll Recommendations
            </h3>
            <p className="text-xs text-forge-400">
              Matched against your verified script sentences with AI relevance scoring.
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800">
          {suggestions.length} Matches Found
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((asset) => {
          const score = asset.semanticMatchScore || 85;

          return (
            <div
              key={asset.id}
              className="bg-forge-900 border border-forge-700/80 hover:border-purple-500/50 rounded-2xl p-4 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Script sentence attribution banner */}
                {asset.scriptSentenceMatch && (
                  <div className="mb-3 p-2.5 rounded-xl bg-forge-950 border border-forge-800 text-xs">
                    <span className="text-[10px] font-bold text-forge-400 uppercase tracking-wider block mb-1">
                      Target Script Sentence:
                    </span>
                    <p className="text-forge-200 italic line-clamp-2">
                      "{asset.scriptSentenceMatch}"
                    </p>
                  </div>
                )}

                {/* Media Preview & Details */}
                <div className="flex gap-3">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-forge-950 shrink-0 border border-forge-700/60">
                    <img
                      src={asset.thumbnailUrl}
                      alt={asset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-1 left-1 bg-black/70 text-[9px] font-bold text-white px-1.5 py-0.5 rounded font-mono uppercase">
                      {asset.type}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate" title={asset.title}>
                          {asset.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-forge-400 font-mono mt-0.5 truncate">{asset.fileName}</p>

                      {/* Tag chips */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {asset.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] bg-forge-800 text-forge-300 px-1.5 py-0.5 rounded border border-forge-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Semantic Relevance Score */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-forge-950 rounded-full h-1.5 overflow-hidden border border-forge-800">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-crimson-500 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-purple-300 whitespace-nowrap">
                        {score}% Relevance
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-forge-800">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPreview(asset)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  Preview
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onReject(asset.id)}
                    icon={<X className="w-3.5 h-3.5" />}
                  >
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onAddToTimeline(asset)}
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Add to Timeline
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
