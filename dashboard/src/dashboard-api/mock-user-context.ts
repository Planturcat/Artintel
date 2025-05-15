/**
 * Mock User Context
 * 
 * This utility provides functions for managing user context in the mock API system.
 * It ensures that all mock data is tied to the authenticated user's ID.
 */

// Store the current user context
let currentUserContext: UserContext | null = null;

// Define the user context interface
export interface UserContext {
  userId: string;
  email: string;
  fullName: string;
  role: string;
  tier: string;
  organization?: string | null;
}

/**
 * Set the current user context for mock API calls
 * @param context User context object
 */
export const setUserContext = (context: UserContext): void => {
  currentUserContext = context;
  
  // Store in localStorage for persistence across page refreshes
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUserContext', JSON.stringify(context));
  }
  
  console.log('Mock API: User context set', context);
};

/**
 * Get the current user context
 * @returns Current user context or null if not set
 */
export const getUserContext = (): UserContext | null => {
  // If context is not set in memory, try to load from localStorage
  if (!currentUserContext && typeof window !== 'undefined') {
    const storedContext = localStorage.getItem('mockUserContext');
    if (storedContext) {
      try {
        currentUserContext = JSON.parse(storedContext);
      } catch (e) {
        console.error('Failed to parse stored user context', e);
      }
    }
  }
  
  return currentUserContext;
};

/**
 * Clear the current user context
 */
export const clearUserContext = (): void => {
  currentUserContext = null;
  
  // Remove from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockUserContext');
  }
  
  console.log('Mock API: User context cleared');
};

/**
 * Generate a deterministic hash from a string
 * Used to create consistent random values based on user ID
 * @param str Input string
 * @returns A number between 0 and 1
 */
export const deterministicRandom = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  // Normalize to 0-1 range
  return (hash & 0x7FFFFFFF) / 0x7FFFFFFF;
};

/**
 * Generate a random integer within a range, deterministic based on seed
 * @param seed Seed string (usually userId + some context)
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns Random integer
 */
export const seededRandomInt = (seed: string, min: number, max: number): number => {
  const random = deterministicRandom(seed);
  return Math.floor(random * (max - min + 1)) + min;
};

/**
 * Generate a random float within a range, deterministic based on seed
 * @param seed Seed string (usually userId + some context)
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @param precision Number of decimal places
 * @returns Random float
 */
export const seededRandomFloat = (
  seed: string, 
  min: number, 
  max: number, 
  precision: number = 2
): number => {
  const random = deterministicRandom(seed);
  const value = random * (max - min) + min;
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

/**
 * Get user-specific data multiplier based on tier
 * This helps create realistic data differences between user tiers
 * @returns Multiplier value
 */
export const getUserTierMultiplier = (): number => {
  const context = getUserContext();
  if (!context) return 1;
  
  switch (context.tier) {
    case 'free':
      return 1;
    case 'pro':
      return 3;
    case 'enterprise':
      return 10;
    default:
      return 1;
  }
};

export default {
  setUserContext,
  getUserContext,
  clearUserContext,
  deterministicRandom,
  seededRandomInt,
  seededRandomFloat,
  getUserTierMultiplier
};
