'use client';

import React from 'react';
import { Point } from './types';

interface ConnectionPathProps {
  start: Point;
  end: Point;
  type?: 'straight' | 'curve';
}

export const ConnectionPath: React.FC<ConnectionPathProps> = ({ start, end, type = 'straight' }) => {
  if (type === 'curve') {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const path = `M ${start.x} ${start.y} C ${start.x + dx/2} ${start.y} ${start.x + dx/2} ${end.y} ${end.x} ${end.y}`;
    return <path d={path} stroke="black" fill="none" />;
  }
  return <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="black" />;
};