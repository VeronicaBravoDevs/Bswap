import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, clearError } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !isAuthenticated) {
      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        if (parsedToken.exp > Date.now()) {
          useAuthStore.setState({ user: parsedToken.user, isAuthenticated: true });
        } else {
          localStorage.removeItem("authToken");
        }
      } catch {
        localStorage.removeItem("authToken");
      }
    }
  }, [isAuthenticated]);

  return { user, isAuthenticated, login, logout, clearError };
};