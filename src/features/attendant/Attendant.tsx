/**
 * Interface do Atendente — painel operacional (desktop/tablet).
 * M3: ligado ao canal de sessão. Ações rápidas e texto livre publicam a
 * `question` + entrada no histórico compartilhado; a resposta do cliente
 * (de outra aba/dispositivo) chega pelo mesmo canal.
 * Spec: docs/Interface do Atendente.md.
 */
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Btn,
  ConnStatus,
  ConversationCard,
  DeviceIndicator,
  EmptyState,
  Input,
  Modal,
  Transcription,
  useToast,
  type IconName,
} from '@/ds/components';
import { TopBar } from '@/app/TopBar';
import { useSession } from '@/app/SessionChannelProvider';
import { QUICK_ACTIONS } from '@/session/QUICK_ACTIONS';

const now = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

const freeId = () => `free-${Date.now()}`;

export function Attendant() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { state, send, reset } = useSession();
  const [confirmEnd, setConfirmEnd] = useState(false);

  function sendQuestion(text: string, actionId?: string) {
    const action = actionId ? QUICK_ACTIONS.find((q) => q.id === actionId) : undefined;
    send({
      question: action
        ? { id: action.id, text: action.text, options: action.options }
        : { id: freeId(), text, options: [] },
      clientAnswer: null,
      history: [
        ...state.history,
        { side: 'attendant', text, time: now(), kind: 'ÁUDIO → LIBRAS' },
      ],
    });
  }

  function onFreeText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.avatarStatus !== 'ready') return;
    const input = e.currentTarget.elements.namedItem('msg') as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return;
    sendQuestion(text);
    input.value = '';
    toast({ tone: 'info', message: 'Mensagem enviada ao avatar.' });
  }

  function endSession() {
    reset();
    navigate('/');
  }

  const lastClient = [...state.history].reverse().find((h) => h.side === 'client');
  const avatarReady = state.avatarStatus === 'ready';

  return (
    <div className="flex min-h-dvh flex-col bg-bg">
      <TopBar>
        <ConnStatus status="online" />
        <span className="hidden sm:inline-flex">
          <DeviceIndicator kind="mic" active />
        </span>
        <span className="hidden md:inline-flex">
          <DeviceIndicator kind="cam" active />
        </span>
        <Btn variant="danger" size="sm" icon="x" onClick={() => setConfirmEnd(true)}>
          Encerrar
        </Btn>
      </TopBar>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-5 p-5 lg:grid-cols-[1fr_340px]">
        {/* Coluna principal */}
        <div className="flex flex-col gap-5">
          <Transcription active={state.clientRecording} meta={state.clientRecording ? 'Recebendo…' : 'PT-BR · 98%'}>
            {state.clientRecording
              ? 'Recebendo LIBRAS…'
              : lastClient
                ? lastClient.text
                : null}
          </Transcription>

          {/* Status do avatar do cliente — bloqueia o envio até carregar */}
          {state.avatarStatus === 'error' ? (
            <Alert tone="error" title="Avatar não carregado na tela do cliente">
              {state.avatarError
                ? `Erro: ${state.avatarError}. `
                : ''}
              Peça para o cliente recarregar a página. As ações ficam indisponíveis até o avatar voltar.
            </Alert>
          ) : (
            !avatarReady && (
              <Alert tone="info" title="Aguardando o avatar do cliente carregar">
                As ações rápidas e o envio liberam assim que o avatar estiver pronto na tela do cliente.
              </Alert>
            )
          )}

          {/* Ações rápidas */}
          <section>
            <h2 className="mb-3 font-head text-[15px] font-semibold text-ink">Ações rápidas</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {QUICK_ACTIONS.map((a) => (
                <Btn
                  key={a.id}
                  variant="outline"
                  size="xl"
                  icon={a.icon as IconName}
                  className="!h-auto min-h-16 flex-col gap-2 py-3 text-center !text-sm"
                  disabled={!avatarReady}
                  onClick={() => sendQuestion(a.text, a.id)}
                >
                  {a.text}
                </Btn>
              ))}
            </div>
          </section>

          {/* Texto livre */}
          <form onSubmit={onFreeText} className="mt-auto flex items-end gap-2">
            <div className="flex-1">
              <Input
                name="msg"
                label="Mensagem personalizada"
                placeholder="Digite uma pergunta ou instrução para o cliente"
                disabled={!avatarReady}
              />
            </div>
            <Btn type="submit" icon="send" disabled={!avatarReady}>
              Enviar
            </Btn>
          </form>
        </div>

        {/* Histórico */}
        <aside className="flex flex-col rounded-lg border border-line-subtle bg-surface">
          <div className="border-b border-line-subtle px-4 py-3">
            <h2 className="font-head text-[15px] font-semibold text-ink">Histórico</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {state.history.length === 0 ? (
              <EmptyState
                icon="list"
                title="Nenhuma mensagem ainda"
                description="As perguntas e respostas aparecerão aqui."
              />
            ) : (
              state.history.map((h, i) => (
                <ConversationCard
                  key={i}
                  side={h.side}
                  who={h.side === 'attendant' ? 'Atendente' : 'Cliente'}
                  kind={h.kind}
                  time={h.time}
                  message={h.text}
                />
              ))
            )}
          </div>
        </aside>
      </main>

      <Modal
        open={confirmEnd}
        onClose={() => setConfirmEnd(false)}
        title="Encerrar atendimento?"
        footer={
          <>
            <Btn variant="ghost" onClick={() => setConfirmEnd(false)}>
              Cancelar
            </Btn>
            <Btn variant="danger" onClick={endSession}>
              Encerrar
            </Btn>
          </>
        }
      >
        A sessão atual será encerrada e o histórico desta conversa será descartado.
      </Modal>
    </div>
  );
}
