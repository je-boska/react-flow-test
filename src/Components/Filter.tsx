import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData, RFState } from '../types';
import { shallow } from 'zustand/shallow';
import useStore from '../store';

const selector = (id: string) => (store: RFState) => ({
  setFrequency: (e: React.ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { frequency: Number(e.target.value) }),
});

export default function Filter({ id, data }: NodeProps<AudioNodeData>) {
  const { setFrequency } = useStore(selector(id), shallow);

  return (
    <>
      <p className='drag-handle'>{data.title}</p>
      <Handle id='Filter in' type='target' position={Position.Left} />

      <input
        type='range'
        value={data.frequency}
        onChange={setFrequency}
        min={30}
        max={20000}
      />

      <Handle id='Filter out' type='source' position={Position.Right} />
    </>
  );
}
