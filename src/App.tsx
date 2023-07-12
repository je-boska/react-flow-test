import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import OscillatorNode from './Components/OscillatorNode';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'input',
        position: { x: 0, y: 500 },
        data: { label: 'Audio In' },
        sourcePosition: Position.Right,
      },
      {
        id: '2',
        type: 'output',
        position: { x: 700, y: 500 },
        data: { label: 'Audio Out', input: 1 },
        targetPosition: Position.Left,
      },
      {
        id: '3',
        position: { x: 300, y: 200 },
        dragHandle: '.drag-handle',
        data: {
          label: '3',
          title: 'Oscillator',
          audioContext: audioContext,
          output: null,
        },
        type: 'oscillator',
      },
    ]);
  }, [audioContext, setNodes]);

  const nodeTypes = useMemo(() => ({ oscillator: OscillatorNode }), []);

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      console.log(params);
      setEdges((eds) => addEdge(params, eds));
      const newNodes = nodes.map((node) => {
        if (node.id !== params.source) {
          return node;
        }
        const targetNode = nodes.find((n) => n.id === params.target);
        return {
          ...node,
          data: {
            ...node.data,
            output: targetNode.data.input,
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
