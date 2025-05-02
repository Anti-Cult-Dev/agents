import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Database, MessageSquare, FileText, Zap, MoreHorizontal } from 'lucide-react';
// TODO: Update import path for types when types/workflow is ported
import { WorkflowNode } from '../../types/workflow';

interface NodeComponentProps {
  node: WorkflowNode;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onPositionChange: (id: string, x: number, y: number) => void;
  onOutputConnect?: (nodeId: string, position: {x: number, y: number}) => void;
  onInputConnect?: (nodeId: string) => void;
  editorMode: 'select' | 'connect' | 'pan';
  theme: 'light' | 'dark';
}

const NodeComponent: React.FC<NodeComponentProps> = ({ 
  node, 
  isSelected, 
  onSelect, 
  onPositionChange,
  onOutputConnect,
  onInputConnect,
  editorMode,
  theme
}) => {
  const [position, setPosition] = useState({ x: node.x, y: node.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showContextMenu, setShowContextMenu] = useState(false);
  
  const nodeRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);
  const inputDotRef = useRef<HTMLDivElement>(null);
  const outputDotRef = useRef<HTMLDivElement>(null);
  
  const isDark = theme === 'dark';
  
  useEffect(() => {
    setPosition({ x: node.x, y: node.y });
  }, [node.x, node.y]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current && 
        !contextMenuRef.current.contains(event.target as Node) &&
        nodeRef.current &&
        !nodeRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getNodeIcon = () => {
    switch (node.type) {
      case 'trigger':
        return <Zap className="h-5 w-5 text-amber-500" />;
      case 'process':
        return <Cpu className="h-5 w-5 text-blue-500" />;
      case 'database':
        return <Database className="h-5 w-5 text-emerald-500" />;
      case 'output':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-gray-500" />;
      default:
        return <Cpu className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNodeColor = () => {
    if (isDark) {
      switch (node.type) {
        case 'trigger':
          return isSelected 
            ? 'bg-amber-900/30 border-amber-500'
            : 'bg-amber-900/20 border-amber-700 hover:border-amber-500';
        case 'process':
          return isSelected 
            ? 'bg-blue-900/30 border-blue-500'
            : 'bg-blue-900/20 border-blue-700 hover:border-blue-500';
        case 'database':
          return isSelected 
            ? 'bg-emerald-900/30 border-emerald-500'
            : 'bg-emerald-900/20 border-emerald-700 hover:border-emerald-500';
        case 'output':
          return isSelected 
            ? 'bg-purple-900/30 border-purple-500'
            : 'bg-purple-900/20 border-purple-700 hover:border-purple-500';
        case 'document':
          return isSelected 
            ? 'bg-gray-700 border-gray-500'
            : 'bg-gray-800 border-gray-600 hover:border-gray-500';
        default:
          return isSelected 
            ? 'bg-gray-700 border-gray-500'
            : 'bg-gray-800 border-gray-600 hover:border-gray-500';
      }
    } else {
      switch (node.type) {
        case 'trigger':
          return isSelected 
            ? 'bg-amber-50 border-amber-400'
            : 'bg-amber-50 border-amber-200 hover:border-amber-300';
        case 'process':
          return isSelected 
            ? 'bg-blue-50 border-blue-400'
            : 'bg-blue-50 border-blue-200 hover:border-blue-300';
        case 'database':
          return isSelected 
            ? 'bg-emerald-50 border-emerald-400'
            : 'bg-emerald-50 border-emerald-200 hover:border-emerald-300';
        case 'output':
          return isSelected 
            ? 'bg-purple-50 border-purple-400'
            : 'bg-purple-50 border-purple-200 hover:border-purple-300';
        case 'document':
          return isSelected 
            ? 'bg-gray-50 border-gray-400'
            : 'bg-gray-50 border-gray-200 hover:border-gray-300';
        default:
          return isSelected 
            ? 'bg-gray-50 border-gray-400'
            : 'bg-gray-50 border-gray-200 hover:border-gray-300';
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (editorMode !== 'select') return;
    e.stopPropagation();
    onSelect(node.id);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && editorMode === 'select') {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      };
      setPosition(newPosition);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      onPositionChange(node.id, position.x, position.y);
      setIsDragging(false);
    }
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(node.id);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  const handleInputDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editorMode === 'connect' && onInputConnect) {
      onInputConnect(node.id);
    }
  };

  const handleOutputDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editorMode === 'connect' && onOutputConnect && outputDotRef.current) {
      const rect = outputDotRef.current.getBoundingClientRect();
      const nodeRect = nodeRef.current?.getBoundingClientRect();
      if (nodeRect) {
        const x = position.x + 48; // Right side of node
        const y = position.y + 20; // Middle of node
        onOutputConnect(node.id, { x, y });
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      <div 
        ref={nodeRef}
        className={`absolute w-48 rounded-md border-2 ${getNodeColor()} ${
          isDragging 
            ? isDark 
              ? 'shadow-lg shadow-black/20 z-10' 
              : 'shadow-lg z-10' 
            : isDark 
              ? 'shadow-sm shadow-black/10' 
              : 'shadow-sm'
        }`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transition: isDragging ? 'none' : 'box-shadow 0.2s, border-color 0.2s'
        }}
        onMouseDown={handleMouseDown}
        onClick={handleNodeClick}
        onContextMenu={handleContextMenu}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isDark ? 'bg-dark-surface' : 'bg-white'
              }`}>
                {getNodeIcon()}
              </div>
              <span className={`font-medium ${isDark ? 'text-dark-text' : 'text-gray-800'}`}>{node.label}</span>
            </div>
            <button className={isDark ? "text-dark-text-secondary hover:text-dark-text" : "text-gray-400 hover:text-gray-600"}>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-between mt-2">
            <div 
              ref={inputDotRef}
              className={`w-3 h-3 rounded-full relative left-[-10px] cursor-pointer ${
                editorMode === 'connect' 
                  ? isDark 
                    ? 'bg-blue-500 hover:bg-blue-400' 
                    : 'bg-blue-500 hover:bg-blue-400' 
                  : isDark 
                    ? 'bg-gray-600 hover:bg-gray-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={handleInputDotClick}
            />
            <div 
              ref={outputDotRef}
              className={`w-3 h-3 rounded-full relative right-[-10px] cursor-pointer ${
                editorMode === 'connect' 
                  ? isDark 
                    ? 'bg-blue-500 hover:bg-blue-400' 
                    : 'bg-blue-500 hover:bg-blue-400' 
                  : isDark 
                    ? 'bg-gray-600 hover:bg-gray-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={handleOutputDotClick}
            />
          </div>
        </div>
      </div>
      {showContextMenu && (
        <div 
          ref={contextMenuRef}
          className={`absolute z-50 w-48 py-1 rounded-md shadow-lg border ${
            isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          }`}
          style={{ 
            left: `${position.x + 50}px`, 
            top: `${position.y}px` 
          }}
        >
          <button 
            className={`w-full text-left px-4 py-2 text-sm ${
              isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => {
              navigator.clipboard.writeText(node.id);
              setShowContextMenu(false);
            }}
          >
            Copy ID
          </button>
          <button 
            className={`w-full text-left px-4 py-2 text-sm ${
              isDark ? 'text-dark-text hover:bg-dark-bg' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setShowContextMenu(false)}
          >
            Duplicate
          </button>
          <button 
            className={`w-full text-left px-4 py-2 text-sm ${
              isDark ? 'text-red-400 hover:bg-dark-bg' : 'text-red-600 hover:bg-gray-100'
            }`}
            onClick={() => setShowContextMenu(false)}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default NodeComponent;
