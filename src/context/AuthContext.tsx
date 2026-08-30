import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { generateToken, decodeToken, userFromPayload } from '../utils/jwt';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  jwtToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole, name?: string) => void;
  signup: (userData: { name: string; email: string; role: UserRole; age?: number; gender?: string; condition?: string }) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultPatientUser: User = {
  id: 'p1',
  name: 'Robert Vance',
  email: 'robert.vance@example.com',
  role: 'patient',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  phone: '+1 (555) 234-5678',
  age: 62,
  gender: 'Male',
  condition: 'Type 2 Diabetes & Hypertension',
  primaryDoctor: 'Dr. Sarah Jenkins'
};

const defaultDoctorUser: User = {
  id: 'doc1',
  name: 'Dr. Sarah Jenkins',
  email: 'dr.jenkins@caremate-health.org',
  role: 'doctor',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150',
  phone: '+1 (555) 987-6543'
};

const TOKEN_KEY = 'caremate_jwt_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jwtToken, setJwtToken] = useState<string | null>(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (saved) {
      const decoded = decodeToken(saved);
      if (decoded) return saved;
    }
    // Default initial demo token for Robert Vance
    const initialToken = generateToken(defaultPatientUser);
    localStorage.setItem(TOKEN_KEY, initialToken);
    return initialToken;
  });

  const [user, setUser] = useState<User | null>(() => {
    if (jwtToken) {
      const decoded = decodeToken(jwtToken);
      if (decoded) return userFromPayload(decoded);
    }
    return defaultPatientUser;
  });

  // Keep localStorage synced when token changes
  useEffect(() => {
    if (jwtToken) {
      localStorage.setItem(TOKEN_KEY, jwtToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [jwtToken]);

  const login = (email: string, selectedRole: UserRole, name?: string) => {
    let targetUser: User;

    if (selectedRole === 'doctor') {
      targetUser = {
        ...defaultDoctorUser,
        email: email || defaultDoctorUser.email,
        name: name || defaultDoctorUser.name
      };
    } else {
      targetUser = {
        ...defaultPatientUser,
        email: email || defaultPatientUser.email,
        name: name || defaultPatientUser.name
      };
    }

    const token = generateToken(targetUser);
    setJwtToken(token);
    setUser(targetUser);
  };

  const signup = (userData: { name: string; email: string; role: UserRole; age?: number; gender?: string; condition?: string }) => {
    const newUser: User = {
      id: `u-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.role === 'doctor'
        ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      phone: '+1 (555) 019-2831',
      age: userData.age || 40,
      gender: userData.gender || 'Not specified',
      condition: userData.condition || 'General Care',
      primaryDoctor: 'Dr. Sarah Jenkins'
    };

    const token = generateToken(newUser);
    setJwtToken(token);
    setUser(newUser);
  };

  const setRole = (newRole: UserRole) => {
    if (newRole === 'patient') {
      const token = generateToken(defaultPatientUser);
      setJwtToken(token);
      setUser(defaultPatientUser);
    } else if (newRole === 'doctor') {
      const token = generateToken(defaultDoctorUser);
      setJwtToken(token);
      setUser(defaultDoctorUser);
    } else {
      setJwtToken(null);
      setUser(null);
    }
  };

  const logout = () => {
    setJwtToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const role: UserRole = user ? user.role : 'guest';
  const isAuthenticated = !!user && !!jwtToken;

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        jwtToken,
        isAuthenticated,
        login,
        signup,
        logout,
        setRole
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
