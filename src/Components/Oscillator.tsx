import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData } from '../App';

export default function Oscillator({ id, data }: NodeProps<AudioNodeData>) {
  return (
    <>
      <p className='drag-handle'>{data.title}</p>

      <input type='range' value={data.freq} min={100} max={2000} />

      <Handle id='Osc out' type='source' position={Position.Right} />
    </>
  );
}
