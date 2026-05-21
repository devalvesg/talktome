/**
 * Interface do Atendente — painel operacional (desktop/tablet). Tela do M2.
 * Estado MOCADO localmente: clicar uma ação rápida ou enviar texto adiciona
 * ao histórico e simula a resposta do cliente. A sincronização real
 * atendente↔cliente entra no M3 (SessionChannel).
 * Spec: docs/Interface do Atendente.md.
 */
import { useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
import { QUICK_ACTIONS } from '@/session/QUICK_ACTIONS';
import type { HistoryEntry } from '@/session/types';

const now = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

/** Resposta mockada do cliente para uma pergunta (primeira opção). */
function mockAnswer(actionId: string): string {
  const a = QUICK_ACTIONS.find((q) => q.id === actionId);
  return a?.options[0]?.label ?? 'Sim';
}

export function Attendant() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const timers = useRef<number[]>([]);

  function sendQuestion(text: string, actionId?: string) {
    setHistory((h) => [
      ...h,
      { side: 'attendant', text, time: now(), kind: 'ÁUDIO → LIBRAS' },
    ]);
    if (actionId) {
      timers.current.push(
        window.setTimeout(() => {
          setHistory((h) => [
            ...h,
            { side: 'client', text: mockAnswer(actionId), time: now(), kind: 'LIBRAS → ÁUDIO' },
          ]);
        }, 1400),
      );
    }
  }

  function onFreeText(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('msg') as HTMLInputElement;
    const text = input.value.trim();
    if (!text) return;
    sendQuestion(text);
    input.value = '';
    toast({ tone: 'info', message: 'Mensagem enviada ao avatar.' });
  }

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
          <Transcription meta="PT-BR · 98%">
            Onde fica o setor de <mark>açougue</mark>?
          </Transcription>

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
              />
            </div>
            <Btn type="submit" icon="send">
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
            {history.length === 0 ? (
              <EmptyState
                icon="list"
                title="Nenhuma mensagem ainda"
                description="As perguntas e respostas aparecerão aqui."
              />
            ) : (
              history.map((h, i) => (
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
            <Btn variant="danger" onClick={() => navigate('/')}>
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
