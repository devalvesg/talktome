import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type PillTone =
  | 'default'
  | 'brand'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'dark';

export interface PillProps {
  children: ReactNode;
  tone?: PillTone;
  className?: string;
}

const TONES: Record<PillTone, string> = {
  default: 'bg-muted text-ink-2',
  brand: 'bg-brand-50 text-brand',
  accent: 'bg-accent-50 text-accent-600',
  success: 'bg-success-bg text-success',
  warning: 'bg-warning-bg text-warning',
  error: 'bg-error-bg text-error',
  info: 'bg-info-bg text-info',
  dark: 'bg-white/15 text-ink-inv',
};

/** Etiqueta curta (status, categoria). Tipografia mono caixa-alta. */
export function Pill({ children, tone = 'default', className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
        'font-mono text-[11px] font-semibold uppercase tracking-[0.06em]',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
