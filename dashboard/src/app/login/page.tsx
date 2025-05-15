"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, ArrowRight, Apple, Globe, Mail, X, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import AuthService from '@/lib/authService';
import NonExistentUserModal from '@/components/auth/NonExistentUserModal';
import WrongPasswordModal from '@/components/auth/WrongPasswordModal';

// Unverified Email Modal Component
interface UnverifiedEmailModalProps {
  email: string;
  onClose: () => void;
  onResendVerification: (email: string) => Promise<void>;
}

const UnverifiedEmailModal: React.FC<UnverifiedEmailModalProps> = ({
  email,
  onClose,
  onResendVerification
}) => {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    try {
      setIsResending(true);
      await onResendVerification(email);
    } catch (error) {
      console.error('Failed to resend verification:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md bg-gray-900 rounded-xl border border-cyan-950 shadow-2xl p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center justify-center mb-6">
          <div className="p-3 bg-yellow-600/20 rounded-full mb-4">
            <AlertCircle className="h-10 w-10 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Email Verification Required</h3>
        </div>

        <p className="text-gray-300 mb-4">
          Your account exists but you need to verify your email before logging in. We sent a verification link to:
        </p>

        <div className="px-4 py-3 bg-gray-800 rounded-lg mb-6 text-center">
          <p className="text-[#00cbdd] font-medium">{email}</p>
        </div>

        <p className="text-gray-400 mb-6 text-sm">
          Please check your inbox and spam folders for the verification email.
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleResend}
            disabled={isResending}
            className="w-full flex items-center justify-center py-3 rounded-lg bg-gradient-to-r from-[#00cbdd] to-[#0088ff] text-white font-medium hover:from-[#00a0ad] hover:to-[#0066cc] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isResending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Resend Verification Email
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center py-3 rounded-lg border border-gray-700 bg-transparent text-white font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Return to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showUnverifiedModal, setShowUnverifiedModal] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [showNonExistentModal, setShowNonExistentModal] = useState(false);
  const [nonExistentEmail, setNonExistentEmail] = useState('');
  const [showWrongPasswordModal, setShowWrongPasswordModal] = useState(false);
  const [wrongPasswordEmail, setWrongPasswordEmail] = useState('');

  const { login, error: authError, loading, clearError, isAuthenticated, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, user, router, redirectPath]);

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    try {
      await login({ username, password });
      // Login will redirect automatically if successful
    } catch (error: any) {
      console.error('Login error:', error);

      // Get the error message
      const errorMessage = error.message || authError || '';

      // Check if the error is related to unverified email
      if (errorMessage.toLowerCase().includes('not verified') ||
          errorMessage.toLowerCase().includes('verify your email') ||
          errorMessage.toLowerCase().includes('email verification')) {
        // Show the unverified email modal
        setUnverifiedEmail(username);
        setShowUnverifiedModal(true);
      }
      // Check if the error is related to non-existent user
      else if (errorMessage === 'user_not_found') {
        // Show the non-existent user modal
        setNonExistentEmail(username);
        setShowNonExistentModal(true);
      }
      // Check if the error is related to wrong password
      else if (errorMessage === 'wrong_password') {
        // Show the wrong password modal
        setWrongPasswordEmail(username);
        setShowWrongPasswordModal(true);
      }
      // Fallback for other password-related errors
      else if (errorMessage.toLowerCase().includes('invalid username or password') ||
               errorMessage.toLowerCase().includes('incorrect password')) {
        // Show error with forgot password suggestion
        toast.error(
          <div>
            <p>Invalid username or password</p>
            <p className="text-xs mt-1">
              <Link href="/forgot-password" className="text-blue-400 hover:underline">
                Forgot your password?
              </Link>
            </p>
          </div>
        );
      } else {
        // Show generic error message
        toast.error(errorMessage || 'An error occurred during login');
      }
    }
  };



  // Handle resend verification email
  const handleResendVerification = async (email: string) => {
    try {
      await AuthService.resendVerificationEmail(email);
      toast.success('Verification email sent successfully');
    } catch (error: any) {
      console.error('Failed to resend verification:', error);
      toast.error(error.message || 'Failed to resend verification email');
    }
  };

  // Social login handlers
  const handleGoogleSignIn = async () => {
    try {
      // Implement OAuth redirect for Google here
      toast.info('Google sign-in is not implemented yet');
    } catch (error) {
      console.error('Google Sign In error:', error);
      toast.error('Failed to initiate Google sign in');
    }
  };

  const handleAppleSignIn = () => {
    // Implement OAuth redirect for Apple here
    toast.info('Apple sign-in is not implemented yet');
  };

  // Show message based on query params
  useEffect(() => {
    const message = searchParams.get('message');
    if (message === 'logout') {
      toast.success('You have been logged out successfully');
    } else if (message === 'session_expired') {
      toast.error('Your session has expired. Please log in again.');
    } else if (message === 'verification_success') {
      toast.success('Email verified successfully! You can now log in.');
    } else if (message === 'registered') {
      toast.success('Registration successful! Please check your email to verify your account.');
    }
  }, [searchParams]);

  // Show error messages from auth context
  useEffect(() => {
    if (authError && !showUnverifiedModal) {
      toast.error(authError);
    }

    // Clear error on component unmount
    return () => {
      clearError();
    };
  }, [authError, clearError, showUnverifiedModal]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      {/* Content */}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00cbdd] to-[#0088ff] bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue to ArtIntel LLMs</p>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-lg mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username or Email
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  placeholder="Enter your username or email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#00cbdd] hover:text-[#0088ff] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-[#00cbdd] to-[#0088ff] text-white font-medium hover:from-[#00a0ad] hover:to-[#0066cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Globe className="h-5 w-5 mr-2" />
                Google
              </button>

              <button
                onClick={handleAppleSignIn}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Apple className="h-5 w-5 mr-2" />
                Apple
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-[#00cbdd] hover:text-[#0088ff] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to ArtIntel's{' '}
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>



      {/* Unverified email modal */}
      {showUnverifiedModal && (
        <UnverifiedEmailModal
          email={unverifiedEmail}
          onClose={() => setShowUnverifiedModal(false)}
          onResendVerification={handleResendVerification}
        />
      )}

      {/* Non-existent user modal */}
      {showNonExistentModal && (
        <NonExistentUserModal
          email={nonExistentEmail}
          onClose={() => setShowNonExistentModal(false)}
        />
      )}

      {/* Wrong password modal */}
      {showWrongPasswordModal && (
        <WrongPasswordModal
          email={wrongPasswordEmail}
          onClose={() => setShowWrongPasswordModal(false)}
        />
      )}
    </div>
  );
}