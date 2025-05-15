"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import {
  Home,
  BrainCircuit,
  Database,
  BarChart3,
  Settings,
  Code,
  FileText,
  Users,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Server,
  Workflow,
  Globe,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

// Sidebar navigation items
const navItems = [
  { name: 'Dashboard', icon: Home, path: '/dashboard' },
  { name: 'Models', icon: BrainCircuit, path: '/dashboard/models' },
  { name: 'Data Integration', icon: Database, path: '/dashboard/datasets' },
  { name: 'Fine-Tuning', icon: Code, path: '/dashboard/fine-tuning' },
  { name: 'Deployments', icon: Server, path: '/dashboard/deployment' },
  { name: 'Custom Pipelines', icon: Workflow, path: '/dashboard/custom-pipelines' },
  { name: 'Analytics', icon: BarChart3, path: '/dashboard/monitoring' },
  { name: 'Team', icon: Users, path: '/dashboard/team' },
  { name: 'Cost Optimization', icon: DollarSign, path: '/dashboard/cost-optimization' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
];

// Language options with their display names
const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' }
];

export default function DashSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      // Use AuthService for logout
      const AuthService = (await import('@/lib/authService')).default;
      AuthService.logout();

      // Also call signOut for next-auth if it's being used
      await signOut({ redirect: false });

      // Toast notification will be shown on the login page
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setShowLanguageDropdown(false);
    toast.success(t('language_changed_successfully'));
  };

  const isDark = theme === 'dark';

  return (
    <motion.div
      className={`h-full flex flex-col ${
        isDark
          ? 'bg-[#00031b]/90 border-r border-[#00031b]/20'
          : 'bg-white border-r border-[#00cbdd]/10'
      } backdrop-blur-md`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <div className="p-4 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00cbdd] to-blue-500">
              {isDark ? (
              <Image
                src="/Logo - PNG (2).png"
                alt="ArtIntel Logo Dark"
                width={152}
                height={82}
                className="object-contain"
                priority
              />
            ) : (
              <Image
                src="/Logo - PNG (2).png"
                alt="ArtIntel Logo Light"
                width={152}
                height={82}
                className="object-contain"
                priority
              />
            )}
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1 rounded-full ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-6 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center group px-3 py-2 rounded-lg ${
                isActive
                  ? `bg-gradient-to-r from-[#00cbdd]/20 to-blue-500/10 font-medium ${isDark ? 'text-white' : 'text-[#00031b]'}`
                  : `${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'} hover:bg-[#00cbdd]/10`
              } transition-all duration-200`}
            >
              <div className="relative">
                <item.icon className={`h-5 w-5 ${isActive ? 'text-[#00cbdd]' : ''}`} />
                {isActive && (
                  <motion.div
                    layoutId="sidebar-highlight"
                    className="absolute inset-0 rounded-full bg-[#00cbdd] filter blur-md opacity-40"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </div>
              {!isCollapsed && (
                <span className="ml-3 transition-opacity duration-200">
                  {t(item.name.toLowerCase())}
                </span>
              )}
              {isActive && !isCollapsed && (
                <motion.div
                  className="absolute inset-y-0 left-0 w-1 bg-[#00cbdd] rounded-r-full"
                  layoutId="sidebar-indicator"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer Section */}
      <div className={`p-4 ${isDark ? 'border-t border-[#00cbdd]/10' : 'border-t border-gray-100'}`}>
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className={`w-full flex items-center px-3 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'} hover:bg-[#00cbdd]/10 transition-colors duration-200`}
          >
            <Globe className="h-5 w-5" />
            {!isCollapsed && (
              <span className="ml-3 flex-1 text-left">
                {languageOptions.find(option => option.code === language)?.name || 'English'}
              </span>
            )}
            {!isCollapsed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`${isDark ? 'text-gray-300' : 'text-gray-700'} transition-transform duration-300 ${showLanguageDropdown ? 'rotate-180' : ''}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>

          {/* Language Dropdown */}
          {showLanguageDropdown && !isCollapsed && (
            <div className={`absolute bottom-full left-0 w-full mb-1 rounded-lg shadow-lg overflow-hidden z-20 ${
              isDark
                ? 'bg-[#00031b] border border-[#00cbdd]/20'
                : 'bg-white border border-gray-200'
            }`}>
              {languageOptions.map((option) => (
                <button
                  key={option.code}
                  onClick={() => handleLanguageChange(option.code as Language)}
                  className={`w-full text-left px-4 py-2 ${
                    language === option.code
                      ? isDark
                        ? 'bg-[#00cbdd]/20 text-white'
                        : 'bg-[#00cbdd]/10 text-[#00031b]'
                      : isDark
                        ? 'text-gray-300 hover:bg-[#00cbdd]/10'
                        : 'text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`mt-2 w-full flex items-center px-3 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'} hover:bg-[#00cbdd]/10 transition-colors duration-200`}
        >
          {isDark ? (
            <>
              <Sun className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{t('light_mode')}</span>}
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{t('dark_mode')}</span>}
            </>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`mt-2 w-full flex items-center px-3 py-2 rounded-lg ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-[#00cbdd]'} hover:bg-[#00cbdd]/10 transition-colors duration-200`}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">{t('logout')}</span>}
        </button>
      </div>
    </motion.div>
  );
}