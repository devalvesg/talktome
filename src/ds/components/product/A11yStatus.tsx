import { cn } from '@/lib/cn';
import { Icon } from '../Icon';

export interface A11yCheck {
  label: string;
  ok: boolean;
}

export interface A11yStatusProps {
  items: A11yCheck[];
  className?: string;
}

/** Lista de checks de acessibilidade — pill success (✓) ou neutro (✕). */
export function A11yStatus({ items, className }: A11yStatusProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {items.map((it) => (
        <span
          key={it.label}
          className={cn(
            'inline-flex items-center gap-2 rounded-md px-3 py-2 text-[13px] font-semibold',
            it.ok ? 'bg-success-bg text-success' : 'bg-muted text-ink-2',
          )}
        >
          <Icon
            name={it.ok ? 'check' : 'x'}
            size={14}
            stroke={2.6}
            color={it.ok ? 'var(--t2m-success)' : 'var(--t2m-text-3)'}
          />
          {it.label}
        </span>
      ))}
    </div>
  );
}
