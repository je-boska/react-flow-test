import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Oscillator from './Components/Oscillator';
import AudioOut from './Components/AudioOut';

export type AudioNodeData = {
  title: string;
  audioContext?: AudioContext;
  input?: number | null;
  output?: number | null;
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<AudioNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>(
    undefined
  );

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'audioOut',
        position: { x: 700, y: 500 },
        data: {
          title: 'Audio Out',
          audioContext: audioContext,
          input: 1,
        },
      },
      {
        id: '2',
        position: { x: 300, y: 200 },
        dragHandle: '.drag-handle',
        data: {
          title: 'Oscillator',
          audioContext: audioContext,
          output: null,
        },
        type: 'oscillator',
      },
    ]);
  }, [audioContext, setNodes]);

  const nodeTypes = useMemo(
    () => ({ oscillator: Oscillator, audioOut: AudioOut }),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      console.log(params);
      setEdges((eds) => addEdge(params, eds));
      const newNodes = nodes.map((node) => {
        // Nodes other than the one connected from remain unchanged
        if (node.id !== params.source) {
          return node;
        }

        // Find target node and assign its input as output on source node
        const targetNode = nodes.find((n) => n.id === params.target);
        return {
          ...node,
          data: {
            ...node.data,
            output: targetNode?.data.input,
          },
        };
      });
      setNodes(newNodes);
    },
    [setEdges, setNodes, nodes]
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button onClick={() => setAudioContext(new AudioContext())}>
        Create Audio Context
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default App;
