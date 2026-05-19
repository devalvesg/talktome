// ds-section-components.jsx — Buttons, inputs, cards, header, nav, feedback

// ── Inline icon set ───────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = 'currentColor', stroke = 2 }) => {
  const paths = {
    mic:    <><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v4" /></>,
    micOff: <><path d="M9 9v3a3 3 0 0 0 5 2" /><path d="M15 4v3" /><rect x="9" y="2" width="6" height="12" rx="3" fill="none" /><path d="M3 3l18 18" /><path d="M5 11a7 7 0 0 0 11 5.7" /></>,
    cam:    <><rect x="3" y="6" width="14" height="12" rx="2" /><path d="M21 9l-4 3 4 3z" /></>,
    play:   <><polygon points="6,4 20,12 6,20" fill="currentColor" stroke="none" /></>,
    stop:   <><rect x="5" y="5" width="14" height="14" rx="2" fill="currentColor" stroke="none" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
    check:  <><polyline points="5,12 10,17 19,7" /></>,
    x:      <><path d="M6 6l12 12M18 6L6 18" /></>,
    chev:   <><polyline points="9,6 15,12 9,18" /></>,
    chevD:  <><polyline points="6,9 12,15 18,9" /></>,
    info:   <><circle cx="12" cy="12" r="9" /><path d="M12 8v.01" /><path d="M11 12h1v5h1" /></>,
    alert:  <><path d="M12 3l10 18H2z" /><path d="M12 10v4M12 17v.01" /></>,
    user:   <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    bell:   <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
    a11y:   <><circle cx="12" cy="5" r="2" /><path d="M3 9h18M9 22l3-9 3 9M12 13V8" /></>,
    hand:   <><path d="M8 10V5a2 2 0 0 1 4 0v5M12 10V4a2 2 0 0 1 4 0v8M16 8a2 2 0 0 1 4 0v8a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-3a2 2 0 0 1 4 0" /></>,
    waves:  <><path d="M4 12h2M9 6v12M14 9v6M19 12h1M2 12h1" /></>,
    menu:   <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    home:   <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    list:   <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
    cog:    <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.13-1.32l2.04-1.6-2-3.46-2.4.92a7 7 0 0 0-2.29-1.32l-.36-2.55h-4l-.36 2.55a7 7 0 0 0-2.29 1.32l-2.4-.92-2 3.46 2.04 1.6A7 7 0 0 0 5 12c0 .45.05.89.13 1.32l-2.04 1.6 2 3.46 2.4-.92a7 7 0 0 0 2.29 1.32l.36 2.55h4l.36-2.55a7 7 0 0 0 2.29-1.32l2.4.92 2-3.46-2.04-1.6c.08-.43.13-.87.13-1.32z" /></>,
    plus:   <><path d="M12 5v14M5 12h14" /></>,
    wifi:   <><path d="M2 8a16 16 0 0 1 20 0" /><path d="M5 12a11 11 0 0 1 14 0" /><path d="M8.5 15.5a6 6 0 0 1 7 0" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /></>,
    swap:   <><path d="M7 4l-4 4 4 4" /><path d="M3 8h14a4 4 0 0 1 4 4" /><path d="M17 20l4-4-4-4" /><path d="M21 16H7a4 4 0 0 1-4-4" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
};
window.Icon = Icon;

// ── Button ────────────────────────────────────────────────────────────
const Btn = ({
  variant = 'primary', size = 'md', icon, iconOnly,
  state, loading, disabled, children, full, style, ...rest
}) => {
  const sizes = {
    sm: { h: 36, px: 14, fs: 14, gap: 8, ic: 16 },
    md: { h: 44, px: 18, fs: 15, gap: 10, ic: 18 },
    lg: { h: 52, px: 24, fs: 16, gap: 12, ic: 20 },
    xl: { h: 64, px: 32, fs: 18, gap: 14, ic: 22 },
  };
  const s = sizes[size];
  const palettes = {
    primary:   { bg: '#191970', fg: '#FFFFFF', bd: '#191970' },
    secondary: { bg: '#0E9A8D', fg: '#FFFFFF', bd: '#0E9A8D' },
    outline:   { bg: 'transparent', fg: '#191970', bd: '#191970' },
    ghost:     { bg: 'transparent', fg: '#191970', bd: 'transparent' },
    danger:    { bg: '#B0202F', fg: '#FFFFFF', bd: '#B0202F' },
  };
  let p = palettes[variant];
  if (state === 'hover') p = { ...p, bg: variant === 'outline' || variant === 'ghost' ? 'rgba(25,25,112,0.08)' : shade(p.bg, -10) };
  if (state === 'active') p = { ...p, bg: variant === 'outline' || variant === 'ghost' ? 'rgba(25,25,112,0.16)' : shade(p.bg, -18) };
  if (disabled) p = { bg: variant === 'outline' || variant === 'ghost' ? 'transparent' : '#ECEFF1', fg: '#90A4AE', bd: variant === 'ghost' ? 'transparent' : '#CFD8DC' };

  return (
    <button {...rest} disabled={disabled} style={{
      height: s.h, padding: iconOnly ? 0 : `0 ${s.px}px`,
      width: iconOnly ? s.h : (full ? '100%' : 'auto'),
      background: p.bg, color: p.fg, border: `1.5px solid ${p.bd}`,
      borderRadius: 8, fontSize: s.fs, fontWeight: 600,
      fontFamily: 'var(--t2m-body)', cursor: disabled ? 'not-allowed' : 'pointer',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: s.gap,
      transition: 'all 120ms cubic-bezier(0.2,0,0.2,1)',
      boxShadow: state === 'focus' ? 'var(--t2m-focus)' : 'none',
      outline: state === 'focus' ? '2px solid #4A4AAB' : 'none',
      ...style,
    }}>
      {loading ? <Spinner size={s.ic} color={p.fg} /> : icon && <Icon name={icon} size={s.ic} stroke={2.2} />}
      {!iconOnly && children}
    </button>
  );
};
const Spinner = ({ size = 18, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{
    animation: 't2m-spin 0.8s linear infinite',
  }}>
    <circle cx="12" cy="12" r="9" fill="none" stroke={color} strokeWidth="3" strokeDasharray="14 28" strokeLinecap="round" opacity="0.9" />
  </svg>
);
function shade(hex, pct) {
  if (!hex.startsWith('#')) return hex;
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + Math.round(255 * pct / 100);
  let g = ((num >> 8) & 0xff) + Math.round(255 * pct / 100);
  let b = (num & 0xff) + Math.round(255 * pct / 100);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
window.Btn = Btn;
window.Spinner = Spinner;

// Inject spin animation
if (!document.getElementById('t2m-anims')) {
  const s = document.createElement('style');
  s.id = 't2m-anims';
  s.textContent = `
    @keyframes t2m-spin { to { transform: rotate(360deg) } }
    @keyframes t2m-pulse { 0%,100% { opacity: 1 } 50% { opacity: 0.4 } }
    @keyframes t2m-ring { 0% { box-shadow: 0 0 0 0 rgba(176,32,47,0.5) } 100% { box-shadow: 0 0 0 16px rgba(176,32,47,0) } }
    @keyframes t2m-wave { 0%,100% { height: 14px } 50% { height: 32px } }
    @keyframes t2m-skel { 0% { background-position: -300px 0 } 100% { background-position: 300px 0 } }
  `;
  document.head.appendChild(s);
}

// ════════════════════════════════════════════════════════════════════════
// Buttons artboard
// ════════════════════════════════════════════════════════════════════════
const ButtonsArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="08 · Componentes"
      title="Botões"
      sub="Cinco variantes, quatro tamanhos. Altura mínima 44px (recomendação WCAG para alvos de toque). Estados sempre visíveis."
    />

    {/* Variants */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Variantes</h3>
    <Card style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
      <Btn variant="primary">Iniciar conversão</Btn>
      <Btn variant="secondary">Confirmar</Btn>
      <Btn variant="outline">Cancelar</Btn>
      <Btn variant="ghost">Saiba mais</Btn>
      <Btn variant="danger" icon="x">Parar</Btn>
    </Card>

    {/* States */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Estados · primary</h3>
    <Card style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
      <Btn variant="primary">Default</Btn>
      <Btn variant="primary" state="hover">Hover</Btn>
      <Btn variant="primary" state="active">Active</Btn>
      <Btn variant="primary" state="focus">Focus</Btn>
      <Btn variant="primary" disabled>Disabled</Btn>
      <Btn variant="primary" loading>Carregando</Btn>
    </Card>

    {/* Sizes */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Tamanhos</h3>
    <Card style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
      <Btn variant="primary" size="sm">Small</Btn>
      <Btn variant="primary" size="md">Medium</Btn>
      <Btn variant="primary" size="lg">Large</Btn>
      <Btn variant="primary" size="xl">Extra · totem</Btn>
    </Card>

    {/* Icon */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Com ícone · só ícone</h3>
    <Card style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
      <Btn variant="primary" icon="mic">Microfone</Btn>
      <Btn variant="secondary" icon="hand">Libras</Btn>
      <Btn variant="outline" icon="cog">Configurar</Btn>
      <Btn variant="ghost" icon="info">Ajuda</Btn>
      <div style={{ width: 1, height: 32, background: 'var(--t2m-border-subtle)', margin: '0 4px' }} />
      <Btn variant="primary" iconOnly icon="mic" aria-label="Microfone" />
      <Btn variant="secondary" iconOnly icon="cam" aria-label="Câmera" />
      <Btn variant="outline" iconOnly icon="x" aria-label="Fechar" />
      <Btn variant="danger" iconOnly icon="stop" aria-label="Parar" />
    </Card>

    <div style={{ display: 'flex', gap: 12 }}>
      <Btn variant="primary" size="xl" icon="play" full>Iniciar conversão agora</Btn>
    </div>
    <p style={{ fontSize: 12, color: 'var(--t2m-text-3)', marginTop: 8 }}>
      O <strong>botão XL</strong> é o padrão para CTAs em totens e telas de balcão — toque luvado, distância de 60–90 cm.
    </p>
  </div>
);

// ════════════════════════════════════════════════════════════════════════
// Inputs artboard
// ════════════════════════════════════════════════════════════════════════
const Field = ({ label, hint, error, success, icon, type = 'text', value, placeholder, disabled, state, area }) => {
  let borderColor = 'var(--t2m-border)';
  let bg = 'var(--t2m-surface)';
  let shadow = 'none';
  if (state === 'focus') { borderColor = 'var(--t2m-primary)'; shadow = 'var(--t2m-focus)'; }
  if (error) borderColor = 'var(--t2m-error)';
  if (success) borderColor = 'var(--t2m-success)';
  if (disabled) { bg = 'var(--t2m-muted)'; borderColor = 'var(--t2m-border)'; }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--t2m-text)' }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: area ? 'auto' : 44, padding: area ? '12px 14px' : '0 14px',
        background: bg, border: `1.5px solid ${borderColor}`,
        borderRadius: 8, boxShadow: shadow,
        color: disabled ? 'var(--t2m-text-3)' : 'var(--t2m-text)',
      }}>
        {icon && <Icon name={icon} size={18} color="var(--t2m-text-3)" />}
        {area ? (
          <div style={{ flex: 1, fontSize: 14, lineHeight: 1.5, minHeight: 64, color: value ? 'inherit' : 'var(--t2m-text-3)' }}>
            {value || placeholder}
          </div>
        ) : (
          <div style={{ flex: 1, fontSize: 14, color: value ? 'inherit' : 'var(--t2m-text-3)' }}>
            {value || placeholder}
          </div>
        )}
        {success && <Icon name="check" size={18} color="var(--t2m-success)" />}
        {type === 'select' && <Icon name="chevD" size={16} color="var(--t2m-text-3)" />}
      </div>
      {(hint || error) && (
        <div style={{
          fontSize: 12, color: error ? 'var(--t2m-error)' : 'var(--t2m-text-2)',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          {error && <Icon name="alert" size={12} />}
          {error || hint}
        </div>
      )}
    </div>
  );
};
window.Field = Field;

const InputsArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="09 · Componentes"
      title="Inputs"
      sub="Campos com altura 44px, ícone à esquerda quando ajuda a identificação, sempre com label visível."
    />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
      <Card style={{ display: 'grid', gap: 16 }}>
        <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>TEXT · SEARCH · SELECT</div>
        <Field label="Nome do atendente" placeholder="Ex.: Maria Silva" />
        <Field label="Buscar produto" placeholder="Digite um nome ou código" icon="search" />
        <Field label="Idioma de fala" value="Português (BR)" type="select" />
      </Card>
      <Card style={{ display: 'grid', gap: 16 }}>
        <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>TEXTAREA · ICON · DISABLED</div>
        <Field label="Mensagem rápida" placeholder="Digite o que quer dizer ao cliente surdo…" area />
        <Field label="Email da unidade" value="balcao.savassi@super.com.br" type="email" icon="user" />
        <Field label="Código (bloqueado)" value="SM-3294-AT" disabled />
      </Card>
    </div>

    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Estados</h3>
    <Card style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <Field label="Default" placeholder="Texto aqui…" />
      <Field label="Focus" placeholder="Texto aqui…" state="focus" value="Digitando" />
      <Field label="Success" value="Conexão verificada" success hint="Pronto para iniciar." icon="wifi" />
      <Field label="Error" value="senha-curta" error="Mínimo 8 caracteres." icon="user" />
    </Card>
  </div>
);

// ════════════════════════════════════════════════════════════════════════
// Cards artboard
// ════════════════════════════════════════════════════════════════════════
const CardsArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="10 · Componentes"
      title="Cards"
      sub="Cards são unidades de informação ou ação. Devem ter um título claro e, no máximo, uma ação primária."
    />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
      {/* Informativo */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{
          height: 120, background: 'linear-gradient(135deg, #191970 0%, #2E2E8C 100%)',
          display: 'grid', placeItems: 'center', color: '#fff',
        }}><Icon name="hand" size={56} color="#fff" stroke={1.6} /></div>
        <div style={{ padding: 20 }}>
          <Pill tone="brand">Informativo</Pill>
          <h4 className="t2m-h" style={{ margin: '10px 0 6px', fontSize: 18, fontWeight: 600 }}>O que é Libras?</h4>
          <p style={{ fontSize: 13, color: 'var(--t2m-text-2)', margin: 0, lineHeight: 1.55 }}>
            Língua Brasileira de Sinais. Reconhecida por lei, é a língua materna de aproximadamente 2.3 milhões de brasileiros.
          </p>
          <div style={{ marginTop: 14 }}><Btn variant="ghost" size="sm" icon="chev">Ler mais</Btn></div>
        </div>
      </Card>

      {/* Funcionalidade */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'var(--t2m-secondary)', color: '#fff',
            display: 'grid', placeItems: 'center',
          }}><Icon name="swap" size={22} color="#fff" /></div>
          <div>
            <Pill>Funcionalidade</Pill>
            <h4 className="t2m-h" style={{ margin: '4px 0 0', fontSize: 17, fontWeight: 600 }}>Tradução bidirecional</h4>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--t2m-text-2)', margin: '0 0 14px', lineHeight: 1.55 }}>
          Áudio do atendente vira Libras no avatar. Sinais do cliente surdo viram texto e voz para o atendente. Em tempo real.
        </p>
        <Btn variant="primary" size="sm" full>Ativar tradução</Btn>
      </Card>

      {/* Status */}
      <Card style={{ borderLeft: '4px solid var(--t2m-success)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Pill tone="success">Online</Pill>
            <h4 className="t2m-h" style={{ margin: '8px 0 4px', fontSize: 17, fontWeight: 600 }}>Balcão 03 · Padaria</h4>
            <div style={{ fontSize: 12, color: 'var(--t2m-text-2)' }}>Iniciado às 08:12 · Conversão ativa</div>
          </div>
          <div style={{
            width: 12, height: 12, borderRadius: '50%', background: 'var(--t2m-success)',
            boxShadow: '0 0 0 4px rgba(30,122,83,0.2)', animation: 't2m-pulse 1.8s infinite',
          }} />
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--t2m-border-subtle)' }}>
          {[['Conversões', '24'], ['Tempo médio', '1m 42s'], ['Satisfação', '4.8']].map(([l, v]) => (
            <div key={l} style={{ flex: 1 }}>
              <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>{l}</div>
              <div className="t2m-h" style={{ fontSize: 20, fontWeight: 600, color: 'var(--t2m-primary)' }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Alerta */}
      <Card style={{ borderLeft: '4px solid var(--t2m-warning)', background: 'var(--t2m-warning-bg)' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <Icon name="alert" size={24} color="var(--t2m-warning)" />
          <div style={{ flex: 1 }}>
            <Pill tone="warning">Atenção</Pill>
            <h4 className="t2m-h" style={{ margin: '8px 0 4px', fontSize: 17, fontWeight: 600 }}>Câmera com pouca luz</h4>
            <p style={{ fontSize: 13, color: 'var(--t2m-text-2)', margin: 0, lineHeight: 1.5 }}>
              O reconhecimento de sinais pode ficar impreciso. Acenda mais luz no balcão ou aproxime o cliente da tela.
            </p>
          </div>
        </div>
      </Card>
    </div>

    {/* History conversion card */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Histórico de conversões</h3>
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      {[
        ['Hoje · 14:32', 'Cliente perguntou onde fica o açougue', 'Áudio → Libras', '1m 12s'],
        ['Hoje · 11:08', 'Pedido de troca de produto sem nota', 'Libras → Áudio', '3m 04s'],
        ['Ontem · 19:44', 'Dúvida sobre validade do leite', 'Áudio → Libras', '42s'],
      ].map(([when, summary, dir, dur], i) => (
        <div key={i} style={{
          display: 'grid', gridTemplateColumns: '140px 1fr 160px 80px',
          gap: 16, padding: '14px 20px', alignItems: 'center',
          borderTop: i === 0 ? 'none' : '1px solid var(--t2m-border-subtle)',
        }}>
          <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>{when}</div>
          <div style={{ fontSize: 14, color: 'var(--t2m-text)' }}>{summary}</div>
          <div><Pill tone={dir.startsWith('Áudio') ? 'brand' : 'info'}>{dir}</Pill></div>
          <div className="t2m-mono" style={{ fontSize: 12, color: 'var(--t2m-text-2)', textAlign: 'right' }}>{dur}</div>
        </div>
      ))}
    </Card>
  </div>
);

// ════════════════════════════════════════════════════════════════════════
// Header / Topbar artboard
// ════════════════════════════════════════════════════════════════════════
const HeaderArtboard = () => {
  const DesktopHeader = () => (
    <div style={{
      height: 64, background: 'var(--t2m-surface)',
      borderBottom: '1px solid var(--t2m-border-subtle)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 24,
    }}>
      <T2MWordmark height={26} />
      <div style={{ flex: 1, display: 'flex', gap: 4, marginLeft: 24 }}>
        {['Conversão', 'Histórico', 'Relatórios', 'Equipe'].map((l, i) => (
          <div key={l} style={{
            padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600,
            color: i === 0 ? 'var(--t2m-primary)' : 'var(--t2m-text-2)',
            background: i === 0 ? 'var(--t2m-primary-50)' : 'transparent',
          }}>{l}</div>
        ))}
      </div>
      <div style={{ flex: '0 0 280px' }}>
        <Field placeholder="Buscar produto, atendente…" icon="search" />
      </div>
      <Btn variant="outline" size="sm" icon="a11y">Acessibilidade</Btn>
      <Btn variant="ghost" iconOnly icon="bell" aria-label="Notificações" />
      <div style={{
        width: 36, height: 36, borderRadius: '50%', background: 'var(--t2m-primary)',
        color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: 14,
      }}>MS</div>
    </div>
  );

  const MobileHeader = () => (
    <div style={{
      height: 56, background: 'var(--t2m-surface)',
      borderBottom: '1px solid var(--t2m-border-subtle)',
      display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12,
    }}>
      <Btn variant="ghost" iconOnly icon="menu" size="sm" aria-label="Menu" />
      <T2MWordmark height={22} />
      <div style={{ flex: 1 }} />
      <Btn variant="outline" size="sm" iconOnly icon="a11y" aria-label="Acessibilidade" />
      <Btn variant="ghost" iconOnly icon="bell" size="sm" aria-label="Notificações" />
    </div>
  );

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="11 · Componentes"
        title="Header / Topbar"
        sub="Logo à esquerda, navegação ao meio, ações à direita. O botão de acessibilidade fica sempre visível."
      />
      <Pill tone="brand">Desktop · dashboard</Pill>
      <div style={{ marginTop: 10, marginBottom: 24, border: '1px solid var(--t2m-border-subtle)', borderRadius: 12, overflow: 'hidden' }}>
        <DesktopHeader />
      </div>
      <Pill tone="brand">Mobile · tablet de balcão</Pill>
      <div style={{ marginTop: 10, border: '1px solid var(--t2m-border-subtle)', borderRadius: 12, overflow: 'hidden', maxWidth: 420 }}>
        <MobileHeader />
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════
// Navigation artboard
// ════════════════════════════════════════════════════════════════════════
const NavArtboard = () => {
  const items = [
    { i: 'home', l: 'Conversão', active: true },
    { i: 'list', l: 'Histórico' },
    { i: 'user', l: 'Equipe' },
    { i: 'cog', l: 'Ajustes' },
  ];

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="12 · Componentes"
        title="Navigation"
        sub="Sidebar para dashboard administrativo; bottom nav para tablets e celulares na ponta."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24, marginBottom: 24 }}>
        {/* Sidebar */}
        <div style={{
          background: 'var(--t2m-primary)', color: '#fff',
          borderRadius: 16, padding: 20, minHeight: 380,
        }}>
          <T2MWordmark height={22} color="#fff" accent="#33D6C6" />
          <div style={{ marginTop: 32, display: 'grid', gap: 4 }}>
            {items.map((it) => (
              <div key={it.l} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 8,
                background: it.active ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: it.active ? '#fff' : 'rgba(255,255,255,0.75)',
                fontSize: 14, fontWeight: it.active ? 600 : 500,
              }}>
                <Icon name={it.i} size={18} />
                {it.l}
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#33D6C6', color: '#0F0F44', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>MS</div>
            <div style={{ flex: 1, fontSize: 13, lineHeight: 1.2 }}>
              <div style={{ fontWeight: 600 }}>Maria Silva</div>
              <div style={{ opacity: 0.7, fontSize: 11 }}>Supervisora</div>
            </div>
          </div>
        </div>

        {/* Breadcrumbs + content area */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, fontSize: 13, color: 'var(--t2m-text-2)' }}>
            <span>Dashboard</span>
            <Icon name="chev" size={12} color="var(--t2m-text-3)" />
            <span>Histórico</span>
            <Icon name="chev" size={12} color="var(--t2m-text-3)" />
            <span style={{ color: 'var(--t2m-primary)', fontWeight: 600 }}>Sessão #PED-00482</span>
          </div>
          <Card style={{ minHeight: 320, display: 'grid', placeItems: 'center', color: 'var(--t2m-text-3)' }}>
            <span className="t2m-mono" style={{ fontSize: 12 }}>conteúdo da página</span>
          </Card>
        </div>
      </div>

      <Pill>Bottom navigation · mobile</Pill>
      <div style={{
        marginTop: 10, maxWidth: 420, borderRadius: 18, overflow: 'hidden',
        border: '1px solid var(--t2m-border-subtle)',
      }}>
        <div style={{
          background: 'var(--t2m-surface)', display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--t2m-border-subtle)',
        }}>
          {items.map((it) => (
            <div key={it.l} style={{
              padding: '10px 0 14px', textAlign: 'center',
              color: it.active ? 'var(--t2m-primary)' : 'var(--t2m-text-3)',
              borderTop: it.active ? '3px solid var(--t2m-primary)' : '3px solid transparent',
              marginTop: -1,
            }}>
              <Icon name={it.i} size={22} stroke={it.active ? 2.4 : 2} />
              <div style={{ fontSize: 11, fontWeight: 600, marginTop: 4 }}>{it.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════
// Feedback artboard
// ════════════════════════════════════════════════════════════════════════
const FeedbackArtboard = () => {
  const Alert = ({ tone, title, msg, icon }) => {
    const tones = {
      success: ['var(--t2m-success)', 'var(--t2m-success-bg)'],
      warning: ['var(--t2m-warning)', 'var(--t2m-warning-bg)'],
      error: ['var(--t2m-error)', 'var(--t2m-error-bg)'],
      info: ['var(--t2m-info)', 'var(--t2m-info-bg)'],
    };
    const [c, bg] = tones[tone];
    return (
      <div style={{
        display: 'flex', gap: 12, padding: '14px 16px',
        background: bg, borderRadius: 10, border: `1px solid ${c}33`,
      }}>
        <Icon name={icon} size={22} color={c} />
        <div style={{ flex: 1 }}>
          <div className="t2m-h" style={{ fontWeight: 600, fontSize: 14, color: c }}>{title}</div>
          <div style={{ fontSize: 13, color: 'var(--t2m-text-2)', marginTop: 2 }}>{msg}</div>
        </div>
        <Icon name="x" size={16} color={c} />
      </div>
    );
  };

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="13 · Componentes"
        title="Feedback visual"
        sub="Linguagem simples. Toda mensagem de erro propõe o próximo passo."
      />

      {/* Toasts row */}
      <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Toasts e Alerts</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <Alert tone="success" icon="check" title="Conexão estabelecida" msg="O serviço de tradução está pronto para uso." />
        <Alert tone="info" icon="info" title="Atualização disponível" msg="A versão 1.2 traz suporte a Libras regional do Nordeste." />
        <Alert tone="warning" icon="alert" title="Câmera com baixa luminosidade" msg="Acenda mais luz para melhorar o reconhecimento dos sinais." />
        <Alert tone="error" icon="alert" title="Microfone bloqueado" msg="Permita o acesso ao microfone nas configurações do navegador." />
      </div>

      {/* Modal */}
      <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Modal</h3>
      <div style={{ background: 'var(--t2m-subdued)', padding: 24, borderRadius: 12, marginBottom: 24 }}>
        <div style={{
          maxWidth: 460, background: 'var(--t2m-surface)', borderRadius: 14,
          boxShadow: 'var(--t2m-shadow-lg)', overflow: 'hidden', margin: '0 auto',
        }}>
          <div style={{ padding: 20, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', background: 'var(--t2m-warning-bg)',
              display: 'grid', placeItems: 'center',
            }}><Icon name="alert" size={22} color="var(--t2m-warning)" /></div>
            <div style={{ flex: 1 }}>
              <h4 className="t2m-h" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Encerrar conversão?</h4>
              <p style={{ fontSize: 14, color: 'var(--t2m-text-2)', margin: '6px 0 0', lineHeight: 1.55 }}>
                Você está em uma conversa ativa com um cliente. Se sair agora, a sessão será encerrada e não poderá ser retomada.
              </p>
            </div>
          </div>
          <div style={{ padding: '0 20px 20px', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Btn variant="ghost">Cancelar</Btn>
            <Btn variant="danger">Encerrar mesmo assim</Btn>
          </div>
        </div>
      </div>

      {/* Empty + Loading + Skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <Card style={{ minHeight: 220, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24 }}>
          <div>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', background: 'var(--t2m-muted)',
              display: 'grid', placeItems: 'center', margin: '0 auto 12px',
            }}><Icon name="list" size={28} color="var(--t2m-text-3)" /></div>
            <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15 }}>Nenhuma conversa ainda</div>
            <p style={{ fontSize: 12, color: 'var(--t2m-text-2)', margin: '4px 0 12px' }}>
              Suas conversões aparecerão aqui assim que iniciar.
            </p>
            <Btn variant="outline" size="sm" icon="plus">Iniciar conversão</Btn>
            <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', marginTop: 14 }}>empty state</div>
          </div>
        </Card>

        <Card style={{ minHeight: 220, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
          <div>
            <Spinner size={48} color="var(--t2m-primary)" />
            <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15, marginTop: 14 }}>Conectando microfone…</div>
            <p style={{ fontSize: 12, color: 'var(--t2m-text-2)', margin: '4px 0 0' }}>
              Estabelecendo conexão segura com o serviço de tradução.
            </p>
            <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', marginTop: 14 }}>loading state</div>
          </div>
        </Card>

        <Card style={{ minHeight: 220 }}>
          <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', marginBottom: 12 }}>skeleton</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <Skel w={44} h={44} round />
            <div style={{ flex: 1, display: 'grid', gap: 6 }}>
              <Skel w="60%" h={12} />
              <Skel w="40%" h={10} />
            </div>
          </div>
          <Skel w="100%" h={10} /><div style={{ height: 6 }} />
          <Skel w="90%" h={10} /><div style={{ height: 6 }} />
          <Skel w="70%" h={10} />
        </Card>
      </div>
    </div>
  );
};

const Skel = ({ w = '100%', h = 12, round }) => (
  <div style={{
    width: w, height: h, borderRadius: round ? '50%' : 4,
    background: 'linear-gradient(90deg, #ECEFF1 0%, #F5F7F8 50%, #ECEFF1 100%)',
    backgroundSize: '300px 100%',
    animation: 't2m-skel 1.4s infinite linear',
  }} />
);
window.Skel = Skel;

Object.assign(window, {
  ButtonsArtboard, InputsArtboard, CardsArtboard,
  HeaderArtboard, NavArtboard, FeedbackArtboard,
});
