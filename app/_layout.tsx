import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/src/components/ui/Toast';
import { ErrorBoundary } from '@/src/components/common/ErrorBoundary';
import { useSettingsStore } from '@/src/store/useSettingsStore';
import '@/src/styles/global.css';

export default function RootLayout() {
  const hydrateSettings = useSettingsStore((state) => state.hydrateSettings);
  const savedTheme = useSettingsStore((state) => state.theme);
  const { colorScheme, setColorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  // Hydrate persisted theme settings on mount
  useEffect(() => {
    hydrateSettings();
  }, [hydrateSettings]);

  // Sync NativeWind color scheme with persisted theme after hydration
  useEffect(() => {
    if (savedTheme === 'system') {
      setColorScheme('system');
    } else {
      setColorScheme(savedTheme);
    }
  }, [savedTheme, setColorScheme]);

  return (
    <ErrorBoundary>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="add-task" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
      </Stack>
      <Toast config={toastConfig} />
    </ErrorBoundary>
  );
}
