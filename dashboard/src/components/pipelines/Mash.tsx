import { useState, useRef, useEffect } from 'react';
import { Send, Loader, Bot, RefreshCw, Download } from 'lucide-react';
import { Pipeline } from '@/types/pipeline';
import { executePipeline } from '@/dashboard-api/pipeline-api';
import { toast } from 'react-hot-toast';

interface MashProps {
  pipeline: Pipeline;
  isDark: boolean;
  onClose?: () => void;
}

type MessageType = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
  loading?: boolean;
  error?: boolean;
}

export default function Mash({ pipeline, isDark, onClose }: MashProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: `Welcome to Mash! I'm ready to run the "${pipeline.name}" pipeline. What would you like to process?`,
      type: 'system',
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      type: 'user',
      timestamp: new Date(),
    };
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      type: 'assistant',
      timestamp: new Date(),
      loading: true,
    };
    
    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
    setIsProcessing(true);
    
    try {
      // Execute the pipeline with the user's input
      const result = await executePipeline(pipeline.id, { prompt: input.trim() });
      
      // Update the assistant message with the result
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { 
                ...msg, 
                text: typeof result.result.output === 'string' 
                  ? result.result.output 
                  : JSON.stringify(result.result.output, null, 2),
                loading: false 
              } 
            : msg
        )
      );
      
    } catch (error) {
      console.error('Error executing pipeline:', error);
      
      // Update the assistant message with the error
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { 
                ...msg, 
                text: 'Sorry, there was an error executing the pipeline. Please try again.',
                loading: false,
                error: true
              } 
            : msg
        )
      );
      
      toast.error('Pipeline execution failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`flex flex-col h-full rounded-xl overflow-hidden ${
      isDark 
        ? 'bg-[#00091b]/70 border border-[#00cbdd]/20' 
        : 'bg-white border border-gray-200 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`py-4 px-6 flex items-center justify-between ${
        isDark 
          ? 'bg-[#00091b]/80 border-b border-[#00cbdd]/20' 
          : 'bg-gray-50 border-b border-gray-200'
      }`}>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            isDark ? 'bg-[#00cbdd]/20' : 'bg-blue-100'
          }`}>
            <Bot className={`h-4 w-4 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`} />
          </div>
          <div>
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {pipeline.name}
            </h3>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Pipeline v{pipeline.version}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className={`p-1.5 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
            title="Clear conversation"
            onClick={() => setMessages([messages[0]])}
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button 
            className={`p-1.5 rounded-lg transition-colors ${
              isDark 
                ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
            }`}
            title="Download conversation"
          >
            <Download className="h-4 w-4" />
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isDark 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${
          isDark ? 'scrollbar-thumb-gray-700 scrollbar-track-transparent' : 'scrollbar-thumb-gray-300 scrollbar-track-gray-100'
        } scrollbar-thin`}
      >
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-xl px-4 py-3 ${
              message.type === 'user'
                ? isDark 
                  ? 'bg-[#00cbdd]/20 text-white' 
                  : 'bg-blue-100 text-gray-900'
                : message.type === 'system'
                  ? isDark 
                    ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                  : isDark 
                    ? 'bg-gray-800/70 text-white border border-gray-700' 
                    : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
            } ${message.error && (isDark ? 'border-red-500/50' : 'border-red-300')}`}>
              <div className={`${message.loading ? 'animate-pulse' : ''}`}>
                {message.loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Processing with pipeline...</span>
                  </div>
                ) : (
                  <pre className={`whitespace-pre-wrap font-sans ${
                    message.text.includes('{') && message.text.includes('}') 
                      ? 'text-xs' 
                      : ''
                  }`}>
                    {message.text}
                  </pre>
                )}
              </div>
              <div className={`mt-1 text-right text-xs ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit}
        className={`p-4 ${
          isDark 
            ? 'border-t border-[#00cbdd]/20' 
            : 'border-t border-gray-200'
        }`}
      >
        <div className="relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your prompt here..."
            rows={1}
            className={`w-full px-4 py-3 pr-12 rounded-lg resize-none ${
              isDark
                ? 'bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400'
            } focus:outline-none focus:ring-2 ${
              isDark ? 'focus:ring-[#00cbdd]' : 'focus:ring-blue-500'
            } focus:border-transparent`}
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !input.trim()}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
              isDark 
                ? 'bg-[#00cbdd] hover:bg-[#00b0c0] disabled:bg-gray-700' 
                : 'bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300'
            } text-white disabled:cursor-not-allowed transition-colors`}
          >
            {isProcessing ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className={`mt-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Press Enter to send, Shift+Enter for new line
        </p>
      </form>
    </div>
  );
}