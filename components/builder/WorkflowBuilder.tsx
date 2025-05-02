'use client';

import React, { useEffect } from 'react';
import { CanvasWrapper } from '../canvas/CanvasWrapper';
import { Toolbar } from '../canvas/Toolbar';
import { NodeBase } from '../canvas/NodeBase';
import { ConnectionPath } from '../canvas/ConnectionPath';
import { PropertiesPanel } from '../canvas/PropertiesPanel';
import { useWorkflowStore } from '../../stores/workflowStore';
import { BlockDef } from '../canvas/types';
import { Zap, Cpu, Database, MessageSquare, FileText } from 'lucide-react';

export default function WorkflowBuilder() {
  const nodes = useWorkflowStore(state => state.nodes);
  const connections = useWorkflowStore(state => state.connections);
  const selectedId = useWorkflowStore(state => state.selectedId);
  const addNode = useWorkflowStore(state => state.addNode);
  const updateNode = useWorkflowStore(state => state.updateNode);
  const connectNodes = useWorkflowStore(state => state.connectNodes);
  const setSelected = useWorkflowStore(state => state.setSelected);
  const updateConfig = useWorkflowStore(state => state.updateConfig);

  const blocks: BlockDef[] = [
    { id: 'trigger', type: 'trigger', label: 'Trigger', icon: <Zap /> },
    { id: 'process', type: 'process', label: 'Process', icon: <Cpu /> },
    { id: 'database', type: 'database', label: 'Database', icon: <Database /> },
    { id: 'output', type: 'output', label: 'Output', icon: <MessageSquare /> },
    { id: 'document', type: 'document', label: 'Document', icon: <FileText /> },
  ];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('blockType');
    if (!type) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now().toString();
    addNode({ id, type, label: type, x, y });
    setSelected(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, connections })
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [nodes, connections]);

  return (
    <div className="h-full flex">
      <Toolbar blocks={blocks} onDragStart={() => {}} />
      <div className="relative flex-1 h-full">
        <CanvasWrapper onDrop={handleDrop} onDragOver={handleDragOver} onClickCanvas={() => setSelected(null)}>
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(conn => (
              <ConnectionPath key={conn.id} start={conn.start} end={conn.end} type="curve" />
            ))}
            {nodes.map(node => (
              <NodeBase
                key={node.id}
                node={node}
                selected={node.id === selectedId}
                onDrag={updateNode}
                onSelect={setSelected}
              >
                <div className="p-2 text-sm">{node.label}</div>
              </NodeBase>
            ))}
          </svg>
        </CanvasWrapper>
      </div>
      <PropertiesPanel
        selectedId={selectedId}
        config={selectedId ? nodes.find(n => n.id === selectedId)?.config : {}}
        onChange={cfg => { if (selectedId) updateConfig(selectedId, cfg); }}
      />
    </div>
  );
}
