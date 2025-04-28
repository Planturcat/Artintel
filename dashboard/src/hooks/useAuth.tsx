"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

// Types
type User = {
  user_id: string;
  email: string;
  username: string;
  full_name: string;
  is_verified: boolean;
  role: string;
  requires_profile_setup: boolean;
  tier: 'free' | 'pro' | 'enterprise';
  organization: string | null;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  error: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  isAuthenticated: boolean;
  clearError: () => void;
  verifyEmail: (token: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<void>;
  completeProfile: (token: string, profileData: any) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const userData = await authAPI.me();
          setUser(userData);
        } catch (err) {
          console.error('Authentication check failed:', err);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authAPI.login(credentials);
      
      // Save token to local storage
      localStorage.setItem('token', response.access_token);
      
      // Get user data
      const userData = await authAPI.me();
      setUser(userData);
      
      // Redirect based on user state
      if (userData.requires_profile_setup) {
        router.push('/complete-profile');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authAPI.logout();
    setUser(null);
    router.push('/login');
  };

  // Register function
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      await authAPI.register(userData);
      router.push('/registration-success');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    clearError,
    verifyEmail: async (token: string) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await authAPI.verifyEmail(token);
        toast.success('Email verified successfully!');
        return result;
      } catch (err: any) {
        setError(err.message || 'An error occurred during email verification');
        toast.error(err.message || 'Email verification failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    forgotPassword: async (email: string) => {
      setLoading(true);
      setError(null);
      
      try {
        await authAPI.forgotPassword(email);
        toast.success('Password reset link sent to your email');
      } catch (err: any) {
        setError(err.message || 'An error occurred during password reset request');
        toast.error(err.message || 'Failed to send password reset link');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    resetPassword: async (token: string, password: string, confirmPassword: string) => {
      setLoading(true);
      setError(null);
      
      try {
        await authAPI.resetPassword({
          token,
          password,
          confirm_password: confirmPassword
        });
        toast.success('Password updated successfully');
      } catch (err: any) {
        setError(err.message || 'An error occurred during password reset');
        toast.error(err.message || 'Password reset failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    completeProfile: async (token: string, profileData: any) => {
      setLoading(true);
      setError(null);
      
      try {
        const userData = await authAPI.completeProfile(token, profileData);
        setUser(userData);
        toast.success('Profile updated successfully');
      } catch (err: any) {
        setError(err.message || 'An error occurred during profile update');
        toast.error(err.message || 'Profile update failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    resendVerificationEmail: async (email: string) => {
      setLoading(true);
      setError(null);
      
      try {
        await authAPI.resendVerification(email);
        toast.success('Verification email sent successfully');
      } catch (err: any) {
        setError(err.message || 'An error occurred while resending verification email');
        toast.error(err.message || 'Failed to resend verification email');
        throw err;
      } finally {
        setLoading(false);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth; 