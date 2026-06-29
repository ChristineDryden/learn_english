import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface LocationState {
  from?: {
    pathname?: string;
  };
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <section className="content-panel">正在加载用户信息...</section>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location } satisfies LocationState} />;
  }

  return <>{children}</>;
}
