import { useMemo } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Oscillator from './Components/Oscillator';
import AudioOut from './Components/AudioOut';
import useStore from './store';
import { shallow } from 'zustand/shallow';
import { RFState } from './types';
import Filter from './Components/Filter';

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  onEdgesDelete: state.onEdgesDelete,
  addNode: state.addNode,
});

function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onEdgesDelete,
    addNode,
  } = useStore(selector, shallow);

  const nodeTypes = useMemo(
    () => ({ oscillator: Oscillator, filter: Filter, audioOut: AudioOut }),
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <MiniMap />
        <Controls />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
        <Panel position='top-left'>
          <button
            onClick={() =>
              addNode('oscillator', { title: 'OSC', frequency: 220 })
            }
          >
            OSC
          </button>
          <button
            onClick={() =>
              addNode('filter', { title: 'Filter', frequency: 1000 })
            }
          >
            Filter
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export default App;
