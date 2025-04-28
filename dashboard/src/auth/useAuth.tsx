"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

interface User {
  user_id: string;
  email: string;
  full_name?: string;
  is_verified: boolean;
  role: string;
  organization?: string;
  requires_profile_setup: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string; rememberMe?: boolean }) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string, fullName: string) => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<any>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<void>;
  completeProfile: (token: string, profileData: any) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Fetch user data
          const userData = await api.auth.me();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        // Clear token if invalid
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: { username: string; password: string; rememberMe?: boolean }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.auth.login(credentials);
      localStorage.setItem('token', data.access_token);
      
      // Fetch user data
      const userData = await api.auth.me();
      setUser(userData);
      toast.success('Logged in successfully');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      toast.error(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, confirmPassword: string, fullName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await api.auth.register({
        email,
        password,
        confirm_password: confirmPassword,
        full_name: fullName
      });
      
      toast.success('Registration successful! Please check your email to verify your account.');
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
      toast.error(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await api.auth.verifyEmail(token);
      toast.success('Email verified successfully!');
      return result;
    } catch (err: any) {
      setError(err.message || 'An error occurred during email verification');
      toast.error(err.message || 'Email verification failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await api.auth.forgotPassword(email);
      toast.success('Password reset link sent to your email');
    } catch (err: any) {
      setError(err.message || 'An error occurred during password reset request');
      toast.error(err.message || 'Failed to send password reset link');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string, confirmPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await api.auth.resetPassword({
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
      setIsLoading(false);
    }
  };

  const completeProfile = async (token: string, profileData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await api.auth.completeProfile(token, profileData);
      setUser(userData);
      toast.success('Profile updated successfully');
    } catch (err: any) {
      setError(err.message || 'An error occurred during profile update');
      toast.error(err.message || 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await api.auth.resendVerification(email);
      toast.success('Verification email sent successfully');
    } catch (err: any) {
      setError(err.message || 'An error occurred while resending verification email');
      toast.error(err.message || 'Failed to resend verification email');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    completeProfile,
    resendVerificationEmail
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 