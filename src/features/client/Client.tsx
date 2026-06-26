/**
 * Interface do Cliente — mobile-first, a tela que carrega o produto.
 * M3: ligado ao canal. Recebe a `question` do atendente e devolve
 * `clientAnswer` + entrada no histórico; o botão de gravar publica
 * `clientRecording`. Motor de avatar/câmera real entra no M5/M6.
 * Spec: docs/Interface do Cliente.md.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/cn';
import {
  Btn,
  ConnStatus,
  DeviceIndicator,
  EmptyState,
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
import { useLibrasRecognition } from './useLibrasRecognition';

const now = () =>
  new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

// mm:ss a partir de segundos decorridos.
const fmtElapsed = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export function Client() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state, send } = useSession();
  const lastAvatarStatus = useRef<string | null>(null);
  const question = state.question;
  const recording = state.clientRecording;
  // Câmera em tela cheia: só vale enquanto está gravando (se o atendente parar
  // a sessão, `fullscreen` vira false e o overlay recolhe sozinho).
  const [maximized, setMaximized] = useState(false);
  const fullscreen = maximized && recording;

  // Cronômetro real da gravação (mm:ss). Reset acontece no toggleRecording.
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  // Reconhecimento de datilologia: ativo só enquanto o cliente está "gravando".
  // O texto soletrado é publicado em `librasText` para o atendente acompanhar.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const recognition = useLibrasRecognition({
    active: recording,
    videoRef,
    canvasRef,
    onTextChange: (t) => send({ librasText: t || null }),
  });

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

  // Envia a palavra/frase soletrada ao atendente: entra no histórico e a
  // transcrição ao vivo é zerada (recognition.clear emite librasText vazio).
  // A gravação continua ligada para o cliente soletrar a próxima palavra.
  // Se havia uma pergunta aberta, a resposta em LIBRAS a conclui: limpa a
  // `question` (somem os botões de ação rápida) e registra o `clientAnswer`.
  function sendSpelled() {
    const text = recognition.text.trim();
    if (!text) return;
    send({
      ...(question
        ? { question: null, clientAnswer: { questionId: question.id, value: text } }
        : null),
      history: [
        ...state.history,
        { side: 'client', text, time: now(), kind: 'LIBRAS → ÁUDIO' },
      ],
    });
    recognition.clear();
    toast({ tone: 'success', message: `Enviado: ${text}` });
  }

  function toggleRecording() {
    const next = !recording;
    if (!next) setMaximized(false);
    setElapsed(0);
    send({ clientRecording: next });
    toast({
      tone: 'info',
      message: next
        ? 'Câmera ligada — soletre uma letra de cada vez.'
        : 'Câmera desligada.',
    });
  }

  // Atendente encerrou a sessão: desconecta o cliente com aviso.
  if (state.ended) {
    return (
      <div className="flex min-h-dvh flex-col bg-bg">
        <TopBar compact>
          <ConnStatus status="offline" />
        </TopBar>
        <main className="mx-auto flex w-full max-w-md flex-1 items-center justify-center p-6">
          <EmptyState
            icon="check"
            title="Atendimento encerrado"
            description="O atendente finalizou a conversa. Você já pode se afastar do balcão; para um novo atendimento, peça que iniciem outra sessão."
            action={
              <Btn variant="primary" onClick={() => navigate('/')}>
                Voltar ao início
              </Btn>
            }
          />
        </main>
      </div>
    );
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

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 p-4 lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Coluna esquerda: avatar + respostas (em telas largas fica ao lado da câmera) */}
        <div className="flex flex-col gap-4">
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
              <div
                className={cn(
                  'grid gap-3',
                  question.options.length >= 3 ? 'grid-cols-1' : 'grid-cols-2',
                )}
              >
                {question.options.map((opt, i) => {
                  // Sim = verde (secondary), Não = vermelho (danger); demais
                  // opções (crédito/débito, PIX…) mantêm o padrão anterior.
                  const variant =
                    opt.value === 'nao'
                      ? 'danger'
                      : opt.value === 'sim'
                        ? 'secondary'
                        : i === 0
                          ? 'secondary'
                          : 'outline';
                  return (
                    <Btn
                      key={opt.value}
                      variant={variant}
                      size="xxl"
                      icon={opt.icon as IconName}
                      full
                      onClick={() => answer(opt.value, opt.label)}
                    >
                      {opt.label}
                    </Btn>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Coluna direita: câmera + reconhecimento de datilologia + iniciar conversão */}
        <section className="mt-auto grid gap-3 lg:mt-0">
          {/* Em tela cheia, palco e painel saem do fluxo e cobrem a viewport;
              os mesmos refs de <video>/<canvas> são reposicionados via CSS. */}
          <div
            className={cn(
              fullscreen
                ? 'fixed inset-0 z-50 flex flex-col bg-inverse'
                : 'grid gap-3',
            )}
          >
            <div
              className={cn(
                'relative overflow-hidden bg-inverse text-ink-inv',
                fullscreen
                  ? 'flex-1'
                  : cn(
                      // 4:3 casa com o quadro da webcam: enche a coluna sem
                      // faixas e cresce junto com o espaço disponível no desktop.
                      'grid aspect-[4/3] place-items-center rounded-[14px] border-2',
                      recording ? 't2m-anim-ring border-error' : 'border-brand',
                    ),
              )}
              style={
                recording && !fullscreen
                  ? { ['--t2m-ring-color' as string]: 'rgba(176,32,47,0.5)' }
                  : undefined
              }
            >
              {/* Vídeo + esqueleto da mão, espelhados como selfie. */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={cn(
                  'absolute inset-0 h-full w-full -scale-x-100 transition-opacity',
                  // Tela cheia: mostra o quadro inteiro (sem cortar as mãos);
                  // inline: preenche a caixinha. O canvas usa o MESMO object-fit
                  // para o esqueleto da mão alinhar com o vídeo.
                  fullscreen ? 'object-contain' : 'object-cover',
                  recording ? 'opacity-100' : 'opacity-0',
                )}
              />
              <canvas
                ref={canvasRef}
                className={cn(
                  'absolute inset-0 h-full w-full -scale-x-100 transition-opacity',
                  fullscreen ? 'object-contain' : 'object-cover',
                  recording ? 'opacity-100' : 'opacity-0',
                )}
              />

              {!recording && (
                <div className="text-center opacity-80">
                  <Icon name="cam" size={32} color="#fff" />
                  <p className="mt-2 text-sm">
                    Posicione suas mãos dentro da área.
                  </p>
                </div>
              )}

              {recording && (
                <>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-error px-2.5 py-1 text-xs font-semibold">
                    <PulseDot color="#fff" size={6} /> REC
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium">
                    {recognition.modelReady === false
                      ? 'Modelo indisponível'
                      : !recognition.ready
                        ? 'Carregando…'
                        : recognition.handDetected
                          ? 'Mão detectada'
                          : 'Mostre a mão'}
                  </span>
                  {recognition.prediction && recognition.handDetected && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-black/55 px-3 py-1.5">
                      <span className="text-2xl font-bold leading-none">
                        {recognition.prediction.letter}
                      </span>
                      <span className="text-xs opacity-80">
                        {(recognition.prediction.confidence * 100).toFixed(0)}%
                      </span>
                    </span>
                  )}

                  {/* Maximizar / restaurar a câmera. */}
                  <button
                    type="button"
                    onClick={() => setMaximized((m) => !m)}
                    aria-label={
                      maximized ? 'Restaurar câmera' : 'Maximizar câmera'
                    }
                    className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                  >
                    <Icon
                      name={maximized ? 'minimize' : 'maximize'}
                      size={16}
                      color="#fff"
                    />
                    {maximized ? 'Restaurar' : 'Maximizar'}
                  </button>
                </>
              )}
            </div>

            {/* Texto soletrado (também enviado ao atendente em tempo real). */}
            {recording && (
              <div
                className={cn(
                  'border-line bg-surface',
                  fullscreen
                    ? 'border-t px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3'
                    : 'rounded-[12px] border px-3 py-2.5',
                )}
              >
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink-3">
                  <Icon name="hand" size={14} /> Texto soletrado
                </span>
                <p
                  className={cn(
                    'mt-2 flex min-h-9 items-center font-bold tracking-[0.12em] text-ink',
                    fullscreen ? 'text-3xl' : 'text-2xl',
                  )}
                >
                  {recognition.text ? (
                    <>
                      <span className="break-all">{recognition.text}</span>
                      <span
                        className="ml-1 inline-block h-7 w-0.5 animate-pulse bg-brand"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <em className="text-sm font-normal tracking-normal text-ink-3">
                      Soletre uma letra de cada vez…
                    </em>
                  )}
                </p>
                {/* Ações acessíveis: alvos de toque amplos (≥44px), rótulos
                    autoexplicativos e borda visível para quem usa toque/baixa visão. */}
                <div className="mt-3 flex flex-col gap-2">
                  <Btn
                    variant="primary"
                    size="xl"
                    icon="send"
                    full
                    onClick={sendSpelled}
                    disabled={!recognition.text}
                  >
                    Enviar mensagem
                  </Btn>
                  <div className="grid grid-cols-2 gap-2">
                    <Btn
                      variant="outline"
                      size="lg"
                      icon="chevL"
                      onClick={recognition.backspace}
                      disabled={!recognition.text}
                      aria-label="Apagar a última letra"
                    >
                      Apagar letra
                    </Btn>
                    <Btn
                      variant="outline"
                      size="lg"
                      icon="x"
                      onClick={recognition.clear}
                      disabled={!recognition.text}
                      aria-label="Limpar todo o texto"
                    >
                      Limpar tudo
                    </Btn>
                  </div>
                </div>
              </div>
            )}
          </div>

          {recognition.error && (
            <p className="text-xs text-error">{recognition.error}</p>
          )}

          {/* O CTA principal some no modo tela cheia (use "Restaurar" para voltar). */}
          {!fullscreen && (
            <div className="grid place-items-stretch sm:place-items-center">
              <StartConversionBtn
                active={recording}
                elapsed={fmtElapsed(elapsed)}
                onClick={toggleRecording}
                className="w-full sm:w-auto"
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
