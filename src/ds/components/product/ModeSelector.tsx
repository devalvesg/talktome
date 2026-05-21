import { cn } from '@/lib/cn';
import { Icon, type IconName } from '../Icon';

export type ConversionMode = 'audio2libras' | 'libras2audio';

export interface ModeSelectorProps {
  mode?: ConversionMode;
  onChange?: (mode: ConversionMode) => void;
  className?: string;
}

const OPTIONS: { mode: ConversionMode; label: string; icon: IconName }[] = [
  { mode: 'audio2libras', label: 'Áudio → Libras', icon: 'mic' },
  { mode: 'libras2audio', label: 'Libras → Áudio', icon: 'hand' },
];

/** Toggle de sentido da tradução. Casca controlada (sem lógica de sessão). */
export function ModeSelector({ mode = 'audio2libras', onChange, className }: ModeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Sentido da tradução"
      className={cn('inline-flex gap-1 rounded-[14px] bg-muted p-1.5', className)}
    >
      {OPTIONS.map((opt) => {
        const active = opt.mode === mode;
        return (
          <button
            key={opt.mode}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(opt.mode)}
            className={cn(
              'flex items-center gap-2.5 rounded-[10px] px-5 py-3.5 text-[15px] font-semibold',
              'transition-colors duration-[120ms]',
              active ? 'bg-surface text-brand shadow-sm' : 'text-ink-2 hover:text-ink',
            )}
          >
            <Icon name={opt.icon} size={18} stroke={2.2} />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
