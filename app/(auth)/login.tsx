import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, Fingerprint } from 'lucide-react-native';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { useAuth } from '@/src/hooks/useAuth';
import { showToast } from '@/src/components/ui/Toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { loginWithCredentials, loginWithBiometrics } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'user@aairlabs.com',
      password: 'password123',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      await loginWithCredentials(data.email, data.password);
      showToast.success('Login Successful', 'Welcome back to Aair Labs!');
      router.replace('/(tabs)');
    } catch (err: any) {
      showToast.error('Login Failed', err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    const success = await loginWithBiometrics();
    if (success) {
      showToast.success('Biometric Verified', 'Welcome back!');
      router.replace('/(tabs)');
    } else {
      showToast.error('Biometric Failed', 'Could not verify biometrics.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      className="p-6 bg-background-light dark:bg-background-dark"
    >
      <View className="items-center mb-8">
        <Text className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
          Aair Labs
        </Text>
        <Text className="text-sm text-secondary-500 mt-2">Sign in to access your account</Text>
      </View>

      <Card className="w-full">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email Address"
              placeholder="name@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
              leftIcon={<Mail size={20} color="#64748b" />}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              placeholder="••••••••"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
              leftIcon={<Lock size={20} color="#64748b" />}
            />
          )}
        />

        <Button
          title="Sign In"
          onPress={handleSubmit(onSubmit)}
          isLoading={loading}
          className="mt-2"
        />

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-secondary-200 dark:bg-secondary-700" />
          <Text className="mx-3 text-xs text-secondary-400 font-medium">OR</Text>
          <View className="flex-1 h-px bg-secondary-200 dark:bg-secondary-700" />
        </View>

        <Button
          title="Sign In with Biometrics"
          variant="outline"
          onPress={handleBiometricLogin}
          icon={<Fingerprint size={20} color="#0284c7" />}
        />
      </Card>

      <View className="flex-row justify-center mt-6">
        <Text className="text-sm text-secondary-500">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-sm font-bold text-primary-600">Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
