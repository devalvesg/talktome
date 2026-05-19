// ds-tokens.jsx — Shared design tokens for Talk2Me

const T2M_TOKENS = {
  // ── Color ────────────────────────────────────────────────────────────────
  color: {
    brand: {
      primary: '#191970',       // Midnight Blue — base
      primary50: '#EEEEF7',
      primary100: '#D6D6EC',
      primary200: '#ADADD9',
      primary300: '#7A7AC2',
      primary400: '#4A4AAB',
      primary500: '#2E2E8C',
      primary600: '#191970',    // base
      primary700: '#13135A',
      primary800: '#0D0D42',
      primary900: '#08082B',
      secondary: '#0E9A8D',     // Teal — action accent
      secondary50: '#E6F7F5',
      secondary100: '#B8E7E2',
      secondary500: '#0E9A8D',
      secondary600: '#0A7D72',
      secondary700: '#076058',
    },
    background: {
      default: '#FAFBFC',
      muted: '#ECEFF1',         // base gray
      inverse: '#0A0A2D',
    },
    surface: {
      default: '#FFFFFF',
      elevated: '#FFFFFF',
      subdued: '#F5F7F8',
    },
    text: {
      primary: '#0F1729',
      secondary: '#4A5763',
      tertiary: '#7A8794',
      inverse: '#FFFFFF',
      brand: '#191970',
      link: '#13135A',
    },
    border: {
      default: '#CFD8DC',
      strong: '#90A4AE',
      subtle: '#E4E9EC',
      brand: '#191970',
    },
    feedback: {
      success: '#1E7A53',
      successBg: '#E5F4EC',
      warning: '#A8650F',
      warningBg: '#FDF1DA',
      error: '#B0202F',
      errorBg: '#FBE7E9',
      info: '#1A5FB4',
      infoBg: '#E4EEFB',
    },
    state: {
      hover: 'rgba(25,25,112,0.08)',
      active: 'rgba(25,25,112,0.16)',
      focus: '#4A4AAB',
      focusRing: 'rgba(74,74,171,0.35)',
      disabled: '#CFD8DC',
      disabledText: '#90A4AE',
    },
  },
  // ── Typography ──────────────────────────────────────────────────────────
  type: {
    families: {
      institutional: {
        heading: '"IBM Plex Sans", system-ui, sans-serif',
        body: '"IBM Plex Sans", system-ui, sans-serif',
        mono: '"IBM Plex Mono", ui-monospace, monospace',
      },
      tech: {
        heading: '"Space Grotesk", system-ui, sans-serif',
        body: '"Manrope", system-ui, sans-serif',
        mono: '"JetBrains Mono", ui-monospace, monospace',
      },
      humane: {
        heading: '"Lexend", system-ui, sans-serif',
        body: '"Atkinson Hyperlegible", system-ui, sans-serif',
        mono: '"IBM Plex Mono", ui-monospace, monospace',
      },
    },
    size: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '22px',
      '2xl': '28px',
      '3xl': '36px',
      '4xl': '48px',
    },
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.7 },
  },
  // ── Spacing (4px base) ──────────────────────────────────────────────────
  spacing: {
    1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px', 6: '24px',
    7: '32px', 8: '40px', 9: '48px', 10: '64px', 11: '80px', 12: '96px',
  },
  // ── Radius ──────────────────────────────────────────────────────────────
  radius: { sm: '4px', md: '8px', lg: '12px', xl: '20px', full: '9999px' },
  // ── Shadow ──────────────────────────────────────────────────────────────
  shadow: {
    sm: '0 1px 2px rgba(15,23,41,0.08)',
    md: '0 4px 12px rgba(15,23,41,0.10)',
    lg: '0 12px 32px rgba(15,23,41,0.14)',
    focus: '0 0 0 4px rgba(74,74,171,0.35)',
  },
  // ── Motion ──────────────────────────────────────────────────────────────
  motion: {
    duration: { fast: '120ms', normal: '220ms', slow: '360ms' },
    easing: {
      default: 'cubic-bezier(0.2, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
    },
  },
};

window.T2M_TOKENS = T2M_TOKENS;

// ── Shared style helpers ────────────────────────────────────────────────
const t2mCss = `
:root {
  --t2m-primary: ${T2M_TOKENS.color.brand.primary};
  --t2m-primary-50: ${T2M_TOKENS.color.brand.primary50};
  --t2m-primary-100: ${T2M_TOKENS.color.brand.primary100};
  --t2m-primary-700: ${T2M_TOKENS.color.brand.primary700};
  --t2m-secondary: ${T2M_TOKENS.color.brand.secondary};
  --t2m-secondary-600: ${T2M_TOKENS.color.brand.secondary600};
  --t2m-bg: ${T2M_TOKENS.color.background.default};
  --t2m-muted: ${T2M_TOKENS.color.background.muted};
  --t2m-surface: ${T2M_TOKENS.color.surface.default};
  --t2m-subdued: ${T2M_TOKENS.color.surface.subdued};
  --t2m-text: ${T2M_TOKENS.color.text.primary};
  --t2m-text-2: ${T2M_TOKENS.color.text.secondary};
  --t2m-text-3: ${T2M_TOKENS.color.text.tertiary};
  --t2m-text-inv: ${T2M_TOKENS.color.text.inverse};
  --t2m-border: ${T2M_TOKENS.color.border.default};
  --t2m-border-strong: ${T2M_TOKENS.color.border.strong};
  --t2m-border-subtle: ${T2M_TOKENS.color.border.subtle};
  --t2m-success: ${T2M_TOKENS.color.feedback.success};
  --t2m-success-bg: ${T2M_TOKENS.color.feedback.successBg};
  --t2m-warning: ${T2M_TOKENS.color.feedback.warning};
  --t2m-warning-bg: ${T2M_TOKENS.color.feedback.warningBg};
  --t2m-error: ${T2M_TOKENS.color.feedback.error};
  --t2m-error-bg: ${T2M_TOKENS.color.feedback.errorBg};
  --t2m-info: ${T2M_TOKENS.color.feedback.info};
  --t2m-info-bg: ${T2M_TOKENS.color.feedback.infoBg};
  --t2m-focus: ${T2M_TOKENS.shadow.focus};
  --t2m-shadow-sm: ${T2M_TOKENS.shadow.sm};
  --t2m-shadow-md: ${T2M_TOKENS.shadow.md};
  --t2m-shadow-lg: ${T2M_TOKENS.shadow.lg};
  --t2m-head: "IBM Plex Sans", system-ui, sans-serif;
  --t2m-body: "IBM Plex Sans", system-ui, sans-serif;
  --t2m-mono: "IBM Plex Mono", ui-monospace, monospace;
}
.t2m { font-family: var(--t2m-body); color: var(--t2m-text); }
.t2m-h { font-family: var(--t2m-head); }
.t2m-mono { font-family: var(--t2m-mono); }
/* Every artboard root respects its parent frame */
.dc-card > div { box-sizing: border-box; }
.dc-card *, .dc-card *::before, .dc-card *::after { box-sizing: border-box; }
`;

const styleEl = document.createElement('style');
styleEl.id = 't2m-tokens-style';
styleEl.textContent = t2mCss;
document.head.appendChild(styleEl);

// ── Reusable presentational primitives used across sections ─────────────
const SectionHeading = ({ kicker, title, sub, children }) => (
  <div style={{ padding: '12px 4px 24px', maxWidth: 720 }}>
    {kicker && (
      <div className="t2m-mono" style={{
        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--t2m-text-3)', marginBottom: 8,
      }}>{kicker}</div>
    )}
    <h2 className="t2m-h" style={{
      fontSize: 32, fontWeight: 600, lineHeight: 1.15, margin: 0,
      color: 'var(--t2m-text)', letterSpacing: '-0.01em',
    }}>{title}</h2>
    {sub && (
      <p style={{
        fontSize: 16, lineHeight: 1.55, color: 'var(--t2m-text-2)',
        margin: '12px 0 0', maxWidth: 640,
      }}>{sub}</p>
    )}
    {children}
  </div>
);

const Pill = ({ children, tone = 'default' }) => {
  const tones = {
    default: { bg: 'var(--t2m-muted)', fg: 'var(--t2m-text-2)' },
    brand: { bg: 'var(--t2m-primary-50)', fg: 'var(--t2m-primary)' },
    success: { bg: 'var(--t2m-success-bg)', fg: 'var(--t2m-success)' },
    warning: { bg: 'var(--t2m-warning-bg)', fg: 'var(--t2m-warning)' },
    error: { bg: 'var(--t2m-error-bg)', fg: 'var(--t2m-error)' },
    info: { bg: 'var(--t2m-info-bg)', fg: 'var(--t2m-info)' },
  };
  const c = tones[tone] || tones.default;
  return (
    <span className="t2m-mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 8px', borderRadius: 999, fontSize: 11,
      letterSpacing: '0.04em', textTransform: 'uppercase',
      fontWeight: 600, background: c.bg, color: c.fg,
    }}>{children}</span>
  );
};

const Card = ({ children, style, ...rest }) => (
  <div {...rest} style={{
    background: 'var(--t2m-surface)',
    border: '1px solid var(--t2m-border-subtle)',
    borderRadius: 12, padding: 20,
    boxShadow: 'var(--t2m-shadow-sm)',
    ...style,
  }}>{children}</div>
);

const Divider = ({ label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'var(--t2m-border-subtle)' }} />
    {label && (
      <span className="t2m-mono" style={{
        fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--t2m-text-3)',
      }}>{label}</span>
    )}
    <div style={{ flex: 1, height: 1, background: 'var(--t2m-border-subtle)' }} />
  </div>
);

Object.assign(window, { SectionHeading, Pill, Card, Divider });
