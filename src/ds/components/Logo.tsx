export interface LogoMarkProps {
  size?: number;
  fg?: string;
  accent?: string;
  className?: string;
}

/** Ícone circular: dois balões de fala (voz + LIBRAS) dentro de um círculo. */
export function LogoMark({ size = 64, fg = '#191970', accent = '#0E9A8D', className }: LogoMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Talk2Me" className={className}>
      <circle cx="32" cy="32" r="29" fill="none" stroke={fg} strokeWidth="3.5" />
      <path
        d="M 18 22 Q 18 16 24 16 L 30 16 Q 36 16 36 22 L 36 30 Q 36 36 30 36 L 27 36 L 22 41 L 22 36 L 24 36 Q 18 36 18 30 Z"
        fill={fg}
      />
      <path
        d="M 46 42 Q 46 48 40 48 L 34 48 Q 28 48 28 42 L 28 34 Q 28 28 34 28 L 37 28 L 42 23 L 42 28 L 40 28 Q 46 28 46 34 Z"
        fill={accent}
        opacity="0.9"
      />
      <circle cx="32" cy="32" r="2.4" fill="#FFFFFF" />
    </svg>
  );
}

export interface WordmarkProps {
  /** Altura da tipografia em px (a marca escala junto). */
  height?: number;
  color?: string;
  accent?: string;
  className?: string;
}

/** Wordmark "Talk2Me" com o ícone à esquerda; o "2" no acento. */
export function Wordmark({ height = 28, color = '#191970', accent = '#0E9A8D', className }: WordmarkProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: height * 0.34,
        fontFamily: 'var(--t2m-head)',
        fontWeight: 700,
        fontSize: height,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color,
      }}
    >
      <LogoMark size={height * 1.15} fg={color} accent={accent} />
      <span>
        Talk<span style={{ color: accent }}>2</span>Me
      </span>
    </span>
  );
}
