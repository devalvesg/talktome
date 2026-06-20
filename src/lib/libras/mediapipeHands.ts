/**
 * Wrapper do MediaPipe Hands (HandLandmarker da API tasks-vision).
 * O modelo `.task` e os `.wasm` são servidos da CDN para não exigir cópia
 * de assets dentro do bundle Vite. Portado de cnn-libras-web.
 */
import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision';

const WASM_BASE =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm';
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task';

export interface Landmark {
  x: number;
  y: number;
  z: number;
}

let _instance: HandLandmarker | null = null;
let _loading: Promise<HandLandmarker> | null = null;

export async function getHandLandmarker(): Promise<HandLandmarker> {
  if (_instance) return _instance;
  if (_loading) return _loading;
  _loading = (async () => {
    const fileset = await FilesetResolver.forVisionTasks(WASM_BASE);
    const hl = await HandLandmarker.createFromOptions(fileset, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numHands: 1,
      minHandDetectionConfidence: 0.5,
      minHandPresenceConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    _instance = hl;
    return hl;
  })();
  return _loading;
}
