import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnEdgesDelete,
  OnNodesChange,
} from 'reactflow';

export type AudioNodeData = {
  title?: string;
  frequency?: number;
  Q?: number;
  gain?: number;
};

export type NodeType = 'oscillator' | 'filter' | 'gain';

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onEdgesDelete: OnEdgesDelete;
  updateNode: (id: string, data: AudioNodeData) => void;
  addNode: (type: NodeType, data: AudioNodeData) => void;
  isRunning: boolean;
  toggleAudio: () => void;
};
