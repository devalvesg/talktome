import { cn } from '@/lib/cn';
import { Pill } from '../Pill';
import { PulseDot } from '../PulseDot';

export type LibrasState = 'signaling' | 'neutral';

export interface LibrasViewerProps {
  size?: 'md' | 'lg';
  state?: LibrasState;
  /** Legenda textual (acessibilidade: avatar nunca aparece sem legenda). */
  caption?: string;
  className?: string;
}

/**
 * Área do avatar em LIBRAS. CASCA do M1: figura estilizada estática +
 * cromo (pills) + legenda. O motor real (VLibras / plano B) entra no M5.
 */
export function LibrasViewer({
  size = 'md',
  state = 'signaling',
  caption = 'Bom dia! Em que posso ajudar?',
  className,
}: LibrasViewerProps) {
  const h = size === 'lg' ? 320 : 220;
  return (
    <div
      className={cn('relative w-full overflow-hidden rounded-[14px] text-ink-inv', className)}
      style={{
        minHeight: h,
        background: 'linear-gradient(160deg, #0F0F44 0%, #191970 70%, #2E2E8C 100%)',
      }}
    >
      <svg
        width="100%"
        height={h}
        viewBox="0 0 320 220"
        preserveAspectRatio="xMidYMid meet"
        className="block"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="t2m-libras-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#5B5BB2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0F0F44" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" fill="url(#t2m-libras-glow)" />
        <circle cx="160" cy="78" r="28" fill="#FFD7B5" />
        <path d="M 120 200 Q 120 130 160 130 Q 200 130 200 200 Z" fill="#33D6C6" opacity="0.95" />
        <path d="M 140 140 Q 110 120 100 95" stroke="#FFD7B5" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M 180 140 Q 210 105 220 120" stroke="#FFD7B5" strokeWidth="14" strokeLinecap="round" fill="none" />
        <circle cx="100" cy="92" r="11" fill="#FFD7B5" />
        <circle cx="222" cy="122" r="11" fill="#FFD7B5" />
      </svg>

      <div className="absolute left-3 top-3">
        <Pill tone="brand">Avatar · Libras</Pill>
      </div>
      <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold">
        {state === 'signaling' ? (
          <>
            <PulseDot color="#33D6C6" size={6} />
            Sinalizando
          </>
        ) : (
          'Aguardando'
        )}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 px-4 py-3.5 text-sm leading-snug"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)' }}
      >
        <span className="text-[11px] uppercase tracking-[0.12em] opacity-70">Traduzindo</span>
        <div className="mt-0.5">{caption}</div>
      </div>
    </div>
  );
}
