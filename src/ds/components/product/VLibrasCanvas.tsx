import { useEffect, useRef, useState } from 'react';
import { mountVLibras, type VLibrasController } from '@/lib/vlibrasPlayer';

export interface VLibrasCanvasProps {
  /** Texto a sinalizar. Ao mudar, dispara nova tradução. */
  text?: string;
  /** Notifica quando o avatar começa/termina de sinalizar. */
  onSigningChange?: (signing: boolean) => void;
  /** Notifica quando o avatar terminou de carregar (pronto para sinalizar). */
  onReady?: () => void;
  className?: string;
}

/**
 * Avatar 3D em LIBRAS via VLibras Player (M5). Encapsula o ciclo de vida do motor;
 * o LibrasViewer cuida do cromo (pills, legenda). O motor é singleton — o canvas
 * Unity é reaproveitado entre montagens (ver src/lib/vlibrasPlayer.ts).
 */
export function VLibrasCanvas({ text, onSigningChange, onReady, className }: VLibrasCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<VLibrasController | null>(null);
  const lastText = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;
    const el = ref.current;
    if (!el) return;

    mountVLibras(el)
      .then((ctrl) => {
        if (cancelled) return;
        ctrlRef.current = ctrl;
        if (onSigningChange) unsubscribe = ctrl.onSigning(onSigningChange);
        setReady(true);
        onReady?.();
      })
      .catch((err) => console.error('[VLibras] falha ao montar o avatar:', err));

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
    // Monta uma única vez; callbacks lidos por referência atual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready || !text) return;
    if (lastText.current === text) return;
    lastText.current = text;
    ctrlRef.current?.translate(text);
  }, [ready, text]);

  return <div ref={ref} aria-hidden="true" className={className} />;
}
