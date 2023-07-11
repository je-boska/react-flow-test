import { useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

interface OscillatorNodeProps {
  data: {
    label: string;
    title: string;
    audioContext: AudioContext;
  };
}

export default function OscillatorNode({ data }: OscillatorNodeProps) {
  const { audioContext } = data;

  const [osc, setOsc] = useState<OscillatorNode | null>(null);

  useEffect(() => {
    if (audioContext) {
      setOsc(audioContext.createOscillator());
    }
  }, [audioContext]);

  return (
    <>
      {osc ? (
        <>
          <Handle type='target' position={Position.Left} isConnectable />
          <p>{data.title}</p>

          <Handle
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
