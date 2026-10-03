import axios from 'axios';
import { Project, ProjectBrief, ResearchSource, ClaimVerification, ScriptData, VoiceoverSettings, TimelineTrackItem, MediaAsset } from '../types/project';
import { MOCK_PROJECTS_LIST, INITIAL_DEMO_PROJECT } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('clipforge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Local state cache for zero-backend standalone execution
const STORAGE_KEY = 'clipforge_projects_cache';

function getLocalProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PROJECTS_LIST));
      return MOCK_PROJECTS_LIST;
    }
    return JSON.parse(raw);
  } catch {
    return MOCK_PROJECTS_LIST;
  }
}

function saveLocalProjects(projects: Project[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export const projectApi = {
  async getAllProjects(): Promise<Project[]> {
    try {
      const res = await apiClient.get('/projects');
      return res.data;
    } catch {
      return getLocalProjects();
    }
  },

  async getProjectById(id: string): Promise<Project> {
    try {
      const res = await apiClient.get(`/projects/${id}`);
      return res.data;
    } catch {
      const projects = getLocalProjects();
      const found = projects.find(p => p.id === id);
      if (!found) {
        return INITIAL_DEMO_PROJECT;
      }
      return found;
    }
  },

  async createProject(params: Partial<Project>): Promise<Project> {
    const newProj: Project = {
      id: params.id || ('proj-' + Date.now()),
      userId: params.userId || 'user-creator-1',
      title: params.title || 'Untitled AI Short',
      description: params.description || '',
      status: params.status || 'IDEA',
      platform: params.platform || 'YouTube Shorts',
      duration: params.duration || '45 sec',
      tone: params.tone || 'Educational',
      thumbnailUrl: params.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      createdAt: params.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      renderProgress: params.renderProgress || 0,
      renderedVideoUrl: params.renderedVideoUrl,
      assets: params.assets || [],
      timeline: params.timeline || [],
      brief: params.brief,
      research: params.research,
      script: params.script,
      voiceover: params.voiceover,
      analytics: params.analytics
    };

    try {
      const res = await apiClient.post('/projects', newProj);
      return res.data;
    } catch {
      const projects = getLocalProjects();
      const updated = [newProj, ...projects];
      saveLocalProjects(updated);
      return newProj;
    }
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    try {
      const res = await apiClient.put(`/projects/${id}`, updates);
      return res.data;
    } catch {
      const projects = getLocalProjects();
      const index = projects.findIndex(p => p.id === id);
      if (index === -1) {
        const fallback = { ...INITIAL_DEMO_PROJECT, ...updates, id, updatedAt: new Date().toISOString() };
        saveLocalProjects([fallback, ...projects]);
        return fallback;
      }
      const updatedProj = { ...projects[index], ...updates, updatedAt: new Date().toISOString() };
      projects[index] = updatedProj;
      saveLocalProjects(projects);
      return updatedProj;
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`/projects/${id}`);
      return true;
    } catch {
      const projects = getLocalProjects();
      const filtered = projects.filter(p => p.id !== id);
      saveLocalProjects(filtered);
      return true;
    }
  },

  async resetToDemoData(): Promise<Project[]> {
    localStorage.removeItem(STORAGE_KEY);
    saveLocalProjects(MOCK_PROJECTS_LIST);
    return MOCK_PROJECTS_LIST;
  }
};
