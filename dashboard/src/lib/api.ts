// API helper functions for making requests to the backend
import { mockAuth } from './mockAuth';

// Enable mock mode for demo purposes
const ENABLE_MOCK_API = false; // Set to false to use real API

// API base URL from environment variables, with fallback value
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Default options for fetch requests
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Main request function to handle API calls
export async function apiRequest(endpoint: string, options = {}) {
  const token = localStorage.getItem('token');
  
  // Merge default options with provided options
  const requestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options as any).headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, requestOptions);
    
    // Parse response as JSON
    const data = await response.json();
    
    // If response is not ok, throw error with message from API
    if (!response.ok) {
      throw new Error(data.detail || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    // Re-throw error for handling in components
    throw error;
  }
}

// Authentication API endpoints
export const authAPI = {
  // Login with username/email and password
  login: async (credentials: { username: string; password: string }) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.login(credentials);
    }
    
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    
    return data;
  },
  
  // Register a new user
  register: async (userData: any) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.register(userData);
    }
    
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // Get current user profile
  me: async () => {
    if (ENABLE_MOCK_API) {
      return mockAuth.me();
    }
    
    return apiRequest('/api/users/me');
  },
  
  // Verify email with token
  verifyEmail: async (token: string) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.verifyEmail(token);
    }
    
    return apiRequest(`/api/auth/verify-email/${token}`);
  },
  
  // Request password reset
  forgotPassword: async (email: string) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.forgotPassword(email);
    }
    
    return apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  // Reset password with token
  resetPassword: async (data: { token: string; password: string; confirm_password: string }) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.resetPassword(data);
    }
    
    return apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // Complete user profile setup after email verification
  completeProfile: async (token: string, profileData: any) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.completeProfile(token, profileData);
    }
    
    return apiRequest('/api/auth/complete-profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    });
  },
  
  // Resend verification email
  resendVerification: async (email: string) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.resendVerification(email);
    }
    
    return apiRequest('/api/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  // Get Google OAuth2 authorization URL
  getGoogleAuthUrl: async () => {
    if (ENABLE_MOCK_API) {
      return mockAuth.getGoogleAuthUrl();
    }
    
    return apiRequest('/api/auth/google/authorize');
  },
  
  // Handle Google OAuth2 callback with code
  handleGoogleCallback: async (code: string) => {
    if (ENABLE_MOCK_API) {
      return mockAuth.handleGoogleCallback(code);
    }
    
    return apiRequest('/api/auth/google/callback', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },
  
  // Logout (client-side only, no API call needed)
  logout: () => {
    if (ENABLE_MOCK_API) {
      mockAuth.logout();
    }
    
    localStorage.removeItem('token');
  },
};

// User API endpoints
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiRequest('/api/users/me');
  },
  
  // Update user profile
  updateProfile: async (userData: any) => {
    return apiRequest('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  },
  
  // Get user usage statistics
  getUsage: async () => {
    return apiRequest('/api/users/usage');
  },
};

// Models API endpoints
export const modelsAPI = {
  // Get list of available models
  getModels: async () => {
    return apiRequest('/api/models');
  },
  
  // Get specific model details
  getModel: async (modelId: string) => {
    return apiRequest(`/api/models/${modelId}`);
  },
};

// Other API endpoints can be added here 