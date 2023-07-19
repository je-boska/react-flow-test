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
import { updateAudioNode } from './audio';
import { AudioNodeData } from './types';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNode: (id: string, data: AudioNodeData) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [
    {
      id: 'out',
      type: 'audioOut',
      position: { x: 700, y: 500 },
      data: {
        title: 'Audio Out',
      },
    },
    {
      id: 'osc',
      position: { x: 300, y: 200 },
      dragHandle: '.drag-handle',
      data: {
        title: 'Oscillator',
        frequency: 440,
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

  updateNode(id: string, data: AudioNodeData) {
    updateAudioNode(id, data);
    set({
      nodes: get().nodes.map((node: Node<AudioNodeData>) => {
        if (node.id === id) {
          return { ...node, data: Object.assign(node.data, data) };
        }

        return node;
      }),
    });
  },
}));

export default useStore;
