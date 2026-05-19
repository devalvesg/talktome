// screen-landing.jsx — Landing page

const LandingPage = () => {
  const [demo, setDemo] = React.useState(false);

  return (
    <div style={{ background: 'var(--t2m-surface)', fontFamily: 'var(--t2m-body)', color: 'var(--t2m-text)', minHeight: '100%' }}>
      {/* ── NAV ── */}
      <header style={{
        height: 72, display: 'flex', alignItems: 'center',
        padding: '0 56px', borderBottom: '1px solid var(--t2m-border-subtle)',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <T2MWordmark height={26} />
        <nav style={{ marginLeft: 48, display: 'flex', gap: 32 }}>
          {['Solução', 'Como funciona', 'Para supermercados', 'Acessibilidade'].map(l => (
            <a key={l} style={{ fontSize: 14, fontWeight: 500, color: 'var(--t2m-text-2)', textDecoration: 'none', cursor: 'pointer' }}>{l}</a>
          ))}
        </nav>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="ghost" size="sm">Entrar</Btn>
          <Btn variant="primary" size="sm">Solicitar demonstração</Btn>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        padding: '80px 56px 96px',
        background: 'linear-gradient(180deg, #FAFBFC 0%, #ECEFF1 100%)',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'center',
      }}>
        <div>
          <Pill tone="accent" style={{ marginBottom: 20 }}>
            <Icon name="sparkle" size={11} color="var(--t2m-secondary-600)" stroke={0} /> Lei Brasileira de Inclusão · LBI 13.146
          </Pill>
          <h1 className="t2m-h" style={{
            fontSize: 60, fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.025em',
            color: 'var(--t2m-text)', margin: '0 0 22px',
          }}>
            Comunicação acessível entre supermercados e
            <span style={{ color: 'var(--t2m-primary)' }}> pessoas surdas</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--t2m-text-2)', maxWidth: 560, margin: '0 0 32px' }}>
            O Talk2Me converte áudio em Libras e Libras em texto/voz em tempo real.
            Atendentes e clientes surdos se entendem sem barreiras — no caixa,
            no balcão ou no totem de autoatendimento.
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <Btn variant="primary" size="lg" icon="arrow">Conhecer solução</Btn>
            <Btn variant="outline" size="lg" icon="play">Ver demonstração</Btn>
          </div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            {[
              ['2.3M', 'brasileiros surdos'],
              ['98%', 'precisão tradução'],
              ['<1s', 'latência'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="t2m-h" style={{ fontSize: 28, fontWeight: 700, color: 'var(--t2m-primary)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: 'var(--t2m-text-2)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero illustration: supermercado scene */}
        <HeroIllustration />
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section style={{ padding: '88px 56px', background: 'var(--t2m-surface)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Pill tone="brand">Como funciona</Pill>
          <h2 className="t2m-h" style={{
            fontSize: 40, fontWeight: 700, color: 'var(--t2m-text)',
            margin: '14px 0 12px', letterSpacing: '-0.02em',
          }}>Três passos. Conversa real.</h2>
          <p style={{ fontSize: 17, color: 'var(--t2m-text-2)', margin: 0, maxWidth: 600, marginInline: 'auto' }}>
            Funciona em qualquer caixa ou balcão — basta dois dispositivos conectados na mesma rede.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, position: 'relative' }}>
          {/* Connector line behind cards */}
          <div style={{
            position: 'absolute', top: 60, left: '16%', right: '16%', height: 2,
            background: 'repeating-linear-gradient(90deg, var(--t2m-primary-100) 0 8px, transparent 8px 16px)',
            zIndex: 0,
          }} />
          {[
            { n: 1, icon: 'mic', title: 'Atendente inicia a conversa', body: 'No tablet ou computador, o funcionário toca em "Iniciar atendimento" e escolhe entre perguntas rápidas ou texto livre.' },
            { n: 2, icon: 'hand', title: 'Cliente se comunica em Libras', body: 'A câmera do dispositivo do cliente capta os sinais. Respostas rápidas como "Sim/Não" também aparecem como botões grandes.' },
            { n: 3, icon: 'swap', title: 'Sistema traduz em tempo real', body: 'Libras vira texto para o atendente. Voz do atendente vira Libras no avatar. Tudo em menos de um segundo.' },
          ].map(step => (
            <div key={step.n} style={{
              background: 'var(--t2m-surface)', border: '1px solid var(--t2m-border-subtle)',
              borderRadius: 16, padding: 32, position: 'relative', zIndex: 1,
              boxShadow: 'var(--t2m-shadow-sm)',
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: 'var(--t2m-primary)',
                color: '#fff', display: 'grid', placeItems: 'center', marginBottom: 20,
                position: 'relative',
              }}>
                <Icon name={step.icon} size={26} color="#fff" stroke={2.2} />
                <div className="t2m-mono" style={{
                  position: 'absolute', top: -8, right: -8, width: 26, height: 26,
                  borderRadius: '50%', background: 'var(--t2m-secondary)', color: '#fff',
                  display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700,
                  border: '2px solid #fff',
                }}>{step.n}</div>
              </div>
              <h3 className="t2m-h" style={{ fontSize: 18, fontWeight: 600, margin: '0 0 10px', color: 'var(--t2m-text)' }}>{step.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--t2m-text-2)', margin: 0 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: '88px 56px', background: 'var(--t2m-muted)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Pill tone="brand">Benefícios</Pill>
          <h2 className="t2m-h" style={{
            fontSize: 40, fontWeight: 700, color: 'var(--t2m-text)',
            margin: '14px 0 12px', letterSpacing: '-0.02em',
          }}>Inclusão que se mede</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: 'users',  title: 'Atendimento mais inclusivo',     body: 'Sua loja se torna acessível para 2.3 milhões de brasileiros surdos.' },
            { icon: 'waves',  title: 'Sem barreiras de comunicação',   body: 'Tradução simultânea elimina a necessidade de intérpretes presenciais.' },
            { icon: 'hand',   title: 'Mais autonomia para clientes',   body: 'A pessoa surda decide sozinha, sem precisar de um acompanhante.' },
            { icon: 'check',  title: 'Fácil para funcionários',        body: 'Treinamento de 5 minutos. Sem precisar aprender Libras.' },
            { icon: 'shop',   title: 'Filas menores no caixa',         body: 'Atendimentos 60% mais rápidos do que com gestos improvisados.' },
            { icon: 'sparkle',title: 'Conformidade LBI 13.146',         body: 'Atende a Lei Brasileira de Inclusão e o decreto 5.626/2005.' },
          ].map(b => (
            <div key={b.title} style={{
              background: 'var(--t2m-surface)', borderRadius: 14, padding: 24,
              border: '1px solid var(--t2m-border-subtle)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: 'var(--t2m-primary-50)',
                color: 'var(--t2m-primary)', display: 'grid', placeItems: 'center', marginBottom: 14,
              }}>
                <Icon name={b.icon} size={22} color="var(--t2m-primary)" stroke={2.2} />
              </div>
              <h3 className="t2m-h" style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>{b.title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'var(--t2m-text-2)', margin: 0 }}>{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PARA SUPERMERCADOS ── */}
      <section style={{
        padding: '88px 56px', background: 'var(--t2m-surface)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      }}>
        <div>
          <Pill tone="brand">Onde usar</Pill>
          <h2 className="t2m-h" style={{
            fontSize: 40, fontWeight: 700, color: 'var(--t2m-text)',
            margin: '14px 0 18px', letterSpacing: '-0.02em',
          }}>Em qualquer ponto da sua loja</h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--t2m-text-2)', margin: '0 0 28px' }}>
            O Talk2Me roda no hardware que você já tem. Sem instalação física.
            Sem dispositivos novos para gerenciar.
          </p>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['shop', 'Caixas — atendimento ágil em fila'],
              ['users', 'Balcões de atendimento — SAC, troca, devolução'],
              ['phone', 'Totens de autoatendimento — Libras-first'],
              ['cog', 'Tablets de funcionários — varredura de loja'],
              ['list', 'Computadores administrativos — SAC interno'],
            ].map(([icon, txt]) => (
              <div key={txt} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                background: 'var(--t2m-subdued)', borderRadius: 10,
              }}>
                <Icon name={icon} size={20} color="var(--t2m-primary)" stroke={2.2} />
                <span style={{ fontSize: 14.5, fontWeight: 500 }}>{txt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device showcase */}
        <DeviceShowcase />
      </section>

      {/* ── DEMO PREVIEW ── */}
      <section style={{
        padding: '88px 56px', background: 'var(--t2m-primary)', color: '#fff',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative dots */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div style={{ position: 'relative' }}>
          <Pill tone="dark">Demonstração</Pill>
          <h2 className="t2m-h" style={{
            fontSize: 40, fontWeight: 700, margin: '14px 0 12px', letterSpacing: '-0.02em',
          }}>Veja em ação</h2>
          <p style={{ fontSize: 16, opacity: 0.85, margin: '0 0 36px', maxWidth: 600, marginInline: 'auto' }}>
            Um atendimento real no caixa do supermercado, com tradução simultânea.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
            maxWidth: 1000, marginInline: 'auto', textAlign: 'left',
          }}>
            <DemoPreviewAttendant />
            <DemoPreviewClient />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '96px 56px', background: 'var(--t2m-surface)', textAlign: 'center' }}>
        <T2MMark size={64} />
        <h2 className="t2m-h" style={{
          fontSize: 44, fontWeight: 700, color: 'var(--t2m-text)',
          margin: '20px 0 14px', letterSpacing: '-0.02em', maxWidth: 720, marginInline: 'auto',
        }}>
          Sua loja conversa com todo mundo
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--t2m-text-2)', margin: '0 auto 32px', maxWidth: 600 }}>
          Tornar o supermercado acessível para pessoas surdas não é favor — é direito.
          Comece com uma demonstração gratuita de 30 dias.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Btn variant="primary" size="lg" icon="arrow">Solicitar demonstração</Btn>
          <Btn variant="outline" size="lg">Falar com vendas</Btn>
        </div>
      </section>

      <footer style={{
        padding: '32px 56px', borderTop: '1px solid var(--t2m-border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 13, color: 'var(--t2m-text-3)',
      }}>
        <T2MWordmark height={18} />
        <div className="t2m-mono">© 2026 Talk2Me · Acessibilidade no varejo</div>
      </footer>
    </div>
  );
};

// ── Hero illustration: stylized scene ──
const HeroIllustration = () => (
  <div style={{
    position: 'relative', aspectRatio: '5/4', borderRadius: 24,
    background: 'linear-gradient(135deg, #191970 0%, #2E2E8C 70%, #0E9A8D 130%)',
    boxShadow: '0 24px 60px rgba(25,25,112,0.25)', overflow: 'hidden',
  }}>
    {/* Background grid */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.15,
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }} />

    {/* Floating tablet — attendant */}
    <div style={{
      position: 'absolute', top: '12%', left: '8%', width: '54%', aspectRatio: '4/3',
      background: '#fff', borderRadius: 14, boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
      padding: 14, transform: 'rotate(-4deg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
        <div style={{ width: 14, height: 14, borderRadius: 4, background: '#191970' }} />
        <div style={{ fontSize: 9, fontWeight: 700, color: '#191970' }}>Talk<span style={{ color: '#0E9A8D' }}>2</span>Me</div>
        <div style={{ flex: 1 }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E7A53' }} />
        <div style={{ fontSize: 7, color: '#4A5763' }}>Conectado</div>
      </div>
      <div style={{ background: '#F5F7F8', borderRadius: 8, padding: 10, marginBottom: 8 }}>
        <div style={{ fontSize: 7, fontWeight: 600, color: '#7A8794', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Recebendo de cliente</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#0F1729' }}>"Onde fica o açougue?"</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {['CPF na nota?', 'Crédito ou débito?'].map(t => (
          <div key={t} style={{
            padding: '8px 10px', background: '#191970', color: '#fff',
            fontSize: 9, fontWeight: 600, borderRadius: 6, textAlign: 'center',
          }}>{t}</div>
        ))}
      </div>
    </div>

    {/* Floating tablet — client */}
    <div style={{
      position: 'absolute', bottom: '10%', right: '8%', width: '46%', aspectRatio: '3/4',
      background: '#0F1729', borderRadius: 14, boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
      padding: 10, transform: 'rotate(6deg)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <span style={{
          display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#33D6C6',
        }} />
        <div style={{ fontSize: 7, color: '#fff', fontWeight: 600 }}>Mensagem do atendente</div>
      </div>
      <div style={{
        background: 'linear-gradient(160deg, #191970 0%, #2E2E8C 100%)',
        borderRadius: 8, padding: 12, minHeight: '50%',
        display: 'grid', placeItems: 'center', marginBottom: 8,
      }}>
        <AvatarMini />
      </div>
      <div style={{ fontSize: 9, color: '#fff', textAlign: 'center', marginBottom: 8, opacity: 0.85 }}>
        "CPF na nota?"
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
        <div style={{
          padding: '10px 8px', background: '#0E9A8D', color: '#fff',
          borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: 'center',
        }}>Sim</div>
        <div style={{
          padding: '10px 8px', background: 'rgba(255,255,255,0.12)', color: '#fff',
          borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: 'center',
        }}>Não</div>
      </div>
    </div>

    {/* Connection line */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <path d="M 35% 35% Q 50% 50% 65% 60%" stroke="#33D6C6" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.8" />
      <circle cx="50%" cy="50%" r="6" fill="#33D6C6" />
    </svg>
  </div>
);

const AvatarMini = () => (
  <svg width="100%" height="100" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet">
    <circle cx="50" cy="30" r="11" fill="#FFD7B5" />
    <path d="M 36 75 Q 36 50 50 50 Q 64 50 64 75 Z" fill="#33D6C6" />
    <path d="M 42 56 Q 30 48 26 38" stroke="#FFD7B5" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M 58 56 Q 70 42 74 48" stroke="#FFD7B5" strokeWidth="6" strokeLinecap="round" fill="none" />
    <circle cx="26" cy="36" r="4.5" fill="#FFD7B5" />
    <circle cx="75" cy="49" r="4.5" fill="#FFD7B5" />
  </svg>
);

const DeviceShowcase = () => (
  <div style={{
    display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr',
  }}>
    {[
      { label: 'Caixa · PDV', icon: 'shop', accent: '#191970' },
      { label: 'Balcão · Tablet', icon: 'users', accent: '#0E9A8D' },
      { label: 'Totem · Cliente', icon: 'phone', accent: '#4A4AAB' },
      { label: 'SAC · Desktop', icon: 'cog', accent: '#13135A' },
    ].map(d => (
      <div key={d.label} style={{
        aspectRatio: '4/3', borderRadius: 16, padding: 24,
        background: 'var(--t2m-subdued)', border: '1px solid var(--t2m-border-subtle)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: d.accent,
          display: 'grid', placeItems: 'center',
        }}>
          <Icon name={d.icon} size={26} color="#fff" stroke={2} />
        </div>
        <div>
          <div className="t2m-h" style={{ fontSize: 16, fontWeight: 600 }}>{d.label}</div>
          <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', letterSpacing: '0.1em', marginTop: 2 }}>SUPORTADO</div>
        </div>
      </div>
    ))}
  </div>
);

const DemoPreviewAttendant = () => (
  <div style={{
    background: '#FAFBFC', color: '#0F1729', borderRadius: 14, padding: 18,
    boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <Pill tone="brand" style={{ fontSize: 10 }}>Atendente</Pill>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <PulseDot color="#1E7A53" size={6} />
        <span className="t2m-mono" style={{ fontSize: 10, color: '#4A5763' }}>AO VIVO</span>
      </div>
    </div>
    <div style={{
      background: 'var(--t2m-primary-50)', borderRadius: 10, padding: 14,
      borderLeft: '3px solid var(--t2m-primary)', marginBottom: 12,
    }}>
      <div className="t2m-mono" style={{ fontSize: 9, color: 'var(--t2m-text-3)', letterSpacing: '0.1em', marginBottom: 6 }}>CLIENTE SINALIZOU · 14:32</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--t2m-primary)' }}>
        "Quero pagar no crédito em duas vezes."
      </div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      {['Confirma valor R$ 87,40?', 'Comprovante impresso?'].map(t => (
        <div key={t} style={{
          padding: '10px 12px', background: 'var(--t2m-primary)', color: '#fff',
          fontSize: 12, fontWeight: 600, borderRadius: 8, textAlign: 'center',
        }}>{t}</div>
      ))}
    </div>
  </div>
);

const DemoPreviewClient = () => (
  <div style={{
    background: '#0F1729', color: '#fff', borderRadius: 14, padding: 18,
    boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <Pill tone="dark" style={{ fontSize: 10 }}>Cliente</Pill>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <PulseDot color="#33D6C6" size={6} />
        <span className="t2m-mono" style={{ fontSize: 10, opacity: 0.8 }}>LIBRAS</span>
      </div>
    </div>
    <div style={{
      background: 'linear-gradient(160deg, #191970 0%, #2E2E8C 100%)',
      borderRadius: 10, padding: 16, marginBottom: 12, display: 'grid', placeItems: 'center',
    }}>
      <AvatarMini />
    </div>
    <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
      "Confirma valor R$ 87,40?"
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      <div style={{ padding: '12px 8px', background: '#0E9A8D', borderRadius: 8, fontSize: 14, fontWeight: 700, textAlign: 'center' }}>Sim</div>
      <div style={{ padding: '12px 8px', background: 'rgba(255,255,255,0.12)', borderRadius: 8, fontSize: 14, fontWeight: 700, textAlign: 'center' }}>Não</div>
    </div>
  </div>
);

window.LandingPage = LandingPage;
