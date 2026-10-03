import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Sparkles, ShieldCheck, FileText, Sliders, Cpu, MoreVertical, Copy, Trash2, ArrowUpRight } from 'lucide-react';
import { Project } from '../../types/project';
import { Badge } from '../common/Badge';
import { useProject } from '../../context/ProjectContext';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const navigate = useNavigate();
  const { selectProject, duplicateProject, deleteProject } = useProject();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleOpenStudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectProject(project.id);
    
    // Jump to the appropriate studio stage based on status
    switch (project.status) {
      case 'IDEA':
        navigate('/studio/brief');
        break;
      case 'RESEARCHING':
        navigate('/studio/research');
        break;
      case 'SCRIPT_READY':
        navigate('/studio/script');
        break;
      case 'VOICE_READY':
        navigate('/studio/voice');
        break;
      case 'EDITING':
        navigate('/studio/editor');
        break;
      case 'RENDERING':
      case 'COMPLETED':
        navigate('/studio/render');
        break;
      default:
        navigate('/studio/brief');
    }
  };

  return (
    <div
      onClick={handleOpenStudio}
      className="group relative bg-forge-850/90 border border-forge-700/60 hover:border-crimson-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-glow-crimson transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Thumbnail Banner */}
      <div className="relative h-40 w-full overflow-hidden bg-forge-950">
        <img
          src={project.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forge-900 via-transparent to-black/40" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge status={project.status} size="sm" />
        </div>

        {/* Duration & Platform pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-mono px-2 py-0.5 rounded-md border border-white/10">
            {project.duration}
          </span>
          <span className="bg-forge-900/80 backdrop-blur-md text-forge-300 text-[11px] px-2 py-0.5 rounded-md border border-forge-700">
            {project.platform}
          </span>
        </div>

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-crimson-600/90 text-white flex items-center justify-center shadow-glow-crimson transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-white text-base leading-snug group-hover:text-crimson-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-forge-400 mt-2 line-clamp-2 leading-relaxed">
            {project.brief?.uniqueAngle || project.description || 'AI-assisted research-backed short production.'}
          </p>
        </div>

        {/* Footer info & quick actions */}
        <div className="mt-4 pt-3 border-t border-forge-700/50 flex items-center justify-between text-xs text-forge-400">
          <span className="font-mono text-[11px]">
            {new Date(project.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => duplicateProject(project.id)}
              className="p-1.5 rounded-lg hover:bg-forge-750 text-forge-400 hover:text-white transition-colors"
              title="Duplicate project"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => deleteProject(project.id)}
              className="p-1.5 rounded-lg hover:bg-rose-950/80 text-forge-400 hover:text-rose-400 transition-colors"
              title="Delete project"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleOpenStudio}
              className="p-1.5 rounded-lg bg-forge-750 hover:bg-crimson-600 text-forge-200 hover:text-white transition-all ml-1"
              title="Open studio"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
