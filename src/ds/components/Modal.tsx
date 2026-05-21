import { useEffect, useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  /** Ações no rodapé (ex.: botões). */
  footer?: ReactNode;
  className?: string;
}

/** Diálogo bloqueante. Fecha no Esc e no clique fora. Raio 20, shadow lg. */
export function Modal({ open, onClose, title, children, footer, className }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          't2m-anim-fade-in w-full max-w-md overflow-hidden rounded-xl bg-surface shadow-lg',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 p-5">
          <h2 id={titleId} className="font-head text-lg font-semibold text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="-m-1 rounded p-1 text-ink-3 hover:bg-muted"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        {children && <div className="px-5 pb-2 text-sm text-ink-2">{children}</div>}
        {footer && <div className="flex justify-end gap-2 p-5 pt-4">{footer}</div>}
      </div>
    </div>
  );
}
