/**
 * Interface do Cliente — mobile-first, a tela que carrega o produto. M2.
 * Estado MOCADO localmente: uma pergunta-demo é exibida e, ao responder,
 * avança para a próxima (ciclo de demonstração). A sincronização real com o
 * atendente entra no M3; o motor de avatar/câmera real, no M5/M6.
 * Spec: docs/Interface do Cliente.md.
 */
import { useRef, useState } from 'react';
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
  type IconName,
} from '@/ds/components';
import { TopBar } from '@/app/TopBar';
import { QUICK_ACTIONS } from '@/session/QUICK_ACTIONS';

export function Client() {
  const { toast } = useToast();
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const timers = useRef<number[]>([]);
  const question = QUICK_ACTIONS[qIndex];

  function answer(value: string, label: string) {
    setAnswered(value);
    toast({ tone: 'success', message: `Enviado: ${label}` });
    timers.current.push(
      window.setTimeout(() => {
        setAnswered(null);
        setQIndex((i) => (i + 1) % QUICK_ACTIONS.length);
      }, 1400),
    );
  }

  function toggleRecording() {
    setRecording((r) => {
      const next = !r;
      if (!next) {
        timers.current.push(
          window.setTimeout(() => toast({ tone: 'info', message: 'Processando sua sinalização…' }), 200),
        );
      }
      return next;
    });
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
          <LibrasViewer size="lg" caption={question.text} state="signaling" />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-ink-3">Mensagem do atendente</span>
            <Btn variant="outline" size="sm" icon="repeat">
              Repetir
            </Btn>
          </div>
        </div>

        {/* Botões de resposta (condicionais à pergunta) */}
        <section aria-label="Respostas">
          <div className={cn('grid gap-3', question.options.length >= 3 ? 'grid-cols-1' : 'grid-cols-2')}>
            {question.options.map((opt, i) => {
              const isYes = i === 0;
              return (
                <Btn
                  key={opt.value}
                  variant={isYes ? 'secondary' : 'outline'}
                  size="xxl"
                  icon={opt.icon as IconName}
                  full
                  disabled={answered !== null}
                  className={cn(answered === opt.value && 'brightness-[0.92]')}
                  onClick={() => answer(opt.value, opt.label)}
                >
                  {opt.label}
                </Btn>
              );
            })}
          </div>
        </section>

        {/* Câmera + iniciar conversão */}
        <section className="mt-auto grid gap-3">
          <div
            className={cn(
              'relative grid h-44 place-items-center overflow-hidden rounded-[14px] border-2 bg-inverse text-ink-inv',
              recording ? 't2m-anim-ring border-error' : 'border-brand',
            )}
            style={recording ? ({ ['--t2m-ring-color' as string]: 'rgba(176,32,47,0.5)' }) : undefined}
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
