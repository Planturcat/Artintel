"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import DashSidebar from '@/components/dashboard/DashSidebar';
import DashHeader from '@/components/dashboard/DashHeader';
import DashboardBackground from '@/components/dashboard/DashboardBackground';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If the page is not yet mounted, show a placeholder
  if (!mounted) {
    return <LoadingScreen />;
  }

  // If loading auth, show loading
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If no user, redirect to login
  if (!user) {
    redirect('/login');
  }

  const isDark = theme === 'dark';

  return (
    <LanguageProvider autoTranslate={true}>
      <div className=" overflow-hidden relative">
        {/* Glamorphic Background */}
        <DashboardBackground />
        
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <motion.div 
            className="hidden md:block w-75 shrink-0 h-screen overflow-y-auto z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DashSidebar />
          </motion.div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden z-10">
            <DashHeader />
            <main className="flex-1 overflow-y-auto">
              <div className="container mx-auto px-0.5 py-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

function LoadingScreen() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className=" overflow-hidden relative">
      <DashboardBackground />
      
      <div className="flex items-center justify-center min-h-screen z-10 relative">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00cbdd]/20 to-blue-500/20 backdrop-blur-lg flex items-center justify-center">
              <Loader2 className={`h-8 w-8 animate-spin ${isDark ? 'text-[#00cbdd]' : 'text-blue-500'}`} />
            </div>
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#00cbdd]/10 to-blue-500/10 blur-md" />
          </div>
          
          <h3 className={`mt-6 text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Loading Dashboard...
          </h3>
          <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Preparing your AI workspace
          </p>
        </motion.div>
      </div>
    </div>
  );
} 