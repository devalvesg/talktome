import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { useId } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';

interface FieldShellProps {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: ReactNode;
}

/** Estrutura comum: label visível + controle + hint/erro. */
function FieldShell({ label, hint, error, htmlFor, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-[13px] font-semibold text-ink">
          {label}
        </label>
      )}
      {children}
      {(hint || error) && (
        <div
          className={cn(
            'flex items-center gap-1 text-xs',
            error ? 'text-error' : 'text-ink-2',
          )}
        >
          {error && <Icon name="alert" size={12} />}
          {error || hint}
        </div>
      )}
    </div>
  );
}

/* Caixa do controle (borda/altura/foco) compartilhada via classe utilitária. */
const control = (extra?: string) =>
  cn(
    'w-full rounded-md border-[1.5px] border-line bg-surface text-sm text-ink',
    'placeholder:text-ink-3',
    'focus:border-brand focus:outline-none focus:shadow-[var(--t2m-shadow-focus)]',
    'disabled:bg-muted disabled:text-ink-3 disabled:cursor-not-allowed',
    'aria-[invalid=true]:border-error',
    extra,
  );

// ── Input ────────────────────────────────────────────────────────────────
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: IconName;
}

export function Input({ label, hint, error, icon, id, className, ...rest }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={fieldId}>
      <div className="relative flex items-center">
        {icon && (
          <Icon
            name={icon}
            size={18}
            color="var(--t2m-text-3)"
            className="pointer-events-none absolute left-3.5"
          />
        )}
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={control(cn('h-11 px-3.5', icon && 'pl-11', className))}
          {...rest}
        />
      </div>
    </FieldShell>
  );
}

// ── Textarea ───────────────────────────────────────────────────────────────
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Textarea({ label, hint, error, id, className, ...rest }: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={fieldId}>
      <textarea
        id={fieldId}
        aria-invalid={error ? true : undefined}
        className={control(cn('min-h-20 px-3.5 py-3 leading-normal', className))}
        {...rest}
      />
    </FieldShell>
  );
}

// ── Select ───────────────────────────────────────────────────────────────
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Select({ label, hint, error, id, className, children, ...rest }: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <FieldShell label={label} hint={hint} error={error} htmlFor={fieldId}>
      <div className="relative flex items-center">
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={control(cn('h-11 appearance-none px-3.5 pr-10', className))}
          {...rest}
        >
          {children}
        </select>
        <Icon
          name="chevD"
          size={16}
          color="var(--t2m-text-3)"
          className="pointer-events-none absolute right-3.5"
        />
      </div>
    </FieldShell>
  );
}
