// ds-section-tokens.jsx — Spacing / radius / shadow / motion + tokens reference

const SpacingArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="06 · Tokens"
      title="Espaçamento, raio, sombra, movimento"
      sub="Escala 4px. Cantos arredondados aumentam com o tamanho do contêiner. Sombras suaves; foco sempre visível."
    />

    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Spacing · base 4px</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 28 }}>
      {[
        ['1', 4], ['2', 8], ['3', 12], ['4', 16], ['5', 20], ['6', 24],
        ['7', 32], ['8', 40], ['9', 48], ['10', 64], ['11', 80], ['12', 96],
      ].map(([n, px]) => (
        <div key={n} style={{
          border: '1px solid var(--t2m-border-subtle)', borderRadius: 10,
          padding: 14, background: 'var(--t2m-surface)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 56 }}>
            <div style={{
              width: px, height: px, background: 'var(--t2m-primary-100)',
              border: '1px solid var(--t2m-primary)', borderRadius: 4,
            }} />
          </div>
          <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600, marginTop: 8 }}>spacing.{n}</div>
          <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)' }}>{px}px</div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
      <div>
        <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Radius</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {[['sm', 4], ['md', 8], ['lg', 12], ['xl', 20], ['full', 9999]].map(([n, r]) => (
            <div key={n} style={{
              border: '1px solid var(--t2m-border-subtle)', borderRadius: 10,
              padding: 12, background: 'var(--t2m-surface)', textAlign: 'center',
            }}>
              <div style={{
                width: 56, height: 56, margin: '0 auto',
                background: 'var(--t2m-primary)', borderRadius: r,
              }} />
              <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600, marginTop: 8 }}>radius.{n}</div>
              <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)' }}>{r === 9999 ? 'pill' : r + 'px'}</div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Shadow</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {[
            ['sm', '0 1px 2px rgba(15,23,41,0.08)'],
            ['md', '0 4px 12px rgba(15,23,41,0.10)'],
            ['lg', '0 12px 32px rgba(15,23,41,0.14)'],
            ['focus', '0 0 0 4px rgba(74,74,171,0.35)'],
          ].map(([n, s]) => (
            <div key={n} style={{
              padding: 16, background: 'var(--t2m-subdued)', borderRadius: 12,
              textAlign: 'center',
            }}>
              <div style={{
                width: 56, height: 56, margin: '0 auto',
                background: '#FFFFFF', borderRadius: 8, boxShadow: s,
                border: n === 'focus' ? '2px solid #4A4AAB' : 'none',
              }} />
              <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600, marginTop: 12 }}>shadow.{n}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600 }}>Motion</h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
      {[
        ['duration.fast', '120ms', 'micro feedback (botões)'],
        ['duration.normal', '220ms', 'transições padrão (modals)'],
        ['duration.slow', '360ms', 'mudanças de tela'],
      ].map(([n, v, d]) => (
        <Card key={n} style={{ padding: 16 }}>
          <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600 }}>{n}</div>
          <div className="t2m-h" style={{ fontSize: 22, fontWeight: 600, color: 'var(--t2m-primary)', margin: '4px 0' }}>{v}</div>
          <div style={{ fontSize: 12, color: 'var(--t2m-text-2)' }}>{d}</div>
        </Card>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      {[
        ['easing.default', 'cubic-bezier(0.2, 0, 0.2, 1)', 'todas as transições UI'],
        ['easing.emphasized', 'cubic-bezier(0.3, 0, 0, 1)', 'entradas e enfatizar mudança'],
      ].map(([n, v, d]) => (
        <Card key={n} style={{ padding: 16 }}>
          <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600 }}>{n}</div>
          <div className="t2m-mono" style={{ fontSize: 13, color: 'var(--t2m-primary)', margin: '4px 0' }}>{v}</div>
          <div style={{ fontSize: 12, color: 'var(--t2m-text-2)' }}>{d}</div>
        </Card>
      ))}
    </div>
  </div>
);

// ── Tokens reference (full table for handoff) ──
const TokensReferenceArtboard = () => {
  const T = window.T2M_TOKENS;
  const Row = ({ k, v, sample }) => (
    <div style={{
      display: 'grid', gridTemplateColumns: '180px 1fr 28px',
      gap: 12, alignItems: 'center', padding: '6px 0',
      borderBottom: '1px solid var(--t2m-border-subtle)',
    }}>
      <div className="t2m-mono" style={{ fontSize: 11, fontWeight: 600 }}>{k}</div>
      <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-2)' }}>{v}</div>
      {sample !== undefined && (
        <div style={{ width: 24, height: 24, borderRadius: 4, background: sample, border: '1px solid var(--t2m-border-subtle)' }} />
      )}
    </div>
  );

  const colorEntries = [
    ['brand.primary', T.color.brand.primary],
    ['brand.secondary', T.color.brand.secondary],
    ['background.default', T.color.background.default],
    ['background.muted', T.color.background.muted],
    ['surface.default', T.color.surface.default],
    ['surface.elevated', T.color.surface.elevated],
    ['text.primary', T.color.text.primary],
    ['text.secondary', T.color.text.secondary],
    ['text.inverse', T.color.text.inverse],
    ['border.default', T.color.border.default],
    ['border.strong', T.color.border.strong],
    ['feedback.success', T.color.feedback.success],
    ['feedback.warning', T.color.feedback.warning],
    ['feedback.error', T.color.feedback.error],
    ['feedback.info', T.color.feedback.info],
    ['state.hover', '#191970 · 8%'],
    ['state.active', '#191970 · 16%'],
    ['state.focus', T.color.state.focus],
    ['state.disabled', T.color.state.disabled],
  ];

  return (
    <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
      <SectionHeading
        kicker="07 · Tokens"
        title="Referência completa"
        sub="Tabela única para handoff de engenharia. Disponível como JSON em `T2M_TOKENS` no escopo global."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
            <h3 className="t2m-h" style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Color tokens</h3>
            <Pill>19 entries</Pill>
          </div>
          {colorEntries.map(([k, v]) => (
            <Row key={k} k={k} v={typeof v === 'string' && v.startsWith('#') ? v : v} sample={typeof v === 'string' && v.startsWith('#') ? v : undefined} />
          ))}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
            <h3 className="t2m-h" style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Type · Spacing · Radius · Motion</h3>
          </div>
          <Row k="font.family.heading" v={'"IBM Plex Sans"'} />
          <Row k="font.family.body" v={'"IBM Plex Sans"'} />
          <Row k="font.family.mono" v={'"IBM Plex Mono"'} />
          {Object.entries(T.type.size).map(([k, v]) => <Row key={k} k={`font.size.${k}`} v={v} />)}
          {Object.entries(T.type.weight).map(([k, v]) => <Row key={k} k={`font.weight.${k}`} v={String(v)} />)}
          {Object.entries(T.type.lineHeight).map(([k, v]) => <Row key={k} k={`line.height.${k}`} v={String(v)} />)}
          {Object.entries(T.spacing).map(([k, v]) => <Row key={k} k={`spacing.${k}`} v={v} />)}
          {Object.entries(T.radius).map(([k, v]) => <Row key={k} k={`radius.${k}`} v={v} />)}
          {Object.entries(T.motion.duration).map(([k, v]) => <Row key={k} k={`duration.${k}`} v={v} />)}
          {Object.entries(T.motion.easing).map(([k, v]) => <Row key={k} k={`easing.${k}`} v={v} />)}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { SpacingArtboard, TokensReferenceArtboard });
