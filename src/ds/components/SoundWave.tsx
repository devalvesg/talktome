import type { CSSProperties } from 'react';

export interface SoundWaveProps {
  active?: boolean;
  color?: string;
  bars?: number;
  height?: number;
  className?: string;
}

/** Barras de áudio animadas. Estática (sem animação) quando `active=false`. */
export function SoundWave({
  active = true,
  color = 'var(--t2m-primary)',
  bars = 14,
  height = 40,
  className,
}: SoundWaveProps) {
  return (
    <div className={`flex items-center gap-1 ${className ?? ''}`} style={{ height }} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={
            {
              display: 'block',
              width: 3,
              height: active ? '100%' : '15%',
              borderRadius: 2,
              background: color,
              opacity: active ? 1 : 0.35,
              transformOrigin: 'center',
              animation: active
                ? `t2m-wave 0.${(i % 6) + 4}s ease-in-out ${i * 70}ms infinite`
                : 'none',
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
