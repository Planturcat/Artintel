'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users,
  Search,
  Video,
  Award,
  Code,
  MessageSquare,
  Presentation,
  Rocket,
  X
} from 'lucide-react';
import Link from 'next/link';

// Event types
const eventTypes = [
  { id: 'all', name: 'All Events' },
  { id: 'webinar', name: 'Webinars', icon: <Presentation className="h-4 w-4" /> },
  { id: 'workshop', name: 'Workshops', icon: <Code className="h-4 w-4" /> },
  { id: 'qa', name: 'Q&A Sessions', icon: <MessageSquare className="h-4 w-4" /> },
  { id: 'meetup', name: 'Meetups', icon: <Users className="h-4 w-4" /> },
  { id: 'hackathon', name: 'Hackathons', icon: <Rocket className="h-4 w-4" /> },
  { id: 'certification', name: 'Certification', icon: <Award className="h-4 w-4" /> }
];

// Mock events data - in a real app, this would come from an API
const mockEvents = [
  // Upcoming events
  {
    id: 'event-1',
    title: 'Mastering Fine-Tuning for Specialized Domains',
    type: 'webinar',
    date: '2023-08-15T14:00:00Z',
    duration: 60, // minutes
    speakers: ['Dr. Elena Martinez', 'Michael Wong'],
    description: 'Learn advanced techniques for fine-tuning LLMs for specialized domains like healthcare, legal, and financial services.',
    registrationUrl: '/dashboard/support/events/register/event-1',
    thumbnail: '/images/events/fine-tuning-webinar.jpg',
    isRecorded: true,
    isUpcoming: true
  },
  {
    id: 'event-2',
    title: 'Hands-on Workshop: Building Conversational Agents',
    type: 'workshop',
    date: '2023-08-18T10:00:00Z',
    duration: 120, // minutes
    speakers: ['James Wilson', 'Sarah Chen'],
    description: 'A practical, hands-on workshop where you willl learn to build and deploy conversational agents using Artintel.',
    registrationUrl: '/dashboard/support/events/register/event-2',
    thumbnail: '/images/events/conversational-agents-workshop.jpg',
    isRecorded: true,
    isUpcoming: true
  },
  {
    id: 'event-3',
    title: 'Monthly Community Meetup: August Edition',
    type: 'meetup',
    date: '2023-08-22T18:00:00Z',
    duration: 90, // minutes
    speakers: ['Community Hosts'],
    description: 'Join fellow ArtIntel users to share experiences, showcase projects, and network with the community.',
    registrationUrl: '/dashboard/support/events/register/event-3',
    thumbnail: '/images/events/community-meetup.jpg',
    isRecorded: false,
    isUpcoming: true
  },
  {
    id: 'event-4',
    title: 'Ask Me Anything: Data Privacy & AI Models',
    type: 'qa',
    date: '2023-08-25T15:00:00Z',
    duration: 60, // minutes
    speakers: ['Lisa Johnson, Chief Privacy Officer', 'David Park, AI Ethics Lead'],
    description: 'An open Q&A session focusing on data privacy concerns when working with AI models.',
    registrationUrl: '/dashboard/support/events/register/event-4',
    thumbnail: '/images/events/privacy-qa.jpg',
    isRecorded: true,
    isUpcoming: true
  },
  
  // Past events
  {
    id: 'event-5',
    title: 'Introduction to Artintel Platform',
    type: 'webinar',
    date: '2023-07-10T14:00:00Z',
    duration: 60, // minutes
    speakers: ['Alex Thompson'],
    description: 'A comprehensive overview of the Artintel platform, its features, and capabilities.',
    registrationUrl: '/dashboard/support/events/register/event-5',
    thumbnail: '/images/events/intro-webinar.jpg',
    isRecorded: true,
    isUpcoming: false,
    recordingUrl: '/dashboard/support/events/recording/event-5'
  },
  {
    id: 'event-6',
    title: 'LLM Deployment Strategies for Enterprise',
    type: 'webinar',
    date: '2023-07-18T16:00:00Z',
    duration: 75, // minutes
    speakers: ['Jennifer Lee, Enterprise Architect'],
    description: 'Learn best practices for deploying LLMs in enterprise environments, including scaling, monitoring, and governance.',
    registrationUrl: '/dashboard/support/events/register/event-6',
    thumbnail: '/images/events/enterprise-deployment.jpg',
    isRecorded: true,
    isUpcoming: false,
    recordingUrl: '/dashboard/support/events/recording/event-6'
  },
  {
    id: 'event-7',
    title: 'Model Evaluation & Benchmarking Workshop',
    type: 'workshop',
    date: '2023-07-22T10:00:00Z',
    duration: 120, // minutes
    speakers: ['Dr. Robert Chen', 'Maria Garcia'],
    description: 'A hands-on workshop covering techniques for evaluating and benchmarking LLMs for different use cases.',
    registrationUrl: '/dashboard/support/events/register/event-7',
    thumbnail: '/images/events/evaluation-workshop.jpg',
    isRecorded: true,
    isUpcoming: false,
    recordingUrl: '/dashboard/support/events/recording/event-7'
  },
  {
    id: 'event-8',
    title: 'ArtIntel Hackathon: Building AI-powered Applications',
    type: 'hackathon',
    date: '2023-07-01T09:00:00Z',
    duration: 480, // minutes (8 hours)
    speakers: ['Various Mentors'],
    description: 'A one-day hackathon challenging participants to build innovative applications using Artintel.',
    registrationUrl: '/dashboard/support/events/register/event-8',
    thumbnail: '/images/events/hackathon.jpg',
    isRecorded: false,
    isUpcoming: false
  },
];

export default function EventsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  
  // Filter events based on search, type, and past/upcoming
  useEffect(() => {
    let filtered = mockEvents;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.description.toLowerCase().includes(query) ||
        event.speakers.some(speaker => speaker.toLowerCase().includes(query))
      );
    }
    
    // Filter by event type
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }
    
    // Filter by upcoming/past
    filtered = filtered.filter(event => event.isUpcoming !== showPastEvents);
    
    setFilteredEvents(filtered);
  }, [searchQuery, selectedType, showPastEvents]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
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
            Events & Webinars
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {showPastEvents 
              ? 'Watch recordings of past events'
              : 'Register for upcoming learning opportunities'
            }
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
            ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
            : 'bg-white border border-gray-200'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events by title, description, or speaker"
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white placeholder-gray-500'
                  : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-[#00cbdd]`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-700`} />
              </button>
            )}
          </div>
          
          {/* Past/Upcoming Toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowPastEvents(!showPastEvents)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white hover:bg-[#00052c]'
                  : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {showPastEvents ? (
                <>
                  <Calendar className="h-5 w-5 mr-2" />
                  Show Upcoming Events
                </>
              ) : (
                <>
                  <Video className="h-5 w-5 mr-2" />
                  Show Past Recordings
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Event Type Filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3 py-1.5 rounded-lg text-sm flex items-center ${
                selectedType === type.id
                  ? isDark 
                    ? 'bg-[#00cbdd] text-white' 
                    : 'bg-blue-500 text-white'
                  : isDark 
                    ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white hover:bg-[#00052c]' 
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              } transition-colors duration-200`}
            >
              {type.icon && <span className="mr-1.5">{type.icon}</span>}
              {type.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Events List */}
      <div className="space-y-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`p-5 rounded-xl ${
                isDark 
                  ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
                  : 'bg-white border border-gray-200'
              } overflow-hidden`}
            >
              <div className="flex flex-col md:flex-row gap-5">
                {/* Event Image */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 relative">
                    <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-[#00052c]/50' : 'bg-gray-200'}`}>
                      <Calendar className={`h-10 w-10 ${isDark ? 'text-[#00cbdd]/70' : 'text-blue-400'}`} />
                    </div>
                    {event.isRecorded && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
                        <Video className="h-3 w-3 mr-1" />
                        Recorded
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      {/* Event Type Badge */}
                      <div className="mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isDark ? 'bg-[#00cbdd]/10 text-[#00cbdd]' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {eventTypes.find(t => t.id === event.type)?.icon && (
                            <span className="mr-1.5">
                              {eventTypes.find(t => t.id === event.type)?.icon}
                            </span>
                          )}
                          {eventTypes.find(t => t.id === event.type)?.name || event.type}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h3 className={`text-lg font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {event.title}
                      </h3>
                      
                      {/* Date and Time */}
                      <div className={`flex items-center text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>{formatDate(event.date)}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>{formatTime(event.date)}</span>
                        <span className="mx-1">•</span>
                        <span>{formatDuration(event.duration)}</span>
                      </div>
                      
                      {/* Speakers */}
                      <div className={`flex items-center text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <Users className="h-4 w-4 mr-1.5" />
                        <span>{event.speakers.join(', ')}</span>
                      </div>
                      
                      {/* Description */}
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {event.description}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    <div>
                      {event.isUpcoming ? (
                        <Link href={event.registrationUrl}>
                          <button className={`px-4 py-2 rounded-lg ${
                            isDark 
                              ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00cbdd]/90 hover:to-blue-500/90'
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          } transition-colors duration-200 text-sm font-medium`}>
                            Register Now
                          </button>
                        </Link>
                      ) : event.isRecorded ? (
                        <Link href={event.recordingUrl || '#'}>
                          <button className={`px-4 py-2 rounded-lg flex items-center ${
                            isDark 
                              ? 'bg-[#00052c]/80 border border-[#00cbdd]/20 text-white hover:bg-[#00052c]'
                              : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
                          } transition-colors duration-200 text-sm font-medium`}>
                            <Video className="h-4 w-4 mr-1.5" />
                            Watch Recording
                          </button>
                        </Link>
                      ) : (
                        <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Recording not available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          // No events found
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-8 rounded-xl text-center ${
              isDark 
                ? 'bg-[#00091b]/90 border border-[#00cbdd]/20'
                : 'bg-white border border-gray-200'
            }`}
          >
            <Calendar className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No events found
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {searchQuery 
                ? 'Try adjusting your search or filters to find events'
                : showPastEvents
                  ? 'No past events are available at this time'
                  : 'No upcoming events are scheduled at this time'
              }
            </p>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('all');
                }}
                className={`mt-4 px-4 py-2 rounded-lg ${
                  isDark 
                    ? 'bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20'
                    : 'bg-blue-50 text-blue-500 hover:bg-blue-100'
                } transition-colors duration-200 text-sm font-medium`}
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
} 