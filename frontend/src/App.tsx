import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { CreateProjectPage } from './pages/CreateProjectPage';
import { AIStudioPage } from './pages/AIStudioPage';
import { ResearchWorkspacePage } from './pages/ResearchWorkspacePage';
import { ScriptStudioPage } from './pages/ScriptStudioPage';
import { VoiceStudioPage } from './pages/VoiceStudioPage';
import { AssetLibraryPage } from './pages/AssetLibraryPage';
import { VideoEditorPage } from './pages/VideoEditorPage';
import { RenderCenterPage } from './pages/RenderCenterPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ThreeMotionStudioPage } from './pages/ThreeMotionStudioPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ProjectProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Main Studio & App Layout */}
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/create" element={<CreateProjectPage />} />

                {/* 7-Stage Studio Pipeline & 3D Three.js Studio */}
                <Route path="/studio/brief" element={<AIStudioPage />} />
                <Route path="/studio/research" element={<ResearchWorkspacePage />} />
                <Route path="/studio/script" element={<ScriptStudioPage />} />
                <Route path="/studio/voice" element={<VoiceStudioPage />} />
                <Route path="/studio/assets" element={<AssetLibraryPage />} />
                <Route path="/studio/3d-motion" element={<ThreeMotionStudioPage />} />
                <Route path="/studio/editor" element={<VideoEditorPage />} />
                <Route path="/studio/render" element={<RenderCenterPage />} />
                <Route path="/studio/analytics" element={<AnalyticsPage />} />

                {/* Settings & Config */}
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ProjectProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
