import { create } from 'zustand';
import { User } from '@/src/types';
import { secureStorage } from '@/src/lib/secureStorage';

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricsEnabled: boolean;
  setAuth: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setBiometricsEnabled: (enabled: boolean) => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  biometricsEnabled: false,

  setAuth: async (user: User, token: string) => {
    await secureStorage.setItem('auth_token', token);
    await secureStorage.setItem('auth_user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: async () => {
    await secureStorage.deleteItem('auth_token');
    await secureStorage.deleteItem('auth_user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  setBiometricsEnabled: (enabled: boolean) => {
    set({ biometricsEnabled: enabled });
  },

  hydrate: async () => {
    try {
      set({ isLoading: true });
      const token = await secureStorage.getItem('auth_token');
      const userJson = await secureStorage.getItem('auth_user');

      if (token && userJson) {
        const user = JSON.parse(userJson) as User;
        set({ user, token, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
