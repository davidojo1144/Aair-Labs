import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '@/src/lib/utils';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <View
      className={cn(
        'p-5 rounded-2xl bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
};
