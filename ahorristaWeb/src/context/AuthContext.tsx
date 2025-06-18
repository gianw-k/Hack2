import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export interface AuthData { token: string; email: string; }

interface AuthCtx {
  user: AuthData | null;
  login(email: string, passwd: string): Promise<void>;
  register(email: string, passwd: string): Promise<void>;
  logout(): void;
}

export const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, passwd: string) => {
    const res = await api.post('/authentication/login', { email, passwd });
    const data: AuthData = res.data.data;
    localStorage.setItem('auth', JSON.stringify(data));
    localStorage.setItem('token', data.token);
    setUser(data);
  };

  const register = async (email: string, passwd: string) => {
    await api.post('/authentication/register', { email, passwd });
    return login(email, passwd);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
