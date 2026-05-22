/**
 * Interface do Cliente — mobile-first, a tela que carrega o produto.
 * M3: ligado ao canal. Recebe a `question` do atendente e devolve
 * `clientAnswer` + entrada no histórico; o botão de gravar publica
 * `clientRecording`. Motor de avatar/câmera real entra no M5/M6.
 * Spec: docs/Interface do Cliente.md.
 */
import { useCallback, useRef } from 'react';
import { cn } from '@/lib/cn';
import {
  Btn,
  ConnStatus,
  DeviceIndicator,
  Icon,
  LibrasViewer,
  PulseDot,
  StartConversionBtn,
  useToast,
  type AvatarLoadStatus,
  type IconName,
} from '@/ds/components';
import { repeatVLibras } from '@/lib/vlibrasPlayer';
import { TopBar } from '@/app/TopBar';
import { useSession } from '@/app/SessionChannelProvider';

const now = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

export function Client() {
  const { toast } = useToast();
  const { state, send } = useSession();
  const timers = useRef<number[]>([]);
  const lastAvatarStatus = useRef<string | null>(null);
  const question = state.question;
  const recording = state.clientRecording;

  // Publica a carga do avatar no canal (o atendente libera as ações com 'ready').
  const onAvatarStatus = useCallback(
    (status: AvatarLoadStatus, error?: string) => {
      const key = `${status}:${error ?? ''}`;
      if (lastAvatarStatus.current === key) return;
      lastAvatarStatus.current = key;
      send({ avatarStatus: status, avatarError: error ?? null });
    },
    [send],
  );

  function answer(value: string, label: string) {
    if (!question) return;
    send({
      clientAnswer: { questionId: question.id, value },
      question: null,
      history: [
        ...state.history,
        { side: 'client', text: label, time: now(), kind: 'LIBRAS → ÁUDIO' },
      ],
    });
    toast({ tone: 'success', message: `Enviado: ${label}` });
  }

  function toggleRecording() {
    const next = !recording;
    send({ clientRecording: next });
    if (!next) {
      timers.current.push(
        window.setTimeout(
          () => toast({ tone: 'info', message: 'Processando sua sinalização…' }),
          200,
        ),
      );
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <TopBar compact>
        <ConnStatus status="online" />
        <span className="hidden sm:inline-flex">
          <DeviceIndicator kind="cam" active />
        </span>
        <Btn variant="ghost" size="sm" icon="help" aria-label="Ajuda">
          <span className="hidden sm:inline">Ajuda</span>
        </Btn>
      </TopBar>

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 p-4">
        {/* Avatar */}
        <div>
          <LibrasViewer
            size="lg"
            live
            caption={question?.text ?? 'Aguardando atendente…'}
            state={question ? 'signaling' : 'neutral'}
            onAvatarStatus={onAvatarStatus}
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-ink-3">Mensagem do atendente</span>
            <Btn
              variant="outline"
              size="sm"
              icon="repeat"
              disabled={!question}
              onClick={() => repeatVLibras()}
            >
              Repetir
            </Btn>
          </div>
        </div>

        {/* Botões de resposta (condicionais à pergunta recebida) */}
        {question && question.options.length > 0 && (
          <section aria-label="Respostas" className="t2m-anim-fade-in">
            <div className={cn('grid gap-3', question.options.length >= 3 ? 'grid-cols-1' : 'grid-cols-2')}>
              {question.options.map((opt, i) => (
                <Btn
                  key={opt.value}
                  variant={i === 0 ? 'secondary' : 'outline'}
                  size="xxl"
                  icon={opt.icon as IconName}
                  full
                  onClick={() => answer(opt.value, opt.label)}
                >
                  {opt.label}
                </Btn>
              ))}
            </div>
          </section>
        )}

        {/* Câmera + iniciar conversão */}
        <section className="mt-auto grid gap-3">
          <div
            className={cn(
              'relative grid h-44 place-items-center overflow-hidden rounded-[14px] border-2 bg-inverse text-ink-inv',
              recording ? 't2m-anim-ring border-error' : 'border-brand',
            )}
            style={recording ? { ['--t2m-ring-color' as string]: 'rgba(176,32,47,0.5)' } : undefined}
          >
            <div className="text-center opacity-80">
              <Icon name="cam" size={32} color="#fff" />
              <p className="mt-2 text-sm">
                {recording ? 'Gravando…' : 'Posicione suas mãos dentro da área.'}
              </p>
            </div>
            {recording && (
              <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-error px-2.5 py-1 text-xs font-semibold">
                <PulseDot color="#fff" size={6} /> REC
              </span>
            )}
          </div>
          <div className="grid place-items-center">
            <StartConversionBtn active={recording} elapsed="00:12" onClick={toggleRecording} />
          </div>
        </section>
      </main>
    </div>
  );
}
