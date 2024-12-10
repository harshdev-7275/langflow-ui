import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Connection,
  Edge,
  Node,
  EdgeChange,
  NodeChange,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  exportToJson: () => string;
};

export const useFlowStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection: Connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },
  exportToJson: () => {
    const { nodes, edges } = get();
    return JSON.stringify({ nodes, edges }, null, 2);
  },
}));
