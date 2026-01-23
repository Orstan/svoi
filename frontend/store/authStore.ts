import { create } from 'zustand';
import { authApi } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  masterProfile?: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      // Зберігаємо в cookies для middleware
      document.cookie = `auth_token=${token}; path=/; max-age=2592000`; // 30 днів
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  register: async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    try {
      const response = await authApi.register(data);
      const { user, token } = response.data;
      
      localStorage.setItem('auth_token', token);
      // Зберігаємо в cookies для middleware
      document.cookie = `auth_token=${token}; path=/; max-age=2592000`; // 30 днів
      set({ user, token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      // Видаляємо з cookies
      document.cookie = 'auth_token=; path=/; max-age=0';
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }

    try {
      const response = await authApi.me();
      set({ 
        user: response.data, 
        token, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({ 
        user: null, 
        token: null, 
        isAuthenticated: false, 
        isLoading: false 
      });
    }
  },
}));
