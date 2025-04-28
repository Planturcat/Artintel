'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { toast } from 'react-hot-toast';
import PipelineBuilder from '@/components/pipelines/PipelineBuilder';
import { 
  getPipeline, 
  updatePipeline 
} from '@/dashboard-api/pipeline-api';
import { Pipeline, PipelineComponent, PipelineConnection } from '@/types/pipeline';

export default function PipelineBuilderPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const router = useRouter();
  const searchParams = useSearchParams();
  const pipelineId = searchParams.get('id');
  
  const [pipeline, setPipeline] = useState<Pipeline | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch pipeline data
  useEffect(() => {
    const fetchData = async () => {
      if (!pipelineId) {
        setError('No pipeline ID provided');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const pipelineData = await getPipeline(pipelineId);
        setPipeline(pipelineData);
      } catch (err) {
        console.error('Error fetching pipeline:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch pipeline');
        toast.error('Failed to load pipeline');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pipelineId]);

  // Handle save
  const handleSave = async (components: PipelineComponent[], connections: PipelineConnection[]) => {
    if (!pipelineId || !pipeline) {
      toast.error('Cannot save: pipeline not loaded');
      return;
    }

    setIsSaving(true);
    try {
      const updatedPipeline = await updatePipeline(pipelineId, {
        components,
        connections
      });
      
      setPipeline(updatedPipeline);
      toast.success('Pipeline saved successfully');
    } catch (err) {
      console.error('Error saving pipeline:', err);
      toast.error('Failed to save pipeline');
      throw err; // Re-throw to handle in the component
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !pipeline) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || 'Failed to load pipeline'}</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <PipelineBuilder 
        pipeline={pipeline}
        isDark={isDark}
        onSave={handleSave}
        isLoading={isSaving}
      />
    </div>
  );
} 