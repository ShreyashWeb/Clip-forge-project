import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  CheckCircle2,
  Clock,
  Bell,
  ChevronDown,
  Layers,
  LogOut,
  RefreshCw,
  FolderKanban,
  Command,
  FileText,
  Mic,
  Sliders,
  Cpu,
  BarChart3,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const Topbar: React.FC = () => {
  const { projects, activeProject, selectProject, saveStatus, resetToDemo } = useProject();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showProjectMenu, setShowProjectMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleResetDemo = async () => {
    await resetToDemo();
    setShowProjectMenu(false);
  };

  const commandActions = [
    { label: 'Create New Short', icon: Plus, path: '/create', group: 'Actions' },
    { label: 'Dashboard Overview', icon: FolderKanban, path: '/dashboard', group: 'Navigation' },
    { label: 'Stage 01: Angle & Brief', icon: Sparkles, path: '/studio/brief', group: 'Pipeline' },
    { label: 'Stage 02: Research & Claims', icon: ShieldCheck, path: '/studio/research', group: 'Pipeline' },
    { label: 'Stage 03: Script Studio', icon: FileText, path: '/studio/script', group: 'Pipeline' },
    { label: 'Stage 04: Voice Studio', icon: Mic, path: '/studio/voice', group: 'Pipeline' },
    { label: 'Stage 05: B-Roll & Visuals', icon: Layers, path: '/studio/assets', group: 'Pipeline' },
    { label: 'Stage 06: Video Editor', icon: Sliders, path: '/studio/editor', group: 'Pipeline' },
    { label: 'Stage 07: Render & Publish', icon: Cpu, path: '/studio/render', group: 'Pipeline' },
    { label: 'Retention Analytics', icon: BarChart3, path: '/studio/analytics', group: 'Navigation' },
  ];

  const filteredCommands = commandActions.filter((cmd) =>
    cmd.label.toLowerCase().includes(commandQuery.toLowerCase())
  );

  return (
    <header className="h-16 bg-forge-900/90 border-b border-forge-700/60 px-6 flex items-center justify-between z-20 backdrop-blur-md select-none">
      {/* Left: Project Selector & Status */}
      <div className="flex items-center gap-4">
        {/* Project Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProjectMenu(!showProjectMenu)}
            className="flex items-center gap-2.5 bg-forge-850 hover:bg-forge-800 border border-forge-700/70 hover:border-crimson-500/40 rounded-xl px-3.5 py-2 text-xs font-semibold text-white transition-all shadow-sm"
          >
            <FolderKanban className="w-4 h-4 text-crimson-500" />
            <span className="max-w-[180px] sm:max-w-[240px] truncate">
              {activeProject ? activeProject.title : 'Select Project'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-forge-400" />
          </button>

          {showProjectMenu && (
            <>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setShowProjectMenu(false)}
              />
              <div className="absolute left-0 mt-2 w-80 bg-forge-900 border border-forge-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="p-2 border-b border-forge-700/50 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-forge-400 uppercase tracking-wider">
                    Switch Project
                  </span>
                  <button
                    onClick={handleResetDemo}
                    className="flex items-center gap-1 text-[11px] text-crimson-400 hover:text-crimson-300 transition-colors"
                    title="Reload demo datasets"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset Demo</span>
                  </button>
                </div>

                <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        selectProject(p.id);
                        setShowProjectMenu(false);
                        showToast({ type: 'info', title: 'Project Switched', message: p.title });
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                        activeProject?.id === p.id
                          ? 'bg-crimson-950/70 border border-crimson-600/50 text-white font-semibold'
                          : 'hover:bg-forge-800 text-forge-200'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.title}</p>
                        <p className="text-[10px] text-forge-400">{p.platform} • {p.duration}</p>
                      </div>
                      <Badge status={p.status} size="sm" icon={false} />
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-forge-700/50">
                  <button
                    onClick={() => {
                      navigate('/create');
                      setShowProjectMenu(false);
                    }}
                    className="w-full text-center py-2 text-xs font-semibold text-crimson-400 hover:text-crimson-300 hover:bg-forge-800 rounded-lg transition-colors"
                  >
                    + Create New Project
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Project Status Badge */}
        {activeProject && (
          <div className="hidden md:flex items-center gap-2">
            <Badge status={activeProject.status} />
          </div>
        )}
      </div>

      {/* Center: Live Sync & AI Status */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Save Status Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-forge-400 bg-forge-850/60 px-3 py-1.5 rounded-full border border-forge-700/40 font-mono">
          {saveStatus === 'saving' ? (
            <>
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="text-amber-300">Syncing changes...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-forge-300">Auto-saved</span>
            </>
          )}
        </div>

        {/* AI Copilot Status */}
        <div className="flex items-center gap-1.5 text-xs bg-purple-950/60 border border-purple-700/50 text-purple-300 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="font-semibold">Gemini 2.0 Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5" />
        </div>
      </div>

      {/* Right: Quick Search & Command Palette Trigger */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCommandOpen(true)}
          className="flex items-center gap-2 bg-forge-850/80 hover:bg-forge-800 border border-forge-700/60 rounded-xl px-3 py-1.5 text-xs text-forge-400 hover:text-white transition-all"
        >
          <Search className="w-3.5 h-3.5 text-forge-500" />
          <span className="hidden sm:inline">Search studio...</span>
          <kbd className="hidden sm:inline-block bg-forge-900 border border-forge-700 text-[10px] font-mono px-1.5 py-0.5 rounded text-forge-400">
            Ctrl+K
          </kbd>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() =>
            showToast({
              type: 'ai',
              title: 'AI Recommendation',
              message: 'SWE-bench verified citation connected to script section 01.',
            })
          }
          className="p-2 rounded-xl bg-forge-850 hover:bg-forge-800 border border-forge-700/60 text-forge-400 hover:text-white transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
        </button>

        {/* User Avatar Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-forge-800 transition-colors"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full object-cover border border-crimson-500/50"
            />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-forge-900 border border-forge-700/80 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="p-3 border-b border-forge-700/50">
                  <p className="text-xs font-bold text-white">{user?.name || 'Creator'}</p>
                  <p className="text-[11px] text-forge-400 truncate">{user?.email || 'demo@creator.ai'}</p>
                </div>

                <div className="py-1 space-y-1">
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-forge-300 hover:text-white hover:bg-forge-800 rounded-lg transition-colors"
                  >
                    Settings & Keys
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Global Command Palette Modal */}
      <Modal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        title="Studio Quick Commands & Navigation"
        subtitle="Jump directly to any studio stage, project action, or analytics metric."
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-forge-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={commandQuery}
              onChange={(e) => setCommandQuery(e.target.value)}
              placeholder="Type a command or page name..."
              className="glass-input w-full pl-10 text-sm"
            />
          </div>

          <div className="max-h-72 overflow-y-auto space-y-1 pt-1">
            {filteredCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => {
                  navigate(cmd.path);
                  setIsCommandOpen(false);
                }}
                className="w-full p-3 rounded-xl hover:bg-forge-800 text-left text-xs text-forge-200 hover:text-white flex items-center justify-between gap-2 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-forge-850 group-hover:bg-crimson-950 text-forge-400 group-hover:text-crimson-400 border border-forge-700 transition-colors">
                    <cmd.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{cmd.label}</span>
                </div>
                <span className="text-[10px] font-mono text-forge-500 uppercase">{cmd.group}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </header>
  );
};
