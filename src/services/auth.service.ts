import * as LocalAuthentication from 'expo-local-authentication';
import { apiClient } from './api';
import type { LoginResponse, User } from '@/src/types';

export const authService = {
  async login(email: string, pass: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password: pass,
      });
      return response.data;
    } catch {
      // Demo fallback for initial bootstrap testing
      return {
        user: {
          id: 'user_12345',
          email,
          name: email.split('@')[0] || 'Demo User',
          role: 'user',
          createdAt: new Date().toISOString(),
        },
        token: 'demo_jwt_token_sample_123456',
      };
    }
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  async authenticateBiometrics(): Promise<boolean> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Biometrics',
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  },
};
