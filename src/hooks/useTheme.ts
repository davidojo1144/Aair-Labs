import { useColorScheme as useRNColorScheme } from 'react-native';
import { useSettingsStore } from '@/src/store/useSettingsStore';

export function useTheme() {
  const systemScheme = useRNColorScheme();
  const { theme, setTheme } = useSettingsStore();

  const activeTheme = theme === 'system' ? systemScheme || 'light' : theme;
  const isDark = activeTheme === 'dark';

  return {
    theme,
    activeTheme,
    isDark,
    setTheme,
  };
}
