'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Search, 
  Book, 
  FileText, 
  HelpCircle, 
  Code, 
  Server, 
  Database,
  ChevronRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';

// Knowledge base categories
const categories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: Book,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'models',
    name: 'Models',
    icon: FileText,
    color: 'from-purple-500 to-pink-400'
  },
  {
    id: 'fine-tuning',
    name: 'Fine-Tuning',
    icon: Code,
    color: 'from-green-500 to-emerald-400'
  },
  {
    id: 'deployment',
    name: 'Deployment',
    icon: Server,
    color: 'from-orange-500 to-amber-400'
  },
  {
    id: 'data-integration',
    name: 'Data Integration',
    icon: Database,
    color: 'from-red-500 to-rose-400'
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    icon: HelpCircle,
    color: 'from-indigo-500 to-violet-400'
  }
];

// Mock articles data
const articles = [
  {
    id: 'getting-started-guide',
    title: 'Getting Started with ArtIntel LLMs',
    category: 'getting-started',
    summary: 'Learn the basics of using the ArtIntel LLMs platform',
    readTime: '5 min read',
    date: '2023-10-15'
  },
  {
    id: 'model-selection',
    title: 'How to Choose the Right Model',
    category: 'models',
    summary: 'Guidelines for selecting the appropriate model for your use case',
    readTime: '8 min read',
    date: '2023-10-12'
  },
  {
    id: 'fine-tuning-basics',
    title: 'Fine-Tuning Your First Model',
    category: 'fine-tuning',
    summary: 'Step-by-step guide to fine-tuning a model on your custom data',
    readTime: '12 min read',
    date: '2023-10-10'
  },
  {
    id: 'deployment-options',
    title: 'Understanding Model Deployment Options',
    category: 'deployment',
    summary: 'Overview of different deployment strategies and their trade-offs',
    readTime: '10 min read',
    date: '2023-10-08'
  },
  {
    id: 'data-preparation',
    title: 'Preparing Data for Training',
    category: 'data-integration',
    summary: 'Best practices for preparing and formatting your training data',
    readTime: '7 min read',
    date: '2023-10-05'
  },
  {
    id: 'common-errors',
    title: 'Troubleshooting Common Errors',
    category: 'troubleshooting',
    summary: 'Solutions for frequently encountered issues and error messages',
    readTime: '9 min read',
    date: '2023-10-03'
  },
  {
    id: 'advanced-fine-tuning',
    title: 'Advanced Fine-Tuning Techniques',
    category: 'fine-tuning',
    summary: 'Advanced strategies to improve fine-tuning results',
    readTime: '15 min read',
    date: '2023-09-28'
  },
  {
    id: 'monitoring-performance',
    title: 'Monitoring Model Performance',
    category: 'deployment',
    summary: 'How to track and analyze your deployed model performance',
    readTime: '11 min read',
    date: '2023-09-25'
  }
];

export default function KnowledgeBasePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter articles based on search query and selected category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
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
              Knowledge Base
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Browse articles, guides, and documentation
            </p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className={`mt-4 relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
              isDark 
                ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white placeholder-gray-400'
                : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
            placeholder="Search for articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            selectedCategory === null
              ? 'bg-[#00cbdd] text-white'
              : isDark
                ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white hover:bg-[#00cbdd]/20'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-[#00cbdd] text-white'
                : isDark
                  ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white hover:bg-[#00cbdd]/20'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => {
            const category = categories.find(c => c.id === article.category);
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/dashboard/support/knowledge-base/${article.id}`}>
                  <div className={`p-5 rounded-xl ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
                      : 'bg-white border border-gray-200 hover:border-[#00cbdd]/50'
                  } transition-all duration-200 hover:shadow-lg`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          {category && (
                            <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} text-white mr-2`}>
                              {category.name}
                            </div>
                          )}
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {article.readTime} • {article.date}
                          </span>
                        </div>
                        <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {article.title}
                        </h3>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {article.summary}
                        </p>
                      </div>
                      <ChevronRight className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <div className={`p-8 text-center rounded-xl ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}>
            <HelpCircle className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No articles found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 