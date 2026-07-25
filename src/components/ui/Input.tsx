import React from 'react';
import { View, Text, TextInput, type TextInputProps } from 'react-native';
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
      <View className="mb-4 w-full">
        {label && (
          <Text className="mb-1.5 text-sm font-medium text-secondary-700 dark:text-secondary-300">
            {label}
          </Text>
        )}

        <View className="relative flex-row items-center">
          {leftIcon && <View className="absolute left-3 z-10">{leftIcon}</View>}

          <TextInput
            ref={ref}
            placeholderTextColor="#94a3b8"
            className={cn(
              'w-full rounded-xl border border-secondary-200 bg-white px-4 py-3 text-base font-normal text-secondary-900 dark:border-secondary-700 dark:bg-secondary-800 dark:text-white',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-danger dark:border-danger',
              className,
            )}
            {...props}
          />

          {rightIcon && <View className="absolute right-3 z-10">{rightIcon}</View>}
        </View>

        {error && <Text className="mt-1 text-xs font-medium text-danger">{error}</Text>}
      </View>
    );
  },
);

Input.displayName = 'Input';
