import { AudioNodeData } from './types';

const audioContext = new AudioContext();

type AudioNodeMap = Map<string, AudioNode>;

const nodes: AudioNodeMap = new Map();

const osc = audioContext.createOscillator();
osc.frequency.value = 440;
osc.start();

nodes.set('osc', osc);
nodes.set('out', audioContext.destination);

export function isRunning() {
  return audioContext.state === 'running';
}

export function toggleAudioContext() {
  return isRunning() ? audioContext.suspend() : audioContext.resume();
}

export function connectNodes(source: string, target: string) {
  const sourceNode = nodes.get(source);
  const targetNode = nodes.get(target);
  if (!sourceNode || !targetNode) return;
  sourceNode.connect(targetNode);
}

export function disconnectNodes(source: string, target: string) {
  const sourceNode = nodes.get(source);
  const targetNode = nodes.get(target);
  if (!sourceNode || !targetNode) return;
  sourceNode.disconnect(targetNode);
}

export function updateAudioNode(id: string, data: AudioNodeData) {
  const node = nodes.get(id);
  if (!node) return;
  for (const [key, val] of Object.entries(data)) {
    if (node[key as keyof AudioNode] instanceof AudioParam) {
      node[key as keyof AudioNode].value = val;
    } else {
      node[key as keyof AudioNode] = val;
    }
  }
}
