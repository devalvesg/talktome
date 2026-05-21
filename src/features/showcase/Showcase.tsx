/**
 * Página de showcase do Design System (checkpoint do M1).
 *
 * Renderiza todos os componentes core e de produto, fiéis ao DS, para
 * inspeção visual. Não é tela de produto — some quando o roteamento entrar
 * no M2. Referência: docs/Design System.md.
 */
import { useState } from 'react';
import {
  A11yStatus,
  Alert,
  AudioPlayer,
  Btn,
  Card,
  ConnStatus,
  ConversationCard,
  DeviceIndicator,
  EmptyState,
  Input,
  LibrasViewer,
  Modal,
  ModeSelector,
  Pill,
  Select,
  Skeleton,
  SoundWave,
  Spinner,
  StartConversionBtn,
  Textarea,
  Transcription,
  Wordmark,
  useToast,
  type BtnVariant,
  type ConversionMode,
} from '@/ds/components';

function Section({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">{kicker}</p>
      <h2 className="mb-4 mt-1 font-head text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

const VARIANTS: BtnVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'light'];

export function Showcase() {
  const { toast } = useToast();
  const [modal, setModal] = useState(false);
  const [mode, setMode] = useState<ConversionMode>('audio2libras');
  const [running, setRunning] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <Wordmark height={32} />
        <Pill tone="brand">M1 · Design System</Pill>
      </header>

      {/* Botões */}
      <Section kicker="08 · Componentes" title="Botões">
        <Card className="mb-3 flex flex-wrap gap-3">
          {VARIANTS.map((v) => (
            <Btn key={v} variant={v}>
              {v}
            </Btn>
          ))}
        </Card>
        <Card className="mb-3 flex flex-wrap items-center gap-3">
          <Btn size="sm">Small</Btn>
          <Btn size="md">Medium</Btn>
          <Btn size="lg">Large</Btn>
          <Btn size="xl" icon="play">
            Extra
          </Btn>
        </Card>
        <Card className="flex flex-wrap items-center gap-3">
          <Btn icon="mic">Com ícone</Btn>
          <Btn variant="secondary" iconRight="arrow">
            Ícone à direita
          </Btn>
          <Btn loading>Carregando</Btn>
          <Btn disabled>Desabilitado</Btn>
          <Btn iconOnly icon="cog" aria-label="Configurar" />
          <Btn variant="danger" iconOnly icon="stop" aria-label="Parar" />
        </Card>
      </Section>

      {/* Inputs */}
      <Section kicker="09 · Componentes" title="Inputs">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="grid gap-4">
            <Input label="Nome do atendente" placeholder="Ex.: Maria Silva" />
            <Input label="Buscar produto" placeholder="Nome ou código" icon="search" />
            <Select label="Idioma de fala" defaultValue="pt">
              <option value="pt">Português (BR)</option>
              <option value="en">English</option>
            </Select>
          </Card>
          <Card className="grid gap-4">
            <Textarea label="Mensagem rápida" placeholder="Digite o que quer dizer ao cliente surdo…" />
            <Input
              label="Conexão"
              defaultValue="Conexão verificada"
              icon="wifi"
              hint="Pronto para iniciar."
            />
            <Input label="Senha" defaultValue="curta" error="Mínimo 8 caracteres." icon="user" />
          </Card>
        </div>
      </Section>

      {/* Pills */}
      <Section kicker="10 · Componentes" title="Pills">
        <Card className="flex flex-wrap gap-2">
          <Pill>Default</Pill>
          <Pill tone="brand">Brand</Pill>
          <Pill tone="accent">Accent</Pill>
          <Pill tone="success">Online</Pill>
          <Pill tone="warning">Atenção</Pill>
          <Pill tone="error">Erro</Pill>
          <Pill tone="info">Info</Pill>
        </Card>
      </Section>

      {/* Feedback */}
      <Section kicker="13 · Componentes" title="Feedback">
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Alert tone="success" title="Conexão estabelecida">
            O serviço de tradução está pronto para uso.
          </Alert>
          <Alert tone="warning" title="Câmera com baixa luminosidade" onClose={() => {}}>
            Acenda mais luz para melhorar o reconhecimento.
          </Alert>
          <Alert tone="error" title="Microfone bloqueado">
            Permita o acesso ao microfone nas configurações do navegador.
          </Alert>
          <Alert tone="info" title="Atualização disponível">
            A versão 1.2 traz suporte a Libras regional do Nordeste.
          </Alert>
        </div>
        <div className="mb-4 flex flex-wrap gap-3">
          <Btn variant="outline" onClick={() => setModal(true)}>
            Abrir modal
          </Btn>
          <Btn variant="outline" onClick={() => toast({ tone: 'success', message: 'Conversão iniciada!' })}>
            Disparar toast
          </Btn>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <EmptyState
              title="Nenhuma conversa ainda"
              description="Suas conversões aparecerão aqui."
              action={
                <Btn variant="outline" size="sm" icon="plus">
                  Iniciar
                </Btn>
              }
            />
          </Card>
          <Card className="grid place-items-center text-center">
            <div>
              <Spinner size={40} color="var(--t2m-primary)" />
              <p className="mt-3 font-head text-sm font-semibold">Conectando…</p>
            </div>
          </Card>
          <Card className="grid gap-3">
            <div className="flex gap-3">
              <Skeleton width={44} height={44} round />
              <div className="flex-1 space-y-2">
                <Skeleton width="60%" height={12} />
                <Skeleton width="40%" height={10} />
              </div>
            </div>
            <Skeleton height={10} />
            <Skeleton width="80%" height={10} />
          </Card>
        </div>
      </Section>

      {/* Produto */}
      <Section kicker="14 · Produto" title="Componentes de produto">
        <h3 className="mb-3 font-head text-[15px] font-semibold">Conversão</h3>
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <StartConversionBtn active={running} elapsed="02:34" onClick={() => setRunning((r) => !r)} />
          <ModeSelector mode={mode} onChange={setMode} />
        </div>

        <h3 className="mb-3 font-head text-[15px] font-semibold">Indicadores</h3>
        <div className="mb-6 flex flex-wrap gap-3">
          <DeviceIndicator kind="mic" active />
          <DeviceIndicator kind="mic" active={false} />
          <DeviceIndicator kind="cam" active />
          <ConnStatus status="online" />
          <ConnStatus status="weak" />
          <ConnStatus status="offline" />
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 font-head text-[15px] font-semibold">Avatar de Libras</h3>
            <LibrasViewer caption="Bom dia! Em que posso ajudar?" />
          </div>
          <div className="grid content-start gap-4">
            <div>
              <h3 className="mb-3 font-head text-[15px] font-semibold">Player de áudio</h3>
              <AudioPlayer playing time="00:08 / 00:24" />
            </div>
            <div>
              <h3 className="mb-3 font-head text-[15px] font-semibold">Transcrição</h3>
              <Transcription>
                Onde fica o setor de <mark>açougue</mark>?
              </Transcription>
            </div>
          </div>
        </div>

        <h3 className="mb-3 font-head text-[15px] font-semibold">Card de conversa</h3>
        <div className="mb-6 max-w-2xl rounded-[14px] bg-subdued p-4">
          <ConversationCard
            side="client"
            who="Cliente"
            kind="LIBRAS → ÁUDIO"
            time="14:32"
            message="Bom dia. Onde fica o setor de açougue?"
          />
          <ConversationCard
            side="attendant"
            who="Atendente"
            kind="ÁUDIO → LIBRAS"
            time="14:32"
            message="Fica no fundo da loja, à esquerda da padaria. Quer que eu te leve?"
          />
        </div>

        <h3 className="mb-3 font-head text-[15px] font-semibold">SoundWave</h3>
        <Card className="mb-6">
          <SoundWave active color="var(--t2m-primary)" bars={40} height={28} />
        </Card>

        <h3 className="mb-3 font-head text-[15px] font-semibold">Status de acessibilidade</h3>
        <Card>
          <A11yStatus
            items={[
              { label: 'Contraste AA', ok: true },
              { label: 'Legendas ativas', ok: true },
              { label: 'Avatar Libras', ok: true },
              { label: 'Áudio descritivo', ok: false },
              { label: 'Texto ampliado', ok: false },
            ]}
          />
        </Card>
      </Section>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Encerrar conversão?"
        footer={
          <>
            <Btn variant="ghost" onClick={() => setModal(false)}>
              Cancelar
            </Btn>
            <Btn variant="danger" onClick={() => setModal(false)}>
              Encerrar
            </Btn>
          </>
        }
      >
        Você está em uma conversa ativa. Se sair agora, a sessão será encerrada e não poderá ser retomada.
      </Modal>
    </div>
  );
}
