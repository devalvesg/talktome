// ds-section-product.jsx — Product-specific components for Talk2Me

// ── Pulse indicator (mic/cam active) ───
const PulseDot = ({ color = '#B0202F', size = 12 }) => (
  <span style={{
    display: 'inline-block', width: size, height: size, borderRadius: '50%',
    background: color, boxShadow: `0 0 0 0 ${color}88`,
    animation: 't2m-ring 1.6s infinite',
  }} />
);

// ── Sound wave ───
const SoundWave = ({ active = true, color = '#191970', bars = 14, height = 40 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4, height }}>
    {Array.from({ length: bars }).map((_, i) => (
      <div key={i} style={{
        width: 3, height: active ? `${10 + ((i * 13) % 28)}px` : 6,
        borderRadius: 2, background: color, opacity: active ? 1 : 0.35,
        animation: active ? `t2m-wave 0.${(i % 6) + 4}s infinite ease-in-out` : 'none',
        animationDelay: `${i * 70}ms`,
      }} />
    ))}
  </div>
);
window.PulseDot = PulseDot;
window.SoundWave = SoundWave;

// ── Start/Stop CTA ───
const StartConversionBtn = ({ active }) => active ? (
  <button style={{
    height: 80, padding: '0 32px', minWidth: 280,
    background: '#B0202F', color: '#fff', border: 'none',
    borderRadius: 16, fontSize: 20, fontWeight: 700,
    fontFamily: 'var(--t2m-body)', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 14,
    boxShadow: '0 8px 24px rgba(176,32,47,0.3)',
  }}>
    <span style={{
      width: 22, height: 22, borderRadius: 6, background: '#fff',
    }} />
    Parar conversão
    <span className="t2m-mono" style={{
      marginLeft: 8, padding: '4px 10px', background: 'rgba(255,255,255,0.18)',
      borderRadius: 999, fontSize: 13, fontWeight: 600,
    }}>02:34</span>
  </button>
) : (
  <button style={{
    height: 80, padding: '0 32px', minWidth: 280,
    background: '#191970', color: '#fff', border: 'none',
    borderRadius: 16, fontSize: 20, fontWeight: 700,
    fontFamily: 'var(--t2m-body)', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 14,
    boxShadow: '0 8px 24px rgba(25,25,112,0.3)',
  }}>
    <span style={{
      width: 0, height: 0, borderLeft: '14px solid #fff',
      borderTop: '10px solid transparent', borderBottom: '10px solid transparent',
      marginRight: -4,
    }} />
    Iniciar conversão
  </button>
);

// ── Mode selector ───
const ModeSelector = ({ mode = 'audio2libras' }) => {
  const a = mode === 'audio2libras';
  return (
    <div style={{
      display: 'inline-flex', padding: 5, gap: 4,
      background: 'var(--t2m-muted)', borderRadius: 14,
    }}>
      <div style={{
        padding: '14px 22px', borderRadius: 10,
        background: a ? 'var(--t2m-surface)' : 'transparent',
        boxShadow: a ? 'var(--t2m-shadow-sm)' : 'none',
        color: a ? 'var(--t2m-primary)' : 'var(--t2m-text-2)',
        fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icon name="mic" size={18} stroke={2.2} />
        Áudio → Libras
      </div>
      <div style={{
        padding: '14px 22px', borderRadius: 10,
        background: !a ? 'var(--t2m-surface)' : 'transparent',
        boxShadow: !a ? 'var(--t2m-shadow-sm)' : 'none',
        color: !a ? 'var(--t2m-primary)' : 'var(--t2m-text-2)',
        fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icon name="hand" size={18} stroke={2.2} />
        Libras → Áudio
      </div>
    </div>
  );
};

// ── Mic / cam active indicator ───
const DeviceIndicator = ({ kind = 'mic', active = true }) => {
  const c = active ? '#0E9A8D' : 'var(--t2m-text-3)';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 14px', borderRadius: 999,
      background: active ? 'rgba(14,154,141,0.10)' : 'var(--t2m-muted)',
      color: c, fontWeight: 600, fontSize: 13,
      border: `1.5px solid ${active ? '#0E9A8D' : 'transparent'}`,
    }}>
      <Icon name={kind === 'mic' ? (active ? 'mic' : 'micOff') : 'cam'} size={16} color={c} stroke={2.4} />
      {kind === 'mic' ? 'Microfone' : 'Câmera'} {active ? 'ativo' : 'desligado'}
      {active && <PulseDot color={c} size={8} />}
    </div>
  );
};

// ── Connection status ───
const ConnStatus = ({ status = 'online' }) => {
  const map = {
    online: { c: '#1E7A53', t: 'Conectado' },
    weak:   { c: '#A8650F', t: 'Conexão instável' },
    offline:{ c: '#B0202F', t: 'Sem conexão' },
  };
  const { c, t } = map[status];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 10px', borderRadius: 999,
      border: `1px solid ${c}55`, background: `${c}11`, color: c,
      fontSize: 12, fontWeight: 600,
    }}>
      <Icon name="wifi" size={14} color={c} stroke={2.4} />
      {t}
    </div>
  );
};

// ── Audio player ───
const AudioPlayer = ({ playing = false }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '14px 16px', background: 'var(--t2m-surface)',
    border: '1px solid var(--t2m-border-subtle)', borderRadius: 12,
  }}>
    <button style={{
      width: 44, height: 44, borderRadius: '50%', border: 'none',
      background: 'var(--t2m-primary)', color: '#fff', cursor: 'pointer',
      display: 'grid', placeItems: 'center',
    }}>
      <Icon name={playing ? 'stop' : 'play'} size={18} color="#fff" />
    </button>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span className="t2m-h" style={{ fontWeight: 600, fontSize: 13 }}>Resposta do atendente</span>
        <span className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>00:08 / 00:24</span>
      </div>
      <SoundWave active={playing} color="var(--t2m-primary)" bars={24} height={20} />
    </div>
  </div>
);

// ── Libras visualization area ───
const LibrasViewer = ({ size = 'md' }) => {
  const h = size === 'lg' ? 320 : 220;
  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: h,
      borderRadius: 14, overflow: 'hidden',
      background: 'linear-gradient(160deg, #0F0F44 0%, #191970 70%, #2E2E8C 100%)',
      color: '#fff',
    }}>
      {/* Avatar placeholder (stylized signing figure) */}
      <svg width="100%" height={h} viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <radialGradient id="g1" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#5B5BB2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0F0F44" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="220" fill="url(#g1)" />
        {/* Head */}
        <circle cx="160" cy="78" r="28" fill="#FFD7B5" />
        {/* Body */}
        <path d="M 120 200 Q 120 130 160 130 Q 200 130 200 200 Z" fill="#33D6C6" opacity="0.95" />
        {/* Arms — mid-sign pose */}
        <path d="M 140 140 Q 110 120 100 95" stroke="#FFD7B5" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M 180 140 Q 210 105 220 120" stroke="#FFD7B5" strokeWidth="14" strokeLinecap="round" fill="none" />
        {/* Hands */}
        <circle cx="100" cy="92" r="11" fill="#FFD7B5" />
        <circle cx="222" cy="122" r="11" fill="#FFD7B5" />
      </svg>

      {/* Overlay chrome */}
      <div style={{
        position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6,
      }}>
        <Pill tone="brand">AVATAR · LIBRAS</Pill>
      </div>
      <div style={{
        position: 'absolute', top: 12, right: 12,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 999,
        background: 'rgba(255,255,255,0.18)', color: '#fff',
        fontSize: 11, fontWeight: 600,
      }}>
        <PulseDot color="#33D6C6" size={6} />
        SINALIZANDO
      </div>
      {/* Caption */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 18px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.6), transparent)',
        fontSize: 14, lineHeight: 1.4,
      }}>
        <span style={{ opacity: 0.7, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>traduzindo</span>
        <div style={{ marginTop: 2 }}>“Bom dia! Em que posso ajudar?”</div>
      </div>
    </div>
  );
};

// ── Transcription box ───
const Transcription = () => (
  <div style={{
    background: 'var(--t2m-surface)', border: '1px solid var(--t2m-border-subtle)',
    borderRadius: 12, padding: 18,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <PulseDot color="#0E9A8D" size={8} />
        <span className="t2m-h" style={{ fontWeight: 600, fontSize: 13 }}>Transcrição em tempo real</span>
      </div>
      <span className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>PT-BR · 98%</span>
    </div>
    <div style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--t2m-text)' }}>
      <span style={{ color: 'var(--t2m-text-3)' }}>Bom dia! </span>
      <span>Onde fica o setor de </span>
      <span style={{ background: 'var(--t2m-primary-50)', padding: '2px 4px', borderRadius: 4, color: 'var(--t2m-primary)' }}>
        açougue
      </span>
      <span style={{ color: 'var(--t2m-text-3)' }}> &nbsp;|</span>
    </div>
    <SoundWave active color="#0E9A8D" bars={40} height={22} />
  </div>
);

// ── Conversation card (history bubble) ───
const ConversationCard = ({ side = 'left', who, msg, time, kind }) => (
  <div style={{
    display: 'flex', justifyContent: side === 'left' ? 'flex-start' : 'flex-end', marginBottom: 12,
  }}>
    <div style={{ maxWidth: '78%' }}>
      <div className="t2m-mono" style={{
        fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--t2m-text-3)', marginBottom: 4,
        textAlign: side === 'left' ? 'left' : 'right',
      }}>{who} · {kind} · {time}</div>
      <div style={{
        padding: '12px 16px', borderRadius: side === 'left' ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
        background: side === 'left' ? 'var(--t2m-muted)' : 'var(--t2m-primary)',
        color: side === 'left' ? 'var(--t2m-text)' : '#fff',
        fontSize: 15, lineHeight: 1.45,
      }}>{msg}</div>
    </div>
  </div>
);

// ── Accessibility status badge ───
const A11yStatus = ({ items }) => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    {items.map((it) => (
      <div key={it.label} style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderRadius: 8,
        background: it.ok ? 'var(--t2m-success-bg)' : 'var(--t2m-muted)',
        color: it.ok ? 'var(--t2m-success)' : 'var(--t2m-text-2)',
        fontSize: 13, fontWeight: 600,
      }}>
        <Icon name={it.ok ? 'check' : 'x'} size={14} color={it.ok ? 'var(--t2m-success)' : 'var(--t2m-text-3)'} stroke={2.6} />
        {it.label}
      </div>
    ))}
  </div>
);

Object.assign(window, {
  PulseDot, SoundWave, StartConversionBtn, ModeSelector, DeviceIndicator,
  ConnStatus, AudioPlayer, LibrasViewer, Transcription, ConversationCard, A11yStatus,
});

// ════════════════════════════════════════════════════════════════════════
// Product components artboard
// ════════════════════════════════════════════════════════════════════════
const ProductComponentsArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="14 · Produto"
      title="Componentes específicos"
      sub="Peças exclusivas do Talk2Me: o motor de tradução áudio ↔ Libras, players, indicadores de dispositivos e status de acessibilidade."
    />

    {/* CTAs */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Botões de conversão</h3>
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
      <StartConversionBtn />
      <StartConversionBtn active />
    </div>

    {/* Mode selector */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Seletor de modo</h3>
    <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
      <ModeSelector mode="audio2libras" />
      <ModeSelector mode="libras2audio" />
    </div>

    {/* Indicators */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Indicadores de dispositivo e conexão</h3>
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
      <DeviceIndicator kind="mic" active />
      <DeviceIndicator kind="mic" active={false} />
      <DeviceIndicator kind="cam" active />
      <ConnStatus status="online" />
      <ConnStatus status="weak" />
      <ConnStatus status="offline" />
    </div>

    {/* Libras viewer + audio player + transcription */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
      <div>
        <h3 className="t2m-h" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 600 }}>Avatar de Libras</h3>
        <LibrasViewer />
      </div>
      <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
        <div>
          <h3 className="t2m-h" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 600 }}>Player de áudio</h3>
          <AudioPlayer playing />
        </div>
        <div>
          <h3 className="t2m-h" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 600 }}>Transcrição em tempo real</h3>
          <Transcription />
        </div>
      </div>
    </div>

    {/* Conversation cards */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 600 }}>Card de conversa</h3>
    <div style={{
      maxWidth: 640, padding: 18, background: 'var(--t2m-subdued)', borderRadius: 14,
    }}>
      <ConversationCard side="left" who="Cliente" kind="LIBRAS → ÁUDIO" time="14:32"
        msg="Bom dia. Onde fica o setor de açougue?" />
      <ConversationCard side="right" who="Atendente" kind="ÁUDIO → LIBRAS" time="14:32"
        msg="Bom dia! Fica no fundo da loja, à esquerda da padaria. Quer que eu te leve?" />
      <ConversationCard side="left" who="Cliente" kind="LIBRAS → ÁUDIO" time="14:33"
        msg="Não precisa, obrigado!" />
    </div>

    {/* A11y status */}
    <h3 className="t2m-h" style={{ margin: '20px 0 12px', fontSize: 15, fontWeight: 600 }}>Status de acessibilidade</h3>
    <Card>
      <A11yStatus items={[
        { label: 'Contraste AA', ok: true },
        { label: 'Legendas ativas', ok: true },
        { label: 'Avatar Libras', ok: true },
        { label: 'Áudio descritivo', ok: false },
        { label: 'Texto ampliado', ok: false },
      ]} />
    </Card>
  </div>
);

window.ProductComponentsArtboard = ProductComponentsArtboard;
