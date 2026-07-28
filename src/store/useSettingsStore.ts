import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsStore {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => Promise<void>;
  hydrateSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  theme: 'system',

  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem('@aairlabs_theme_v1', theme);
  },

  hydrateSettings: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@aairlabs_theme_v1');
      if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
        set({ theme: savedTheme });
      }
    } catch (error) {
      console.error('Error hydrating settings:', error);
    }
  },
}));
