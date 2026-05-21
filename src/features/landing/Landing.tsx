/**
 * Landing Page — institucional/comercial. Tela estática do M2.
 * O formulário de demonstração apenas valida + toast por enquanto;
 * a persistência em `demo_requests` (Supabase) entra no M4.
 * Spec: docs/Landing Page.md.
 */
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Btn,
  Card,
  Icon,
  Input,
  Pill,
  Textarea,
  Wordmark,
  useToast,
  type IconName,
} from '@/ds/components';

const STEPS: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'play', title: 'O atendente inicia a conversa', desc: 'Um toque abre a sessão e conecta os dois dispositivos.' },
  { icon: 'hand', title: 'O cliente se comunica em Libras', desc: 'Por sinais na câmera ou por respostas rápidas, com autonomia.' },
  { icon: 'swap', title: 'O sistema traduz em tempo real', desc: 'Áudio vira Libras no avatar; sinais viram texto para o atendente.' },
];

const BENEFITS: { icon: IconName; title: string }[] = [
  { icon: 'users', title: 'Atendimento mais inclusivo' },
  { icon: 'swap', title: 'Menos barreiras de comunicação' },
  { icon: 'hand', title: 'Mais autonomia para clientes surdos' },
  { icon: 'check', title: 'Facilidade para os funcionários' },
  { icon: 'shop', title: 'Melhor experiência no caixa' },
  { icon: 'a11y', title: 'Apoio à acessibilidade no varejo' },
];

const WHERE: { icon: IconName; label: string }[] = [
  { icon: 'card', label: 'Caixas (PDV)' },
  { icon: 'user', label: 'Balcões de atendimento' },
  { icon: 'shop', label: 'Totens de autoatendimento' },
  { icon: 'phone', label: 'Tablets de balcão' },
  { icon: 'cog', label: 'Computadores dos funcionários' },
];

export function Landing() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const next: typeof errors = {};
    if (!name) next.name = 'Informe seu nome.';
    if (!/.+@.+\..+/.test(email)) next.email = 'Informe um e-mail válido.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    // M4: gravar em demo_requests. Por ora, simula envio.
    window.setTimeout(() => {
      setSending(false);
      form.reset();
      toast({ tone: 'success', message: 'Pedido de demonstração enviado! Entraremos em contato.' });
    }, 600);
  }

  return (
    <div className="bg-bg">
      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Wordmark height={30} />
        <nav className="flex items-center gap-2">
          <Btn variant="ghost" size="sm" onClick={() => document.getElementById('como')?.scrollIntoView({ behavior: 'smooth' })}>
            Como funciona
          </Btn>
          <Link to="/home">
            <Btn variant="outline" size="sm" icon="play">
              Abrir sistema
            </Btn>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-8 lg:grid-cols-2">
        <div className="t2m-anim-fade-in">
          <Pill tone="accent">Acessibilidade no varejo</Pill>
          <h1 className="mt-4 font-head text-4xl font-bold leading-tight text-ink">
            Comunicação acessível entre supermercados e pessoas surdas.
          </h1>
          <p className="mt-4 max-w-xl text-xl text-ink-2">
            Converta áudio em Libras e Libras em texto/voz para tornar o atendimento mais inclusivo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn size="lg" icon="arrow" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
              Conhecer solução
            </Btn>
            <Link to="/cliente">
              <Btn variant="outline" size="lg" icon="hand">
                Ver demonstração
              </Btn>
            </Link>
          </div>
        </div>

        {/* Mockup: duas telas lado a lado */}
        <div className="relative grid grid-cols-2 gap-4">
          <Card flush className="overflow-hidden">
            <div className="bg-brand p-3 text-ink-inv">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-80">Atendente</span>
            </div>
            <div className="space-y-2 p-3">
              <div className="h-2 w-2/3 rounded bg-muted" />
              <div className="h-2 w-full rounded bg-muted" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-8 rounded-md border border-line" />
                <div className="h-8 rounded-md border border-line" />
              </div>
            </div>
          </Card>
          <Card flush className="mt-8 overflow-hidden">
            <div
              className="grid h-28 place-items-center text-ink-inv"
              style={{ background: 'linear-gradient(160deg, #0F0F44 0%, #191970 70%, #2E2E8C 100%)' }}
            >
              <Icon name="hand" size={44} color="#33D6C6" stroke={1.6} />
            </div>
            <div className="grid grid-cols-2 gap-2 p-3">
              <div className="h-10 rounded-md bg-accent/15" />
              <div className="h-10 rounded-md border border-line" />
            </div>
          </Card>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center font-head text-3xl font-semibold text-ink">Como funciona</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Card key={s.title}>
              <div className="mb-4 grid size-12 place-items-center rounded-lg bg-brand-50 text-brand">
                <Icon name={s.icon} size={24} stroke={2.2} />
              </div>
              <span className="font-mono text-xs text-ink-3">Passo {i + 1}</span>
              <h3 className="mt-1 font-head text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink-2">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-subdued py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-head text-3xl font-semibold text-ink">Benefícios</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <Card key={b.title} className="flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600">
                  <Icon name={b.icon} size={22} stroke={2.2} />
                </div>
                <span className="font-head font-semibold text-ink">{b.title}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Onde usar */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center font-head text-3xl font-semibold text-ink">Para supermercados</h2>
        <p className="mt-2 text-center text-ink-2">Onde o Talk2Me pode operar:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {WHERE.map((w) => (
            <span key={w.label} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink">
              <Icon name={w.icon} size={18} color="var(--t2m-secondary)" />
              {w.label}
            </span>
          ))}
        </div>
      </section>

      {/* Demonstração visual */}
      <section id="demo" className="bg-subdued py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-head text-3xl font-semibold text-ink">Veja em ação</h2>
          <div className="mt-10 grid items-center gap-4 lg:grid-cols-3">
            <Link to="/home" className="lg:order-1">
              <Card className="transition-shadow hover:shadow-md">
                <Pill tone="brand">Home</Pill>
                <h3 className="mt-2 font-head font-semibold text-ink">Iniciar atendimento</h3>
                <p className="mt-1 text-sm text-ink-2">O atendente abre uma sessão em segundos.</p>
              </Card>
            </Link>
            <Link to="/cliente" className="lg:order-2">
              <Card elevated className="ring-2 ring-brand/20 transition-shadow hover:shadow-lg">
                <Pill tone="accent">Cliente · destaque</Pill>
                <h3 className="mt-2 font-head font-semibold text-ink">Avatar em Libras</h3>
                <p className="mt-1 text-sm text-ink-2">A tela que comunica acessibilidade real.</p>
              </Card>
            </Link>
            <Link to="/atendente" className="lg:order-3">
              <Card className="transition-shadow hover:shadow-md">
                <Pill tone="brand">Atendente</Pill>
                <h3 className="mt-2 font-head font-semibold text-ink">Painel do atendimento</h3>
                <p className="mt-1 text-sm text-ink-2">Transcrição, histórico e ações rápidas.</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final + formulário */}
      <section className="bg-brand py-16 text-ink-inv">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-head text-3xl font-bold">Torne seu atendimento mais acessível.</h2>
            <p className="mt-3 text-lg text-white/80">
              Solicite uma demonstração e veja o Talk2Me funcionando no seu contexto.
            </p>
          </div>
          <Card className="bg-surface text-ink">
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <Input name="name" label="Nome" placeholder="Seu nome" error={errors.name} />
              <Input name="email" type="email" label="E-mail" placeholder="voce@empresa.com" icon="user" error={errors.email} />
              <Textarea name="message" label="Mensagem (opcional)" placeholder="Conte um pouco sobre sua loja…" />
              <Btn type="submit" size="lg" full loading={sending} icon="send">
                Solicitar demonstração
              </Btn>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line-subtle bg-surface py-10">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          <div>
            <Wordmark height={24} />
            <p className="mt-3 text-sm text-ink-2">
              Projeto de TCC — Engenharia de Software, Uni-FACEF.
            </p>
          </div>
          <div className="text-sm text-ink-2">
            <h3 className="font-head font-semibold text-ink">Projeto</h3>
            <ul className="mt-2 space-y-1">
              <li>Sobre o Talk2Me</li>
              <li>Acessibilidade</li>
              <li>Política de privacidade</li>
            </ul>
          </div>
          <div className="text-sm text-ink-2">
            <h3 className="font-head font-semibold text-ink">Contato</h3>
            <ul className="mt-2 space-y-1">
              <li>contato@talk2me.app</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
