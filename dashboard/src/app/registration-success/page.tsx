"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Mail, ChevronRight, User } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'next/navigation';

export default function RegistrationSuccessPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();

  // Optional redirect to login after 15 seconds
  React.useEffect(() => {
    console.log('Registration success page loaded');
    
    const timer = setTimeout(() => {
      router.push('/login');
    }, 15000);
    
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#00031b]">
      <div className={`max-w-lg w-full rounded-xl overflow-hidden ${
        isDark ? 'bg-gray-900' : 'bg-white'
      } shadow-xl`}>
        {/* Blue gradient header */}
        <div className="bg-gradient-to-r from-[#00cbdd] to-blue-600 h-32 flex items-center justify-center relative">
          <div className="absolute -bottom-12 rounded-full p-2 bg-white">
            <div className="bg-gradient-to-r from-[#00cbdd] to-blue-600 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        
        <div className="px-8 pt-16 pb-8 text-center">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Registration Successful!
          </h1>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Thank you for registering with Artintel. Your account has been created successfully.
          </p>
          
          {/* Email verification info */}
          <div className={`mb-8 p-4 rounded-lg ${
            isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-blue-50 border border-blue-100'
          }`}>
            <div className="flex items-start">
              <Mail className={`w-5 h-5 mt-0.5 mr-3 ${isDark ? 'text-[#00cbdd]' : 'text-blue-500'}`} />
              <div className="text-left">
                <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Check Your Email
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  We've sent a verification link to your email address. Please click on the link to verify your account.
                </p>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  (Note: For development purposes, the verification link is displayed in the server console.)
                </p>
              </div>
            </div>
          </div>
          
          {/* Next steps */}
          <div className={`mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <h3 className="font-medium mb-3">Next Steps</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className={`w-6 h-6 rounded-full ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                } flex items-center justify-center mr-2`}>
                  <span className="text-xs">1</span>
                </div>
                <span>Verify your email address</span>
              </li>
              <li className="flex items-center">
                <div className={`w-6 h-6 rounded-full ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                } flex items-center justify-center mr-2`}>
                  <span className="text-xs">2</span>
                </div>
                <span>Log in to your account</span>
              </li>
              <li className="flex items-center">
                <div className={`w-6 h-6 rounded-full ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                } flex items-center justify-center mr-2`}>
                  <span className="text-xs">3</span>
                </div>
                <span>Complete your profile</span>
              </li>
            </ul>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col space-y-3">
            <Link href="/login" className={`
              w-full py-3 rounded-lg flex items-center justify-center ${
                isDark 
                  ? 'bg-[#00cbdd] hover:bg-[#00b0c0] text-gray-900'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } font-medium transition-colors
            `}>
              <User className="w-4 h-4 mr-2" />
              Go to Login
            </Link>
            
            <Link href="/" className={`
              w-full py-3 rounded-lg ${
                isDark 
                  ? 'border border-gray-700 hover:bg-gray-800 text-gray-300'
                  : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
              } flex items-center justify-center transition-colors
            `}>
              Return to Homepage
            </Link>
          </div>
          
          <p className={`mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            You will be redirected to the login page in 15 seconds.
          </p>
        </div>
      </div>
    </div>
  );
} 