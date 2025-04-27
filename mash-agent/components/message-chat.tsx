import React from 'react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageChatProps {
  message: Message;
  isLastMessage: boolean;
}

export const MessageChat: React.FC<MessageChatProps> = ({ 
  message, 
  isLastMessage 
}) => {
  const isUserMessage = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "mb-6 last:mb-0", 
        isUserMessage ? "text-right" : "text-left"
      )}
      aria-live={isLastMessage && !isUserMessage ? "polite" : "off"}
    >
      <div
        className={cn(
          "inline-block max-w-[80%] rounded-xl p-4",
          isUserMessage
            ? "bg-[#00cbdd] text-[#00031b]"
            : "bg-[#00031b] border border-[#00cbdd]/30 text-white",
        )}
      >
        {message.role === 'assistant' ? (
          <div className="text-sm whitespace-pre-wrap markdown-content">
            <ReactMarkdown
              components={{
                // Add proper styling for markdown elements
                h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-4" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-3" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-md font-bold my-2" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                li: ({ node, ...props }) => <li className="my-1" {...props} />,
                p: ({ node, ...props }) => <p className="my-2" {...props} />,
                a: ({ node, ...props }) => (
                  <a 
                    className="text-[#00cbdd] hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    {...props} 
                  />
                ),
                code: ({ node, inline, ...props }) => 
                  inline ? (
                    <code className="bg-[#00031b]/80 px-1 py-0.5 rounded text-[#00cbdd]" {...props} />
                  ) : (
                    <code className="block bg-[#00031b]/80 p-3 rounded my-2 overflow-x-auto" {...props} />
                  ),
                pre: ({ node, ...props }) => <pre className="my-2 overflow-x-auto" {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote 
                    className="border-l-4 border-[#00cbdd]/30 pl-4 italic my-2" 
                    {...props} 
                  />
                ),
              }}
            >
              {message.content || ""}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-sm whitespace-pre-wrap">{message.content || ""}</div>
        )}
      </div>
    </div>
  );
};

export default MessageChat; 