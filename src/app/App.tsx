/**
 * Tela de sanidade do M0 (Fundação).
 *
 * Não é uma tela de produto — existe só para o checkpoint de saída do M0:
 * "uma tela de teste consome os tokens do DS". Será substituída pela
 * Landing Page no M2 (features/landing/).
 */

const swatches = [
  { name: 'brand', cls: 'bg-brand', fg: 'text-ink-inv', token: '--t2m-primary' },
  { name: 'accent', cls: 'bg-accent', fg: 'text-ink-inv', token: '--t2m-secondary' },
  { name: 'success', cls: 'bg-success', fg: 'text-ink-inv', token: '--t2m-success' },
  { name: 'warning', cls: 'bg-warning', fg: 'text-ink-inv', token: '--t2m-warning' },
  { name: 'error', cls: 'bg-error', fg: 'text-ink-inv', token: '--t2m-error' },
  { name: 'info', cls: 'bg-info', fg: 'text-ink-inv', token: '--t2m-info' },
];

function App() {
  const envOk =
    Boolean(import.meta.env.VITE_SUPABASE_URL) &&
    Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header className="mb-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-3">
          M0 · Fundação
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">
          Talk<span className="text-accent">2</span>Me
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-2">
          Scaffold Vite + React + TypeScript + Tailwind, consumindo os tokens do
          Design System via variáveis <code className="font-mono">--t2m-*</code>.
        </p>
      </header>

      {/* Cores */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-ink">Paleta (tokens)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {swatches.map((s) => (
            <div
              key={s.name}
              className={`${s.cls} ${s.fg} rounded-lg p-4 shadow-sm`}
            >
              <div className="font-semibold capitalize">{s.name}</div>
              <div className="font-mono text-xs opacity-80">{s.token}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografia */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-ink">Tipografia</h2>
        <div className="space-y-2 rounded-lg border border-line-subtle bg-surface p-5 shadow-sm">
          <p style={{ fontFamily: 'var(--t2m-head)' }} className="text-2xl">
            Lexend — títulos
          </p>
          <p style={{ fontFamily: 'var(--t2m-body)' }} className="text-lg">
            Atkinson Hyperlegible — corpo (Il1 O0 rn/m)
          </p>
          <p style={{ fontFamily: 'var(--t2m-mono)' }} className="text-sm">
            IBM Plex Mono — dados · PT-BR · 98%
          </p>
        </div>
      </section>

      {/* Estados de superfície */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-ink">Superfícies & raio</h2>
        <div className="flex flex-wrap gap-3">
          <div className="rounded-sm bg-muted px-4 py-3 text-sm">muted · sm</div>
          <div className="rounded-md bg-subdued px-4 py-3 text-sm">subdued · md</div>
          <div className="rounded-lg border border-line bg-surface px-4 py-3 text-sm shadow-md">
            surface · lg · shadow-md
          </div>
          <div className="rounded-xl bg-inverse px-4 py-3 text-sm text-ink-inv">
            inverse · xl
          </div>
        </div>
      </section>

      {/* Status do ambiente */}
      <section
        className="rounded-lg border-l-4 p-4"
        style={{
          borderColor: envOk ? 'var(--t2m-success)' : 'var(--t2m-warning)',
          background: envOk ? 'var(--t2m-success-bg)' : 'var(--t2m-warning-bg)',
        }}
      >
        <p className="font-mono text-xs uppercase tracking-wide">
          Supabase env
        </p>
        <p className="mt-1 text-sm">
          {envOk
            ? 'VITE_SUPABASE_URL e PUBLISHABLE_KEY carregadas. Pronto para o M4.'
            : 'Variáveis ausentes — copie .env.example para .env.local (necessário só a partir do M4).'}
        </p>
      </section>
    </main>
  );
}

export default App;
