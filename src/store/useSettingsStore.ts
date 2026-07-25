import { create } from 'zustand';
import { storage } from '@/src/lib/storage';

interface SettingsStore {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
  toggleNotifications: () => Promise<void>;
  hydrateSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  theme: 'system',
  notificationsEnabled: true,

  setTheme: async (theme) => {
    set({ theme });
    await storage.setItem('app_theme', theme);
  },

  toggleNotifications: async () => {
    const nextValue = !get().notificationsEnabled;
    set({ notificationsEnabled: nextValue });
    await storage.setItem('app_notifications', nextValue);
  },

  hydrateSettings: async () => {
    const savedTheme = await storage.getItem<'light' | 'dark' | 'system'>('app_theme');
    const savedNotifications = await storage.getItem<boolean>('app_notifications');

    if (savedTheme) set({ theme: savedTheme });
    if (savedNotifications !== null) set({ notificationsEnabled: savedNotifications });
  },
}));
