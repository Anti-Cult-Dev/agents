'use client';

import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface CanvasWrapperProps {
  children: React.ReactNode;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onClickCanvas?: React.MouseEventHandler<HTMLDivElement>;
}

export const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ children, onDrop, onDragOver, onClickCanvas }) => (
  <div
    style={{ width: '100%', height: '100%' }}
    onDrop={onDrop}
    onDragOver={onDragOver}
    onClick={onClickCanvas}
  >
    <TransformWrapper>
      <TransformComponent>
        <div className="canvas-grid">{children}</div>
      </TransformComponent>
    </TransformWrapper>
  </div>
);
