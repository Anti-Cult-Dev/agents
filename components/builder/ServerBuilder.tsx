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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useServerStore } from '../../stores/serverStore';
import { Settings, Cloud, Database as DbIcon } from 'lucide-react';
import { PropertiesPanel } from '../canvas/PropertiesPanel';

const blocks = [
  { id: 'endpoint', label: 'Endpoint', icon: <Settings /> },
  { id: 'middleware', label: 'Middleware', icon: <Cloud /> },
  { id: 'database', label: 'Database', icon: <DbIcon /> },
];

export default function ServerBuilder() {
  const store = useServerStore();
  const initialNodes = store.nodes.map(n => ({
    id: n.id,
    type: 'default',
    position: { x: n.x, y: n.y },
    data: { label: n.label },
  }));
  // Fix: Ensure connections use node IDs for source/target
  const initialEdges = store.connections.map(c => ({ id: c.id, source: c.start, target: c.end }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<any>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect: OnConnect = useCallback(
    (params) => {
      setEdges(es => addEdge(params, es));
      store.connectNodes({ id: params.id!, start: params.source, end: params.target });
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
    // Fix: Persist connections as node IDs
    const payload = { nodes, connections: edges.map(e => ({ id: e.id, start: e.source, end: e.target })) };
    if (store.recordId) {
      fetch(`/api/servers/${store.recordId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      fetch('/api/servers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
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
