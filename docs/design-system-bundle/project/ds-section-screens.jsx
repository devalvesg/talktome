// ds-section-screens.jsx — Example screens using the design system

// ── Tablet frame ─────────────────────────────────────────────────────
const TabletFrame = ({ children, label, w = 820, h = 540 }) => (
  <div>
    <div className="t2m-mono" style={{
      fontSize: 11, color: 'var(--t2m-text-3)', marginBottom: 8,
      letterSpacing: '0.1em', textTransform: 'uppercase',
    }}>{label}</div>
    <div style={{
      width: w, height: h, background: '#0F1729',
      borderRadius: 22, padding: 10, position: 'relative',
      boxShadow: 'var(--t2m-shadow-lg)',
    }}>
      <div style={{
        width: '100%', height: '100%', background: 'var(--t2m-bg)',
        borderRadius: 14, overflow: 'hidden', position: 'relative',
      }}>{children}</div>
    </div>
  </div>
);

const PhoneFrame = ({ children, label, w = 320, h = 580 }) => (
  <div>
    <div className="t2m-mono" style={{
      fontSize: 11, color: 'var(--t2m-text-3)', marginBottom: 8,
      letterSpacing: '0.1em', textTransform: 'uppercase',
    }}>{label}</div>
    <div style={{
      width: w, height: h, background: '#0F1729',
      borderRadius: 36, padding: 8, position: 'relative',
      boxShadow: 'var(--t2m-shadow-lg)',
    }}>
      <div style={{
        width: '100%', height: '100%', background: 'var(--t2m-bg)',
        borderRadius: 30, overflow: 'hidden', position: 'relative',
      }}>{children}</div>
    </div>
  </div>
);

// ── Screen 1: Active conversion (tablet, balcão) ──
const ConversionScreen = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    {/* Top bar */}
    <div style={{
      height: 56, background: 'var(--t2m-surface)',
      borderBottom: '1px solid var(--t2m-border-subtle)',
      display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14,
    }}>
      <T2MWordmark height={22} />
      <div style={{ flex: 1 }} />
      <ConnStatus status="online" />
      <DeviceIndicator kind="mic" active />
      <DeviceIndicator kind="cam" active />
      <Btn variant="outline" size="sm" iconOnly icon="a11y" aria-label="Acessibilidade" />
    </div>

    {/* Mode selector centered */}
    <div style={{ padding: '14px 18px 8px', display: 'flex', justifyContent: 'center' }}>
      <ModeSelector mode="audio2libras" />
    </div>

    {/* Stage: Libras viewer + transcription side by side */}
    <div style={{
      flex: 1, display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 12,
      padding: '6px 18px 14px',
    }}>
      <LibrasViewer size="lg" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Transcription />
        <Card style={{ padding: 14, flex: 1 }}>
          <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', letterSpacing: '0.1em' }}>RESPOSTA SUGERIDA</div>
          <div style={{ fontSize: 14, color: 'var(--t2m-text)', marginTop: 6, lineHeight: 1.45 }}>
            "Fica no fundo da loja, à esquerda da padaria. Quer que eu te leve?"
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <Btn variant="primary" size="sm" icon="play">Reproduzir</Btn>
            <Btn variant="outline" size="sm">Editar</Btn>
          </div>
        </Card>
      </div>
    </div>

    {/* Bottom CTA bar */}
    <div style={{
      padding: '12px 18px', background: 'var(--t2m-surface)',
      borderTop: '1px solid var(--t2m-border-subtle)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Btn variant="ghost" size="sm" icon="cog">Ajustes</Btn>
        <Btn variant="ghost" size="sm" icon="info">Ajuda</Btn>
      </div>
      <StartConversionBtn active />
    </div>
  </div>
);

// ── Screen 2: Permissions ──
const PermissionScreen = () => (
  <div style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
      <T2MMark size={64} accent="#0E9A8D" />
      <h2 className="t2m-h" style={{
        fontSize: 30, fontWeight: 700, color: 'var(--t2m-primary)',
        margin: '20px 0 10px', letterSpacing: '-0.01em',
      }}>Antes de começar, autorize o uso</h2>
      <p style={{ fontSize: 15, color: 'var(--t2m-text-2)', margin: '0 0 28px', lineHeight: 1.55 }}>
        Precisamos do microfone para ouvir o atendente e da câmera para reconhecer os sinais do cliente. As gravações <strong>nunca</strong> são salvas.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <Card style={{ padding: 18, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Icon name="mic" size={22} color="var(--t2m-primary)" />
            <div className="t2m-h" style={{ fontWeight: 600, fontSize: 16 }}>Microfone</div>
            <div style={{ flex: 1 }} />
            <Pill tone="success">Permitido</Pill>
          </div>
          <p style={{ fontSize: 12, color: 'var(--t2m-text-2)', margin: 0 }}>Captura a fala do atendente para tradução em Libras.</p>
        </Card>
        <Card style={{ padding: 18, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Icon name="cam" size={22} color="var(--t2m-primary)" />
            <div className="t2m-h" style={{ fontWeight: 600, fontSize: 16 }}>Câmera</div>
            <div style={{ flex: 1 }} />
            <Pill tone="warning">Pendente</Pill>
          </div>
          <p style={{ fontSize: 12, color: 'var(--t2m-text-2)', margin: 0 }}>Lê os sinais do cliente e converte em texto e voz.</p>
        </Card>
      </div>

      <Btn variant="primary" size="lg" icon="check" full>Autorizar e continuar</Btn>
      <div style={{ marginTop: 10 }}>
        <Btn variant="ghost" size="sm">Saiba mais sobre privacidade</Btn>
      </div>
    </div>
  </div>
);

// ── Screen 3: Connection error ──
const ConnectionErrorScreen = () => (
  <div style={{
    padding: 28, height: '100%',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
    background: 'var(--t2m-bg)',
  }}>
    <div style={{ textAlign: 'center', maxWidth: 460 }}>
      <div style={{
        width: 96, height: 96, borderRadius: '50%',
        background: 'var(--t2m-error-bg)', display: 'grid', placeItems: 'center',
        margin: '0 auto 20px',
      }}>
        <Icon name="wifi" size={48} color="var(--t2m-error)" stroke={2} />
      </div>
      <h2 className="t2m-h" style={{
        fontSize: 26, fontWeight: 700, color: 'var(--t2m-text)',
        margin: '0 0 10px', letterSpacing: '-0.01em',
      }}>Conexão perdida</h2>
      <p style={{ fontSize: 15, color: 'var(--t2m-text-2)', margin: '0 0 24px', lineHeight: 1.55 }}>
        Não conseguimos falar com o servidor de tradução agora. Verifique se o tablet está conectado ao Wi-Fi do supermercado.
      </p>

      <Card style={{ textAlign: 'left', padding: 16, marginBottom: 20 }}>
        <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', letterSpacing: '0.1em', marginBottom: 8 }}>O QUE TENTAR</div>
        <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: 'var(--t2m-text)', lineHeight: 1.7 }}>
          <li>Verifique o ícone de Wi-Fi no canto superior do tablet.</li>
          <li>Se estiver sem rede, chame o supervisor da loja.</li>
          <li>Tente reconectar com o botão abaixo.</li>
        </ol>
      </Card>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <Btn variant="primary" size="lg" icon="wifi">Tentar reconectar</Btn>
        <Btn variant="outline" size="lg">Modo offline</Btn>
      </div>
      <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', marginTop: 18 }}>
        ERR-NET-503 · 14:32:08
      </div>
    </div>
  </div>
);

// ── Screen 4: Quick help for staff ──
const QuickHelpScreen = () => (
  <div style={{ padding: 24, height: '100%', overflow: 'auto' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
      <Icon name="info" size={20} color="var(--t2m-primary)" />
      <Pill tone="brand">Ajuda rápida</Pill>
    </div>
    <h2 className="t2m-h" style={{
      fontSize: 24, fontWeight: 700, margin: '4px 0 14px', color: 'var(--t2m-text)',
    }}>Como atender um cliente surdo</h2>

    <div style={{ display: 'grid', gap: 10 }}>
      {[
        ['1', 'Olhe para o cliente, não para a tela.',
          'Mantenha contato visual e sorria. O Talk2Me cuida da tradução.'],
        ['2', 'Fale em ritmo normal, frases curtas.',
          'O reconhecimento funciona melhor com frases de até 12 palavras.'],
        ['3', 'Toque em "Iniciar conversão".',
          'O ícone de microfone deve pulsar. Aguarde 1 segundo antes de falar.'],
        ['4', 'Para responder ao cliente, vire o tablet.',
          'O cliente sinaliza para a câmera. Você verá o que ele disse na tela.'],
        ['5', 'Em caso de dúvida, chame o supervisor.',
          'Bipe interno: 142. Suporte Talk2Me: 0800-XXX-1234.'],
      ].map(([n, t, s]) => (
        <Card key={n} style={{ display: 'flex', gap: 14, padding: 14 }}>
          <div className="t2m-mono" style={{
            flex: '0 0 36px', height: 36, borderRadius: 8,
            background: 'var(--t2m-primary-50)', color: 'var(--t2m-primary)',
            display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 16,
          }}>{n}</div>
          <div>
            <div className="t2m-h" style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{t}</div>
            <div style={{ fontSize: 12.5, color: 'var(--t2m-text-2)', lineHeight: 1.5 }}>{s}</div>
          </div>
        </Card>
      ))}
    </div>

    <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
      <Btn variant="primary" full>Começar a usar</Btn>
      <Btn variant="outline" iconOnly icon="info" aria-label="FAQ" />
    </div>
  </div>
);

// ── Screen 5: Mobile (phone) — staff app ──
const MobileStaffScreen = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{
      height: 56, background: 'var(--t2m-surface)',
      borderBottom: '1px solid var(--t2m-border-subtle)',
      display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8,
    }}>
      <T2MWordmark height={18} />
      <div style={{ flex: 1 }} />
      <ConnStatus status="online" />
    </div>

    <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
      <div className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', letterSpacing: '0.12em' }}>BALCÃO 03 · PADARIA</div>
      <h3 className="t2m-h" style={{ fontSize: 22, fontWeight: 700, margin: '4px 0 14px' }}>Olá, Maria</h3>

      <Card style={{ background: 'var(--t2m-primary)', color: '#fff', border: 'none', padding: 18 }}>
        <Pill tone="brand" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>EM ATENDIMENTO</Pill>
        <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.4 }}>
          Cliente no balcão precisa de ajuda — modo Áudio→Libras
        </div>
        <Btn variant="secondary" size="md" full style={{ marginTop: 14, background: '#33D6C6', color: '#0F0F44', border: 'none' }}>
          Abrir conversa
        </Btn>
      </Card>

      <div style={{ marginTop: 18 }}>
        <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', marginBottom: 8, letterSpacing: '0.1em' }}>HOJE</div>
        <div style={{ display: 'grid', gap: 6 }}>
          {[
            ['14:32', 'Açougue', '1m 12s'],
            ['11:08', 'Troca de produto', '3m 04s'],
            ['09:21', 'Validade leite', '42s'],
          ].map(([t, s, d]) => (
            <Card key={t} style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="t2m-mono" style={{ fontSize: 12, color: 'var(--t2m-text-3)', flex: '0 0 48px' }}>{t}</div>
              <div style={{ flex: 1, fontSize: 13 }}>{s}</div>
              <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-2)' }}>{d}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom nav */}
    <div style={{
      background: 'var(--t2m-surface)', display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--t2m-border-subtle)',
    }}>
      {[
        { i: 'home', l: 'Conversa', active: true },
        { i: 'list', l: 'Histórico' },
        { i: 'user', l: 'Perfil' },
        { i: 'cog', l: 'Ajustes' },
      ].map((it) => (
        <div key={it.l} style={{
          padding: '8px 0 12px', textAlign: 'center',
          color: it.active ? 'var(--t2m-primary)' : 'var(--t2m-text-3)',
          borderTop: it.active ? '3px solid var(--t2m-primary)' : '3px solid transparent',
          marginTop: -1,
        }}>
          <Icon name={it.i} size={20} stroke={it.active ? 2.4 : 2} />
          <div style={{ fontSize: 10, fontWeight: 600, marginTop: 2 }}>{it.l}</div>
        </div>
      ))}
    </div>
  </div>
);

// ── Screens artboard ──
const ScreensArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="16 · Telas"
      title="Exemplos aplicados"
      sub="Cinco telas reais usando o Design System completo: balcão de atendimento, permissões, erro de conexão, ajuda rápida e app do funcionário."
    />

    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 28 }}>
      <TabletFrame label="Tablet · Balcão · Conversão ativa" w={820} h={520}>
        <ConversionScreen />
      </TabletFrame>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <TabletFrame label="Tablet · Permissões" w={520} h={420}>
          <PermissionScreen />
        </TabletFrame>
        <TabletFrame label="Tablet · Erro de conexão" w={520} h={420}>
          <ConnectionErrorScreen />
        </TabletFrame>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20, alignItems: 'start' }}>
        <TabletFrame label="Tablet · Ajuda rápida para funcionários" w={460} h={560}>
          <QuickHelpScreen />
        </TabletFrame>
        <PhoneFrame label="Mobile · App da equipe" w={320} h={560}>
          <MobileStaffScreen />
        </PhoneFrame>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════════════════════════════════
// Accessibility guidelines artboard
// ════════════════════════════════════════════════════════════════════════
const AccessibilityArtboard = () => (
  <div style={{ padding: 40, background: 'var(--t2m-surface)', height: '100%' }}>
    <SectionHeading
      kicker="15 · Acessibilidade"
      title="Regras práticas"
      sub="O Talk2Me é, antes de tudo, um produto de acessibilidade. Estas regras são contratuais — vale como aceite/rejeite no review."
    />

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 24 }}>
      {[
        ['Contraste mínimo 4.5:1', 'Texto comum precisa de contraste AA. Texto grande (≥18px bold) precisa de 3:1.',
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <Pill tone="success">#0F1729 sobre #FFFFFF · 16.4:1</Pill>
            <Pill tone="success">#191970 sobre #ECEFF1 · 11.2:1</Pill>
          </div>],
        ['Hit target ≥ 44×44px', 'Todo elemento clicável tem que caber confortavelmente em um dedo, mesmo com luva.',
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <Btn variant="primary" size="md">44px</Btn>
            <Btn variant="primary" size="lg">52px</Btn>
            <Btn variant="primary" size="xl">64px · totem</Btn>
          </div>],
        ['Foco visível sempre', 'Nunca remova outline. Use o anel azul (#4A4AAB · 4px) para sinalizar foco em qualquer navegação por teclado.',
          <div style={{ marginTop: 10 }}><Btn variant="primary" state="focus">Foco visível</Btn></div>],
        ['Ícone + texto', 'Ícones sem texto só são aceitáveis quando o significado é universal (×, ⌕). Caso contrário, sempre acompanhe de label.',
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <Btn variant="outline" icon="mic">Microfone</Btn>
            <Pill tone="success">OK</Pill>
            <Btn variant="outline" iconOnly icon="swap" />
            <Pill tone="error">Evite</Pill>
          </div>],
        ['Mensagens propõem ação', 'Toda mensagem de erro precisa dizer o que aconteceu E o que fazer.',
          <Card style={{ marginTop: 10, background: 'var(--t2m-error-bg)', borderColor: 'var(--t2m-error)' }}>
            <div className="t2m-h" style={{ fontWeight: 600, color: 'var(--t2m-error)', fontSize: 13 }}>Microfone bloqueado</div>
            <div style={{ fontSize: 12, color: 'var(--t2m-text-2)', marginTop: 2 }}>
              Toque no ícone 🔒 da barra do navegador → "Permitir microfone" → recarregue a página.
            </div>
          </Card>],
        ['Linguagem simples e direta', 'Frases curtas. Sem jargão técnico. Sempre na 2ª pessoa.',
          <div style={{ marginTop: 10, display: 'grid', gap: 4, fontSize: 13 }}>
            <div><Pill tone="success">SIM</Pill> &nbsp;Toque em "Iniciar" para começar a conversar.</div>
            <div><Pill tone="error">NÃO</Pill> &nbsp;Pressione o botão para inicializar a sessão de comunicação.</div>
          </div>],
      ].map(([title, desc, demo]) => (
        <Card key={title}>
          <div className="t2m-h" style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 13, color: 'var(--t2m-text-2)', lineHeight: 1.5 }}>{desc}</div>
          {demo}
        </Card>
      ))}
    </div>

    {/* Checklist */}
    <h3 className="t2m-h" style={{ margin: '0 0 12px', fontSize: 16, fontWeight: 600 }}>Checklist WCAG 2.2 AA</h3>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px',
      padding: 18, background: 'var(--t2m-subdued)', borderRadius: 12,
    }}>
      {[
        ['1.4.3 Contraste mínimo', true],
        ['1.4.4 Redimensionar texto até 200%', true],
        ['1.4.11 Contraste não-textual', true],
        ['2.1.1 Navegação por teclado', true],
        ['2.4.7 Foco visível', true],
        ['2.5.5 Tamanho do alvo (44×44)', true],
        ['3.3.1 Identificação de erros', true],
        ['3.3.3 Sugestão de erro', true],
        ['4.1.2 Nome, papel, valor (ARIA)', true],
        ['1.2.5 Áudio-descrição', false],
        ['1.2.6 Libras (pré-gravado)', true],
        ['2.3.3 Animação a partir de interação', true],
      ].map(([txt, ok]) => (
        <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name={ok ? 'check' : 'alert'} size={14} color={ok ? 'var(--t2m-success)' : 'var(--t2m-warning)'} stroke={2.6} />
          <span style={{ fontSize: 13, color: 'var(--t2m-text)' }}>{txt}</span>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { ScreensArtboard, AccessibilityArtboard });
