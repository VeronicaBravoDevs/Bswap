import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginCredentials, User } from "../types/auth.types";
import { loginUser } from "../services/authServices";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const user = await loginUser(credentials);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: "Error cuando se inicia sesion", isLoading: false });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
        localStorage.removeItem("authToken");
      },
      
      clearError: () => set({ error: null })
    }),
    { name: "auth-storage" }
  )
);