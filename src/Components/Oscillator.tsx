import { useEffect, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { AudioNodeData } from '../App';

export default function Oscillator({ data }: NodeProps<AudioNodeData>) {
  const { audioContext } = data;

  const [osc, setOsc] = useState<OscillatorNode | null>(null);
  const [freq, setFreq] = useState<number>(440);

  useEffect(() => {
    if (audioContext) {
      setOsc(audioContext.createOscillator());
    }
  }, [audioContext]);

  useEffect(() => {
    if (audioContext && osc) {
      osc.frequency.value = freq;
    }
  }, [freq, audioContext, osc]);

  return (
    <>
      {audioContext && osc ? (
        <>
          <p className='drag-handle'>{data.title}</p>
          <p className='drag-handle'>
            {data.output ? 'Output: ' + String(data.output) : 'Not connected'}
          </p>
          <input
            type='range'
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
            min={100}
            max={2000}
          />

          <Handle
            id='Osc out'
            type='source'
            position={Position.Right}
            onConnect={() => {
              osc.connect(audioContext.destination);
              osc.start();
            }}
            isConnectable
          />
        </>
      ) : null}
    </>
  );
}
