import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/project';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  demoLogin: (role?: 'CREATOR' | 'PRO') => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: 'user-creator-1',
  name: 'Alex Rivera',
  email: 'alex.rivera@creator.ai',
  role: 'CREATOR',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  token: 'mock-jwt-token-xyz-2026'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('clipforge_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in for smooth demo experience
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('clipforge_user', JSON.stringify(user));
      localStorage.setItem('clipforge_token', user.token || 'mock-token');
    } else {
      localStorage.removeItem('clipforge_user');
      localStorage.removeItem('clipforge_token');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate backend JWT authentication
    await new Promise((r) => setTimeout(r, 600));
    const loggedUser: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase()),
      email,
      role: 'CREATOR',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      token: 'jwt-auth-' + Math.random().toString(36).substring(2)
    };
    setUser(loggedUser);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 700));
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      role: 'CREATOR',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
      token: 'jwt-auth-' + Math.random().toString(36).substring(2)
    };
    setUser(newUser);
    return true;
  };

  const demoLogin = (role: 'CREATOR' | 'PRO' = 'CREATOR') => {
    setUser({
      ...DEFAULT_USER,
      role
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        demoLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
