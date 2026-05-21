import type { CSSProperties } from 'react';
import { Icon } from '../Icon';

export type ConnState = 'online' | 'weak' | 'offline';

export interface ConnStatusProps {
  status?: ConnState;
  className?: string;
}

const MAP: Record<ConnState, { color: string; label: string }> = {
  online: { color: 'var(--t2m-success)', label: 'Conectado' },
  weak: { color: 'var(--t2m-warning)', label: 'Conexão instável' },
  offline: { color: 'var(--t2m-error)', label: 'Sem conexão' },
};

/** Pill de status de conexão (online / instável / offline). */
export function ConnStatus({ status = 'online', className }: ConnStatusProps) {
  const { color, label } = MAP[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-semibold ${className ?? ''}`}
      style={
        {
          color,
          borderColor: `color-mix(in srgb, ${color} 33%, transparent)`,
          background: `color-mix(in srgb, ${color} 7%, transparent)`,
        } as CSSProperties
      }
    >
      <Icon name="wifi" size={14} color={color} stroke={2.4} />
      {label}
    </span>
  );
}
