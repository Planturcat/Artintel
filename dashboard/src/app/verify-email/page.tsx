"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Check, AlertTriangle, ChevronRight, RefreshCw } from 'lucide-react';
import { apiRequest } from '@/dashboard-api/dashboard-api';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [resending, setResending] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    console.log('Email verification page loaded');
    console.log('Verification token:', token);

    if (!token) {
      console.log('No token provided');
      setVerifying(false);
      setError('No verification token provided. Please check your email link.');
      return;
    }

    const verifyEmail = async () => {
      try {
        console.log('Attempting to verify email with token:', token);
        setVerifying(true);

        try {
          // First attempt with token in request body
          const response = await apiRequest('/auth/verify-email', 'POST', { token });
          console.log('Verification response:', response);

          setSuccess(true);
          toast.success('Email verified successfully!');

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        } catch (bodyError) {
          console.error('Error with token in body, trying with query parameter:', bodyError);

          // Try as a query parameter as fallback
          const response = await apiRequest(`/auth/verify-email?token=${encodeURIComponent(token)}`, 'POST');
          console.log('Verification response with query param:', response);

          setSuccess(true);
          toast.success('Email verified successfully!');

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/login');
          }, 3000);
        }
      } catch (err: any) {
        console.error('Email verification error:', err);
        setSuccess(false);

        // Create a more user-friendly error message
        let errorMessage = 'Failed to verify email. ';

        if (err.status === 422) {
          errorMessage += 'The verification link format is incorrect. Please use the exact link from your email.';
        } else if (err.status === 400) {
          errorMessage += 'The verification link is invalid or has expired.';
        } else if (err.status === 404) {
          errorMessage += 'User account not found.';
        } else if (err.message) {
          errorMessage += err.message;
        } else {
          errorMessage += 'An unknown error occurred.';
        }

        setError(errorMessage);
        toast.error('Failed to verify email');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      console.log('Attempting to resend verification email to:', email);
      setResending(true);

      const response = await apiRequest('/auth/resend-verification', 'POST', { email });
      console.log('Resend response:', response);

      toast.success('Verification email sent! Please check your inbox.');

      // Success message with information about the console
      toast.success('For development: Check the server console for the verification link', {
        duration: 6000,
      });
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast.error('Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className={`max-w-md w-full rounded-xl p-8 shadow-lg ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Email Verification</h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {verifying ? 'Verifying your email...' : success ? 'Your email has been verified!' : 'Verification failed'}
          </p>
        </div>

        {verifying ? (
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="mt-4">Please wait while we verify your email...</p>
          </div>
        ) : success ? (
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Email Verified Successfully!</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Thank you for verifying your email address. You can now log in to your account.
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Redirecting to login page...
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Go to login <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {error}
            </p>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Resend Verification Email</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 rounded-md px-4 py-2 border ${
                    isDark
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <button
                  onClick={handleResend}
                  disabled={resending || !email.includes('@')}
                  className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {resending ? 'Sending...' : 'Resend'}
                </button>
              </div>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Enter your email address to receive a new verification link.
              </p>
            </div>

            <Link
              href="/login"
              className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Back to login <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-xl p-8 shadow-lg bg-gray-900 text-white">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Email Verification</h1>
            <p className="mt-2 text-gray-400">Loading verification page...</p>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
            <p className="mt-4">Please wait...</p>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}