import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove o padding interno (para cards com mídia/lista no topo). */
  flush?: boolean;
  /** Sombra mais alta (surface.elevated). */
  elevated?: boolean;
}

/** Card informativo base: surface, borda sutil, raio 12, sombra sm, padding 20. */
export function Card({ flush, elevated, className, children, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        'rounded-lg border border-line-subtle bg-surface',
        elevated ? 'shadow-md' : 'shadow-sm',
        !flush && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
