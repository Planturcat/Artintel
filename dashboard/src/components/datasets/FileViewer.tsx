"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Save,
  Edit2,
  Image as ImageIcon,
  FileText,
  File,
  Download,
  AlertCircle,
  Check,
  Copy,
  CheckCheck,
  Eye,
  BarChart4,
  Table,
  Code,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ClipboardCheck,
  RefreshCw,
  FileJson,
  Share2,
  Clock
} from 'lucide-react';
import { Dataset } from '@/types/dataset';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { datasetService, DatasetStatistics } from '@/services/datasetService';
import { useTheme } from '@/contexts/ThemeContext';

interface FileViewerProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: Dataset;
  isDark?: boolean;
}

// Map file extensions to syntax highlighting languages
const formatToLanguage: { [key: string]: string } = {
  'json': 'json',
  'js': 'javascript',
  'ts': 'typescript',
  'tsx': 'tsx',
  'jsx': 'jsx',
  'py': 'python',
  'html': 'html',
  'css': 'css',
  'scss': 'scss',
  'sql': 'sql',
  'yaml': 'yaml',
  'yml': 'yaml',
  'xml': 'xml',
  'md': 'markdown',
  'csv': 'csv',
  'txt': 'text'
};

// Function to format CSV content for display
const formatCSV = (content: string) => {
  try {
    const rows = content.split('\n').map(row => row.split(','));
    const maxColumns = Math.max(...rows.map(row => row.length));
    
    // Pad rows to have equal columns
    const paddedRows = rows.map(row => {
      while (row.length < maxColumns) {
        row.push('');
      }
      return row;
    });

    // Create a formatted table
    return paddedRows.map(row => row.map(cell => cell.trim()).join(' | ')).join('\n');
  } catch {
    return content;
  }
};

// Function to try parsing and format JSON
const formatJSON = (content: string) => {
  try {
    return JSON.stringify(JSON.parse(content), null, 2);
  } catch {
    return content;
  }
};

// Parse CSV content to array of objects
const parseCSV = (content: string): { headers: string[], rows: any[] } => {
  try {
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    const rows = lines.slice(1).map(line => {
      const values = line.split(',');
      const row: Record<string, any> = {};
      
      headers.forEach((header, index) => {
        const value = values[index]?.trim() || '';
        // Try to convert numbers
        if (/^-?\d+(\.\d+)?$/.test(value)) {
          row[header] = parseFloat(value);
        } else if (value.toLowerCase() === 'true') {
          row[header] = true;
        } else if (value.toLowerCase() === 'false') {
          row[header] = false;
        } else {
          row[header] = value;
        }
      });
      
      return row;
    });
    
    return { headers, rows };
  } catch (error) {
    console.error("Failed to parse CSV:", error);
    return { headers: [], rows: [] };
  }
};

// Component for tabular data viewing
const TabularDataViewer = ({ 
  data, 
  headers,
  isDark,
  onPageChange,
  currentPage,
  totalPages,
  sortColumn,
  sortDirection,
  onSort
}: { 
  data: any[],
  headers: string[],
  isDark: boolean,
  onPageChange: (page: number) => void,
  currentPage: number,
  totalPages: number,
  sortColumn: string | null,
  sortDirection: 'asc' | 'desc',
  onSort: (column: string) => void
}) => {
  return (
    <div className="overflow-auto">
      <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
        <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                } uppercase tracking-wider cursor-pointer hover:bg-opacity-10 hover:bg-${
                  isDark ? 'white' : 'gray-400'
                }`}
                onClick={() => onSort(header)}
              >
                <div className="flex items-center">
                  {header}
                  {sortColumn === header && (
                    <ArrowUpDown 
                      className={`ml-1 h-4 w-4 ${sortDirection === 'asc' ? 'transform rotate-180' : ''}`} 
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? (isDark ? 'bg-gray-900' : 'bg-white') : (isDark ? 'bg-gray-800/50' : 'bg-gray-50')}>
              {headers.map((header, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}
                >
                  {row[header]?.toString() || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-between px-4 py-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md ${
                isDark 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component for dataset statistics
const DatasetStatisticsView = ({ statistics, isDark }: { statistics: DatasetStatistics, isDark: boolean }) => {
  return (
    <div className="space-y-6">
      <div className={`rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} p-4`}>
        <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Dataset Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statistics.totalRows !== undefined && (
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Rows</p>
              <p className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{statistics.totalRows.toLocaleString()}</p>
            </div>
          )}
          {statistics.totalColumns !== undefined && (
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Columns</p>
              <p className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{statistics.totalColumns}</p>
            </div>
          )}
          {statistics.missingValues && (
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Missing Values</p>
              <p className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {Object.values(statistics.missingValues).reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {statistics.columnTypes && (
        <div className={`rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} p-4`}>
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Column Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {Object.entries(statistics.columnTypes).map(([column, type], index) => (
              <div 
                key={index} 
                className={`px-3 py-2 rounded-md ${isDark ? 'bg-gray-700' : 'bg-white'} flex justify-between items-center`}
              >
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{column}</span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} px-2 py-1 rounded-full ${
                  isDark ? 'bg-gray-600' : 'bg-gray-100'
                }`}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {statistics.valueDistribution && Object.keys(statistics.valueDistribution).length > 0 && (
        <div className={`rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} p-4`}>
          <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Value Distribution</h3>
          {Object.entries(statistics.valueDistribution).map(([column, distribution], index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className={`text-md font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{column}</h4>
              <div className="space-y-2">
                {Object.entries(distribution as Record<string, number>).map(([value, count], i) => {
                  const maxCount = Math.max(...Object.values(distribution as Record<string, number>));
                  const percentage = (count / maxCount) * 100;
                  
                  return (
                    <div key={i} className="flex items-center">
                      <div className="w-36 whitespace-nowrap overflow-hidden text-ellipsis mr-2">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{value}</span>
                      </div>
                      <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isDark ? 'bg-[#00cbdd]' : 'bg-blue-500'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-12 ml-2 text-right">
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {statistics.sampleData && statistics.sampleData.length > 0 && (
        <div className={`rounded-lg border ${isDark ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'} p-4`}>
          <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sample Data</h3>
          {typeof statistics.sampleData[0] === 'object' ? (
            <div className="overflow-x-auto">
              <table className={`min-w-full divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                  <tr>
                    {Object.keys(statistics.sampleData[0]).map((key, index) => (
                      <th
                        key={index}
                        scope="col"
                        className={`px-4 py-2 text-left text-xs font-medium ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        } uppercase tracking-wider`}
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {statistics.sampleData.map((row, rowIndex) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? (isDark ? 'bg-gray-900' : 'bg-white') : (isDark ? 'bg-gray-800/50' : 'bg-gray-50')}>
                      {Object.values(row).map((value, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-2 whitespace-nowrap text-sm ${
                            isDark ? 'text-gray-300' : 'text-gray-500'
                          }`}
                        >
                          {value?.toString() || ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={`px-4 py-3 rounded-md ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
              {statistics.sampleData.map((item, index) => (
                <div 
                  key={index} 
                  className={`py-1 ${index !== statistics.sampleData.length - 1 ? `border-b ${isDark ? 'border-gray-600' : 'border-gray-200'}` : ''}`}
                >
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {typeof item === 'string' ? item : JSON.stringify(item)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function FileViewer({ isOpen, onClose, dataset, isDark: propIsDark }: FileViewerProps) {
  const { theme } = useTheme();
  const isDark = propIsDark !== undefined ? propIsDark : theme === 'dark';
  
  const [content, setContent] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState<'preview' | 'table' | 'stats'>('preview');
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  const [statistics, setStatistics] = useState<DatasetStatistics | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [isVersionMenuOpen, setIsVersionMenuOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine file type
  const fileExtension = dataset.format.toLowerCase();
  const isImage = fileExtension.match(/^(jpg|jpeg|png|gif|bmp|webp)$/) || 
    (dataset.content && dataset.content.startsWith('data:image/'));
  const isText = fileExtension.match(/^(txt|csv|json|md|sql|yaml|yml|xml|js|ts|tsx|jsx|py|html|css|scss)$/);
  const isTabular = fileExtension === 'csv';
  const isJson = fileExtension === 'json';
  const language = formatToLanguage[fileExtension] || 'text';

  // Load content on initial render
  useEffect(() => {
    if (isOpen && dataset) {
      loadContent();
      loadStatistics();
      loadVersions();
    }
  }, [isOpen, dataset, refreshTrigger]);

  // Reset editing state when dataset changes
  useEffect(() => {
    setCurrentView('preview');
    setPage(1);
    setSortColumn(null);
    setSortDirection('asc');
    setIsEditing(false);
    setEditedContent(null);
    setSaveSuccess(false);
  }, [dataset]);

  // Update edited content when content changes
  useEffect(() => {
    if (content && !editedContent) {
      setEditedContent(content);
    }
  }, [content]);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  // Fetch content from API
  const loadContent = useCallback(async () => {
    if (!dataset || !isOpen) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const offset = (page - 1) * limit;
      let response;
      
      if (process.env.NODE_ENV === 'development') {
        response = await datasetService.mockGetDatasetContent(dataset.id, offset, limit);
      } else {
        response = await datasetService.getDatasetContent(dataset.id, offset, limit);
      }
      
      setContent(response.content);
      setTotalItems(response.totalSize);
    } catch (err: any) {
      setError(err.message || 'Failed to load content');
    } finally {
      setIsLoading(false);
    }
  }, [dataset, isOpen, page, limit]);

  // Fetch statistics from API
  const loadStatistics = useCallback(async () => {
    if (!dataset || !isOpen) return;
    
    try {
      let stats;
      
      if (process.env.NODE_ENV === 'development') {
        stats = await datasetService.mockGetDatasetStatistics(dataset.id);
      } else {
        stats = await datasetService.getDatasetStatistics(dataset.id);
      }
      
      setStatistics(stats);
    } catch (err: any) {
      console.error('Failed to load statistics:', err);
    }
  }, [dataset, isOpen]);

  // Load dataset versions
  const loadVersions = useCallback(async () => {
    if (!dataset || !isOpen) return;
    
    try {
      let versions;
      
      if (process.env.NODE_ENV === 'development') {
        if (datasetService.mockGetDatasetVersions) {
          versions = await datasetService.mockGetDatasetVersions(dataset.id);
        } else {
          versions = [];
        }
      } else {
        versions = await datasetService.getDatasetVersions(dataset.id);
      }
      
      setVersions(versions);
    } catch (err: any) {
      console.error('Failed to load versions:', err);
    }
  }, [dataset, isOpen]);

  // Save edited content
  const saveContent = useCallback(async () => {
    if (!dataset || !editedContent) return;
    
    setIsSaving(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      if (process.env.NODE_ENV === 'development') {
        await datasetService.mockUpdateDatasetContent(dataset.id, editedContent);
      } else {
        await datasetService.updateDatasetContent(
          dataset.id, 
          editedContent, 
          fileExtension === 'json' ? 'json' : undefined
        );
      }
      
      // Update the content state with edited content
      setContent(editedContent);
      setSaveSuccess(true);
      setIsEditing(false);
      
      // Clear success message after a delay
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      
      // Refresh statistics
      loadStatistics();
    } catch (err: any) {
      setError(err.message || 'Failed to save content');
    } finally {
      setIsSaving(false);
    }
  }, [dataset, editedContent, fileExtension, loadStatistics]);

  // Create version
  const createVersion = useCallback(async (versionName: string) => {
    if (!dataset) return;
    
    try {
      if (process.env.NODE_ENV === 'development') {
        if (datasetService.mockCreateDatasetVersion) {
          await datasetService.mockCreateDatasetVersion(dataset.id, versionName);
        }
      } else {
        await datasetService.createDatasetVersion(dataset.id, versionName);
      }
      
      // Refresh versions
      loadVersions();
    } catch (err: any) {
      setError(err.message || 'Failed to create version');
    }
  }, [dataset, loadVersions]);

  // Handle page change for tabular data
  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  // Handle refresh button click
  const handleRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Handle sorting for tabular data
  const handleSort = useCallback((column: string) => {
    if (sortColumn === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  }, [sortColumn]);

  // Handle copy to clipboard
  const handleCopy = useCallback(async () => {
    if (!content) return;
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  }, [content]);

  // Handle edit button click
  const handleEditClick = useCallback(() => {
    if (!isEditing) {
      setEditedContent(content);
      setIsEditing(true);
      setCurrentView('preview');
    } else {
      saveContent();
    }
  }, [isEditing, content, saveContent]);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
    setEditedContent(content);
    setError(null);
  }, [content]);

  // Handle content change in edit mode
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  }, []);

  // Handle download
  const handleDownload = useCallback(async () => {
    if (!dataset) return;
    
    setIsDownloading(true);
    
    try {
      let blob;
      
      if (process.env.NODE_ENV === 'development') {
        // For development, create a blob from current content
        const type = isImage 
          ? `image/${fileExtension}`
          : isJson
            ? 'application/json'
            : 'text/plain';
        
        blob = new Blob([content || ''], { type });
      } else {
        // For production, fetch from API
        blob = await datasetService.downloadDataset(dataset.id);
      }
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = dataset.name;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      setError(err.message || 'Failed to download dataset');
    } finally {
      setIsDownloading(false);
    }
  }, [dataset, content, fileExtension, isImage, isJson]);

  // Create a new version
  const handleCreateVersion = useCallback(() => {
    const versionName = prompt('Enter version name:');
    if (versionName) {
      createVersion(versionName);
    }
  }, [createVersion]);

  // Parse CSV for tabular view
  const parsedCsvData = useMemo(() => {
    if (!content || !isTabular) return { headers: [], rows: [] };
    return parseCSV(content);
  }, [content, isTabular]);

  // Apply sorting to tabular data
  const sortedRows = useMemo(() => {
    if (!parsedCsvData.rows.length || !sortColumn) return parsedCsvData.rows;
    
    return [...parsedCsvData.rows].sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [parsedCsvData, sortColumn, sortDirection]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / limit));
  }, [totalItems, limit]);

  // Can edit check
  const canEdit = useMemo(() => {
    // In a real app, check user permissions here
    return isText && !isLoading && 
      (dataset.ownerId === (datasetService as any).authContext?.userId || 
       (dataset.owner?.id === (datasetService as any).authContext?.userId));
  }, [isText, isLoading, dataset]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className={`w-full ${isFullscreen ? 'h-full m-0' : 'max-w-6xl h-[90vh]'} rounded-xl ${
          isDark 
            ? 'bg-[#00052d]/90 border border-[#00cbdd]/20' 
            : 'bg-white border border-gray-200'
        } shadow-xl overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            {isImage ? (
              <ImageIcon className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : isTabular ? (
              <Table className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : isJson ? (
              <FileJson className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : isText ? (
              <FileText className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            ) : (
              <File className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            )}
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {dataset.name}
            </h2>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* View toggles */}
            {isTabular && !isEditing && (
              <>
                <button
                  onClick={() => setCurrentView('preview')}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? currentView === 'preview' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-white/10 text-gray-400'
                      : currentView === 'preview' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Preview"
                >
                  <Code className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentView('table')}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? currentView === 'table' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-white/10 text-gray-400'
                      : currentView === 'table' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Table View"
                >
                  <Table className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentView('stats')}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? currentView === 'stats' ? 'bg-[#00cbdd]/20 text-[#00cbdd]' : 'hover:bg-white/10 text-gray-400'
                      : currentView === 'stats' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Statistics"
                >
                  <BarChart4 className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* Action buttons */}
            {!isEditing && (
              <>
                <button
                  onClick={handleRefresh}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                  title="Refresh"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                
                {content && (
                  <button
                    onClick={handleCopy}
                    className={`p-2 rounded-lg ${
                      isDark 
                        ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <ClipboardCheck className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                )}
                
                {/* Download button */}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading || !content}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  } ${(isDownloading || !content) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Download file"
                >
                  <Download className="h-5 w-5" />
                </button>
                
                {/* Version control */}
                <div className="relative">
                  <button
                    onClick={() => setIsVersionMenuOpen(!isVersionMenuOpen)}
                    className={`p-2 rounded-lg ${
                      isDark 
                        ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                    title="Version control"
                  >
                    <Clock className="h-5 w-5" />
                  </button>
                  
                  {isVersionMenuOpen && (
                    <div 
                      className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg z-10 ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                      } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className={`p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Versions</h3>
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {versions.length > 0 ? (
                          <ul>
                            {versions.map((version, index) => (
                              <li 
                                key={index}
                                className={`p-3 ${index !== versions.length - 1 ? `border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}` : ''} hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'} cursor-pointer`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                                    {version.name}
                                  </span>
                                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {new Date(version.createdAt).toLocaleString()}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="p-3 text-center">
                            <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>No versions yet</p>
                          </div>
                        )}
                      </div>
                      
                      <div className={`p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <button
                          onClick={handleCreateVersion}
                          className={`w-full py-2 px-4 rounded-md ${
                            isDark 
                              ? 'bg-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/30' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          Create New Version
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Share button */}
                <button
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                  title="Share dataset"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* Edit controls */}
            {canEdit && !isEditing && currentView === 'preview' && (
              <button
                onClick={handleEditClick}
                className={`p-2 rounded-lg ${
                  isDark 
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Edit content"
              >
                <Edit2 className="h-5 w-5" />
              </button>
            )}
            
            {isEditing && (
              <>
              <button
                  onClick={saveContent}
                disabled={isSaving}
                className={`p-2 rounded-lg ${
                  isDark 
                      ? 'bg-[#00cbdd]/20 text-[#00cbdd] hover:bg-[#00cbdd]/30' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                } ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title="Save changes"
              >
                <Save className="h-5 w-5" />
              </button>
                
                <button
                  onClick={handleCancelEdit}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                  title="Cancel edit"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
            
            {!isEditing && (
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`p-2 rounded-lg ${
                    isDark 
                      ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                  title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter fullscreen'}
                >
                  <Eye className="h-5 w-5" />
                </button>
            )}
            
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
              title="Close (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Notification bar for save success */}
        {saveSuccess && (
          <div className="bg-green-500/20 border-b border-green-500/30 py-2 px-4 flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-500 text-sm font-medium">Changes saved successfully</p>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {error && (
            <div className="flex items-center p-4 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00cbdd]"></div>
              <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading data...</p>
            </div>
          ) : (
            <>
              {currentView === 'preview' && (
                <>
                  {isEditing ? (
                    <div className="w-full h-full">
                      <textarea
                        ref={textareaRef}
                        value={editedContent || ''}
                        onChange={handleContentChange}
                        className={`w-full h-full rounded-lg border p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#00cbdd] ${
                          isDark 
                            ? 'bg-gray-900/80 border-gray-700 text-gray-200'
                            : 'bg-white border-gray-300 text-gray-800'
                        }`}
                        style={{ minHeight: isFullscreen ? 'calc(85vh - 200px)' : 'calc(60vh - 200px)' }}
                        spellCheck={false}
                        disabled={isSaving}
                      />
                    </div>
                  ) : (
                    <>
          {isImage ? (
            <div className="w-full h-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                            src={content && content.startsWith('data:image') ? content : `data:image/${dataset.format.toLowerCase()};base64,${content}`}
                alt={dataset.name}
                className={`${isFullscreen ? 'max-h-[85vh]' : 'max-h-[60vh]'} object-contain`}
                            onError={(e) => {
                              console.error('Image loading error:', e);
                              // Set a fallback image if loading fails
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMTYuNUwxOCAxMEw2IDEwTDEyIDE2LjVaIiBmaWxsPSIjODA4MDgwIi8+PC9zdmc+';
                              (e.target as HTMLImageElement).style.background = isDark ? '#1A1A1A' : '#F5F5F5';
                              (e.target as HTMLImageElement).style.padding = '2rem';
                            }}
              />
            </div>
          ) : isText ? (
              <div className="w-full h-full rounded-lg border overflow-auto">
                <SyntaxHighlighter
                  language={language}
                  style={isDark ? atomDark : oneLight}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: isDark ? 'rgba(0, 5, 45, 0.6)' : '#f8f9fa',
                    minHeight: isFullscreen ? 'calc(85vh - 200px)' : 'calc(60vh - 200px)'
                  }}
                >
                            {content ? (fileExtension === 'json' ? formatJSON(content) : content) : ''}
                </SyntaxHighlighter>
              </div>
          ) : (
            <div className={`flex flex-col items-center justify-center h-full ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <File className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg font-medium">Preview not available</p>
              <p className="text-sm mt-1">This file type cannot be previewed</p>
            </div>
                      )}
                    </>
                  )}
                </>
              )}

              {currentView === 'table' && isTabular && (
                <TabularDataViewer
                  data={sortedRows}
                  headers={parsedCsvData.headers}
                  isDark={isDark}
                  onPageChange={handlePageChange}
                  currentPage={page}
                  totalPages={totalPages}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              )}

              {currentView === 'stats' && statistics && (
                <DatasetStatisticsView statistics={statistics} isDark={isDark} />
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
} 