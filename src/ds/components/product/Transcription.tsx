import type { ReactNode } from 'react';
import { PulseDot } from '../PulseDot';
import { SoundWave } from '../SoundWave';

export interface TranscriptionProps {
  /** Texto transcrito (pode conter <mark> para destaque de palavra-chave). */
  children?: ReactNode;
  /** Idioma + confiança, ex.: "PT-BR · 98%". */
  meta?: string;
  active?: boolean;
  className?: string;
}

/** Caixa de transcrição em tempo real. Casca (sem ASR real no M1). */
export function Transcription({
  children,
  meta = 'PT-BR · 98%',
  active = true,
  className,
}: TranscriptionProps) {
  return (
    <div
      className={`rounded-lg border border-line-subtle bg-surface p-4.5 ${className ?? ''}`}
      aria-live="polite"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PulseDot color="var(--t2m-secondary)" size={8} />
          <span className="font-head text-[13px] font-semibold text-ink">
            Transcrição em tempo real
          </span>
        </div>
        <span className="font-mono text-[11px] text-ink-3">{meta}</span>
      </div>
      <div className="text-lg leading-normal text-ink [&_mark]:rounded [&_mark]:bg-brand-50 [&_mark]:px-1 [&_mark]:py-0.5 [&_mark]:text-brand">
        {children ?? <span className="text-ink-3">Aguardando fala…</span>}
      </div>
      <div className="mt-2">
        <SoundWave active={active} color="var(--t2m-secondary)" bars={40} height={22} />
      </div>
    </div>
  );
}
