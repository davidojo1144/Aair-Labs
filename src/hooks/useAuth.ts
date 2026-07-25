import { useAuthStore } from '@/src/store/useAuthStore';
import { authService } from '@/src/services/auth.service';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, setAuth, logout, hydrate } = useAuthStore();

  const loginWithCredentials = async (email: string, pass: string) => {
    const data = await authService.login(email, pass);
    await setAuth(data.user, data.token);
    return data;
  };

  const loginWithBiometrics = async () => {
    const success = await authService.authenticateBiometrics();
    if (success && user && token) {
      return true;
    }
    return success;
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
