'use client';

import React from 'react';
import { BlockDef } from './types';

interface ToolbarProps {
  blocks: BlockDef[];
  onDragStart: (blockType: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ blocks, onDragStart }) => (
  <div className="toolbar">
    {blocks.map(block => (
      <div
        key={block.id}
        className="toolbar-item"
        draggable
        onDragStart={e => {
          e.dataTransfer.setData('blockType', block.type);
          onDragStart(block.type);
        }}
      >
        {block.icon || block.label}
      </div>
    ))}
  </div>
);
