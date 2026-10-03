import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  ShieldCheck,
  FileText,
  Mic,
  FolderGit2,
  Sliders,
  Cpu,
  BarChart3,
  Settings,
  PlusCircle,
  Video,
  Box,
  Flame
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const { activeProject } = useProject();
  const { user } = useAuth();
  const navigate = useNavigate();

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
  ];

  const studioNav = [
    { name: 'AI Studio (Brief)', path: '/studio/brief', icon: Sparkles, badge: 'AI' },
    { name: 'Research Workspace', path: '/studio/research', icon: ShieldCheck, badge: activeProject?.research?.sources.length ? `${activeProject.research.sources.length}` : undefined },
    { name: 'Script Studio', path: '/studio/script', icon: FileText },
    { name: 'Voice Studio', path: '/studio/voice', icon: Mic },
    { name: 'Asset Library', path: '/studio/assets', icon: FolderGit2 },
    { name: '3D Motion Studio', path: '/studio/3d-motion', icon: Box, badge: 'Three.js' },
    { name: 'Video Editor (3D)', path: '/studio/editor', icon: Sliders, highlight: true },
    { name: 'Render Center', path: '/studio/render', icon: Cpu, badge: activeProject?.renderProgress ? `${activeProject.renderProgress}%` : undefined },
    { name: 'Analytics', path: '/studio/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 h-screen bg-forge-900 border-r border-forge-700/60 flex flex-col justify-between shrink-0 select-none z-30">
      {/* Brand & Active Project Header */}
      <div>
        <div className="p-5 border-b border-forge-700/60 flex items-center justify-between">
          <NavLink
            to="/dashboard"
            onClick={() => onClose?.()}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center shadow-glow-crimson group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base tracking-wider font-display">CLIPFORGE</span>
                <span className="text-[10px] bg-crimson-950 text-crimson-400 font-bold px-1.5 py-0.5 rounded border border-crimson-700/40">AI</span>
              </div>
              <p className="text-[10px] text-forge-400 font-mono tracking-tight">RESEARCH COPILOT</p>
            </div>
          </NavLink>
        </div>

        {/* Quick New Video Button */}
        <div className="p-3">
          <button
            onClick={() => {
              onClose?.();
              navigate('/create');
            }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-crimson-600 to-crimson-500 hover:from-crimson-500 hover:to-crimson-400 text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-glow-crimson transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New AI Short</span>
          </button>
        </div>

        {/* Active Project Pill */}
        {activeProject && (
          <div className="mx-3 mb-2 p-2.5 bg-forge-850 border border-forge-700/60 rounded-xl">
            <div className="flex items-center justify-between text-[11px] text-forge-400 mb-1">
              <span className="uppercase tracking-wider font-semibold">Active Project</span>
              <span className="text-crimson-400 font-mono font-medium">{activeProject.duration}</span>
            </div>
            <p className="text-xs font-semibold text-white truncate" title={activeProject.title}>
              {activeProject.title}
            </p>
          </div>
        )}

        {/* Navigation List */}
        <div className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)]">
          <div className="px-3 py-1.5 text-[10px] font-bold text-forge-500 uppercase tracking-wider">
            Workspace
          </div>
          {mainNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-forge-800 text-white border border-crimson-500/40 shadow-sm'
                    : 'text-forge-300 hover:bg-forge-850 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 text-forge-400" />
                <span>{item.name}</span>
              </div>
            </NavLink>
          ))}

          <div className="px-3 pt-3 pb-1.5 text-[10px] font-bold text-forge-500 uppercase tracking-wider">
            Production Studio
          </div>
          {studioNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-crimson-950/60 text-white border border-crimson-500/50 shadow-glow-crimson font-semibold'
                    : item.highlight
                    ? 'text-forge-200 hover:bg-forge-850 hover:text-white border border-forge-700/40'
                    : 'text-forge-300 hover:bg-forge-850 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <item.icon
                  className={`w-4 h-4 ${
                    item.highlight ? 'text-crimson-400' : 'text-forge-400'
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] bg-forge-800 text-forge-300 font-mono px-1.5 py-0.5 rounded border border-forge-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* User profile & Settings Footer */}
      <div className="p-3 border-t border-forge-700/60 bg-forge-950/40 space-y-1">
        <NavLink
          to="/settings"
          onClick={() => onClose?.()}
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive
                ? 'bg-forge-800 text-white'
                : 'text-forge-400 hover:bg-forge-850 hover:text-white'
            }`
          }
        >
          <Settings className="w-4 h-4 text-forge-400" />
          <span>API & Settings</span>
        </NavLink>

        {user && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-forge-850/60 border border-forge-700/40 mt-1">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-crimson-500/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-forge-400 truncate">{user.email}</p>
              </div>
            </div>
            <span className="text-[9px] bg-crimson-950 text-crimson-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-crimson-700/40">
              PRO
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
