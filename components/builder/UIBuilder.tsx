'use client';

import React from 'react';
import { CanvasWrapper } from '../canvas/CanvasWrapper';
import { Toolbar } from '../canvas/Toolbar';
import { NodeBase } from '../canvas/NodeBase';
import { ConnectionPath } from '../canvas/ConnectionPath';
import { PropertiesPanel } from '../canvas/PropertiesPanel';
import { useUIStore } from '../../stores/uiStore';
import { BlockDef } from '../canvas/types';
import { Layout, FileText, Image, Edit3, Square } from 'lucide-react';

export default function UIBuilder() {
  const nodes = useUIStore(s => s.nodes);
  const connections = useUIStore(s => s.connections);
  const selectedId = useUIStore(s => s.selectedId);
  const addNode = useUIStore(s => s.addNode);
  const updateNode = useUIStore(s => s.updateNode);
  const connectNodes = useUIStore(s => s.connectNodes);
  const setSelected = useUIStore(s => s.setSelected);
  const updateConfig = useUIStore(s => s.updateConfig);

  const blocks: BlockDef[] = [
    { id: 'container', type: 'container', label: 'Container', icon: <Layout /> },
    { id: 'text', type: 'text', label: 'Text', icon: <FileText /> },
    { id: 'image', type: 'image', label: 'Image', icon: <Image /> },
    { id: 'input', type: 'input', label: 'Input', icon: <Edit3 /> },
    { id: 'button', type: 'button', label: 'Button', icon: <Square /> },
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

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="h-full flex">
      <Toolbar blocks={blocks} onDragStart={() => {}} />
      <div className="relative flex-1 h-full">
        <CanvasWrapper onDrop={handleDrop} onDragOver={handleDragOver} onClickCanvas={() => setSelected(null)}>
          <svg className="absolute inset-0 w-full h-full">
            {connections.map(c => (
              <ConnectionPath key={c.id} start={c.start} end={c.end} type="curve" />
            ))}
            {nodes.map(n => (
              <NodeBase key={n.id} node={n} selected={n.id === selectedId} onDrag={updateNode} onSelect={setSelected}>
                <div className="p-2 text-sm">{n.label}</div>
              </NodeBase>
            ))}
          </svg>
        </CanvasWrapper>
      </div>
      <PropertiesPanel
        selectedId={selectedId}
        config={selectedId ? nodes.find(n => n.id === selectedId)?.config : {}}
        onChange={cfg => selectedId && updateConfig(selectedId, cfg)}
      />
    </div>
  );
}
