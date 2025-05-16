'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Eye,
  Send,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

// Mock discussions data - in a real app, this would come from an API
const discussions = [
  {
    id: 'disc-1',
    title: 'Best practices for fine-tuning GPT models',
    category: 'discussions',
    author: {
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    content: `# Fine-tuning Best Practices

When fine-tuning GPT models, I've found these approaches to be effective:

## 1. Data Preparation

- Ensure your training data is high quality and diverse
- Remove duplicates and contradictory examples
- Balance your dataset to avoid bias

## 2. Training Parameters

- Start with a low learning rate (3e-5 to 5e-5)
- Use a relatively small batch size (4-8)
- Monitor training and validation loss carefully

Has anyone else found effective strategies that differ from these?`,
    replies: [
      {
        id: 'reply-1',
        author: {
          name: 'Sarah Miller',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        content: "I've also found that starting with a smaller dataset of very high-quality examples works better than using a larger but noisier dataset. Quality over quantity!",
        timestamp: '2 days ago',
        likes: 12
      },
      {
        id: 'reply-2',
        author: {
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
        },
        content: "Great points! I'd add that for sequence classification tasks, I've had success with slightly higher learning rates (1e-4). Also, don't forget to experiment with different weight decay values.",
        timestamp: '1 day ago',
        likes: 8
      }
    ],
    date: '4 days ago',
    views: 342,
    likes: 56,
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
    content: `I keep running into OOM errors when training on my dataset with a large model. I've tried:

- Reducing batch size to 2
- Using gradient accumulation (4 steps)
- Enabling mixed precision training

Still getting errors on my 16GB GPU. Any other suggestions to reduce memory usage while keeping reasonable training times?`,
    replies: [
      {
        id: 'reply-1',
        author: {
          name: 'David Kim',
          avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
        },
        content: "Have you tried DeepSpeed? It has some excellent memory optimizations. Also, gradient checkpointing can dramatically reduce memory usage at the cost of a bit more computation time.",
        timestamp: '3 days ago',
        likes: 15
      }
    ],
    date: '5 days ago',
    views: 215,
    likes: 32,
    tags: ['troubleshooting', 'training', 'memory-issues']
  }
];

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [discussion, setDiscussion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // In a real app, we would fetch the discussion data from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundDiscussion = discussions.find(d => d.id === params.id);
      setDiscussion(foundDiscussion || discussions[0]); // Use first mock discussion as fallback
      setIsLoading(false);
    }, 500);
  }, [params.id]);
  
  // Handle reply submission
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would post the reply to an API
      const newReply = {
        id: `reply-${Date.now()}`,
        author: {
          name: 'Current User',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        },
        content: replyContent,
        timestamp: 'Just now',
        likes: 0
      };
      
      setDiscussion({
        ...discussion,
        replies: [...discussion.replies, newReply]
      });
      
      setReplyContent('');
      setIsSubmitting(false);
    }, 1000);
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
            {isLoading ? 'Loading...' : discussion?.title || 'Discussion'}
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Community Discussion
          </p>
        </div>
      </div>

      {isLoading ? (
        // Loading skeleton
        <div className={`p-6 rounded-xl ${
          isDark 
            ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <div className="animate-pulse space-y-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-gray-300 h-10 w-10"></div>
              <div className="h-4 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ) : discussion ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Post */}
          <div className={`p-6 rounded-xl ${
            isDark 
              ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          } mb-6`}>
            {/* Author and Meta */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img 
                  src={discussion.author.avatar} 
                  alt={discussion.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {discussion.author.name}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {discussion.date}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
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
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {discussion.tags.map((tag: string, index: number) => (
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
            
            {/* Content */}
            <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none`}>
              <div 
                dangerouslySetInnerHTML={{ __html: discussion.content.replace(/\n/g, '<br>') }} 
                className={isDark ? 'text-gray-300' : 'text-gray-700'}
              />
            </div>
            
            {/* Actions */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <button className={`px-2 py-1 rounded-md flex items-center ${
                  isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
                }`}>
                  <ThumbsUp className="h-4 w-4 mr-1 text-[#00cbdd]" />
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>Like</span>
                </button>
                <button className={`px-2 py-1 rounded-md flex items-center ${
                  isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
                }`}>
                  <ThumbsDown className="h-4 w-4 mr-1 text-gray-400" />
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>Dislike</span>
                </button>
              </div>
              <button className={`px-2 py-1 rounded-md flex items-center ${
                isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
              }`}>
                <MessageCircle className="h-4 w-4 mr-1 text-[#00cbdd]" />
                <span className={isDark ? 'text-white' : 'text-gray-900'}>Reply</span>
              </button>
            </div>
          </div>
          
          {/* Replies */}
          <div className="space-y-6">
            <h2 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Replies ({discussion.replies.length})
            </h2>
            
            {discussion.replies.map((reply: any) => (
              <div 
                key={reply.id}
                className={`p-5 rounded-xl ${
                  isDark 
                    ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <img 
                      src={reply.author.avatar} 
                      alt={reply.author.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {reply.author.name}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {reply.timestamp}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                      <ThumbsUp className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </button>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {reply.likes}
                    </span>
                  </div>
                </div>
                <div className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {reply.content}
                </div>
              </div>
            ))}
            
            {/* Reply Form */}
            <div className={`p-5 rounded-xl ${
              isDark 
                ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
                : 'bg-white border border-gray-200'
            }`}>
              <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Leave a Reply
              </h3>
              <form onSubmit={handleSubmitReply}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  required
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg mb-3 ${
                    isDark 
                      ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                      : 'bg-white border border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="Share your thoughts..."
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !replyContent.trim()}
                    className={`px-6 py-2 rounded-lg flex items-center ${
                      isSubmitting || !replyContent.trim()
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
                        Post Reply
                        <Send className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className={`p-8 text-center rounded-xl ${
          isDark 
            ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          <MessageCircle className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Discussion Not Found
          </h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            The discussion you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/dashboard/support/community">
            <button className="mt-4 px-4 py-2 rounded-lg bg-[#00cbdd] text-white font-medium hover:bg-[#00cbdd]/90 transition-all duration-200">
              Return to Community
            </button>
          </Link>
        </div>
      )}
    </div>
  );
} 