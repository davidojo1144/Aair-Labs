import * as LocalAuthentication from 'expo-local-authentication';
import { useAuthStore } from '@/src/store/useAuthStore';
import type { User } from '@/src/types';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, setAuth, logout, hydrate } = useAuthStore();

  const loginWithCredentials = async (userData: User, authToken: string) => {
    await setAuth(userData, authToken);
  };

  const loginWithBiometrics = async () => {
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
    } catch {
      return false;
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    loginWithCredentials,
    loginWithBiometrics,
    logout,
    hydrate,
  };
}
