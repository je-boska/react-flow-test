import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData, RFState } from '../types';
import useStore from '../store';
import { shallow } from 'zustand/shallow';

const selector = (store: RFState) => ({
  isRunning: store.isRunning,
  toggleAudio: store.toggleAudio,
});

export default function AudioOut({ data }: NodeProps<AudioNodeData>) {
  const { isRunning, toggleAudio } = useStore(selector, shallow);

  return (
    <>
      <Handle id='Input' type='target' position={Position.Left} isConnectable />
      <p className='drag-handle'>{data.title}</p>
      <button onClick={toggleAudio}>{isRunning ? 'Pause' : 'Play'}</button>
    </>
  );
}
