"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email') || '';
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResendVerification = async () => {
    if (isResending) return;

    setIsResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      // Call the API to resend verification
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      setResendSuccess(true);
      toast.success('Verification email sent successfully');
    } catch (err: any) {
      setError(err.message || 'An error occurred while resending the verification email');
      toast.error(err.message || 'Failed to resend verification email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#00091b]">
      {/* Header */}
      <header className="border-b border-cyan-950 bg-[#00091b]/80 backdrop-blur-lg py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Artintel<span className="text-[#00cbdd]"> LLms</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden border border-cyan-950 bg-gray-900/50 backdrop-blur-lg shadow-xl"
          >
            <div className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-cyan-500/20 p-3 rounded-full">
                  <Mail className="h-10 w-10 text-[#00cbdd]" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-600">
                  Check Your Email
                </h1>
                <p className="mt-4 text-gray-300">
                  We've sent a verification email to:
                </p>
                <p className="mt-2 text-xl font-medium text-white">
                  {email}
                </p>
                <p className="mt-4 text-gray-400">
                  Click the link in the email to verify your account and complete the sign-up process.
                </p>
              </div>

              {error && (
                <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 text-red-100">
                  <p>{error}</p>
                </div>
              )}

              {resendSuccess && (
                <div className="bg-green-900/30 border-l-4 border-green-500 p-4 mb-6 text-green-100">
                  <p>Verification email has been resent!</p>
                </div>
              )}

              <div className="space-y-4">
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="flex items-center justify-center w-full px-6 py-3 border border-cyan-900 bg-cyan-900/20 text-[#00cbdd] rounded-lg font-medium hover:bg-cyan-900/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="animate-spin mr-2 h-4 w-4" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </>
                  )}
                </button>

                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-6 py-3 border border-gray-800 bg-gray-800/50 text-white rounded-lg font-medium hover:bg-gray-800/70 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                <p>Don't see the email? Check your spam folder or try another email address by registering again.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#00091b]">
        <div className="animate-pulse text-[#00cbdd]">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}