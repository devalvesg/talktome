/**
 * Reconhecimento de datilologia (alfabeto manual) na tela do Cliente.
 *
 * Encapsula tudo: liga/desliga a webcam, roda o MediaPipe Hands, classifica
 * cada frame com o modelo ONNX no browser e vai montando o texto soletrado.
 * Só fica ativo enquanto `active` for true (o botão "iniciar conversão" da
 * tela do Cliente). Uma letra precisa ficar estável por ~15 frames acima de
 * 60% de confiança para ser confirmada — evita ruído entre transições.
 *
 * O texto montado é entregue via `onTextChange`, que o Client publica em
 * `librasText` para o atendente acompanhar em tempo real. Os refs do <video>
 * e <canvas> são criados pelo Client e passados aqui (o hook não os retorna,
 * para não acessar refs durante o render).
 */
import { useCallback, useEffect, useRef, useState } from 'react';

import { normalizeLandmarks } from '@/lib/libras/landmarks';
import type { Landmark } from '@/lib/libras/mediapipeHands';
import { useHandLandmarker } from '@/lib/libras/useHandLandmarker';
import {
  isLandmarkModelAvailable,
  predictLandmarks,
  type LandmarkPrediction,
} from '@/lib/libras/onnxClassifier';

const STABILIZATION_FRAMES = 15;
const MIN_CONFIDENCE = 0.6;

interface Options {
  active: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  onTextChange?: (text: string) => void;
}

export interface LibrasRecognition {
  /** MediaPipe carregado e detectando. */
  ready: boolean;
  /** Modelo ONNX publicado em /public e disponível. null = ainda verificando. */
  modelReady: boolean | null;
  /** Há uma mão visível no frame atual. */
  handDetected: boolean;
  /** Predição do frame atual (letra + confiança), antes da estabilização. */
  prediction: LandmarkPrediction | null;
  /** Frames consecutivos com a mesma letra (0..stabilizationFrames). */
  stability: number;
  stabilizationFrames: number;
  /** Texto soletrado acumulado. */
  text: string;
  /** Erro de câmera, MediaPipe ou inferência. */
  error: string | null;
  /** Limpa o texto acumulado (e notifica via onTextChange). */
  clear: () => void;
  /** Remove a última letra. */
  backspace: () => void;
}

export function useLibrasRecognition({
  active,
  videoRef,
  canvasRef,
  onTextChange,
}: Options): LibrasRecognition {
  const streamRef = useRef<MediaStream | null>(null);

  const [handDetected, setHandDetected] = useState(false);
  const [prediction, setPrediction] = useState<LandmarkPrediction | null>(null);
  const [stability, setStability] = useState(0);
  const [text, setText] = useState('');
  const [modelReady, setModelReady] = useState<boolean | null>(null);
  const [camError, setCamError] = useState<string | null>(null);

  const lastLetterRef = useRef<string | null>(null);
  const stableCountRef = useRef(0);
  const confirmedRef = useRef<string | null>(null);
  const inflightRef = useRef(false);

  // onTextChange via ref para não re-disparar efeitos quando o pai re-renderiza.
  const onTextChangeRef = useRef(onTextChange);
  useEffect(() => {
    onTextChangeRef.current = onTextChange;
  });

  // Classifica cada frame fora do ciclo de render (chamado pelo loop do rAF).
  const handleLandmarks = (lm: Landmark[] | null) => {
    setHandDetected(!!lm);
    if (!lm) {
      stableCountRef.current = 0;
      lastLetterRef.current = null;
      confirmedRef.current = null;
      setStability(0);
      setPrediction(null);
      return;
    }
    if (modelReady !== true || inflightRef.current) return;
    inflightRef.current = true;

    const features = normalizeLandmarks(lm);
    predictLandmarks(features)
      .then((pred) => {
        setPrediction(pred);
        if (pred.confidence < MIN_CONFIDENCE) {
          stableCountRef.current = 0;
          lastLetterRef.current = null;
          setStability(0);
          return;
        }
        if (lastLetterRef.current === pred.letter) {
          stableCountRef.current += 1;
        } else {
          lastLetterRef.current = pred.letter;
          stableCountRef.current = 1;
          confirmedRef.current = null;
        }
        setStability(stableCountRef.current);
        if (
          stableCountRef.current >= STABILIZATION_FRAMES &&
          confirmedRef.current !== pred.letter
        ) {
          confirmedRef.current = pred.letter;
          setText((prev) => {
            const next = prev + pred.letter;
            onTextChangeRef.current?.(next);
            return next;
          });
        }
      })
      .catch((err) => {
        setCamError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        inflightRef.current = false;
      });
  };

  const { ready, error: mpError } = useHandLandmarker({
    videoRef,
    canvasRef,
    active,
    onLandmarks: handleLandmarks,
  });

  // Verifica disponibilidade do modelo ONNX uma vez.
  useEffect(() => {
    let cancelled = false;
    isLandmarkModelAvailable().then((ok) => {
      if (!cancelled) setModelReady(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Liga/desliga a webcam conforme `active`.
  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setCamError(null);
      } catch (err) {
        if (!cancelled) {
          const msg =
            err instanceof Error ? err.message : 'Falha ao acessar a câmera.';
          setCamError(`Não foi possível iniciar a câmera: ${msg}`);
        }
      }
    })();

    const video = videoRef.current;
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      if (video) video.srcObject = null;
      setHandDetected(false);
      setPrediction(null);
      setStability(0);
      stableCountRef.current = 0;
      lastLetterRef.current = null;
      confirmedRef.current = null;
    };
  }, [active, videoRef]);

  const clear = useCallback(() => {
    setText('');
    confirmedRef.current = null;
    onTextChangeRef.current?.('');
  }, []);

  const backspace = useCallback(() => {
    setText((prev) => {
      const next = prev.slice(0, -1);
      onTextChangeRef.current?.(next);
      return next;
    });
    confirmedRef.current = null;
  }, []);

  return {
    ready,
    modelReady,
    handDetected,
    prediction,
    stability,
    stabilizationFrames: STABILIZATION_FRAMES,
    text,
    error: camError ?? mpError,
    clear,
    backspace,
  };
}
