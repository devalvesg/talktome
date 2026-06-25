/**
 * Loop de detecção do MediaPipe Hands: lê frames do <video>, extrai os 21
 * landmarks, desenha a "esqueletização" no <canvas> sobreposto e entrega os
 * landmarks via callback. Ativo apenas enquanto `active` for true.
 * Portado de cnn-libras-web.
 */
import { useEffect, useRef, useState } from 'react';

import { getHandLandmarker, type Landmark } from './mediapipeHands';

// Conexões usadas para desenhar a "esqueletização" da mão sobre o canvas.
const HAND_CONNECTIONS: ReadonlyArray<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], // polegar
  [0, 5], [5, 6], [6, 7], [7, 8], // indicador
  [5, 9], [9, 10], [10, 11], [11, 12], // médio
  [9, 13], [13, 14], [14, 15], [15, 16], // anelar
  [13, 17], [17, 18], [18, 19], [19, 20], // mínimo
  [0, 17], // base da palma
];

interface Options {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  active: boolean;
  onLandmarks?: (lm: Landmark[] | null) => void;
}

export function useHandLandmarker({
  videoRef,
  canvasRef,
  active,
  onLandmarks,
}: Options) {
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);

  // Mantém o callback mais recente sem reiniciar o loop de detecção.
  const onLandmarksRef = useRef(onLandmarks);
  useEffect(() => {
    onLandmarksRef.current = onLandmarks;
  });

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvasEl = canvasRef.current;
    let cancelled = false;

    (async () => {
      try {
        const hl = await getHandLandmarker();
        if (cancelled) return;
        setReady(true);

        const tick = (timestamp: number) => {
          if (cancelled) return;
          const video = videoRef.current;
          const canvas = canvasRef.current;
          if (video && canvas && video.readyState >= 2 && video.videoWidth > 0) {
            if (canvas.width !== video.videoWidth)
              canvas.width = video.videoWidth;
            if (canvas.height !== video.videoHeight)
              canvas.height = video.videoHeight;
            // detectForVideo exige timestamp estritamente crescente.
            const ts =
              timestamp > lastTsRef.current
                ? timestamp
                : lastTsRef.current + 1;
            lastTsRef.current = ts;
            const result = hl.detectForVideo(video, ts);
            const lm = result.landmarks?.[0] ?? null;
            drawOverlay(canvas, lm);
            onLandmarksRef.current?.(lm);
          }
          rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();

    return () => {
      cancelled = true;
      setReady(false);
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const ctx = canvasEl?.getContext('2d');
      ctx?.clearRect(0, 0, canvasEl?.width ?? 0, canvasEl?.height ?? 0);
    };
  }, [active, videoRef, canvasRef]);

  return { ready, error };
}

function drawOverlay(canvas: HTMLCanvasElement, landmarks: Landmark[] | null) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!landmarks) return;
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#4ade80';
  ctx.fillStyle = '#f97316';
  for (const [a, b] of HAND_CONNECTIONS) {
    const p1 = landmarks[a];
    const p2 = landmarks[b];
    ctx.beginPath();
    ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
    ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
    ctx.stroke();
  }
  for (const p of landmarks) {
    ctx.beginPath();
    ctx.arc(p.x * canvas.width, p.y * canvas.height, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}
