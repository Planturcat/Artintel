import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Plus, Tag, Check } from 'lucide-react';
import { createPipeline } from '@/dashboard-api/pipeline-api';
import { Pipeline } from '@/types/pipeline';
import Button from '@/components/ui/Button';

interface CreatePipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onCreateSuccess: (pipeline: Pipeline) => void;
}

export default function CreatePipelineModal({
  isOpen,
  onClose,
  isDark,
  onCreateSuccess
}: CreatePipelineModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
  }>({});

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = tagInput.trim().toLowerCase();
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Pipeline name is required';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Pipeline name must be at least 3 characters';
    }
    
    if (description && description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsCreating(true);
      
      const pipeline = await createPipeline({
        name: name.trim(),
        description: description.trim(),
        tags
      });
      
      onCreateSuccess(pipeline);
      handleReset();
      onClose();
    } catch (error) {
      console.error('Error creating pipeline:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setTags([]);
    setTagInput('');
    setErrors({});
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          if (!isCreating) {
            handleReset();
            onClose();
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-md transform rounded-xl overflow-hidden p-6 text-left align-middle shadow-xl transition-all ${
                isDark 
                  ? 'bg-[#00091b]/90 backdrop-blur-sm border border-[#00cbdd]/20 text-white' 
                  : 'bg-white text-gray-900'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Create New Pipeline
                  </Dialog.Title>
                  <button
                    onClick={() => {
                      if (!isCreating) {
                        handleReset();
                        onClose();
                      }
                    }}
                    disabled={isCreating}
                    className={`rounded-full p-1.5 ${
                      isDark
                        ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="pipeline-name" 
                        className={isDark ? 'text-gray-300' : 'text-gray-700'}
                      >
                        Pipeline Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pipeline-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 ${
                          isDark
                            ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                        } border focus:outline-none focus:ring-2 ${
                          isDark ? 'focus:ring-[#00cbdd]' : 'focus:ring-blue-500'
                        } focus:border-transparent`}
                        placeholder="Enter pipeline name"
                        disabled={isCreating}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="pipeline-description" 
                        className={isDark ? 'text-gray-300' : 'text-gray-700'}
                      >
                        Description
                      </label>
                      <textarea
                        id="pipeline-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className={`mt-1 block w-full rounded-lg px-3 py-2 ${
                          isDark
                            ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                        } border focus:outline-none focus:ring-2 ${
                          isDark ? 'focus:ring-[#00cbdd]' : 'focus:ring-blue-500'
                        } focus:border-transparent resize-none`}
                        placeholder="Enter pipeline description (optional)"
                        disabled={isCreating}
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                      )}
                      <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {description.length}/500 characters
                      </p>
                    </div>

                    <div>
                      <label 
                        htmlFor="pipeline-tags" 
                        className={isDark ? 'text-gray-300' : 'text-gray-700'}
                      >
                        Tags
                      </label>
                      <div className="mt-1 flex">
                        <input
                          id="pipeline-tags"
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className={`block w-full rounded-l-lg px-3 py-2 ${
                            isDark
                              ? 'bg-gray-800 border-gray-700 text-white placeholder:text-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
                          } border focus:outline-none focus:ring-2 ${
                            isDark ? 'focus:ring-[#00cbdd]' : 'focus:ring-blue-500'
                          } focus:border-transparent`}
                          placeholder="Add tags (e.g., nlp, classification)"
                          disabled={isCreating}
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          disabled={isCreating || !tagInput.trim()}
                          className={`px-3 rounded-r-lg ${
                            isDark
                              ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      {tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <div
                              key={tag}
                              className={`flex items-center px-2 py-1 rounded-full text-xs ${
                                isDark
                                  ? 'bg-[#00cbdd]/20 text-[#00cbdd]'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                disabled={isCreating}
                                className="ml-1.5 p-0.5 rounded-full hover:bg-black/20"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        handleReset();
                        onClose();
                      }}
                      disabled={isCreating}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isCreating}
                      disabled={isCreating || !name.trim()}
                    >
                      {isCreating ? 'Creating...' : 'Create Pipeline'}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}