"use client";

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Building2, 
  Stethoscope, 
  Scale, 
  ShoppingBag, 
  School, 
  Factory, 
  FileText, 
  MessagesSquare, 
  Search,
  Database,
  Image,
  FileCode2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function UseCasesSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeUseCase, setActiveUseCase] = useState('document-processing');
  const [isClient, setIsClient] = useState(false);
  
  // Initialize on client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  const useCases = [
    { 
      id: 'document-processing', 
      title: 'Document Processing', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      id: 'conversational-ai', 
      title: 'Conversational AI', 
      icon: <MessagesSquare className="h-5 w-5" /> 
    },
    { 
      id: 'search-retrieval', 
      title: 'Search & Retrieval', 
      icon: <Search className="h-5 w-5" /> 
    },
    { 
      id: 'data-analysis', 
      title: 'Data Analysis', 
      icon: <Database className="h-5 w-5" /> 
    },
    { 
      id: 'image-generation', 
      title: 'Image Generation', 
      icon: <Image className="h-5 w-5" /> 
    },
    { 
      id: 'code-generation', 
      title: 'Code Generation', 
      icon: <FileCode2 className="h-5 w-5" /> 
    }
  ];

  const industries = [
    { 
      id: 'financial', 
      title: 'Financial Services', 
      icon: <Building2 className="h-12 w-12 md:h-16 md:w-16 text-[#00cbdd]" />,
      description: 'Risk assessment, fraud detection, and personalized financial advice.',
      useCases: ['document-processing', 'data-analysis', 'conversational-ai']
    },
    { 
      id: 'healthcare', 
      title: 'Healthcare', 
      icon: <Stethoscope className="h-12 w-12 md:h-16 md:w-16 text-[#00cbdd]" />,
      description: 'Medical records analysis, patient communication, and research assistance.',
      useCases: ['document-processing', 'search-retrieval', 'data-analysis']
    },
    { 
      id: 'legal', 
      title: 'Legal', 
      icon: <Scale className="h-12 w-12 md:h-16 md:w-16 text-[#00cbdd]" />,
      description: 'Contract analysis, legal research, and case prediction models.',
      useCases: ['document-processing', 'search-retrieval', 'data-analysis']
    },
    { 
      id: 'retail', 
      title: 'Retail', 
      icon: <ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-[#00cbdd]" />,
      description: 'Inventory forecasting, customer support, and personalized recommendations.',
      useCases: ['conversational-ai', 'data-analysis', 'image-generation']
    },
    { 
      id: 'education', 
      title: 'Education', 
      icon: <School className="h-12 w-12 md:h-16 md:w-16 text-[#00cbdd]" />,
      description: 'Personalized learning, automated grading, and educational content creation.',
      useCases: ['document-processing', 'conversational-ai', 'code-generation']
    },
    { 
      id: 'manufacturing', 
      title: 'Manufacturing', 
      icon: <Factory className="h-12 w-12 md:h-16 md:w-16 text-[#00cbdd]" />,
      description: 'Quality control, predictive maintenance, and production optimization.',
      useCases: ['data-analysis', 'image-generation', 'code-generation']
    }
  ];

  const filteredIndustries = activeUseCase 
    ? industries.filter(industry => industry.useCases.includes(activeUseCase))
    : industries;

  const useCaseDescriptions = {
    'document-processing': {
      title: 'Document Processing',
      description: 'Extract, classify, and summarize information from documents with precision. Ideal for contracts, reports, and form processing.',
      benefits: ['Reduce manual data entry by 80%', 'Process thousands of documents in minutes', 'Extract structured data with high accuracy']
    },
    'conversational-ai': {
      title: 'Conversational AI',
      description: 'Build intelligent chatbots and virtual assistants that understand context and provide helpful responses.',
      benefits: ['Handle 70% of customer inquiries automatically', 'Available 24/7 across multiple channels', 'Continuously improves with user interactions']
    },
    'search-retrieval': {
      title: 'Search & Retrieval',
      description: 'Implement semantic search that understands user intent and delivers relevant results from your knowledge base.',
      benefits: ['Increase search relevancy by 65%', 'Reduce time to find information by 75%', 'Connect insights across disparate data sources']
    },
    'data-analysis': {
      title: 'Data Analysis',
      description: 'Analyze large datasets to identify patterns, predict trends, and generate actionable insights.',
      benefits: ['Uncover hidden patterns in complex data', 'Generate forecasts with explanations', 'Automate routine data analysis tasks']
    },
    'image-generation': {
      title: 'Image Generation',
      description: 'Create custom images, design variations, and visual content based on text descriptions.',
      benefits: ['Generate product mockups instantly', 'Create consistent brand visuals at scale', 'Visualize concepts before production']
    },
    'code-generation': {
      title: 'Code Generation',
      description: 'Accelerate development with AI-powered code generation, completion, and refactoring.',
      benefits: ['Reduce development time by 40%', 'Automatically document existing code', 'Identify and fix potential bugs']
    }
  };

  const activeUseCaseData = useCaseDescriptions[activeUseCase as keyof typeof useCaseDescriptions];

  // For server-side rendering, provide a simpler version
  if (!isClient) {
    return (
      <section id="use-cases" className="w-full py-20 bg-gradient-to-b from-transparent to-[#00091b]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
              Use Cases & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">Industry Applications</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#00091b]'}`}>
              How enterprises across industries are leveraging our platform
            </p>
          </div>
          
          {/* Simple Use Case Selector */}
          <div className="mb-16">
            <h3 className={`text-xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
              Select a Use Case
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {useCases.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => setActiveUseCase(useCase.id)}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                    activeUseCase === useCase.id
                      ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white shadow-lg'
                      : isDark 
                      ? 'bg-[#00091b]/50 border border-gray-700 text-gray-300 hover:border-[#00cbdd]/50'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-[#00cbdd]/50'
                  }`}
                >
                  <div className="mb-2">{useCase.icon}</div>
                  <span className="text-xs text-center">{useCase.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Simple Use Case Description */}
          <div className="mb-16">
            <DashboardCard title={activeUseCaseData.title} fullWidth>
              <div className="p-6">
                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {activeUseCaseData.description}
                </p>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Key Benefits:</h4>
                <ul className="list-disc pl-5">
                  {activeUseCaseData.benefits.map((benefit, index) => (
                    <li key={index} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </DashboardCard>
          </div>

          {/* Simple Industries Grid */}
          <div>
            <h3 className={`text-xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
              {filteredIndustries.length === industries.length 
                ? 'Across Industries' 
                : `Industries Using ${activeUseCaseData.title}`}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredIndustries.map((industry, index) => (
                <div
                  key={industry.id}
                  className={`p-6 rounded-xl border ${
                    isDark 
                      ? 'bg-[#00091b]/50 border-gray-700' 
                      : 'bg-white border-gray-200'
                  } shadow-md hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4">{industry.icon}</div>
                    <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                      {industry.title}
                    </h4>
                    <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {industry.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {industry.useCases.map((useCaseId) => {
                        const useCase = useCases.find(uc => uc.id === useCaseId);
                        return useCase ? (
                          <span 
                            key={useCaseId}
                            className={`text-xs px-2 py-1 rounded-full flex items-center ${
                              useCaseId === activeUseCase
                                ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white'
                                : isDark
                                ? 'bg-gray-700 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            <span className="mr-1">{useCase.icon}</span>
                            <span>{useCase.title}</span>
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="use-cases" className="w-full py-20 bg-gradient-to-b from-transparent to-[#00091b]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Use Cases & <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00cbdd] to-blue-500">Industry Applications</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-[#00091b]'}`}>
            How enterprises across industries are leveraging our platform
          </p>
        </motion.div>

        {/* Use Case Selector */}
        <div className="mb-16">
          <h3 className={`text-xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            Select a Use Case
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {useCases.map((useCase) => (
              <motion.button
                key={useCase.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveUseCase(useCase.id)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                  activeUseCase === useCase.id
                    ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white shadow-lg'
                    : isDark 
                    ? 'bg-[#00091b]/50 border border-gray-700 text-gray-300 hover:border-[#00cbdd]/50'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-[#00cbdd]/50'
                }`}
              >
                <div className="mb-2">{useCase.icon}</div>
                <span className="text-xs text-center">{useCase.title}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Use Case Description */}
        <motion.div
          key={activeUseCase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          <DashboardCard title={activeUseCaseData.title} fullWidth>
            <div className="p-6">
              <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {activeUseCaseData.description}
              </p>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>Key Benefits:</h4>
              <ul className="list-disc pl-5">
                {activeUseCaseData.benefits.map((benefit, index) => (
                  <li key={index} className={`mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Industries Section */}
        <div>
          <h3 className={`text-xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
            {filteredIndustries.length === industries.length 
              ? 'Across Industries' 
              : `Industries Using ${activeUseCaseData.title}`}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${
                  isDark 
                    ? 'bg-[#00091b]/50 border-gray-700' 
                    : 'bg-white border-gray-200'
                } shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{industry.icon}</div>
                  <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-[#00091b]'}`}>
                    {industry.title}
                  </h4>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {industry.useCases.map((useCaseId) => {
                      const useCase = useCases.find(uc => uc.id === useCaseId);
                      return useCase ? (
                        <span 
                          key={useCaseId}
                          className={`text-xs px-2 py-1 rounded-full flex items-center ${
                            useCaseId === activeUseCase
                              ? 'bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white'
                              : isDark
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="mr-1">{useCase.icon}</span>
                          <span>{useCase.title}</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 