import { useState } from 'react';
import Link from 'next/link';
import { Play, Edit, Trash, MoreVertical, CheckCircle, AlertCircle, Clock, ExternalLink, Copy, MessageSquare } from 'lucide-react';
import { Pipeline, PipelineStatus } from '@/types/pipeline';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import { updatePipelineStatus, deletePipeline, executePipeline } from '@/dashboard-api/pipeline-api';

interface PipelinesListProps {
  pipelines: Pipeline[];
  isDark: boolean;
  onOpenMash: (pipeline: Pipeline) => void;
}

export default function PipelinesList({ pipelines, isDark, onOpenMash }: PipelinesListProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<string | null>(null);

  // Get status badge styling
  const getStatusBadge = (status: PipelineStatus) => {
    switch (status) {
      case 'active':
        return {
          bg: isDark ? 'bg-green-500/20' : 'bg-green-100',
          text: isDark ? 'text-green-400' : 'text-green-600',
          icon: <CheckCircle className="h-3 w-3 mr-1" />
        };
      case 'error':
        return {
          bg: isDark ? 'bg-red-500/20' : 'bg-red-100',
          text: isDark ? 'text-red-400' : 'text-red-600',
          icon: <AlertCircle className="h-3 w-3 mr-1" />
        };
      case 'draft':
        return {
          bg: isDark ? 'bg-yellow-500/20' : 'bg-yellow-100',
          text: isDark ? 'text-yellow-400' : 'text-yellow-600',
          icon: <Clock className="h-3 w-3 mr-1" />
        };
      case 'paused':
        return {
          bg: isDark ? 'bg-gray-500/20' : 'bg-gray-100',
          text: isDark ? 'text-gray-400' : 'text-gray-600',
          icon: <Clock className="h-3 w-3 mr-1" />
        };
      default:
        return {
          bg: isDark ? 'bg-gray-700' : 'bg-gray-100',
          text: isDark ? 'text-gray-300' : 'text-gray-600',
          icon: null
        };
    }
  };

  const handleMenuToggle = (id: string) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  const handleStatusChange = async (id: string, status: PipelineStatus) => {
    try {
      await updatePipelineStatus(id, status);
      toast.success(`Pipeline status updated to ${status}`);
      // The parent component should handle refreshing the list
    } catch (error) {
      toast.error('Failed to update pipeline status');
      console.error(error);
    } finally {
      setExpandedMenu(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this pipeline?')) {
      try {
        await deletePipeline(id);
        toast.success('Pipeline deleted successfully');
        // The parent component should handle refreshing the list
      } catch (error) {
        toast.error('Failed to delete pipeline');
        console.error(error);
      }
    }
  };

  const handleExecute = async (id: string) => {
    setIsExecuting(id);
    try {
      const result = await executePipeline(id, {});
      toast.success('Pipeline executed successfully');
      console.log('Execution result:', result);
    } catch (error) {
      toast.error('Failed to execute pipeline');
      console.error(error);
    } finally {
      setIsExecuting(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (pipelines.length === 0) {
    return (
      <div className={`text-center py-10 rounded-lg ${
        isDark ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
          No pipelines found. Create your first pipeline to get started.
        </p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${
      isDark ? 'scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800/50' : 
      'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
    }`}>
      <table className="w-full min-w-full table-auto">
        <thead>
          <tr className={`text-left ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <th className="px-4 py-3 text-sm font-medium">Name</th>
            <th className="px-4 py-3 text-sm font-medium">Status</th>
            <th className="px-4 py-3 text-sm font-medium">Last Updated</th>
            <th className="px-4 py-3 text-sm font-medium">Version</th>
            <th className="px-4 py-3 text-sm font-medium">Executions</th>
            <th className="px-4 py-3 text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {pipelines.map((pipeline) => {
            const statusBadge = getStatusBadge(pipeline.status);
            
            return (
              <tr 
                key={pipeline.id}
                className={`${
                  isDark 
                    ? 'hover:bg-gray-800/50' 
                    : 'hover:bg-gray-50'
                } transition-colors`}
              >
                <td className="px-4 py-4">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-blue-500/10' : 'bg-blue-50'
                    } mr-3`}>
                      <div className={isDark ? 'text-[#00cbdd]' : 'text-blue-500'}>
                        <Play className="h-4 w-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {pipeline.name}
                      </h4>
                      {pipeline.description && (
                        <p className={`text-xs mt-0.5 line-clamp-1 ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {pipeline.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                    {statusBadge.icon}
                    {pipeline.status.charAt(0).toUpperCase() + pipeline.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {formatDate(pipeline.updatedAt)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {pipeline.version}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {pipeline.executionCount?.toLocaleString() || 0}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleExecute(pipeline.id)}
                      disabled={pipeline.status !== 'active' || isExecuting === pipeline.id}
                      className={`p-1.5 rounded-lg transition-colors ${
                        pipeline.status === 'active'
                          ? isDark 
                            ? 'text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                            : 'text-blue-500 hover:bg-blue-50'
                          : isDark 
                            ? 'text-gray-600 cursor-not-allowed' 
                            : 'text-gray-300 cursor-not-allowed'
                      }`}
                      title="Execute pipeline"
                    >
                      <Play className={`h-4 w-4 ${isExecuting === pipeline.id ? 'animate-pulse' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => onOpenMash(pipeline)}
                      disabled={pipeline.status !== 'active'}
                      className={`p-1.5 rounded-lg transition-colors ${
                        pipeline.status === 'active'
                          ? isDark 
                            ? 'text-[#00cbdd] hover:bg-[#00cbdd]/10' 
                            : 'text-blue-500 hover:bg-blue-50'
                          : isDark 
                            ? 'text-gray-600 cursor-not-allowed' 
                            : 'text-gray-300 cursor-not-allowed'
                      }`}
                      title="Open Mash prompt interface"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    
                    <Link
                      href={`/dashboard/custom-pipelines/builder?id=${pipeline.id}`}
                      className={`p-1.5 rounded-lg ${
                        isDark 
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                      } transition-colors`}
                      title="Edit pipeline"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    
                    <div className="relative">
                      <button
                        onClick={() => handleMenuToggle(pipeline.id)}
                        className={`p-1.5 rounded-lg ${
                          isDark 
                            ? 'text-gray-400 hover:bg-gray-800 hover:text-white' 
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                        } transition-colors`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      
                      {expandedMenu === pipeline.id && (
                        <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10 ${
                          isDark 
                            ? 'bg-gray-800 border border-gray-700' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          <div className="py-1">
                            {pipeline.endpoint && (
                              <button
                                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                                  isDark 
                                    ? 'text-gray-300 hover:bg-gray-700' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Endpoint
                              </button>
                            )}
                            
                            <button
                              className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                                isDark 
                                  ? 'text-gray-300 hover:bg-gray-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </button>
                            
                            {pipeline.status === 'active' ? (
                              <button
                                onClick={() => handleStatusChange(pipeline.id, 'paused')}
                                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                                  isDark 
                                    ? 'text-gray-300 hover:bg-gray-700' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Pause Pipeline
                              </button>
                            ) : (
                              <button
                                onClick={() => handleStatusChange(pipeline.id, 'active')}
                                className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                                  isDark 
                                    ? 'text-gray-300 hover:bg-gray-700' 
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Activate Pipeline
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleDelete(pipeline.id)}
                              className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                                isDark 
                                  ? 'text-red-400 hover:bg-red-900/20' 
                                  : 'text-red-500 hover:bg-red-50'
                              }`}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}