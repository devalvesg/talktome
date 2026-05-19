// ds-section-typography.jsx — Typography with 3 tweaks

const TypeTweakCard = ({ label, tone, head, body, mono, why, ctx, primary }) => (
  <div style={{
    border: primary ? '2px solid var(--t2m-primary)' : '1px solid var(--t2m-border-subtle)',
    borderRadius: 14, background: 'var(--t2m-surface)', overflow: 'hidden',
    boxShadow: primary ? 'var(--t2m-shadow-md)' : 'var(--t2m-shadow-sm)',
  }}>
    <div style={{
      padding: '14px 18px',
      background: primary ? 'var(--t2m-primary)' : 'var(--t2m-subdued)',
      color: primary ? '#fff' : 'var(--t2m-text)',
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
    }}>
      <div>
        <div className="t2m-mono" style={{
          fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
          opacity: 0.75,
        }}>{label}</div>
        <div className="t2m-h" style={{ fontWeight: 600, fontSize: 18, marginTop: 2 }}>{tone}</div>
      </div>
      {primary && <Pill tone="brand">recomendada</Pill>}
    </div>

    <div style={{ padding: 22 }}>
      {/* Heading sample */}
      <div style={{
        fontFamily: head.family, fontWeight: 700, fontSize: 42,
        lineHeight: 1.1, letterSpacing: '-0.02em',
        color: 'var(--t2m-primary)', marginBottom: 6,
      }}>Acessível</div>
      <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', marginBottom: 18 }}>
        Heading · {head.name}
      </div>

      {/* Body sample */}
      <div style={{
        fontFamily: body.family, fontSize: 16, lineHeight: 1.55,
        color: 'var(--t2m-text)', marginBottom: 6,
      }}>
        O Talk2Me traduz áudio para Libras em tempo real,
        ajudando atendentes e clientes a se comunicarem com clareza no balcão.
      </div>
      <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', marginBottom: 18 }}>
        Body · {body.name}
      </div>

      {/* Mono sample */}
      <div style={{
        fontFamily: mono.family, fontSize: 14,
        color: 'var(--t2m-text)', marginBottom: 6,
        letterSpacing: '0.02em',
      }}>
        2025 · 14:32 · #PED-00482 · R$ 24,90
      </div>
      <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>
        Numbers · {mono.name}
      </div>

      <div style={{
        marginTop: 18, padding: '12px 14px',
        background: 'var(--t2m-subdued)', borderRadius: 8,
        fontSize: 12.5, lineHeight: 1.5, color: 'var(--t2m-text-2)',
      }}>
        <div style={{ marginBottom: 6 }}><strong>Por quê:</strong> {why}</div>
        <div><strong>Onde usar:</strong> {ctx}</div>
      </div>
    </div>
  </div>
);

const TypographyArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="05 · Tipografia"
      title="Três tweaks de tipografia"
      sub="Três pareamentos válidos. Trocar entre eles é um ajuste do sistema — use o painel Tweaks no canto inferior direito. Todas usam métricas humanísticas e suportam números tabulares para preços."
    />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 32 }}>
      <TypeTweakCard
        label="Tweak 1"
        tone="Institucional · Confiável"
        head={{ name: 'IBM Plex Sans 700', family: '"IBM Plex Sans", sans-serif' }}
        body={{ name: 'IBM Plex Sans 400', family: '"IBM Plex Sans", sans-serif' }}
        mono={{ name: 'IBM Plex Mono 500', family: '"IBM Plex Mono", monospace' }}
        why="IBM Plex foi desenhada para sistemas de informação críticos. Transmite seriedade sem ser fria; tem ótima legibilidade em telas pequenas."
        ctx="Dashboard administrativo, relatórios, comunicação institucional do supermercado."
        primary
      />
      <TypeTweakCard
        label="Tweak 2"
        tone="Moderno · Tecnológico"
        head={{ name: 'Space Grotesk 700', family: '"Space Grotesk", sans-serif' }}
        body={{ name: 'Manrope 500', family: '"Manrope", sans-serif' }}
        mono={{ name: 'JetBrains Mono 500', family: '"JetBrains Mono", monospace' }}
        why="Space Grotesk traz personalidade geométrica e contemporânea; Manrope é otimizada para UI moderna em smartphones e tablets."
        ctx="App mobile, totens de autoatendimento, landing institucional."
      />
      <TypeTweakCard
        label="Tweak 3"
        tone="Humano · Acessível"
        head={{ name: 'Lexend 600', family: '"Lexend", sans-serif' }}
        body={{ name: 'Atkinson Hyperlegible 400', family: '"Atkinson Hyperlegible", sans-serif' }}
        mono={{ name: 'IBM Plex Mono 500', family: '"IBM Plex Mono", monospace' }}
        why="Atkinson Hyperlegible foi desenvolvida pela Braille Institute para baixa visão; Lexend reduz a carga cognitiva da leitura."
        ctx="Telas voltadas ao cliente final, idosos, baixa visão, dislexia. Recomendada como padrão de fábrica em totens."
      />
    </div>

    {/* Scale */}
    <Divider label="Escala tipográfica" />
    <div style={{
      display: 'grid', gridTemplateColumns: '160px 1fr 120px', gap: '4px 24px',
      alignItems: 'baseline',
    }}>
      {[
        ['font.size.4xl', '48px', 700, 'Display'],
        ['font.size.3xl', '36px', 700, 'Title H1'],
        ['font.size.2xl', '28px', 600, 'Title H2'],
        ['font.size.xl',  '22px', 600, 'Title H3'],
        ['font.size.lg',  '18px', 500, 'Body large'],
        ['font.size.md',  '16px', 400, 'Body default'],
        ['font.size.sm',  '14px', 400, 'Caption'],
        ['font.size.xs',  '12px', 500, 'Overline'],
      ].map(([tk, sz, w, role]) => (
        <React.Fragment key={tk}>
          <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', paddingTop: 8 }}>{tk}</div>
          <div style={{
            fontSize: sz, fontWeight: w, lineHeight: 1.2,
            color: 'var(--t2m-text)', borderBottom: '1px solid var(--t2m-border-subtle)',
            paddingBottom: 8, paddingTop: 8,
          }}>{role} · A acessibilidade conversa</div>
          <div className="t2m-mono" style={{
            fontSize: 11, color: 'var(--t2m-text-3)', textAlign: 'right', paddingTop: 8,
          }}>{sz} · {w}</div>
        </React.Fragment>
      ))}
    </div>

    {/* Weights + line heights */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 28 }}>
      <Card>
        <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Pesos</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {[['regular', 400], ['medium', 500], ['semibold', 600], ['bold', 700]].map(([n, w]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 18, fontWeight: w }}>Conversa entre pessoas</span>
              <span className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>{n} · {w}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>Entrelinhas</div>
        <div style={{ display: 'grid', gap: 12 }}>
          {[['tight · 1.2', 1.2], ['normal · 1.5', 1.5], ['relaxed · 1.7', 1.7]].map(([n, lh]) => (
            <div key={n}>
              <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', marginBottom: 4 }}>{n}</div>
              <div style={{ fontSize: 14, lineHeight: lh, color: 'var(--t2m-text-2)' }}>
                A pessoa surda aponta para o produto. O atendente fala. A tela mostra os dois.
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

window.TypographyArtboard = TypographyArtboard;
