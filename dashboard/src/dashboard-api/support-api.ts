// API endpoints for the Support section
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const SUPPORT_BASE = `${API_BASE_URL}/support`;

// Types
export interface SupportCategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  count?: number;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  readTime: string;
  date: string;
  views?: number;
}

export interface Tutorial {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  category: string;
  instructor: string;
  description: string;
  videoUrl?: string;
  views?: number;
  likes?: number;
  dislikes?: number;
  comments?: TutorialComment[];
  isNew?: boolean;
  isFeatured?: boolean;
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  steps?: {
    title: string;
    content: string;
    duration: string;
  }[];
  completionRate?: number;
}

export interface TutorialComment {
  id: string;
  user: string;
  avatar?: string;
  date: string;
  content: string;
  likes: number;
  replies?: TutorialComment[];
}

export interface CommunityPost {
  id: string;
  title: string;
  category: string;
  author: {
    id?: string;
    name: string;
    avatar: string;
  };
  content: string;
  replies: CommunityReply[];
  date: string;
  views: number;
  likes: number;
  tags: string[];
}

export interface CommunityReply {
  id: string;
  author: {
    id?: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
}

export interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  duration: number; // minutes
  speakers: string[];
  description: string;
  longDescription?: string;
  registrationUrl?: string;
  thumbnail: string;
  isRecorded: boolean;
  isUpcoming?: boolean;
  location?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  prerequisites?: string[];
  agendaItems?: {
    time: string;
    title: string;
  }[];
}

export interface EventRegistration {
  fullName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  questions?: string;
  agreeToTerms: boolean;
}

export interface SupportTicket {
  id?: string;
  subject: string;
  category: string;
  priority: string;
  message: string;
  attachments?: File[];
  status?: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt?: string;
  updatedAt?: string;
}

// API methods for Knowledge Base
export const knowledgeBaseAPI = {
  // Get all articles
  getArticles: async (): Promise<KnowledgeArticle[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/knowledge-base`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      return await response.json();
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw error;
    }
  },

  // Get articles by category
  getArticlesByCategory: async (category: string): Promise<KnowledgeArticle[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/knowledge-base/category/${category}`);
      if (!response.ok) throw new Error(`Failed to fetch ${category} articles`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} articles:`, error);
      throw error;
    }
  },

  // Get article by ID
  getArticleById: async (id: string): Promise<KnowledgeArticle> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/knowledge-base/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch article ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      throw error;
    }
  },

  // Search articles
  searchArticles: async (query: string): Promise<KnowledgeArticle[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/knowledge-base/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search articles');
      return await response.json();
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }
};

// API methods for Video Tutorials
export const tutorialsAPI = {
  // Get all tutorials
  getTutorials: async (): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials`);
      if (!response.ok) throw new Error('Failed to fetch tutorials');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      throw error;
    }
  },

  // Get tutorials by category
  getTutorialsByCategory: async (category: string): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/category/${category}`);
      if (!response.ok) throw new Error(`Failed to fetch ${category} tutorials`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} tutorials:`, error);
      throw error;
    }
  },

  // Get tutorials by skill level
  getTutorialsBySkillLevel: async (level: string): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/skill-level/${level}`);
      if (!response.ok) throw new Error(`Failed to fetch ${level} level tutorials`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${level} level tutorials:`, error);
      throw error;
    }
  },

  // Get featured tutorials
  getFeaturedTutorials: async (): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/featured`);
      if (!response.ok) throw new Error('Failed to fetch featured tutorials');
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured tutorials:', error);
      throw error;
    }
  },

  // Get new tutorials
  getNewTutorials: async (): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/new`);
      if (!response.ok) throw new Error('Failed to fetch new tutorials');
      return await response.json();
    } catch (error) {
      console.error('Error fetching new tutorials:', error);
      throw error;
    }
  },

  // Get tutorial by ID
  getTutorialById: async (id: string): Promise<Tutorial> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch tutorial ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching tutorial ${id}:`, error);
      throw error;
    }
  },

  // Get related tutorials
  getRelatedTutorials: async (id: string): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}/related`);
      if (!response.ok) throw new Error(`Failed to fetch related tutorials for ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching related tutorials for ${id}:`, error);
      throw error;
    }
  },

  // Get tutorial comments
  getTutorialComments: async (id: string): Promise<TutorialComment[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}/comments`);
      if (!response.ok) throw new Error(`Failed to fetch comments for tutorial ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching comments for tutorial ${id}:`, error);
      throw error;
    }
  },

  // Add a comment to a tutorial
  addComment: async (tutorialId: string, comment: Omit<TutorialComment, 'id' | 'date' | 'likes' | 'replies'>): Promise<TutorialComment> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${tutorialId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      return await response.json();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // Like a tutorial
  likeTutorial: async (id: string): Promise<{ likes: number }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}/like`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error(`Failed to like tutorial ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error liking tutorial ${id}:`, error);
      throw error;
    }
  },

  // Dislike a tutorial
  dislikeTutorial: async (id: string): Promise<{ dislikes: number }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}/dislike`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error(`Failed to dislike tutorial ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error disliking tutorial ${id}:`, error);
      throw error;
    }
  },

  // Bookmark a tutorial
  bookmarkTutorial: async (id: string): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}/bookmark`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error(`Failed to bookmark tutorial ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error bookmarking tutorial ${id}:`, error);
      throw error;
    }
  },

  // Remove bookmark from a tutorial
  removeBookmark: async (id: string): Promise<{ success: boolean }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/${id}/bookmark`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to remove bookmark from tutorial ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error removing bookmark from tutorial ${id}:`, error);
      throw error;
    }
  },

  // Get user's bookmarked tutorials
  getBookmarkedTutorials: async (): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/bookmarked`);
      if (!response.ok) throw new Error('Failed to fetch bookmarked tutorials');
      return await response.json();
    } catch (error) {
      console.error('Error fetching bookmarked tutorials:', error);
      throw error;
    }
  },

  // Search tutorials
  searchTutorials: async (query: string): Promise<Tutorial[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tutorials/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search tutorials');
      return await response.json();
    } catch (error) {
      console.error('Error searching tutorials:', error);
      throw error;
    }
  }
};

// API methods for Community
export const communityAPI = {
  // Get all posts
  getPosts: async (): Promise<CommunityPost[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community`);
      if (!response.ok) throw new Error('Failed to fetch community posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching community posts:', error);
      throw error;
    }
  },

  // Get posts by category
  getPostsByCategory: async (category: string): Promise<CommunityPost[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community/category/${category}`);
      if (!response.ok) throw new Error(`Failed to fetch ${category} posts`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} posts:`, error);
      throw error;
    }
  },

  // Get post by ID
  getPostById: async (id: string): Promise<CommunityPost> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch post ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  },

  // Search posts
  searchPosts: async (query: string): Promise<CommunityPost[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search posts');
      return await response.json();
    } catch (error) {
      console.error('Error searching posts:', error);
      throw error;
    }
  },

  // Create a new post
  createPost: async (post: Omit<CommunityPost, 'id' | 'replies' | 'date' | 'views' | 'likes'>): Promise<CommunityPost> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) throw new Error('Failed to create post');
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Add a reply to a post
  addReply: async (postId: string, reply: Omit<CommunityReply, 'id' | 'timestamp' | 'likes'>): Promise<CommunityReply> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community/${postId}/replies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reply),
      });
      if (!response.ok) throw new Error('Failed to add reply');
      return await response.json();
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  },

  // Like a post
  likePost: async (postId: string): Promise<void> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community/${postId}/like`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to like post');
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },

  // Like a reply
  likeReply: async (postId: string, replyId: string): Promise<void> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/community/${postId}/replies/${replyId}/like`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to like reply');
    } catch (error) {
      console.error('Error liking reply:', error);
      throw error;
    }
  }
};

// API methods for Events & Webinars
export const eventsAPI = {
  // Get all events
  getEvents: async (): Promise<Event[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get events by type
  getEventsByType: async (type: string): Promise<Event[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/type/${type}`);
      if (!response.ok) throw new Error(`Failed to fetch ${type} events`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${type} events:`, error);
      throw error;
    }
  },

  // Get upcoming events
  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/upcoming`);
      if (!response.ok) throw new Error('Failed to fetch upcoming events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      throw error;
    }
  },

  // Get past events
  getPastEvents: async (): Promise<Event[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/past`);
      if (!response.ok) throw new Error('Failed to fetch past events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching past events:', error);
      throw error;
    }
  },

  // Get event by ID
  getEventById: async (id: string): Promise<Event> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch event ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  // Register for an event
  registerForEvent: async (eventId: string, registrationData: EventRegistration): Promise<{ registrationId: string; success: boolean; message: string }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      if (!response.ok) throw new Error('Failed to register for event');
      return await response.json();
    } catch (error) {
      console.error('Error registering for event:', error);
      throw error;
    }
  },

  // Check if user is registered for an event
  checkRegistrationStatus: async (eventId: string): Promise<{ registered: boolean }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/${eventId}/registration-status`);
      if (!response.ok) throw new Error(`Failed to check registration status for event ${eventId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error checking registration status for event ${eventId}:`, error);
      throw error;
    }
  },

  // Get related events
  getRelatedEvents: async (eventId: string): Promise<Event[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/${eventId}/related`);
      if (!response.ok) throw new Error(`Failed to fetch related events for ${eventId}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching related events for ${eventId}:`, error);
      throw error;
    }
  },

  // Search events
  searchEvents: async (query: string): Promise<Event[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/events/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search events');
      return await response.json();
    } catch (error) {
      console.error('Error searching events:', error);
      throw error;
    }
  }
};

// API methods for Support Tickets
export const supportTicketsAPI = {
  // Create a support ticket
  createTicket: async (ticket: SupportTicket): Promise<SupportTicket> => {
    try {
      // Handle file uploads separately if needed
      const formData = new FormData();
      formData.append('subject', ticket.subject);
      formData.append('category', ticket.category);
      formData.append('priority', ticket.priority);
      formData.append('message', ticket.message);
      
      if (ticket.attachments) {
        ticket.attachments.forEach((file, index) => {
          formData.append(`attachment${index}`, file);
        });
      }
      
      const response = await fetch(`${SUPPORT_BASE}/tickets`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Failed to create support ticket');
      return await response.json();
    } catch (error) {
      console.error('Error creating support ticket:', error);
      throw error;
    }
  },

  // Get user's tickets
  getUserTickets: async (): Promise<SupportTicket[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tickets/user`);
      if (!response.ok) throw new Error('Failed to fetch user tickets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      throw error;
    }
  },

  // Get ticket by ID
  getTicketById: async (id: string): Promise<SupportTicket> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tickets/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch ticket ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
      throw error;
    }
  },

  // Update ticket status
  updateTicketStatus: async (id: string, status: 'open' | 'in-progress' | 'resolved' | 'closed'): Promise<SupportTicket> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/tickets/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error(`Failed to update ticket ${id} status`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating ticket ${id} status:`, error);
      throw error;
    }
  }
};

// API methods for AI Assistant
export const aiAssistantAPI = {
  // Send a message to the AI assistant
  sendMessage: async (message: string): Promise<{ id: string; role: 'assistant'; content: string; timestamp: string }> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/assistant/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error('Failed to send message to AI assistant');
      return await response.json();
    } catch (error) {
      console.error('Error sending message to AI assistant:', error);
      throw error;
    }
  },

  // Get message history
  getMessageHistory: async (): Promise<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: string }[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/assistant/history`);
      if (!response.ok) throw new Error('Failed to fetch message history');
      return await response.json();
    } catch (error) {
      console.error('Error fetching message history:', error);
      throw error;
    }
  },

  // Get suggested questions
  getSuggestedQuestions: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${SUPPORT_BASE}/assistant/suggested-questions`);
      if (!response.ok) throw new Error('Failed to fetch suggested questions');
      return await response.json();
    } catch (error) {
      console.error('Error fetching suggested questions:', error);
      throw error;
    }
  }
};

// Consolidated API object
const supportAPI = {
  knowledgeBase: knowledgeBaseAPI,
  tutorials: tutorialsAPI,
  community: communityAPI,
  events: eventsAPI,
  tickets: supportTicketsAPI,
  aiAssistant: aiAssistantAPI
};

export default supportAPI; 