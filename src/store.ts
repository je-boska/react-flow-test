import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: '1',
      type: 'audioOut',
      position: { x: 700, y: 500 },
      data: {
        title: 'Audio Out',
      },
    },
    {
      id: '2',
      position: { x: 300, y: 200 },
      dragHandle: '.drag-handle',
      data: {
        title: 'Oscillator',
        freq: 440,
      },
      type: 'oscillator',
    },
  ],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));

export default useStore;
