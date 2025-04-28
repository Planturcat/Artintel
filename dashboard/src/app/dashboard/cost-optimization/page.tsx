'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DollarSign, 
  TrendingDown, 
  AlertCircle, 
  Server, 
  HardDrive, 
  Zap, 
  Search,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Activity,
  Filter,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

// Sample cost data
const costData = {
  currentSpending: 1245.87,
  projectedSavings: 378.42,
  savingPercentage: 30.4,
  costBreakdown: {
    compute: 625.45,
    storage: 320.21,
    models: 210.32,
    transfer: 89.89
  },
  recommendedSavings: [
    {
      id: 1,
      title: 'Idle GPU Instances',
      description: 'Two GPU instances have been inactive for 7+ days',
      savingAmount: 192.45,
      implementation: 'medium',
      category: 'compute'
    },
    {
      id: 2,
      title: 'Over-provisioned Storage',
      description: 'Reduce unused storage allocation by 30%',
      savingAmount: 96.21,
      implementation: 'easy',
      category: 'storage'
    },
    {
      id: 3,
      title: 'Right-size Model Deployments',
      description: 'Use smaller models for low-complexity tasks',
      savingAmount: 64.76,
      implementation: 'complex',
      category: 'models'
    },
    {
      id: 4,
      title: 'Batch Processing Opportunity',
      description: 'Convert real-time to batch processing for non-urgent tasks',
      savingAmount: 25.00,
      implementation: 'medium',
      category: 'compute'
    }
  ],
  dailyCosts: [
    { date: '2023-07-01', cost: 42.12 },
    { date: '2023-07-02', cost: 40.87 },
    { date: '2023-07-03', cost: 45.23 },
    { date: '2023-07-04', cost: 39.76 },
    { date: '2023-07-05', cost: 41.34 },
    { date: '2023-07-06', cost: 43.56 },
    { date: '2023-07-07', cost: 44.89 }
  ]
};

// Add interfaces for type safety
interface SavingRecommendation {
  id: number;
  title: string;
  description: string;
  savingAmount: number;
  implementation: 'easy' | 'medium' | 'complex';
  category: 'compute' | 'storage' | 'models' | 'transfer';
  implemented?: boolean;
  implementing?: boolean;
}

export default function CostOptimizationPage() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('lastSevenDays');
  const [recommendations, setRecommendations] = useState<SavingRecommendation[]>(
    costData.recommendedSavings as SavingRecommendation[]
  );
  const [implementedSavings, setImplementedSavings] = useState(0);
  const [showImplementationModal, setShowImplementationModal] = useState<number | null>(null);
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Filter recommendations based on search
  const filteredRecommendations = recommendations.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get implementation style
  const getImplementationStyle = (implementation: string) => {
    switch(implementation) {
      case 'easy':
        return isDark ? 'text-green-400' : 'text-green-600';
      case 'medium':
        return isDark ? 'text-yellow-400' : 'text-yellow-600';
      case 'complex':
        return isDark ? 'text-red-400' : 'text-red-600';
      default:
        return '';
    }
  };
  
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'compute':
        return <Zap className="h-4 w-4" />;
      case 'storage':
        return <HardDrive className="h-4 w-4" />;
      case 'models':
        return <Server className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };
  
  // Implement a saving recommendation
  const implementSaving = (id: number) => {
    setShowImplementationModal(id);
  };
  
  // Confirm implementation of a saving recommendation
  const confirmImplementation = (id: number) => {
    setRecommendations(prevRecommendations => 
      prevRecommendations.map(rec => 
        rec.id === id 
          ? { ...rec, implementing: true } 
          : rec
      )
    );
    
    // Simulate API call
    setTimeout(() => {
      setRecommendations(prevRecommendations => 
        prevRecommendations.map(rec => 
          rec.id === id 
            ? { ...rec, implementing: false, implemented: true } 
            : rec
        )
      );
      
      // Update implemented savings amount
      const recommendation = recommendations.find(rec => rec.id === id);
      if (recommendation) {
        setImplementedSavings(prev => prev + recommendation.savingAmount);
      }
      
      setShowImplementationModal(null);
    }, 1500);
  };
  
  // Implementation Modal
  const ImplementationModal = ({ id }: { id: number }) => {
    const recommendation = recommendations.find(rec => rec.id === id);
    if (!recommendation) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
          onClick={() => setShowImplementationModal(null)}
        />
        <motion.div 
          className={`relative w-full max-w-md p-6 rounded-xl shadow-lg ${
            isDark 
              ? 'bg-[#00031b]/95 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('implementSavings')}
            </h3>
            <button 
              onClick={() => setShowImplementationModal(null)}
              className={`p-1 rounded-full ${
                isDark ? 'hover:bg-[#00cbdd]/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className={`flex items-center mb-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {getCategoryIcon(recommendation.category)}
              <span className="ml-2">{recommendation.title}</span>
            </div>
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {recommendation.description}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('savingsEstimate')}:
                </span>
                <span className={`ml-2 font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {formatCurrency(recommendation.savingAmount)}
                </span>
              </div>
              <div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {t('difficulty')}:
                </span>
                <span className={`ml-2 font-medium ${getImplementationStyle(recommendation.implementation)}`}>
                  {recommendation.implementation.charAt(0).toUpperCase() + recommendation.implementation.slice(1)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowImplementationModal(null)}
              className={`px-4 py-2 rounded-lg ${
                isDark 
                  ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {t('cancel')}
            </button>
            <button
              onClick={() => confirmImplementation(id)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200"
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              {t('implementSavings')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('costOptimization')}
          </h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('optimizeResourceUsage')}
          </p>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            className={`flex items-center px-4 py-2 rounded-lg border ${
              isDark 
                ? 'border-[#00cbdd]/30 text-white hover:bg-[#00cbdd]/10' 
                : 'border-blue-300 text-blue-700 hover:bg-blue-50'
            } transition-all duration-200`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="h-4 w-4 mr-2" />
            {t('downloadReport')}
          </motion.button>
          
          <motion.button
            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white rounded-lg hover:opacity-90 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingDown className="h-4 w-4 mr-2" />
            {t('optimize')}
          </motion.button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Current Spending */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`p-5 rounded-xl ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('currentSpending')}
              </p>
              <h3 className={`mt-2 text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(costData.currentSpending)}
              </h3>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('lastThirtyDays')}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-blue-500/10' : 'bg-blue-100'
            }`}>
              <DollarSign className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
        </motion.div>
        
        {/* Projected Savings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`p-5 rounded-xl ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('projectedSavings')}
              </p>
              <h3 className={`mt-2 text-2xl font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {formatCurrency(costData.projectedSavings)}
              </h3>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {costData.savingPercentage}% {t('saving')}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              isDark ? 'bg-green-500/10' : 'bg-green-100'
            }`}>
              <TrendingDown className={`h-5 w-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
        </motion.div>
        
        {/* Implemented Savings / Budget Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className={`p-5 rounded-xl ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {implementedSavings > 0 ? t('implementedSavings') : t('budgetTracking')}
              </p>
              <h3 className={`mt-2 text-2xl font-semibold ${
                implementedSavings > 0 
                  ? (isDark ? 'text-blue-400' : 'text-blue-600')
                  : (isDark ? 'text-amber-400' : 'text-amber-600')
              }`}>
                {implementedSavings > 0 
                  ? formatCurrency(implementedSavings)
                  : '83%'
                }
              </h3>
              <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {implementedSavings > 0 
                  ? `${Math.round((implementedSavings / costData.projectedSavings) * 100)}% ${t('of')} ${t('projectedSavings')}`
                  : t('of') + ' ' + t('monthlyBudget')
                }
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              implementedSavings > 0
                ? (isDark ? 'bg-blue-500/10' : 'bg-blue-100')
                : (isDark ? 'bg-amber-500/10' : 'bg-amber-100')
            }`}>
              {implementedSavings > 0 
                ? <Activity className={`h-5 w-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                : <AlertCircle className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
              }
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Savings Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Savings Recommendations */}
          <div className={`p-6 rounded-xl ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('savingsRecommendations')}
              </h2>
              
              <div className="mt-3 sm:mt-0 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={t('search')}
                  className={`pl-10 pr-4 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-[#000426] border border-[#00cbdd]/20 text-white placeholder-gray-500'
                      : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-[#00cbdd] w-full sm:w-auto`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredRecommendations.length > 0 ? (
                filteredRecommendations.map((recommendation) => (
                  <motion.div
                    key={recommendation.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`p-4 rounded-lg ${
                      recommendation.implemented
                        ? isDark 
                          ? 'bg-[#000426]/80 border border-blue-500/30'
                          : 'bg-blue-50 border border-blue-200'
                        : isDark 
                          ? 'bg-[#000426] border border-[#00cbdd]/10'
                          : 'bg-gray-50 border border-gray-200'
                    } hover:border-[#00cbdd]/30 transition-all duration-200`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <div className={`p-1.5 rounded-md mr-3 ${
                            isDark ? 'bg-[#00031b]' : 'bg-white'
                          }`}>
                            {getCategoryIcon(recommendation.category)}
                          </div>
                          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {recommendation.title}
                          </h3>
                        </div>
                        
                        <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {recommendation.description}
                        </p>
                        
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            {formatCurrency(recommendation.savingAmount)}
                          </span>
                          <span className={`mx-2 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>•</span>
                          <span className={`text-xs ${getImplementationStyle(recommendation.implementation)}`}>
                            {recommendation.implementation.charAt(0).toUpperCase() + recommendation.implementation.slice(1)} {t('implementation')}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        {recommendation.implemented ? (
                          <div className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                            isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {t('implemented')}
                          </div>
                        ) : recommendation.implementing ? (
                          <div className="flex items-center px-3 py-1.5 rounded-lg bg-[#00cbdd]/20 text-[#00cbdd] text-xs font-medium">
                            <div className="w-3 h-3 border-2 border-[#00cbdd] border-t-transparent rounded-full animate-spin mr-1"></div>
                            {t('implementing')}
                          </div>
                        ) : (
                          <button
                            onClick={() => implementSaving(recommendation.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                              isDark 
                                ? 'bg-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/30' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            } transition-colors duration-200`}
                          >
                            {t('implement')}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`p-6 text-center rounded-lg ${
                  isDark 
                    ? 'bg-[#000426] border border-[#00cbdd]/10'
                    : 'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {t('noRecommendationsFound')}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Implementation Modal */}
          {showImplementationModal !== null && (
            <ImplementationModal id={showImplementationModal} />
          )}
        </div>
        
        {/* Right Column: Cost Breakdown */}
        <div className="space-y-6">
          {/* Cost Breakdown */}
          <div className={`p-6 rounded-xl ${
            isDark 
              ? 'bg-[#00031b]/90 border border-[#00cbdd]/20'
              : 'bg-white border border-gray-200'
          }`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('costBreakdown')}
            </h2>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Zap className={`h-4 w-4 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`} />
                    <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('computeCosts')}
                    </span>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(costData.costBreakdown.compute)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-[#00cbdd] to-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${(costData.costBreakdown.compute / costData.currentSpending) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <HardDrive className={`h-4 w-4 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`} />
                    <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('storageCosts')}
                    </span>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(costData.costBreakdown.storage)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-[#00cbdd] to-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${(costData.costBreakdown.storage / costData.currentSpending) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Server className={`h-4 w-4 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`} />
                    <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('modelCosts')}
                    </span>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(costData.costBreakdown.models)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-[#00cbdd] to-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${(costData.costBreakdown.models / costData.currentSpending) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`p-4 rounded-lg ${isDark ? 'bg-[#000426]' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <DollarSign className={`h-4 w-4 mr-2 ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`} />
                    <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {t('dataTransferCosts')}
                    </span>
                  </div>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(costData.costBreakdown.transfer)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-[#00cbdd] to-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${(costData.costBreakdown.transfer / costData.currentSpending) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 