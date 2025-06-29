export interface User {
  id: string;
  email: string;
  name: string;
  role: 'researcher' | 'citizen' | 'conservationist';
  avatar?: string;
  joinDate: string;
  preferences: {
    notifications: boolean;
    dataSharing: boolean;
    location: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}