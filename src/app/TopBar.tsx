import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Wordmark } from '@/ds/components';

export interface TopBarProps {
  /** Ações à direita (status, botões). */
  children?: ReactNode;
  /** Altura compacta (mobile/cliente). */
  compact?: boolean;
  className?: string;
}

/** Cabeçalho comum: wordmark à esquerda (link p/ Home), ações à direita. */
export function TopBar({ children, compact, className }: TopBarProps) {
  return (
    <header
      className={cn(
        'flex items-center gap-3 border-b border-line-subtle bg-surface px-4 sm:px-6',
        compact ? 'h-14' : 'h-16',
        className,
      )}
    >
      <Link to="/" aria-label="Talk2Me — início" className="shrink-0">
        <Wordmark height={compact ? 22 : 26} />
      </Link>
      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">{children}</div>
    </header>
  );
}
