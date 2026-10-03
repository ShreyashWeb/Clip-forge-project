import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { MOCK_TREND_SPARKS } from '../../services/mockData';
import { useProject } from '../../context/ProjectContext';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';

export const TrendSparks: React.FC = () => {
  const { createProject, updateProjectBrief } = useProject();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleCreateFromTrend = async (trend: typeof MOCK_TREND_SPARKS[0]) => {
    try {
      showToast({ type: 'ai', title: 'Spinning Up Project', message: `Initializing brief for "${trend.topic}"...` });

      const angles = await aiService.generateAngles(trend.topic);
      const chosenAngle = angles[0]?.title || `Deconstructing ${trend.topic}`;
      const brief = await aiService.generateBrief({
        topic: trend.topic,
        angle: chosenAngle,
        audience: 'Tech professionals and AI builders',
        platform: trend.platform,
        duration: '45 sec',
        tone: 'Educational'
      });

      const research = await aiService.fetchResearch(trend.topic, chosenAngle);

      await createProject({
        title: trend.topic,
        platform: trend.platform as any,
        duration: '45 sec',
        tone: 'Educational',
        status: 'RESEARCHING',
        brief,
        research,
      });

      navigate('/studio/brief');
    } catch (err) {
      showToast({ type: 'error', title: 'Error', message: 'Could not create project from trend.' });
    }
  };

  return (
    <div className="bg-forge-850/80 border border-forge-700/60 rounded-2xl p-5 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-crimson-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">
            AI Trend Sparks (Real-Time Signals)
          </h3>
        </div>
        <span className="text-[10px] bg-crimson-950 text-crimson-400 border border-crimson-800/50 px-2 py-0.5 rounded-full font-mono font-bold animate-pulse">
          LIVE RADAR
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MOCK_TREND_SPARKS.map((trend, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-forge-900/90 border border-forge-700/50 hover:border-crimson-500/40 hover:bg-forge-800/90 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-forge-400 text-[11px]">{trend.platform}</span>
                <span className="text-emerald-400 font-mono font-bold text-xs">{trend.growth}</span>
              </div>
              <p className="text-xs font-bold text-white group-hover:text-crimson-300 transition-colors">
                {trend.topic}
              </p>
              <p className="text-[11px] text-forge-400 mt-1 italic line-clamp-2">
                "{trend.suggestedHook}"
              </p>
            </div>

            <button
              onClick={() => handleCreateFromTrend(trend)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-forge-800 hover:bg-crimson-600 text-forge-200 hover:text-white text-[11px] font-semibold transition-all border border-forge-700/60"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Forge This Short</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
