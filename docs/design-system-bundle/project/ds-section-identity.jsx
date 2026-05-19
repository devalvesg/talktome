// ds-section-identity.jsx — Identity overview + Logo system

// ── The Talk2Me mark ──
// Concept: A circle (universal "everyone"/community) containing two abstract
// speech bubbles forming a hand-like shape. The "2" sits in the negative
// space between them, suggesting "Talk → Me" (audio → libras). One bubble
// faces left (the sign speaker), one faces right (the audio speaker).

const T2MMark = ({ size = 64, fg = '#191970', bg = 'transparent', accent }) => {
  const a = accent || fg;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-label="Talk2Me">
      {bg !== 'transparent' && <circle cx="32" cy="32" r="32" fill={bg} />}
      {/* Outer ring */}
      <circle cx="32" cy="32" r="29" fill="none" stroke={fg} strokeWidth="3.5" />
      {/* Left bubble (audio in) */}
      <path
        d="M 18 22 Q 18 16 24 16 L 30 16 Q 36 16 36 22 L 36 30 Q 36 36 30 36 L 27 36 L 22 41 L 22 36 L 24 36 Q 18 36 18 30 Z"
        fill={fg}
      />
      {/* Right bubble (libras out) — mirrored */}
      <path
        d="M 46 42 Q 46 48 40 48 L 34 48 Q 28 48 28 42 L 28 34 Q 28 28 34 28 L 37 28 L 42 23 L 42 28 L 40 28 Q 46 28 46 34 Z"
        fill={a}
        opacity="0.9"
      />
      {/* Center pivot dot */}
      <circle cx="32" cy="32" r="2.4" fill={bg === 'transparent' ? '#FFFFFF' : bg} />
    </svg>
  );
};

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

window.T2MMark = T2MMark;
window.T2MWordmark = T2MWordmark;

// ════════════════════════════════════════════════════════════════════════
// Section: Identity overview
// ════════════════════════════════════════════════════════════════════════

const IdentityOverviewArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
      <T2MMark size={80} accent="#0E9A8D" />
      <div>
        <div className="t2m-mono" style={{
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--t2m-text-3)',
        }}>Design System · v1.0</div>
        <h1 className="t2m-h" style={{
          fontSize: 56, fontWeight: 700, lineHeight: 1, margin: '6px 0 0',
          color: 'var(--t2m-primary)', letterSpacing: '-0.03em',
        }}>Talk<span style={{ color: '#0E9A8D' }}>2</span>Me</h1>
      </div>
    </div>

    <p style={{
      fontSize: 20, lineHeight: 1.5, color: 'var(--t2m-text)',
      maxWidth: 720, margin: '0 0 40px',
    }}>
      Acessibilidade entre <strong>áudio</strong> e <strong>Libras</strong>
      &nbsp;no balcão do supermercado. Um sistema visual para tablets,
      totens, celulares de equipe e dashboards — feito para alta legibilidade,
      contraste alto e toques rápidos.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      {[
        ['Acessibilidade', 'WCAG AA · Toques ≥44px'],
        ['Confiança', 'Tipografia institucional'],
        ['Clareza', 'Hierarquia, contraste, espaço'],
        ['Inclusão', 'Bilíngue: voz + Libras'],
      ].map(([t, s]) => (
        <div key={t} style={{
          padding: '16px 18px',
          borderTop: '3px solid var(--t2m-primary)',
          background: 'var(--t2m-subdued)',
          borderRadius: '0 0 8px 8px',
        }}>
          <div className="t2m-h" style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{t}</div>
          <div style={{ fontSize: 13, color: 'var(--t2m-text-2)', lineHeight: 1.45 }}>{s}</div>
        </div>
      ))}
    </div>

    <Divider label="Princípios" />

    <ol style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 32px',
      margin: 0, padding: 0, listStyle: 'none', counterReset: 'p',
    }}>
      {[
        ['Comunicação primeiro', 'A interface se cala para que a conversa apareça.'],
        ['Toque grande, dúvida pequena', 'Hit area mínima 44px; rótulos sempre presentes.'],
        ['Estados visíveis', 'Microfone, câmera e conexão sempre sinalizados.'],
        ['Erros amigáveis', 'Linguagem simples; sempre ofereça o próximo passo.'],
      ].map(([t, s], i) => (
        <li key={t} style={{ display: 'flex', gap: 14, counterIncrement: 'p' }}>
          <div className="t2m-mono" style={{
            flex: '0 0 32px', height: 32, borderRadius: '50%',
            background: 'var(--t2m-primary)', color: '#fff',
            display: 'grid', placeItems: 'center',
            fontWeight: 600, fontSize: 13,
          }}>{`0${i + 1}`}</div>
          <div>
            <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15 }}>{t}</div>
            <div style={{ fontSize: 13, color: 'var(--t2m-text-2)', lineHeight: 1.5 }}>{s}</div>
          </div>
        </li>
      ))}
    </ol>
  </div>
);

// ════════════════════════════════════════════════════════════════════════
// Section: Logo concept
// ════════════════════════════════════════════════════════════════════════

const LogoConceptArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="01 · Logo"
      title="Conceito"
      sub="A marca une dois balões de fala em um círculo — uma conversa contínua, simétrica, sem hierarquia. O “2” no nome marca a tradução entre dois mundos: voz e Libras."
    />

    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'center' }}>
      <div style={{
        background: 'var(--t2m-muted)', borderRadius: 16,
        padding: 60, display: 'grid', placeItems: 'center', minHeight: 320,
      }}>
        <T2MMark size={240} accent="#0E9A8D" />
      </div>
      <div>
        {[
          ['Círculo', 'Inclusão, comunidade, totalidade — o supermercado como espaço de encontro.'],
          ['Balão esquerdo (azul)', 'Quem fala — voz, áudio, atendente.'],
          ['Balão direito (teal)', 'Quem sinaliza — Libras, cliente surdo.'],
          ['Encontro no centro', 'A tradução acontece aqui. Dois mundos no mesmo ponto.'],
        ].map(([t, s]) => (
          <div key={t} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--t2m-border-subtle)' }}>
            <div style={{ flex: '0 0 8px', marginTop: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--t2m-primary)' }} />
            <div>
              <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15 }}>{t}</div>
              <div style={{ fontSize: 13, color: 'var(--t2m-text-2)', lineHeight: 1.5, marginTop: 2 }}>{s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════
// Section: Logo versions
// ════════════════════════════════════════════════════════════════════════

const LogoVersionsArtboard = () => {
  const tile = (label, bg, content, ringColor) => (
    <div style={{
      background: bg, border: ringColor ? `1px solid ${ringColor}` : 'none',
      borderRadius: 12, padding: 32, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 200,
    }}>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>{content}</div>
      <div className="t2m-mono" style={{
        fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: bg === '#0A0A2D' ? '#90A4AE' : 'var(--t2m-text-3)',
      }}>{label}</div>
    </div>
  );

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="02 · Versões"
        title="Versões da logo"
        sub="Três versões cobrem todos os tamanhos e suportes — do favicon ao totem. Sempre prefira a versão principal quando há espaço."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
        {tile('Principal · Wordmark', 'var(--t2m-subdued)',
          <T2MWordmark height={42} />, 'var(--t2m-border-subtle)')}
        {tile('Reduzida · Ícone', 'var(--t2m-subdued)',
          <T2MMark size={90} accent="#0E9A8D" />, 'var(--t2m-border-subtle)')}
        {tile('Monocromática', 'var(--t2m-subdued)',
          <T2MMark size={90} fg="#0F1729" accent="#0F1729" />, 'var(--t2m-border-subtle)')}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {tile('Fundo claro', '#FFFFFF',
          <T2MWordmark height={36} />, 'var(--t2m-border)')}
        {tile('Fundo escuro', '#0A0A2D',
          <T2MWordmark height={36} color="#FFFFFF" accent="#33D6C6" />)}
      </div>

      {/* Clear space */}
      <Divider label="Área de respiro" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
        <div style={{
          background: 'var(--t2m-subdued)', borderRadius: 12, padding: 24,
          position: 'relative',
        }}>
          <div style={{
            position: 'relative', display: 'inline-block',
            outline: '1px dashed var(--t2m-primary)', outlineOffset: 24,
          }}>
            <T2MWordmark height={32} />
            {/* X markers */}
            {[[-24, -24], [-24, 'calc(100% + 24px)'], ['calc(100% + 24px)', -24], ['calc(100% + 24px)', 'calc(100% + 24px)']].map(([t, l], i) => (
              <div key={i} className="t2m-mono" style={{
                position: 'absolute', top: t, left: l,
                width: 16, height: 16, transform: 'translate(-50%, -50%)',
                color: 'var(--t2m-primary)', fontSize: 12,
                display: 'grid', placeItems: 'center',
              }}>×</div>
            ))}
          </div>
        </div>
        <div>
          <div className="t2m-h" style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>x = altura do ícone</div>
          <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--t2m-text-2)', margin: 0 }}>
            Mantenha pelo menos <strong>1×</strong> de respiro ao redor da marca.
            Em totens e materiais impressos, prefira <strong>1.5×</strong>.
            Nunca aproxime outros elementos visuais da logo.
          </p>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════
// Section: Logo usage do / don't
// ════════════════════════════════════════════════════════════════════════

const LogoUsageArtboard = () => {
  const Item = ({ ok, label, children }) => (
    <div style={{
      borderRadius: 12, overflow: 'hidden',
      border: `2px solid ${ok ? 'var(--t2m-success)' : 'var(--t2m-error)'}`,
    }}>
      <div style={{
        height: 130, display: 'grid', placeItems: 'center',
        background: 'var(--t2m-subdued)',
      }}>{children}</div>
      <div style={{
        padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8,
        background: ok ? 'var(--t2m-success-bg)' : 'var(--t2m-error-bg)',
        color: ok ? 'var(--t2m-success)' : 'var(--t2m-error)',
        fontSize: 13, fontWeight: 600,
      }}>
        <span style={{ fontSize: 16 }}>{ok ? '✓' : '✕'}</span>
        {label}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="03 · Uso"
        title="Uso correto e incorreto"
        sub="A marca preserva sua integridade quando respeitada a proporção, a cor e o respiro. Evite as distorções abaixo."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <Item ok label="Cores da paleta">
          <T2MWordmark height={28} />
        </Item>
        <Item ok label="Fundo escuro com versão clara">
          <div style={{ background: '#0A0A2D', padding: '16px 24px', borderRadius: 8 }}>
            <T2MWordmark height={28} color="#FFFFFF" accent="#33D6C6" />
          </div>
        </Item>
        <Item ok label="Monocromática quando necessário">
          <T2MWordmark height={28} color="#0F1729" accent="#0F1729" />
        </Item>

        <Item ok={false} label="Não distorça a proporção">
          <div style={{ transform: 'scaleX(1.6)' }}>
            <T2MWordmark height={24} />
          </div>
        </Item>
        <Item ok={false} label="Não use cores fora da paleta">
          <T2MWordmark height={28} color="#C62828" accent="#FFB300" />
        </Item>
        <Item ok={false} label="Não use sobre fundo de baixo contraste">
          <div style={{ background: '#4A4AAB', padding: '16px 24px', borderRadius: 8 }}>
            <T2MWordmark height={28} />
          </div>
        </Item>
      </div>
    </div>
  );
};

Object.assign(window, {
  IdentityOverviewArtboard,
  LogoConceptArtboard,
  LogoVersionsArtboard,
  LogoUsageArtboard,
});
