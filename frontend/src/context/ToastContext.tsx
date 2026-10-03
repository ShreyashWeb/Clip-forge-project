import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Sparkles, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'ai';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(({ type, title, message, duration = 4000 }: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
        {toasts.map((toast) => {
          let borderClass = 'border-forge-700 bg-forge-900/95';
          let icon = <Info className="w-5 h-5 text-forge-400" />;

          if (toast.type === 'success') {
            borderClass = 'border-emerald-500/40 bg-forge-900/95 text-emerald-400';
            icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
          } else if (toast.type === 'error') {
            borderClass = 'border-crimson-500/40 bg-forge-900/95 text-crimson-400';
            icon = <AlertCircle className="w-5 h-5 text-crimson-400 shrink-0" />;
          } else if (toast.type === 'warning') {
            borderClass = 'border-amber-500/40 bg-forge-900/95 text-amber-400';
            icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
          } else if (toast.type === 'ai') {
            borderClass = 'border-purple-500/50 bg-forge-900/95 text-purple-300 shadow-glow-crimson';
            icon = <Sparkles className="w-5 h-5 text-purple-400 shrink-0 animate-pulse" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${borderClass}`}
            >
              {icon}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white tracking-wide">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-forge-300 mt-1 leading-relaxed">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-forge-400 hover:text-white transition-colors p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
