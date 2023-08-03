import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData, RFState } from '../types';
import { shallow } from 'zustand/shallow';
import useStore from '../store';

const selector = (id: string) => (store: RFState) => ({
  setGain: (e: React.ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { gain: Number(e.target.value) }),
});

export default function Gain({ id, data }: NodeProps<AudioNodeData>) {
  const { setGain } = useStore(selector(id), shallow);

  return (
    <>
      <h2 className='drag-handle text-lg font-bold'>{data.title}</h2>
      <Handle id='Gain in' type='target' position={Position.Left} />

      <input
        type='range'
        value={data.gain}
        onChange={setGain}
        min={0}
        max={1.0}
        step='any'
      />

      <Handle id='Gain out' type='source' position={Position.Right} />
    </>
  );
}
