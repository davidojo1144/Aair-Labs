import React from 'react';
import { View, Text } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page Not Found' }} />
      <View className="flex-1 items-center justify-center bg-background-light p-6 dark:bg-background-dark">
        <Text className="mb-2 text-2xl font-bold text-secondary-900 dark:text-white">
          This screen doesn't exist.
        </Text>
        <Link href="/" className="mt-4 text-base font-semibold text-primary-600">
          Go to Home Screen
        </Link>
      </View>
    </>
  );
}
