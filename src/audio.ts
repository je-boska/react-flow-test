const audioContext = new AudioContext();

type AudioNodeMap = Map<string, AudioNode>;

const nodes: AudioNodeMap = new Map();

const osc = audioContext.createOscillator();
osc.frequency.value = 440;
osc.start();

nodes.set('oscillator', osc);

export function connectNodes(source: AudioNode, target: AudioNode) {
  source.connect(target);
}

export function updateAudioNode(id) {
  return;
}
