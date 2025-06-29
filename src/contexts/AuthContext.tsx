import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Mock user database
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'researcher@example.com',
      name: 'Dr. Sarah Chen',
      role: 'researcher',
      joinDate: '2023-01-15',
      preferences: {
        notifications: true,
        dataSharing: true,
        location: true,
      },
    },
    {
      id: '2',
      email: 'citizen@example.com',
      name: 'Alex Johnson',
      role: 'citizen',
      joinDate: '2023-06-20',
      preferences: {
        notifications: true,
        dataSharing: false,
        location: true,
      },
    },
  ];

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('butterflyai_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('butterflyai_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password.length >= 6) { // Simple password validation
      const userSession = { ...user };
      localStorage.setItem('butterflyai_user', JSON.stringify(userSession));
      
      setAuthState({
        user: userSession,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, role: User['role']): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      joinDate: new Date().toISOString(),
      preferences: {
        notifications: true,
        dataSharing: true,
        location: true,
      },
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    localStorage.setItem('butterflyai_user', JSON.stringify(newUser));
    
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });
    
    return true;
  };

  const logout = () => {
    localStorage.removeItem('butterflyai_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem('butterflyai_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};