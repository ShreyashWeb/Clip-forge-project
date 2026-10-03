import React from 'react';
import { ExternalLink, ShieldCheck, AlertTriangle, AlertCircle, BookOpen, Calendar, Trash2 } from 'lucide-react';
import { ResearchSource } from '../../types/project';
import { Badge } from '../common/Badge';

interface SourceCardProps {
  source: ResearchSource;
  onDelete?: (id: string) => void;
}

export const SourceCard: React.FC<SourceCardProps> = ({ source, onDelete }) => {
  return (
    <div className="bg-forge-850/90 border border-forge-700/60 rounded-2xl p-5 hover:border-forge-600 transition-all flex flex-col justify-between">
      <div>
        {/* Top Header: Source Type, Date & Reliability */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-700/40 px-2 py-0.5 rounded-md flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{source.sourceType}</span>
            </span>
            <span className="text-xs text-forge-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{source.publicationDate}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge status={source.reliabilityStatus} size="sm" />
            <span className="font-mono text-xs font-bold text-forge-300">
              {source.credibilityScore}/100
            </span>
          </div>
        </div>

        {/* Title & Publisher */}
        <h4 className="text-base font-bold text-white tracking-wide leading-snug">
          {source.title}
        </h4>
        <p className="text-xs font-medium text-forge-400 mt-1">
          Publisher: <span className="text-forge-200">{source.publisher}</span>
        </p>

        {/* Snippet */}
        <div className="mt-3 p-3 bg-forge-900/90 rounded-xl border border-forge-700/50 text-xs text-forge-300 leading-relaxed italic border-l-2 border-l-cyan-500">
          "{source.snippet}"
        </div>

        {/* Key Takeaways */}
        {source.keyTakeaways && source.keyTakeaways.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <p className="text-[11px] font-bold text-forge-400 uppercase tracking-wider">
              Verified Takeaways:
            </p>
            <ul className="space-y-1">
              {source.keyTakeaways.map((item, idx) => (
                <li key={idx} className="text-xs text-forge-300 flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer link & actions */}
      <div className="mt-4 pt-3 border-t border-forge-700/50 flex items-center justify-between">
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>View Source Citation</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {onDelete && (
          <button
            onClick={() => onDelete(source.id)}
            className="p-1.5 text-forge-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors"
            title="Remove source"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
