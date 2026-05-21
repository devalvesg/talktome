import type { CSSProperties } from 'react';
import { Icon } from '../Icon';
import { PulseDot } from '../PulseDot';

export interface DeviceIndicatorProps {
  kind?: 'mic' | 'cam';
  active?: boolean;
  className?: string;
}

/** Pill de status de microfone/câmera, com PulseDot quando ativo. */
export function DeviceIndicator({ kind = 'mic', active = true, className }: DeviceIndicatorProps) {
  const color = active ? 'var(--t2m-secondary)' : 'var(--t2m-text-3)';
  const label = kind === 'mic' ? 'Microfone' : 'Câmera';
  const iconName = kind === 'mic' ? (active ? 'mic' : 'micOff') : active ? 'cam' : 'camOff';
  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[13px] font-semibold ${className ?? ''}`}
      style={
        {
          color,
          background: active ? 'rgba(14,154,141,0.10)' : 'var(--t2m-muted)',
          border: `1.5px solid ${active ? 'var(--t2m-secondary)' : 'transparent'}`,
        } as CSSProperties
      }
    >
      <Icon name={iconName} size={16} color={color} stroke={2.4} />
      {label} {active ? 'ativo' : 'desligado'}
      {active && <PulseDot color={color} size={8} />}
    </span>
  );
}
