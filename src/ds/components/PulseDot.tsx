import type { CSSProperties } from 'react';

export interface PulseDotProps {
  /** Cor do ponto e do anel pulsante. */
  color?: string;
  size?: number;
  className?: string;
}

/** Ponto com anel pulsante — sinaliza atividade (gravando, sinalizando…). */
export function PulseDot({ color = 'var(--t2m-error)', size = 12, className }: PulseDotProps) {
  return (
    <span
      className={`t2m-anim-ring inline-block rounded-full ${className ?? ''}`}
      style={
        {
          width: size,
          height: size,
          background: color,
          '--t2m-ring-color': color,
        } as CSSProperties
      }
    />
  );
}
