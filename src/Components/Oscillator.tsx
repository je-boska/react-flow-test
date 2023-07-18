import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData } from '../types';
import { shallow } from 'zustand/shallow';
import useStore, { RFState } from '../store';

const selector = (id: string) => (store: RFState) => ({
  setFreq: (e: React.FormEvent<HTMLInputElement>) =>
    store.updateNode(id, { freq: e.target.value }),
});

export default function Oscillator({ id, data }: NodeProps<AudioNodeData>) {
  const { setFreq } = useStore(selector(id), shallow);

  return (
    <>
      <p className='drag-handle'>{data.title}</p>

      <input
        type='range'
        value={data.freq}
        onChange={setFreq}
        min={100}
        max={2000}
      />

      <Handle id='Osc out' type='source' position={Position.Right} />
    </>
  );
}
