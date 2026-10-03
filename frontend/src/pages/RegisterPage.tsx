import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowRight, Lock, Mail, User, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [niche, setNiche] = useState('Tech Explainer & Coding');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast({ type: 'warning', title: 'All Fields Required', message: 'Please complete all required fields.' });
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      showToast({ type: 'success', title: 'Account Created!', message: 'Welcome to ClipForge AI Creator Studio.' });
      navigate('/dashboard');
    } catch (err) {
      showToast({ type: 'error', title: 'Registration Failed', message: 'Could not complete registration.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forge-950 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-crimson-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center shadow-glow-crimson group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-white text-2xl tracking-wider font-display">CLIPFORGE AI</span>
          </Link>
          <p className="text-xs text-forge-400">
            Create your creator account and start producing research-backed shorts.
          </p>
        </div>

        <div className="bg-forge-900/90 border border-forge-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-5">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                Full Name / Creator Handle
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-forge-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Chen"
                  className="glass-input w-full pl-10"
                />
              </div>
            </div>

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
                  placeholder="maya@creator.com"
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

            <div>
              <label className="block text-xs font-semibold text-forge-400 uppercase tracking-wider mb-1.5">
                Primary Content Niche
              </label>
              <select
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="glass-input w-full"
              >
                <option value="Tech Explainer & Coding">Tech Explainer & Coding</option>
                <option value="Science, AI & Math">Science, AI & Math</option>
                <option value="Finance & Startups">Finance & Startups</option>
                <option value="Documentary & History">Documentary & History</option>
                <option value="Health & High Performance">Health & High Performance</option>
              </select>
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading}>
              Create Studio Account
            </Button>
          </form>

          <p className="text-center text-xs text-forge-400 pt-3 border-t border-forge-800">
            Already have an account?{' '}
            <Link to="/login" className="text-crimson-400 hover:text-crimson-300 font-semibold underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
