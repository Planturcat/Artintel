'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  Users, 
  Code, 
  HelpCircle, 
  Calendar, 
  FileText,
  ThumbsUp,
  MessageCircle,
  Eye,
  ChevronRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

// Community categories
const categories = [
  {
    id: 'discussions',
    name: 'Discussions',
    icon: MessageSquare,
    color: 'from-blue-500 to-cyan-400',
    count: 128
  },
  {
    id: 'questions',
    name: 'Q&A',
    icon: HelpCircle,
    color: 'from-purple-500 to-pink-400',
    count: 256
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    icon: FileText,
    color: 'from-green-500 to-emerald-400',
    count: 64
  },
  {
    id: 'code-snippets',
    name: 'Code Snippets',
    icon: Code,
    color: 'from-orange-500 to-amber-400',
    count: 92
  },
  {
    id: 'events',
    name: 'Events',
    icon: Calendar,
    color: 'from-red-500 to-rose-400',
    count: 18
  },
  {
    id: 'showcase',
    name: 'Showcase',
    icon: Users,
    color: 'from-indigo-500 to-violet-400',
    count: 45
  }
];

// Mock discussions data
const discussions = [
  {
    id: 'disc-1',
    title: 'Best practices for fine-tuning GPT models',
    category: 'discussions',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    replies: 24,
    views: 342,
    likes: 56,
    lastActivity: '2 hours ago',
    tags: ['fine-tuning', 'best-practices', 'gpt']
  },
  {
    id: 'qa-1',
    title: 'How to handle out-of-memory errors during training?',
    category: 'questions',
    author: {
      name: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    replies: 18,
    views: 215,
    likes: 32,
    lastActivity: '5 hours ago',
    tags: ['troubleshooting', 'training', 'memory-issues']
  },
  {
    id: 'tut-1',
    title: 'Creating a custom dataset for sentiment analysis',
    category: 'tutorials',
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    replies: 12,
    views: 189,
    likes: 45,
    lastActivity: '1 day ago',
    tags: ['dataset', 'sentiment-analysis', 'tutorial']
  },
  {
    id: 'code-1',
    title: 'Efficient data preprocessing pipeline for large datasets',
    category: 'code-snippets',
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    replies: 8,
    views: 156,
    likes: 37,
    lastActivity: '2 days ago',
    tags: ['preprocessing', 'python', 'efficiency']
  },
  {
    id: 'event-1',
    title: 'Upcoming Webinar: Advanced Techniques in Model Deployment',
    category: 'events',
    author: {
      name: 'ArtIntel Team',
      avatar: '/logo.png'
    },
    replies: 5,
    views: 210,
    likes: 28,
    lastActivity: '3 days ago',
    tags: ['webinar', 'deployment', 'advanced']
  },
  {
    id: 'show-1',
    title: 'Showcase: My custom chatbot for customer support',
    category: 'showcase',
    author: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    replies: 32,
    views: 278,
    likes: 89,
    lastActivity: '4 days ago',
    tags: ['showcase', 'chatbot', 'customer-support']
  }
];

export default function CommunityPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter discussions based on search query and selected category
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory ? discussion.category === selectedCategory : true;
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
              Community
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Connect with other users and share knowledge
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
            placeholder="Search discussions, questions, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <button
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`w-full h-full p-4 rounded-xl ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-br ' + category.color + ' text-white'
                  : isDark 
                    ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
                    : 'bg-white border border-gray-200 hover:border-[#00cbdd]/50'
              } transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center text-center">
                <category.icon className={`h-6 w-6 mb-2 ${
                  selectedCategory === category.id ? 'text-white' : isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'
                }`} />
                <h3 className={`text-sm font-medium ${
                  selectedCategory === category.id ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.name}
                </h3>
                <span className={`text-xs mt-1 ${
                  selectedCategory === category.id ? 'text-white/80' : isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {category.count}
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {selectedCategory 
            ? categories.find(c => c.id === selectedCategory)?.name 
            : 'Recent Discussions'}
        </h2>
        <Link href="/dashboard/support/community/new">
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white font-medium hover:from-[#00cbdd]/90 hover:to-blue-500/90 transition-all duration-200 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </button>
        </Link>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.length > 0 ? (
          filteredDiscussions.map((discussion) => {
            const category = categories.find(c => c.id === discussion.category);
            return (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/dashboard/support/community/${discussion.id}`}>
                  <div className={`p-5 rounded-xl ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
                      : 'bg-white border border-gray-200 hover:border-[#00cbdd]/50'
                  } transition-all duration-200 hover:shadow-lg`}>
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <img 
                            src={discussion.author.avatar} 
                            alt={discussion.author.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {discussion.author.name}
                          </span>
                          <span className={`mx-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {discussion.lastActivity}
                          </span>
                          {category && (
                            <>
                              <span className={`mx-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${category.color} text-white`}>
                                {category.name}
                              </div>
                            </>
                          )}
                        </div>
                        <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {discussion.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className={`px-2 py-1 rounded-md text-xs ${
                                isDark 
                                  ? 'bg-[#00cbdd]/10 text-[#00cbdd]' 
                                  : 'bg-[#00cbdd]/10 text-[#00cbdd]'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="flex items-center mr-4">
                            <MessageCircle className={`h-4 w-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {discussion.replies}
                            </span>
                          </div>
                          <div className="flex items-center mr-4">
                            <Eye className={`h-4 w-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {discussion.views}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className={`h-4 w-4 mr-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                              {discussion.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center">
                        <ChevronRight className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      </div>
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
            <MessageSquare className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No discussions found
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