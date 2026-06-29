import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser, login as loginRequest, register as registerRequest } from "../api/auth";
import { clearStoredAuth, getStoredToken, getStoredUser, persistAuth as persistStoredAuth } from "../utils/auth";
import type { AuthContextValue, AuthResponse, LoginPayload, RegisterPayload, UserProfile } from "../types";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string>(() => getStoredToken());
  const [user, setUser] = useState<UserProfile | null>(() => getStoredUser());
  const [loading, setLoading] = useState<boolean>(Boolean(token));

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then((res) => {
        setUser(res.data);
        persistStoredAuth(token, res.data);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const persistAuthResponse = (authData: AuthResponse) => {
    setToken(authData.token);
    setUser(authData.user);
    persistStoredAuth(authData.token, authData.user);
  };

  const login = async (payload: LoginPayload) => {
    const res = await loginRequest(payload);
    persistAuthResponse(res.data);
  };

  const register = async (payload: RegisterPayload) => {
    const res = await registerRequest(payload);
    persistAuthResponse(res.data);
  };

  const logout = () => {
    setToken("");
    setUser(null);
    clearStoredAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
