'use client';

import { useEffect } from 'react';
import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (allowedRoles.length > 0 && user?.role) {
      if (!allowedRoles.includes(user.role)) {
        switch (user.role) {
          case 'admin':
            router.push('/admin');
            break;
          case 'doctor':
            router.push('/doctor');
            break;
          case 'patient':
            router.push('/patient');
            break;
          default:
            router.push('/login');
        }
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, isInitialized, allowedRoles, redirectTo, router]);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles.length > 0 && user?.role && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};