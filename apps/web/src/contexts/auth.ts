import { AuthService } from "@/services/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  token: string | null;
  isError: boolean
  isLoading: boolean;
  setToken: (token: string | null) => void;
  isAuthenticated: () => boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  reset: () => void;
}

const authService = new AuthService();

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      token: null,
      isError: false,
      isLoading: false,
      setToken: (token) => set({ token }),
      isAuthenticated: () => !!get().token,

      login: async ({ email, password }) => {
        set({ isError: false, isLoading: true });
        try {
          const response = await authService.login({ email, password });
          set({ token: response.token, isError: false, isLoading: false });
        } catch {
          set({
            isError: true
          })
        } finally {
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ token: null, isError: false, isLoading: false });
      },
      reset: () => {
        set({ token: null, isError:false, isLoading: false });
      },
    }),
    {
      name: "@auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAuthStore };