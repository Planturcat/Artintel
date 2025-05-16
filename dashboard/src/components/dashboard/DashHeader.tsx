"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, MessageCircle, User, Settings, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function DashHeader() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState('');
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const isDark = theme === 'dark';

  // Current time update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // Fetch notifications and messages count
  useEffect(() => {
    // In a real app, this would call an API endpoint
    // For now, just set random counts for demo purposes
    if (user) {
      // Simulate loading notifications
      setNotifications(Math.floor(Math.random() * 5));
      setMessages(Math.floor(Math.random() * 3));
    }
  }, [user]);

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu || showNotifications || showMessages) {
        const target = event.target as HTMLElement;
        if (!target.closest('.dropdown-toggle')) {
          setShowUserMenu(false);
          setShowNotifications(false);
          setShowMessages(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showUserMenu, showNotifications, showMessages]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // In a real app, this would navigate to search results
    }
  };

  // Sample notification data
  const notificationItems = [
    {
      id: 'n1',
      title: 'System Update',
      message: 'AI platform has been updated to version 2.5',
      time: 'Just now',
      read: false,
      type: 'system'
    },
    {
      id: 'n2',
      title: 'New Model Available',
      message: 'GPT-4o has been added to your available models',
      time: '2 hours ago',
      read: false,
      type: 'model'
    },
    {
      id: 'n3',
      title: 'Dataset Processing Complete',
      message: 'Your dataset "Customer Support" has been processed',
      time: 'Yesterday',
      read: true,
      type: 'dataset'
    }
  ];

  // Sample message data
  const messageItems = [
    {
      id: 'm1',
      sender: 'Support Team',
      message: 'Your last support ticket has been resolved',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 'm2',
      sender: 'Team Admin',
      message: 'New permissions have been granted to your account',
      time: '1 day ago',
      read: true
    }
  ];

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.header
      className={`sticky top-0 z-10 ${
        isDark
          ? 'bg-[#00091b]/80 text-white border-b border-[#00cbdd]/20'
          : 'bg-white/80 text-gray-800 border-b border-gray-100'
      } backdrop-blur-md px-6 py-3`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Left section: Search */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSearchSubmit} className={`relative ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 rounded-lg border ${
                isDark
                  ? 'bg-[#00052d]/60 border-[#00cbdd]/20 text-white placeholder:text-gray-500'
                  : 'bg-gray-50/70 border-gray-200 text-gray-800 placeholder:text-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]/40 transition-all duration-200`}
            />
          </form>
        </div>

        {/* Right section: Time, Theme Toggle, Notifications & User */}
        <div className="flex items-center space-x-6">
          {/* Current time */}
          <div className={`hidden md:block font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentTime}
          </div>

          {/* Theme toggle - mobile only */}
          <button
            className={`md:hidden p-1.5 rounded-full ${
              isDark
                ? 'text-gray-300 hover:text-white hover:bg-white/10'
                : 'text-gray-600 hover:text-[#00cbdd] hover:bg-gray-100'
            } transition-colors duration-200`}
            onClick={toggleTheme}
            aria-label={isDark ? t('lightMode') : t('darkMode')}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Notification icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative dropdown-toggle">
              <button
                className={`relative p-1.5 rounded-full ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-[#00cbdd] hover:bg-gray-100'
                } transition-colors duration-200`}
                aria-label={t('notifications')}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                  setShowUserMenu(false);
                }}
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg overflow-hidden z-20 ${
                    isDark
                      ? 'bg-[#00091b] border border-[#00cbdd]/20'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className={`px-4 py-3 border-b flex justify-between items-center ${isDark ? 'border-[#00cbdd]/20' : 'border-gray-100'}`}>
                    <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('notifications')}
                    </h3>
                    {notifications > 0 && (
                      <button
                        className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                        onClick={() => setNotifications(0)}
                      >
                        {t('markAllAsRead')}
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notificationItems.length > 0 ? (
                      notificationItems.map((item) => (
                        <div
                          key={item.id}
                          className={`px-4 py-3 border-b ${
                            isDark ? 'border-[#00cbdd]/10' : 'border-gray-50'
                          } ${
                            !item.read ? (isDark ? 'bg-[#00052d]/30' : 'bg-blue-50/50') : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {item.title}
                            </p>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {item.time}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t('noNotifications')}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={`px-4 py-2 text-center ${isDark ? 'border-t border-[#00cbdd]/20' : 'border-t border-gray-100'}`}>
                    <a
                      href="/dashboard/notifications"
                      className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                    >
                      {t('viewAllNotifications')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="relative dropdown-toggle">
              <button
                className={`relative p-1.5 rounded-full ${
                  isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-[#00cbdd] hover:bg-gray-100'
                } transition-colors duration-200`}
                aria-label={t('messages')}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                  setShowUserMenu(false);
                }}
              >
                <MessageCircle className="h-5 w-5" />
                {messages > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {messages}
                  </span>
                )}
              </button>

              {/* Messages dropdown */}
              {showMessages && (
                <div
                  className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg overflow-hidden z-20 ${
                    isDark
                      ? 'bg-[#00091b] border border-[#00cbdd]/20'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className={`px-4 py-3 border-b ${isDark ? 'border-[#00cbdd]/20' : 'border-gray-100'}`}>
                    <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('messages')}
                    </h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {messageItems.length > 0 ? (
                      messageItems.map((item) => (
                        <div
                          key={item.id}
                          className={`px-4 py-3 border-b ${
                            isDark ? 'border-[#00cbdd]/10' : 'border-gray-50'
                          } ${
                            !item.read ? (isDark ? 'bg-[#00052d]/30' : 'bg-blue-50/50') : ''
                          }`}
                        >
                          <div className="flex justify-between">
                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {item.sender}
                            </p>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {item.time}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t('noMessages')}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className={`px-4 py-2 text-center ${isDark ? 'border-t border-[#00cbdd]/20' : 'border-t border-gray-100'}`}>
                    <a
                      href="/dashboard/support"
                      className={`text-xs ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}
                    >
                      {t('viewAllMessages')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* User profile */}
            <div className="relative dropdown-toggle">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                  setShowMessages(false);
                }}
                className={`flex items-center space-x-2 p-1 rounded-full ${
                  isDark
                    ? 'hover:bg-white/10'
                    : 'hover:bg-gray-100'
                } transition-colors duration-200`}
                aria-label={t('profile')}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00cbdd] to-blue-500 flex items-center justify-center text-white font-medium">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>

              {/* User dropdown menu */}
              {showUserMenu && (
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg overflow-hidden z-20 ${
                    isDark
                      ? 'bg-[#00091b] border border-[#00cbdd]/20'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* User info section */}
                  <div className="px-4 py-3 border-b flex flex-col">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00cbdd] to-blue-500 flex items-center justify-center text-white font-medium">
                        {user?.full_name ? user.full_name.charAt(0).toUpperCase() : user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {user?.full_name || user?.username || 'User'}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                    <div className={`text-xs py-1 px-2 rounded-md self-start ${
                      isDark ? 'bg-[#00cbdd]/10 text-[#00cbdd]' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {user?.tier || 'Free'} Tier
                    </div>
                  </div>

                  {/* Menu items */}
                  <div>
                    <Link href="/dashboard/profile"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDark
                          ? 'text-gray-300 hover:bg-[#00052d] hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="mr-3 h-4 w-4" />
                      {t('profile')}
                    </Link>

                    <Link href="/dashboard/settings"
                      className={`flex items-center px-4 py-2 text-sm ${
                        isDark
                          ? 'text-gray-300 hover:bg-[#00052d] hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      {t('settings')}
                    </Link>

                    <button
                      className={`w-full flex items-center px-4 py-2 text-sm ${
                        isDark
                          ? 'text-gray-300 hover:bg-[#00052d] hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      onClick={async () => {
                        setShowUserMenu(false);
                        try {
                          // Use AuthService for logout
                          const AuthService = (await import('@/lib/authService')).default;
                          // Add a small delay to prevent UI flicker
                          setTimeout(() => {
                            AuthService.logout();
                          }, 150);
                        } catch (error) {
                          console.error('Logout error:', error);
                          // Fallback to context logout if AuthService fails
                          setTimeout(() => {
                            logout();
                          }, 150);
                        }
                      }}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      {t('logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}