'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Mic, 
  X, 
  Loader, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Check,
  FileCode,
  MessageSquare,
  HelpCircle,
  BookOpen,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

// Initial welcome message from the assistant
const initialMessages = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI assistant for ArtIntel LLMs. I can help you with:\n\n• Using the platform features\n• Model selection and fine-tuning\n• Data preparation and integration\n• Deployment and monitoring\n• Troubleshooting common issues\n\nHow can I assist you today?",
    timestamp: new Date(Date.now() - 1000).toISOString()
  }
];

// Suggested questions for new users
const suggestedQuestions = [
  'How do I fine-tune a model for my specific use case?',
  'What\'s the difference between the subscription tiers?',
  'How can I monitor my model\'s performance and costs?',
  'How do I prepare data for training efficiently?',
  'What\'s the best way to deploy models to production?'
];

// Categories for follow-up suggestions
const suggestionCategories = {
  'fine-tuning': [
    'What learning rate should I use for fine-tuning?',
    'How much data do I need for effective fine-tuning?',
    'How do I prevent overfitting during fine-tuning?',
    'How long does fine-tuning typically take?'
  ],
  'deployment': [
    'How do I set up auto-scaling for my model?',
    'Whats the difference between dedicated and shared deployment?',
    'How can I minimize latency in production?',
    'How do I create a custom endpoint for my model?'
  ],
  'data': [
    'How do I clean my dataset effectively?',
    'What format should my training data be in?',
    'How do I handle imbalanced datasets?',
    'How can I augment my data to improve model performance?'
  ],
  'monitoring': [
    'How do I set up alerts for model performance?',
    'What metrics should I track for my model?',
    'How do I debug poor model performance?',
    'How can I identify and fix bottlenecks?'
  ],
  'pricing': [
    'How is inference billing calculated?',
    'What happens if I exceed my usage limits?',
    'How can I optimize costs for my models?',
    'Are there any discounts for academic use?'
  ]
};

export default function AIAssistantPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike' | null>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, followUpSuggestions]);

  // Reset copied message ID after 2 seconds
  useEffect(() => {
    if (copiedMessageId) {
      const timer = setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copiedMessageId]);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setFollowUpSuggestions([]);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const { response, category } = getMockResponse(inputValue);
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Set follow-up suggestions based on the message category
      if (category && suggestionCategories[category]) {
        setFollowUpSuggestions(suggestionCategories[category]);
        setCurrentCategory(category);
      } else {
        setFollowUpSuggestions([]);
        setCurrentCategory(null);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    // Focus the input
    inputRef.current?.focus();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would trigger voice recording
    if (isRecording) {
      // Simulate end of recording with a sample question
      setTimeout(() => {
        setInputValue("How do I deploy a model to production?");
        inputRef.current?.focus();
      }, 1000);
    }
  };

  const copyToClipboard = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(messageId);
  };

  const handleFeedback = (messageId: string, feedbackType: 'like' | 'dislike') => {
    setFeedback(prev => ({
      ...prev,
      [messageId]: prev[messageId] === feedbackType ? null : feedbackType
    }));
  };

  const clearChat = () => {
    // Keep the first welcome message
    setMessages([initialMessages[0]]);
    setFollowUpSuggestions([]);
    setCurrentCategory(null);
    setFeedback({});
  };

  const renderMessageContent = (content: string) => {
    // Simple parsing for code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    
    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(<span key={`text-${match.index}`} className="whitespace-pre-line">
          {content.slice(lastIndex, match.index)}
        </span>);
      }
      
      // Add code block with syntax highlighting
      const language = match[1] || 'javascript';
      const code = match[2];
      parts.push(
        <div key={`code-${match.index}`} className="my-2 rounded-md overflow-hidden">
          <div className={`flex items-center px-4 py-1 text-xs font-mono ${
            isDark ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-700'
          }`}>
            <FileCode className="h-3.5 w-3.5 mr-2" />
            {language}
          </div>
          <pre className={`p-4 overflow-x-auto text-sm ${
            isDark ? 'bg-gray-900/50 text-gray-300' : 'bg-gray-100 text-gray-800'
          }`}>
            <code>{code}</code>
          </pre>
        </div>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add any remaining text
    if (lastIndex < content.length) {
      parts.push(<span key={`text-${lastIndex}`} className="whitespace-pre-line">
        {content.slice(lastIndex)}
      </span>);
    }
    
    return parts.length > 0 ? parts : <span className="whitespace-pre-line">{content}</span>;
  };

  // Enhanced mock response generator with categorization
  const getMockResponse = (query: string): { response: string, category: string | null } => {
    const lowerQuery = query.toLowerCase();
    
    // Fine-tuning related queries
    if (lowerQuery.includes('fine-tune') || lowerQuery.includes('fine tune') || lowerQuery.includes('training') || lowerQuery.includes('train model')) {
      return {
        response: `# Fine-Tuning Guide

To fine-tune a model on ArtIntel LLMs:

1. **Select a Base Model**: Go to Models > Fine-Tuning and choose a suitable base model. For most text tasks, we recommend starting with our medium-sized model.

2. **Prepare Your Data**: Format your data as a JSONL file with prompt-completion pairs. Here's an example:

\`\`\`json
{"prompt": "Translate to French: Hello world", "completion": "Bonjour le monde"}
{"prompt": "Translate to French: How are you?", "completion": "Comment allez-vous?"}
\`\`\`

3. **Upload Your Dataset**: Use the Data Integration module to upload and validate your dataset.

4. **Configure Training Parameters**:
   - Learning rate: 1e-5 to 5e-5 (default: 3e-5)
   - Batch size: 4-16 (default: 8)
   - Epochs: 2-5 (default: 3)

5. **Start Training**: Click "Start Fine-Tuning" and monitor progress in the Training Jobs tab.

The process typically takes 1-6 hours depending on your dataset size and model complexity. You'll receive an email notification when your model is ready.

Would you like specific guidance on any of these steps?`,
        category: 'fine-tuning'
      };
    }
    
    // Subscription tiers and pricing related queries
    if (lowerQuery.includes('tier') || lowerQuery.includes('subscription') || lowerQuery.includes('pricing') || lowerQuery.includes('cost')) {
      return {
        response: `# ArtIntel LLMs Subscription Tiers

ArtIntel LLMs offers three subscription tiers designed for different usage levels:

## Free Tier
- **Models**: Access to small models (up to 1B parameters)
- **Resources**: 100 inference hours per month
- **Fine-tuning**: Up to 10 hours per month on small models
- **Storage**: 10GB for datasets and models
- **Support**: Community forums and documentation
- **Price**: $0/month

## Pro Tier ($49/month)
- **Models**: Access to medium models (up to 7B parameters)
- **Resources**: 500 inference hours per month
- **Fine-tuning**: Up to 50 hours per month on all available models
- **Storage**: 100GB for datasets and models
- **Support**: Email support with 24-hour response time
- **Additional features**: Advanced monitoring, custom endpoints

## Enterprise Tier (Custom pricing)
- **Models**: Access to all models (including 70B+ parameters)
- **Resources**: Custom allocation based on needs
- **Fine-tuning**: Unlimited fine-tuning hours
- **Storage**: Custom storage allocation
- **Support**: Dedicated support representative and SLAs
- **Additional features**: Custom model development, priority infrastructure

All tiers include our core dashboard functionality. You can upgrade or downgrade at any time from the Billing section.

Would you like information about specific features or pricing details?`,
        category: 'pricing'
      };
    }
    
    // Performance monitoring related queries
    if (lowerQuery.includes('monitor') || lowerQuery.includes('performance') || lowerQuery.includes('analytics') || lowerQuery.includes('metrics')) {
      return {
        response: `# Monitoring Model Performance

You can track your model's performance through our comprehensive monitoring suite:

1. **Dashboard Overview**: Access the Monitoring section from your dashboard to see key metrics at a glance, including:
   - Request volume
   - Average latency
   - Error rates
   - Cost and usage

2. **Detailed Analytics**: Dive deeper with specialized views:
   - **Performance Tab**: Latency distribution, p95/p99 response times, throughput
   - **Usage Tab**: Request patterns, token usage, daily/weekly trends
   - **Errors Tab**: Error classification, rate monitoring, troubleshooting guidance
   - **Cost Tab**: Breakdown by model, endpoint, and time period

3. **Setting Up Alerts**: Configure notifications for:
   - High error rates (>5%)
   - Latency spikes (>500ms)
   - Usage approaching limits
   - Unusual traffic patterns

4. **Custom Dashboards**: Create personalized views focusing on metrics that matter most to your use case.

\`\`\`javascript
// Example: Monitoring API endpoint
const response = await fetch('/api/monitoring/model/performance', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const data = await response.json();
console.log(data.metrics);
\`\`\`

For real-time monitoring, you can also integrate with external tools like Datadog, New Relic, or Prometheus using our exporters.

Would you like me to explain any specific monitoring feature in more detail?`,
        category: 'monitoring'
      };
    }
    
    // Data preparation related queries
    if (lowerQuery.includes('data') || lowerQuery.includes('dataset') || lowerQuery.includes('prepare')) {
      return {
        response: `# Data Preparation Best Practices

Proper data preparation is crucial for successful model training. Here's how to prepare your data effectively:

## 1. Data Cleaning
- Remove duplicates and near-duplicates
- Fix formatting inconsistencies
- Address missing values
- Normalize text (capitalization, special characters)

## 2. Data Formatting
For text completion tasks, format your data as JSONL:

\`\`\`json
{"prompt": "Customer question: Where is my order?", "completion": "I'd be happy to help you locate your order. Could you please provide your order number?"}
{"prompt": "Customer question: How do I reset my password?", "completion": "You can reset your password by clicking on the 'Forgot Password' link on the login page."}
\`\`\`

For classification tasks, use this format:

\`\`\`json
{"text": "The product arrived damaged and unusable.", "label": "complaint"}
{"text": "I love how fast the delivery was!", "label": "praise"}
\`\`\`

## 3. Data Splitting
- Training set: 80% of your data
- Validation set: 10-15% of your data
- Test set: 5-10% of your data

## 4. Data Upload
Use our Data Integration module to upload your datasets:

1. Go to Dashboard > Data Integration
2. Click "Upload New Dataset"
3. Select file format (JSONL recommended)
4. Upload your file
5. Verify the automatic validation results

## 5. Data Augmentation (optional)
For limited datasets, consider techniques like:
- Synonym replacement
- Back-translation
- Sentence restructuring

Would you like more specific guidance on preparing data for a particular type of model?`,
        category: 'data'
      };
    }
    
    // Deployment related queries
    if (lowerQuery.includes('deploy') || lowerQuery.includes('production') || lowerQuery.includes('endpoint') || lowerQuery.includes('api')) {
      return {
        response: `# Deploying Models to Production

Follow these steps to deploy your model to production:

## 1. Preparation
Ensure your model has completed training and passed evaluation metrics. From the Models section, select your trained model and click "Deploy to Production."

## 2. Deployment Options
Choose from three deployment types:

- **Serverless**: On-demand scaling, pay per request
  - Best for: Variable traffic, cost-sensitive applications
  - Cold start: ~2 seconds

- **Dedicated**: Reserved instances, consistent performance
  - Best for: Stable, high-volume applications
  - No cold start, higher base cost

- **Hybrid**: Combination of dedicated minimum capacity with serverless scaling
  - Best for: Applications with a baseline load and occasional spikes

## 3. Configuration
Set up your endpoint:

\`\`\`javascript
// Example endpoint configuration
{
  "model_id": "ft-gpt-medium-v2-123456",
  "deployment_type": "hybrid",
  "scaling": {
    "min_instances": 2,
    "max_instances": 10,
    "scale_up_threshold": 70,  // % utilization
    "scale_down_threshold": 30
  },
  "performance": {
    "max_batch_size": 16,
    "max_tokens": 2048,
    "temperature": 0.7
  }
}
\`\`\`

## 4. Integration
Integrate with your application:

\`\`\`python
import requests

response = requests.post(
    "https://api.artintellms.com/v1/generate",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "model": "ft-gpt-medium-v2-123456",
        "prompt": "Translate to Spanish: Hello world",
        "max_tokens": 100,
        "temperature": 0.7
    }
)

print(response.json())
\`\`\`

## 5. Monitoring
After deployment, monitor your endpoint in the Deployment section of the dashboard for performance, cost, and error tracking.

Would you like me to provide more details on a specific aspect of deployment?`,
        category: 'deployment'
      };
    }
    
    // General query response
    return {
      response: `I understand you're asking about "${query}". 

To provide the most helpful information, could you clarify what specific aspect of this topic you'd like to know about? I can help with:

- Step-by-step guides for platform features
- Technical explanations of AI concepts
- Best practices and optimization tips
- Troubleshooting common issues
- Comparing different approaches or options

Feel free to rephrase your question or provide more context about what you're trying to accomplish. I'm here to help with any aspect of the ArtIntel LLMs platform.`,
      category: null
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
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
              AI Assistant
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Get instant help with our AI-powered assistant
            </p>
          </div>
        </div>
        
        {/* Additional actions */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearChat}
            className={`p-1 px-3 text-sm rounded-lg flex items-center ${
              isDark ? 'hover:bg-[#00cbdd]/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            } transition-colors duration-200`}
          >
            <X className="h-3.5 w-3.5 mr-1.5" />
            Clear chat
          </button>
          <Link href="/dashboard/support/channels" className={`p-1 px-3 text-sm rounded-lg flex items-center ${
            isDark ? 'hover:bg-[#00cbdd]/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
          } transition-colors duration-200`}>
            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
            Contact support
          </Link>
        </div>
      </div>

      {/* Chat Container */}
      <div className={`flex-1 overflow-hidden flex flex-col rounded-xl ${
        isDark 
          ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
          : 'bg-white border border-gray-200'
      }`}>
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] rounded-lg p-3 ${
                message.role === 'user'
                  ? isDark 
                    ? 'bg-[#00cbdd]/20 text-white' 
                    : 'bg-[#00cbdd]/10 text-gray-900'
                  : isDark 
                    ? 'bg-gray-800/50 text-white' 
                    : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center mb-2">
                  {message.role === 'assistant' ? (
                    <Bot className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                  ) : (
                    <User className={`h-5 w-5 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-[#00cbdd]'}`} />
                  )}
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {message.role === 'assistant' && (
                    <div className="ml-auto flex items-center space-x-1">
                      <button 
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className={`p-1 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                        title="Copy to clipboard"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                      </button>
                      <button 
                        onClick={() => handleFeedback(message.id, 'like')}
                        className={`p-1 rounded-full ${
                          feedback[message.id] === 'like' 
                            ? 'bg-green-500/20' 
                            : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                        }`}
                        title="Helpful response"
                      >
                        <ThumbsUp className={`h-4 w-4 ${
                          feedback[message.id] === 'like' 
                            ? 'text-green-500' 
                            : isDark ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      </button>
                      <button 
                        onClick={() => handleFeedback(message.id, 'dislike')}
                        className={`p-1 rounded-full ${
                          feedback[message.id] === 'dislike' 
                            ? 'bg-red-500/20' 
                            : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                        }`}
                        title="Unhelpful response"
                      >
                        <ThumbsDown className={`h-4 w-4 ${
                          feedback[message.id] === 'dislike' 
                            ? 'text-red-500' 
                            : isDark ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {renderMessageContent(message.content)}
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Follow-up suggestions */}
          {!isTyping && followUpSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-3 rounded-lg ${
                isDark 
                  ? 'bg-[#00052c]/80 border border-[#00cbdd]/20'
                  : 'bg-blue-50 border border-blue-100'
              }`}>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <HelpCircle className="h-4 w-4 inline-block mr-1.5" />
                  Related questions about {currentCategory === 'pricing' 
                    ? 'pricing and subscriptions'
                    : currentCategory === 'fine-tuning'
                    ? 'fine-tuning'
                    : currentCategory === 'monitoring'
                    ? 'monitoring'
                    : currentCategory === 'data'
                    ? 'data preparation'
                    : currentCategory === 'deployment'
                    ? 'deployment'
                    : 'this topic'}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {followUpSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(suggestion)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        isDark 
                          ? 'bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      } transition-colors duration-200`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`rounded-lg p-3 ${
                isDark 
                  ? 'bg-gray-800/50 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#00cbdd] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#00cbdd] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#00cbdd] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggested Questions (only show for new chats) */}
        {messages.length <= 2 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Suggested questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    isDark 
                      ? 'bg-[#00cbdd]/10 text-[#00cbdd] hover:bg-[#00cbdd]/20'
                      : 'bg-gray-50 text-blue-700 hover:bg-gray-100'
                  } transition-colors duration-200`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Documentation and help links */}
        {messages.length > 2 && !isTyping && followUpSuggestions.length === 0 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Looking for more detailed information?
              </p>
              <div className="flex space-x-3">
                <Link href="/dashboard/support/knowledge-base" className={`flex items-center text-sm ${
                  isDark ? 'text-[#00cbdd]' : 'text-blue-600'
                } hover:underline`}>
                  <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                  Knowledge Base
                </Link>
                <Link href="/dashboard/support/tutorials" className={`flex items-center text-sm ${
                  isDark ? 'text-[#00cbdd]' : 'text-blue-600'
                } hover:underline`}>
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Tutorials
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className={`flex items-end space-x-2 rounded-lg p-2 ${
            isDark
              ? 'bg-[#00052c]/80 border border-[#00cbdd]/20'
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <textarea
              id="chat-input"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className={`flex-1 max-h-[150px] overflow-auto resize-none px-2 py-2 ${
                isDark 
                  ? 'bg-transparent text-white placeholder-gray-500'
                  : 'bg-transparent text-gray-900 placeholder-gray-400'
              } focus:outline-none`}
              rows={1}
            />
            <div className="flex items-center">
              <button
                onClick={toggleRecording}
                className={`p-2 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : isDark 
                      ? 'hover:bg-gray-700 text-gray-400'
                      : 'hover:bg-gray-200 text-gray-500'
                } transition-colors duration-200`}
              >
                <Mic className="h-5 w-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`p-2 rounded-full ml-1 ${
                  !inputValue.trim()
                    ? isDark 
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#00cbdd] text-white hover:bg-[#00cbdd]/90'
                } transition-colors duration-200`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className={`mt-2 text-xs text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            AI-generated responses may not always be accurate. For critical issues, please contact support directly.
          </p>
        </div>
      </div>
    </div>
  );
} 