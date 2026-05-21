import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

export type AlertTone = 'success' | 'warning' | 'error' | 'info';

export interface AlertProps {
  tone: AlertTone;
  title: string;
  children?: ReactNode;
  /** Ícone (default coerente com o tom). */
  icon?: IconName;
  /** Exibe botão de fechar e dispara o callback. */
  onClose?: () => void;
  className?: string;
}

const TONES: Record<AlertTone, { fg: string; bg: string; icon: IconName }> = {
  success: { fg: 'text-success', bg: 'bg-success-bg border-success/20', icon: 'check' },
  warning: { fg: 'text-warning', bg: 'bg-warning-bg border-warning/20', icon: 'alert' },
  error: { fg: 'text-error', bg: 'bg-error-bg border-error/20', icon: 'alert' },
  info: { fg: 'text-info', bg: 'bg-info-bg border-info/20', icon: 'info' },
};

/** Banner inline. Linguagem simples; toda mensagem de erro propõe o próximo passo. */
export function Alert({ tone, title, children, icon, onClose, className }: AlertProps) {
  const t = TONES[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('flex gap-3 rounded-[10px] border p-4', t.bg, className)}
    >
      <Icon name={icon ?? t.icon} size={22} className={cn('shrink-0', t.fg)} />
      <div className="flex-1">
        <div className={cn('font-head text-sm font-semibold', t.fg)}>{title}</div>
        {children && <div className="mt-0.5 text-[13px] text-ink-2">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className={cn('shrink-0 rounded p-0.5', t.fg)}
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
