import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData, RFState } from '../types';
import { shallow } from 'zustand/shallow';
import useStore from '../store';

const selector = (id: string) => (store: RFState) => ({
  setFrequency: (e: React.ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { frequency: Number(e.target.value) }),
  setQ: (e: React.ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { Q: Number(e.target.value) }),
});

export default function Filter({ id, data }: NodeProps<AudioNodeData>) {
  const { setFrequency, setQ } = useStore(selector(id), shallow);

  return (
    <>
      <h2 className='drag-handle text-lg font-bold'>{data.title}</h2>
      <Handle id='Filter in' type='target' position={Position.Left} />
      <div className='grid'>
        <label htmlFor='Frequency'>Frequency</label>
        <input
          type='range'
          name='Frequency'
          value={data.frequency}
          onChange={setFrequency}
          min={30}
          max={20000}
        />
        <label htmlFor='Resonance'>Resonance</label>
        <input
          type='range'
          name='resonance'
          value={data.Q}
          onChange={setQ}
          min={0.0001}
          max={50}
          step='any'
        />
      </div>

      <Handle id='Filter out' type='source' position={Position.Right} />
    </>
  );
}
