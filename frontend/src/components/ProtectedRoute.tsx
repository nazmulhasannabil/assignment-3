'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      // If not logged in, redirect to login
      if (!user) {
        router.push('/login');
        return;
      }

      // If specific role is required and user doesn't have it
      if (requiredRole && user.role !== requiredRole) {
        // Redirect based on user role
        switch (user.role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'employer':
            if (user.isApproved) {
              router.push('/employer/dashboard');
            } else {
              router.push('/employer/pending');
            }
            break;
          case 'jobseeker':
            router.push('/seeker/dashboard');
            break;
          default:
            router.push('/');
        }
        return;
      }

      // Special case for employers who are not approved
      if (user.role === 'employer' && !user.isApproved && !pathname.includes('pending')) {
        router.push('/employer/pending');
      }
    }
  }, [user, isLoading, router, requiredRole, pathname]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is not logged in, don't render children
  if (!user) {
    return null;
  }

  // If role requirement is not met, don't render children
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  // Special case for unapproved employers
  if (user.role === 'employer' && !user.isApproved && !pathname.includes('pending')) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;