import { cn } from '@/lib/cn';
import type { HistorySide } from '@/session/types';

export interface ConversationCardProps {
  side: HistorySide;
  /** Quem falou, ex.: "Cliente" / "Atendente". */
  who: string;
  /** Sentido/tipo, ex.: "LIBRAS → ÁUDIO". */
  kind: string;
  time: string;
  message: string;
  className?: string;
}

/** Bolha de histórico. Cliente à esquerda (muted), atendente à direita (brand). */
export function ConversationCard({
  side,
  who,
  kind,
  time,
  message,
  className,
}: ConversationCardProps) {
  const isClient = side === 'client';
  return (
    <div className={cn('mb-3 flex', isClient ? 'justify-start' : 'justify-end', className)}>
      <div className="max-w-[78%]">
        <div
          className={cn(
            'mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3',
            isClient ? 'text-left' : 'text-right',
          )}
        >
          {who} · {kind} · {time}
        </div>
        <div
          className={cn(
            'px-4 py-3 text-[15px] leading-snug',
            isClient
              ? 'rounded-[14px_14px_14px_4px] bg-muted text-ink'
              : 'rounded-[14px_14px_4px_14px] bg-brand text-ink-inv',
          )}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
