"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Building, Briefcase, Check, X, ArrowRight, Upload, Globe } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ProfileFormData {
  displayName: string;
  avatar: string | null;
  bio: string;
  organization?: string;
  domain?: string;
  role?: string;
  emailNotifications: boolean;
  theme: "light" | "dark";
}

export default function VerifyEmailPage() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const { verifyEmail, completeProfile } = useAuth();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    user_id: string;
    email: string;
    requires_profile_setup: boolean;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnterprise, setIsEnterprise] = useState(false);
  
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: "",
    avatar: null,
    bio: "",
    organization: "",
    domain: "",
    role: "user",
    emailNotifications: true,
    theme: "dark"
  });
  
  // Verify the token on page load
  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        const data = await verifyEmail(token);

        setIsVerified(true);
        setUserData({
          user_id: data.user_id,
          email: data.email,
          requires_profile_setup: data.requires_profile_setup
        });
        
        // Pre-fill form data
        setFormData(prev => ({
          ...prev,
          displayName: data.user?.full_name || "",
        }));
        
        // Check if enterprise user
        if (data.user?.organization || data.user?.role === 'admin' || data.user?.role === 'manager') {
          setIsEnterprise(true);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred during email verification');
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyUserEmail();
  }, [token, verifyEmail]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const profileData = {
        full_name: formData.displayName,
        bio: formData.bio,
        organization: isEnterprise ? formData.organization : undefined,
        preferences: {
          theme: formData.theme,
          email_notifications: formData.emailNotifications
        }
      };
      
      await completeProfile(token, profileData);
      
      // Redirect to dashboard after successful profile completion
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during profile setup');
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#00091b]">
      {/* Header */}
      <header className="border-b border-cyan-950 bg-[#00091b]/80 backdrop-blur-lg py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Artintel<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500"> LLms</span>
          </Link>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl overflow-hidden border border-cyan-950 bg-gray-900/50 backdrop-blur-lg shadow-xl"
          >
            {/* Error message */}
            {error && (
              <div className="bg-red-900/30 border-l-4 border-red-500 p-4 text-red-100">
                <p>{error}</p>
              </div>
            )}
            
            {/* Verification in progress */}
            {isVerifying && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 border-4 border-[#00cbdd] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h2 className="text-xl font-bold text-white mt-6 mb-2">Verifying Your Email</h2>
                <p className="text-gray-400">Please wait while we verify your email address...</p>
              </div>
            )}
            
            {/* Verification failed */}
            {!isVerifying && !isVerified && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center mx-auto">
                  <X className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-white mt-6 mb-2">Verification Failed</h2>
                <p className="text-gray-400 mb-6">{error || "The verification link is invalid or has expired."}</p>
                <Link 
                  href="/register" 
                  className="inline-block px-6 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
                >
                  Back to Registration
                </Link>
              </div>
            )}
            
            {/* Verification successful - Profile setup */}
            {!isVerifying && isVerified && userData && (
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mt-6 mb-2">Email Verified!</h2>
                  <p className="text-gray-400">Complete your profile to get started</p>
                </div>
                
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                      Display Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="displayName"
                        name="displayName"
                        type="text"
                        required
                        value={formData.displayName}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                        placeholder="How you want to be known"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                      Bio (Optional)
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="block w-full p-3 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                      placeholder="Tell us a bit about yourself"
                    />
                  </div>
                  
                  {isEnterprise && (
                    <>
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-1">
                          Organization Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="organization"
                            name="organization"
                            type="text"
                            value={formData.organization}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                            placeholder="Your company or organization"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="domain" className="block text-sm font-medium text-gray-300 mb-1">
                          Organization Domain (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-500" />
                          </div>
                          <input
                            id="domain"
                            name="domain"
                            type="text"
                            value={formData.domain}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                            placeholder="example.com"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          May be used for domain-based SSO or email restrictions
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Role
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Briefcase className="h-5 w-5 text-gray-500" />
                          </div>
                          <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleSelectChange}
                            className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent appearance-none"
                          >
                            <option value="user">User</option>
                            <option value="admin">Administrator</option>
                            <option value="manager">Manager</option>
                            <option value="developer">Developer</option>
                            <option value="analyst">Analyst</option>
                            <option value="support">Support</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Preferences
                    </label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="emailNotifications"
                            name="emailNotifications"
                            type="checkbox"
                            checked={formData.emailNotifications}
                            onChange={handleChange}
                            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-[#00cbdd] focus:ring-[#00cbdd]"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="emailNotifications" className="text-gray-300">
                            Send me updates about new features and improvements
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="theme"
                            name="theme"
                            type="radio"
                            value="dark"
                            checked={formData.theme === "dark"}
                            onChange={() => setFormData(prev => ({ ...prev, theme: "dark" }))}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-[#00cbdd] focus:ring-[#00cbdd]"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="theme-dark" className="text-gray-300">
                            Dark Theme
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="theme-light"
                            name="theme"
                            type="radio"
                            value="light"
                            checked={formData.theme === "light"}
                            onChange={() => setFormData(prev => ({ ...prev, theme: "light" }))}
                            className="h-4 w-4 border-gray-700 bg-gray-800 text-[#00cbdd] focus:ring-[#00cbdd]"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="theme-light" className="text-gray-300">
                            Light Theme
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Setting Up Your Account..." : "Complete Setup"}
                      {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 