'use client';

import React from 'react';
import { Node as NodeType } from './types';

interface NodeBaseProps {
  node: NodeType;
  selected: boolean;
  onDrag: (id: string, x: number, y: number) => void;
  onSelect: (id: string) => void;
}

export const NodeBase: React.FC<React.PropsWithChildren<NodeBaseProps>> = ({ node, selected, onDrag, onSelect, children }) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Drag logic can be implemented here
  };

  return (
    <div
      className={`node-base ${selected ? 'selected' : ''}`}
      style={{ position: 'absolute', left: node.x, top: node.y }}
      onMouseDown={() => onSelect(node.id)}
      onMouseMove={handleMouseDown}
    >
      {children}
    </div>
  );
};