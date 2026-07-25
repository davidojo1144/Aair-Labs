import React from 'react';
import { View, type ViewProps } from 'react-native';
import { cn } from '@/src/lib/utils';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <View
      className={cn(
        'rounded-2xl border border-secondary-100 bg-white p-5 shadow-sm dark:border-secondary-700 dark:bg-secondary-800',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
};
