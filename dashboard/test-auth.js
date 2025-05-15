/**
 * Authentication Test Script
 * 
 * This script helps test the authentication functionality with mock data.
 * Run this script in the browser console to test various authentication scenarios.
 */

// Test login with valid credentials
async function testLogin(username, password) {
  console.log(`Testing login with username: ${username}, password: ${password}`);
  
  try {
    // Import the AuthService
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    
    // Attempt login
    const result = await AuthService.login(username, password);
    console.log('Login successful:', result);
    
    // Get current user
    const user = await AuthService.getCurrentUser();
    console.log('Current user:', user);
    
    return { success: true, user };
  } catch (error) {
    console.error('Login failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test login with invalid credentials
async function testInvalidLogin() {
  console.log('Testing login with invalid credentials');
  
  try {
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    await AuthService.login('invalid', 'wrongpassword');
    console.log('Login unexpectedly succeeded');
    return { success: true }; // This should not happen
  } catch (error) {
    console.log('Login correctly failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test logout
async function testLogout() {
  console.log('Testing logout');
  
  try {
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    AuthService.logout();
    console.log('Logout successful');
    return { success: true };
  } catch (error) {
    console.error('Logout failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test registration
async function testRegistration(email, password, confirmPassword, fullName) {
  console.log(`Testing registration with email: ${email}`);
  
  try {
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    const result = await AuthService.register(email, password, confirmPassword, fullName);
    console.log('Registration successful:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Registration failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test forgot password
async function testForgotPassword(email) {
  console.log(`Testing forgot password with email: ${email}`);
  
  try {
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    const result = await AuthService.forgotPassword(email);
    console.log('Forgot password request successful:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Forgot password request failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test reset password
async function testResetPassword(token, password, confirmPassword) {
  console.log(`Testing reset password with token: ${token}`);
  
  try {
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    const result = await AuthService.resetPassword(token, password, confirmPassword);
    console.log('Reset password successful:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Reset password failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Test resend verification email
async function testResendVerification(email) {
  console.log(`Testing resend verification with email: ${email}`);
  
  try {
    const AuthService = await import('./src/lib/authService.js').then(module => module.default);
    const result = await AuthService.resendVerificationEmail(email);
    console.log('Resend verification successful:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Resend verification failed:', error.message);
    return { success: false, error: error.message };
  }
}

// Run all tests
async function runAllTests() {
  console.log('=== RUNNING ALL AUTHENTICATION TESTS ===');
  
  // Test valid login
  console.log('\n--- Testing valid login ---');
  await testLogin('testuser', 'password123');
  
  // Test logout
  console.log('\n--- Testing logout ---');
  await testLogout();
  
  // Test invalid login
  console.log('\n--- Testing invalid login ---');
  await testInvalidLogin();
  
  // Test registration
  console.log('\n--- Testing registration ---');
  await testRegistration('newuser@example.com', 'Password123!', 'Password123!', 'New User');
  
  // Test forgot password
  console.log('\n--- Testing forgot password ---');
  await testForgotPassword('testuser@example.com');
  
  // Test reset password
  console.log('\n--- Testing reset password ---');
  await testResetPassword('mock-token', 'NewPassword123!', 'NewPassword123!');
  
  // Test resend verification
  console.log('\n--- Testing resend verification ---');
  await testResendVerification('unverified@example.com');
  
  console.log('\n=== ALL TESTS COMPLETED ===');
}

// Export test functions
window.authTests = {
  testLogin,
  testInvalidLogin,
  testLogout,
  testRegistration,
  testForgotPassword,
  testResetPassword,
  testResendVerification,
  runAllTests
};

console.log('Auth test functions are available in the window.authTests object');
console.log('Run tests with: window.authTests.runAllTests()');
