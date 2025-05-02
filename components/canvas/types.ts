// Shared types for canvas components
export interface Point {
  x: number;
  y: number;
}

export interface BlockDef {
  id: string;
  type: string;
  label: string;
  icon?: React.ReactNode;
  config?: any;
}

export interface Node {
  id: string;
  x: number;
  y: number;
  type: string;
  config?: any;
}

export interface Connection {
  id: string;
  start: Point;
  end: Point;
}