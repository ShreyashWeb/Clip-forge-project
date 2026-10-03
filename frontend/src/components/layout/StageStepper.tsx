import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, ShieldCheck, FileText, Mic, FolderGit2, Box, Sliders, Cpu, Check } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

export const StageStepper: React.FC = () => {
  const { activeProject } = useProject();
  const location = useLocation();

  const stages = [
    { id: 'brief', name: '01 Angle & Brief', path: '/studio/brief', icon: Sparkles },
    { id: 'research', name: '02 Research & Claims', path: '/studio/research', icon: ShieldCheck },
    { id: 'script', name: '03 Script Studio', path: '/studio/script', icon: FileText },
    { id: 'voice', name: '04 Voice Studio', path: '/studio/voice', icon: Mic },
    { id: 'assets', name: '05 B-Roll & Visuals', path: '/studio/assets', icon: FolderGit2 },
    { id: '3d-motion', name: '06 3D Three.js Studio', path: '/studio/3d-motion', icon: Box },
    { id: 'editor', name: '07 3D Video Editor', path: '/studio/editor', icon: Sliders },
    { id: 'render', name: '08 Render & Publish', path: '/studio/render', icon: Cpu },
  ];

  return (
    <div className="w-full bg-forge-900/90 border-b border-forge-700/60 px-4 py-2.5 overflow-x-auto select-none backdrop-blur-md">
      <div className="flex items-center min-w-max gap-1 sm:gap-2">
        {stages.map((stage, idx) => {
          const isActive = location.pathname.startsWith(stage.path);
          return (
            <React.Fragment key={stage.id}>
              <NavLink
                to={stage.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-crimson-600 text-white shadow-glow-crimson'
                    : 'text-forge-400 hover:text-white hover:bg-forge-800/80'
                }`}
              >
                <stage.icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-forge-400'}`} />
                <span>{stage.name}</span>
              </NavLink>
              {idx < stages.length - 1 && (
                <span className="text-forge-700 text-xs font-bold px-0.5">/</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
