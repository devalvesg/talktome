import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Icon, type IconName } from './Icon';
import { Spinner } from './Spinner';

export type BtnVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'light';
export type BtnSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant;
  size?: BtnSize;
  /** Ícone à esquerda do texto. */
  icon?: IconName;
  /** Ícone à direita do texto. */
  iconRight?: IconName;
  /** Botão apenas com ícone (quadrado). Exige `aria-label`. */
  iconOnly?: boolean;
  /** Mostra spinner no lugar do ícone e bloqueia o clique. */
  loading?: boolean;
  /** Ocupa 100% da largura. */
  full?: boolean;
  children?: ReactNode;
}

/* Altura · padding-x · fonte · gap · tamanho do ícone — spec do DS. */
const SIZES: Record<BtnSize, { h: string; px: string; text: string; gap: string; icon: number }> = {
  sm: { h: 'h-9', px: 'px-3.5', text: 'text-sm', gap: 'gap-2', icon: 16 },
  md: { h: 'h-11', px: 'px-[18px]', text: 'text-[15px]', gap: 'gap-2.5', icon: 18 },
  lg: { h: 'h-13', px: 'px-6', text: 'text-base', gap: 'gap-3', icon: 20 },
  xl: { h: 'h-16', px: 'px-8', text: 'text-lg', gap: 'gap-3.5', icon: 22 },
  xxl: { h: 'h-22', px: 'px-10', text: 'text-xl', gap: 'gap-4', icon: 28 },
};

const SQUARE: Record<BtnSize, string> = {
  sm: 'w-9',
  md: 'w-11',
  lg: 'w-13',
  xl: 'w-16',
  xxl: 'w-22',
};

const VARIANTS: Record<BtnVariant, string> = {
  primary: 'bg-brand text-ink-inv border-brand hover:brightness-[0.92]',
  secondary: 'bg-accent text-ink-inv border-accent hover:brightness-[0.92]',
  danger: 'bg-error text-ink-inv border-error hover:brightness-[0.92]',
  outline:
    'bg-transparent text-brand border-brand hover:bg-[var(--t2m-state-hover)] active:bg-[var(--t2m-state-active)]',
  ghost:
    'bg-transparent text-brand border-transparent hover:bg-[var(--t2m-state-hover)] active:bg-[var(--t2m-state-active)]',
  light: 'bg-surface text-brand border-transparent shadow-sm hover:bg-muted',
};

export function Btn({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  iconOnly,
  loading,
  full,
  disabled,
  className,
  children,
  ...rest
}: BtnProps) {
  const s = SIZES[size];
  const isDisabled = disabled || loading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-[10px] border-[1.5px] font-semibold',
        'transition-[background-color,filter,box-shadow] duration-[120ms] ease-[var(--ease-default)]',
        'cursor-pointer select-none',
        s.h,
        s.text,
        s.gap,
        iconOnly ? SQUARE[size] : cn(s.px, full && 'w-full'),
        isDisabled
          ? 'cursor-not-allowed border-line bg-muted text-[var(--t2m-state-disabled-text)] shadow-none hover:brightness-100 hover:bg-muted'
          : VARIANTS[variant],
        className,
      )}
    >
      {loading ? (
        <Spinner size={s.icon} />
      ) : (
        icon && <Icon name={icon} size={s.icon} stroke={2.2} />
      )}
      {!iconOnly && children}
      {!iconOnly && iconRight && <Icon name={iconRight} size={s.icon} stroke={2.2} />}
    </button>
  );
}
