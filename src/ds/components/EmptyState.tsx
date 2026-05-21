import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

export interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description?: string;
  /** Ação sugerida (ex.: um <Btn>). */
  action?: ReactNode;
  className?: string;
}

/** Estado vazio: ícone + texto + ação sugerida. */
export function EmptyState({ icon = 'list', title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('grid place-items-center px-6 py-8 text-center', className)}>
      <div>
        <div className="mx-auto mb-3 grid size-16 place-items-center rounded-full bg-muted">
          <Icon name={icon} size={28} color="var(--t2m-text-3)" />
        </div>
        <div className="font-head text-[15px] font-semibold text-ink">{title}</div>
        {description && <p className="mx-auto mt-1 max-w-xs text-xs text-ink-2">{description}</p>}
        {action && <div className="mt-3 inline-flex">{action}</div>}
      </div>
    </div>
  );
}
