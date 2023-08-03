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
      <h2 className='drag-handle text-lg font-bold'>{data.title}</h2>
      <button
        className='border border-black bg-white rounded-md p-2 m-2 min-w-[60px]'
        onClick={toggleAudio}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
    </>
  );
}
