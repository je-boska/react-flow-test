import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData } from '../App';

export default function AudioOut({ data }: NodeProps<AudioNodeData>) {
  //   const { audioContext } = data;

  return (
    <>
      <Handle id='Input' type='target' position={Position.Left} isConnectable />
      <p className='drag-handle'>{data.title}</p>
      <p className='drag-handle'>{data.input}</p>
    </>
  );
}
