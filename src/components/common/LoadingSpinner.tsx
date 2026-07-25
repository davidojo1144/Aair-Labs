import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-background-light dark:bg-background-dark">
      <ActivityIndicator size="large" color="#0284c7" />
      {message ? (
        <Text className="mt-4 text-sm font-medium text-secondary-600 dark:text-secondary-400">
          {message}
        </Text>
      ) : null}
    </View>
  );
};
