// screens-shared.jsx — Shared primitives for Talk2Me screens
// Re-uses tokens from ds-tokens.jsx but works standalone too.

// ── Ensure tokens exist when this file loads on its own ───────────────
if (!document.getElementById('t2m-tokens-style')) {
  const css = `
:root {
  --t2m-primary: #191970;
  --t2m-primary-50: #EEEEF7;
  --t2m-primary-100: #D6D6EC;
  --t2m-primary-700: #13135A;
  --t2m-secondary: #0E9A8D;
  --t2m-secondary-600: #0A7D72;
  --t2m-bg: #FAFBFC;
  --t2m-muted: #ECEFF1;
  --t2m-surface: #FFFFFF;
  --t2m-subdued: #F5F7F8;
  --t2m-text: #0F1729;
  --t2m-text-2: #4A5763;
  --t2m-text-3: #7A8794;
  --t2m-text-inv: #FFFFFF;
  --t2m-border: #CFD8DC;
  --t2m-border-strong: #90A4AE;
  --t2m-border-subtle: #E4E9EC;
  --t2m-success: #1E7A53;
  --t2m-success-bg: #E5F4EC;
  --t2m-warning: #A8650F;
  --t2m-warning-bg: #FDF1DA;
  --t2m-error: #B0202F;
  --t2m-error-bg: #FBE7E9;
  --t2m-info: #1A5FB4;
  --t2m-info-bg: #E4EEFB;
  --t2m-focus: 0 0 0 4px rgba(74,74,171,0.35);
  --t2m-shadow-sm: 0 1px 2px rgba(15,23,41,0.08);
  --t2m-shadow-md: 0 4px 12px rgba(15,23,41,0.10);
  --t2m-shadow-lg: 0 12px 32px rgba(15,23,41,0.14);
  --t2m-head: "IBM Plex Sans", system-ui, sans-serif;
  --t2m-body: "IBM Plex Sans", system-ui, sans-serif;
  --t2m-mono: "IBM Plex Mono", ui-monospace, monospace;
}
.t2m { font-family: var(--t2m-body); color: var(--t2m-text); }
.t2m-h { font-family: var(--t2m-head); }
.t2m-mono { font-family: var(--t2m-mono); }
.dc-card *, .dc-card *::before, .dc-card *::after { box-sizing: border-box; }
@keyframes t2m-spin { to { transform: rotate(360deg) } }
@keyframes t2m-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.35 } }
@keyframes t2m-ring { 0% { box-shadow: 0 0 0 0 rgba(176,32,47,0.5) } 100% { box-shadow: 0 0 0 18px rgba(176,32,47,0) } }
@keyframes t2m-wave { 0%,100% { height: 14px } 50% { height: 32px } }
@keyframes t2m-fade-in { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
@keyframes t2m-shimmer { 0% { background-position: -300px 0 } 100% { background-position: 300px 0 } }
`;
  const s = document.createElement('style');
  s.id = 't2m-tokens-style';
  s.textContent = css;
  document.head.appendChild(s);
}

// ── Icon set ─────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = 'currentColor', stroke = 2, style }) => {
  const paths = {
    mic:    <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v4" /></>,
    micOff: <><path d="M9 9v3a3 3 0 0 0 5 2" /><path d="M15 4v3" /><rect x="9" y="2" width="6" height="12" rx="3" fill="none" /><path d="M3 3l18 18" /><path d="M5 11a7 7 0 0 0 11 5.7" /></>,
    cam:    <><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M21 9l-4 3 4 3z" /></>,
    camOff: <><path d="M3 3l18 18" /><path d="M21 9l-4 3 4 3z" /><path d="M17 18H5a2 2 0 0 1-2-2V8" /><path d="M17 6h0a0 0 0 0 1 0 0v8" /></>,
    play:   <><polygon points="6,4 20,12 6,20" fill="currentColor" stroke="none" /></>,
    stop:   <><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" stroke="none" /></>,
    pause:  <><rect x="6" y="5" width="4" height="14" fill="currentColor" stroke="none" /><rect x="14" y="5" width="4" height="14" fill="currentColor" stroke="none" /></>,
    repeat: <><path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
    check:  <><polyline points="5,12 10,17 19,7" /></>,
    x:      <><path d="M6 6l12 12M18 6L6 18" /></>,
    chev:   <><polyline points="9,6 15,12 9,18" /></>,
    chevD:  <><polyline points="6,9 12,15 18,9" /></>,
    chevR:  <><polyline points="9,6 15,12 9,18" /></>,
    chevL:  <><polyline points="15,6 9,12 15,18" /></>,
    info:   <><circle cx="12" cy="12" r="9" /><path d="M12 8v.01" /><path d="M11 12h1v5h1" /></>,
    alert:  <><path d="M12 3l10 18H2z" /><path d="M12 10v4M12 17v.01" /></>,
    user:   <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users:  <><circle cx="9" cy="8" r="4" /><path d="M1 21a8 8 0 0 1 16 0" /><circle cx="17" cy="6" r="3" /><path d="M23 17a6 6 0 0 0-6-6" /></>,
    bell:   <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
    a11y:   <><circle cx="12" cy="5" r="2" /><path d="M3 9h18M9 22l3-9 3 9M12 13V8" /></>,
    hand:   <><path d="M8 10V5a2 2 0 0 1 4 0v5M12 10V4a2 2 0 0 1 4 0v8M16 8a2 2 0 0 1 4 0v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3a2 2 0 0 1 4 0" /></>,
    waves:  <><path d="M2 12h2M7 6v12M12 9v6M17 6v12M22 12h-2" strokeLinecap="round" /></>,
    menu:   <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    home:   <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    list:   <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
    cog:    <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.13-1.32l2.04-1.6-2-3.46-2.4.92a7 7 0 0 0-2.29-1.32l-.36-2.55h-4l-.36 2.55a7 7 0 0 0-2.29 1.32l-2.4-.92-2 3.46 2.04 1.6A7 7 0 0 0 5 12c0 .45.05.89.13 1.32l-2.04 1.6 2 3.46 2.4-.92a7 7 0 0 0 2.29 1.32l.36 2.55h4l.36-2.55a7 7 0 0 0 2.29-1.32l2.4.92 2-3.46-2.04-1.6c.08-.43.13-.87.13-1.32z" /></>,
    plus:   <><path d="M12 5v14M5 12h14" /></>,
    wifi:   <><path d="M2 8a16 16 0 0 1 20 0" /><path d="M5 12a11 11 0 0 1 14 0" /><path d="M8.5 15.5a6 6 0 0 1 7 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></>,
    swap:   <><path d="M7 4l-4 4 4 4" /><path d="M3 8h14a4 4 0 0 1 4 4" /><path d="M17 20l4-4-4-4" /><path d="M21 16H7a4 4 0 0 1-4-4" /></>,
    send:   <><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></>,
    qr:     <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3M21 14v3M14 17v4M17 21h4" /></>,
    card:   <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M2 10h20M6 15h3" /></>,
    bag:    <><path d="M6 8h12l-1 12H7z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    doc:    <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><path d="M8 13h8M8 17h8M8 9h2" /></>,
    money: <><circle cx="12" cy="12" r="9" /><path d="M12 6v12M9 9h4a2 2 0 0 1 0 4h-2a2 2 0 0 0 0 4h4" /></>,
    cancel:<><circle cx="12" cy="12" r="9" /><path d="M4.93 4.93l14.14 14.14" /></>,
    help:  <><circle cx="12" cy="12" r="9" /><path d="M9.1 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17v.01" /></>,
    arrow:  <><path d="M5 12h14M13 5l7 7-7 7" /></>,
    sparkle:<><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="currentColor" stroke="none" /></>,
    print:  <><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></>,
    phone:  <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.9.37 1.78.72 2.6a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.82.35 1.7.59 2.6.72A2 2 0 0 1 22 16.92z" /></>,
    shop:   <><path d="M3 9l1.5-5h15L21 9M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M3 9h18M8 14h8" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
      {paths[name]}
    </svg>
  );
};

// ── Logo mark + wordmark ───────────────────────────────────────────────
const T2MMark = ({ size = 64, fg = '#191970', accent = '#0E9A8D' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Talk2Me">
    <circle cx="32" cy="32" r="29" fill="none" stroke={fg} strokeWidth="3.5" />
    <path d="M 18 22 Q 18 16 24 16 L 30 16 Q 36 16 36 22 L 36 30 Q 36 36 30 36 L 27 36 L 22 41 L 22 36 L 24 36 Q 18 36 18 30 Z" fill={fg} />
    <path d="M 46 42 Q 46 48 40 48 L 34 48 Q 28 48 28 42 L 28 34 Q 28 28 34 28 L 37 28 L 42 23 L 42 28 L 40 28 Q 46 28 46 34 Z" fill={accent} opacity="0.9" />
    <circle cx="32" cy="32" r="2.4" fill="#FFFFFF" />
  </svg>
);

const T2MWordmark = ({ height = 28, color = '#191970', accent = '#0E9A8D' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: height * 0.34,
    fontFamily: 'var(--t2m-head)', fontWeight: 700,
    fontSize: height, lineHeight: 1, letterSpacing: '-0.02em',
    color,
  }}>
    <T2MMark size={height * 1.15} fg={color} accent={accent} />
    <span>Talk<span style={{ color: accent }}>2</span>Me</span>
  </div>
);

// ── Button (compact reuse) ────────────────────────────────────────────
const Btn = ({
  variant = 'primary', size = 'md', icon, iconRight, iconOnly,
  loading, disabled, children, full, style, ...rest
}) => {
  const sizes = {
    sm: { h: 36, px: 14, fs: 14, gap: 8, ic: 16 },
    md: { h: 44, px: 18, fs: 15, gap: 10, ic: 18 },
    lg: { h: 52, px: 24, fs: 16, gap: 12, ic: 20 },
    xl: { h: 64, px: 32, fs: 18, gap: 14, ic: 22 },
    xxl: { h: 88, px: 40, fs: 22, gap: 16, ic: 28 },
  };
  const s = sizes[size];
  const palettes = {
    primary:   { bg: '#191970', fg: '#FFFFFF', bd: '#191970' },
    secondary: { bg: '#0E9A8D', fg: '#FFFFFF', bd: '#0E9A8D' },
    outline:   { bg: 'transparent', fg: '#191970', bd: '#191970' },
    ghost:     { bg: 'transparent', fg: '#191970', bd: 'transparent' },
    danger:    { bg: '#B0202F', fg: '#FFFFFF', bd: '#B0202F' },
    light:     { bg: '#FFFFFF', fg: '#191970', bd: 'transparent' },
  };
  const p = palettes[variant];
  return (
    <button {...rest} disabled={disabled} style={{
      height: s.h, padding: iconOnly ? 0 : `0 ${s.px}px`,
      width: iconOnly ? s.h : (full ? '100%' : 'auto'),
      background: disabled ? '#ECEFF1' : p.bg, color: disabled ? '#90A4AE' : p.fg,
      border: `1.5px solid ${disabled ? '#CFD8DC' : p.bd}`, borderRadius: 10,
      fontSize: s.fs, fontWeight: 600, fontFamily: 'var(--t2m-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap,
      transition: 'all 120ms cubic-bezier(0.2,0,0.2,1)',
      ...style,
    }}
    onMouseEnter={(e) => { if (!disabled && p.bg !== 'transparent') e.currentTarget.style.filter = 'brightness(0.92)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
    >
      {loading ? <Spinner size={s.ic} color={p.fg} /> : icon && <Icon name={icon} size={s.ic} stroke={2.2} />}
      {!iconOnly && children}
      {iconRight && <Icon name={iconRight} size={s.ic} stroke={2.2} />}
    </button>
  );
};

const Spinner = ({ size = 18, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: 't2m-spin 0.8s linear infinite' }}>
    <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="3" strokeDasharray="14 28" strokeLinecap="round" opacity="0.9" />
  </svg>
);

const PulseDot = ({ color = '#B0202F', size = 12 }) => (
  <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: color, boxShadow: `0 0 0 0 ${color}88`,
    animation: 't2m-ring 1.6s infinite',
  }} />
);

const Pill = ({ children, tone = 'default', style }) => {
  const tones = {
    default: { bg: '#ECEFF1', fg: '#4A5763' },
    brand:   { bg: '#EEEEF7', fg: '#191970' },
    accent:  { bg: '#E6F7F5', fg: '#0A7D72' },
    success: { bg: '#E5F4EC', fg: '#1E7A53' },
    warning: { bg: '#FDF1DA', fg: '#A8650F' },
    error:   { bg: '#FBE7E9', fg: '#B0202F' },
    info:    { bg: '#E4EEFB', fg: '#1A5FB4' },
    dark:    { bg: 'rgba(255,255,255,0.16)', fg: '#FFFFFF' },
  };
  const c = tones[tone] || tones.default;
  return (
    <span className="t2m-mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999, fontSize: 11,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      fontWeight: 600, background: c.bg, color: c.fg, ...style,
    }}>{children}</span>
  );
};

// ── Cross-artboard event bus: attendant <-> client live linking ─────
window.__T2M_BUS = window.__T2M_BUS || (() => {
  const subs = new Set();
  let state = {
    question: null,             // { id, text, options: [{id,label,icon}] }
    clientAnswer: null,         // { questionId, value }
    history: [],                // [{ side: 'att'|'cli', text, time, kind }]
    clientRecording: false,
    librasText: null,           // text recognized from client signs
  };
  return {
    get: () => state,
    set: (patch) => { state = { ...state, ...patch }; subs.forEach(fn => fn(state)); },
    sub: (fn) => { subs.add(fn); fn(state); return () => subs.delete(fn); },
    reset: () => { state = { question: null, clientAnswer: null, history: [], clientRecording: false, librasText: null }; subs.forEach(fn => fn(state)); },
  };
})();

const useBus = () => {
  const [s, setS] = React.useState(window.__T2M_BUS.get());
  React.useEffect(() => window.__T2M_BUS.sub(setS), []);
  return [s, window.__T2M_BUS.set, window.__T2M_BUS.reset];
};

// ── Quick action catalog (shared between att + client) ──
const QUICK_ACTIONS = [
  { id: 'cpf',     text: 'CPF na nota?',           icon: 'doc',    options: [{ id: 'sim', label: 'Sim', icon: 'check' }, { id: 'nao', label: 'Não', icon: 'x' }] },
  { id: 'pay',     text: 'Crédito ou débito?',     icon: 'card',   options: [{ id: 'cred', label: 'Crédito', icon: 'card' }, { id: 'deb', label: 'Débito', icon: 'card' }] },
  { id: 'bag',     text: 'Aceita sacola?',         icon: 'bag',    options: [{ id: 'sim', label: 'Sim', icon: 'check' }, { id: 'nao', label: 'Não', icon: 'x' }] },
  { id: 'help',    text: 'Precisa de ajuda?',      icon: 'help',   options: [{ id: 'sim', label: 'Sim, preciso', icon: 'check' }, { id: 'nao', label: 'Não, obrigado', icon: 'x' }] },
  { id: 'cancel',  text: 'Deseja cancelar?',       icon: 'cancel', options: [{ id: 'sim', label: 'Sim', icon: 'check' }, { id: 'nao', label: 'Não', icon: 'x' }] },
  { id: 'value',   text: 'Confirmar valor R$ 87,40?', icon: 'money', options: [{ id: 'sim', label: 'Sim, confirmo', icon: 'check' }, { id: 'nao', label: 'Não', icon: 'x' }] },
  { id: 'receipt', text: 'Comprovante?',           icon: 'print',  options: [{ id: 'imp', label: 'Impresso', icon: 'print' }, { id: 'dig', label: 'Digital', icon: 'phone' }] },
  { id: 'paymethod', text: 'Forma de pagamento?',  icon: 'money',  options: [{ id: 'pix', label: 'PIX', icon: 'sparkle' }, { id: 'card', label: 'Cartão', icon: 'card' }, { id: 'din', label: 'Dinheiro', icon: 'money' }] },
];

Object.assign(window, {
  Icon, T2MMark, T2MWordmark, Btn, Spinner, PulseDot, Pill,
  useBus, QUICK_ACTIONS,
});
