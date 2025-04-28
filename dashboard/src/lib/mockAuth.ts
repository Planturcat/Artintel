// Mock user data for demo purposes
const mockUsers = [
  {
    user_id: 'testuser-123',
    email: 'testuser@example.com',
    username: 'testuser',
    password: 'password123',
    full_name: 'Test User',
    is_verified: true,
    role: 'user',
    requires_profile_setup: false,
    tier: 'free',
    organization: null
  },
  {
    user_id: 'prouser-456',
    email: 'prouser@example.com',
    username: 'prouser',
    password: 'pro123',
    full_name: 'Pro User',
    is_verified: true,
    role: 'user',
    requires_profile_setup: false,
    tier: 'pro',
    organization: 'Example Corp'
  },
  {
    user_id: 'adminuser-789',
    email: 'adminuser@example.com',
    username: 'adminuser',
    password: 'admin123',
    full_name: 'Admin User',
    is_verified: true,
    role: 'admin',
    requires_profile_setup: false,
    tier: 'enterprise',
    organization: 'Enterprise Solutions Inc.'
  },
  {
    user_id: 'unverified-user',
    email: 'unverified@example.com',
    username: 'unverified',
    password: 'unverified123',
    full_name: 'Unverified User',
    is_verified: false,
    role: 'user',
    requires_profile_setup: false,
    tier: 'free',
    organization: null
  }
];

// Session storage for server-side compatibility
let mockSessionStore: Record<string, string> = {};

// Simulate a delay for API calls
const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Safe localStorage access (handles server-side scenarios)
const safeStorage = {
  getItem: (key: string): string | null => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    // Fallback to in-memory storage for server-side
    return mockSessionStore[key] || null;
  },
  setItem: (key: string, value: string): void => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
    // Fallback to in-memory storage for server-side
    mockSessionStore[key] = value;
  },
  removeItem: (key: string): void => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
    // Fallback to in-memory storage for server-side
    delete mockSessionStore[key];
  }
};

// Mock authentication functions
export const mockAuth = {
  // Login function
  login: async (credentials: { username: string; password: string }) => {
    await simulateDelay();
    
    const user = mockUsers.find(u => 
      u.username === credentials.username && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    // Store user ID in storage
    safeStorage.setItem('mockUserId', user.user_id);
    
    // Return a mock token
    return {
      access_token: `mock_token_${Date.now()}`,
      token_type: 'bearer',
      user_id: user.user_id
    };
  },
  
  // Get current user
  me: async () => {
    await simulateDelay();
    
    const userId = safeStorage.getItem('mockUserId');
    const user = mockUsers.find(u => u.user_id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Return user without sensitive data
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
  
  // Register a new user (for demo, just pretend to register)
  register: async (userData: any) => {
    await simulateDelay();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email address');
    }
    
    // Validate password match
    if (userData.password !== userData.confirm_password) {
      throw new Error('Passwords do not match');
    }
    
    // Validate password length
    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    
    return { message: 'User registered successfully. Please check your email for verification.' };
  },
  
  // Logout function
  logout: async () => {
    await simulateDelay();
    safeStorage.removeItem('mockUserId');
    return { success: true };
  },
  
  // Other auth functions (simplified for demo)
  verifyEmail: async (token: string) => {
    await simulateDelay();
    return { 
      message: 'Email verified successfully',
      user_id: 'user-123',
      email: 'user@example.com',
      requires_profile_setup: true
    };
  },
  
  forgotPassword: async (email: string) => {
    await simulateDelay();
    return { message: 'Password reset link sent to your email' };
  },
  
  resetPassword: async (data: { token: string; password: string; confirm_password: string }) => {
    await simulateDelay();
    return { message: 'Password updated successfully' };
  },
  
  completeProfile: async (token: string, profileData: any) => {
    await simulateDelay();
    
    const userId = safeStorage.getItem('mockUserId');
    const userIndex = mockUsers.findIndex(u => u.user_id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user profile (in a real app, this would modify the database)
    const updatedUser = {
      ...mockUsers[userIndex],
      full_name: profileData.full_name || mockUsers[userIndex].full_name,
      organization: profileData.organization || mockUsers[userIndex].organization,
      requires_profile_setup: false
    };
    
    // Return updated user without sensitive data
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  },
  
  resendVerification: async (email: string) => {
    await simulateDelay();
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found with the provided email');
    }
    
    if (user.is_verified) {
      throw new Error('Email is already verified');
    }
    
    // In a real app, this would send an actual email
    console.log(`Resending verification email to ${email}`);
    
    return { 
      message: 'Verification email resent successfully',
      email: email
    };
  },
  
  getGoogleAuthUrl: async () => {
    await simulateDelay();
    return { authorization_url: '#' };
  },
  
  handleGoogleCallback: async (code: string) => {
    await simulateDelay();
    return { access_token: 'google_mock_token' };
  }
}; 