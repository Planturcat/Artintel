// Mock user data for demo purposes
let mockUsers = [
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

    // Try to find user by username or email
    const user = mockUsers.find(u =>
      (u.username === credentials.username || u.email === credentials.username) &&
      u.password === credentials.password
    );

    if (!user) {
      // Check if the username is an email and if it exists in our database
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.username);
      const emailExists = isEmail && mockUsers.some(u => u.email.toLowerCase() === credentials.username.toLowerCase());

      if (isEmail && !emailExists) {
        // If it's an email but doesn't exist, throw a specific error
        throw new Error('user_not_found');
      } else {
        // Check if the username/email exists but password is wrong
        const userExists = mockUsers.some(u =>
          u.username.toLowerCase() === credentials.username.toLowerCase() ||
          u.email.toLowerCase() === credentials.username.toLowerCase()
        );

        if (userExists) {
          // If user exists but password is wrong
          throw new Error('wrong_password');
        } else {
          // Otherwise, it's an invalid username or password
          throw new Error('Invalid username or password');
        }
      }
    }

    // Check if user is verified
    if (!user.is_verified) {
      throw new Error('Email not verified. Please check your inbox for verification instructions.');
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

  // Register a new user
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

    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      throw new Error('Email address is already registered');
    }

    // Generate a username from email if not provided
    const username = userData.username || userData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000);

    // Create a new user
    const newUser = {
      user_id: `user-${Date.now()}`,
      email: userData.email,
      username: username,
      password: userData.password,
      full_name: userData.full_name || '',
      is_verified: false, // New users start unverified
      role: 'user',
      requires_profile_setup: false,
      tier: userData.tier || 'free',
      organization: userData.organization || null
    };

    // Add to mock users array
    mockUsers.push(newUser);

    console.log('New user registered:', {
      ...newUser,
      password: '******' // Mask password in logs
    });

    return {
      message: 'User registered successfully. Please check your email for verification.',
      user_id: newUser.user_id,
      email: newUser.email
    };
  },

  // Logout function
  logout: async () => {
    await simulateDelay();
    safeStorage.removeItem('mockUserId');
    return { success: true };
  },

  // Verify email with token
  verifyEmail: async (token: string) => {
    await simulateDelay();

    // In a real app, the token would be validated against a database
    // For mock purposes, we'll extract the user ID from the token
    // Format: verify-{userId}

    let userId;
    try {
      // Try to extract user ID from token
      if (token.startsWith('verify-')) {
        userId = token.substring(7);
      } else {
        // For testing, allow direct user IDs
        userId = token;
      }

      // Find the user
      const userIndex = mockUsers.findIndex(u => u.user_id === userId);

      if (userIndex === -1) {
        throw new Error('Invalid verification token');
      }

      // Update user verification status
      mockUsers[userIndex].is_verified = true;

      console.log(`User ${mockUsers[userIndex].email} verified successfully`);

      return {
        message: 'Email verified successfully',
        user_id: mockUsers[userIndex].user_id,
        email: mockUsers[userIndex].email,
        requires_profile_setup: mockUsers[userIndex].requires_profile_setup
      };
    } catch (error) {
      console.error('Verification error:', error);
      throw new Error('Invalid or expired verification token');
    }
  },

  forgotPassword: async (email: string) => {
    await simulateDelay();

    // Check if user exists
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // For security reasons, don't reveal that the email doesn't exist
      console.log(`Password reset requested for non-existent email: ${email}`);
      return { message: 'If your email exists in our system, you will receive a password reset link' };
    }

    // In a real app, this would generate a token and send an email
    // For mock purposes, we'll just log it
    const resetToken = `reset-${user.user_id}`;
    console.log(`Password reset token for ${email}: ${resetToken}`);
    console.log(`Reset URL would be: /reset-password/${resetToken}`);

    return {
      message: 'Password reset link sent to your email',
      // Include these fields for testing purposes only
      _debug_token: resetToken,
      _debug_reset_url: `/reset-password/${resetToken}`
    };
  },

  resetPassword: async (data: { token: string; password: string; confirm_password: string }) => {
    await simulateDelay();

    // Validate inputs
    if (!data.password || data.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }

    if (data.password !== data.confirm_password) {
      throw new Error('Passwords do not match');
    }

    // In a real app, the token would be validated against a database
    // For mock purposes, we'll extract the user ID from the token
    // Format: reset-{userId}

    let userId;
    try {
      // Try to extract user ID from token
      if (data.token.startsWith('reset-')) {
        userId = data.token.substring(6);
      } else {
        // For testing, allow direct user IDs
        userId = data.token;
      }

      // Find the user
      const userIndex = mockUsers.findIndex(u => u.user_id === userId);

      if (userIndex === -1) {
        throw new Error('Invalid reset token');
      }

      // Update user password
      mockUsers[userIndex].password = data.password;

      console.log(`Password updated successfully for user ${mockUsers[userIndex].email}`);

      return {
        message: 'Password updated successfully',
        user_id: mockUsers[userIndex].user_id,
        email: mockUsers[userIndex].email
      };
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Invalid or expired reset token');
    }
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