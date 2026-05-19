// screen-home.jsx — Home / Pairing screen

const HomeScreen = () => {
  const [att, setAtt] = React.useState(true);    // attendant connected
  const [cli, setCli] = React.useState(false);   // client connected
  const [cam, setCam] = React.useState(false);
  const [mic, setMic] = React.useState(true);
  const [mode, setMode] = React.useState('caixa');
  const [starting, setStarting] = React.useState(false);

  const allReady = att && cli && cam && mic;

  // simulate connection cycle on first render
  React.useEffect(() => {
    const t1 = setTimeout(() => setCli(true), 1800);
    const t2 = setTimeout(() => setCam(true), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      background: 'var(--t2m-muted)', minHeight: '100%', padding: '32px 48px',
      fontFamily: 'var(--t2m-body)', color: 'var(--t2m-text)',
    }}>
      {/* Topbar */}
      <div style={{
        display: 'flex', alignItems: 'center', marginBottom: 28,
      }}>
        <T2MWordmark height={26} />
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--t2m-text-2)' }}>
          <Icon name="shop" size={16} stroke={2.2} />
          Supermercado Savassi · Loja 04
          <span style={{ color: 'var(--t2m-text-3)' }}>· Op. Maria Silva</span>
        </div>
        <div style={{ width: 24 }} />
        <Btn variant="ghost" size="sm" icon="help">Ajuda rápida</Btn>
      </div>

      {/* Main card */}
      <div style={{
        background: 'var(--t2m-surface)', borderRadius: 20,
        boxShadow: 'var(--t2m-shadow-md)', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1.15fr 1fr',
      }}>
        {/* LEFT — CTA + mode */}
        <div style={{ padding: '44px 48px' }}>
          <Pill tone="brand">Atendimento acessível</Pill>
          <h1 className="t2m-h" style={{
            fontSize: 38, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em',
            margin: '14px 0 12px', color: 'var(--t2m-text)',
          }}>Iniciar atendimento acessível</h1>
          <p style={{ fontSize: 15, color: 'var(--t2m-text-2)', lineHeight: 1.55, margin: '0 0 28px', maxWidth: 460 }}>
            Conecte o dispositivo do atendente ao dispositivo do cliente para começar a conversa em Libras.
          </p>

          {/* Mode selector */}
          <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', letterSpacing: '0.1em', marginBottom: 10 }}>
            TIPO DE ATENDIMENTO
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 28 }}>
            {[
              { id: 'caixa', icon: 'shop', label: 'Caixa' },
              { id: 'balcao', icon: 'users', label: 'Balcão' },
              { id: 'sac', icon: 'help', label: 'SAC' },
            ].map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                padding: '14px 12px', borderRadius: 12, cursor: 'pointer',
                background: mode === m.id ? 'var(--t2m-primary-50)' : 'var(--t2m-surface)',
                border: `1.5px solid ${mode === m.id ? 'var(--t2m-primary)' : 'var(--t2m-border)'}`,
                color: mode === m.id ? 'var(--t2m-primary)' : 'var(--t2m-text-2)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                fontFamily: 'var(--t2m-body)', fontSize: 14, fontWeight: 600,
                transition: 'all 120ms',
              }}>
                <Icon name={m.icon} size={22} stroke={2.2} />
                {m.label}
              </button>
            ))}
          </div>

          {/* Main CTA */}
          <button
            onClick={() => { if (allReady) { setStarting(true); setTimeout(() => setStarting(false), 1400); } }}
            disabled={!allReady || starting}
            style={{
              width: '100%', height: 88, borderRadius: 16, border: 'none',
              background: allReady ? 'var(--t2m-primary)' : '#CFD8DC',
              color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: 'var(--t2m-body)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
              cursor: allReady && !starting ? 'pointer' : 'not-allowed',
              boxShadow: allReady ? '0 12px 28px rgba(25,25,112,0.28)' : 'none',
              transition: 'all 160ms',
            }}>
            {starting ? <><Spinner size={28} /> Iniciando conversa…</> : <>
              <Icon name="play" size={22} color="#fff" stroke={2.4} />
              Iniciar conversa
            </>}
          </button>

          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <Btn variant="outline" size="md" icon="cog">Testar câmera e microfone</Btn>
            <div style={{ flex: 1 }} />
            <Btn variant="ghost" size="md" icon="list">Histórico</Btn>
          </div>

          {/* State chip */}
          <div style={{
            marginTop: 24, padding: '14px 16px', borderRadius: 12,
            background: allReady ? 'var(--t2m-success-bg)' : 'var(--t2m-warning-bg)',
            border: `1px solid ${allReady ? 'var(--t2m-success)' : 'var(--t2m-warning)'}33`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <Icon name={allReady ? 'check' : 'alert'} size={20} color={allReady ? 'var(--t2m-success)' : 'var(--t2m-warning)'} stroke={2.4} />
            <div style={{ flex: 1 }}>
              <div className="t2m-h" style={{ fontWeight: 600, fontSize: 14, color: allReady ? 'var(--t2m-success)' : 'var(--t2m-warning)' }}>
                {allReady ? 'Tudo pronto para começar' : 'Aguardando conexões…'}
              </div>
              <div style={{ fontSize: 12, color: 'var(--t2m-text-2)', marginTop: 2 }}>
                {allReady
                  ? 'Os dois dispositivos estão conectados. Toque em "Iniciar conversa".'
                  : 'Peça ao cliente para escanear o QR Code ao lado para conectar.'}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — pairing */}
        <div style={{
          padding: 36, background: 'linear-gradient(160deg, #191970 0%, #13135A 100%)',
          color: '#fff', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.08,
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          <div style={{ position: 'relative' }}>
            <Pill tone="dark">Pareamento</Pill>
            <h3 className="t2m-h" style={{ fontSize: 22, fontWeight: 600, margin: '12px 0 6px' }}>Conectar dispositivos</h3>
            <p style={{ fontSize: 13, opacity: 0.8, margin: '0 0 22px', lineHeight: 1.5 }}>
              Aponte a câmera do tablet do cliente para o QR Code abaixo.
            </p>

            {/* QR Code */}
            <div style={{
              background: '#fff', padding: 18, borderRadius: 16, width: 184, marginBottom: 18,
              boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
            }}>
              <QRPlaceholder />
              <div className="t2m-mono" style={{
                fontSize: 11, color: 'var(--t2m-text-3)', textAlign: 'center',
                marginTop: 10, letterSpacing: '0.1em',
              }}>SESSÃO #4F8A-CX04</div>
            </div>

            <div className="t2m-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.16em', marginBottom: 10 }}>
              OU DIGITE O CÓDIGO
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
              {['4', 'F', '8', 'A'].map((d, i) => (
                <div key={i} style={{
                  width: 38, height: 48, background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8,
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'var(--t2m-mono)', fontSize: 20, fontWeight: 700,
                }}>{d}</div>
              ))}
            </div>

            {/* Status checklist */}
            <div style={{ display: 'grid', gap: 8 }}>
              <StatusRow icon="user"  label="Dispositivo do atendente" status={att ? 'on' : 'pending'} />
              <StatusRow icon="phone" label="Dispositivo do cliente"   status={cli ? 'on' : 'pending'} />
              <StatusRow icon="cam"   label="Câmera"                   status={cam ? 'on' : 'pending'} />
              <StatusRow icon="mic"   label="Microfone"                 status={mic ? 'on' : 'off'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ icon, label, status }) => {
  const map = {
    on:      { c: '#33D6C6', t: 'Conectado',   pulse: false },
    pending: { c: '#FDBA47', t: 'Aguardando…',  pulse: true },
    off:     { c: '#90A4AE', t: 'Desligado',    pulse: false },
    error:   { c: '#FF6E7A', t: 'Erro',         pulse: false },
  };
  const m = map[status];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', borderRadius: 10,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.12)',
        display: 'grid', placeItems: 'center',
      }}>
        <Icon name={icon} size={16} color="#fff" stroke={2.2} />
      </div>
      <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{label}</div>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 600, color: m.c,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: m.c,
          animation: m.pulse ? 't2m-pulse 1.4s infinite' : 'none',
        }} />
        {m.t}
      </span>
    </div>
  );
};

const QRPlaceholder = () => {
  // Stylized QR — deterministic dot pattern (not a real QR, just for visual)
  const dots = [];
  for (let y = 0; y < 17; y++) {
    for (let x = 0; x < 17; x++) {
      // Corners (finder patterns)
      const isCorner = (
        (x < 7 && y < 7) || (x > 9 && y < 7) || (x < 7 && y > 9)
      );
      if (isCorner) {
        const cx = x < 7 ? x : x - 10;
        const cy = y < 7 ? y : y - 10;
        const inFinder = cx === 0 || cx === 6 || cy === 0 || cy === 6 ||
                          (cx >= 2 && cx <= 4 && cy >= 2 && cy <= 4);
        if (inFinder) dots.push({ x, y });
      } else {
        // Pseudo-random
        if (((x * 7 + y * 13 + x * y * 3) % 7) < 3) dots.push({ x, y });
      }
    }
  }
  const size = 148, cell = size / 17;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {dots.map((d, i) => (
        <rect key={i} x={d.x * cell} y={d.y * cell} width={cell} height={cell} fill="#191970" />
      ))}
    </svg>
  );
};

// ── Home state variations card row (shown below the main card) ──
const HomeVariationsRow = () => (
  <div style={{
    marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16,
  }}>
    <MiniState
      title="Aguardando cliente"
      desc="Atendente conectado, cliente ainda não escaneou o QR."
      tone="warning"
      icon="alert"
    />
    <MiniState
      title="Ambos conectados"
      desc="Tudo pronto. Atendimento pode começar."
      tone="success"
      icon="check"
    />
    <MiniState
      title="Erro de conexão"
      desc="Verifique a rede Wi-Fi do supermercado e tente reconectar."
      tone="error"
      icon="alert"
    />
  </div>
);

const MiniState = ({ title, desc, tone, icon }) => {
  const tones = {
    success: ['var(--t2m-success)', 'var(--t2m-success-bg)'],
    warning: ['var(--t2m-warning)', 'var(--t2m-warning-bg)'],
    error:   ['var(--t2m-error)', 'var(--t2m-error-bg)'],
  };
  const [c, bg] = tones[tone];
  return (
    <div style={{
      padding: 18, borderRadius: 14, background: 'var(--t2m-surface)',
      border: `1px solid ${c}44`,
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 10px',
        background: bg, color: c, borderRadius: 999, fontSize: 11,
        fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
        marginBottom: 10,
      }}>
        <Icon name={icon} size={12} stroke={2.6} />
        {tone === 'success' ? 'Sucesso' : tone === 'warning' ? 'Aguardando' : 'Erro'}
      </div>
      <div className="t2m-h" style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 12.5, color: 'var(--t2m-text-2)', lineHeight: 1.5 }}>{desc}</div>
    </div>
  );
};

window.HomeScreen = HomeScreen;
window.HomeVariationsRow = HomeVariationsRow;
