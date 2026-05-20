# Talk2Me

Aplicação web de **acessibilidade em LIBRAS** para atendimento (TCC) — avatar 3D
que sinaliza as falas do atendente e, na frente 2 (opcional), reconhecimento de
sinais do cliente pela câmera. Contexto: balcão de supermercado.

> Documentação completa no vault Obsidian em [`docs/`](./docs) — comece por
> `docs/TalkToMe.md` (MOC) e `docs/Plano de Desenvolvimento.md` (roadmap M0→M7).

## Stack

| Camada | Decisão |
| ------ | ------- |
| Build | Vite + React + TypeScript |
| Estilo | Tailwind v4 com tokens do DS (`--t2m-*`) |
| Fontes | Lexend · Atkinson Hyperlegible · IBM Plex Mono |
| Canal de sessão | `SessionChannel` → `MockChannel` (M3) / `SupabaseChannel` (M4) |
| Backend | Supabase (Realtime + Postgres mínimo), free tier |
| Hospedagem | Host estático free (Vercel) |

## Começando

```bash
npm install
cp .env.example .env.local   # preencha as chaves do Supabase (necessário só no M4+)
npm run dev                  # sobe a SPA em http://localhost:5173
```

### Scripts

| Script | O que faz |
| ------ | --------- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | type-check + build de produção |
| `npm run preview` | serve o build localmente |
| `npm run typecheck` | checagem de tipos |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |

## Fluxo de trabalho

- Código vai na branch **`dev`** (deploy de preview). `main` recebe só versões
  estáveis (merge + tag `v0.x`).
- Convenção de commit: `<tipo>(<escopo>): <descrição>` — ver Plano §4.
- Antes de mexer num módulo, consulte o **Quadro de Alocação** (Plano §6).

## Estrutura

```
src/
  app/        bootstrap, rotas, providers
  ds/         Design System em código (congelado após M1)
  features/   landing · home · attendant · client
  session/    contrato tipado + SessionChannel (congelado)
  lib/        cliente supabase, utils
  styles/     index.css (Tailwind + tema) + tokens.css (--t2m-*)
```

## Deploy

SPA estática. `vercel.json` já configura build (`dist`) e rewrites de SPA.
Conectar o repositório no Vercel apontando a branch `dev` (preview) e `main`
(produção). As variáveis `VITE_SUPABASE_*` precisam ser definidas no painel.
