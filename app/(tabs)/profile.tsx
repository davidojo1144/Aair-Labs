import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { User as UserIcon, Mail, ShieldCheck, LogOut, Lock } from 'lucide-react-native';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { useAuth } from '@/src/hooks/useAuth';
import { showToast } from '@/src/components/ui/Toast';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    showToast.success('Logged Out', 'You have been signed out successfully.');
  };

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark p-4">
      {isAuthenticated && user ? (
        <>
          <Card className="items-center p-6 mb-6">
            <View className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/50 items-center justify-center mb-3">
              <UserIcon size={40} color="#0284c7" />
            </View>
            <Text className="text-xl font-bold text-secondary-900 dark:text-white">
              {user.name}
            </Text>
            <Text className="text-sm text-secondary-500 mt-0.5">{user.email}</Text>
            <View className="mt-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950">
              <Text className="text-xs font-semibold text-primary-600 dark:text-primary-400 capitalize">
                Role: {user.role}
              </Text>
            </View>
          </Card>

          <Card className="mb-6">
            <Text className="text-sm font-bold text-secondary-900 dark:text-white mb-3">
              Account Details
            </Text>

            <View className="flex-row items-center py-2.5 border-b border-secondary-100 dark:border-secondary-700">
              <Mail size={18} color="#64748b" />
              <Text className="text-sm text-secondary-600 dark:text-secondary-400 ml-3">Email</Text>
              <Text className="text-sm font-medium text-secondary-900 dark:text-white ml-auto">
                {user.email}
              </Text>
            </View>

            <View className="flex-row items-center py-2.5">
              <ShieldCheck size={18} color="#64748b" />
              <Text className="text-sm text-secondary-600 dark:text-secondary-400 ml-3">
                Security Status
              </Text>
              <Text className="text-sm font-medium text-success ml-auto">Protected</Text>
            </View>
          </Card>

          <Button
            title="Sign Out"
            variant="danger"
            icon={<LogOut size={18} color="#ffffff" />}
            onPress={handleLogout}
          />
        </>
      ) : (
        <Card className="items-center p-8 mt-6">
          <Lock size={48} color="#94a3b8" />
          <Text className="text-xl font-bold text-secondary-900 dark:text-white mt-4">
            Authentication Required
          </Text>
          <Text className="text-sm text-secondary-500 text-center mt-2 mb-6">
            Please sign in or register to view and manage your profile details.
          </Text>

          <Button
            title="Go to Login"
            variant="primary"
            className="w-full"
            onPress={() => router.push('/(auth)/login')}
          />
        </Card>
      )}
    </ScrollView>
  );
}
