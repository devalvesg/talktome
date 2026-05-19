// screen-flow.jsx — Flow diagram between screens

const FlowDiagram = () => {
  const steps = [
    { n: '01', icon: 'home',  who: 'Atendente', title: 'Abre a Home',                 sub: 'Escolhe tipo de atendimento (caixa, balcão, SAC)' },
    { n: '02', icon: 'play',  who: 'Atendente', title: 'Toca em "Iniciar conversa"',  sub: 'Sistema gera QR Code de sessão' },
    { n: '03', icon: 'qr',    who: 'Cliente',   title: 'Escaneia o QR no tablet',     sub: 'Dispositivo do cliente entra na sessão' },
    { n: '04', icon: 'cam',   who: 'Cliente',   title: 'Permite acesso à câmera',     sub: 'Microfone do atendente também é ativado' },
    { n: '05', icon: 'send',  who: 'Atendente', title: 'Envia pergunta rápida',       sub: 'Ex.: "CPF na nota?"' },
    { n: '06', icon: 'hand',  who: 'Cliente',   title: 'Vê avatar em Libras',         sub: 'Tradução visual da pergunta' },
    { n: '07', icon: 'check', who: 'Cliente',   title: 'Responde com botão',          sub: 'Ou sinaliza para a câmera' },
    { n: '08', icon: 'list',  who: 'Atendente', title: 'Recebe a resposta',           sub: 'Aparece em destaque na tela principal' },
    { n: '09', icon: 'x',     who: 'Ambos',     title: 'Conversa é encerrada',        sub: 'Histórico salvo na sessão' },
  ];

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <div style={{ marginBottom: 28 }}>
        <span className="t2m-mono" style={{
          fontSize: 11, color: 'var(--t2m-text-3)', letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>Fluxo principal</span>
        <h2 className="t2m-h" style={{
          fontSize: 32, fontWeight: 600, margin: '8px 0 6px', letterSpacing: '-0.01em',
        }}>Fluxo entre as telas</h2>
        <p style={{ fontSize: 14, color: 'var(--t2m-text-2)', margin: 0, lineHeight: 1.55, maxWidth: 720 }}>
          Caminho-feliz do atendimento — Home, conexão, pergunta, resposta, encerramento.
          Mostra também quem opera cada passo (atendente, cliente ou ambos).
        </p>
      </div>

      {/* Lane labels */}
      <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, marginBottom: 12 }}>
        <div />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 8 }}>
          {steps.map(s => (
            <div key={s.n} className="t2m-mono" style={{
              fontSize: 10, color: 'var(--t2m-text-3)', letterSpacing: '0.1em',
              textAlign: 'center', fontWeight: 600,
            }}>{s.n}</div>
          ))}
        </div>
      </div>

      {/* Attendant lane */}
      <Lane label="Atendente" color="var(--t2m-primary)" steps={steps} who="Atendente" />
      <ConnectorBar />
      {/* Client lane */}
      <Lane label="Cliente" color="var(--t2m-secondary)" steps={steps} who="Cliente" />

      {/* Legend */}
      <div style={{
        marginTop: 28, padding: 18, background: 'var(--t2m-subdued)', borderRadius: 12,
        display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', letterSpacing: '0.1em' }}>LEGENDA</div>
        <LegendItem color="var(--t2m-primary)" label="Atendente" />
        <LegendItem color="var(--t2m-secondary)" label="Cliente" />
        <LegendItem color="var(--t2m-text)" label="Ação simultânea (ambos)" />
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 12, color: 'var(--t2m-text-2)' }}>
          Tempo médio do fluxo completo: <strong>1 a 3 minutos</strong> por atendimento.
        </div>
      </div>
    </div>
  );
};

const Lane = ({ label, color, steps, who }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 16, alignItems: 'stretch' }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      paddingRight: 8,
    }}>
      <div style={{
        padding: '6px 12px', borderRadius: 999,
        background: `${color}1A`, color, fontSize: 12, fontWeight: 700,
      }}>{label}</div>
    </div>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 8, position: 'relative',
    }}>
      {/* Lane background line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 38, height: 2,
        background: `${color}22`, zIndex: 0,
      }} />
      {steps.map((s, i) => {
        const active = s.who === who || s.who === 'Ambos';
        return (
          <div key={s.n} style={{ position: 'relative', zIndex: 1, opacity: active ? 1 : 0.25 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', margin: '0 auto',
              background: active ? color : 'var(--t2m-muted)',
              color: active ? '#fff' : 'var(--t2m-text-3)',
              display: 'grid', placeItems: 'center',
              boxShadow: active ? `0 6px 18px ${color}55` : 'none',
              border: `3px solid var(--t2m-surface)`,
            }}>
              <Icon name={s.icon} size={22} color={active ? '#fff' : 'var(--t2m-text-3)'} stroke={2.2} />
            </div>
            {active && (
              <div style={{ marginTop: 10, textAlign: 'center', padding: '0 4px' }}>
                <div className="t2m-h" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, color: 'var(--t2m-text)' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--t2m-text-2)', lineHeight: 1.4, marginTop: 4 }}>
                  {s.sub}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

const ConnectorBar = () => (
  <div style={{
    height: 20, margin: '8px 0', marginLeft: 96,
    backgroundImage: 'repeating-linear-gradient(90deg, var(--t2m-border) 0 6px, transparent 6px 12px)',
    backgroundSize: '12px 1px', backgroundPosition: 'center', backgroundRepeat: 'repeat-x',
  }} />
);

const LegendItem = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <div style={{ width: 14, height: 14, borderRadius: '50%', background: color }} />
    <span style={{ fontSize: 12, color: 'var(--t2m-text-2)' }}>{label}</span>
  </div>
);

window.FlowDiagram = FlowDiagram;
