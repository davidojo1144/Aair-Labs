import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import { cn } from '@/src/lib/utils';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <View className="w-full mb-4">
        {label && (
          <Text className="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1.5">
            {label}
          </Text>
        )}

        <View className="relative flex-row items-center">
          {leftIcon && <View className="absolute left-3 z-10">{leftIcon}</View>}

          <TextInput
            ref={ref}
            placeholderTextColor="#94a3b8"
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white font-normal text-base',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-danger dark:border-danger',
              className,
            )}
            {...props}
          />

          {rightIcon && <View className="absolute right-3 z-10">{rightIcon}</View>}
        </View>

        {error && <Text className="text-xs text-danger mt-1 font-medium">{error}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';
