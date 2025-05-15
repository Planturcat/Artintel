/**
 * Authentication Service
 *
 * This service provides methods for authentication-related operations.
 * It uses the API client to communicate with the backend.
 */

import { authAPI } from './api';
import { isMockApiEnabled } from '@/dashboard-api/config';

// Log the mock API status
console.log('AuthService - Mock API enabled:', isMockApiEnabled());

/**
 * AuthService provides methods for authentication operations
 */
const AuthService = {
  /**
   * Login with username/email and password
   * @param username Username or email
   * @param password Password
   * @returns Promise with login result
   */
  login: async (username: string, password: string) => {
    try {
      console.log('AuthService.login called with username:', username);
      console.log('Mock API enabled:', isMockApiEnabled());

      const response = await authAPI.login({ username, password });
      console.log('Login response:', { ...response, access_token: '[REDACTED]' });

      // Store token in both locations for compatibility
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('AUTH_TOKEN', response.access_token);

      return response;
    } catch (error: any) {
      console.error('Login error in AuthService:', error);

      // Create a more detailed error message for debugging
      const errorDetails = {
        message: error.message,
        stack: error.stack,
        name: error.name
      };
      console.log('Login error details in AuthService:', errorDetails);

      // Preserve special error messages
      if (error.message === 'user_not_found') {
        console.log('Throwing user_not_found error');
        throw new Error('user_not_found');
      } else if (error.message === 'wrong_password') {
        console.log('Throwing wrong_password error');
        throw new Error('wrong_password');
      } else {
        console.log('Throwing generic error:', error.message || 'Login failed');
        throw new Error(error.message || 'Login failed');
      }
    }
  },

  /**
   * Register a new user
   * @param email User email
   * @param password User password
   * @param confirmPassword Password confirmation
   * @param fullName User's full name
   * @param organization User's organization (optional)
   * @param tier User's subscription tier (optional)
   * @returns Promise with registration result
   */
  register: async (
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    organization?: string,
    tier?: string
  ) => {
    try {
      console.log('AuthService.register called with:', {
        email,
        fullName,
        organization,
        tier,
        mockEnabled: isMockApiEnabled()
      });

      // Validate inputs
      if (!email || !password || !confirmPassword || !fullName) {
        throw new Error('All required fields must be provided');
      }

      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Call the API to register the user
      const response = await authAPI.register({
        email,
        password,
        confirm_password: confirmPassword,
        full_name: fullName,
        organization,
        tier: tier || 'free'
      });

      console.log('Registration successful:', {
        email,
        full_name: fullName,
        organization,
        tier,
        response
      });

      return response;
    } catch (error: any) {
      console.error('Registration error in AuthService:', error);

      // Create a more detailed error message for debugging
      const errorDetails = {
        message: error.message,
        stack: error.stack,
        name: error.name
      };
      console.log('Registration error details in AuthService:', errorDetails);

      throw new Error(error.message || 'Registration failed');
    }
  },

  /**
   * Logout the current user
   */
  logout: () => {
    try {
      // Call the API logout function
      authAPI.logout();

      // Clear all auth-related tokens
      localStorage.removeItem('token');
      localStorage.removeItem('AUTH_TOKEN');
      localStorage.removeItem('mockUserId');

      // Redirect to login page with logout message
      if (typeof window !== 'undefined') {
        window.location.href = '/login?message=logout';
      }
    } catch (error) {
      console.error('Logout error:', error);

      // Even if the API call fails, still clear tokens and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('AUTH_TOKEN');
      localStorage.removeItem('mockUserId');

      if (typeof window !== 'undefined') {
        window.location.href = '/login?message=logout';
      }
    }
  },

  /**
   * Get the current user's data
   * @returns Promise with user data
   */
  getCurrentUser: async () => {
    try {
      return await authAPI.me();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get user data');
    }
  },

  /**
   * Verify email with token
   * @param token Verification token
   * @returns Promise with verification result
   */
  verifyEmail: async (token: string) => {
    try {
      return await authAPI.verifyEmail(token);
    } catch (error: any) {
      throw new Error(error.message || 'Email verification failed');
    }
  },

  /**
   * Request password reset
   * @param email User email
   * @returns Promise with request result
   */
  forgotPassword: async (email: string) => {
    try {
      return await authAPI.forgotPassword(email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send password reset link');
    }
  },

  /**
   * Reset password with token
   * @param token Reset token
   * @param password New password
   * @param confirmPassword Password confirmation
   * @returns Promise with reset result
   */
  resetPassword: async (token: string, password: string, confirmPassword?: string) => {
    try {
      return await authAPI.resetPassword({
        token,
        password,
        confirm_password: confirmPassword || password
      });
    } catch (error: any) {
      throw new Error(error.message || 'Password reset failed');
    }
  },

  /**
   * Complete user profile
   * @param token Profile token
   * @param profileData Profile data
   * @returns Promise with profile update result
   */
  completeProfile: async (token: string, profileData: any) => {
    try {
      return await authAPI.completeProfile(token, profileData);
    } catch (error: any) {
      throw new Error(error.message || 'Profile update failed');
    }
  },

  /**
   * Resend verification email
   * @param email User email
   * @returns Promise with resend result
   */
  resendVerificationEmail: async (email: string) => {
    try {
      return await authAPI.resendVerification(email);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to resend verification email');
    }
  },

  /**
   * Check if user is authenticated
   * @returns Boolean indicating if user is authenticated
   */
  isAuthenticated: () => {
    // Check for token in both possible locations
    const token = localStorage.getItem('token');
    const authToken = localStorage.getItem('AUTH_TOKEN');

    return !!(token || authToken);
  }
};

export default AuthService;
