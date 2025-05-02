export interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  description?: string;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  connections: Connection[];
}

export interface Position {
  x: number;
  y: number;
}
