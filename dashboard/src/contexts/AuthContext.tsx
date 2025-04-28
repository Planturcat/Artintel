"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken, clearAuthToken } from '@/dashboard-api/config';
import { apiRequest } from '@/dashboard-api/dashboard-api';
import { isMockApiEnabled } from '@/dashboard-api/config';

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
          if (isMockApiEnabled()) {
            // Mock user for development
            const mockUser = {
              user_id: 'user_1',
              email: 'user@example.com',
              username: 'testuser',
              full_name: 'Test User',
              is_verified: true,
              role: 'user',
              requires_profile_setup: false,
              tier: 'pro' as const,
              organization: 'Test Org',
              stats: {
                models_used: 5,
                tokens_used: 10000,
                datasets_created: 3,
                fine_tuning_jobs: 2,
                deployments: 1,
              }
            };
            setUser(mockUser);
          } else {
            try {
              const userData = await apiRequest<User>('/auth/me', 'GET', undefined, {
                'Authorization': `Bearer ${token}`
              });
              setUser(userData);
            } catch (err) {
              console.error('Failed to fetch user data:', err);
              clearAuthToken();
              setUser(null);
            }
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
      if (isMockApiEnabled()) {
        // Mock successful login for development
        const mockToken = 'mock-jwt-token';
        setAuthToken(mockToken);
        
        // Set mock user
        const mockUser = {
          user_id: 'user_1',
          email: 'user@example.com',
          username: credentials.username,
          full_name: 'Test User',
          is_verified: true,
          role: 'user',
          requires_profile_setup: false,
          tier: 'pro' as const,
          organization: 'Test Org',
          stats: {
            models_used: 5,
            tokens_used: 10000,
            datasets_created: 3,
            fine_tuning_jobs: 2,
            deployments: 1,
          }
        };
        setUser(mockUser);
        router.push('/dashboard');
      } else {
        // Convert credentials to form data format expected by OAuth2
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Login failed');
        }
        
        const tokenData = await response.json();
        
        // Save token to local storage
        setAuthToken(tokenData.access_token);
        
        // Get user data
        const userData = await apiRequest<User>('/auth/me', 'GET', undefined, {
          'Authorization': `Bearer ${tokenData.access_token}`
        });
        
        setUser(userData);
        
        // Redirect based on user state
        if (userData?.requires_profile_setup) {
          router.push('/complete-profile');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      if (!isMockApiEnabled()) {
        await apiRequest('/auth/logout', 'POST');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthToken();
      setUser(null);
      router.push('/login');
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
      
      if (isMockApiEnabled()) {
        // Mock successful registration
        console.log('Using mock registration flow');
        
        // Generate a mock verification link
        const mockToken = Math.random().toString(36).substring(2, 15);
        console.log('\n=== MOCK VERIFICATION LINK ===');
        console.log(`Verification URL: http://localhost:3000/verify-email?token=${mockToken}`);
        console.log('This is a mock link and will not actually work\n');
        
        router.push('/registration-success');
      } else {
        // Real API registration
        console.log('Sending registration request to API');
        const response = await apiRequest('/auth/register', 'POST', userData);
        console.log('Registration successful:', response);
        
        // Log that verification email would be sent (the backend will actually print the link)
        console.log(`Verification email would be sent to: ${userData.email}`);
        
        router.push('/registration-success');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Create a more user-friendly error message
      let errorMessage = 'Registration failed. ';
      
      if (err.message) {
        if (err.message.includes('Username already registered')) {
          errorMessage += 'This username is already taken.';
        } else if (err.message.includes('Email already registered')) {
          errorMessage += 'This email is already registered.';
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