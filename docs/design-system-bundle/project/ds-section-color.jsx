// ds-section-color.jsx — Color palette

const Swatch = ({ name, hex, fg, sub, tall }) => (
  <div style={{
    background: hex, color: fg || '#FFFFFF',
    borderRadius: 10, padding: 14, minHeight: tall ? 110 : 88,
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    border: hex.toUpperCase() === '#FFFFFF' ? '1px solid var(--t2m-border)' : 'none',
  }}>
    <div style={{ fontSize: 13, fontWeight: 600 }} className="t2m-h">{name}</div>
    <div>
      <div className="t2m-mono" style={{ fontSize: 11, opacity: 0.85 }}>{hex.toUpperCase()}</div>
      {sub && <div className="t2m-mono" style={{ fontSize: 10, opacity: 0.7 }}>{sub}</div>}
    </div>
  </div>
);

const ColorPaletteArtboard = () => {
  const T = window.T2M_TOKENS.color;
  const ramp = [
    ['50', T.brand.primary50, '#191970'],
    ['100', T.brand.primary100, '#191970'],
    ['200', T.brand.primary200, '#0F0F44'],
    ['300', T.brand.primary300, '#FFFFFF'],
    ['400', T.brand.primary400, '#FFFFFF'],
    ['500', T.brand.primary500, '#FFFFFF'],
    ['600 · base', T.brand.primary600, '#FFFFFF'],
    ['700', T.brand.primary700, '#FFFFFF'],
    ['800', T.brand.primary800, '#FFFFFF'],
    ['900', T.brand.primary900, '#FFFFFF'],
  ];

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="04 · Cor"
        title="Paleta de cores"
        sub="Base obrigatória: Midnight Blue #191970 + cinza #ECEFF1. Adicionamos um teal de ação (#0E9A8D) — segunda voz para CTAs e estados ativos."
      />

      {/* Brand primary ramp */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 className="t2m-h" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Brand · Midnight Blue</h3>
          <Pill tone="brand">brand.primary</Pill>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6 }}>
          {ramp.map(([n, hex, fg]) => (
            <Swatch key={n} name={n} hex={hex} fg={fg} />
          ))}
        </div>
      </div>

      {/* Secondary + neutrals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 className="t2m-h" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Secondary · Teal</h3>
            <Pill tone="brand">brand.secondary</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            <Swatch name="100" hex="#B8E7E2" fg="#076058" />
            <Swatch name="500 · base" hex="#0E9A8D" fg="#FFFFFF" />
            <Swatch name="700" hex="#076058" fg="#FFFFFF" />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 className="t2m-h" style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Neutrals</h3>
            <Pill>background · surface</Pill>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            <Swatch name="bg.default" hex="#FAFBFC" fg="#0F1729" />
            <Swatch name="bg.muted" hex="#ECEFF1" fg="#0F1729" sub="base" />
            <Swatch name="surface" hex="#FFFFFF" fg="#0F1729" />
            <Swatch name="bg.inverse" hex="#0A0A2D" fg="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Text + border */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <div>
          <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Texto</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              ['text.primary', '#0F1729', 'Conteúdo principal · Contraste 16.4:1'],
              ['text.secondary', '#4A5763', 'Subtítulos e descrições · 7.8:1'],
              ['text.tertiary', '#7A8794', 'Auxiliar · 4.6:1'],
              ['text.inverse', '#FFFFFF', 'Sobre fundo escuro'],
            ].map(([n, h, d]) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', border: '1px solid var(--t2m-border-subtle)', borderRadius: 8,
              }}>
                <div style={{ width: 28, height: 28, background: h, borderRadius: 6, border: h === '#FFFFFF' ? '1px solid var(--t2m-border)' : 'none' }} />
                <div style={{ flex: 1 }}>
                  <div className="t2m-mono" style={{ fontSize: 12, fontWeight: 600 }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'var(--t2m-text-2)' }}>{d}</div>
                </div>
                <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>{h}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Bordas</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              ['border.subtle', '#E4E9EC'],
              ['border.default', '#CFD8DC'],
              ['border.strong', '#90A4AE'],
              ['border.brand', '#191970'],
            ].map(([n, h]) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', border: '1px solid var(--t2m-border-subtle)', borderRadius: 8,
              }}>
                <div style={{ width: 60, height: 28, background: 'transparent', border: `2px solid ${h}`, borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div className="t2m-mono" style={{ fontSize: 12, fontWeight: 600 }}>{n}</div>
                </div>
                <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)' }}>{h}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback */}
      <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Feedback</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          ['Success', '#1E7A53', '#E5F4EC'],
          ['Warning', '#A8650F', '#FDF1DA'],
          ['Error', '#B0202F', '#FBE7E9'],
          ['Info', '#1A5FB4', '#E4EEFB'],
        ].map(([n, h, bg]) => (
          <div key={n} style={{
            borderRadius: 10, overflow: 'hidden', border: '1px solid var(--t2m-border-subtle)',
          }}>
            <div style={{ background: h, color: '#fff', padding: 12 }}>
              <div className="t2m-h" style={{ fontWeight: 600, fontSize: 14 }}>{n}</div>
              <div className="t2m-mono" style={{ fontSize: 11, opacity: 0.85 }}>{h}</div>
            </div>
            <div style={{ background: bg, padding: 10 }}>
              <div className="t2m-mono" style={{ fontSize: 11, color: h }}>{bg} · background</div>
            </div>
          </div>
        ))}
      </div>

      {/* States */}
      <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Estados interativos</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {[
          ['hover', 'rgba(25,25,112,0.08)'],
          ['active', 'rgba(25,25,112,0.16)'],
          ['focus', '#4A4AAB'],
          ['disabled', '#CFD8DC'],
        ].map(([n, c]) => (
          <div key={n} style={{
            border: '1px solid var(--t2m-border-subtle)', borderRadius: 10, padding: 14,
            background: 'var(--t2m-surface)',
          }}>
            <div style={{
              height: 40, borderRadius: 8, background: c,
              border: n === 'focus' ? '2px solid #4A4AAB' : 'none',
              boxShadow: n === 'focus' ? '0 0 0 4px rgba(74,74,171,0.35)' : 'none',
            }} />
            <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600, marginTop: 8 }}>state.{n}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

window.ColorPaletteArtboard = ColorPaletteArtboard;
