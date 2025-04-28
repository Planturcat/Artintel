'use client';

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User,
  Tag,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  MessageSquare,
  Send,
  BookmarkCheck
} from 'lucide-react';
import Link from 'next/link';

// Mock tutorials data - this should match the data in the tutorials list page
const tutorials = [
  {
    id: 'intro-platform',
    title: 'Introduction to ArtIntel LLMs Platform',
    thumbnail: '/images/tutorials/intro.jpg',
    duration: '12:45',
    date: '2023-10-15',
    category: 'Getting Started',
    instructor: 'Alex Johnson',
    description: 'A comprehensive overview of the ArtIntel LLMs platform and its key features. This tutorial covers the dashboard layout, main functionality, and how to navigate between different sections. Perfect for new users who want to get familiar with the platform.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 1245,
    likes: 89,
    dislikes: 3
  },
  {
    id: 'model-selection',
    title: 'How to Choose the Right Model for Your Task',
    thumbnail: '/images/tutorials/model-selection.jpg',
    duration: '18:30',
    date: '2023-10-12',
    category: 'Models',
    instructor: 'Sarah Miller',
    description: 'Learn the criteria for selecting the most appropriate model for different use cases. This tutorial explains the tradeoffs between model size, performance, and cost, helping you make informed decisions for your AI projects.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 987,
    likes: 76,
    dislikes: 2
  },
  {
    id: 'fine-tuning-basics',
    title: 'Fine-Tuning Basics: Your First Custom Model',
    thumbnail: '/images/tutorials/fine-tuning.jpg',
    duration: '24:15',
    date: '2023-10-10',
    category: 'Fine-Tuning',
    instructor: 'Michael Chen',
    description: 'Step-by-step guide to fine-tuning your first model on custom data. Learn how to prepare your dataset, configure training parameters, and evaluate the results of your fine-tuned model.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 1532,
    likes: 124,
    dislikes: 5
  },
  {
    id: 'deployment-strategies',
    title: 'Model Deployment Strategies',
    thumbnail: '/images/tutorials/deployment.jpg',
    duration: '20:50',
    date: '2023-10-08',
    category: 'Deployment',
    instructor: 'Emily Rodriguez',
    description: 'Explore different deployment options and best practices for production environments. This tutorial covers API endpoints, scaling considerations, and monitoring your deployed models.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 876,
    likes: 67,
    dislikes: 4
  },
  {
    id: 'data-preparation',
    title: 'Data Preparation for Training',
    thumbnail: '/images/tutorials/data-prep.jpg',
    duration: '15:20',
    date: '2023-10-05',
    category: 'Data Integration',
    instructor: 'David Kim',
    description: 'Learn how to prepare and format your data for optimal training results. This tutorial covers data cleaning, formatting, and validation techniques to ensure your training data is high quality.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 1089,
    likes: 92,
    dislikes: 1
  },
  {
    id: 'performance-monitoring',
    title: 'Monitoring Model Performance in Production',
    thumbnail: '/images/tutorials/monitoring.jpg',
    duration: '22:10',
    date: '2023-10-03',
    category: 'Analytics',
    instructor: 'Lisa Wang',
    description: 'Set up comprehensive monitoring for your deployed models. Learn how to track key metrics, set up alerts, and respond to performance issues in production environments.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 765,
    likes: 58,
    dislikes: 3
  },
  {
    id: 'advanced-fine-tuning',
    title: 'Advanced Fine-Tuning Techniques',
    thumbnail: '/images/tutorials/advanced-ft.jpg',
    duration: '28:45',
    date: '2023-09-28',
    category: 'Advanced Techniques',
    instructor: 'James Wilson',
    description: 'Explore advanced strategies to improve fine-tuning results for complex tasks. This tutorial covers techniques like learning rate scheduling, gradient accumulation, and mixed precision training.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 1342,
    likes: 115,
    dislikes: 7
  },
  {
    id: 'multi-gpu-training',
    title: 'Multi-GPU Training for Large Models',
    thumbnail: '/images/tutorials/multi-gpu.jpg',
    duration: '26:30',
    date: '2023-09-25',
    category: 'Advanced Techniques',
    instructor: 'Sophia Martinez',
    description: 'Learn how to set up and optimize multi-GPU training for large language models. This tutorial covers distributed training strategies, data parallelism, and performance optimization.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    views: 987,
    likes: 84,
    dislikes: 2
  }
];

// Sample comments data
const sampleComments = {
  'intro-platform': [
    {
      id: 'comment-1',
      user: 'Rachel Kim',
      avatar: '/images/avatars/avatar-1.jpg',
      date: '2023-10-18T14:32:00Z',
      content: 'This tutorial was incredibly helpful for getting started! I especially liked the section on dashboard navigation.',
      likes: 5
    },
    {
      id: 'comment-2',
      user: 'Thomas Wright',
      avatar: '/images/avatars/avatar-2.jpg',
      date: '2023-10-17T09:15:00Z',
      content: 'Great introduction! Could you also cover more about the subscription tiers in a future tutorial?',
      likes: 3
    }
  ],
  'model-selection': [
    {
      id: 'comment-1',
      user: 'Aisha Patel',
      avatar: '/images/avatars/avatar-3.jpg',
      date: '2023-10-15T16:20:00Z',
      content: 'The comparison between different model sizes was very informative. This helped me decide which model to use for my NLP project.',
      likes: 7
    }
  ],
  'fine-tuning-basics': [
    {
      id: 'comment-1',
      user: 'Marcus Johnson',
      avatar: '/images/avatars/avatar-4.jpg',
      date: '2023-10-12T11:45:00Z',
      content: 'I followed this tutorial step by step and successfully fine-tuned my first model! The data preparation section was particularly helpful.',
      likes: 9
    },
    {
      id: 'comment-2',
      user: 'Sophia Lee',
      avatar: '/images/avatars/avatar-5.jpg',
      date: '2023-10-11T15:30:00Z',
      content: 'Could you explain more about hyperparameter selection? I am still a bit confused about learning rates.',
      likes: 4
    },
    {
      id: 'comment-3',
      user: 'Carlos Mendez',
      avatar: '/images/avatars/avatar-6.jpg',
      date: '2023-10-10T08:22:00Z',
      content: 'Excellent tutorial! I would love to see an advanced version covering more complex fine-tuning scenarios.',
      likes: 6
    }
  ]
};

// Default comments for tutorials without specific comments
const defaultComments = [
  {
    id: 'default-comment-1',
    user: 'ArtIntel User',
    avatar: '/images/avatars/default.jpg',
    date: '2023-10-10T10:00:00Z',
    content: 'Great tutorial! Looking forward to more content like this.',
    likes: 2
  }
];

export default function TutorialDetailPage({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [tutorial, setTutorial] = useState<any>(null);
  const [relatedTutorials, setRelatedTutorials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  
  useEffect(() => {
    // Find the tutorial with the matching ID
    const foundTutorial = tutorials.find(t => t.id === params.id);
    
    if (foundTutorial) {
      setTutorial(foundTutorial);
      setLikesCount(foundTutorial.likes);
      setDislikesCount(foundTutorial.dislikes);
      
      // Find related tutorials in the same category
      const related = tutorials
        .filter(t => t.category === foundTutorial.category && t.id !== foundTutorial.id)
        .slice(0, 3);
      
      setRelatedTutorials(related);
      
      // Load comments for this tutorial
      const tutorialComments = sampleComments[params.id as keyof typeof sampleComments] || defaultComments;
      setComments(tutorialComments);
    }
    
    // Check if tutorial is bookmarked in localStorage (in a real app, this would be from an API)
    const bookmarkedTutorials = localStorage.getItem('bookmarkedTutorials');
    if (bookmarkedTutorials) {
      const bookmarks = JSON.parse(bookmarkedTutorials);
      setIsBookmarked(bookmarks.includes(params.id));
    }
    
    setIsLoading(false);
  }, [params.id]);

  const handleBookmarkToggle = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    // Save bookmark state to localStorage (in a real app, this would be an API call)
    const bookmarkedTutorials = localStorage.getItem('bookmarkedTutorials');
    let bookmarks = bookmarkedTutorials ? JSON.parse(bookmarkedTutorials) : [];
    
    if (newBookmarkState) {
      if (!bookmarks.includes(params.id)) {
        bookmarks.push(params.id);
      }
    } else {
      bookmarks = bookmarks.filter((id: string) => id !== params.id);
    }
    
    localStorage.setItem('bookmarkedTutorials', JSON.stringify(bookmarks));
  };

  const handleLikeToggle = () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikesCount(prev => prev - 1);
    }
    
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleDislikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    }
    
    if (isDisliked) {
      setIsDisliked(false);
      setDislikesCount(prev => prev - 1);
    } else {
      setIsDisliked(true);
      setDislikesCount(prev => prev + 1);
    }
  };

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    // Add new comment to the list (in a real app, this would be an API call)
    const newComment = {
      id: `comment-${Date.now()}`,
      user: 'Current User',
      avatar: '/images/avatars/default.jpg',
      date: new Date().toISOString(),
      content: commentText,
      likes: 0
    };
    
    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className={`w-12 h-12 rounded-full border-4 ${
          isDark ? 'border-[#00cbdd] border-t-transparent' : 'border-blue-500 border-t-transparent'
        } animate-spin`}></div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Tutorial Not Found
        </h2>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          The tutorial you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/dashboard/support/tutorials">
          <button className={`px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#00cbdd] text-white hover:bg-[#00cbdd]/90'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-colors duration-200`}>
            Back to Tutorials
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center">
        <Link href="/dashboard/support/tutorials">
          <button className={`mr-4 p-2 rounded-full ${
            isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
          } transition-colors duration-200`}>
            <ArrowLeft className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {tutorial.title}
          </h1>
          <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="flex items-center mr-4">
              <User className="h-4 w-4 mr-1" />
              {tutorial.instructor}
            </span>
            <span className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              {tutorial.date}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {tutorial.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player and Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl overflow-hidden ${
              isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="aspect-video relative">
              <video 
                className="w-full h-full"
                poster="https://placehold.co/1280x720/00031b/00cbdd?text=ArtIntel+Tutorial"
                controls
                preload="metadata"
              >
                <source src={tutorial.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Actions */}
            <div className="p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button 
                    onClick={handleLikeToggle}
                    className={`p-2 rounded-full ${
                      isDark 
                        ? isLiked ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#00cbdd]/10 text-white' 
                        : isLiked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
                    } transition-colors duration-200`}
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </button>
                  <span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {likesCount}
                  </span>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={handleDislikeToggle}
                    className={`p-2 rounded-full ${
                      isDark 
                        ? isDisliked ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#00cbdd]/10 text-white' 
                        : isDisliked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
                    } transition-colors duration-200`}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </button>
                  <span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {dislikesCount}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className={`p-2 rounded-full ${
                  isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
                } transition-colors duration-200`}>
                  <Share2 className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-700'}`} />
                </button>
                <button 
                  onClick={handleBookmarkToggle}
                  className={`p-2 rounded-full ${
                    isDark 
                      ? isBookmarked ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-[#00cbdd]/10 text-white' 
                      : isBookmarked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'
                  } transition-colors duration-200`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-5 w-5" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Tutorial Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              About this tutorial
            </h2>
            <div className="mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isDark ? 'bg-[#00cbdd]/10 text-[#00cbdd]' : 'bg-blue-100 text-blue-800'
              }`}>
                {tutorial.category}
              </span>
              <span className={`ml-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {tutorial.views} views
              </span>
            </div>
            <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {tutorial.description}
            </p>
          </motion.div>
          
          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center mb-6">
              <MessageSquare className={`h-5 w-5 mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`} />
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Comments ({comments.length})
              </h2>
            </div>
            
            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className={`p-4 rounded-lg mb-4 ${
                isDark ? 'bg-[#00052c]/80 border border-[#00cbdd]/10' : 'bg-gray-50 border border-gray-100'
              }`}>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className={`w-full p-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#000314] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                      : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd] resize-none`}
                />
                <div className="flex justify-end mt-2">
                  <button 
                    type="submit"
                    disabled={!commentText.trim()}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      commentText.trim() 
                        ? isDark 
                          ? 'bg-[#00cbdd] text-white hover:bg-[#00cbdd]/90'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                        : isDark
                          ? 'bg-[#00052c] text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    } transition-colors duration-200`}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </button>
                </div>
              </div>
            </form>
            
            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + (index * 0.05) }}
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-[#00052c]/80 border border-[#00cbdd]/10' : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <div className={`w-10 h-10 rounded-full bg-gray-300 overflow-hidden ${
                          isDark ? 'border border-[#00cbdd]/20' : 'border border-gray-200'
                        }`}>
                          {/* Use a placeholder avatar */}
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {comment.user.charAt(0)}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {comment.user}
                          </h4>
                          <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatCommentDate(comment.date)}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {comment.content}
                        </p>
                        <div className="flex items-center">
                          <button className={`p-1 rounded-full ${
                            isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
                          } transition-colors duration-200`}>
                            <ThumbsUp className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          </button>
                          <span className={`ml-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {comment.likes}
                          </span>
                          <button className={`ml-2 p-1 rounded-full ${
                            isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
                          } transition-colors duration-200`}>
                            <ThumbsDown className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                          </button>
                          <button className={`ml-auto text-xs ${
                            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                          } transition-colors duration-200`}>
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={`p-6 rounded-lg text-center ${
                isDark ? 'bg-[#00052c]/80 border border-[#00cbdd]/10' : 'bg-gray-50 border border-gray-100'
              }`}>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Sidebar - Related Tutorials */}
        <div className="space-y-6">
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Related Tutorials
          </h3>
          
          {relatedTutorials.length > 0 ? (
            relatedTutorials.map((relatedTutorial, index) => (
              <motion.div
                key={relatedTutorial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + (index * 0.1) }}
              >
                <Link href={`/dashboard/support/tutorials/${relatedTutorial.id}`}>
                  <div className={`p-4 rounded-xl ${
                    isDark 
                      ? 'bg-[#00031b]/90 border border-[#00cbdd]/20 hover:border-[#00cbdd]/50'
                      : 'bg-white border border-gray-200 hover:border-[#00cbdd]/50'
                  } transition-all duration-200 hover:shadow-lg`}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Thumbnail */}
                      <div className="sm:w-1/3 aspect-video relative rounded-lg overflow-hidden bg-gray-800">
                        <video 
                          className="absolute inset-0 w-full h-full object-cover"
                          poster="https://placehold.co/600x400/00031b/00cbdd?text=Related"
                          preload="none"
                        >
                          <source src={relatedTutorial.videoUrl} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#00cbdd]/80 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="sm:w-2/3">
                        <h4 className={`text-base font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {relatedTutorial.title}
                        </h4>
                        <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {relatedTutorial.instructor} • {relatedTutorial.duration}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-[#00cbdd]/10 text-[#00cbdd]' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {relatedTutorial.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className={`p-6 rounded-xl ${
              isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
            }`}>
              <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                No related tutorials found
              </p>
            </div>
          )}
          
          {/* More Tutorials Button */}
          <Link href="/dashboard/support/tutorials">
            <button className={`w-full px-4 py-2 rounded-lg ${
              isDark 
                ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white hover:bg-[#00052c]'
                : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
            } transition-colors duration-200`}>
              Browse All Tutorials
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 