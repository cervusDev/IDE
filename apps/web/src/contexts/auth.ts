import { decodeJwt, IUserDecode } from "@/helpers/decodeJwt";
import { authService } from "@/services/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LoginCredentials {
  email: string;
  password: string;
}


interface AuthState {
  token: string | null;
  user: IUserDecode | null;
  isError: boolean;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: IUserDecode | null) => void;
  isAuthenticated: () => boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  reset: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      token: null,
      user: null,
      isError: false,
      isLoading: false,

      setToken: (token) => {
        const user = token ? decodeJwt(token) : null;
        set({ token, user });
      },

      setUser: (user) => set({ user }),

      isAuthenticated: () => !!get().token,

      login: async ({ email, password }) => {
        set({ isError: false, isLoading: true });
        try {
          const response = await authService.login({ email, password });
          const token = response.token;
          const user = decodeJwt(token); // Decodifica o token gerado no login

          set({ token, user, isError: false, isLoading: false });
        } catch {
          set({
            isError: true,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ token: null, user: null, isError: false, isLoading: false });
      },

      reset: () => {
        set({ token: null, user: null, isError: false, isLoading: false });
      },
    }),
    {
      name: "@auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useAuthStore };