import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { StageStepper } from './StageStepper';
import { Menu, X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isStudioRoute = location.pathname.startsWith('/studio');

  return (
    <div className="flex h-screen bg-forge-950 text-forge-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] h-full z-10 animate-in slide-in-from-left duration-200">
            <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Topbar />

        {/* Mobile menu trigger bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-2 bg-forge-900 border-b border-forge-700/60">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold text-forge-300 hover:text-white"
          >
            <Menu className="w-4 h-4 text-crimson-500" />
            <span>Studio Menu</span>
          </button>
        </div>

        {/* 7-Stage Stepper Header when in studio view */}
        {isStudioRoute && <StageStepper />}

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-forge-950/60 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
