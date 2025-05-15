/**
 * ArtIntel LLMs Dashboard API Configuration
 *
 * This file provides configuration for the dashboard API client.
 * It handles API base URL, mock API mode, and authentication.
 */

// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

// Mock API flag - from environment variables only
// Default to true in development, false in production
export const USE_MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' ||
  (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false');

// Check if mock API is enabled
export const isMockApiEnabled = (): boolean => {
  return USE_MOCK_API;
};

// For backward compatibility - this function now only reads from environment variables
// and no longer allows runtime toggling
export const toggleMockApi = (): boolean => {
  console.warn(
    'toggleMockApi is deprecated. Mock API mode is now controlled exclusively via the NEXT_PUBLIC_USE_MOCK_API environment variable.'
  );
  return USE_MOCK_API;
};

// Authentication helpers
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('AUTH_TOKEN', token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('AUTH_TOKEN');
  }
  return null;
};

export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('AUTH_TOKEN');
  }
};

// Create headers for API requests
export const createHeaders = () => {
  // Get the auth token from localStorage if available
  const authToken = typeof window !== 'undefined' ? localStorage.getItem('AUTH_TOKEN') : null;

  return {
    'Content-Type': 'application/json',
    ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {})
  };
};