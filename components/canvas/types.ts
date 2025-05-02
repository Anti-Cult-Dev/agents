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
  label: string;
  id: string;
  x: number;
  y: number;
  type: string;
  config?: any;
}

// Connection now uses node IDs (string) for start/end
export interface Connection {
  id: string;
  start: string; // node id
  end: string;   // node id
}
