import React, { useState } from 'react';

interface EdgeComponentProps {
  id: string;
  source: { x: number; y: number };
  target: { x: number; y: number };
  onDelete: (id: string) => void;
  theme: 'light' | 'dark';
}

const EdgeComponent: React.FC<EdgeComponentProps> = ({ id, source, target, onDelete, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';
  
  // Calculate the path
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const controlPoint1X = source.x + dx * 0.5;
  const controlPoint1Y = source.y;
  const controlPoint2X = target.x - dx * 0.5;
  const controlPoint2Y = target.y;
  
  // Calculate mid-point for the delete button
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2 - 15;
  
  const pathData = `M${source.x},${source.y} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${target.x},${target.y}`;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <marker
          id={`arrowhead-${id}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={isDark ? "#3B82F6" : "#3B82F6"}
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke={isDark ? (isHovered ? "#60A5FA" : "#3B82F6") : (isHovered ? "#60A5FA" : "#3B82F6")}
        strokeWidth={isHovered ? "3" : "2"}
        fill="none"
        markerEnd={`url(#arrowhead-${id})`}
        style={{ pointerEvents: 'stroke' }}
      />
      
      {isHovered && (
        <g style={{ pointerEvents: 'all' }}>
          <circle
            cx={midX}
            cy={midY}
            r="12"
            fill={isDark ? "#374151" : "white"}
            stroke={isDark ? "#4B5563" : "#E5E7EB"}
            strokeWidth="1"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            style={{ cursor: 'pointer' }}
          />
          <text
            x={midX}
            y={midY}
            textAnchor="middle"
            dy=".3em"
            fontSize="16"
            fill={isDark ? "#F87171" : "#EF4444"}
            style={{ pointerEvents: 'none' }}
          >
            ×
          </text>
        </g>
      )}
    </svg>
  );
};

export default EdgeComponent;