import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
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
  const handlePress = (e: any) => {
    if (enableHaptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (onPress) {
      onPress(e);
    }
  };

  const baseStyles =
    'flex-row items-center justify-center rounded-xl font-semibold active:opacity-80';

  const variantStyles = {
    primary: 'bg-primary-600 active:bg-primary-700 text-white',
    secondary: 'bg-secondary-700 active:bg-secondary-800 text-white',
    outline:
      'border border-secondary-300 dark:border-secondary-700 bg-transparent text-secondary-900 dark:text-white',
    ghost: 'bg-transparent text-primary-600 dark:text-primary-400',
    danger: 'bg-danger text-white',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const textColorStyles = {
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
          {icon && <React.Fragment>{icon}</React.Fragment>}
          <Text className={cn(textColorStyles[variant], icon ? 'ml-2' : '')}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
