'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Mail, 
  AlertCircle, 
  Upload, 
  X, 
  Send,
  FileText,
  Image,
  PanelRight,
  Check
} from 'lucide-react';
import Link from 'next/link';

// Support request categories
const categories = [
  { id: 'technical', name: 'Technical Issue' },
  { id: 'billing', name: 'Billing & Subscription' },
  { id: 'account', name: 'Account Management' },
  { id: 'feature', name: 'Feature Request' },
  { id: 'question', name: 'General Question' },
  { id: 'other', name: 'Other' }
];

// Priority levels
const priorities = [
  { id: 'low', name: 'Low', description: 'General inquiries, no time sensitivity' },
  { id: 'medium', name: 'Medium', description: 'Minor issues affecting some functionality' },
  { id: 'high', name: 'High', description: 'Significant issues affecting important functionality' },
  { id: 'critical', name: 'Critical', description: 'Complete service unavailability' }
];

export default function ContactSupportPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Form state
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      // Limit total file size to 10MB
      const totalSize = [...files, ...newFiles].reduce((sum, file) => sum + file.size, 0);
      if (totalSize > 10 * 1024 * 1024) {
        setError('Total file size exceeds 10MB limit');
        return;
      }
      // Limit number of files to 5
      if (files.length + newFiles.length > 5) {
        setError('Maximum 5 files allowed');
        return;
      }
      setFiles([...files, ...newFiles]);
      setError(null);
    }
  };
  
  // Remove a file
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would send the form data to the API
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSubject('');
        setCategory('');
        setPriority('');
        setMessage('');
        setFiles([]);
      }, 5000);
    }, 1500);
  };
  
  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
            Contact Support
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Submit a request for assistance from our support team
          </p>
        </div>
      </div>

      {/* Support tiers info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`p-5 rounded-xl border ${
          isDark 
            ? 'bg-[#00031b]/80 border-[#00cbdd]/20'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Response Times by Subscription Tier
          </h3>
          <ul className={`list-disc pl-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li><span className="font-medium">Free Tier:</span> 48-hour response time</li>
            <li><span className="font-medium">Pro Tier:</span> 24-hour response time</li>
            <li><span className="font-medium">Enterprise Tier:</span> 4-hour response time</li>
          </ul>
        </div>
      </motion.div>

      {/* Support Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className={`p-6 rounded-xl ${
          isDark 
            ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}>
          {isSubmitted ? (
            <div className="text-center py-10">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Request Submitted Successfully
              </h2>
              <p className={`max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Your support request has been received. You will receive a confirmation email with your ticket details shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Subject */}
              <div>
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                      : 'bg-white border border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="Brief description of your issue"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                {/* Priority */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                    className={`w-full px-4 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                        : 'bg-white border border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  >
                    <option value="" disabled>Select priority level</option>
                    {priorities.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Priority description */}
              {priority && (
                <div className={`p-3 rounded-lg text-sm ${
                  isDark ? 'bg-[#00052c]/50 text-gray-300' : 'bg-gray-50 text-gray-600'
                }`}>
                  {priorities.find(p => p.id === priority)?.description}
                </div>
              )}
              
              {/* Message */}
              <div>
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white'
                      : 'bg-white border border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                  placeholder="Please provide a detailed description of your issue..."
                />
              </div>
              
              {/* Attachments */}
              <div>
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Attachments (Optional)
                </label>
                <div className={`p-4 border-2 border-dashed rounded-lg text-center ${
                  isDark 
                    ? 'border-[#00cbdd]/20 hover:border-[#00cbdd]/40'
                    : 'border-gray-300 hover:border-gray-400'
                } transition-colors duration-200`}>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className={`h-8 w-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Drag and drop files here, or
                    </p>
                    <label className={`px-4 py-2 rounded-lg cursor-pointer ${
                      isDark 
                        ? 'bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20'
                        : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                    } transition-colors duration-200`}>
                      <span>Browse Files</span>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500">
                      Max 5 files, 10MB total (PNG, JPG, PDF, ZIP)
                    </p>
                  </div>
                </div>
                
                {/* Error message */}
                {error && (
                  <div className="mt-2 text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}
                
                {/* File list */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div 
                        key={`${file.name}-${index}`}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          isDark ? 'bg-[#00052c]/50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            isDark ? 'bg-[#00cbdd]/10' : 'bg-blue-100'
                          }`}>
                            <span className={`text-xs font-medium ${isDark ? 'text-[#00cbdd]' : 'text-blue-500'}`}>
                              {file.name.split('.').pop()?.toUpperCase() || 'FILE'}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className={`text-sm truncate max-w-[200px] ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {file.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className={`p-1 rounded-full ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                          }`}
                        >
                          <X className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
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
                      <span className="mr-2">Submitting</span>
                      <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent"></div>
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Send className="h-4 w-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Help Box */}
      <div className={`p-6 rounded-xl ${
        isDark 
          ? 'bg-gradient-to-br from-[#00cbdd]/20 to-blue-500/10 border border-[#00cbdd]/20'
          : 'bg-gradient-to-br from-[#00cbdd]/10 to-blue-500/5 border border-[#00cbdd]/10'
      }`}>
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-[#00cbdd]/20 flex items-center justify-center mr-4 flex-shrink-0">
            <AlertCircle className={`h-5 w-5 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
          </div>
          <div>
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Before Submitting a Request
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
              Check our knowledge base and FAQ for answers to common questions.
            </p>
            <div className="space-y-1">
              <Link href="/dashboard/support/knowledge-base">
                <button className={`text-sm flex items-center ${isDark ? 'text-[#00cbdd] hover:text-[#00cbdd]/80' : 'text-[#00cbdd] hover:text-[#00cbdd]/80'}`}>
                  <PanelRight className="h-4 w-4 mr-1" />
                  Browse Knowledge Base
                </button>
              </Link>
              <Link href="/dashboard/support/community">
                <button className={`text-sm flex items-center ${isDark ? 'text-[#00cbdd] hover:text-[#00cbdd]/80' : 'text-[#00cbdd] hover:text-[#00cbdd]/80'}`}>
                  <PanelRight className="h-4 w-4 mr-1" />
                  Check Community Forums
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 