import React, { createContext, useContext, useMemo, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => sessionStorage.getItem('tulunadu_token'));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('tulunadu_user') || 'null');
    } catch {
      sessionStorage.removeItem('tulunadu_user');
      return null;
    }
  });

  const setSession = (response) => {
    const data = response.data?.data;
    if (!data?.token || !data?.username) {
      throw new Error('The server returned an invalid authentication response.');
    }
    const nextUser = { id: data.id, username: data.username, email: data.email, roles: data.roles || [] };
    sessionStorage.setItem('tulunadu_token', data.token);
    sessionStorage.setItem('tulunadu_user', JSON.stringify(nextUser));
    setToken(data.token);
    setUser(nextUser);
    return nextUser;
  };

  const login = async (credentials) => setSession(await api.post('/auth/login', credentials));

  const register = async (details) => {
    await api.post('/auth/register', details);
    return login({ username: details.username, password: details.password });
  };

  const logout = () => {
    sessionStorage.removeItem('tulunadu_token');
    sessionStorage.removeItem('tulunadu_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
