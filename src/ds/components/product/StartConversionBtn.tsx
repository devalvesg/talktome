import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

export interface StartConversionBtnProps {
  active?: boolean;
  /** Timer mm:ss exibido quando ativo. */
  elapsed?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * CTA XXL de iniciar/parar conversão (88px).
 * Inativo: brand + play. Ativo: danger + stop + badge de timer.
 */
export function StartConversionBtn({
  active,
  elapsed = '00:00',
  onClick,
  className,
}: StartConversionBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-22 min-w-70 items-center justify-center gap-3.5 rounded-2xl px-8',
        'font-body text-xl font-bold text-ink-inv',
        active ? 'bg-error' : 'bg-brand',
        className,
      )}
      style={
        {
          boxShadow: active
            ? '0 8px 24px rgba(176,32,47,0.3)'
            : '0 8px 24px rgba(25,25,112,0.3)',
        } as CSSProperties
      }
    >
      {active ? (
        <span className="size-5 rounded-[6px] bg-white" aria-hidden="true" />
      ) : (
        <span
          aria-hidden="true"
          className="ml-[-4px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: '14px solid #fff',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
          }}
        />
      )}
      {active ? 'Parar conversão' : 'Iniciar conversão'}
      {active && (
        <span className="ml-2 rounded-full bg-white/20 px-2.5 py-1 font-mono text-[13px] font-semibold">
          {elapsed}
        </span>
      )}
    </button>
  );
}
