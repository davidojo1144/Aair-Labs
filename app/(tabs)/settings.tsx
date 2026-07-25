import React from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Moon, Sun, Bell, Smartphone } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { useSettingsStore } from '@/src/store/useSettingsStore';
import { useTheme } from '@/src/hooks/useTheme';
import { showToast } from '@/src/components/ui/Toast';

export default function SettingsScreen() {
  const { theme, setTheme, activeTheme } = useTheme();
  const { notificationsEnabled, toggleNotifications } = useSettingsStore();

  const handleToggleNotifications = async () => {
    await toggleNotifications();
    showToast.success('Settings Updated', 'Notification preferences updated.');
  };

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark p-4">
      <Card className="mb-6">
        <Text className="text-sm font-bold text-secondary-900 dark:text-white mb-4">
          Theme Preference
        </Text>

        <View className="flex-row justify-between mb-2">
          {(['light', 'dark', 'system'] as const).map((mode) => (
            <TouchableOpacity
              key={mode}
              onPress={() => setTheme(mode)}
              className={`flex-1 mx-1 p-3 rounded-xl items-center border ${
                theme === mode
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                  : 'border-secondary-200 dark:border-secondary-700 bg-transparent'
              }`}
            >
              {mode === 'light' && <Sun size={20} color={theme === mode ? '#0284c7' : '#64748b'} />}
              {mode === 'dark' && <Moon size={20} color={theme === mode ? '#0284c7' : '#64748b'} />}
              {mode === 'system' && (
                <Smartphone size={20} color={theme === mode ? '#0284c7' : '#64748b'} />
              )}
              <Text
                className={`text-xs font-semibold mt-2 capitalize ${
                  theme === mode ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-500'
                }`}
              >
                {mode}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="text-xs text-secondary-400 mt-2 text-center">
          Active theme: <Text className="font-semibold capitalize">{activeTheme}</Text>
        </Text>
      </Card>

      <Card className="mb-6">
        <Text className="text-sm font-bold text-secondary-900 dark:text-white mb-4">
          Notifications & Alerts
        </Text>

        <View className="flex-row items-center justify-between py-2">
          <View className="flex-row items-center">
            <Bell size={20} color="#64748b" />
            <View className="ml-3">
              <Text className="text-sm font-medium text-secondary-900 dark:text-white">
                Push Notifications
              </Text>
              <Text className="text-xs text-secondary-500">Receive app updates and alerts</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: '#cbd5e1', true: '#0284c7' }}
          />
        </View>
      </Card>

      <Card>
        <Text className="text-sm font-bold text-secondary-900 dark:text-white mb-3">
          App Build Information
        </Text>

        <View className="flex-row items-center justify-between py-2 border-b border-secondary-100 dark:border-secondary-700">
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">Framework</Text>
          <Text className="text-sm font-semibold text-secondary-900 dark:text-white">
            Expo SDK 54
          </Text>
        </View>

        <View className="flex-row items-center justify-between py-2 border-b border-secondary-100 dark:border-secondary-700">
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">Navigation</Text>
          <Text className="text-sm font-semibold text-secondary-900 dark:text-white">
            Expo Router v4
          </Text>
        </View>

        <View className="flex-row items-center justify-between py-2">
          <Text className="text-sm text-secondary-600 dark:text-secondary-400">Styling Engine</Text>
          <Text className="text-sm font-semibold text-secondary-900 dark:text-white">
            NativeWind v4
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}
