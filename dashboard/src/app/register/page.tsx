"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, Check, Building, Briefcase, ChevronDown, ChevronUp, ArrowRight, Globe, Apple } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from 'react-hot-toast';

// Password strength levels
const passwordStrengthLevels = [
  { level: 0, color: "bg-gray-700", label: "Too weak" },
  { level: 1, color: "bg-red-500", label: "Weak" },
  { level: 2, color: "bg-yellow-500", label: "Medium" },
  { level: 3, color: "bg-green-500", label: "Strong" },
  { level: 4, color: "bg-green-600", label: "Very strong" }
];

// User types
const userTypes = [
  { 
    id: "regular", 
    name: "Personal", 
    description: "For individual users exploring AI capabilities", 
    icon: <User className="h-5 w-5" />,
    color: "from-cyan-600 to-blue-700"
  },
  { 
    id: "enterprise", 
    name: "Enterprise", 
    description: "For teams and organizations with professional needs", 
    icon: <Building className="h-5 w-5" />,
    color: "from-cyan-600 to-blue-800"
  }
];

// Available tiers
const tiers = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to get started",
    features: [
      "Access to basic models",
      "Limited API calls (100/month)",
      "500MB storage",
      "Community support"
    ],
    price: "Free",
    color: "bg-gradient-to-r from-cyan-500 to-blue-500"
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users and professionals",
    features: [
      "Access to mid-tier models",
      "5,000 API calls per month",
      "5GB storage",
      "Email support",
      "Team collaboration"
    ],
    price: "$49/month",
    color: "bg-gradient-to-r from-indigo-500 to-purple-500"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    features: [
      "Access to all models",
      "Unlimited API calls",
      "Unlimited storage",
      "Priority support",
      "Custom deployment options",
      "Dedicated account manager"
    ],
    price: "Contact Sales",
    color: "bg-gradient-to-r from-amber-500 to-orange-500"
  }
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading: authLoading, error: authError } = useAuth();
  
  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("free");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    domain: "",
    role: "user", // Default role
    acceptTerms: false,
    emailNotifications: true,
    theme: "dark"
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Show auth errors
  useEffect(() => {
    if (authError) {
      setError(authError);
      toast.error(authError);
    }
  }, [authError]);
  
  // Social signup handlers (these would be connected to actual auth providers in production)
  const handleGoogleSignUp = async () => {
    try {
      // Implement OAuth redirect for Google here
      toast.info('Google sign-up is not implemented yet');
    } catch (error) {
      console.error('Google Sign Up error:', error);
      toast.error('Failed to initiate Google sign up');
    }
  };

  const handleAppleSignUp = () => {
    // Implement OAuth redirect for Apple here
    toast.info('Apple sign-up is not implemented yet');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Update password strength if password field changes
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
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
  
  // Password validation criteria
  const passwordCriteria = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "Contains number", met: /[0-9]/.test(formData.password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(formData.password) }
  ];
  
  // Handle next step in multi-step form
  const handleNextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      if (!userType) {
        setError("Please select an account type");
        return;
      }
      setError(null);
      setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      // Validate basic information
      if (!formData.name.trim()) {
        setError("Name is required");
        return;
      }
      
      if (!formData.email.trim()) {
        setError("Email is required");
        return;
      }
      
      if (userType === "enterprise" && !formData.organization.trim()) {
        setError("Organization name is required for enterprise accounts");
        return;
      }
      
      setError(null);
      setCurrentStep(3);
    }
    else if (currentStep === 3) {
      // Validate password
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      
      setError(null);
      setCurrentStep(4);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setError(null);
    setCurrentStep(prev => Math.max(1, prev - 1));
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    
    // Final validation before submission
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    
    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registration submission started");
      console.log("Selected user type:", userType);
      console.log("Selected tier:", selectedTier);
      
      // Prepare data for registration - ensure we use the correct parameter names
      const userData = {
        username: formData.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000),  // Generate username from email with random suffix
        email: formData.email,
        password: formData.password,
        full_name: formData.name,
        organization: userType === "enterprise" ? formData.organization : null,
        tier: selectedTier
      };

      console.log("Prepared user data:", {
        ...userData,
        password: '*****' // Mask password for security in logs
      });

      // Register the user using our AuthContext
      await register(userData);
      
      console.log("Registration submitted successfully");
      toast.success("Account created! Please check your email for verification instructions.");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Failed to create account");
      setError(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-[#00031b]">
      {/* Header with progress indicator */}
      <header className="border-b border-cyan-950 bg-[#00031b]/80 backdrop-blur-lg py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Artintel<span className="text-[#00cbdd]"> LLms</span>
          </Link>
          
          {/* Progress steps */}
          <div className="hidden sm:flex items-center space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step 
                    ? "bg-[#00cbdd] text-[#00031b]" 
                    : currentStep > step 
                      ? "bg-[#00cbdd]/80 text-[#00031b]" 
                      : "bg-gray-800 text-gray-400"
                }`}>
                  {currentStep > step ? <Check className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-10 h-0.5 ${
                    currentStep > step ? "bg-[#00cbdd]/80" : "bg-gray-800"
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-400">
            <Link href="/login" className="hover:text-[#00cbdd]">
              Already have an account?
            </Link>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          {/* Step indicators for mobile */}
          <div className="sm:hidden flex justify-center mb-8">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className={`w-2.5 h-2.5 rounded-full ${
                    currentStep === step 
                      ? "bg-[#00cbdd]" 
                      : currentStep > step 
                        ? "bg-[#00cbdd]/60" 
                        : "bg-gray-700"
                  }`} 
                />
              ))}
            </div>
          </div>
          
          {/* Card with step content */}
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
            
            {/* Step 1: Account Type Selection */}
            {currentStep === 1 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Choose Account Type</h2>
                <p className="text-gray-400 mb-8">Select the type of account that best fits your needs</p>
                
                {/* Social Sign Up Buttons */}
                <div className="mb-8 space-y-3">
                  <button 
                    onClick={handleGoogleSignUp}
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:ring-offset-2 focus:ring-offset-[#00031b] transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign up with Google
                  </button>
                  <button 
                    onClick={handleAppleSignUp}
                    type="button"
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:ring-offset-2 focus:ring-offset-[#00031b] transition-all duration-300"
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    Sign up with Apple
                  </button>
                </div>
                
                {/* Divider */}
                <div className="flex items-center mb-8">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="px-4 text-sm text-gray-500">or create an account</span>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {userTypes.map(type => (
                    <div
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                      className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                        userType === type.id
                          ? `ring-2 ring-[#00cbdd] bg-gradient-to-br ${type.color} shadow-lg`
                          : 'bg-gray-800/50 hover:bg-gray-800'
                      }`}
                    >
                      {/* Background pattern for selected card */}
                      {userType === type.id && (
                        <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-repeat"></div>
                      )}
                      
                      <div className="relative p-6">
                        <div className="flex items-start mb-4">
                          <div className={`p-2 rounded-lg ${
                            userType === type.id
                              ? 'bg-white/20'
                              : 'bg-gray-700'
                          }`}>
                            {type.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-white">{type.name}</h3>
                            <p className={`text-sm ${
                              userType === type.id ? 'text-gray-100' : 'text-gray-400'
                            }`}>
                              {type.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Basic Information */}
            {currentStep === 2 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                <p className="text-gray-400 mb-8">Tell us about yourself{userType === 'enterprise' ? ' and your organization' : ''}</p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
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
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  {userType === 'enterprise' && (
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
                            placeholder="Acme Corporation"
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
                            placeholder="acme.com"
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
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Password and Security */}
            {currentStep === 3 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Create Password</h2>
                <p className="text-gray-400 mb-8">Set up a secure password for your account</p>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
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
                    {formData.password && (
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
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00cbdd] focus:border-transparent ${
                          formData.password &&
                          formData.confirmPassword &&
                          formData.password !== formData.confirmPassword
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                      <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center px-6 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300"
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Select Plan and Finish */}
            {currentStep === 4 && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Select Your Plan</h2>
                <p className="text-gray-400 mb-8">Choose the plan that works best for you. You can always upgrade later.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                  {tiers.map(tier => (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        selectedTier === tier.id
                          ? 'ring-2 ring-[#00cbdd] transform scale-[1.02]'
                          : 'bg-gray-800/50 hover:bg-gray-800 hover:shadow-lg'
                      }`}
                    >
                      {/* Header */}
                      <div className={`${tier.color} p-4`}>
                        <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                        <div className="mt-1 text-white/90 font-medium">{tier.price}</div>
                      </div>
                      
                      {/* Body */}
                      <div className="p-4 bg-gray-800">
                        <p className="text-sm text-gray-300 mb-4">{tier.description}</p>
                        
                        <ul className="space-y-2">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <Check className="h-4 w-4 text-[#00cbdd] mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Conditional message for Pro/Enterprise tiers */}
                        {(tier.id === 'pro' || tier.id === 'enterprise') && (
                          <div className="mt-4 p-3 bg-cyan-950/50 border border-cyan-900 rounded-lg">
                            <p className="text-sm text-cyan-300">
                              We'll contact you soon about {tier.id === 'pro' ? 'Pro' : 'Enterprise'} setup. 
                              We recommend trying the Free tier first to explore our platform!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Additional message when Pro/Enterprise tier is selected */}
                {(selectedTier === 'pro' || selectedTier === 'enterprise') && (
                  <div className="mb-6 p-4 bg-cyan-900/20 border border-cyan-900/40 rounded-lg flex items-start">
                    <div className="bg-cyan-900/50 p-2 rounded-full mr-3 mt-0.5">
                      <Mail className="h-5 w-5 text-[#00cbdd]" />
                    </div>
                    <div>
                      <h4 className="text-[#00cbdd] font-medium">Thank you for your interest!</h4>
                      <p className="text-gray-300 text-sm mt-1">
                        Our team will contact you shortly after sign-up to discuss your {selectedTier === 'pro' ? 'Pro' : 'Enterprise'} needs.
                        Meanwhile, you'll be set up with our Free tier so you can start exploring the platform right away.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-[#00cbdd] focus:ring-[#00cbdd]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="acceptTerms" className="text-gray-300">
                        I agree to the{" "}
                        <Link href="/terms" className="text-[#00cbdd] hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" className="text-[#00cbdd] hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                  
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
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading || authLoading}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-[#00cbdd] to-blue-600 text-white rounded-lg font-medium hover:from-[#00cbdd]/90 hover:to-blue-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading || authLoading ? "Creating Account..." : "Create Account"}
                    {!isLoading && !authLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 