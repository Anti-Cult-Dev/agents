import React, { useState, useCallback, useRef } from 'react';
import { Save, Cpu, Database, MessageSquare, FileText, Zap, Layers, Plus, ZoomIn, ZoomOut, MousePointer, Trash2, Copy } from 'lucide-react';
import NodeComponent from '../components/workflow/NodeComponent';
import EdgeComponent from '../components/workflow/EdgeComponent';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useTheme } from '../context/ThemeContext';
import { WorkflowNode, Connection } from '../types/workflow';

const WorkflowEditor: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeTab, setActiveTab] = useState('canvas');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [connectionInProgress, setConnectionInProgress] = useState<{sourceId: string, sourcePos: {x: number, y: number}} | null>(null);
  const [editorMode, setEditorMode] = useState<'select' | 'connect' | 'pan'>('select');
  const [nodeDescription, setNodeDescription] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState<string | null>(null);
  const [promptText, setPromptText] = useState('');
  const [testResults, setTestResults] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const testResultsRef = useRef<HTMLDivElement>(null);
  
  const nodeTypes = [
    { type: 'trigger', label: 'Trigger', icon: <Zap className="h-5 w-5" /> },
    { type: 'process', label: 'Process', icon: <Cpu className="h-5 w-5" /> },
    { type: 'database', label: 'Database', icon: <Database className="h-5 w-5" /> },
    { type: 'output', label: 'Output', icon: <MessageSquare className="h-5 w-5" /> },
    { type: 'document', label: 'Document', icon: <FileText className="h-5 w-5" /> },
  ];
  
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData('nodeType', type);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    const nodeType = e.dataTransfer.getData('nodeType');
    if (!nodeType) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create a new node
    const newNode: WorkflowNode = {
      id: Date.now().toString(),
      type: nodeType,
      label: `New ${nodeType.charAt(0).toUpperCase() + nodeType.slice(1)}`,
      x,
      y,
    };
    
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const updateNodePosition = useCallback((id: string, x: number, y: number) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, x, y } : node
    ));
  }, []);

  const handleNodeSelect = useCallback((id: string) => {
    setSelectedNode(id);
    const node = nodes.find(n => n.id === id);
    if (node) {
      setNodeDescription(node.description || '');
    }
  }, [nodes]);

  const handleNodeOutput = useCallback((nodeId: string, position: {x: number, y: number}) => {
    if (editorMode === 'connect') {
      setConnectionInProgress({
        sourceId: nodeId,
        sourcePos: position
      });
    }
  }, [editorMode]);

  const handleNodeInput = useCallback((targetId: string) => {
    if (connectionInProgress && editorMode === 'connect') {
      // Prevent self-connection
      if (targetId === connectionInProgress.sourceId) {
        setConnectionInProgress(null);
        return;
      }
      
      // Prevent duplicate connections
      const connectionExists = connections.some(
        conn => conn.source === connectionInProgress.sourceId && conn.target === targetId
      );
      
      if (!connectionExists) {
        const newConnection: Connection = {
          id: `conn-${Date.now()}`,
          source: connectionInProgress.sourceId,
          target: targetId
        };
        
        setConnections(prev => [...prev, newConnection]);
      }
      
      setConnectionInProgress(null);
    }
  }, [connectionInProgress, connections, editorMode]);

  const handleCanvasClick = useCallback(() => {
    // Clear selection when clicking on empty canvas
    setSelectedNode(null);
    setConnectionInProgress(null);
  }, []);

  const handleDeleteConnection = useCallback((connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  }, []);

  const getNodeById = useCallback((id: string) => {
    return nodes.find(node => node.id === id);
  }, [nodes]);

  const handleUpdateNodeLabel = useCallback((id: string, newLabel: string) => {
    setNodes(prev => prev.map(node => 
      node.id === id ? { ...node, label: newLabel } : node
    ));
  }, []);

  const handleApplyChanges = () => {
    if (selectedNode) {
      setNodes(prev => prev.map(node => 
        node.id === selectedNode 
          ? { ...node, description: nodeDescription } 
          : node
      ));
      alert("Changes applied to node");
    }
  };

  const handleSaveWorkflow = () => {
    setIsSaved(true);
    alert("Workflow saved successfully");
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;
    
    if (window.confirm("Are you sure you want to delete this node?")) {
      // Delete all connections involving this node
      setConnections(prev => 
        prev.filter(conn => conn.source !== selectedNode && conn.target !== selectedNode)
      );
      
      // Delete the node
      setNodes(prev => prev.filter(node => node.id !== selectedNode));
      
      // Clear selection
      setSelectedNode(null);
    }
  };

  const handleDuplicateNode = () => {
    if (!selectedNode) return;
    
    const nodeToDuplicate = nodes.find(node => node.id === selectedNode);
    if (!nodeToDuplicate) return;
    
    const newNode: WorkflowNode = {
      ...nodeToDuplicate,
      id: Date.now().toString(),
      x: nodeToDuplicate.x + 50,
      y: nodeToDuplicate.y + 50,
      label: `${nodeToDuplicate.label} (Copy)`
    };
    
    setNodes(prev => [...prev, newNode]);
    setSelectedNode(newNode.id);
  };

  const applyTemplate = (template: string) => {
    // Clear existing nodes and connections
    if (nodes.length > 0) {
      if (!window.confirm("Applying this template will replace your current workflow. Continue?")) {
        setIsTemplatePopupOpen(null);
        return;
      }
    }
    
    // Create template nodes based on the selected template
    let newNodes: WorkflowNode[] = [];
    let newConnections: Connection[] = [];
    
    if (template === 'qa') {
      newNodes = [
        { id: '1', type: 'trigger', label: 'User Input', x: 100, y: 150 },
        { id: '2', type: 'process', label: 'Process Query', x: 350, y: 100 },
        { id: '3', type: 'database', label: 'Knowledge Base', x: 600, y: 100 },
        { id: '4', type: 'process', label: 'Generate Answer', x: 600, y: 250 },
        { id: '5', type: 'output', label: 'Response', x: 350, y: 300 }
      ];
      
      newConnections = [
        { id: 'conn-1', source: '1', target: '2' },
        { id: 'conn-2', source: '2', target: '3' },
        { id: 'conn-3', source: '3', target: '4' },
        { id: 'conn-4', source: '4', target: '5' },
        { id: 'conn-5', source: '1', target: '5' }
      ];
    } else if (template === 'data') {
      newNodes = [
        { id: '1', type: 'trigger', label: 'Data Input', x: 100, y: 150 },
        { id: '2', type: 'process', label: 'Data Cleaning', x: 350, y: 100 },
        { id: '3', type: 'process', label: 'Analysis', x: 600, y: 100 },
        { id: '4', type: 'process', label: 'Visualization', x: 600, y: 250 },
        { id: '5', type: 'output', label: 'Results', x: 350, y: 300 }
      ];
      
      newConnections = [
        { id: 'conn-1', source: '1', target: '2' },
        { id: 'conn-2', source: '2', target: '3' },
        { id: 'conn-3', source: '3', target: '4' },
        { id: 'conn-4', source: '4', target: '5' }
      ];
    }
    
    setNodes(newNodes);
    setConnections(newConnections);
    setIsTemplatePopupOpen(null);
  };

  const handleRunTest = () => {
    if (promptText.trim() === '') {
      alert('Please enter a test prompt first');
      return;
    }
    
    if (nodes.length === 0) {
      alert('Your workflow is empty. Please add nodes before testing.');
      return;
    }
    
    setTestResults(`
      <div class="p-3 rounded-md ${isDark ? 'bg-dark-bg' : 'bg-gray-100'} mb-3">
        <p class="text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}">
          <strong>Input:</strong> ${promptText}
        </p>
      </div>
      <div class="p-3 rounded-md ${isDark ? 'bg-dark-bg' : 'bg-gray-100'}">
        <p class="text-sm ${isDark ? 'text-dark-text' : 'text-gray-800'}">
          <strong>Result:</strong> Workflow test completed successfully! Your workflow with ${nodes.length} nodes and ${connections.length} connections is working as expected.
        </p>
      </div>
    `);
  };

  const handleViewMyComponents = () => {
    alert('My Components feature is coming soon!');
  };

  const handleCopyCode = () => {
    const code = `// Agent workflow definition
const workflow = {
  version: "1.0",
  nodes: ${JSON.stringify(nodes, null, 2)},
  connections: ${JSON.stringify(connections, null, 2)}
};

export default workflow;`;
    
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Code copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy code to clipboard');
      });
  };

  const selectedNodeData = selectedNode ? getNodeById(selectedNode) : null;
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Workflow Editor</h1>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-gray-500'}`}>Design your agent's workflow by dragging components onto the canvas</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`flex rounded-md overflow-hidden border ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <button 
              className={`p-2 ${
                editorMode === 'select' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'bg-dark-surface text-dark-text-secondary hover:text-dark-text' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setEditorMode('select')}
              title="Select mode"
            >
              <MousePointer className="h-5 w-5" />
            </button>
            <button 
              className={`p-2 ${
                editorMode === 'connect' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'bg-dark-surface text-dark-text-secondary hover:text-dark-text' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setEditorMode('connect')}
              title="Connect mode"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </button>
            <button 
              className={`p-2 ${
                editorMode === 'pan' 
                  ? isDark 
                    ? 'bg-dark-bg text-blue-400' 
                    : 'bg-blue-50 text-blue-600' 
                  : isDark 
                    ? 'bg-dark-surface text-dark-text-secondary hover:text-dark-text' 
                    : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
              onClick={() => setEditorMode('pan')}
              title="Pan mode"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
                <path d="M12 2v6M12 8L9 5M12 8l3-3" />
              </svg>
            </button>
          </div>
          
          <button 
            onClick={handleSaveWorkflow}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Save className="h-5 w-5" />
            <span>{isSaved ? 'Saved!' : 'Save Workflow'}</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex gap-4">
        <div className={`w-64 rounded-lg border shadow-sm p-4 flex flex-col ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        }`}>
          <h2 className={`font-semibold mb-4 ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Components</h2>
          
          <div className="space-y-2">
            {nodeTypes.map((node) => (
              <div
                key={node.type}
                draggable
                onDragStart={(e) => handleDragStart(e, node.type)}
                className={`p-3 rounded-md border cursor-move flex items-center space-x-3 transition-colors ${
                  isDark 
                    ? 'bg-dark-bg border-dark-border hover:border-blue-500 hover:bg-dark-bg/70' 
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-dark-surface text-blue-400' : 'bg-blue-100 text-blue-600'
                }`}>
                  {node.icon}
                </div>
                <span className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>{node.label}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Templates</h3>
            <div className="space-y-2">
              <div 
                className={`p-3 rounded-md border cursor-pointer transition-colors relative ${
                  isDark 
                    ? 'bg-purple-900/20 border-purple-900/30 hover:border-purple-500' 
                    : 'bg-purple-50 border-purple-200 hover:border-purple-300'
                }`}
                onClick={() => setIsTemplatePopupOpen('qa')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Q&A Chain</span>
                  <Plus className={isDark ? "h-4 w-4 text-purple-300" : "h-4 w-4 text-purple-700"} />
                </div>
                <p className={`text-xs ${isDark ? 'text-purple-200' : 'text-purple-600'}`}>Basic question-answering workflow</p>
                
                {isTemplatePopupOpen === 'qa' && (
                  <div className={`absolute top-full mt-2 left-0 right-0 z-10 p-3 rounded-md shadow-lg ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'
                  }`}>
                    <p className={`text-xs mb-3 ${isDark ? 'text-dark-text-secondary' : 'text-gray-600'}`}>
                      This template creates a basic Q&A workflow with user input, query processing, 
                      knowledge base retrieval, answer generation, and response output nodes.
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setIsTemplatePopupOpen(null)}
                        className={`text-xs ${
                          isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => applyTemplate('qa')}
                        className={`text-xs font-medium ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        Apply Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                className={`p-3 rounded-md border cursor-pointer transition-colors relative ${
                  isDark 
                    ? 'bg-emerald-900/20 border-emerald-900/30 hover:border-emerald-500' 
                    : 'bg-emerald-50 border-emerald-200 hover:border-emerald-300'
                }`}
                onClick={() => setIsTemplatePopupOpen('data')}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>Data Analysis</span>
                  <Plus className={isDark ? "h-4 w-4 text-emerald-300" : "h-4 w-4 text-emerald-700"} />
                </div>
                <p className={`text-xs ${isDark ? 'text-emerald-200' : 'text-emerald-600'}`}>Process and visualize data</p>
                
                {isTemplatePopupOpen === 'data' && (
                  <div className={`absolute top-full mt-2 left-0 right-0 z-10 p-3 rounded-md shadow-lg ${
                    isDark ? 'bg-dark-surface border border-dark-border' : 'bg-white border border-gray-200'
                  }`}>
                    <p className={`text-xs mb-3 ${isDark ? 'text-dark-text-secondary' : 'text-gray-600'}`}>
                      This template creates a data analysis workflow with data input, cleaning, analysis, 
                      visualization, and results output nodes.
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setIsTemplatePopupOpen(null)}
                        className={`text-xs ${
                          isDark ? 'text-dark-text-secondary hover:text-dark-text' : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => applyTemplate('data')}
                        className={`text-xs font-medium ${
                          isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                        }`}
                      >
                        Apply Template
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className={`mt-auto pt-4 border-t ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <button 
              onClick={handleViewMyComponents}
              className={`flex items-center space-x-2 w-full justify-center p-2 rounded-md font-medium transition-colors ${
                isDark 
                  ? 'bg-dark-bg text-dark-text hover:bg-dark-bg/70' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Layers className="h-5 w-5" />
              <span>My Components</span>
            </button>
          </div>
        </div>
        
        <div className={`flex-1 flex flex-col rounded-lg border shadow-sm overflow-hidden ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        }`}>
          <div className={`border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <div className="flex">
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'canvas' 
                    ? isDark 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-blue-600 border-b-2 border-blue-600' 
                    : isDark 
                      ? 'text-dark-text-secondary hover:text-dark-text' 
                      : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('canvas')}
              >
                Canvas
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'code' 
                    ? isDark 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-blue-600 border-b-2 border-blue-600' 
                    : isDark 
                      ? 'text-dark-text-secondary hover:text-dark-text' 
                      : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('code')}
              >
                Code
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium ${
                  activeTab === 'test' 
                    ? isDark 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-blue-600 border-b-2 border-blue-600' 
                    : isDark 
                      ? 'text-dark-text-secondary hover:text-dark-text' 
                      : 'text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab('test')}
              >
                Test
              </button>
            </div>
          </div>
          
          <div className={`flex-1 overflow-hidden relative ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
            {activeTab === 'canvas' && (
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.5}
                  maxScale={2}
                  wheel={{ disabled: editorMode !== 'pan' }}
                  pan={{ disabled: editorMode !== 'pan' }}
                >
                  {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                      <div className={`flex rounded-md overflow-hidden border ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
                        <button
                          onClick={() => zoomIn()}
                          className={`p-2 ${
                            isDark 
                              ? 'bg-dark-surface text-dark-text hover:bg-dark-bg/50' 
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <ZoomIn className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => zoomOut()}
                          className={`p-2 ${
                            isDark 
                              ? 'bg-dark-surface text-dark-text hover:bg-dark-bg/50' 
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <ZoomOut className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => resetTransform()}
                          className={`p-2 ${
                            isDark 
                              ? 'bg-dark-surface text-dark-text hover:bg-dark-bg/50' 
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z" />
                            <path d="M12 8v4l3 3" />
                          </svg>
                        </button>
                      </div>
                      
                      <div 
                        className="h-full w-full overflow-auto"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={handleCanvasClick}
                        ref={canvasRef}
                      >
                        <TransformComponent>
                          <div className={`h-[2000px] w-[2000px] relative ${
                            isDark 
                              ? 'bg-dark-bg bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]' 
                              : 'bg-white bg-grid-pattern'
                          }`}>
                            {nodes.length === 0 && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`text-center p-8 rounded-lg border-2 border-dashed ${
                                  isDark ? 'border-dark-border text-dark-text-secondary' : 'border-gray-300 text-gray-500'
                                }`}>
                                  <Layers className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                  <h3 className="text-xl font-medium mb-2">Your canvas is empty</h3>
                                  <p className="mb-4">Drag components from the sidebar to start building your workflow</p>
                                  <div className="flex space-x-3 justify-center">
                                    <button
                                      onClick={() => applyTemplate('qa')}
                                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                        isDark 
                                          ? 'bg-dark-surface text-blue-400 hover:bg-dark-bg/50 border border-dark-border' 
                                          : 'bg-white text-blue-600 hover:bg-gray-50 border border-gray-300'
                                      }`}
                                    >
                                      Use Q&A Template
                                    </button>
                                    <button
                                      onClick={() => applyTemplate('data')}
                                      className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                                        isDark 
                                          ? 'bg-dark-surface text-blue-400 hover:bg-dark-bg/50 border border-dark-border' 
                                          : 'bg-white text-blue-600 hover:bg-gray-50 border border-gray-300'
                                      }`}
                                    >
                                      Use Data Analysis Template
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Render connections first so they're under the nodes */}
                            {connections.map((connection) => {
                              const sourceNode = getNodeById(connection.source);
                              const targetNode = getNodeById(connection.target);
                              
                              if (!sourceNode || !targetNode) return null;
                              
                              return (
                                <EdgeComponent
                                  key={connection.id}
                                  id={connection.id}
                                  source={{ x: sourceNode.x + 48, y: sourceNode.y + 20 }}
                                  target={{ x: targetNode.x, y: targetNode.y + 20 }}
                                  onDelete={handleDeleteConnection}
                                  theme={theme}
                                />
                              );
                            })}
                            
                            {/* Render connection in progress */}
                            {connectionInProgress && (
                              <svg
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                style={{ zIndex: 30 }}
                              >
                                <defs>
                                  <marker
                                    id="arrowhead-temp"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="10"
                                    refY="3.5"
                                    orient="auto"
                                  >
                                    <polygon
                                      points="0 0, 10 3.5, 0 7"
                                      fill={isDark ? "#3B82F6" : "#3B82F6"}
                                    />
                                  </marker>
                                </defs>
                                <line
                                  x1={connectionInProgress.sourcePos.x}
                                  y1={connectionInProgress.sourcePos.y}
                                  x2={connectionInProgress.sourcePos.x + 50}
                                  y2={connectionInProgress.sourcePos.y}
                                  stroke={isDark ? "#3B82F6" : "#3B82F6"}
                                  strokeWidth="2"
                                  strokeDasharray="4"
                                  markerEnd="url(#arrowhead-temp)"
                                />
                              </svg>
                            )}
                            
                            {nodes.map((node) => (
                              <NodeComponent
                                key={node.id}
                                node={node}
                                isSelected={selectedNode === node.id}
                                onSelect={handleNodeSelect}
                                onPositionChange={updateNodePosition}
                                onOutputConnect={handleNodeOutput}
                                onInputConnect={handleNodeInput}
                                editorMode={editorMode}
                                theme={theme}
                              />
                            ))}
                          </div>
                        </TransformComponent>
                      </div>
                    </>
                  )}
                </TransformWrapper>
              </div>
            )}
            
            {activeTab === 'code' && (
              <div className="p-4 flex flex-col h-full">
                <div className={`p-4 rounded-md font-mono text-sm flex-1 overflow-auto ${
                  isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-900 text-gray-100'
                }`}>
                  <pre>{`// Agent workflow definition
const workflow = {
  version: "1.0",
  nodes: ${JSON.stringify(nodes, null, 2)},
  connections: ${JSON.stringify(connections, null, 2)}
};

export default workflow;`}</pre>
                </div>
                
                {nodes.length > 0 && (
                  <div className="flex justify-end mt-4">
                    <button 
                      onClick={handleCopyCode}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm ${
                        isDark 
                          ? 'bg-dark-surface text-dark-text hover:bg-dark-bg/70 border border-dark-border' 
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy Code</span>
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'test' && (
              <div className="p-4 h-full overflow-auto">
                <div className={`border rounded-md p-4 ${
                  isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
                }`}>
                  <h3 className={`font-medium mb-4 ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>Test Your Workflow</h3>
                  <div className="mb-4">
                    <label className={`block text-sm font-medium mb-1 ${
                      isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                    }`}>Input</label>
                    <textarea 
                      className={`w-full h-32 p-3 border rounded-md text-sm ${
                        isDark 
                          ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                          : 'border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Enter test input here..."
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={handleRunTest}
                    className={`w-full p-2 rounded-md font-medium transition-colors ${
                      isDark 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Run Test
                  </button>
                  
                  <div 
                    className="mt-6" 
                    ref={testResultsRef}
                    dangerouslySetInnerHTML={testResults ? { __html: testResults } : undefined}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className={`w-72 rounded-lg border shadow-sm flex flex-col overflow-hidden ${
          isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        }`}>
          <div className={`p-4 border-b ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <h2 className={`font-semibold ${isDark ? 'text-dark-text' : 'text-gray-700'}`}>Properties</h2>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            {!selectedNodeData ? (
              <p className={isDark ? "text-dark-text-secondary text-sm" : "text-gray-500 text-sm"}>Select a node to edit its properties</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                  }`}>Node Name</label>
                  <input 
                    type="text" 
                    value={selectedNodeData.label}
                    onChange={(e) => handleUpdateNodeLabel(selectedNodeData.id, e.target.value)}
                    className={`w-full p-2 border rounded-md ${
                      isDark 
                        ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter node name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                  }`}>Node Type</label>
                  <select 
                    className={`w-full p-2 border rounded-md ${
                      isDark 
                        ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    value={selectedNodeData.type}
                    disabled
                  >
                    <option value="trigger">Trigger</option>
                    <option value="process">Process</option>
                    <option value="database">Database</option>
                    <option value="output">Output</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                  }`}>Description</label>
                  <textarea 
                    className={`w-full h-20 p-2 border rounded-md ${
                      isDark 
                        ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="Enter node description"
                    value={nodeDescription}
                    onChange={(e) => setNodeDescription(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    isDark ? 'text-dark-text-secondary' : 'text-gray-700'
                  }`}>Position</label>
                  <div className="flex space-x-2">
                    <div>
                      <label className={`block text-xs mb-1 ${
                        isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                      }`}>X</label>
                      <input 
                        type="number" 
                        value={Math.round(selectedNodeData.x)}
                        className={`w-full p-2 border rounded-md ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        onChange={(e) => updateNodePosition(
                          selectedNodeData.id, 
                          parseInt(e.target.value) || 0, 
                          selectedNodeData.y
                        )}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs mb-1 ${
                        isDark ? 'text-dark-text-secondary' : 'text-gray-500'
                      }`}>Y</label>
                      <input 
                        type="number" 
                        value={Math.round(selectedNodeData.y)}
                        className={`w-full p-2 border rounded-md ${
                          isDark 
                            ? 'bg-dark-bg border-dark-border text-dark-text focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        onChange={(e) => updateNodePosition(
                          selectedNodeData.id, 
                          selectedNodeData.x, 
                          parseInt(e.target.value) || 0
                        )}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <button
                    onClick={handleDuplicateNode}
                    className={`w-full flex items-center justify-center space-x-2 p-2 rounded-md transition-colors ${
                      isDark 
                        ? 'bg-dark-bg hover:bg-dark-bg/70 text-dark-text' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Copy className="h-4 w-4" />
                    <span>Duplicate Node</span>
                  </button>
                  
                  <button
                    onClick={handleDeleteNode}
                    className={`w-full flex items-center justify-center space-x-2 p-2 rounded-md transition-colors ${
                      isDark 
                        ? 'bg-red-900/20 text-red-300 hover:bg-red-900/30' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Node</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className={`p-4 border-t ${isDark ? 'border-dark-border' : 'border-gray-200'}`}>
            <button 
              onClick={handleApplyChanges}
              className={`w-full p-2 rounded-md font-medium transition-colors ${
                !selectedNodeData
                  ? isDark 
                    ? 'bg-dark-bg text-dark-text-secondary opacity-50 cursor-not-allowed' 
                    : 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed'
                  : isDark 
                    ? 'bg-dark-bg text-dark-text hover:bg-dark-bg/70' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`} 
              disabled={!selectedNodeData}
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;