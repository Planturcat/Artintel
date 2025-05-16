"use client";

import { useState, useEffect } from 'react';
import { useSession, Session } from 'next-auth/react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Key,
  Link as LinkIcon,
  MonitorSmartphone,
  Search,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tier?: string;
    role?: string;
    organization?: string | null;
  };
}

type SettingsCategory = 'profile' | 'appearance' | 'security' | 'notifications' | 'billing' | 'api-keys' | 'account' | 'integrations';

interface SettingsCategoryMeta {
  id: SettingsCategory;
  titleKey: string;
  descriptionKey: string;
  icon: any;
  link: string;
  color: string;
}

// Settings categories configuration - transformed to use translation keys
const getSettingsCategories = (t: (key: string) => string): SettingsCategoryMeta[] => [
  {
    id: 'profile',
    titleKey: 'profile_settings',
    descriptionKey: 'profile_settings_desc',
    icon: User,
    link: '/dashboard/settings/profile',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'appearance',
    titleKey: 'appearance',
    descriptionKey: 'appearance_desc',
    icon: MonitorSmartphone,
    link: '/dashboard/settings/appearance',
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'security',
    titleKey: 'security',
    descriptionKey: 'security_desc',
    icon: Shield,
    link: '/dashboard/settings/security',
    color: 'from-red-500 to-orange-400'
  },
  {
    id: 'notifications',
    titleKey: 'notifications',
    descriptionKey: 'notifications_desc',
    icon: Bell,
    link: '/dashboard/settings/notifications',
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'billing',
    titleKey: 'billing_subscription',
    descriptionKey: 'billing_desc',
    icon: CreditCard,
    link: '/dashboard/settings/billing',
    color: 'from-amber-500 to-yellow-400'
  },
  {
    id: 'api-keys',
    titleKey: 'api_keys',
    descriptionKey: 'api_keys_desc',
    icon: Key,
    link: '/dashboard/settings/api-keys',
    color: 'from-indigo-500 to-violet-400'
  },
  {
    id: 'integrations',
    titleKey: 'integrations',
    descriptionKey: 'integrations_desc',
    icon: LinkIcon,
    link: '/dashboard/settings/integrations',
    color: 'from-rose-500 to-pink-400'
  },
  {
    id: 'account',
    titleKey: 'account_management',
    descriptionKey: 'account_management_desc',
    icon: Settings,
    link: '/dashboard/settings/account',
    color: 'from-slate-500 to-gray-400'
  }
];

// Quick access settings with translation keys
const getQuickAccessSettings = (t: (key: string) => string) => [
  {
    titleKey: 'change_password',
    categoryKey: 'security',
    link: '/dashboard/settings/security#password'
  },
  {
    titleKey: 'enable_two_factor',
    categoryKey: 'security',
    link: '/dashboard/settings/security#2fa'
  },
  {
    titleKey: 'update_notification_preferences',
    categoryKey: 'notifications',
    link: '/dashboard/settings/notifications'
  },
  {
    titleKey: 'manage_api_keys',
    categoryKey: 'api',
    link: '/dashboard/settings/api-keys'
  },
  {
    titleKey: 'update_payment_method',
    categoryKey: 'billing',
    link: '/dashboard/settings/billing#payment'
  }
];

// Add these translation keys to LanguageContext.tsx if they don't exist
const translationKeys = {
  profile_settings: 'Profile Settings',
  profile_settings_desc: 'Manage your personal information and preferences',
  appearance_desc: 'Customize the look and feel of your dashboard',
  security_desc: 'Manage passwords, 2FA, and session preferences',
  notifications_desc: 'Control when and how you receive alerts',
  billing_subscription: 'Billing & Subscription',
  billing_desc: 'Manage your plan, payment methods, and billing history',
  api_keys_desc: 'Create and manage API keys for integration',
  integrations: 'Integrations',
  integrations_desc: 'Connect with third-party services and tools',
  account_management: 'Account Management',
  account_management_desc: 'Manage verification, data export, and account deletion',
  change_password: 'Change Password',
  enable_two_factor: 'Enable Two-Factor Authentication',
  update_notification_preferences: 'Update Notification Preferences',
  manage_api_keys: 'Manage API Keys',
  update_payment_method: 'Update Payment Method'
};

export default function SettingsPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  const [searchQuery, setSearchQuery] = useState('');

  // Get translated settings categories and quick access items
  const settingsCategories = getSettingsCategories(t);
  const quickAccessSettings = getQuickAccessSettings(t);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('settings')}
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('customize_experience')}
        </p>
        
        {/* Search Bar */}
        <div className={`mt-4 relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
              isDark 
                ? 'bg-[#00091b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
            placeholder={t('search_settings')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingsCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={category.link}>
              <div className={`h-full p-6 rounded-xl ${
                isDark 
                  ? 'bg-[#00091b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
                  : 'bg-white border border-gray-200 hover:border-[#00cbdd]/50'
              } transition-all duration-200 hover:shadow-lg group`}>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-lg font-medium mb-2 group-hover:text-[#00cbdd] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t(category.titleKey)}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t(category.descriptionKey)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
            </div>

      {/* Quick Access Settings */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('quick_access')}
            </h2>
        <div className="space-y-3">
          {quickAccessSettings.map((setting, index) => (
            <Link key={index} href={setting.link}>
              <div className={`p-3 rounded-lg flex items-center justify-between ${
                isDark 
                  ? 'hover:bg-[#00cbdd]/10'
                  : 'hover:bg-gray-50'
              } transition-colors duration-200`}>
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t(setting.titleKey)}
                  </h3>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t(setting.categoryKey)}
                  </span>
                </div>
                <ChevronRight className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </Link>
          ))}
                </div>
              </div>
              
      {/* Account Management */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20'
          : 'bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/10'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('sign_out_all_devices')}
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('secure_account_message')}
                        </p>
                      </div>
          <button 
            onClick={() => toast.success(t('signed_out_all_devices'))}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium hover:from-red-500/90 hover:to-orange-500/90 transition-all duration-200 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {t('sign_out_everywhere')}
                          </button>
                        </div>
      </div>
    </div>
  );
}