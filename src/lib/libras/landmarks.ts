/**
 * Normalização dos landmarks da mão — precisa ser IDÊNTICA à usada no treino
 * (backend/training/train_landmarks.py do cnn-libras-web), senão o modelo erra.
 */
import type { Landmark } from './mediapipeHands';

export const NUM_LANDMARKS = 21;
export const FEATURE_DIM = NUM_LANDMARKS * 3; // 63

// Normaliza landmarks para invariância de translação e escala:
//   1. subtrai a posição do pulso (landmark 0)
//   2. divide pela maior distância euclidiana ao pulso (tamanho da mão)
// Rotação NÃO é normalizada — em libras a orientação da mão importa.
export function normalizeLandmarks(landmarks: Landmark[]): Float32Array {
  if (landmarks.length !== NUM_LANDMARKS) {
    throw new Error(
      `Esperado ${NUM_LANDMARKS} landmarks, recebido ${landmarks.length}`,
    );
  }
  const wrist = landmarks[0];
  const cx = new Float32Array(NUM_LANDMARKS);
  const cy = new Float32Array(NUM_LANDMARKS);
  const cz = new Float32Array(NUM_LANDMARKS);
  let maxDist = 0;
  for (let i = 0; i < NUM_LANDMARKS; i++) {
    const dx = landmarks[i].x - wrist.x;
    const dy = landmarks[i].y - wrist.y;
    const dz = landmarks[i].z - wrist.z;
    cx[i] = dx;
    cy[i] = dy;
    cz[i] = dz;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (d > maxDist) maxDist = d;
  }
  const scale = maxDist > 1e-6 ? 1 / maxDist : 1;
  const out = new Float32Array(FEATURE_DIM);
  for (let i = 0; i < NUM_LANDMARKS; i++) {
    out[i * 3 + 0] = cx[i] * scale;
    out[i * 3 + 1] = cy[i] * scale;
    out[i * 3 + 2] = cz[i] * scale;
  }
  return out;
}
