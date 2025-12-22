import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getAuthToken, removeAuthToken, setAuthToken } from '@/lib/cookies';
import type { User } from '@/types/auth';

interface AuthStore {
  user: User | null;
  loading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, _get) => ({
      user: null,
      loading: true,

      setUser: user => set({ user }),

      setLoading: loading => set({ loading }),

      login: async (email: string, _password: string) => {
        try {
          // TODO: Implement actual login API call
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 100));

          // Mock authentication
          const mockUser = {
            id: '1',
            name: 'John Doe',
            email,
          };

          // Store token (in real app, this would come from API response)
          setAuthToken(`mock_token_${Date.now()}`);
          set({ user: mockUser });

          // Navigation should be handled by the component
        } catch (_error) {
          throw new Error('Login failed');
        }
      },

      signup: async (name: string, email: string, _password: string) => {
        try {
          // TODO: Implement actual signup API call
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 100));

          // Mock signup
          const mockUser = {
            id: '1',
            name,
            email,
          };

          // Store token (in real app, this would come from API response)
          setAuthToken(`mock_token_${Date.now()}`);
          set({ user: mockUser });

          // Navigation should be handled by the component
        } catch (_error) {
          throw new Error('Signup failed');
        }
      },

      logout: async () => {
        try {
          // TODO: Implement actual logout API call
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 100));

          removeAuthToken();
          set({ user: null });

          // Navigation should be handled by the component
        } catch (_error) {
          // Logout failed - but still clear user state
          removeAuthToken();
          set({ user: null });
        }
      },

      checkAuth: () => {
        try {
          // TODO: Implement actual auth check
          const token = getAuthToken();
          if (token) {
            // TODO: Verify token and get user data from API
            // For now, using mock data
            set({
              user: {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
              },
            });
          }
        } catch (_error) {
          // Auth check failed - user remains null
          set({ user: null });
        } finally {
          set({ loading: false });
        }
      },

      reset: () => {
        removeAuthToken();
        set({ user: null, loading: false });
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user data, not loading state
      partialize: state => ({ user: state.user }),
    }
  )
);

// Selectors for better performance
export const useUser = () => useAuthStore(state => state.user);
export const useAuthLoading = () => useAuthStore(state => state.loading);

// Individual action selectors to avoid infinite loops
export const useLogin = () => useAuthStore(state => state.login);
export const useSignup = () => useAuthStore(state => state.signup);
export const useLogout = () => useAuthStore(state => state.logout);
export const useCheckAuth = () => useAuthStore(state => state.checkAuth);
export const useResetAuth = () => useAuthStore(state => state.reset);

// Legacy actions selector (deprecated - use individual selectors above)
export const useAuthActions = () => ({
  login: useLogin(),
  signup: useSignup(),
  logout: useLogout(),
  checkAuth: useCheckAuth(),
  reset: useResetAuth(),
});
