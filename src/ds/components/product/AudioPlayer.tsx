import { Icon } from '../Icon';
import { SoundWave } from '../SoundWave';

export interface AudioPlayerProps {
  title?: string;
  /** Tempo "atual / total". */
  time?: string;
  playing?: boolean;
  onToggle?: () => void;
  className?: string;
}

/** Player horizontal com botão circular + SoundWave. Casca (sem áudio real). */
export function AudioPlayer({
  title = 'Resposta do atendente',
  time = '00:00 / 00:00',
  playing = false,
  onToggle,
  className,
}: AudioPlayerProps) {
  return (
    <div
      className={`flex items-center gap-3.5 rounded-lg border border-line-subtle bg-surface p-4 ${className ?? ''}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? 'Pausar' : 'Reproduzir'}
        className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-ink-inv"
      >
        <Icon name={playing ? 'pause' : 'play'} size={18} />
      </button>
      <div className="flex-1">
        <div className="mb-1.5 flex justify-between">
          <span className="font-head text-[13px] font-semibold text-ink">{title}</span>
          <span className="font-mono text-[11px] text-ink-3">{time}</span>
        </div>
        <SoundWave active={playing} color="var(--t2m-primary)" bars={24} height={20} />
      </div>
    </div>
  );
}
