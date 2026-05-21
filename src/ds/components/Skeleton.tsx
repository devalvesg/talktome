import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  /** Formato circular (avatar). */
  round?: boolean;
  className?: string;
}

/** Placeholder de carregamento com shimmer (respeita prefers-reduced-motion). */
export function Skeleton({ width = '100%', height = 12, round, className }: SkeletonProps) {
  return (
    <div
      className={cn('t2m-skeleton', round ? 'rounded-full' : 'rounded', className)}
      style={{ width, height } as CSSProperties}
      aria-hidden="true"
    />
  );
}
