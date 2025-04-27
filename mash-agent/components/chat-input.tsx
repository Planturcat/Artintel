import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Paperclip, Import, ArrowUp, Loader2 } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  onFileUpload: (file: File) => Promise<void>;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  input,
  setInput,
  handleSubmit,
  isLoading,
  onFileUpload,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        handleSubmit(e as any);
      }
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative rounded-xl overflow-hidden bg-[#00031b]/80 backdrop-blur-md border border-[#00cbdd]/20 shadow-[0_0_15px_rgba(0,203,221,0.1)]">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Mash something..."
          className="min-h-[60px] max-h-[200px] w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 py-4 px-4 pr-24 resize-none"
          disabled={isLoading}
          onKeyDown={handleKeyDown}
          aria-label="Chat message input"
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            aria-hidden="true"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full text-white/70 hover:text-[#00cbdd] hover:bg-white/10"
            disabled={isLoading}
            onClick={handleFileSelect}
            aria-label="Attach file"
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach</span>
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full text-white/70 hover:text-[#00cbdd] hover:bg-white/10"
            disabled={isLoading}
            aria-label="Import"
          >
            <Import className="h-4 w-4" />
            <span className="sr-only">Import</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-8 w-8 rounded-full bg-[#00cbdd] text-[#00031b] hover:opacity-90"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput; 