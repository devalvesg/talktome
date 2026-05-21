import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

export type ToastTone = 'success' | 'warning' | 'error' | 'info';

export interface ToastOptions {
  tone?: ToastTone;
  message: string;
  /** Duração em ms (default 4000). */
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, 'duration'>> {
  id: number;
  duration: number;
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TONES: Record<ToastTone, { fg: string; icon: IconName }> = {
  success: { fg: 'text-success', icon: 'check' },
  warning: { fg: 'text-warning', icon: 'alert' },
  error: { fg: 'text-error', icon: 'alert' },
  info: { fg: 'text-info', icon: 'info' },
};

/** Provider de toasts não-bloqueantes (rodapé, 3–5s). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const remove = useCallback((id: number) => {
    setItems((cur) => cur.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ tone = 'info', message, duration = 4000 }: ToastOptions) => {
      const id = Date.now() + Math.random();
      setItems((cur) => [...cur, { id, tone, message, duration }]);
      window.setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4"
        aria-live="polite"
      >
        {items.map((t) => {
          const c = TONES[t.tone];
          return (
            <div
              key={t.id}
              className="t2m-anim-fade-in pointer-events-auto flex items-center gap-3 rounded-[10px] border border-line-subtle bg-surface px-4 py-3 shadow-md"
              role="status"
            >
              <Icon name={c.icon} size={18} className={cn('shrink-0', c.fg)} />
              <span className="text-sm text-ink">{t.message}</span>
              <button
                type="button"
                onClick={() => remove(t.id)}
                aria-label="Fechar"
                className="ml-1 rounded p-0.5 text-ink-3 hover:bg-muted"
              >
                <Icon name="x" size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast precisa estar dentro de <ToastProvider>');
  return ctx;
}
