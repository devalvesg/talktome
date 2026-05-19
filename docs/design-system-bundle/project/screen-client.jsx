// screen-client.jsx — Deaf person / client screen (interactive)

const ClientScreen = () => {
  const [bus, setBus] = useBus();
  const [recording, setRecording] = React.useState(false);
  const [recTime, setRecTime] = React.useState(0);
  const [confirmed, setConfirmed] = React.useState(null); // last answered option

  // recording timer
  React.useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setRecTime(r => r + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  // Reset confirmed when a new question arrives
  React.useEffect(() => {
    setConfirmed(null);
  }, [bus.question?.id]);

  const sendAnswer = (opt) => {
    setConfirmed(opt);
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setBus({
      clientAnswer: { questionId: bus.question.id, value: opt.id, label: opt.label },
      history: [...bus.history, { side: 'cli', text: opt.label, time, kind: 'RESPOSTA RÁPIDA' }],
    });
  };

  return (
    <div style={{
      background: '#0F1729', color: '#fff', height: '100%', minHeight: '100%',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--t2m-body)',
    }}>
      {/* TOPBAR */}
      <div style={{
        height: 56, background: 'rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14,
        flexShrink: 0,
      }}>
        <T2MWordmark height={22} color="#fff" accent="#33D6C6" />
        <div style={{ flex: 1 }} />
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12,
          padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#33D6C6', animation: 't2m-pulse 1.4s infinite' }} />
          Conectado ao atendente
        </span>
        <button style={{
          width: 44, height: 44, borderRadius: 12, border: 'none', cursor: 'pointer',
          background: 'rgba(255,255,255,0.08)', color: '#fff',
          display: 'grid', placeItems: 'center',
        }} aria-label="Ajuda">
          <Icon name="help" size={22} color="#fff" stroke={2.2} />
        </button>
      </div>

      {/* MAIN: two columns — avatar / camera */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateRows: '1.05fr 1fr',
        gap: 14, padding: 14, minHeight: 0,
      }}>
        {/* ─── AVATAR + Question ─── */}
        <AvatarPanel question={bus.question} confirmed={confirmed} onAnswer={sendAnswer} />

        {/* ─── CAMERA + Quick answers ─── */}
        <CameraPanel
          recording={recording}
          recTime={recTime}
          onToggleRec={() => { setRecording(r => !r); setRecTime(0); }}
        />
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────
// Avatar panel — shows the Libras avatar and the action buttons
// ──────────────────────────────────────────────────────────────────────
const AvatarPanel = ({ question, confirmed, onAnswer }) => {
  const has = !!question;
  return (
    <div style={{
      borderRadius: 18, overflow: 'hidden', position: 'relative',
      background: 'linear-gradient(160deg, #191970 0%, #2E2E8C 60%, #4A4AAB 100%)',
      display: 'grid', gridTemplateColumns: '1.05fr 1fr',
    }}>
      {/* Decorative dots */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />

      {/* Avatar area */}
      <div style={{
        position: 'relative', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: 24,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16,
          padding: '6px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)',
        }}>
          <PulseDot color="#33D6C6" size={8} />
          <span className="t2m-mono" style={{ fontSize: 11, letterSpacing: '0.12em', fontWeight: 600 }}>
            MENSAGEM DO ATENDENTE
          </span>
        </div>

        <SigningAvatar key={question?.id} active={has} />

        <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
          <Btn variant="light" size="md" icon="repeat" disabled={!has}>Repetir</Btn>
          <Btn variant="ghost" size="md" icon="pause" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} disabled={!has}>Pausar</Btn>
        </div>
      </div>

      {/* Question + answer buttons */}
      <div style={{
        padding: '32px 28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
      }}>
        {has ? (
          <>
            <div className="t2m-mono" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              opacity: 0.7, marginBottom: 10,
            }}>
              {confirmed ? 'Resposta enviada' : 'Toque na sua resposta'}
            </div>
            <h2 className="t2m-h" style={{
              fontSize: 30, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em',
              margin: '0 0 22px',
            }}>"{question.text}"</h2>

            <div style={{ display: 'grid', gap: 10 }}>
              {question.options.map(opt => {
                const isPicked = confirmed && confirmed.id === opt.id;
                const isOther = confirmed && confirmed.id !== opt.id;
                return (
                  <button key={opt.id} onClick={() => !confirmed && onAnswer(opt)} style={{
                    minHeight: 76, padding: '0 24px',
                    borderRadius: 14, cursor: confirmed ? 'default' : 'pointer',
                    background: isPicked ? '#0E9A8D' : isOther ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.14)',
                    border: `2px solid ${isPicked ? '#33D6C6' : 'rgba(255,255,255,0.2)'}`,
                    color: '#fff', fontFamily: 'var(--t2m-body)',
                    fontSize: 22, fontWeight: 700, textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 16,
                    opacity: isOther ? 0.45 : 1,
                    transition: 'all 160ms cubic-bezier(0.2,0,0.2,1)',
                    boxShadow: isPicked ? '0 8px 24px rgba(14,154,141,0.4)' : 'none',
                  }}
                  onMouseEnter={e => { if (!confirmed) { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { if (!confirmed) { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'none'; } }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: isPicked ? '#fff' : 'rgba(255,255,255,0.16)',
                      color: isPicked ? '#0A7D72' : '#fff',
                      display: 'grid', placeItems: 'center', flexShrink: 0,
                    }}>
                      <Icon name={opt.icon || 'check'} size={26} color={isPicked ? '#0A7D72' : '#fff'} stroke={2.6} />
                    </div>
                    <span style={{ flex: 1 }}>{opt.label}</span>
                    {isPicked && (
                      <span className="t2m-mono" style={{ fontSize: 11, letterSpacing: '0.12em', opacity: 0.9 }}>ENVIADO ✓</span>
                    )}
                  </button>
                );
              })}
            </div>

            {confirmed && (
              <div style={{
                marginTop: 16, padding: '12px 16px', borderRadius: 12,
                background: 'rgba(51,214,198,0.12)', border: '1px solid rgba(51,214,198,0.4)',
                fontSize: 13, lineHeight: 1.5, display: 'flex', gap: 10, alignItems: 'center',
              }}>
                <Icon name="check" size={18} color="#33D6C6" stroke={2.6} />
                Sua resposta foi enviada ao atendente. Aguarde a próxima pergunta.
              </div>
            )}
          </>
        ) : (
          <>
            <div className="t2m-mono" style={{
              fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              opacity: 0.7, marginBottom: 10,
            }}>Estado · aguardando</div>
            <h2 className="t2m-h" style={{
              fontSize: 32, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em',
              margin: '0 0 16px',
            }}>Aguardando o atendente</h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, opacity: 0.8, margin: '0 0 22px' }}>
              Quando o atendente enviar uma pergunta, a tradução em Libras aparecerá no avatar ao lado.
              Você poderá responder tocando nos botões ou sinalizando para a câmera.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.08)',
                fontSize: 12, fontWeight: 600,
              }}>
                <Icon name="hand" size={14} color="#33D6C6" stroke={2.4} />
                Você pode iniciar uma conversa sinalizando abaixo
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Stylized signing avatar — slight idle pose change per question
const SigningAvatar = ({ active }) => (
  <div style={{
    width: '100%', maxWidth: 360, aspectRatio: '4/3',
    display: 'grid', placeItems: 'center', position: 'relative',
    animation: active ? 't2m-fade-in 320ms' : 'none',
  }}>
    <svg width="100%" height="100%" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="halo" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#33D6C6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#33D6C6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="110" r="100" fill="url(#halo)" />
      {/* Head */}
      <circle cx="160" cy="80" r="32" fill="#FFD7B5" />
      {/* Hair */}
      <path d="M 130 64 Q 130 48 160 48 Q 190 48 190 64 Q 192 72 188 76 Q 178 64 160 64 Q 142 64 132 76 Q 128 72 130 64 Z" fill="#4A2C1A" />
      {/* Body */}
      <path d="M 116 220 Q 116 140 160 140 Q 204 140 204 220 Z" fill="#33D6C6" />
      <path d="M 116 220 Q 116 140 160 140 Q 204 140 204 220 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
      {/* Arms — sign pose */}
      <path d={active
        ? "M 134 150 Q 110 120 102 88"
        : "M 134 150 Q 122 175 116 200"} stroke="#FFD7B5" strokeWidth="18" strokeLinecap="round" fill="none" />
      <path d={active
        ? "M 186 150 Q 220 130 232 100"
        : "M 186 150 Q 198 175 204 200"} stroke="#FFD7B5" strokeWidth="18" strokeLinecap="round" fill="none" />
      {/* Hands */}
      <circle cx={active ? 102 : 116} cy={active ? 86 : 200} r="13" fill="#FFD7B5" />
      <circle cx={active ? 232 : 204} cy={active ? 98 : 200} r="13" fill="#FFD7B5" />
      {/* Face */}
      <circle cx="150" cy="80" r="2.5" fill="#1F1F2C" />
      <circle cx="170" cy="80" r="2.5" fill="#1F1F2C" />
      <path d="M 153 92 Q 160 96 167 92" stroke="#1F1F2C" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

// ──────────────────────────────────────────────────────────────────────
// Camera panel
// ──────────────────────────────────────────────────────────────────────
const CameraPanel = ({ recording, recTime, onToggleRec }) => (
  <div style={{
    borderRadius: 18, overflow: 'hidden', position: 'relative',
    background: '#0A0A2D',
    display: 'grid', gridTemplateColumns: '1.4fr 1fr',
  }}>
    {/* Camera preview */}
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #1A1A35 0%, #0A0A2D 100%)',
    }}>
      {/* Stylized "person silhouette" placeholder for camera feed */}
      <CameraSilhouette />

      {/* Top-left state */}
      <div style={{
        position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8,
      }}>
        {recording ? (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(176,32,47,0.9)', color: '#fff',
            fontSize: 12, fontWeight: 700,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#fff',
              animation: 't2m-pulse 0.9s infinite',
            }} />
            GRAVANDO · {Math.floor(recTime / 60)}:{String(recTime % 60).padStart(2, '0')}
          </div>
        ) : (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 10px', borderRadius: 999,
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            fontSize: 11, fontWeight: 600,
          }}>
            <Icon name="cam" size={12} color="#33D6C6" stroke={2.4} />
            CÂMERA ATIVA · PREVIEW
          </div>
        )}
      </div>

      {/* Top-right hint */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        background: 'rgba(0,0,0,0.5)', color: '#fff',
        padding: '6px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600,
      }}>
        Posicione suas mãos dentro da área
      </div>

      {/* Framing guide */}
      <div style={{
        position: 'absolute', inset: '20% 18% 18% 18%',
        border: `2px dashed ${recording ? '#33D6C6' : 'rgba(255,255,255,0.5)'}`,
        borderRadius: 16, pointerEvents: 'none',
      }}>
        {/* Corner brackets */}
        {[
          { t: -2, l: -2, br: 'rt' },
          { t: -2, r: -2, br: 'lt' },
          { b: -2, l: -2, br: 'rb' },
          { b: -2, r: -2, br: 'lb' },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: c.t, left: c.l, right: c.r, bottom: c.b,
            width: 22, height: 22,
            borderTop: c.t != null ? `3px solid ${recording ? '#33D6C6' : '#fff'}` : 'none',
            borderBottom: c.b != null ? `3px solid ${recording ? '#33D6C6' : '#fff'}` : 'none',
            borderLeft: c.l != null ? `3px solid ${recording ? '#33D6C6' : '#fff'}` : 'none',
            borderRight: c.r != null ? `3px solid ${recording ? '#33D6C6' : '#fff'}` : 'none',
            borderRadius: 6,
          }} />
        ))}
      </div>

      {/* Bottom-left transcript preview when recording */}
      {recording && (
        <div style={{
          position: 'absolute', bottom: 14, left: 14, right: 14,
          padding: '10px 14px', borderRadius: 12,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          color: '#fff',
        }}>
          <div className="t2m-mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.1em', marginBottom: 4 }}>
            INTERPRETANDO LIBRAS…
          </div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>
            "Quero pagar no <span style={{ background: 'rgba(51,214,198,0.3)', padding: '0 4px', borderRadius: 4 }}>crédito</span>…"
          </div>
        </div>
      )}
    </div>

    {/* Right column: controls */}
    <div style={{
      padding: 20, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-between',
      borderLeft: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div>
        <div className="t2m-mono" style={{ fontSize: 11, letterSpacing: '0.12em', opacity: 0.7, marginBottom: 8 }}>
          SE PREFERIR SINALIZAR
        </div>
        <h3 className="t2m-h" style={{ fontSize: 20, fontWeight: 600, margin: '0 0 6px', lineHeight: 1.2 }}>
          Use a câmera para falar em Libras
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.75, margin: 0 }}>
          Toque em <strong>"Iniciar gravação"</strong>, sinalize com calma e toque em <strong>"Parar"</strong> quando terminar.
        </p>
      </div>

      <button onClick={onToggleRec} style={{
        height: 96, borderRadius: 16, border: 'none', cursor: 'pointer',
        background: recording ? '#B0202F' : '#0E9A8D',
        color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: 'var(--t2m-body)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
        boxShadow: recording ? '0 12px 28px rgba(176,32,47,0.4)' : '0 12px 28px rgba(14,154,141,0.4)',
        transition: 'all 160ms',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {recording ? (
            <span style={{ width: 22, height: 22, borderRadius: 5, background: '#fff' }} />
          ) : (
            <Icon name="cam" size={28} color="#fff" stroke={2.4} />
          )}
          {recording ? 'Parar gravação' : 'Iniciar gravação'}
        </div>
        {recording && (
          <div className="t2m-mono" style={{ fontSize: 12, opacity: 0.85, fontWeight: 600, letterSpacing: '0.08em' }}>
            {Math.floor(recTime / 60)}:{String(recTime % 60).padStart(2, '0')}
          </div>
        )}
      </button>

      <div style={{
        padding: 12, borderRadius: 10,
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, background: 'rgba(51,214,198,0.18)',
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <Icon name="info" size={18} color="#33D6C6" stroke={2.2} />
        </div>
        <div style={{ fontSize: 11.5, lineHeight: 1.45, opacity: 0.85 }}>
          Sinalize <strong>devagar</strong> e <strong>com boa luz</strong> para melhor reconhecimento.
        </div>
      </div>
    </div>
  </div>
);

const CameraSilhouette = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
    <defs>
      <radialGradient id="bgcam" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#33D6C6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0A0A2D" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="400" height="240" fill="url(#bgcam)" />
    {/* Silhouette */}
    <ellipse cx="200" cy="110" rx="36" ry="44" fill="rgba(255,215,181,0.5)" />
    <path d="M 130 240 Q 130 160 200 160 Q 270 160 270 240 Z" fill="rgba(255,215,181,0.3)" />
    {/* Hands raised */}
    <circle cx="160" cy="160" r="14" fill="rgba(255,215,181,0.55)" />
    <circle cx="240" cy="160" r="14" fill="rgba(255,215,181,0.55)" />
  </svg>
);

// ────────────────────────────────────────────────────────────────────
// Permissions screen variant — small, used in flow demo
// ────────────────────────────────────────────────────────────────────
const ClientPermissionScreen = () => (
  <div style={{
    background: '#0F1729', height: '100%', minHeight: '100%',
    color: '#fff', fontFamily: 'var(--t2m-body)',
    padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center',
  }}>
    <div style={{ textAlign: 'center', maxWidth: 460, margin: '0 auto' }}>
      <T2MMark size={68} fg="#fff" accent="#33D6C6" />
      <h2 className="t2m-h" style={{
        fontSize: 28, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em',
        margin: '20px 0 10px',
      }}>Permita o acesso à câmera</h2>
      <p style={{ fontSize: 15, lineHeight: 1.55, opacity: 0.8, margin: '0 0 28px' }}>
        Precisamos da câmera para ler seus sinais em Libras.
        As imagens <strong>não são gravadas</strong>.
      </p>

      <div style={{
        background: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 18,
        textAlign: 'left', display: 'flex', gap: 14, alignItems: 'center', marginBottom: 22,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12, background: 'rgba(51,214,198,0.18)',
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          <Icon name="cam" size={26} color="#33D6C6" stroke={2.2} />
        </div>
        <div>
          <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15 }}>Câmera</div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>Para ler seus sinais e traduzir em texto.</div>
        </div>
      </div>

      <Btn variant="secondary" size="lg" full>Permitir e continuar</Btn>
      <div style={{ marginTop: 12 }}>
        <Btn variant="ghost" size="md" style={{ color: '#fff', opacity: 0.7 }}>Mais sobre privacidade</Btn>
      </div>
    </div>
  </div>
);

window.ClientScreen = ClientScreen;
window.ClientPermissionScreen = ClientPermissionScreen;
