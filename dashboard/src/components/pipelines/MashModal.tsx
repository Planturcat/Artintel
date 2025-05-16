import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Pipeline } from '@/types/pipeline';
import Mash from './Mash';

interface MashModalProps {
  isOpen: boolean;
  onClose: () => void;
  pipeline: Pipeline | null;
  isDark: boolean;
}

export default function MashModal({ isOpen, onClose, pipeline, isDark }: MashModalProps) {
  if (!pipeline) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`w-full max-w-4xl h-3/4 rounded-xl overflow-hidden ${
          isDark 
            ? 'bg-[#00091b]/90 backdrop-blur-sm border border-[#00cbdd]/20' 
            : 'bg-white shadow-lg border border-gray-200'
        }`}>
          {/* Header */}
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={onClose}
              className={`p-1.5 rounded-full ${
                isDark 
                  ? 'bg-gray-800/70 hover:bg-gray-700 text-gray-400 hover:text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
              } transition-colors`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mash Interface */}
          <div className="h-full">
            <Mash 
              pipeline={pipeline} 
              isDark={isDark} 
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 