/**
 * Home do Sistema — ponto de partida do atendente. Tela estática do M2.
 * O fluxo de sessão é MOCADO localmente (sem canal real): ao iniciar, mostra
 * QR/código/link e transita sozinho para o atendente em ~3s. O canal real
 * (criação de sessão entre dispositivos) entra no M3/M4.
 * Spec: docs/Home do Sistema.md.
 */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/cn';
import {
  Alert,
  Btn,
  Card,
  ConnStatus,
  DeviceIndicator,
  Icon,
  Input,
  Pill,
  StartConversionBtn,
  useToast,
  type IconName,
} from '@/ds/components';
import { TopBar } from '@/app/TopBar';

type Stage = 'ready' | 'creating' | 'waiting';
type ServiceType = 'caixa' | 'balcao' | 'cliente';

/** Código curto de sessão, ex.: T2M-9F4K (helper de módulo: usa Math.random). */
const genCode = () => `T2M-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

// `soon`: tela ainda não construída — não permite iniciar atendimento (só Caixa por ora).
const TYPES: { id: ServiceType; label: string; icon: IconName; soon?: boolean }[] = [
  { id: 'caixa', label: 'Caixa', icon: 'card' },
  { id: 'balcao', label: 'Balcão de informações', icon: 'info', soon: true },
  { id: 'cliente', label: 'Atendimento ao cliente', icon: 'users', soon: true },
];

/** Grid pseudo-aleatório que lembra um QR Code (placeholder visual do M2). */
function QrPlaceholder({ seed = 7 }: { seed?: number }) {
  const n = 11;
  const cells = Array.from({ length: n * n }, (_, i) => ((i * 1103515245 + seed * 12345) >> 4) % 7 < 3);
  return (
    <div
      className="grid rounded-lg bg-white p-3"
      style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, width: 200, height: 200 }}
      role="img"
      aria-label="QR Code da sessão (demonstração)"
    >
      {cells.map((on, i) => (
        <span key={i} className={on ? 'bg-ink' : 'bg-transparent'} />
      ))}
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stage, setStage] = useState<Stage>('ready');
  const [type, setType] = useState<ServiceType>('caixa');
  const [code, setCode] = useState('');
  const sessionLink = code ? `${window.location.origin}/cliente?s=${code}` : '';
  const timers = useRef<number[]>([]);

  const selected = TYPES.find((t) => t.id === type)!;
  const available = !selected.soon;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    // Guarda: tipos sem tela pronta não podem iniciar atendimento.
    if (!available) return;
    setCode(genCode());
    setStage('creating');
    // Cria a sessão; o cliente entra pelo QR/link e o atendente pelo botão.
    timers.current.push(window.setTimeout(() => setStage('waiting'), 700));
  }

  function enterAttendant() {
    navigate(`/atendente?s=${code}`);
  }

  function copyLink() {
    navigator.clipboard?.writeText(sessionLink).then(
      () => toast({ tone: 'success', message: 'Link copiado.' }),
      () => toast({ tone: 'error', message: 'Não foi possível copiar.' }),
    );
  }

  return (
    <div className="min-h-dvh bg-bg">
      <TopBar>
        <DeviceIndicator kind="mic" active />
        <DeviceIndicator kind="cam" active />
        <Btn variant="ghost" size="sm" icon="help">
          Ajuda
        </Btn>
      </TopBar>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <h1 className="font-head text-3xl font-semibold text-ink">Iniciar atendimento acessível</h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-2">
            Conecte o dispositivo do atendente ao dispositivo do cliente para começar a conversa.
          </p>
        </div>

        {/* Seletor de tipo */}
        <div role="radiogroup" aria-label="Tipo de atendimento" className="mt-8 grid gap-3 sm:grid-cols-3">
          {TYPES.map((t) => {
            const active = t.id === type;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setType(t.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border p-4 text-left transition-shadow',
                  active
                    ? 'border-brand bg-surface shadow-sm'
                    : 'border-line-subtle bg-subdued hover:bg-surface',
                )}
              >
                <span className={cn('grid size-10 place-items-center rounded-md', active ? 'bg-brand text-ink-inv' : 'bg-muted text-ink-2')}>
                  <Icon name={t.icon} size={20} stroke={2.2} />
                </span>
                <span className="flex flex-1 flex-wrap items-center gap-2">
                  <span className={cn('font-semibold', active ? 'text-brand' : 'text-ink')}>{t.label}</span>
                  {t.soon && <Pill tone="default">Em breve</Pill>}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        {stage === 'ready' && (
          <div className="mt-10 grid place-items-center gap-4">
            {available ? (
              <StartConversionBtn onClick={start} />
            ) : (
              <Alert tone="info" title="Tela em construção" className="w-full max-w-xl">
                O atendimento “{selected.label}” ainda não está disponível. Por enquanto,
                selecione <strong>Caixa</strong> para iniciar uma sessão.
              </Alert>
            )}
            <div className="flex flex-wrap justify-center gap-2">
              <Btn variant="outline" size="lg" icon="cam">
                Testar câmera e microfone
              </Btn>
              <Btn variant="ghost" size="lg" icon="info">
                Como funciona
              </Btn>
            </div>
          </div>
        )}

        {stage === 'creating' && (
          <div className="mt-10 grid place-items-center">
            <Btn size="xxl" loading>
              Criando sessão…
            </Btn>
          </div>
        )}

        {/* Card de status / aguardando cliente */}
        {stage === 'waiting' && (
          <Card className="mt-10" elevated>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ConnStatus status="online" />
                <Pill tone="warning">Aguardando cliente</Pill>
              </div>
              <Pill tone="brand">{code}</Pill>
            </div>

            <div className="mt-6 grid items-center gap-6 sm:grid-cols-[200px_1fr]">
              <div className="justify-self-center">
                <QrPlaceholder seed={[...code].reduce((a, c) => a + c.charCodeAt(0), 0)} />
              </div>
              <div className="grid gap-4">
                <p className="text-sm text-ink-2">
                  Peça para o cliente escanear o QR Code com o celular, ou compartilhe o link/código abaixo.
                </p>
                <Input label="Link da sessão" value={sessionLink} readOnly />
                <div className="flex gap-2">
                  <Btn variant="outline" icon="qr" onClick={copyLink}>
                    Copiar link
                  </Btn>
                  <Btn onClick={enterAttendant} icon="arrow">
                    Entrar no atendimento
                  </Btn>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <DeviceIndicator kind="cam" active />
                  <DeviceIndicator kind="mic" active />
                </div>
              </div>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
