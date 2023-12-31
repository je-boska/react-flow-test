import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData, RFState } from '../types';
import { shallow } from 'zustand/shallow';
import useStore from '../store';

const selector = (id: string) => (store: RFState) => ({
  setFrequency: (e: React.ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { frequency: Number(e.target.value) }),
});

export default function Oscillator({ id, data }: NodeProps<AudioNodeData>) {
  const { setFrequency } = useStore(selector(id), shallow);

  return (
    <>
      <h2 className='drag-handle text-lg font-bold'>{data.title}</h2>

      <input
        type='range'
        value={data.frequency}
        onChange={setFrequency}
        min={100}
        max={2000}
      />

      <Handle id='Osc out' type='source' position={Position.Right} />
    </>
  );
}
