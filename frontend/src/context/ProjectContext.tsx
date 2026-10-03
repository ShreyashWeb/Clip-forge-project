import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Project, ProjectStatus, ProjectBrief, ResearchSource, ClaimVerification, ScriptData, VoiceoverSettings, TimelineTrackItem, MediaAsset } from '../types/project';
import { projectApi } from '../services/api';
import { INITIAL_DEMO_PROJECT, MOCK_PROJECTS_LIST } from '../services/mockData';
import { useToast } from './ToastContext';

interface ProjectContextType {
  projects: Project[];
  activeProject: Project | null;
  isLoading: boolean;
  saveStatus: 'saved' | 'saving' | 'error';
  selectProject: (id: string) => Promise<void>;
  createProject: (params: Partial<Project>) => Promise<Project>;
  updateActiveProject: (updates: Partial<Project>, targetProjectId?: string) => Promise<void>;
  updateProjectBrief: (brief: ProjectBrief, targetProjectId?: string) => Promise<void>;
  updateProjectResearch: (research: { summary: string; keyFacts: string[]; sources: ResearchSource[]; claims: ClaimVerification[] }, targetProjectId?: string) => Promise<void>;
  updateProjectScript: (script: ScriptData, targetProjectId?: string) => Promise<void>;
  updateProjectVoiceover: (voiceover: VoiceoverSettings, targetProjectId?: string) => Promise<void>;
  updateProjectTimeline: (timeline: TimelineTrackItem[], targetProjectId?: string) => Promise<void>;
  updateProjectAssets: (assets: MediaAsset[], targetProjectId?: string) => Promise<void>;
  setProjectStatus: (status: ProjectStatus, targetProjectId?: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<Project>;
  resetToDemo: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const activeProjectRef = useRef<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');
  const { showToast } = useToast();

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await projectApi.getAllProjects();
      setProjects(list);
      if (list.length > 0 && !activeProjectRef.current) {
        const flagship = list.find(p => p.id === 'proj-ai-agents-2026') || list[0];
        activeProjectRef.current = flagship;
        setActiveProject(flagship);
      }
    } catch (err) {
      console.error('Failed to load projects', err);
      setProjects(MOCK_PROJECTS_LIST);
      activeProjectRef.current = INITIAL_DEMO_PROJECT;
      setActiveProject(INITIAL_DEMO_PROJECT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const selectProject = async (id: string) => {
    setIsLoading(true);
    try {
      const proj = await projectApi.getProjectById(id);
      activeProjectRef.current = proj;
      setActiveProject(proj);
    } catch (err) {
      showToast({ type: 'error', title: 'Error loading project', message: 'Could not load project details.' });
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (params: Partial<Project>): Promise<Project> => {
    setSaveStatus('saving');
    try {
      const newProj = await projectApi.createProject(params);
      activeProjectRef.current = newProj;
      setActiveProject(newProj);
      setProjects(prev => [newProj, ...prev.filter(p => p.id !== newProj.id)]);
      setSaveStatus('saved');
      showToast({ type: 'success', title: 'Project Created', message: `"${newProj.title}" has been created.` });
      return newProj;
    } catch (err) {
      setSaveStatus('error');
      showToast({ type: 'error', title: 'Creation Failed', message: 'Unable to create new project.' });
      throw err;
    }
  };

  const updateActiveProject = async (updates: Partial<Project>, targetProjectId?: string) => {
    const targetId = targetProjectId || activeProjectRef.current?.id || activeProject?.id;
    if (!targetId) return;
    setSaveStatus('saving');
    try {
      const updated = await projectApi.updateProject(targetId, updates);
      if (activeProjectRef.current?.id === targetId || !activeProjectRef.current) {
        activeProjectRef.current = updated;
        setActiveProject(updated);
      }
      setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
      setSaveStatus('saved');
    } catch (err) {
      setSaveStatus('error');
      showToast({ type: 'error', title: 'Save Failed', message: 'Could not save project changes.' });
    }
  };

  const updateProjectBrief = async (brief: ProjectBrief, targetProjectId?: string) => {
    await updateActiveProject({ brief, status: 'RESEARCHING' }, targetProjectId);
  };

  const updateProjectResearch = async (
    research: { summary: string; keyFacts: string[]; sources: ResearchSource[]; claims: ClaimVerification[] },
    targetProjectId?: string
  ) => {
    await updateActiveProject({ research, status: 'SCRIPT_READY' }, targetProjectId);
  };

  const updateProjectScript = async (script: ScriptData, targetProjectId?: string) => {
    await updateActiveProject({ script, status: 'VOICE_READY' }, targetProjectId);
  };

  const updateProjectVoiceover = async (voiceover: VoiceoverSettings, targetProjectId?: string) => {
    await updateActiveProject({ voiceover, status: 'EDITING' }, targetProjectId);
  };

  const updateProjectTimeline = async (timeline: TimelineTrackItem[], targetProjectId?: string) => {
    await updateActiveProject({ timeline }, targetProjectId);
  };

  const updateProjectAssets = async (assets: MediaAsset[], targetProjectId?: string) => {
    await updateActiveProject({ assets }, targetProjectId);
  };

  const setProjectStatus = async (status: ProjectStatus, targetProjectId?: string) => {
    await updateActiveProject({ status }, targetProjectId);
  };

  const deleteProject = async (id: string) => {
    try {
      await projectApi.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (activeProjectRef.current?.id === id) {
        const remaining = projects.filter(p => p.id !== id);
        const next = remaining.length > 0 ? remaining[0] : null;
        activeProjectRef.current = next;
        setActiveProject(next);
      }
      showToast({ type: 'info', title: 'Project Deleted', message: 'The project has been removed.' });
    } catch (err) {
      showToast({ type: 'error', title: 'Delete Failed', message: 'Could not delete project.' });
    }
  };

  const duplicateProject = async (id: string): Promise<Project> => {
    const target = projects.find(p => p.id === id) || activeProjectRef.current;
    if (!target) throw new Error('Target project not found');

    const cloned: Partial<Project> = {
      ...target,
      id: 'proj-' + Date.now(),
      title: `${target.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: target.status || 'IDEA'
    };

    const created = await createProject(cloned);
    return created;
  };

  const resetToDemo = async () => {
    setIsLoading(true);
    try {
      const list = await projectApi.resetToDemoData();
      setProjects(list);
      activeProjectRef.current = INITIAL_DEMO_PROJECT;
      setActiveProject(INITIAL_DEMO_PROJECT);
      showToast({ type: 'ai', title: 'Demo Data Restored', message: 'Default demo projects have been reset.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeProject,
        isLoading,
        saveStatus,
        selectProject,
        createProject,
        updateActiveProject,
        updateProjectBrief,
        updateProjectResearch,
        updateProjectScript,
        updateProjectVoiceover,
        updateProjectTimeline,
        updateProjectAssets,
        setProjectStatus,
        deleteProject,
        duplicateProject,
        resetToDemo
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

