"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User,
  Camera,
  Mail,
  Phone,
  Building,
  Globe,
  Clock,
  Languages,
  Save,
  Trash2,
  AlertCircle
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

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  bio: string;
  timezone: string;
  language: string;
}

export default function ProfileSettingsPage() {
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const isDark = theme === 'dark';
  const { data: session, status } = useSession() as { data: ExtendedSession | null; status: string };
  
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    bio: '',
    timezone: 'UTC',
    language: 'en'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // Populate form with user data when session is available
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user.name || '',
        email: session.user.email || '',
        company: session.user.organization || ''
      }));
      
      if (session.user.image) {
        setProfileImage(session.user.image);
      }
    }
  }, [session]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Apply language change immediately when language dropdown changes
    if (name === 'language' && value !== language) {
      setLanguage(value as Language);
      toast.success(t('language_changed_successfully'));
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveImage = () => {
    setProfileImage(null);
    setImageFile(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update profile image if there's a new one
      if (imageFile) {
        // Here you would upload the image to your server/storage
        console.log('Image would be uploaded:', imageFile);
      }
      
      // No need to set language here as it's handled immediately on change
      
      toast.success(t('profile_updated_successfully'));
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(t('error_updating_profile'));
      setIsSubmitting(false);
    }
  };
  
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00cbdd]"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Profile Settings
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Manage your personal information and preferences
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className={`p-6 rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Profile Image
          </h2>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className={`w-24 h-24 rounded-full overflow-hidden border-2 ${isDark ? 'border-[#00cbdd]/50' : 'border-blue-500/50'}`}>
                {profileImage ? (
                  <Image 
                    src={profileImage} 
                    alt="Profile" 
                    width={96} 
                    height={96} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-[#00031b]' : 'bg-gray-100'}`}>
                    <User className={`h-12 w-12 ${isDark ? 'text-[#00cbdd]/50' : 'text-gray-400'}`} />
                  </div>
                )}
              </div>
              
              <label htmlFor="profile-image" className={`absolute -bottom-1 -right-1 p-1.5 rounded-full cursor-pointer ${
                isDark ? 'bg-[#00cbdd] text-[#00031b]' : 'bg-blue-500 text-white'
              }`}>
                <Camera className="h-4 w-4" />
                <input 
                  type="file" 
                  id="profile-image" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            <div className="space-y-2">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Upload a profile picture. JPG, PNG or GIF. Max 2MB.
              </p>
              
              <div className="flex gap-2">
                <label htmlFor="profile-image-btn" className={`px-3 py-1.5 text-sm rounded-lg cursor-pointer ${
                  isDark 
                    ? 'bg-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/30'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                } transition-colors duration-200`}>
                  Upload Image
                  <input 
                    type="file" 
                    id="profile-image-btn" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageChange}
                  />
                </label>
                
                {profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className={`px-3 py-1.5 text-sm rounded-lg ${
                      isDark 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-red-100 text-red-600 hover:bg-red-200'
                    } transition-colors duration-200`}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className={`p-6 rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Personal Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="Your full name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="your.email@example.com"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-400">
                Email cannot be changed. Contact support for assistance.
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="company" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Company / Organization
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="Your company name"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="website" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Website
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="bio" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                className={`block w-full px-3 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                    : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                placeholder="Tell us a bit about yourself..."
              />
              <p className="text-xs text-gray-400">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>
          </div>
        </div>
        
        {/* Preferences */}
        <div className={`p-6 rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="timezone" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Timezone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 rounded-lg appearance-none ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white'
                      : 'bg-white border border-gray-200 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                >
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="MST">MST (Mountain Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="CET">CET (Central European Time)</option>
                  <option value="JST">JST (Japan Standard Time)</option>
                  <option value="AEST">AEST (Australian Eastern Standard Time)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="language" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('interface_language')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Languages className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-4 py-2 rounded-md focus:ring-2 focus:outline-none ${
                    isDark
                      ? 'bg-gray-900/50 border-gray-700 text-white focus:ring-[#00cbdd]/20 focus:border-[#00cbdd]'
                      : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/20 focus:border-blue-500'
                  }`}
                >
                  <option value="en">{t('language_en')}</option>
                  <option value="es">{t('language_es')}</option>
                  <option value="fr">{t('language_fr')}</option>
                  <option value="de">{t('language_de')}</option>
                  <option value="ja">{t('language_ja')}</option>
                  <option value="zh">{t('language_zh')}</option>
                </select>
              </div>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('language_change_note')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Data Privacy Notice */}
        <div className={`p-4 rounded-lg flex items-start gap-3 ${
          isDark 
            ? 'bg-blue-500/10 border border-blue-500/20'
            : 'bg-blue-50 border border-blue-100'
        }`}>
          <AlertCircle className={`h-5 w-5 mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          <div>
            <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              Your profile information helps us personalize your experience. We respect your privacy and will never share your data with third parties without your consent.
            </p>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-[#00a2b8] text-white font-medium hover:from-[#00cbdd]/90 hover:to-[#00a2b8]/90 transition-all duration-200 flex items-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 