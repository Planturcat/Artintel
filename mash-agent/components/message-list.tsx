import React, { useRef, useEffect } from 'react';
import { MessageChat } from './message-chat';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: Message[];
  className?: string;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, className }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // If there are no messages, return empty container
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-4xl mx-auto mb-8 overflow-auto max-h-[60vh] ${className || ''}`}>
      {messages.map((message, index) => (
        <MessageChat 
          key={index} 
          message={message} 
          isLastMessage={index === messages.length - 1} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 