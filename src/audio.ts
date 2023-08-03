import { AudioNodeData, NodeType } from './types';

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

export function createNode(id: string, type: NodeType, data: AudioNodeData) {
  switch (type) {
    case 'oscillator': {
      const osc = audioContext.createOscillator();
      osc.frequency.value = data.frequency ? data.frequency : 440;
      osc.type = 'sawtooth';
      osc.start();
      nodes.set(id, osc);
      break;
    }
    case 'filter': {
      const filter = audioContext.createBiquadFilter();
      filter.frequency.value = data.frequency ? data.frequency : 1000;
      filter.Q.value = data.Q ? data.Q : 1;
      nodes.set(id, filter);
      break;
    }
    case 'gain': {
      const gain = audioContext.createGain();
      gain.gain.value = data.gain ? data.gain : 0.1;
      nodes.set(id, gain);
      break;
    }
  }
}
