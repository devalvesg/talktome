// ds-main.jsx — Compose all sections into a single DesignCanvas

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typeChoice": "institutional",
  "showProductOnly": false
}/*EDITMODE-END*/;

const TYPE_FAMILIES = {
  institutional: {
    label: 'Institucional · IBM Plex',
    head: '"IBM Plex Sans", system-ui, sans-serif',
    body: '"IBM Plex Sans", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  tech: {
    label: 'Tecnológico · Space Grotesk',
    head: '"Space Grotesk", system-ui, sans-serif',
    body: '"Manrope", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  humane: {
    label: 'Humano · Lexend',
    head: '"Lexend", system-ui, sans-serif',
    body: '"Atkinson Hyperlegible", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
};

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply type tweak globally
  React.useEffect(() => {
    const f = TYPE_FAMILIES[t.typeChoice] || TYPE_FAMILIES.institutional;
    const root = document.documentElement;
    root.style.setProperty('--t2m-head', f.head);
    root.style.setProperty('--t2m-body', f.body);
    root.style.setProperty('--t2m-mono', f.mono);
  }, [t.typeChoice]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="identity" title="Identidade & Logo" subtitle="Conceito, versões e uso da marca">
          <DCArtboard id="identity-overview" label="00 · Visão geral" width={920} height={720}>
            <IdentityOverviewArtboard />
          </DCArtboard>
          <DCArtboard id="logo-concept" label="01 · Conceito da logo" width={920} height={680}>
            <LogoConceptArtboard />
          </DCArtboard>
          <DCArtboard id="logo-versions" label="02 · Versões" width={920} height={920}>
            <LogoVersionsArtboard />
          </DCArtboard>
          <DCArtboard id="logo-usage" label="03 · Uso correto e incorreto" width={920} height={720}>
            <LogoUsageArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="color" title="Paleta de cores" subtitle="Brand, neutrals, feedback e estados">
          <DCArtboard id="palette" label="04 · Paleta completa" width={1080} height={1180}>
            <ColorPaletteArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="type" title="Tipografia" subtitle="Três tweaks selecionáveis + escala">
          <DCArtboard id="typography" label="05 · Tipografia & 3 tweaks" width={1240} height={1440}>
            <TypographyArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="tokens" title="Design Tokens" subtitle="Spacing, radius, shadow, motion + handoff">
          <DCArtboard id="tokens-vis" label="06 · Tokens visuais" width={1080} height={1040}>
            <SpacingArtboard />
          </DCArtboard>
          <DCArtboard id="tokens-ref" label="07 · Referência completa" width={1080} height={1320}>
            <TokensReferenceArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="components" title="Componentes" subtitle="Núcleo do Design System">
          <DCArtboard id="buttons" label="08 · Botões" width={960} height={860}>
            <ButtonsArtboard />
          </DCArtboard>
          <DCArtboard id="inputs" label="09 · Inputs" width={960} height={760}>
            <InputsArtboard />
          </DCArtboard>
          <DCArtboard id="cards" label="10 · Cards" width={1000} height={1080}>
            <CardsArtboard />
          </DCArtboard>
          <DCArtboard id="header" label="11 · Header / Topbar" width={1000} height={560}>
            <HeaderArtboard />
          </DCArtboard>
          <DCArtboard id="nav" label="12 · Navigation" width={1000} height={820}>
            <NavArtboard />
          </DCArtboard>
          <DCArtboard id="feedback" label="13 · Feedback visual" width={1040} height={1080}>
            <FeedbackArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="product" title="Componentes do produto" subtitle="Específicos do Talk2Me — tradução áudio ↔ Libras">
          <DCArtboard id="product-components" label="14 · Componentes específicos" width={1200} height={1480}>
            <ProductComponentsArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="a11y" title="Acessibilidade" subtitle="Regras práticas + checklist WCAG">
          <DCArtboard id="a11y" label="15 · Acessibilidade" width={1100} height={1120}>
            <AccessibilityArtboard />
          </DCArtboard>
        </DCSection>

        <DCSection id="screens" title="Exemplos de tela" subtitle="Tablet de balcão, totem, mobile da equipe">
          <DCArtboard id="screens" label="16 · Aplicações" width={1140} height={2080}>
            <ScreensArtboard />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel>
        <TweakSection label="Tipografia">
          <TweakSelect
            label="Family pairing"
            value={t.typeChoice}
            options={[
              { value: 'institutional', label: 'Institucional · IBM Plex' },
              { value: 'tech', label: 'Tecnológico · Space Grotesk + Manrope' },
              { value: 'humane', label: 'Humano · Lexend + Atkinson Hyperlegible' },
            ]}
            onChange={(v) => setTweak('typeChoice', v)}
          />
          <div style={{
            fontSize: 11, color: 'rgba(0,0,0,0.55)', lineHeight: 1.5, marginTop: 6,
          }}>
            Aplicado globalmente em todas as seções do Design System.
          </div>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
