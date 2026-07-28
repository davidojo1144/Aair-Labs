import { useColorScheme } from 'nativewind';
import { useSettingsStore } from '@/src/store/useSettingsStore';

export function useTheme() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { theme, setTheme: persistTheme } = useSettingsStore();

  const isDark = colorScheme === 'dark';

  const setTheme = async (newTheme: 'light' | 'dark' | 'system') => {
    // Persist to AsyncStorage via Zustand
    await persistTheme(newTheme);

    // Imperatively tell NativeWind to switch dark: classes
    if (newTheme === 'system') {
      setColorScheme('system');
    } else {
      setColorScheme(newTheme);
    }
  };

  return {
    theme,
    activeTheme: colorScheme || 'light',
    isDark,
    setTheme,
  };
}
