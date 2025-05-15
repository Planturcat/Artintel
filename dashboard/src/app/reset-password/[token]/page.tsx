"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Check, ArrowRight } from 'lucide-react';
import AuthService from '@/lib/authService';

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Password strength levels
  const passwordStrengthLevels = [
    { level: 0, color: "bg-gray-700", label: "Too weak" },
    { level: 1, color: "bg-red-500", label: "Weak" },
    { level: 2, color: "bg-yellow-500", label: "Medium" },
    { level: 3, color: "bg-green-500", label: "Strong" },
    { level: 4, color: "bg-green-600", label: "Very strong" }
  ];

  // Password validation criteria
  const passwordCriteria = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains number", met: /[0-9]/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) }
  ];

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;

    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;

    // Character type checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    return Math.min(4, strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call the resetPassword method with the token and password
      const result = await AuthService.resetPassword(token, password, confirmPassword);

      console.log('Password reset successful:', {
        token,
        result
      });

      setSuccess(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      setError(err.message || 'An error occurred while resetting your password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#00031b]">
      {/* Header */}
      <header className="border-b border-cyan-950 bg-[#00031b]/80 backdrop-blur-lg py-4 px-6">
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
              {success ? (
                <>
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-green-500/20 p-3 rounded-full">
                      <Check className="h-10 w-10 text-green-500" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-600">
                      Password Reset Successful
                    </h1>
                    <p className="mt-4 text-gray-300">
                      Your password has been reset successfully.
                    </p>
                    <p className="mt-2 text-gray-400">
                      You can now log in with your new password.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/login"
                      className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Go to Login
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-600">
                      Reset Your Password
                    </h1>
                    <p className="mt-4 text-gray-300">
                      Please enter a new password for your account.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-900/30 border-l-4 border-red-500 p-4 mb-6 text-red-100">
                      <p>{error}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={handlePasswordChange}
                          className="block w-full pl-10 pr-10 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      {/* Password strength meter */}
                      {password && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400">Password strength:</span>
                            <span className={`font-medium ${
                              passwordStrength <= 1 ? "text-red-400" :
                              passwordStrength === 2 ? "text-yellow-400" :
                              "text-green-400"
                            }`}>
                              {passwordStrengthLevels[passwordStrength].label}
                            </span>
                          </div>

                          <div className="h-1.5 w-full rounded-full bg-gray-700">
                            <div
                              className={`h-1.5 rounded-full ${passwordStrengthLevels[passwordStrength].color}`}
                              style={{ width: `${(passwordStrength / 4) * 100}%` }}
                            />
                          </div>

                          {/* Password criteria checklist */}
                          <ul className="mt-2 space-y-1">
                            {passwordCriteria.map((criteria, index) => (
                              <li key={index} className="flex items-center text-xs">
                                <span className={`mr-2 rounded-full p-0.5 ${
                                  criteria.met ? "bg-green-500 text-green-900" : "bg-gray-700 text-gray-400"
                                }`}>
                                  <Check className="h-3 w-3" />
                                </span>
                                <span className={criteria.met ? "text-gray-300" : "text-gray-500"}>
                                  {criteria.label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-500" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent ${
                            password &&
                            confirmPassword &&
                            password !== confirmPassword
                              ? "border-red-500 focus:ring-red-500"
                              : ""
                          }`}
                          placeholder="••••••••"
                        />
                      </div>
                      {password &&
                        confirmPassword &&
                        password !== confirmPassword && (
                        <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Resetting Password..." : "Reset Password"}
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