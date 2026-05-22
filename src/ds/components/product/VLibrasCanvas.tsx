import { useEffect, useRef } from 'react';
import { mountVLibras, type VLibrasController } from '@/lib/vlibrasPlayer';

export type AvatarLoadStatus = 'loading' | 'ready' | 'error';

export interface VLibrasCanvasProps {
  /** Texto a sinalizar. Ao mudar, dispara nova tradução. */
  text?: string;
  /** Notifica quando o avatar começa/termina de sinalizar. */
  onSigningChange?: (signing: boolean) => void;
  /** Notifica mudanças de carga: 'loading' → 'ready' ou 'error' (com mensagem). */
  onStatusChange?: (status: AvatarLoadStatus, error?: string) => void;
  className?: string;
}

/**
 * Avatar 3D em LIBRAS via VLibras Player (M5). Encapsula o ciclo de vida do motor;
 * o LibrasViewer cuida do cromo (pills, legenda, overlay de carga/erro). O motor é
 * singleton — o canvas Unity é reaproveitado entre montagens (ver lib/vlibrasPlayer).
 */
export function VLibrasCanvas({ text, onSigningChange, onStatusChange, className }: VLibrasCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<VLibrasController | null>(null);
  const lastText = useRef<string | null>(null);
  const readyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;
    const el = ref.current;
    if (!el) return;

    onStatusChange?.('loading');
    mountVLibras(el)
      .then((ctrl) => {
        if (cancelled) return;
        ctrlRef.current = ctrl;
        readyRef.current = true;
        if (onSigningChange) unsubscribe = ctrl.onSigning(onSigningChange);
        onStatusChange?.('ready');
        // Traduz o texto que já estava pendente quando o avatar ficou pronto.
        if (text) {
          lastText.current = text;
          ctrl.translate(text);
        }
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : 'Falha ao iniciar o avatar.';
        console.error('[VLibras] falha ao montar o avatar:', err);
        onStatusChange?.('error', msg);
      });

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
    // Monta uma única vez; callbacks lidos por referência atual.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!readyRef.current || !text) return;
    if (lastText.current === text) return;
    lastText.current = text;
    ctrlRef.current?.translate(text);
  }, [text]);

  return <div ref={ref} aria-hidden="true" className={className} />;
}
