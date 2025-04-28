'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Search, 
  Play, 
  Clock, 
  Calendar, 
  Tag,
  ChevronRight,
  Filter
} from 'lucide-react';
import Link from 'next/link';

// Tutorial categories
const categories = [
  'Getting Started',
  'Models',
  'Fine-Tuning',
  'Deployment',
  'Data Integration',
  'Analytics',
  'Advanced Techniques'
];

// Mock tutorials data
const tutorials = [
  {
    id: 'intro-platform',
    title: 'Introduction to ArtIntel LLMs Platform',
    thumbnail: '/images/tutorials/intro.jpg',
    duration: '12:45',
    date: '2023-10-15',
    category: 'Getting Started',
    instructor: 'Alex Johnson',
    description: 'A comprehensive overview of the ArtIntel LLMs platform and its key features.'
  },
  {
    id: 'model-selection',
    title: 'How to Choose the Right Model for Your Task',
    thumbnail: '/images/tutorials/model-selection.jpg',
    duration: '18:30',
    date: '2023-10-12',
    category: 'Models',
    instructor: 'Sarah Miller',
    description: 'Learn the criteria for selecting the most appropriate model for different use cases.'
  },
  {
    id: 'fine-tuning-basics',
    title: 'Fine-Tuning Basics: Your First Custom Model',
    thumbnail: '/images/tutorials/fine-tuning.jpg',
    duration: '24:15',
    date: '2023-10-10',
    category: 'Fine-Tuning',
    instructor: 'Michael Chen',
    description: 'Step-by-step guide to fine-tuning your first model on custom data.'
  },
  {
    id: 'deployment-strategies',
    title: 'Model Deployment Strategies',
    thumbnail: '/images/tutorials/deployment.jpg',
    duration: '20:50',
    date: '2023-10-08',
    category: 'Deployment',
    instructor: 'Emily Rodriguez',
    description: 'Explore different deployment options and best practices for production environments.'
  },
  {
    id: 'data-preparation',
    title: 'Data Preparation for Training',
    thumbnail: '/images/tutorials/data-prep.jpg',
    duration: '15:20',
    date: '2023-10-05',
    category: 'Data Integration',
    instructor: 'David Kim',
    description: 'Learn how to prepare and format your data for optimal training results.'
  },
  {
    id: 'performance-monitoring',
    title: 'Monitoring Model Performance in Production',
    thumbnail: '/images/tutorials/monitoring.jpg',
    duration: '22:10',
    date: '2023-10-03',
    category: 'Analytics',
    instructor: 'Lisa Wang',
    description: 'Set up comprehensive monitoring for your deployed models.'
  },
  {
    id: 'advanced-fine-tuning',
    title: 'Advanced Fine-Tuning Techniques',
    thumbnail: '/images/tutorials/advanced-ft.jpg',
    duration: '28:45',
    date: '2023-09-28',
    category: 'Advanced Techniques',
    instructor: 'James Wilson',
    description: 'Explore advanced strategies to improve fine-tuning results for complex tasks.'
  },
  {
    id: 'multi-gpu-training',
    title: 'Multi-GPU Training for Large Models',
    thumbnail: '/images/tutorials/multi-gpu.jpg',
    duration: '26:30',
    date: '2023-09-25',
    category: 'Advanced Techniques',
    instructor: 'Sophia Martinez',
    description: 'Learn how to set up and optimize multi-GPU training for large language models.'
  }
];

export default function TutorialsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter tutorials based on search query and selected category
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? tutorial.category === selectedCategory : true;
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
              Video Tutorials
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Learn through visual guides and walkthroughs
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
            placeholder="Search for tutorials..."
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
            key={category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category
                ? 'bg-[#00cbdd] text-white'
                : isDark
                  ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 text-white hover:bg-[#00cbdd]/20'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tutorials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tutorial, index) => (
          <motion.div
            key={tutorial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/dashboard/support/tutorials/${tutorial.id}`}>
              <div className={`h-full rounded-xl overflow-hidden ${
                isDark 
                  ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
                  : 'bg-white border border-gray-200 hover:border-[#00cbdd]/50'
              } transition-all duration-200 hover:shadow-lg`}>
                {/* Thumbnail with play button overlay */}
                <div className="relative aspect-video bg-gray-800">
                  {/* Placeholder video element */}
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="https://placehold.co/600x400/00031b/00cbdd?text=ArtIntel+Tutorial"
                    controls={false}
                    preload="none"
                  >
                    <source 
                      src="https://www.w3schools.com/html/mov_bbb.mp4" 
                      type="video/mp4" 
                    />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-16 h-16 rounded-full bg-[#00cbdd]/80 flex items-center justify-center cursor-pointer hover:bg-[#00cbdd] transition-colors duration-200">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs flex items-center z-10">
                    <Clock className="h-3 w-3 mr-1" />
                    {tutorial.duration}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium bg-[#00cbdd]/10 text-[#00cbdd]`}>
                      {tutorial.category}
                    </span>
                    <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {tutorial.date}
                    </span>
                  </div>
                  <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {tutorial.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {tutorial.description}
                  </p>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Instructor: {tutorial.instructor}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTutorials.length === 0 && (
        <div className={`p-8 text-center rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <Play className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No tutorials found
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
} 