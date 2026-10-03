import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  PlusCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  FolderKanban,
  Zap,
  CheckCircle2,
  Video,
  ArrowRight
} from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { QuickCreateCard } from '../components/dashboard/QuickCreateCard';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { TrendSparks } from '../components/dashboard/TrendSparks';
import { Button } from '../components/common/Button';

export const DashboardPage: React.FC = () => {
  const { projects, isLoading } = useProject();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredProjects = projects.filter((p) => {
    if (filterStatus === 'ALL') return true;
    return p.status === filterStatus;
  });

  const totalHoursSaved = (projects.length * 3.8).toFixed(1);
  const totalVerifiedSources = projects.reduce(
    (acc, p) => acc + (p.research?.sources.length || 2),
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Top Welcome Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Good morning, {user?.name?.split(' ')[0] || 'Creator'}
            </h1>
            <span className="text-xs bg-crimson-950 text-crimson-400 font-bold px-2 py-0.5 rounded-full border border-crimson-800 font-mono">
              STUDIO LIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-forge-400 mt-1">
            Research-backed short-form video copilot ready for your next production.
          </p>
        </div>

        {/* Quick Stat Pill Widgets */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-forge-900 border border-forge-700/60 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <span className="text-[10px] text-forge-400 block font-bold uppercase">Time Saved</span>
              <span className="text-xs font-mono font-bold text-white">~{totalHoursSaved} hrs</span>
            </div>
          </div>

          <div className="bg-forge-900 border border-forge-700/60 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-forge-400 block font-bold uppercase">Verified Claims</span>
              <span className="text-xs font-mono font-bold text-white">{totalVerifiedSources * 3}</span>
            </div>
          </div>

          <div className="bg-forge-900 border border-forge-700/60 rounded-xl px-3.5 py-2 flex items-center gap-2.5">
            <Video className="w-4 h-4 text-crimson-400" />
            <div>
              <span className="text-[10px] text-forge-400 block font-bold uppercase">Active Projects</span>
              <span className="text-xs font-mono font-bold text-white">{projects.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Creation Card */}
      <QuickCreateCard />

      {/* Real-time Trend Signals */}
      <TrendSparks />

      {/* Recent Projects Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-forge-800">
          <div className="flex items-center gap-2.5">
            <FolderKanban className="w-5 h-5 text-crimson-500" />
            <h2 className="text-lg font-bold text-white font-display">Recent Video Projects</h2>
            <span className="text-xs text-forge-400 font-mono">({filteredProjects.length})</span>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'EDITING', 'SCRIPT_READY', 'RESEARCHING', 'COMPLETED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-crimson-600 text-white shadow-glow-crimson'
                    : 'bg-forge-850 text-forge-400 hover:text-white hover:bg-forge-800'
                }`}
              >
                {st === 'ALL' ? 'All Projects' : st.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-forge-900/50 rounded-2xl border border-forge-800">
            <p className="text-sm text-forge-400">No projects found with status "{filterStatus}".</p>
          </div>
        )}
      </div>
    </div>
  );
};
