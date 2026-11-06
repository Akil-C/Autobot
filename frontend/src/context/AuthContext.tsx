import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'CUSTOMER' | 'ADMIN' | 'SALES_MANAGER' | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  fullName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (username: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('autobot_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('autobot_token') || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('autobot_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('autobot_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('autobot_token', token);
    } else {
      localStorage.removeItem('autobot_token');
    }
  }, [token]);

  const login = async (username: string, role: UserRole = 'CUSTOMER') => {
    const fakeToken = `jwt-atb-${Date.now()}`;
    const newUser: AuthUser = {
      id: `usr-${Date.now()}`,
      username,
      email: `${username.toLowerCase()}@autobot.example`,
      role,
      fullName: username.charAt(0).toUpperCase() + username.slice(1)
    };
    setUser(newUser);
    setToken(fakeToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin
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
