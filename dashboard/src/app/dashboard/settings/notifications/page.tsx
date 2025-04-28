'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import {
  ChevronLeft,
  Bell,
  Mail,
  MessageSquare,
  AlertCircle,
  Zap,
  Clock,
  Users,
  Shield,
  CreditCard,
  HelpCircle,
  ListChecks
} from 'lucide-react';

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    tier?: string;
  };
}

interface NotificationCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  emailEnabled: boolean;
  pushEnabled: boolean;
}

export default function NotificationsSettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data: session } = useSession() as { data: ExtendedSession | null };
  
  // Notification categories with their settings
  const [notificationCategories, setNotificationCategories] = useState<NotificationCategory[]>([
    {
      id: 'account',
      title: 'Account',
      description: 'Security alerts and account updates',
      icon: <Shield className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: true,
      pushEnabled: true
    },
    {
      id: 'billing',
      title: 'Billing',
      description: 'Payment confirmations and subscription updates',
      icon: <CreditCard className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: true,
      pushEnabled: false
    },
    {
      id: 'system',
      title: 'System',
      description: 'System updates and maintenance notifications',
      icon: <Zap className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: true,
      pushEnabled: true
    },
    {
      id: 'usage',
      title: 'Usage & Limits',
      description: 'Quota usage alerts and limit notifications',
      icon: <AlertCircle className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: true,
      pushEnabled: true
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Team invitations and role changes',
      icon: <Users className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: true,
      pushEnabled: true
    },
    {
      id: 'activity',
      title: 'Activity',
      description: 'Model usage and activity summaries',
      icon: <Clock className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: false,
      pushEnabled: false
    },
    {
      id: 'marketing',
      title: 'Marketing',
      description: 'Product updates and promotional offers',
      icon: <MessageSquare className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />,
      emailEnabled: false,
      pushEnabled: false
    }
  ]);
  
  // Email digest frequency
  const [emailDigestFrequency, setEmailDigestFrequency] = useState('daily');
  
  // Do Not Disturb settings
  const [dndEnabled, setDndEnabled] = useState(false);
  const [dndStartTime, setDndStartTime] = useState('22:00');
  const [dndEndTime, setDndEndTime] = useState('08:00');
  
  // Toggle email notifications for a category
  const toggleEmailNotification = (categoryId: string) => {
    setNotificationCategories(categories => 
      categories.map(category => 
        category.id === categoryId 
          ? { ...category, emailEnabled: !category.emailEnabled } 
          : category
      )
    );
  };
  
  // Toggle push notifications for a category
  const togglePushNotification = (categoryId: string) => {
    setNotificationCategories(categories => 
      categories.map(category => 
        category.id === categoryId 
          ? { ...category, pushEnabled: !category.pushEnabled } 
          : category
      )
    );
  };
  
  // Toggle all email notifications
  const toggleAllEmailNotifications = (enabled: boolean) => {
    setNotificationCategories(categories => 
      categories.map(category => ({ ...category, emailEnabled: enabled }))
    );
  };
  
  // Toggle all push notifications
  const toggleAllPushNotifications = (enabled: boolean) => {
    setNotificationCategories(categories => 
      categories.map(category => ({ ...category, pushEnabled: enabled }))
    );
  };
  
  // Save notification settings
  const handleSaveSettings = () => {
    // Here you would save settings to the user's profile
    toast.success('Notification settings saved successfully');
  };
  
  // Unsubscribe from all notifications
  const handleUnsubscribeAll = () => {
    toggleAllEmailNotifications(false);
    toggleAllPushNotifications(false);
    toast.success('Unsubscribed from all notifications');
  };

  return (
    <div className={`space-y-6 ${isDark ? 'bg-transparent' : 'bg-white'}`}>
      {/* Header with Back Button */}
      <div className="flex items-center">
        <Link 
          href="/dashboard/settings" 
          className={`mr-4 p-2 rounded-full transition-colors ${
            isDark 
              ? 'hover:bg-gray-800' 
              : 'hover:bg-gray-100'
          }`}
        >
          <ChevronLeft className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Notification Settings
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage how and when you receive notifications
          </p>
        </div>
      </div>

      {/* Global Notification Controls */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00031b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Bell className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Global Notification Controls
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Email Notifications
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Receive notifications via email
                </p>
              </div>
              <div className="relative h-6 w-11 flex-shrink-0">
                <input
                  type="checkbox"
                  className="peer absolute h-0 w-0 opacity-0"
                  checked={notificationCategories.some(cat => cat.emailEnabled)}
                  onChange={(e) => toggleAllEmailNotifications(e.target.checked)}
                />
                <div className={`absolute inset-0 rounded-full transition ${
                  isDark 
                    ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                    : 'bg-gray-200 peer-checked:bg-slate-700'
                }`}></div>
                <div className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${
                  isDark 
                    ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                    : 'bg-white peer-checked:bg-white'
                } ${
                  notificationCategories.some(cat => cat.emailEnabled) ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Push Notifications
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Receive notifications in your browser
                </p>
              </div>
              <div className="relative h-6 w-11 flex-shrink-0">
                <input
                  type="checkbox"
                  className="peer absolute h-0 w-0 opacity-0"
                  checked={notificationCategories.some(cat => cat.pushEnabled)}
                  onChange={(e) => toggleAllPushNotifications(e.target.checked)}
                />
                <div className={`absolute inset-0 rounded-full transition ${
                  isDark 
                    ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                    : 'bg-gray-200 peer-checked:bg-slate-700'
                }`}></div>
                <div className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${
                  isDark 
                    ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                    : 'bg-white peer-checked:bg-white'
                } ${
                  notificationCategories.some(cat => cat.pushEnabled) ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Email Digest Frequency
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  How often to receive email digests
                </p>
              </div>
              <div>
                <select 
                  value={emailDigestFrequency} 
                  onChange={(e) => setEmailDigestFrequency(e.target.value)}
                  className={`rounded-lg px-3 py-1 text-sm ${
                    isDark 
                      ? 'bg-gray-900 border border-gray-700 text-white'
                      : 'bg-white border border-slate-200 text-gray-900'
                  }`}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Do Not Disturb
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Pause all notifications
                </p>
              </div>
              <div className="relative h-6 w-11 flex-shrink-0">
                <input
                  type="checkbox"
                  className="peer absolute h-0 w-0 opacity-0"
                  checked={dndEnabled}
                  onChange={(e) => setDndEnabled(e.target.checked)}
                />
                <div className={`absolute inset-0 rounded-full transition ${
                  isDark 
                    ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                    : 'bg-gray-200 peer-checked:bg-slate-700'
                }`}></div>
                <div className={`absolute top-[2px] left-[2px] h-5 w-5 rounded-full transition-transform ${
                  isDark 
                    ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                    : 'bg-white peer-checked:bg-white'
                } ${
                  dndEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Categories */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00031b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <ListChecks className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Notification Categories
            </h2>
          </div>
          
          <div className="space-y-6">
            {notificationCategories.map((category) => (
              <div key={category.id} className={`p-4 rounded-lg ${isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-slate-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${isDark ? 'bg-gray-800' : 'bg-white shadow'}`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{category.title}</h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{category.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex flex-col items-center">
                      <span className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</span>
                      <div className="relative h-5 w-10 flex-shrink-0">
                        <input
                          type="checkbox"
                          className="peer absolute h-0 w-0 opacity-0"
                          checked={category.emailEnabled}
                          onChange={() => toggleEmailNotification(category.id)}
                        />
                        <div className={`absolute inset-0 rounded-full transition ${
                          isDark 
                            ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                            : 'bg-gray-200 peer-checked:bg-slate-700'
                        }`}></div>
                        <div className={`absolute top-[1px] left-[1px] h-3 w-3 rounded-full transition-transform ${
                          isDark 
                            ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                            : 'bg-white peer-checked:bg-white'
                        } ${
                          category.emailEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Push</span>
                      <div className="relative h-5 w-10 flex-shrink-0">
                        <input
                          type="checkbox"
                          className="peer absolute h-0 w-0 opacity-0"
                          checked={category.pushEnabled}
                          onChange={() => togglePushNotification(category.id)}
                        />
                        <div className={`absolute inset-0 rounded-full transition ${
                          isDark 
                            ? 'bg-gray-800 peer-checked:bg-[#00cbdd]/50'
                            : 'bg-gray-200 peer-checked:bg-slate-700'
                        }`}></div>
                        <div className={`absolute top-[1px] left-[1px] h-3 w-3 rounded-full transition-transform ${
                          isDark 
                            ? 'bg-gray-500 peer-checked:bg-[#00cbdd]'
                            : 'bg-white peer-checked:bg-white'
                        } ${
                          category.pushEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help & Support Note */}
      <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/10 border border-blue-900/20' : 'bg-blue-50 border border-blue-100'}`}>
        <div className="flex items-start">
          <div className={`p-1.5 rounded-lg mr-3 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            <HelpCircle className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              You can customize your notification settings at any time. If you need assistance, please visit our <Link href="/dashboard/support" className={`${isDark ? 'text-[#00cbdd]' : 'text-blue-600'} hover:underline`}>Support Center</Link>.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleUnsubscribeAll}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isDark 
              ? 'bg-gray-900 text-gray-300 border border-gray-800 hover:bg-gray-800' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Unsubscribe From All
        </button>
        <button
          onClick={handleSaveSettings}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isDark 
              ? 'bg-[#00cbdd] text-[#00031b] hover:bg-[#00cbdd]/90' 
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
} 