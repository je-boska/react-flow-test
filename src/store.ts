import {
  Connection,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';
import { create } from 'zustand';
import {
  connectNodes,
  disconnectNodes,
  isRunning,
  toggleAudioContext,
  updateAudioNode,
} from './audio';
import { AudioNodeData, RFState } from './types';

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

  isRunning: isRunning(),

  toggleAudio() {
    toggleAudioContext()
      .then(() => {
        set({ isRunning: isRunning() });
      })
      .catch((err) => {
        console.log(err);
      });
  },

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
    if (!connection.source || !connection.target) return;
    connectNodes(connection.source, connection.target);
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  onEdgesDelete: (deleted) => {
    deleted.forEach((edge) => {
      disconnectNodes(edge.source, edge.target);
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
