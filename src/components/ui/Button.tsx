import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  type TouchableOpacityProps,
  type GestureResponderEvent,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  enableHaptics?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  enableHaptics = true,
  icon,
  className,
  onPress,
  disabled,
  ...props
}) => {
  const handlePress = (e: GestureResponderEvent) => {
    if (enableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (onPress) {
      onPress(e);
    }
  };

  const baseStyles =
    'flex-row items-center justify-center rounded-xl font-semibold active:opacity-80';

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-secondary-700 active:bg-secondary-800',
    outline: 'border border-secondary-300 dark:border-secondary-700 bg-transparent',
    ghost: 'bg-transparent',
    danger: 'bg-danger',
  };

  const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  const textColorStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'text-white font-semibold',
    secondary: 'text-white font-semibold',
    outline: 'text-secondary-900 dark:text-white font-medium',
    ghost: 'text-primary-600 dark:text-primary-400 font-medium',
    danger: 'text-white font-semibold',
  };

  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={handlePress}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? '#0284c7' : '#ffffff'}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text className={cn(textColorStyles[variant], icon ? 'ml-2' : '')}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
