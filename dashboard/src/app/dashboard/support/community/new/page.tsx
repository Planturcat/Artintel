'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Send,
  Tag,
  X
} from 'lucide-react';
import Link from 'next/link';

// Categories for posts
const categories = [
  { id: 'discussions', name: 'Discussion' },
  { id: 'questions', name: 'Question' },
  { id: 'tutorials', name: 'Tutorial' },
  { id: 'code-snippets', name: 'Code Snippet' },
  { id: 'events', name: 'Event' },
  { id: 'showcase', name: 'Showcase' }
];

export default function NewPostPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle tag addition
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 5) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  // Handle tag removal
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // In a real app, we would redirect to the new post
      window.location.href = '/dashboard/support/community';
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center">
        <Link href="/dashboard/support/community">
          <button className={`mr-4 p-2 rounded-full ${
            isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
          } transition-colors duration-200`}>
            <ArrowLeft className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create New Post
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Share your knowledge, ask questions, or showcase your work
          </p>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`p-6 rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                    : 'bg-white border border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                placeholder="Give your post a descriptive title"
              />
            </div>
            
            {/* Category */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                    : 'bg-white border border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
              >
                <option value="" disabled>Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            {/* Content */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={10}
                className={`w-full px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                    : 'bg-white border border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                placeholder="Write your post content here... You can use markdown for formatting."
              />
            </div>
            
            {/* Tags */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Tags (up to 5)
              </label>
              <div className="flex items-center">
                <div className="relative flex-1 mr-2">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    className={`w-full pl-10 pr-3 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                        : 'bg-white border border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                    placeholder="Add a tag and press Enter"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || tags.length >= 5}
                  className={`px-4 py-2 rounded-lg ${
                    !tagInput.trim() || tags.length >= 5
                      ? isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-500'
                      : 'bg-[#00cbdd] text-white hover:bg-[#00cbdd]/90'
                  } transition-all duration-200`}
                >
                  Add
                </button>
              </div>
              
              {/* Tags Display */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {tags.map((tag, index) => (
                    <div 
                      key={index} 
                      className={`px-2 py-1 rounded-md text-sm flex items-center ${
                        isDark 
                          ? 'bg-[#00cbdd]/10 text-[#00cbdd]' 
                          : 'bg-[#00cbdd]/10 text-[#00cbdd]'
                      }`}
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 p-0.5 rounded-full hover:bg-[#00cbdd]/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-lg flex items-center ${
                  isSubmitting
                    ? isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600'
                    : 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00cbdd]/90 hover:to-blue-500/90'
                } transition-all duration-200`}
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2">Posting</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                  </>
                ) : (
                  <>
                    Post
                    <Send className="h-4 w-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 