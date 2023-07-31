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
  createNode,
  disconnectNodes,
  isRunning,
  toggleAudioContext,
  updateAudioNode,
} from './audio';
import { AudioNodeData, NodeType, RFState } from './types';
import { nanoid } from 'nanoid';

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
      type: 'oscillator',
      position: { x: 300, y: 200 },
      data: {
        title: 'Oscillator',
        frequency: 440,
      },
      dragHandle: '.drag-handle',
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

  addNode(type: NodeType, data: AudioNodeData) {
    const id = nanoid(4);
    const position = { x: 200, y: 100 };
    createNode(id, type, data);

    switch (type) {
      case 'oscillator': {
        set({
          nodes: [
            ...get().nodes,
            {
              id,
              type,
              position,
              data: {
                title: data.title,
                frequency: data.frequency ? data.frequency : 440,
              },
              dragHandle: '.drag-handle',
            },
          ],
        });
        break;
      }
      case 'filter': {
        set({
          nodes: [
            ...get().nodes,
            {
              id,
              type,
              position,
              data: {
                title: data.title,
                frequency: data.frequency ? data.frequency : 1000,
              },
              dragHandle: '.drag-handle',
            },
          ],
        });
        break;
      }
      case 'gain': {
        set({
          nodes: [
            ...get().nodes,
            {
              id,
              type,
              position,
              data: {
                title: data.title,
                gain: data.gain ? data.gain : 0.1,
              },
              dragHandle: '.drag-handle',
            },
          ],
        });
        break;
      }
    }
  },
}));

export default useStore;
