import React from 'react';
import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View className="flex-1 items-center justify-center p-6 bg-background-light dark:bg-background-dark">
        <Text className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
          This screen doesn't exist.
        </Text>
        <Link href="/(tabs)" className="mt-4 text-primary-600 font-semibold text-base">
          Go to Home Screen
        </Link>
      </View>
    </>
  );
}
