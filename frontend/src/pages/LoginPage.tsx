import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowRight, Lock, Mail, CheckCircle2, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('alex.rivera@creator.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const { login, demoLogin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast({ type: 'warning', title: 'Input Required', message: 'Please enter both email and password.' });
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      showToast({ type: 'success', title: 'Welcome Back!', message: 'Signed in successfully to ClipForage Studio.' });
      navigate('/dashboard');
    } catch (err) {
      showToast({ type: 'error', title: 'Sign In Failed', message: 'Invalid credentials provided.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = () => {
    demoLogin('CREATOR');
    showToast({ type: 'ai', title: 'Demo Access Granted', message: 'Logged in as Demo Creator with pre-loaded projects.' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-forge-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center shadow-glow-crimson group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-white text-2xl tracking-wider font-display">CLIPFORAGE AI</span>
          </Link>
          <p className="text-xs text-forge-400">
            Sign in to access your research-backed short video production workspace.
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-forge-900/90 border border-forge-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-forge-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@studio.com"
                  className="glass-input w-full pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-forge-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-input w-full pl-10"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Sign In to Studio
            </Button>
          </form>

          {/* Quick Demo Fill Button */}
          <div className="pt-3 border-t border-forge-800 space-y-3">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-purple-950/60 border border-purple-600/50 hover:bg-purple-900/80 text-purple-200 text-xs font-bold transition-all shadow-glow-crimson"
            >
              <UserCheck className="w-4 h-4 text-purple-400" />
              <span>Instant 1-Click Creator Demo Login</span>
            </button>

            <p className="text-center text-xs text-forge-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-crimson-400 hover:text-crimson-300 font-semibold underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
