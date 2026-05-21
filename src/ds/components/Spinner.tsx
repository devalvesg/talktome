export interface SpinnerProps {
  size?: number;
  color?: string;
  className?: string;
}

/** Spinner inline (respeita prefers-reduced-motion via CSS global). */
export function Spinner({ size = 18, color = 'currentColor', className }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`t2m-anim-spin ${className ?? ''}`}
      role="status"
      aria-label="Carregando"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray="14 28"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}
