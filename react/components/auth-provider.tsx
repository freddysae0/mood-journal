"use client";

import { getCurrentUser, isAuthenticated, logout } from "@/lib/api";
import type { User } from "@/types/mood";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    if (isAuthenticated()) {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
          });
          return;
        }
      } catch (error) {
        console.error("Error refreshing user:", error);
      }

      // If we get here, there was an error or no user
      handleLogout();
    } else {
      setUser(null);
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout: handleLogout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
