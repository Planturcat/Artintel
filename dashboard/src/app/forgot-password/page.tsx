"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Shield } from 'lucide-react';
import AuthService from '@/lib/authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await AuthService.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#00031b]">
      {/* Header */}
      <header className="border-b border-cyan-950 bg-[#00031b]/80 backdrop-blur-lg py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Artintel<span className="text-[#00cbdd]"> LLms</span>
          </div>
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
              {success ? (
                <>
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-green-500/20 p-3 rounded-full">
                      <Mail className="h-10 w-10 text-green-500" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-600">
                      Check Your Email
                    </h1>
                    <p className="mt-4 text-gray-300">
                      If an account exists with <span className="text-white font-medium">{email}</span>, we've sent password reset instructions.
                    </p>
                    <p className="mt-2 text-gray-400">
                      Please check your inbox and follow the link to reset your password.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/login"
                      className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Login
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-cyan-500/20 p-3 rounded-full">
                      <Shield className="h-10 w-10 text-[#00cbdd]" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-600">
                      Forgot Password
                    </h1>
                    <p className="mt-4 text-gray-300">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 text-red-100">
                      <p>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Sending..." : "Reset Password"}
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <p className="text-sm text-center text-gray-500">
                      <Link
                        href="/login"
                        className="text-[#00cbdd] hover:underline"
                      >
                        Return to Login
                      </Link>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}