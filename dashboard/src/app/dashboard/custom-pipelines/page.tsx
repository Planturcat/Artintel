'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { PlusCircle, Workflow, Box, Code, Activity, Play, Share, Layers, RefreshCw, ArrowRight, MessageSquare } from 'lucide-react';
import DashboardCard from '@/components/dashboard/DashboardCard';
import Button from '@/components/ui/Button';
import { toast } from 'react-hot-toast';
import PipelinesList from '@/components/pipelines/PipelinesList';
import CreatePipelineModal from '@/components/pipelines/CreatePipelineModal';
import MashModal from '@/components/pipelines/MashModal';
import PipelineStatusCard from '@/components/pipelines/PipelineStatusCard';
import PipelineTemplateCard from '@/components/pipelines/PipelineTemplateCard';
import { getPipelines, getPipelineMetrics, getPipelineTemplates } from '@/dashboard-api/pipeline-api';
import { getModels } from '@/dashboard-api/model-api';
import { getFineTuningJobs } from '@/dashboard-api/fine-tuning-api';
import { getUserContext } from '@/dashboard-api/mock-user-context';
import { Pipeline, PipelineMetrics, PipelineTemplate } from '@/types/pipeline';

export default function CustomPipelinesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [templates, setTemplates] = useState<PipelineTemplate[]>([]);
  const [metrics, setMetrics] = useState<PipelineMetrics | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMashModalOpen, setIsMashModalOpen] = useState(false);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'draft'>('all');
  const [user, setUser] = useState(getUserContext());

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [pipelinesData, metricsData, templatesData] = await Promise.all([
        getPipelines(),
        getPipelineMetrics(),
        getPipelineTemplates()
      ]);

      setPipelines(pipelinesData);
      setMetrics(metricsData);
      setTemplates(templatesData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch pipeline data');
      toast.error('Failed to fetch pipeline data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast.success('Data refreshed successfully');
  };

  const handleOpenMash = (pipeline: Pipeline) => {
    setSelectedPipeline(pipeline);
    setIsMashModalOpen(true);
  };

  const filteredPipelines = pipelines.filter(pipeline => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return pipeline.status === 'active';
    if (activeTab === 'draft') return pipeline.status === 'draft';
    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
        <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Custom Pipelines</h1>
          <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Create, manage, and deploy AI workflow pipelines
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-lg ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
            } transition-colors`}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00cbdd] to-blue-500 text-white hover:from-[#00b0c0] hover:to-blue-600 flex items-center gap-2"
          >
            <PlusCircle className="h-5 w-5" />
            Create Pipeline
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <PipelineStatusCard
          title="Total Pipelines"
          value={metrics?.totalPipelines || 0}
          icon={<Box className="h-5 w-5" />}
          trend={metrics?.pipelineTrend || 0}
          isDark={isDark}
        />
        <PipelineStatusCard
          title="Active Pipelines"
          value={metrics?.activePipelines || 0}
          icon={<Activity className="h-5 w-5" />}
          trend={metrics?.activeTrend || 0}
          isDark={isDark}
        />
        <PipelineStatusCard
          title="Pipeline Executions"
          value={metrics?.totalExecutions || 0}
          icon={<Play className="h-5 w-5" />}
          trend={metrics?.executionTrend || 0}
          isDark={isDark}
        />
        <PipelineStatusCard
          title="Models in Pipelines"
          value={metrics?.totalModelsUsed || 0}
          icon={<Layers className="h-5 w-5" />}
          trend={0}
          isDark={isDark}
        />
      </div>

      {/* New Section: Quick Actions */}
      <DashboardCard
        title="Mash Prompt Interface"
        subtitle="Quickly interact with your pipelines through natural language"
        isLoading={isLoading}
        className="mb-8"
      >
        <div className="p-4 rounded-lg border border-dashed flex flex-col items-center justify-center text-center py-10 space-y-4
          ${isDark ? 'border-gray-700 bg-[#00091b]/30' : 'border-gray-300 bg-gray-50'}">
          <div className={`p-4 rounded-full ${
            isDark ? 'bg-[#00cbdd]/10' : 'bg-blue-50'
          }`}>
            <MessageSquare className={`h-8 w-8 ${isDark ? 'text-[#00cbdd]' : 'text-blue-500'}`} />
          </div>
          <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {user ? `${user.firstName}, communicate with your pipelines using Mash` : 'Communicate with your pipelines using Mash'}
          </h3>
          <p className={`max-w-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Mash provides a chat-like interface to send prompts to your active pipelines.
            Select a pipeline from the list below and click the <MessageSquare className="h-4 w-4 inline mx-1" /> icon to get started.
          </p>

          {pipelines.filter(p => p.status === 'active').length === 0 ? (
            <div className={`p-3 rounded-lg ${
              isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
            } inline-block mt-2`}>
              {user ? `${user.firstName}, you need active pipelines to use Mash` : 'You need active pipelines to use Mash'}
            </div>
          ) : (
            <Button
              onClick={() => {
                const activePipeline = pipelines.find(p => p.status === 'active');
                if (activePipeline) {
                  setSelectedPipeline(activePipeline);
                  setIsMashModalOpen(true);
                }
              }}
              className="mt-2"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Launch Mash
            </Button>
          )}
        </div>
      </DashboardCard>

      {/* Templates Section */}
      <DashboardCard
        title="Pipeline Templates"
        subtitle={user && user.tier === 'pro' ? 'Pro templates available for your account' : 'Start with pre-built pipeline templates'}
        isLoading={isLoading}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates
            .filter(template => {
              // Filter templates based on user tier
              if (!user || user.tier === 'free') {
                return !template.tags.includes('pro') && !template.tags.includes('enterprise');
              } else if (user.tier === 'pro') {
                return !template.tags.includes('enterprise');
              }
              return true; // Enterprise users see all templates
            })
            .slice(0, 3)
            .map((template) => (
              <PipelineTemplateCard
                key={template.id}
                template={template}
                isDark={isDark}
                onClick={() => {
                  setIsCreateModalOpen(true);
                  // Logic to pre-select template would go here
                  toast.success(`Template "${template.name}" selected`);
                }}
              />
            ))}
        </div>
      </DashboardCard>

      {/* Pipelines List */}
      <DashboardCard
        title={user ? `${user.firstName}'s Pipelines` : "Your Pipelines"}
        subtitle={user ? `Manage your custom pipelines (${pipelines.length} total)` : "Manage your custom pipelines"}
        isLoading={isLoading}
      >
        {/* Tabs for filtering */}
        <div className={`mb-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex space-x-8">
            <button
              className={`py-2 px-1 relative ${
                activeTab === 'all'
                  ? `font-medium ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`
                  : isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Pipelines
              {activeTab === 'all' && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isDark ? 'bg-[#00cbdd]' : 'bg-blue-600'
                }`}></span>
              )}
            </button>
            <button
              className={`py-2 px-1 relative ${
                activeTab === 'active'
                  ? `font-medium ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`
                  : isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('active')}
            >
              Active
              {activeTab === 'active' && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isDark ? 'bg-[#00cbdd]' : 'bg-blue-600'
                }`}></span>
              )}
            </button>
            <button
              className={`py-2 px-1 relative ${
                activeTab === 'draft'
                  ? `font-medium ${isDark ? 'text-[#00cbdd]' : 'text-blue-600'}`
                  : isDark ? 'text-gray-400' : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('draft')}
            >
              Drafts
              {activeTab === 'draft' && (
                <span className={`absolute bottom-0 left-0 w-full h-0.5 ${
                  isDark ? 'bg-[#00cbdd]' : 'bg-blue-600'
                }`}></span>
              )}
            </button>
          </div>
        </div>

        <PipelinesList
          pipelines={filteredPipelines}
          isDark={isDark}
          onOpenMash={handleOpenMash}
        />
      </DashboardCard>

      {/* Create Pipeline Modal */}
      <CreatePipelineModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        isDark={isDark}
        onCreateSuccess={(newPipeline) => {
          setPipelines([...pipelines, newPipeline]);
          toast.success('Pipeline created successfully');
        }}
      />

      {/* Mash Modal */}
      <MashModal
        isOpen={isMashModalOpen}
        onClose={() => setIsMashModalOpen(false)}
        pipeline={selectedPipeline}
        isDark={isDark}
      />
    </div>
  );
}