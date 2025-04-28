import { useState, useEffect } from 'react';
import { 
  Trash, Save, ZoomIn, ZoomOut, 
  ArrowLeft, ArrowRight, Box, 
  Database, BrainCircuit, Code, 
  FileInput, FileOutput, Play 
} from 'lucide-react';
import { Pipeline, PipelineComponent, PipelineConnection } from '@/types/pipeline';
import { toast } from 'react-hot-toast';
import Button from '@/components/ui/Button';

interface PipelineBuilderProps {
  pipeline: Pipeline;
  isDark: boolean;
  onSave: (components: PipelineComponent[], connections: PipelineConnection[]) => Promise<void>;
  isLoading?: boolean;
}

// Styles for dashed line and grid
const styles = {
  '.stroke-dashed': {
    strokeDasharray: '5,5'
  },
  '.bg-grid-dark': {
    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  },
  '.bg-grid-light': {
    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  }
}

export default function PipelineBuilder({ 
  pipeline, 
  isDark, 
  onSave,
  isLoading = false 
}: PipelineBuilderProps) {
  const [components, setComponents] = useState<PipelineComponent[]>(pipeline.components || []);
  const [connections, setConnections] = useState<PipelineConnection[]>(pipeline.connections || []);
  const [draggedComponent, setDraggedComponent] = useState<PipelineComponent | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [isDraggingNewConnection, setIsDraggingNewConnection] = useState(false);
  const [newConnectionSource, setNewConnectionSource] = useState<{
    componentId: string;
    portId: string;
    x: number;
    y: number;
  } | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Port interaction helpers
  const [hoveredPort, setHoveredPort] = useState<{ componentId: string, portId: string, type: 'input' | 'output' } | null>(null);
  
  const handlePortMouseEnter = (componentId: string, portId: string, type: 'input' | 'output') => {
    setHoveredPort({ componentId, portId, type });
  };
  
  const handlePortMouseLeave = () => {
    setHoveredPort(null);
  };
  
  // Get a description of a port for tooltip
  const getPortDescription = (componentId: string, portId: string, type: 'input' | 'output') => {
    const component = components.find(c => c.id === componentId);
    if (!component) return '';
    
    const port = type === 'input' 
      ? component.inputs.find(i => i.id === portId)
      : component.outputs.find(o => o.id === portId);
    
    if (!port) return '';
    
    return `${port.name} (${port.type})${port.required ? ' - Required' : ''}`;
  };

  // Add custom CSS styles for pipeline elements
  useEffect(() => {
    // Create style element
    const styleElement = document.createElement('style');
    
    // Add styles from the styles object
    let cssText = '';
    Object.entries(styles).forEach(([selector, rules]) => {
      cssText += `${selector} {`;
      Object.entries(rules).forEach(([property, value]) => {
        cssText += `${property}: ${value};`;
      });
      cssText += '}\n';
    });
    
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Component library
  const componentLibrary = [
    {
      type: 'input',
      subtype: 'text',
      name: 'Text Input',
      icon: <FileInput />,
      config: {
        placeholder: 'Enter text'
      },
      inputs: [],
      outputs: [
        { id: 'output', name: 'Output', type: 'text' }
      ]
    },
    {
      type: 'model',
      subtype: 'classification',
      name: 'Text Classifier',
      icon: <BrainCircuit />,
      config: {
        modelId: 'model-bert-base',
        maxLength: 512
      },
      inputs: [
        { id: 'input', name: 'Input', type: 'text', required: true }
      ],
      outputs: [
        { id: 'output', name: 'Output', type: 'json' }
      ]
    },
    {
      type: 'model',
      subtype: 'generation',
      name: 'Text Generator',
      icon: <BrainCircuit />,
      config: {
        modelId: 'model-gpt',
        temperature: 0.7,
        maxTokens: 100
      },
      inputs: [
        { id: 'input', name: 'Prompt', type: 'text', required: true }
      ],
      outputs: [
        { id: 'output', name: 'Generated Text', type: 'text' }
      ]
    },
    {
      type: 'dataProcessor',
      subtype: 'transformer',
      name: 'Text Transformer',
      icon: <Code />,
      config: {
        operations: ['toLowerCase', 'trim']
      },
      inputs: [
        { id: 'input', name: 'Input', type: 'text', required: true }
      ],
      outputs: [
        { id: 'output', name: 'Output', type: 'text' }
      ]
    },
    {
      type: 'output',
      subtype: 'json',
      name: 'JSON Output',
      icon: <FileOutput />,
      config: {},
      inputs: [
        { id: 'input', name: 'Input', type: 'any', required: true }
      ],
      outputs: []
    }
  ];

  // Handle canvas events
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    
    // Check if className is a string or a DOMTokenList
    const isCanvasClick = typeof targetElement.className === 'string' 
      ? targetElement.className.includes('canvas')
      : targetElement.classList?.contains('canvas') || false;
    
    if (isCanvasClick) {
      // Deselect any selected components or connections
      setSelectedComponent(null);
      setSelectedConnection(null);
      setIsDraggingCanvas(true);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    if (isDraggingCanvas) {
      setCanvasOffset({
        x: canvasOffset.x + e.movementX,
        y: canvasOffset.y + e.movementY
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDraggingCanvas(false);
    if (isDraggingNewConnection) {
      setIsDraggingNewConnection(false);
      setNewConnectionSource(null);
    }
  };

  // Add a new component to the canvas
  const handleAddComponent = (templateIndex: number) => {
    const template = componentLibrary[templateIndex];
    const newId = `comp-${Date.now()}`;
    
    const newComponent: PipelineComponent = {
      id: newId,
      type: template.type as any,
      subtype: template.subtype,
      name: template.name,
      config: { ...template.config },
      position: { x: 100, y: 100 },
      inputs: template.inputs,
      outputs: template.outputs
    };
    
    setComponents([...components, newComponent]);
    setSelectedComponent(newId);
    setHasUnsavedChanges(true);
  };

  // Remove a component
  const handleRemoveComponent = (id: string) => {
    // Remove the component
    setComponents(components.filter(c => c.id !== id));
    
    // Remove all connections to/from this component
    setConnections(connections.filter(
      c => c.sourceId !== id && c.targetId !== id
    ));
    
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
    
    setHasUnsavedChanges(true);
  };

  // Remove a connection
  const handleRemoveConnection = (id: string) => {
    setConnections(connections.filter(c => c.id !== id));
    if (selectedConnection === id) {
      setSelectedConnection(null);
    }
    setHasUnsavedChanges(true);
  };

  // Handle save
  const handleSave = async () => {
    try {
      await onSave(components, connections);
      setHasUnsavedChanges(false);
      toast.success('Pipeline saved successfully');
    } catch (error) {
      toast.error('Failed to save pipeline');
      console.error(error);
    }
  };

  // Start creating a new connection from an output port
  const handleOutputPortClick = (componentId: string, portId: string, x: number, y: number) => {
    setIsDraggingNewConnection(true);
    setNewConnectionSource({
      componentId,
      portId,
      x,
      y
    });
  };
  
  // Complete connection when clicking on a compatible input port
  const handleInputPortClick = (componentId: string, portId: string) => {
    if (isDraggingNewConnection && newConnectionSource) {
      // Prevent connecting to the same component
      if (newConnectionSource.componentId === componentId) {
        setIsDraggingNewConnection(false);
        setNewConnectionSource(null);
        return;
      }
      
      // Check if connection already exists
      const connectionExists = connections.some(
        c => c.sourceId === newConnectionSource.componentId &&
             c.sourcePortId === newConnectionSource.portId &&
             c.targetId === componentId &&
             c.targetPortId === portId
      );
      
      if (connectionExists) {
        toast.error('Connection already exists');
        setIsDraggingNewConnection(false);
        setNewConnectionSource(null);
        return;
      }
      
      // Create new connection
      const newConnection: PipelineConnection = {
        id: `conn-${Date.now()}`,
        sourceId: newConnectionSource.componentId,
        sourcePortId: newConnectionSource.portId,
        targetId: componentId,
        targetPortId: portId,
      };
      
      setConnections([...connections, newConnection]);
      setHasUnsavedChanges(true);
      setIsDraggingNewConnection(false);
      setNewConnectionSource(null);
    }
  };
  
  // Calculate connection path coordinates
  const getConnectionPath = (connection: PipelineConnection) => {
    const sourceComponent = components.find(c => c.id === connection.sourceId);
    const targetComponent = components.find(c => c.id === connection.targetId);
    
    if (!sourceComponent || !targetComponent) return '';
    
    // These values are approximations - in a real app you'd calculate exact port positions
    const sourceX = sourceComponent.position.x + 170; // Right side of source component
    const sourceY = sourceComponent.position.y + 80;  // Middle of source component
    const targetX = targetComponent.position.x + 10;  // Left side of target component
    const targetY = targetComponent.position.y + 80;  // Middle of target component
    
    // Create a curved path between the points
    return `M${sourceX},${sourceY} C${sourceX + 50},${sourceY} ${targetX - 50},${targetY} ${targetX},${targetY}`;
  };
  
  // Make components draggable
  const handleComponentMouseDown = (e: React.MouseEvent, componentId: string) => {
    e.stopPropagation(); // Prevent canvas drag
    
    // Find the component
    const component = components.find(c => c.id === componentId);
    if (!component) return;
    
    setSelectedComponent(componentId);
    setDraggedComponent(component);
    
    // Initial mouse position
    const startX = e.clientX;
    const startY = e.clientY;
    
    // Update component position on mouse move
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!draggedComponent) return;
      
      const dx = (moveEvent.clientX - startX) / zoom;
      const dy = (moveEvent.clientY - startY) / zoom;
      
      const newComponents = components.map(c => 
        c.id === componentId
          ? { 
              ...c, 
              position: { 
                x: component.position.x + dx, 
                y: component.position.y + dy 
              } 
            }
          : c
      );
      
      setComponents(newComponents);
      setHasUnsavedChanges(true);
    };
    
    // Clean up on mouse up
    const handleMouseUp = () => {
      setDraggedComponent(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={`flex flex-col h-full ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Toolbar */}
      <div className={`flex justify-between items-center p-4 border-b ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h2 className="text-lg font-medium">Editing: {pipeline.name}</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm mx-1">{Math.round(zoom * 100)}%</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(z => Math.min(2, z + 0.1))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={isLoading || !hasUnsavedChanges}
            className="ml-4"
          >
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Component Library */}
        <div className={`w-64 border-r p-4 overflow-y-auto ${
          isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
        }`}>
          <h3 className="font-medium mb-3">Components</h3>
          
          <div className="space-y-2">
            {componentLibrary.map((component, index) => (
              <button
                key={index}
                className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                    : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
                }`}
                onClick={() => handleAddComponent(index)}
              >
                <div className={`p-2 rounded-full mr-2 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {component.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{component.name}</div>
                  <div className="text-xs opacity-70">{component.type}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Canvas */}
        <div 
          className={`flex-1 relative overflow-hidden canvas ${
            isDark ? 'bg-[#00031b]/80' : 'bg-gray-50'
          }`}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        >
          {/* Canvas content with zoom and pan */}
          <div
            className="absolute w-full h-full"
            style={{
              transform: `scale(${zoom}) translate(${canvasOffset.x}px, ${canvasOffset.y}px)`,
              transformOrigin: '0 0'
            }}
          >
            {/* Grid background */}
            <div className={`absolute inset-0 ${
              isDark ? 'bg-grid-dark' : 'bg-grid-light'
            }`}></div>
            
            {/* Render connections */}
            <svg className="absolute inset-0">
              {connections.map(conn => {
                const path = getConnectionPath(conn);
                return (
                <g key={conn.id} className="group">
                  <path 
                    d={path} 
                    className={`stroke-2 fill-none ${
                      selectedConnection === conn.id
                        ? isDark ? 'stroke-[#00cbdd]' : 'stroke-blue-500'
                        : isDark ? 'stroke-gray-600 group-hover:stroke-gray-400' : 'stroke-gray-400 group-hover:stroke-gray-600'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedConnection(conn.id);
                    }}
                    style={{ pointerEvents: 'visibleStroke', cursor: 'pointer' }}
                  />
                  
                  {selectedConnection === conn.id && (
                    <>
                      {/* Draw the delete button at the midpoint of the connection */}
                      <foreignObject
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        style={{ pointerEvents: 'none' }}
                      >
                        <div 
                          className="w-full h-full flex items-center justify-center"
                          xmlns="http://www.w3.org/1999/xhtml"
                        >
                          <button
                            className={`p-1 rounded-full ${
                              isDark 
                                ? 'bg-gray-800 text-red-400 hover:text-red-300' 
                                : 'bg-white text-red-500 hover:text-red-600 shadow-sm'
                            } border border-gray-700`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveConnection(conn.id);
                            }}
                            style={{ pointerEvents: 'all', cursor: 'pointer' }}
                          >
                            <Trash className="h-3 w-3" />
                          </button>
                        </div>
                      </foreignObject>
                    </>
                  )}
                </g>
              )})}
              
              {/* Render connection being created */}
              {isDraggingNewConnection && newConnectionSource && (
                <path 
                  d={`M${newConnectionSource.x},${newConnectionSource.y} C${newConnectionSource.x + 50},${newConnectionSource.y} ${mousePosition.x - 50},${mousePosition.y} ${mousePosition.x},${mousePosition.y}`}
                  className={`stroke-2 fill-none ${
                    isDark ? 'stroke-[#00cbdd]' : 'stroke-blue-500'
                  } stroke-dashed`}
                />
              )}
            </svg>
            
            {/* Render components */}
            {components.map(comp => (
              <div
                key={comp.id}
                className={`absolute p-3 rounded-lg ${
                  selectedComponent === comp.id
                    ? isDark 
                      ? 'ring-2 ring-[#00cbdd] bg-gray-800' 
                      : 'ring-2 ring-blue-500 bg-white shadow-lg'
                    : isDark
                      ? 'bg-gray-800'
                      : 'bg-white shadow'
                } cursor-move select-none`}
                style={{
                  left: comp.position.x,
                  top: comp.position.y,
                  width: '180px'
                }}
                onClick={() => setSelectedComponent(comp.id)}
                onMouseDown={(e) => handleComponentMouseDown(e, comp.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {comp.name}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveComponent(comp.id);
                    }}
                    className={`p-1 rounded-full ${
                      isDark 
                        ? 'hover:bg-gray-700 text-gray-400' 
                        : 'hover:bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Trash className="h-3 w-3" />
                  </button>
                </div>
                
                <div className={`text-xs mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {comp.type}/{comp.subtype}
                </div>
                
                {/* Input ports */}
                {comp.inputs && comp.inputs.length > 0 && (
                  <div className="mb-2">
                    {comp.inputs.map(input => (
                      <div 
                        key={input.id} 
                        className="flex items-center my-1"
                      >
                        <div 
                          className={`w-3 h-3 rounded-full mr-2 ${
                            hoveredPort?.componentId === comp.id && hoveredPort?.portId === input.id
                              ? isDark ? 'bg-gray-400' : 'bg-gray-500'
                              : isDraggingNewConnection
                                ? isDark ? 'bg-gray-500 animate-pulse' : 'bg-gray-400 animate-pulse'
                                : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                          } cursor-pointer relative`} 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInputPortClick(comp.id, input.id);
                          }}
                          onMouseEnter={() => handlePortMouseEnter(comp.id, input.id, 'input')}
                          onMouseLeave={handlePortMouseLeave}
                        >
                          {hoveredPort?.componentId === comp.id && hoveredPort?.portId === input.id && (
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 text-xs rounded whitespace-nowrap z-10 ${
                              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800 shadow-md'
                            }`}>
                              {getPortDescription(comp.id, input.id, 'input')}
                            </div>
                          )}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {input.name} {input.required && '*'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Output ports */}
                {comp.outputs && comp.outputs.length > 0 && (
                  <div>
                    {comp.outputs.map(output => (
                      <div 
                        key={output.id} 
                        className="flex items-center justify-end my-1"
                      >
                        <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {output.name}
                        </div>
                        <div 
                          className={`w-3 h-3 rounded-full ml-2 ${
                            hoveredPort?.componentId === comp.id && hoveredPort?.portId === output.id
                              ? isDark ? 'bg-[#00eeff]' : 'bg-blue-600'
                              : isDraggingNewConnection && newConnectionSource?.componentId === comp.id && newConnectionSource?.portId === output.id
                                ? isDark ? 'bg-[#00cbdd] animate-pulse' : 'bg-blue-500 animate-pulse'
                                : isDark ? 'bg-[#00cbdd] hover:bg-[#00dde9]' : 'bg-blue-500 hover:bg-blue-600'
                          } cursor-pointer relative`}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Get absolute position for the connection start point
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = rect.left / zoom;
                            const y = rect.top / zoom;
                            handleOutputPortClick(comp.id, output.id, x, y);
                          }}
                          onMouseEnter={() => handlePortMouseEnter(comp.id, output.id, 'output')}
                          onMouseLeave={handlePortMouseLeave}
                        >
                          {hoveredPort?.componentId === comp.id && hoveredPort?.portId === output.id && (
                            <div className={`absolute top-full right-0 mt-1 px-2 py-1 text-xs rounded whitespace-nowrap z-10 ${
                              isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800 shadow-md'
                            }`}>
                              {getPortDescription(comp.id, output.id, 'output')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Zoom indicator */}
          <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs ${
            isDark 
              ? 'bg-gray-800 text-gray-300' 
              : 'bg-white text-gray-700 shadow-sm'
          }`}>
            {Math.round(zoom * 100)}%
          </div>
        </div>
        
        {/* Properties Panel */}
        <div className={`w-72 border-l p-4 overflow-y-auto ${
          isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
        }`}>
          <h3 className="font-medium mb-3">Properties</h3>
          
          {selectedComponent ? (
            <div>
              <div className={`p-4 rounded-lg ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h4 className="font-medium mb-2">
                  {components.find(c => c.id === selectedComponent)?.name}
                </h4>
                
                <div className={`text-xs mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  ID: {selectedComponent}
                </div>
                
                <div className="mb-4">
                  <label className={`block text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Component Name
                  </label>
                  <input 
                    type="text" 
                    value={components.find(c => c.id === selectedComponent)?.name || ''}
                    onChange={(e) => {
                      setComponents(components.map(c => 
                        c.id === selectedComponent 
                          ? { ...c, name: e.target.value } 
                          : c
                      ));
                      setHasUnsavedChanges(true);
                    }}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } border`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Position
                  </label>
                  <div className="flex space-x-2">
                    <input 
                      type="number" 
                      value={components.find(c => c.id === selectedComponent)?.position.x || 0}
                      onChange={(e) => {
                        setComponents(components.map(c => 
                          c.id === selectedComponent 
                            ? { ...c, position: { ...c.position, x: Number(e.target.value) } } 
                            : c
                        ));
                        setHasUnsavedChanges(true);
                      }}
                      className={`w-full px-3 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } border`}
                    />
                    <input 
                      type="number" 
                      value={components.find(c => c.id === selectedComponent)?.position.y || 0}
                      onChange={(e) => {
                        setComponents(components.map(c => 
                          c.id === selectedComponent 
                            ? { ...c, position: { ...c.position, y: Number(e.target.value) } } 
                            : c
                        ));
                        setHasUnsavedChanges(true);
                      }}
                      className={`w-full px-3 py-2 rounded-lg ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } border`}
                    />
                  </div>
                </div>
                
                {/* Additional configuration fields would go here */}
              </div>
            </div>
          ) : (
            <div className={`p-4 rounded-lg ${
              isDark ? 'bg-gray-800/50' : 'bg-gray-100'
            }`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Select a component to edit its properties
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 