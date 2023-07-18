import { AudioNodeData } from './types';

const audioContext = new AudioContext();

type AudioNodeMap = Map<string, AudioNode>;

const nodes: AudioNodeMap = new Map();

const osc = audioContext.createOscillator();
osc.frequency.value = 440;
osc.start();

nodes.set('osc', osc);

export function connectNodes(source: AudioNode, target: AudioNode) {
  source.connect(target);
}

export function updateAudioNode(id: string, data: AudioNodeData) {
  const node = nodes.get(id);
  if (!node) return;
  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = val;
    } else {
      node[key] = val;
    }
  }
}
