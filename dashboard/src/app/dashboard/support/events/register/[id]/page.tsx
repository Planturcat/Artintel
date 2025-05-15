'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users,
  MapPin,
  Link as LinkIcon,
  Check,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

// Mock events data - in a real app, this would be fetched from an API
const mockEvents = [
  {
    id: 'event-1',
    title: 'Mastering Fine-Tuning for Specialized Domains',
    type: 'webinar',
    date: '2023-08-15T14:00:00Z',
    duration: 60, // minutes
    speakers: ['Dr. Elena Martinez', 'Michael Wong'],
    description: 'Learn advanced techniques for fine-tuning LLMs for specialized domains like healthcare, legal, and financial services.',
    longDescription: 'In this webinar, our expert speakers will guide you through the process of fine-tuning large language models for domain-specific applications. You\'ll learn how to prepare specialized training data, select the right parameters, and evaluate model performance in contexts like healthcare, legal, and financial services. The session will include practical examples and best practices to help you achieve optimal results when adapting foundation models to your specific domain requirements.',
    location: 'Online (Zoom)',
    maxAttendees: 500,
    currentAttendees: 342,
    isRecorded: true,
    prerequisites: ['Basic understanding of LLMs', 'Experience with ArtIntel platform'],
    agendaItems: [
      { time: '14:00 - 14:10', title: 'Introduction and Overview' },
      { time: '14:10 - 14:40', title: 'Domain-Specific Fine-Tuning Techniques' },
      { time: '14:40 - 15:00', title: 'Live Demonstration' },
      { time: '15:00 - 15:20', title: 'Case Studies & Results' },
      { time: '15:20 - 15:30', title: 'Q&A Session' }
    ]
  },
  {
    id: 'event-2',
    title: 'Hands-on Workshop: Building Conversational Agents',
    type: 'workshop',
    date: '2023-08-18T10:00:00Z',
    duration: 120, // minutes
    speakers: ['James Wilson', 'Sarah Chen'],
    description: 'A practical, hands-on workshop where you will learn to build and deploy conversational agents using Artintel.',
    longDescription: 'This intensive hands-on workshop will guide you through the entire process of building effective conversational agents using ArtIntel\'s LLM platform. From designing conversational flows to implementing context management and deployment strategies, you\'ll gain practical experience with the tools and techniques needed to create sophisticated AI assistants. Participants should come prepared with their laptops and a basic understanding of the ArtIntel platform. We\'ll provide all necessary resources and guidance throughout the session.',
    location: 'Online (Zoom)',
    maxAttendees: 100,
    currentAttendees: 78,
    isRecorded: true,
    prerequisites: ['Laptop with internet connection', 'ArtIntel account', 'Basic programming knowledge'],
    agendaItems: [
      { time: '10:00 - 10:15', title: 'Introduction to Conversational AI' },
      { time: '10:15 - 11:00', title: 'Designing Effective Dialogue Flows' },
      { time: '11:00 - 11:45', title: 'Hands-on Implementation' },
      { time: '11:45 - 12:00', title: 'Deployment & Monitoring' }
    ]
  },
  {
    id: 'event-3',
    title: 'Monthly Community Meetup: August Edition',
    type: 'meetup',
    date: '2023-08-22T18:00:00Z',
    duration: 90, // minutes
    speakers: ['Community Hosts'],
    description: 'Join fellow ArtIntel users to share experiences, showcase projects, and network with the community.',
    longDescription: 'Our monthly community meetup brings together ArtIntel users from around the world to share their experiences, showcase their projects, and network with like-minded professionals. The August edition will feature lightning talks from community members, updates on the latest platform features, and structured networking sessions. Whether you\'re new to ArtIntel or a seasoned user, this is a great opportunity to connect with the community and gain fresh insights into innovative uses of the platform.',
    location: 'Online (Zoom)',
    maxAttendees: 200,
    currentAttendees: 112,
    isRecorded: false,
    prerequisites: [],
    agendaItems: [
      { time: '18:00 - 18:10', title: 'Welcome & Introduction' },
      { time: '18:10 - 18:40', title: 'Community Project Showcases' },
      { time: '18:40 - 19:00', title: 'Platform Updates & News' },
      { time: '19:00 - 19:30', title: 'Networking Sessions' }
    ]
  },
  {
    id: 'event-4',
    title: 'Ask Me Anything: Data Privacy & AI Models',
    type: 'qa',
    date: '2023-08-25T15:00:00Z',
    duration: 60, // minutes
    speakers: ['Lisa Johnson, Chief Privacy Officer', 'David Park, AI Ethics Lead'],
    description: 'An open Q&A session focusing on data privacy concerns when working with AI models.',
    longDescription: 'Join our Chief Privacy Officer and AI Ethics Lead for an open Q&A session on navigating data privacy challenges when working with large language models. This session will address common concerns around training data privacy, inference-time data handling, compliance with regulations like GDPR and CCPA, and ethical considerations for AI deployment. Come prepared with your questions about implementing privacy-preserving AI solutions and learn best practices from our experts who work at the intersection of AI innovation and privacy protection.',
    location: 'Online (Zoom)',
    maxAttendees: 300,
    currentAttendees: 189,
    isRecorded: true,
    prerequisites: [],
    agendaItems: [
      { time: '15:00 - 15:10', title: 'Introduction of Speakers' },
      { time: '15:10 - 15:55', title: 'Open Q&A Session' },
      { time: '15:55 - 16:00', title: 'Closing Remarks' }
    ]
  }
];

export default function EventRegistrationPage({ params }: { params: { id: string } }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    jobTitle: '',
    questions: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = mockEvents.find(e => e.id === params.id);
    
    if (foundEvent) {
      setEvent(foundEvent);
    }
    
    setIsLoading(false);
  }, [params.id]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
      
      // In a real app, this is where you would make an API call to register the user
      // API.registerForEvent(params.id, formData).then(() => setIsRegistered(true));
    }, 1500);
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      jobTitle: '',
      questions: '',
      agreeToTerms: false
    });
    setErrors({});
    setIsRegistered(false);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Format duration
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hour${hours > 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` 
      : `${hours} hour${hours > 1 ? 's' : ''}`;
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

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className={`text-2xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Event Not Found
        </h2>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/dashboard/support/events">
          <button className={`px-4 py-2 rounded-lg ${
            isDark 
              ? 'bg-[#00cbdd] text-white hover:bg-[#00cbdd]/90'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          } transition-colors duration-200`}>
            Back to Events
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center">
        <Link href="/dashboard/support/events">
          <button className={`mr-4 p-2 rounded-full ${
            isDark ? 'hover:bg-[#00cbdd]/10' : 'hover:bg-gray-100'
          } transition-colors duration-200`}>
            <ArrowLeft className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
          </button>
        </Link>
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Event Registration
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Sign up for {event.title}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details - Left Column */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
            }`}
          >
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Event Details
            </h2>
            
            {/* Event Type */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isDark ? 'bg-[#00cbdd]/10 text-[#00cbdd]' : 'bg-blue-100 text-blue-800'
              }`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </span>
              
              {event.isRecorded && (
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-800'
                }`}>
                  Will be recorded
                </span>
              )}
            </div>
            
            {/* Date & Time */}
            <div className={`flex items-start mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Calendar className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <div>{formatDate(event.date)}</div>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(event.date)}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDuration(event.duration)}</span>
                </div>
              </div>
            </div>
            
            {/* Location */}
            <div className={`flex items-start mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>{event.location}</div>
            </div>
            
            {/* Speakers */}
            <div className={`flex items-start mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <Users className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                {event.speakers.map((speaker: string, index: number) => (
                  <div key={index}>{speaker}</div>
                ))}
              </div>
            </div>
            
            {/* Attendees */}
            <div className="mb-6">
              <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {event.currentAttendees} / {event.maxAttendees} registered
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00cbdd]" 
                  style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Prerequisites */}
            {event.prerequisites.length > 0 && (
              <div className="mb-6">
                <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Prerequisites
                </h3>
                <ul className={`list-disc list-inside space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {event.prerequisites.map((prerequisite: string, index: number) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Agenda */}
            {event.agendaItems.length > 0 && (
              <div>
                <h3 className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Agenda
                </h3>
                <div className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {event.agendaItems.map((item: { time: string, title: string }, index: number) => (
                    <div key={index} className="flex">
                      <span className="w-28 flex-shrink-0">{item.time}</span>
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Registration Form - Right Column */}
        <div className="lg:col-span-2">
          {!isRegistered ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`p-6 rounded-xl ${
                isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
              }`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Registration Information
              </h2>
              
              <div className="mb-6">
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {event.longDescription}
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label 
                      htmlFor="fullName" 
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg ${
                        isDark 
                          ? 'bg-[#000314] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                          : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd] ${
                        errors.fullName ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg ${
                        isDark 
                          ? 'bg-[#000314] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                          : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd] ${
                        errors.email ? 'border-red-500' : ''
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  {/* Company */}
                  <div>
                    <label 
                      htmlFor="company" 
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg ${
                        isDark 
                          ? 'bg-[#000314] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                          : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                      placeholder="Enter your company name (optional)"
                    />
                  </div>
                  
                  {/* Job Title */}
                  <div>
                    <label 
                      htmlFor="jobTitle" 
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg ${
                        isDark 
                          ? 'bg-[#000314] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                          : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
                      placeholder="Enter your job title (optional)"
                    />
                  </div>
                  
                  {/* Questions */}
                  <div>
                    <label 
                      htmlFor="questions" 
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Questions or Comments
                    </label>
                    <textarea
                      id="questions"
                      name="questions"
                      value={formData.questions}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full p-3 rounded-lg ${
                        isDark 
                          ? 'bg-[#000314] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                          : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
                      } focus:outline-none focus:ring-2 focus:ring-[#00cbdd] resize-none`}
                      placeholder="Do you have any questions for the speakers? (optional)"
                    />
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleCheckboxChange}
                          className={`h-4 w-4 rounded ${
                            isDark 
                              ? 'bg-[#000314] border border-[#00cbdd]/20 text-[#00cbdd]'
                              : 'bg-white border border-gray-200 text-blue-600'
                          } focus:outline-none focus:ring-2 focus:ring-[#00cbdd] ${
                            errors.agreeToTerms ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label 
                          htmlFor="agreeToTerms" 
                          className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          I agree to the <a href="#" className="text-[#00cbdd] hover:underline">Terms and Conditions</a> and <a href="#" className="text-[#00cbdd] hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
                        </label>
                        {errors.agreeToTerms && (
                          <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                        isDark 
                          ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00cbdd]/90 hover:to-blue-500/90'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      } transition-colors duration-200 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        'Register for Event'
                      )}
                    </button>
                  </div>
                  
                  {/* Privacy Note */}
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <p>
                      Your registration information will be used to process your registration and provide you with event details. We will not share your information with third parties unless required by law.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`p-6 rounded-xl ${
                isDark ? 'bg-[#00031b]/90 border border-[#00cbdd]/20' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="text-center py-6">
                <div className={`w-16 h-16 rounded-full bg-[#00cbdd]/20 mx-auto flex items-center justify-center mb-4`}>
                  <Check className={`h-8 w-8 text-[#00cbdd]`} />
                </div>
                <h2 className={`text-2xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Registration Complete!
                </h2>
                <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thank you for registering for {event.title}. 
                  We've sent a confirmation email to {formData.email} with all the details.
                </p>
                
                {/* Event Summary */}
                <div className={`p-4 rounded-lg mb-6 ${
                  isDark ? 'bg-[#00052c]/80 border border-[#00cbdd]/10' : 'bg-gray-50 border border-gray-100'
                }`}>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    You will receive a calendar invitation and reminder emails before the event.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard/support/events">
                      <button className={`px-6 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white hover:bg-[#00052c]'
                          : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                      } transition-colors duration-200`}>
                        Browse More Events
                      </button>
                    </Link>
                    
                    <button
                      onClick={handleReset}
                      className={`px-6 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-[#00cbdd] text-white hover:bg-[#00cbdd]/90'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      } transition-colors duration-200`}
                    >
                      Register Another Person
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}