'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Play,
  BookOpen,
  Code,
  Award,
  Search,
  Clock,
  CheckCircle,
  Layers,
  Database,
  Zap,
  Monitor,
  PieChart,
  BarChart4,
  Rocket,
  LightbulbIcon
} from 'lucide-react';
import Link from 'next/link';

// Tutorial categories
const categories = [
  { id: 'all', name: 'All Tutorials' },
  { id: 'getting-started', name: 'Getting Started', icon: <Rocket className="h-4 w-4" /> },
  { id: 'model-basics', name: 'Model Basics', icon: <LightbulbIcon className="h-4 w-4" /> },
  { id: 'fine-tuning', name: 'Fine-Tuning', icon: <Layers className="h-4 w-4" /> },
  { id: 'data-integration', name: 'Data Integration', icon: <Database className="h-4 w-4" /> },
  { id: 'deployment', name: 'Deployment', icon: <Zap className="h-4 w-4" /> },
  { id: 'monitoring', name: 'Monitoring', icon: <Monitor className="h-4 w-4" /> },
  { id: 'analytics', name: 'Analytics', icon: <PieChart className="h-4 w-4" /> },
  { id: 'advanced', name: 'Advanced', icon: <BarChart4 className="h-4 w-4" /> }
];

// Skill levels
const skillLevels = [
  { id: 'beginner', name: 'Beginner', color: 'bg-green-500' },
  { id: 'intermediate', name: 'Intermediate', color: 'bg-blue-500' },
  { id: 'advanced', name: 'Advanced', color: 'bg-purple-500' },
  { id: 'expert', name: 'Expert', color: 'bg-red-500' }
];

// Mock tutorials data
const tutorials = [
  {
    id: 'tutorial-1',
    title: 'Getting Started with Artintel',
    category: 'getting-started',
    description: 'Learn the basics of the Artintel platform, set up your account, and understand the key concepts.',
    duration: 20, // minutes
    skillLevel: 'beginner',
    steps: 5,
    completionRate: 87, // percentage of users who complete this tutorial
    image: '/images/tutorials/getting-started.jpg',
    isNew: false,
    isFeatured: true
  },
  {
    id: 'tutorial-2',
    title: 'Creating Your First AI Model',
    category: 'model-basics',
    description: 'Step-by-step guide to create, configure, and deploy your first AI model using Artintel.',
    duration: 30,
    skillLevel: 'beginner',
    steps: 8,
    completionRate: 72,
    image: '/images/tutorials/first-model.jpg',
    isNew: false,
    isFeatured: true
  },
  {
    id: 'tutorial-3',
    title: 'Fine-Tuning for Specialized Domains',
    category: 'fine-tuning',
    description: 'Learn advanced techniques for customizing models to perform better for specific industries and use cases.',
    duration: 45,
    skillLevel: 'intermediate',
    steps: 12,
    completionRate: 65,
    image: '/images/tutorials/fine-tuning.jpg',
    isNew: true,
    isFeatured: false
  },
  {
    id: 'tutorial-4',
    title: 'Data Preparation Best Practices',
    category: 'data-integration',
    description: 'Comprehensive guide to preparing, cleaning, and optimizing your training data for best results.',
    duration: 35,
    skillLevel: 'intermediate',
    steps: 10,
    completionRate: 68,
    image: '/images/tutorials/data-preparation.jpg',
    isNew: false,
    isFeatured: false
  },
  {
    id: 'tutorial-5',
    title: 'Deploying Models to Production',
    category: 'deployment',
    description: 'Best practices for deploying your models to production environments with monitoring and scaling.',
    duration: 40,
    skillLevel: 'advanced',
    steps: 9,
    completionRate: 58,
    image: '/images/tutorials/deployment.jpg',
    isNew: false,
    isFeatured: false
  },
  {
    id: 'tutorial-6',
    title: 'Setting Up Real-time Monitoring',
    category: 'monitoring',
    description: 'Configure monitoring systems to track model performance, usage, and errors in real-time.',
    duration: 30,
    skillLevel: 'intermediate',
    steps: 7,
    completionRate: 61,
    image: '/images/tutorials/monitoring.jpg',
    isNew: true,
    isFeatured: false
  },
  {
    id: 'tutorial-7',
    title: 'Advanced Analytics Dashboard',
    category: 'analytics',
    description: 'Create custom analytics dashboards to gain insights into your AI model performance and user behavior.',
    duration: 50,
    skillLevel: 'advanced',
    steps: 15,
    completionRate: 52,
    image: '/images/tutorials/analytics.jpg',
    isNew: false,
    isFeatured: false
  },
  {
    id: 'tutorial-8',
    title: 'Optimizing Model Performance',
    category: 'advanced',
    description: 'Advanced techniques for analyzing and improving model performance, speed, and accuracy.',
    duration: 60,
    skillLevel: 'expert',
    steps: 18,
    completionRate: 45,
    image: '/images/tutorials/performance.jpg',
    isNew: true,
    isFeatured: true
  }
];

export default function InteractiveTutorialsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<string | null>(null);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  
  // Filter tutorials
  const filteredTutorials = tutorials.filter(tutorial => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    
    // Filter by skill level
    const matchesSkillLevel = selectedSkillLevel === null || tutorial.skillLevel === selectedSkillLevel;
    
    // Filter by featured and new flags
    const matchesFeatured = !showFeaturedOnly || tutorial.isFeatured;
    const matchesNew = !showNewOnly || tutorial.isNew;
    
    return matchesSearch && matchesCategory && matchesSkillLevel && matchesFeatured && matchesNew;
  });

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
            Interactive Tutorials
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Hands-on learning experiences to help you master the platform
          </p>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`p-5 rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}
      >
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutorials by title or description"
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                : 'bg-white border border-gray-300 text-gray-900'
            } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
          />
        </div>
        
        {/* Category filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                selectedCategory === category.id
                  ? isDark 
                    ? 'bg-[#00cbdd] text-white' 
                    : 'bg-blue-500 text-white'
                  : isDark 
                    ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white hover:bg-[#00052c]' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {category.icon && <span className="mr-1.5">{category.icon}</span>}
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Additional filters */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {/* Skill Level filter */}
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Skill Level:</span>
            {skillLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedSkillLevel(selectedSkillLevel === level.id ? null : level.id)}
                className={`px-2 py-1 rounded-lg text-xs flex items-center ${
                  selectedSkillLevel === level.id
                    ? `${level.color} text-white` 
                    : isDark 
                      ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white' 
                      : 'bg-white border border-gray-300 text-gray-700'
                } transition-colors duration-200`}
              >
                {level.name}
              </button>
            ))}
          </div>
          
          {/* Featured filter */}
          <label className={`flex items-center gap-2 cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <input
              type="checkbox"
              checked={showFeaturedOnly}
              onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="form-checkbox rounded text-[#00cbdd] h-4 w-4 focus:ring-[#00cbdd] focus:ring-opacity-50"
            />
            <span className="text-sm">Featured Only</span>
          </label>
          
          {/* New filter */}
          <label className={`flex items-center gap-2 cursor-pointer ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <input
              type="checkbox"
              checked={showNewOnly}
              onChange={() => setShowNewOnly(!showNewOnly)}
              className="form-checkbox rounded text-[#00cbdd] h-4 w-4 focus:ring-[#00cbdd] focus:ring-opacity-50"
            />
            <span className="text-sm">New Only</span>
          </label>
        </div>
      </motion.div>

      {/* Tutorials Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial, index) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/dashboard/support/interactive/${tutorial.id}`}>
                <div className={`p-5 rounded-xl h-full ${
                  isDark 
                    ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/40'
                    : 'bg-white border border-gray-200 hover:border-blue-300'
                } transition-all duration-200 hover:shadow-lg`}>
                  {/* Tutorial Image Placeholder */}
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 relative mb-4">
                    <div className={`absolute inset-0 flex items-center justify-center ${
                      isDark ? 'bg-[#00052c]/50' : 'bg-gray-100'
                    }`}>
                      <BookOpen className={`h-10 w-10 ${isDark ? 'text-[#00cbdd]/70' : 'text-blue-400'}`} />
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm">
                        <Play className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      {tutorial.isNew && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                          New
                        </span>
                      )}
                      {tutorial.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500 text-white">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    {/* Skill level badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                        tutorial.skillLevel === 'beginner' ? 'bg-green-500' :
                        tutorial.skillLevel === 'intermediate' ? 'bg-blue-500' :
                        tutorial.skillLevel === 'advanced' ? 'bg-purple-500' :
                        'bg-red-500'
                      }`}>
                        {skillLevels.find(level => level.id === tutorial.skillLevel)?.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Category */}
                  <div className="mb-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                      isDark ? 'bg-[#00cbdd]/10 text-[#00cbdd]' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {categories.find(cat => cat.id === tutorial.category)?.icon && (
                        <span className="mr-1">
                          {categories.find(cat => cat.id === tutorial.category)?.icon}
                        </span>
                      )}
                      {categories.find(cat => cat.id === tutorial.category)?.name || tutorial.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {tutorial.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {tutorial.description}
                  </p>
                  
                  {/* Tutorial metadata */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <div className="flex flex-col items-center">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tutorial.duration}m
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-0.5" />
                        Duration
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tutorial.steps}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Layers className="h-3 w-3 mr-0.5" />
                        Steps
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {tutorial.completionRate}%
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CheckCircle className="h-3 w-3 mr-0.5" />
                        Completion
                      </div>
                    </div>
                  </div>
                  
                  {/* Start button */}
                  <button className={`mt-4 w-full px-4 py-2 rounded-lg flex items-center justify-center ${
                    isDark 
                      ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00cbdd]/90 hover:to-blue-500/90'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  } transition-colors duration-200 text-sm font-medium`}>
                    <Play className="h-4 w-4 mr-1.5" />
                    Start Tutorial
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        // No tutorials found
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-8 rounded-xl text-center ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}
        >
          <BookOpen className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            No tutorials found
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Try adjusting your search or filters to find interactive tutorials.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedSkillLevel(null);
              setShowFeaturedOnly(false);
              setShowNewOnly(false);
            }}
            className={`mt-4 px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20'
                : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
            } transition-colors duration-200 text-sm font-medium`}
          >
            Clear Filters
          </button>
        </motion.div>
      )}
    </div>
  );
} 