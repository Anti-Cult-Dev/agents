'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  OnConnect,
  Edge
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useUIStore } from '../../stores/uiStore';
import { Layout, FileText, Image, Edit3, Square } from 'lucide-react';
import { PropertiesPanel } from '../canvas/PropertiesPanel';

const blocks = [
  { id: 'container', label: 'Container', icon: <Layout /> },
  { id: 'text', label: 'Text', icon: <FileText /> },
  { id: 'image', label: 'Image', icon: <Image /> },
  { id: 'input', label: 'Input', icon: <Edit3 /> },
  { id: 'button', label: 'Button', icon: <Square /> },
];

export default function UIBuilder() {
  const store = useUIStore();
  const initialNodes = store.nodes.map(n => ({
    id: n.id,
    type: 'default',
    position: { x: n.x, y: n.y },
    data: { label: n.label },
  }));
  // Each edge must have an id for React Flow
  const initialEdges: Edge[] = store.connections.map((c, idx) => ({ id: c.id ?? `e${idx}`, source: c.start, target: c.end }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges(es => addEdge(params, es));
      store.connectNodes({ id: params.id ?? `${params.source}-${params.target}`, start: params.source, end: params.target });
    },
    [setEdges, store]
  );

  const onDragOver = useCallback((evt: React.DragEvent) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (evt: React.DragEvent) => {
      evt.preventDefault();
      if (!reactFlowWrapper.current || !rfInstance) return;
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = evt.dataTransfer.getData('application/reactflow');
      if (!type) return;
      const pos = rfInstance.project({ x: evt.clientX - bounds.left, y: evt.clientY - bounds.top });
      const id = Date.now().toString();
      const newNode = { id, type: 'default', position: pos, data: { label: type } };
      setNodes(ns => ns.concat(newNode));
      store.addNode({ id, type, label: type, x: pos.x, y: pos.y });
    },
    [rfInstance, setNodes, store]
  );

  useEffect(() => {
    // Persist connections as node IDs
    const payload = { nodes, connections: edges.map(e => ({ id: e.id, start: e.source, end: e.target })) };
    if (store.recordId) {
      fetch(`/api/uis/${store.recordId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      fetch('/api/uis', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(res => res.json())
        .then(ret => store.setRecordId(ret[0]?.id));
    }
  }, [nodes, edges, store]);

  return (
    <div className="flex h-full">
      <div className="w-60 p-2 bg-gray-100 overflow-auto">
        {blocks.map(block => (
          <div key={block.id} className="flex items-center p-2 m-1 bg-white shadow cursor-grab" draggable onDragStart={e => e.dataTransfer.setData('application/reactflow', block.label)}>
            {block.icon}
            <span className="ml-2">{block.label}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 h-full" ref={reactFlowWrapper}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setRfInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
      <PropertiesPanel
        selectedId={store.selectedId}
        config={store.selectedId ? store.nodes.find(n => n.id === store.selectedId)?.config : {}}
        onChange={cfg => store.selectedId && store.updateConfig(store.selectedId, cfg)}
      />
    </div>
  );
}
