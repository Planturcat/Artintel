'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import {
  ChevronLeft,
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  X,
  LogOut,
  Smartphone,
  User,
  Clock,
  Map,
  Monitor,
  Check
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

// Dummy active sessions data
const activeSessions = [
  {
    id: 'sess_current',
    device: 'Windows PC',
    browser: 'Chrome',
    location: 'New York, US',
    ip: '192.168.1.1',
    lastActive: 'Current session',
    isCurrent: true
  },
  {
    id: 'sess_123456',
    device: 'iPhone 13',
    browser: 'Safari',
    location: 'Boston, US',
    ip: '192.168.1.2',
    lastActive: '2 hours ago',
    isCurrent: false
  },
  {
    id: 'sess_789012',
    device: 'MacBook Pro',
    browser: 'Firefox',
    location: 'San Francisco, US',
    ip: '192.168.1.3',
    lastActive: '1 day ago',
    isCurrent: false
  }
];

// Dummy login history data
const loginHistory = [
  {
    id: 'login_1',
    date: 'Mar 13, 2023 • 10:24 AM',
    ip: '192.168.1.1',
    location: 'New York, US',
    device: 'Windows PC - Chrome',
    status: 'success'
  },
  {
    id: 'login_2',
    date: 'Mar 12, 2023 • 8:15 PM',
    ip: '192.168.1.2',
    location: 'Boston, US',
    device: 'iPhone 13 - Safari',
    status: 'success'
  },
  {
    id: 'login_3',
    date: 'Mar 10, 2023 • 3:45 PM',
    ip: '192.168.1.4',
    location: 'Unknown',
    device: 'Unknown Device',
    status: 'failed'
  },
  {
    id: 'login_4',
    date: 'Mar 9, 2023 • 11:30 AM',
    ip: '192.168.1.3',
    location: 'San Francisco, US',
    device: 'MacBook Pro - Firefox',
    status: 'success'
  }
];

export default function SecuritySettingsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  const [loading, setLoading] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  const handleSignOutSession = (sessionId: string) => {
    toast.success(sessionId === 'sess_current' 
      ? 'You have been signed out from this session' 
      : 'Device has been signed out');
  };

  const handleSignOutAllSessions = () => {
    toast.success('You have been signed out from all sessions');
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
            Security Settings
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your account security and authentication preferences
          </p>
        </div>
      </div>

      {/* Password Section */}
      <div id="password" className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Lock className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Password
            </h2>
          </div>
          
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Change your password to keep your account secure
          </p>
          
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="current-password" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 ${
                  isDark
                    ? 'bg-gray-900/50 border-gray-700 text-white focus:border-[#00cbdd] focus:ring focus:ring-[#00cbdd]/20'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-slate-500 focus:ring focus:ring-slate-500/20'
                }`}
                required
              />
            </div>
            
            <div>
              <label htmlFor="new-password" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 ${
                  isDark
                    ? 'bg-gray-900/50 border-gray-700 text-white focus:border-[#00cbdd] focus:ring focus:ring-[#00cbdd]/20'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-slate-500 focus:ring focus:ring-slate-500/20'
                }`}
                required
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 ${
                  isDark
                    ? 'bg-gray-900/50 border-gray-700 text-white focus:border-[#00cbdd] focus:ring focus:ring-[#00cbdd]/20'
                    : 'bg-white border-gray-300 text-gray-900 focus:border-slate-500 focus:ring focus:ring-slate-500/20'
                }`}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark 
                    ? 'bg-[#00cbdd] text-[#00091b] hover:bg-[#00cbdd]/90' 
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div id="2fa" className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Smartphone className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Two-Factor Authentication
            </h2>
          </div>
          
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Add an extra layer of security to your account by requiring a verification code in addition to your password
          </p>
          
          <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-slate-50'}`}>
            <div className="flex items-start">
              {session?.user.tier === 'Free' ? (
                <>
                  <div className={`p-2 rounded-lg mr-3 ${isDark ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                    <Key className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  </div>
                  <div>
                    <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Pro Feature</h3>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Two-factor authentication is available on Pro and Enterprise plans
                    </p>
                    <button
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isDark 
                          ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      Upgrade to Pro
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className={`p-2 rounded-lg mr-3 ${isDark ? 'bg-amber-900/30' : 'bg-amber-100'}`}>
                    <AlertTriangle className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className={`font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Not Enabled</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${isDark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-800'}`}>
                        Recommended
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Two-factor authentication is not enabled for your account
                    </p>
                    <button
                      onClick={() => setShowTwoFactorModal(true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isDark 
                          ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                          : 'bg-slate-800 text-white hover:bg-slate-700'
                      }`}
                    >
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Recovery Options</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              If you lose access to your authentication app, you can use recovery codes to sign in
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                disabled={session?.user.tier === 'Free'}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isDark 
                    ? session?.user.tier === 'Free'
                      ? 'border border-gray-800 text-gray-600 cursor-not-allowed'
                      : 'border border-gray-800 text-gray-400 hover:bg-gray-800/50' 
                    : session?.user.tier === 'Free'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                View Recovery Codes
              </button>
              <button
                disabled={session?.user.tier === 'Free'}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isDark 
                    ? session?.user.tier === 'Free'
                      ? 'border border-gray-800 text-gray-600 cursor-not-allowed'
                      : 'border border-gray-800 text-gray-400 hover:bg-gray-800/50' 
                    : session?.user.tier === 'Free'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Generate New Codes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session Management Section */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <User className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Active Sessions
            </h2>
          </div>
          
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            These are the devices that are currently signed in to your account
          </p>
          
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div 
                key={session.id}
                className={`p-4 rounded-lg ${
                  session.isCurrent 
                    ? isDark ? 'bg-blue-900/10 border border-blue-900/20' : 'bg-blue-50 border border-blue-100'
                    : isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-slate-50 border border-slate-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg mr-3 ${isDark ? 'bg-gray-800' : 'bg-white shadow'}`}>
                      <Monitor className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`} />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{session.device}</h3>
                        {session.isCurrent && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                            Current
                          </span>
                        )}
                      </div>
                      <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <p>Browser: {session.browser}</p>
                        <p>IP Address: {session.ip}</p>
                        <p>Location: {session.location}</p>
                        <p>Last active: {session.lastActive}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSignOutSession(session.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isDark 
                        ? 'border border-red-500/20 text-red-400 hover:bg-red-900/20' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSignOutAllSessions}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center ${
                isDark 
                  ? 'border border-red-500/20 text-red-400 hover:bg-red-900/20' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sign Out All Devices
            </button>
          </div>
        </div>
      </div>

      {/* Login History Section */}
      <div className={`rounded-xl shadow-sm ${isDark ? 'border border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-0 bg-white shadow-md'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-[#00cbdd]/10' : 'bg-slate-100'}`}>
              <Clock className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            </div>
            <h2 className={`ml-3 text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Login History
            </h2>
          </div>
          
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Recent login attempts to your account
          </p>
          
          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className={`w-full ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <thead className={`${isDark ? 'bg-gray-900/50' : 'bg-slate-50'}`}>
                <tr className={`border-b ${isDark ? 'border-gray-800' : 'border-slate-200'}`}>
                  <th className="text-left py-3 px-4 text-sm font-medium">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">IP Address</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Device</th>
                  <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((login) => (
                  <tr key={login.id} className={`border-b ${isDark ? 'border-gray-800' : 'border-slate-100'}`}>
                    <td className="py-3 px-4 text-sm">{login.date}</td>
                    <td className="py-3 px-4 text-sm">{login.ip}</td>
                    <td className="py-3 px-4 text-sm">{login.location}</td>
                    <td className="py-3 px-4 text-sm">{login.device}</td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        login.status === 'success'
                          ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                          : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                      }`}>
                        {login.status === 'success' ? 'Successful' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {session?.user.tier !== 'Free' && (
            <div className="mt-4 text-center">
              <button
                className={`text-sm font-medium ${isDark ? 'text-[#00cbdd] hover:underline' : 'text-slate-800 hover:underline'}`}
              >
                View Complete Login History
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 