import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Plus, Search, Filter, RefreshCw, Sparkles } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { ProjectCard } from '../components/dashboard/ProjectCard';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';

export const ProjectsPage: React.FC = () => {
  const { projects, resetToDemo } = useProject();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [platformFilter, setPlatformFilter] = useState('ALL');

  const filtered = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
    const matchPlatform = platformFilter === 'ALL' || p.platform === platformFilter;
    return matchSearch && matchStatus && matchPlatform;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
            Video Projects
          </h1>
          <p className="text-xs sm:text-sm text-forge-400 mt-1">
            Manage your research briefs, scripts, assets, and rendered shorts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={resetToDemo} icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Reset Demo Data
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/create')} icon={<Plus className="w-4 h-4" />}>
            Create New Short
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-forge-900 border border-forge-700/60 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-forge-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="glass-input w-full pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="glass-input text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="IDEA">Idea Phase</option>
            <option value="RESEARCHING">Researching</option>
            <option value="SCRIPT_READY">Script Ready</option>
            <option value="VOICE_READY">Voice Ready</option>
            <option value="EDITING">Editing</option>
            <option value="RENDERING">Rendering</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="glass-input text-xs"
          >
            <option value="ALL">All Platforms</option>
            <option value="YouTube Shorts">YouTube Shorts</option>
            <option value="Instagram Reels">Instagram Reels</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FolderKanban className="w-8 h-8 text-crimson-500" />}
          title="No Matching Projects Found"
          description="Try adjusting your search terms or filters, or create a brand new research-backed video project."
          actionText="Create Project"
          onAction={() => navigate('/create')}
        />
      )}
    </div>
  );
};
