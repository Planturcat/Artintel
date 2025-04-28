/**
 * ArtIntel LLMs Dashboard API Configuration
 */

// API Base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

// Mock API flag - default to true in development, can be overridden by environment variable
export let USE_MOCK_API = process.env.NODE_ENV === 'development' && 
  process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';

// Get the stored flag value on component mount if running in browser
if (typeof window !== 'undefined') {
  const storedValue = localStorage.getItem('USE_MOCK_API');
  if (storedValue !== null) {
    USE_MOCK_API = storedValue === 'true';
  }
}

// Check if mock API is enabled
export const isMockApiEnabled = (): boolean => {
  return USE_MOCK_API;
};

// Toggle mock API usage
export const toggleMockApi = (useMock?: boolean): boolean => {
  if (typeof useMock === 'boolean') {
    USE_MOCK_API = useMock;
  } else {
    USE_MOCK_API = !USE_MOCK_API;
  }
  
  // Store the setting if in browser
  if (typeof window !== 'undefined') {
    localStorage.setItem('USE_MOCK_API', USE_MOCK_API.toString());
  }
  
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