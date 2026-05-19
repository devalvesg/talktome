// screens-main.jsx — Compose all Talk2Me product screens into a DesignCanvas

const ScreensApp = () => (
  <>
    <DesignCanvas>
      <DCSection id="landing" title="Landing page" subtitle="Site institucional · marketing">
        <DCArtboard id="landing-page" label="01 · Landing completa" width={1280} height={3960}>
          <LandingPage />
        </DCArtboard>
      </DCSection>

      <DCSection id="home" title="Home do sistema" subtitle="Pareamento de dispositivos + estados">
        <DCArtboard id="home-main" label="02 · Home · estados em vivo" width={1180} height={900}>
          <HomeScreen />
        </DCArtboard>
        <DCArtboard id="home-states" label="02.b · Variações" width={1180} height={300}>
          <HomeVariationsRow />
        </DCArtboard>
      </DCSection>

      <DCSection id="attendant" title="Tela do atendente" subtitle="Interativa · sincronizada com a tela do cliente abaixo">
        <DCArtboard id="attendant-main" label="03 · Atendente · desktop/tablet" width={1320} height={820}>
          <AttendantScreen />
        </DCArtboard>
      </DCSection>

      <DCSection id="client" title="Tela do cliente (PCD)" subtitle="Recebe perguntas em tempo real do atendente">
        <DCArtboard id="client-main" label="04 · Cliente · tablet (recebe ações do atendente acima)" width={1320} height={820}>
          <ClientScreen />
        </DCArtboard>
        <DCArtboard id="client-permission" label="04.b · Permissão de câmera" width={620} height={620}>
          <ClientPermissionScreen />
        </DCArtboard>
      </DCSection>

      <DCSection id="flow" title="Fluxo entre telas" subtitle="Caminho-feliz do atendimento completo">
        <DCArtboard id="flow-main" label="05 · Fluxo principal" width={1320} height={620}>
          <FlowDiagram />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>

    <LinkBackToDS />
  </>
);

const LinkBackToDS = () => (
  <a href="Talk2Me Design System.html" style={{
    position: 'fixed', top: 16, right: 16, zIndex: 100,
    padding: '10px 14px', borderRadius: 10,
    background: '#191970', color: '#fff', textDecoration: 'none',
    fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
    fontSize: 13, fontWeight: 600,
    boxShadow: '0 8px 20px rgba(25,25,112,0.25)',
    display: 'inline-flex', alignItems: 'center', gap: 8,
  }}>
    <Icon name="chevL" size={14} color="#fff" stroke={2.4} />
    Design System
  </a>
);

ReactDOM.createRoot(document.getElementById('root')).render(<ScreensApp />);
