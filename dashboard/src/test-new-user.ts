/**
 * Test New User Scenario
 * 
 * This script creates a new user context and tests the dashboard pages
 * to ensure that appropriate values start at zero for new users.
 */

import { setUserContext, clearUserContext, UserContext } from './dashboard-api/mock-user-context';

/**
 * Create a new user context for testing
 */
export const createNewUserContext = (): UserContext => {
  // Generate a random user ID
  const userId = `new-user-${Date.now()}`;
  
  // Create a new user context
  const newUserContext: UserContext = {
    userId,
    email: `${userId}@example.com`,
    fullName: 'New Test User',
    role: 'user',
    tier: 'free',
    organization: null
  };
  
  // Set the user context
  setUserContext(newUserContext);
  
  console.log('Created new user context:', newUserContext);
  
  return newUserContext;
};

/**
 * Create a new pro user context for testing
 */
export const createNewProUserContext = (): UserContext => {
  // Generate a random user ID
  const userId = `new-pro-user-${Date.now()}`;
  
  // Create a new user context
  const newUserContext: UserContext = {
    userId,
    email: `${userId}@example.com`,
    fullName: 'New Pro User',
    role: 'user',
    tier: 'pro',
    organization: 'Test Organization'
  };
  
  // Set the user context
  setUserContext(newUserContext);
  
  console.log('Created new pro user context:', newUserContext);
  
  return newUserContext;
};

/**
 * Create a new enterprise user context for testing
 */
export const createNewEnterpriseUserContext = (): UserContext => {
  // Generate a random user ID
  const userId = `new-enterprise-user-${Date.now()}`;
  
  // Create a new user context
  const newUserContext: UserContext = {
    userId,
    email: `${userId}@example.com`,
    fullName: 'New Enterprise User',
    role: 'admin',
    tier: 'enterprise',
    organization: 'Enterprise Organization'
  };
  
  // Set the user context
  setUserContext(newUserContext);
  
  console.log('Created new enterprise user context:', newUserContext);
  
  return newUserContext;
};

/**
 * Clear the user context
 */
export const clearTestUserContext = (): void => {
  clearUserContext();
  console.log('Cleared user context');
};

export default {
  createNewUserContext,
  createNewProUserContext,
  createNewEnterpriseUserContext,
  clearTestUserContext
};
