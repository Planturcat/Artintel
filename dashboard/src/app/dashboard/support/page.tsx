'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Book, 
  Video, 
  MessageCircle, 
  Users, 
  Calendar, 
  HelpCircle, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

// Support categories with translation keys instead of hardcoded text
const getSupportCategories = (t: (key: string) => string) => [
  {
    key: 'knowledge_base',
    icon: Book,
    link: '/dashboard/support/knowledge-base',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    key: 'video_tutorials',
    icon: Video,
    link: '/dashboard/support/tutorials',
    color: 'from-purple-500 to-pink-400'
  },
  {
    key: 'community',
    icon: Users,
    link: '/dashboard/support/community',
    color: 'from-green-500 to-emerald-400'
  },
  {
    key: 'support_channels',
    icon: MessageCircle,
    link: '/dashboard/support/channels',
    color: 'from-orange-500 to-amber-400'
  },
  {
    key: 'events_&_webinars',
    icon: Calendar,
    link: '/dashboard/support/events',
    color: 'from-red-500 to-rose-400'
  },
  {
    key: 'ai_assistant',
    icon: HelpCircle,
    link: '/dashboard/support/assistant',
    color: 'from-indigo-500 to-violet-400'
  }
];

// Popular articles with translation keys
const getPopularArticles = (t: (key: string) => string) => [
  {
    titleKey: 'article_1',
    categoryKey: 'category_basics',
    link: '/dashboard/support/knowledge-base/getting-started'
  },
  {
    titleKey: 'article_2',
    categoryKey: 'category_fine-tuning',
    link: '/dashboard/support/knowledge-base/fine-tuning-basics'
  },
  {
    titleKey: 'article_3',
    categoryKey: 'category_deployment',
    link: '/dashboard/support/knowledge-base/deployment-options'
  },
  {
    titleKey: 'article_4',
    categoryKey: 'category_data_integration',
    link: '/dashboard/support/knowledge-base/custom-datasets'
  },
  {
    titleKey: 'article_5',
    categoryKey: 'category_analytics',
    link: '/dashboard/support/knowledge-base/performance-monitoring'
  }
];

export default function SupportPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get translated support categories and articles
  const supportCategories = getSupportCategories(t);
  const popularArticles = getPopularArticles(t);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('helpSupport')}
        </h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('findResourcesGetAssistance')}
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
            placeholder={t('searchHelpArticles')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {supportCategories.map((category, index) => (
          <motion.div
            key={category.key}
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
                  {t(category.key)}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t(`${category.key}_desc`)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Popular Articles */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`text-xl font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('popularArticles')}
        </h2>
        <div className="space-y-3">
          {popularArticles.map((article, index) => (
            <Link key={index} href={article.link}>
              <div className={`p-3 rounded-lg flex items-center justify-between ${
                isDark 
                  ? 'hover:bg-[#00cbdd]/10'
                  : 'hover:bg-gray-50'
              } transition-colors duration-200`}>
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t(article.titleKey)}
                  </h3>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t(article.categoryKey)}
                  </span>
                </div>
                <ChevronRight className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-gradient-to-br from-[#00cbdd]/20 to-blue-500/10 border border-[#00cbdd]/20'
          : 'bg-gradient-to-br from-[#00cbdd]/10 to-blue-500/5 border border-[#00cbdd]/10'
      }`}>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('needDirectAssistance')}
            </h2>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('supportTeamReady')}
            </p>
          </div>
          <Link href="/dashboard/support/contact">
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white font-medium hover:from-[#00cbdd]/90 hover:to-blue-500/90 transition-all duration-200">
              {t('contactSupport')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 