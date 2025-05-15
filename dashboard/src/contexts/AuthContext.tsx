"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken, clearAuthToken } from '@/dashboard-api/config';
import { apiRequest } from '@/dashboard-api/dashboard-api';
import { isMockApiEnabled } from '@/dashboard-api/config';
import { setUserContext, clearUserContext, UserContext } from '@/dashboard-api/mock-user-context';

// Types
type UserStats = {
  models_used: number;
  tokens_used: number;
  datasets_created: number;
  fine_tuning_jobs: number;
  deployments: number;
};

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
  stats: UserStats;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  error: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  clearError: () => void;
};

// Create context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isAuthenticated: false,
  isLoading: true,
  clearError: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('AUTH_TOKEN');

        if (token) {
          try {
            // Use AuthService to get current user
            const AuthService = (await import('@/lib/authService')).default;

            // Check if user is authenticated
            if (AuthService.isAuthenticated()) {
              try {
                // Get user data
                const userData = await AuthService.getCurrentUser();
                setUser(userData);

                // If using mock API, set the user context for mock data generation
                if (isMockApiEnabled() && userData) {
                  setUserContext({
                    userId: userData.user_id,
                    email: userData.email,
                    fullName: userData.full_name,
                    role: userData.role,
                    tier: userData.tier,
                    organization: userData.organization
                  });
                }
              } catch (error) {
                console.error('Failed to get user data:', error);
                clearAuthToken();
                setUser(null);
              }
            } else {
              // Token exists but is invalid
              clearAuthToken();
              setUser(null);
            }
          } catch (error) {
            console.error('Failed to import AuthService:', error);
            clearAuthToken();
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        clearAuthToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: { username: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Use AuthService for login
      const AuthService = (await import('@/lib/authService')).default;
      const response = await AuthService.login(credentials.username, credentials.password);

      // Save token to local storage
      setAuthToken(response.access_token);

      // Get user data
      const userData = await AuthService.getCurrentUser();
      setUser(userData);

      // If using mock API, set the user context for mock data generation
      if (isMockApiEnabled()) {
        setUserContext({
          userId: userData.user_id,
          email: userData.email,
          fullName: userData.full_name,
          role: userData.role,
          tier: userData.tier,
          organization: userData.organization
        });
      }

      // Check if user is verified
      if (!userData.is_verified) {
        throw new Error('Email not verified. Please check your inbox for verification instructions.');
      }

      // Redirect based on user state
      if (userData.requires_profile_setup) {
        router.push('/complete-profile');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Login error:', err);

      // Preserve the original error message for special cases
      if (err.message === 'user_not_found') {
        setError('user_not_found');
        throw new Error('user_not_found');
      } else if (err.message === 'wrong_password') {
        setError('wrong_password');
        throw new Error('wrong_password');
      } else {
        setError(err.message || 'Login failed. Please check your credentials.');
        throw err; // Re-throw the error to be caught by the login page
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (isMockApiEnabled()) {
        // For mock mode, clear the mock user context
        clearUserContext();
        if (typeof window !== 'undefined') {
          localStorage.removeItem('mockUserId');
        }
      } else {
        // For real API, call the logout endpoint
        await apiRequest('/auth/logout', 'POST');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear auth token and user state
      clearAuthToken();
      setUser(null);

      // Redirect to login page with logout message
      router.push('/login?message=logout');
    }
  };

  // Register function
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Registration attempt with data:', {
        ...userData,
        password: '******' // Mask password in logs for security
      });

      // Use AuthService for registration
      const AuthService = (await import('@/lib/authService')).default;

      // Call register method with appropriate parameters
      const response = await AuthService.register(
        userData.email,
        userData.password,
        userData.confirm_password || userData.password,
        userData.full_name,
        userData.organization,
        userData.tier
      );

      console.log('Registration successful:', response);

      // Show success message and redirect
      router.push('/login?message=registered');
    } catch (err: any) {
      console.error('Registration error:', err);

      // Create a more user-friendly error message
      let errorMessage = 'Registration failed. ';

      if (err.message) {
        if (err.message.includes('Username already registered') ||
            err.message.includes('already registered') ||
            err.message.includes('already exists')) {
          errorMessage += 'This email or username is already registered.';
        } else if (err.message.includes('Password')) {
          errorMessage = err.message; // Use password-related errors directly
        } else {
          errorMessage += err.message;
        }
      } else {
        errorMessage += 'Please try again.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        register,
        isAuthenticated: !!user,
        isLoading: loading,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}