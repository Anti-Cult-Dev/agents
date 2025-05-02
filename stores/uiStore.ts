import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Node, Connection } from '../components/canvas/types';

interface UIState {
  nodes: Node[];
  connections: Connection[];
  selectedId: string | null;
  recordId: string | null;
  name: string;
  addNode: (node: Node) => void;
  updateNode: (id: string, x: number, y: number) => void;
  deleteNode: (id: string) => void;
  connectNodes: (conn: Connection) => void;
  disconnectConnection: (id: string) => void;
  setSelected: (id: string | null) => void;
  updateConfig: (id: string, config: any) => void;
  setRecordId: (id: string | null) => void;
  setName: (name: string) => void;
}

export const useUIStore = create<UIState>()(
  immer((set) => ({
    nodes: [],
    connections: [],
    selectedId: null,
    recordId: null,
    name: 'Untitled',
    addNode: (node) => set((state) => { state.nodes.push(node); }),
    updateNode: (id, x, y) => set((state) => {
      const n = state.nodes.find((n) => n.id === id);
      if (n) { n.x = x; n.y = y; }
    }),
    deleteNode: (id) => set((state) => {
      state.nodes = state.nodes.filter((n) => n.id !== id);
      state.connections = state.connections.filter((c) => c.start !== id && c.end !== id);
    }),
    connectNodes: (conn) => set((state) => { state.connections.push(conn); }),
    disconnectConnection: (id) => set((state) => { state.connections = state.connections.filter((c) => c.id !== id); }),
    setSelected: (id) => set((state) => { state.selectedId = id; }),
    updateConfig: (id, config) => set((state) => {
      const n = state.nodes.find((n) => n.id === id);
      if (n) { n.config = config; }
    }),
    setRecordId: (id) => set((state) => { state.recordId = id; }),
    setName: (name) => set((state) => { state.name = name; }),
  }))
);
