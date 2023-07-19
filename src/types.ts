import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from 'reactflow';

export type AudioNodeData = {
  title?: string;
  frequency?: number;
};

export type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  updateNode: (id: string, data: AudioNodeData) => void;
  isRunning: boolean;
  toggleAudio: () => void;
};
