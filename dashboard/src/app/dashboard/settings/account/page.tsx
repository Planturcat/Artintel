'use client';

import { useState } from 'react';
import { useSession, Session } from 'next-auth/react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import {
  ChevronLeft,
  Settings,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertTriangle,
  Shield,
  Download,
  Trash2,
  HelpCircle
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

export default function AccountSettingsPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  // Account form data
  const [accountForm, setAccountForm] = useState({
    email: session?.user?.email || '',
    username: session?.user?.name?.split(' ')[0]?.toLowerCase() || 'user123',
    phoneNumber: '+1 (555) 123-4567',
    fullName: session?.user?.name || '',
    company: session?.user?.organization || '',
    website: 'https://example.com'
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSaveAccountInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Account information updated successfully');
  };
  
  const handleSendVerificationCode = () => {
    toast.success(t('verification_code_sent'));
  };
  
  const handleStartIdentityVerification = () => {
    if (session?.user.tier === 'Free') {
      toast.error('Identity verification is available only for Pro and Enterprise plans');
      return;
    }
    
    toast.success(t('identity_verification_initiated'));
  };
  
  const handleExportData = () => {
    toast.success(t('data_export_initiated'));
  };
  
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error(t('please_type_delete'));
      return;
    }
    
    toast.success(t('account_deletion_initiated'));
    setShowDeleteConfirm(false);
    setDeleteConfirmText('');
  };

  // Function to handle dynamic text in translations
  const formatDynamicText = (key: string, replacements: Record<string, string>) => {
    let translatedText = t(key);
    
    Object.entries(replacements).forEach(([placeholder, value]) => {
      translatedText = translatedText.replace(`{${placeholder}}`, value);
    });
    
    return translatedText;
  };

  return (
    <div className="space-y-6">
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
            {t('account_management')}
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('account_management_desc')}
          </p>
        </div>
      </div>

      {/* Account Verification Card */}
      <div className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Shield className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('account_verification')}
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Email Verification */}
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${
                  isEmailVerified
                    ? isDark ? 'bg-green-900/30' : 'bg-green-100'
                    : isDark ? 'bg-amber-900/30' : 'bg-amber-100'
                }`}>
                  {isEmailVerified ? (
                    <CheckCircle className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <AlertTriangle className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  )}
                </div>
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('email_verification')}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isEmailVerified 
                      ? formatDynamicText('email_verified', { email: accountForm.email })
                      : t('email_not_verified')}
                  </p>
                  {!isEmailVerified && (
                    <button
                      className={`mt-2 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        isDark 
                          ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t('verify_email')}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Phone Verification */}
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${
                  isPhoneVerified
                    ? isDark ? 'bg-green-900/30' : 'bg-green-100'
                    : isDark ? 'bg-amber-900/30' : 'bg-amber-100'
                }`}>
                  {isPhoneVerified ? (
                    <CheckCircle className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  ) : (
                    <AlertTriangle className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
                  )}
                </div>
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('phone_verification')}
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {isPhoneVerified 
                      ? formatDynamicText('phone_verified', { phone: accountForm.phoneNumber })
                      : t('phone_not_verified')}
                  </p>
                  {!isPhoneVerified && (
                    <button
                      onClick={handleSendVerificationCode}
                      className={`mt-2 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        isDark 
                          ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {t('verify_phone')}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Identity Verification */}
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <Shield className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('identity_verification')}
                    </h3>
                    {session?.user.tier === 'Free' && (
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t('pro_feature')}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t('identity_verification_desc')}
                  </p>
                  <button
                    onClick={handleStartIdentityVerification}
                    className={`mt-2 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      session?.user.tier === 'Free'
                        ? isDark 
                          ? 'border border-gray-800 text-gray-600 cursor-not-allowed'
                          : 'border border-gray-200 text-gray-400 cursor-not-allowed'
                        : isDark 
                          ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t('start_identity_verification')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Management Card */}
      <div className={`rounded-xl border ${isDark ? 'border-[#00cbdd]/20 bg-[#00091b]/90 backdrop-blur-md' : 'border-gray-200 bg-white shadow-sm'}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Download className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-slate-600'}`} />
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('data_management')}
            </h2>
          </div>
          
          <div className="space-y-6">
            {/* Export Data */}
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-900/40 border border-gray-800' : 'bg-gray-50 border border-gray-200'
            }`}>
              <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('export_data')}
              </h3>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('export_data_desc')}
              </p>
              <button
                onClick={handleExportData}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  isDark 
                    ? 'border border-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('request_data_export')}
              </button>
            </div>
            
            {/* Delete Account */}
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-red-900/20 border border-red-900/30' : 'bg-red-50 border border-red-100'
            }`}>
              <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('delete_account')}
              </h3>
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('delete_account_desc')}
              </p>
              
              {showDeleteConfirm ? (
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg flex items-start gap-2 ${
                    isDark ? 'bg-red-900/30' : 'bg-red-100'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                    <div>
                      <p className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                        {t('delete_warning')}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-red-300' : 'text-red-600'}`}>
                        {t('delete_warning_desc')}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="delete-confirm" className={`block text-sm font-medium mb-1 ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                      {t('type_delete_confirm')}
                    </label>
                    <input
                      type="text"
                      id="delete-confirm"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className={`block w-full px-3 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-red-900/20 border border-red-900/30 text-white placeholder-red-300/50'
                          : 'bg-white border border-red-200 text-gray-900 placeholder-red-300'
                      } focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="DELETE"
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                        isDark 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {t('cancel')}
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-3 py-1.5 rounded text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                    >
                      {t('permanently_delete_account')}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-1.5 rounded text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  {t('delete_account')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help & Support Note */}
      <div className={`p-4 rounded-xl flex items-start gap-3 ${
        isDark 
          ? 'bg-blue-500/10 border border-blue-500/20'
          : 'bg-blue-50 border border-blue-100'
      }`}>
        <HelpCircle className={`h-5 w-5 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
        <div>
          <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            {t('need_account_help')}
          </p>
          <Link 
            href="/dashboard/support"
            className={`inline-block mt-2 text-sm font-medium ${isDark ? 'text-[#00cbdd] hover:underline' : 'text-blue-600 hover:underline'}`}
          >
            {t('contactSupport')}
          </Link>
        </div>
      </div>
    </div>
  );
} 