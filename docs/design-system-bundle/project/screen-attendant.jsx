// screen-attendant.jsx — Attendant screen (interactive)

const AttendantScreen = () => {
  const [bus, setBus] = useBus();
  const [draft, setDraft] = React.useState('');

  const sendQuick = (q) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setBus({
      question: { id: q.id, text: q.text, options: q.options },
      clientAnswer: null,
      history: [...bus.history, { side: 'att', text: q.text, time, kind: 'PERGUNTA RÁPIDA' }],
    });
  };

  const sendCustom = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    setBus({
      question: { id: 'custom-' + Date.now(), text: draft, options: [{ id: 'ok', label: 'Entendi', icon: 'check' }] },
      clientAnswer: null,
      history: [...bus.history, { side: 'att', text: draft, time, kind: 'TEXTO LIVRE' }],
    });
    setDraft('');
  };

  const reset = () => window.__T2M_BUS.reset();

  return (
    <div style={{
      background: 'var(--t2m-muted)', height: '100%', minHeight: '100%',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--t2m-body)', color: 'var(--t2m-text)',
    }}>
      {/* TOPBAR */}
      <div style={{
        height: 64, background: 'var(--t2m-surface)',
        borderBottom: '1px solid var(--t2m-border-subtle)',
        display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
        flexShrink: 0,
      }}>
        <T2MWordmark height={22} />
        <div style={{ height: 32, width: 1, background: 'var(--t2m-border-subtle)' }} />
        <span className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', letterSpacing: '0.1em' }}>
          CAIXA 04 · ATENDIMENTO #4F8A
        </span>
        <div style={{ flex: 1 }} />
        {/* Live status chips */}
        <Pill tone="success" style={{ fontSize: 11 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1E7A53', animation: 't2m-pulse 1.6s infinite' }} /> Cliente conectado
        </Pill>
        <Pill tone="accent" style={{ fontSize: 11 }}>
          <Icon name="cam" size={11} color="var(--t2m-secondary-600)" stroke={2.4} /> Câmera ativa
        </Pill>
        <Pill tone="brand" style={{ fontSize: 11 }}>
          <Icon name="waves" size={11} color="var(--t2m-primary)" stroke={2.4} /> Tradução ativa
        </Pill>
        <div style={{ width: 8 }} />
        <Btn variant="outline" size="sm" icon="x" onClick={reset}>Encerrar</Btn>
      </div>

      {/* MAIN GRID */}
      <div style={{
        flex: 1, display: 'grid', gridTemplateColumns: '1.4fr 1fr',
        gap: 16, padding: 16, minHeight: 0,
      }}>
        {/* LEFT — transcription + quick + input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          {/* Transcription panel */}
          <TranscriptionPanel question={bus.question} answer={bus.clientAnswer} />

          {/* Quick actions */}
          <div style={{
            background: 'var(--t2m-surface)', borderRadius: 14,
            border: '1px solid var(--t2m-border-subtle)', padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 12 }}>
              <h3 className="t2m-h" style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Ações rápidas</h3>
              <span className="t2m-mono" style={{ marginLeft: 10, fontSize: 11, color: 'var(--t2m-text-3)' }}>
                envia ao cliente e mostra opções para ele responder
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {QUICK_ACTIONS.map(q => (
                <button key={q.id} onClick={() => sendQuick(q)} style={{
                  padding: '12px 12px', borderRadius: 10, cursor: 'pointer',
                  background: bus.question && bus.question.id === q.id ? 'var(--t2m-primary-50)' : 'var(--t2m-surface)',
                  border: `1.5px solid ${bus.question && bus.question.id === q.id ? 'var(--t2m-primary)' : 'var(--t2m-border)'}`,
                  color: 'var(--t2m-text)', textAlign: 'left',
                  fontFamily: 'var(--t2m-body)', fontSize: 13, fontWeight: 600,
                  display: 'flex', flexDirection: 'column', gap: 8, minHeight: 76,
                  transition: 'all 120ms',
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7, background: 'var(--t2m-primary)',
                    color: '#fff', display: 'grid', placeItems: 'center',
                  }}>
                    <Icon name={q.icon} size={16} color="#fff" stroke={2.2} />
                  </div>
                  <div style={{ lineHeight: 1.3 }}>{q.text}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom message input */}
          <div style={{
            background: 'var(--t2m-surface)', borderRadius: 14,
            border: '1px solid var(--t2m-border-subtle)', padding: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 12 }}>
              <h3 className="t2m-h" style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Mensagem personalizada</h3>
              <span className="t2m-mono" style={{ marginLeft: 10, fontSize: 11, color: 'var(--t2m-text-3)' }}>
                {draft.length}/240
              </span>
            </div>
            <div style={{
              display: 'flex', gap: 10, alignItems: 'stretch',
              border: `1.5px solid ${draft ? 'var(--t2m-primary)' : 'var(--t2m-border)'}`,
              borderRadius: 10, padding: '4px 4px 4px 14px',
              background: 'var(--t2m-surface)', transition: 'border 120ms',
            }}>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value.slice(0, 240))}
                onKeyDown={e => { if (e.key === 'Enter') sendCustom(); }}
                placeholder="Digite uma pergunta ou instrução para o cliente"
                style={{
                  flex: 1, border: 'none', outline: 'none', fontSize: 15,
                  fontFamily: 'var(--t2m-body)', color: 'var(--t2m-text)',
                  background: 'transparent', padding: '10px 0',
                }}
              />
              <Btn variant="primary" size="md" icon="send" onClick={sendCustom} disabled={!draft.trim()}>Enviar</Btn>
            </div>
            {/* Suggestions */}
            <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="t2m-mono" style={{ fontSize: 10, color: 'var(--t2m-text-3)', letterSpacing: '0.1em', marginRight: 4, alignSelf: 'center' }}>SUGESTÕES</span>
              {['Aguarde um momento, por favor', 'Obrigado pela paciência', 'Posso ajudar com mais alguma coisa?'].map(s => (
                <button key={s} onClick={() => setDraft(s)} style={{
                  padding: '6px 12px', borderRadius: 999,
                  border: '1px solid var(--t2m-border-subtle)', background: 'var(--t2m-subdued)',
                  fontSize: 12, color: 'var(--t2m-text-2)', cursor: 'pointer',
                  fontFamily: 'var(--t2m-body)',
                }}>{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — history */}
        <div style={{
          background: 'var(--t2m-surface)', borderRadius: 14,
          border: '1px solid var(--t2m-border-subtle)',
          display: 'flex', flexDirection: 'column', minHeight: 0,
        }}>
          <div style={{
            padding: '14px 18px', borderBottom: '1px solid var(--t2m-border-subtle)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <h3 className="t2m-h" style={{ fontSize: 15, fontWeight: 600, margin: 0 }}>Histórico da conversa</h3>
            <Pill tone="brand">{bus.history.length} eventos</Pill>
            <div style={{ flex: 1 }} />
            <button onClick={reset} style={{
              fontSize: 12, color: 'var(--t2m-text-3)', background: 'transparent',
              border: 'none', cursor: 'pointer', fontFamily: 'var(--t2m-body)',
            }}>Limpar</button>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
            {bus.history.length === 0 ? (
              <EmptyHistory />
            ) : (
              bus.history.map((h, i) => (
                <HistoryItem key={i} item={h} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TranscriptionPanel = ({ question, answer }) => {
  // Display priority: if there's an answer, show it; else if there's a question waiting; else empty.
  const empty = !question && !answer;
  const waiting = question && !answer;
  const has = !!answer;

  return (
    <div style={{
      background: has ? 'linear-gradient(135deg, var(--t2m-primary) 0%, #2E2E8C 100%)' : 'var(--t2m-surface)',
      color: has ? '#fff' : 'var(--t2m-text)',
      borderRadius: 14,
      border: has ? 'none' : '1px solid var(--t2m-border-subtle)',
      padding: 28, minHeight: 240,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      transition: 'all 220ms cubic-bezier(0.2,0,0.2,1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        {has ? (
          <>
            <PulseDot color="#33D6C6" size={8} />
            <span className="t2m-mono" style={{ fontSize: 11, letterSpacing: '0.12em', opacity: 0.85 }}>
              CLIENTE RESPONDEU · {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
            </span>
          </>
        ) : waiting ? (
          <>
            <span style={{
              display: 'inline-flex', gap: 3,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: '50%', background: 'var(--t2m-primary)',
                  animation: 't2m-pulse 1.4s infinite', animationDelay: `${i * 0.15}s`,
                }} />
              ))}
            </span>
            <span className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-2)', letterSpacing: '0.12em' }}>
              AGUARDANDO RESPOSTA DO CLIENTE…
            </span>
          </>
        ) : (
          <>
            <Icon name="hand" size={16} color="var(--t2m-text-3)" />
            <span className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', letterSpacing: '0.12em' }}>
              RECEBENDO LIBRAS · TRANSCRIÇÃO EM TEMPO REAL
            </span>
          </>
        )}
      </div>

      {empty && (
        <div style={{ color: 'var(--t2m-text-3)' }}>
          <div className="t2m-h" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Aguardando sinalização do cliente
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 10, color: 'var(--t2m-text-2)' }}>
            Toque numa ação rápida abaixo ou digite uma pergunta para o cliente responder.
          </p>
        </div>
      )}

      {waiting && (
        <div>
          <div className="t2m-mono" style={{ fontSize: 11, color: 'var(--t2m-text-3)', letterSpacing: '0.1em', marginBottom: 6 }}>
            ÚLTIMA PERGUNTA ENVIADA
          </div>
          <div className="t2m-h" style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.25, color: 'var(--t2m-primary)' }}>
            "{question.text}"
          </div>
        </div>
      )}

      {has && (
        <div>
          <div className="t2m-h" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.015em' }}>
            "{answer.label}"
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 10, opacity: 0.85 }}>
            Em resposta a: <strong>{question?.text}</strong>
          </p>
        </div>
      )}

      {/* Decorative wave bars at the bottom when receiving */}
      {!has && (
        <div style={{
          position: 'absolute', bottom: 16, right: 20,
          display: 'flex', alignItems: 'flex-end', gap: 3, height: 32,
        }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              width: 3, height: 10 + ((i * 7) % 22),
              background: waiting ? 'var(--t2m-primary)' : 'var(--t2m-border-strong)',
              opacity: waiting ? 0.7 : 0.3, borderRadius: 2,
              animation: waiting ? `t2m-wave 0.${(i % 6) + 4}s infinite ease-in-out` : 'none',
              animationDelay: `${i * 60}ms`,
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

const HistoryItem = ({ item }) => {
  const fromAtt = item.side === 'att';
  return (
    <div style={{
      display: 'flex', justifyContent: fromAtt ? 'flex-end' : 'flex-start',
      marginBottom: 12, animation: 't2m-fade-in 220ms',
    }}>
      <div style={{ maxWidth: '82%' }}>
        <div className="t2m-mono" style={{
          fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--t2m-text-3)', marginBottom: 4,
          textAlign: fromAtt ? 'right' : 'left',
        }}>
          {fromAtt ? 'Você' : 'Cliente'} · {item.kind} · {item.time}
        </div>
        <div style={{
          padding: '11px 14px',
          borderRadius: fromAtt ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
          background: fromAtt ? 'var(--t2m-primary)' : 'var(--t2m-secondary)',
          color: '#fff', fontSize: 14, lineHeight: 1.45, fontWeight: 500,
        }}>{item.text}</div>
      </div>
    </div>
  );
};

const EmptyHistory = () => (
  <div style={{
    height: '100%', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20,
  }}>
    <div style={{
      width: 56, height: 56, borderRadius: '50%', background: 'var(--t2m-muted)',
      display: 'grid', placeItems: 'center', marginBottom: 12,
    }}>
      <Icon name="list" size={26} color="var(--t2m-text-3)" stroke={2} />
    </div>
    <div className="t2m-h" style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Nenhuma mensagem ainda</div>
    <p style={{ fontSize: 12.5, color: 'var(--t2m-text-2)', margin: 0, lineHeight: 1.5, maxWidth: 220 }}>
      Toque em uma ação rápida para começar a conversar com o cliente.
    </p>
  </div>
);

window.AttendantScreen = AttendantScreen;
