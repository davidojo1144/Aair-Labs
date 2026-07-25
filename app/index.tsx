import React from 'react';
import { View, Text } from 'react-native';
import { Card } from '@/src/components/ui/Card';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background-light p-6 dark:bg-background-dark">
      <Card className="w-full max-w-sm items-center p-6">
        <Text className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
          Aair Labs
        </Text>
        <Text className="mt-2 text-center text-sm text-secondary-500 dark:text-secondary-400">
          Clean Expo SDK 54 React Native boilerplate ready for development.
        </Text>
      </Card>
    </View>
  );
}
