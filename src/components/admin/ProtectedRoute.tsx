import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useLocalStorageState';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { checkAuth } = useAdminAuth();
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
