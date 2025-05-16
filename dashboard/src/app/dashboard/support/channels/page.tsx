'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowLeft, 
  MessageCircle, 
  Mail, 
  Ticket, 
  Phone, 
  Video, 
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// Support channels with translation keys instead of hardcoded text
const getSupportChannels = (t: (key: string) => string) => [
  {
    id: 'live-chat',
    titleKey: 'live_chat',
    descriptionKey: 'live_chat_desc',
    icon: MessageCircle,
    color: 'from-blue-500 to-cyan-400',
    availabilityKey: 'live_chat_availability',
    actionKey: 'live_chat_action',
    link: '/dashboard/support/channels/chat',
    tier: 'pro'
  },
  {
    id: 'email',
    titleKey: 'email_support',
    descriptionKey: 'email_support_desc',
    icon: Mail,
    color: 'from-purple-500 to-pink-400',
    availabilityKey: 'email_support_availability',
    actionKey: 'email_support_action',
    link: '/dashboard/support/channels/email',
    tier: 'free'
  },
  {
    id: 'tickets',
    titleKey: 'support_tickets',
    descriptionKey: 'support_tickets_desc',
    icon: Ticket,
    color: 'from-green-500 to-emerald-400',
    availabilityKey: 'support_tickets_availability',
    actionKey: 'support_tickets_action',
    link: '/dashboard/support/channels/tickets',
    tier: 'free'
  },
  {
    id: 'phone',
    titleKey: 'phone_support',
    descriptionKey: 'phone_support_desc',
    icon: Phone,
    color: 'from-orange-500 to-amber-400',
    availabilityKey: 'phone_support_availability',
    actionKey: 'phone_support_action',
    link: '/dashboard/support/channels/phone',
    tier: 'enterprise'
  },
  {
    id: 'video',
    titleKey: 'video_consultations',
    descriptionKey: 'video_consultations_desc',
    icon: Video,
    color: 'from-red-500 to-rose-400',
    availabilityKey: 'video_consultations_availability',
    actionKey: 'video_consultations_action',
    link: '/dashboard/support/channels/video',
    tier: 'enterprise'
  }
];

export default function SupportChannelsPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  
  // Mock user tier - in a real app, this would come from auth context
  const userTier = 'pro'; // 'free', 'pro', or 'enterprise'

  // Get translated support channels
  const supportChannels = getSupportChannels(t);

  // Helper function to check if a channel is available for the user's tier
  const isChannelAvailable = (channelTier: string) => {
    if (channelTier === 'free') return true;
    if (channelTier === 'pro' && (userTier === 'pro' || userTier === 'enterprise')) return true;
    if (channelTier === 'enterprise' && userTier === 'enterprise') return true;
    return false;
  };

  // Function to handle dynamic text in translations
  const formatDynamicText = (key: string, replacements: Record<string, string>) => {
    let translatedText = t(key);
    
    Object.entries(replacements).forEach(([placeholder, value]) => {
      translatedText = translatedText.replace(`{${placeholder}}`, value);
    });
    
    return translatedText;
  };

  // Helper function to get capitalized tier name
  const getCapitalizedTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center">
        <Link href="/dashboard/support">
          <button className={`mr-4 p-2 rounded-full ${
            isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
          } transition-colors duration-200`}>
            <ArrowLeft className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('support_channels_title')}
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('support_channels_subtitle')}
          </p>
        </div>
      </div>

      {/* Support Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {supportChannels.map((channel, index) => {
          const isAvailable = isChannelAvailable(channel.tier);
          
          return (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`p-6 rounded-xl ${
                isDark 
                  ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
                  : 'bg-white border border-gray-200'
              } transition-all duration-200 ${isAvailable ? 'hover:shadow-lg' : 'opacity-70'}`}>
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${channel.color} flex items-center justify-center mr-4 flex-shrink-0`}>
                    <channel.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t(channel.titleKey)}
                    </h3>
                    <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t(channel.descriptionKey)}
                    </p>
                    <div className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="inline-flex items-center">
                        {t(channel.availabilityKey)}
                      </span>
                    </div>
                    
                    {isAvailable ? (
                      <Link href={channel.link}>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white font-medium hover:from-[#00cbdd]/90 hover:to-blue-500/90 transition-all duration-200 flex items-center">
                          {t(channel.actionKey)}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </button>
                      </Link>
                    ) : (
                      <div className={`px-4 py-2 rounded-lg ${
                        isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
                      } text-sm inline-flex items-center`}>
                        {formatDynamicText('available_with_tier', { tier: getCapitalizedTierName(channel.tier) })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Support Hours */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('support_hours')}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('standard_support')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('standard_support_hours')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('pro_support')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('pro_support_hours')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('enterprise_support')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('enterprise_support_hours')}
            </span>
          </div>
        </div>
      </div>

      {/* Response Times */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('expected_response_times')}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('free_tier')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('free_tier_response')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('pro_tier')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('pro_tier_response')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('enterprise_tier')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('enterprise_tier_response')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {t('critical_issues')}
            </span>
            <span className={isDark ? 'text-white' : 'text-gray-900'}>
              {t('critical_issues_response')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 