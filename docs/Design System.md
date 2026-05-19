---
title: Design System
aliases:
  - DS
  - Talk2Me Design System
  - Sistema de Design
tags:
  - tcc
  - design
  - ui
  - ux
  - acessibilidade
  - design-system
status: v1.0
criado: 2026-05-14
atualizado: 2026-05-19
fonte: https://api.anthropic.com/v1/design/h/vDdDi4DEuaN5tMM-o5u70g?open_file=Talk2Me+Screens.html
---

# Design System

> [!abstract] Em uma frase
> Sistema visual **v1.0** do Talk2Me — paleta, tipografia, tokens e componentes, derivados da paleta-base institucional **Midnight Blue `#191970`** e do acento **Teal `#0E9A8D`**.

> [!important] Apenas referência visual — NÃO copiar código
> Este DS foi produzido no Claude Design (claude.ai/design) em **14–15 de maio de 2026** e está versionado em `docs/design-system-bundle/`.
>
> **O bundle serve exclusivamente como especificação visual e comportamental.** Os arquivos `.jsx`, `.html` e `.js` dentro de `design-system-bundle/` são **protótipos descartáveis** — feitos para visualizar tokens, paleta, componentes e fluxo das telas. **Nenhuma linha desse código será reutilizada no produto.**
>
> Nós escreveremos nosso próprio código frontend do zero, na stack que escolhermos, **replicando o resultado visual** — não a estrutura interna do protótipo. Quando uma nota mencionar nomes como `Btn`, `LibrasViewer`, `Transcription`, `ConversationCard`, `__T2M_BUS` etc., trate-os como **descrições de componentes a recriar** (forma, estado, comportamento), não como módulos a importar.
>
> O que importa do bundle:
> - **Tokens** (cores, tipografia, spacing, radius, shadow, motion) — replicar valor por valor.
> - **Layout e hierarquia** das telas — replicar pixel-perfeito.
> - **Comportamento interativo** — estados, animações, transições.
> - **Catálogo `QUICK_ACTIONS`** — as 8 perguntas, IDs, ícones e respostas são parte do produto.
>
> O que ignorar:
> - Estrutura dos componentes React do protótipo.
> - `window.__T2M_BUS` — substituir por implementação real de canal síncrono (WebSocket/WebRTC).
> - Qualquer atalho específico do canvas (`DCSection`, `DCArtboard`, painel `Tweaks`).

## Identidade visual

### Conceito

> [!quote] Conceito da marca
> Um **círculo** (inclusão, comunidade, totalidade) contendo **dois balões de fala** simétricos: um à esquerda (azul — voz, atendente) e um à direita (teal — LIBRAS, cliente surdo). O **"2"** no wordmark marca o ponto onde os dois mundos se encontram.

### Pilares

| Pilar           | Como aparece no produto                          |
| --------------- | ------------------------------------------------ |
| Acessibilidade  | WCAG AA, toque ≥44px, contraste alto             |
| Confiança       | Tipografia institucional, paleta sóbria          |
| Clareza         | Hierarquia visual, espaço generoso               |
| Inclusão        | Bilíngue: voz + LIBRAS, nunca um sem o outro     |

### Princípios

1. **Comunicação primeiro** — a interface se cala para que a conversa apareça.
2. **Toque grande, dúvida pequena** — hit area mínima 44px; rótulos sempre presentes.
3. **Estados visíveis** — microfone, câmera e conexão sempre sinalizados.
4. **Erros amigáveis** — linguagem simples; sempre oferecer o próximo passo.

### Versões da logo

- **Principal** — wordmark `Talk2Me` com ícone à esquerda; o `2` em teal.
- **Reduzida** — apenas o ícone circular (favicon, app icon, totem em modo compacto).
- **Monocromática** — versão para impressão, fundos coloridos, watermark.

**Área de respiro:** mínimo **1×** da altura do ícone ao redor da marca; **1.5×** em totens e impressos.

**Fundo escuro:** usar wordmark branco com acento `#33D6C6` (variação clara do teal) — não o teal padrão, que perde contraste sobre `#0A0A2D`.

## Paleta de cores

### Brand

| Token              | Hex       | Uso                                          |
| ------------------ | --------- | -------------------------------------------- |
| `brand.primary`    | `#191970` | **Midnight Blue** — cor-mãe da marca         |
| `brand.primary50`  | `#EEEEF7` | Fundo de chip/pill brand                     |
| `brand.primary100` | `#D6D6EC` | Hover de superfícies brand                   |
| `brand.primary200` | `#ADADD9` | Bordas brand suaves                          |
| `brand.primary300` | `#7A7AC2` | Texto brand sobre fundo claro                |
| `brand.primary400` | `#4A4AAB` | Focus ring                                   |
| `brand.primary500` | `#2E2E8C` | Hover de botão primary                       |
| `brand.primary600` | `#191970` | = primary                                    |
| `brand.primary700` | `#13135A` | Texto sobre fundo claro, link                |
| `brand.primary800` | `#0D0D42` | Pressed states                               |
| `brand.primary900` | `#08082B` | Backgrounds escuros                          |
| `brand.secondary`  | `#0E9A8D` | **Teal** — acento de ação, indicador ativo   |
| `brand.secondary50` | `#E6F7F5` | Fundo de chip accent                         |
| `brand.secondary600` | `#0A7D72` | Texto accent                                |
| `brand.secondary700` | `#076058` | Pressed accent                              |

### Background & Surface

| Token                | Hex       | Uso                                         |
| -------------------- | --------- | ------------------------------------------- |
| `background.default` | `#FAFBFC` | Fundo de página padrão                      |
| `background.muted`   | `#ECEFF1` | **Base gray** — fundo de inputs, chips      |
| `background.inverse` | `#0A0A2D` | Fundo escuro (modo escuro / áreas de vídeo) |
| `surface.default`    | `#FFFFFF` | Cards, painéis                              |
| `surface.elevated`   | `#FFFFFF` | Cards elevados (com shadow `md`)            |
| `surface.subdued`    | `#F5F7F8` | Card secundário, container neutro           |

### Text

| Token            | Hex       | Uso                                 |
| ---------------- | --------- | ----------------------------------- |
| `text.primary`   | `#0F1729` | Texto principal                     |
| `text.secondary` | `#4A5763` | Texto de apoio                      |
| `text.tertiary`  | `#7A8794` | Legendas, metadata                  |
| `text.inverse`   | `#FFFFFF` | Texto sobre fundo escuro/brand      |
| `text.brand`     | `#191970` | Texto destacado em brand            |
| `text.link`      | `#13135A` | Links                               |

### Border

| Token            | Hex       | Uso                              |
| ---------------- | --------- | -------------------------------- |
| `border.default` | `#CFD8DC` | Bordas padrão                    |
| `border.strong`  | `#90A4AE` | Bordas marcadas (inputs focados) |
| `border.subtle`  | `#E4E9EC` | Divisores, bordas de card        |
| `border.brand`   | `#191970` | Outline de elementos brand       |

### Feedback

| Token              | Hex       | Fundo    | Uso                          |
| ------------------ | --------- | -------- | ---------------------------- |
| `feedback.success` | `#1E7A53` | `#E5F4EC` | Confirmação, Sim, conectado  |
| `feedback.warning` | `#A8650F` | `#FDF1DA` | Atenção, conexão instável    |
| `feedback.error`   | `#B0202F` | `#FBE7E9` | Erro, parar conversão        |
| `feedback.info`    | `#1A5FB4` | `#E4EEFB` | Status neutro                |

### Estados

| Token               | Valor                              |
| ------------------- | ---------------------------------- |
| `state.hover`       | `rgba(25,25,112,0.08)`             |
| `state.active`      | `rgba(25,25,112,0.16)`             |
| `state.focus`       | `#4A4AAB`                          |
| `state.focusRing`   | `rgba(74,74,171,0.35)` (sombra 4px) |
| `state.disabled`    | `#CFD8DC`                          |
| `state.disabledText` | `#90A4AE`                         |

## Tipografia · escolha final

> [!success] Tweak 3 · Humano — escolhido
> A tipografia oficial do Talk2Me é o **pareamento Humano**: **Lexend** para títulos, **Atkinson Hyperlegible** para corpo, **IBM Plex Mono** para código/dados.
>
> **Por quê:** **Lexend** foi desenhado pela Bonnie Shaver-Troup como família para *reading proficiency* — diferentes ópticas (Deca, Mega, Giga, Tera) ajustam o espaçamento para fluência de leitura. **Atkinson Hyperlegible** foi desenhado pelo Braille Institute of America (homenageando o fundador J. Robert Atkinson, cego) com máxima distinção entre caracteres comumente confundidos (`I/l/1`, `O/0`, `rn/m`) para leitores com baixa visão. Os dois juntos formam a combinação **mais acessível possível dentro de fontes gratuitas e bem suportadas em web** — coerente com o posicionamento do Talk2Me como produto de acessibilidade.

### Aplicação

- **`font.family.heading`** → `"Lexend", system-ui, sans-serif`
- **`font.family.body`** → `"Atkinson Hyperlegible", system-ui, sans-serif`
- **`font.family.mono`** → `"IBM Plex Mono", ui-monospace, monospace`

> [!warning] Atualização pendente no bundle
> O `ds-tokens.jsx` em `docs/design-system-bundle/` ainda tem **IBM Plex Sans** como default no CSS variables (`--t2m-head`, `--t2m-body`). Quando a implementação começar, sobrescrever:
> ```css
> :root {
>   --t2m-head: "Lexend", system-ui, sans-serif;
>   --t2m-body: "Atkinson Hyperlegible", system-ui, sans-serif;
>   --t2m-mono: "IBM Plex Mono", ui-monospace, monospace;
> }
> ```
> Importar via Google Fonts:
> ```html
> <link rel="preconnect" href="https://fonts.googleapis.com">
> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
> <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&family=Atkinson+Hyperlegible:wght@400;700&family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
> ```

### Alternativas consideradas (não adotadas)

Mantidas aqui como histórico de decisão.

- **Tweak 1 · Institucional** — `IBM Plex Sans` em headings e body. Descartado por ser menos otimizado para leitura por pessoas com baixa visão.
- **Tweak 2 · Tecnológico** — `Space Grotesk` + `Manrope`. Descartado por priorizar estética contemporânea em vez de legibilidade.

### Escala

| Token   | Tamanho |
| ------- | ------- |
| `xs`    | 12px    |
| `sm`    | 14px    |
| `md`    | 16px    |
| `lg`    | 18px    |
| `xl`    | 22px    |
| `2xl`   | 28px    |
| `3xl`   | 36px    |
| `4xl`   | 48px    |

### Pesos e altura de linha

- **Pesos:** regular 400 · medium 500 · semibold 600 · bold 700.
- **Altura de linha:** tight `1.2` · normal `1.5` · relaxed `1.7`.

## Design Tokens

### Spacing (base 4px)

```
spacing.1 = 4px     spacing.7 = 32px
spacing.2 = 8px     spacing.8 = 40px
spacing.3 = 12px    spacing.9 = 48px
spacing.4 = 16px    spacing.10 = 64px
spacing.5 = 20px    spacing.11 = 80px
spacing.6 = 24px    spacing.12 = 96px
```

### Radius

| Token        | Valor    |
| ------------ | -------- |
| `radius.sm`  | `4px`    |
| `radius.md`  | `8px`    |
| `radius.lg`  | `12px`   |
| `radius.xl`  | `20px`   |
| `radius.full` | `9999px` |

### Shadow

| Token         | Valor                                            |
| ------------- | ------------------------------------------------ |
| `shadow.sm`   | `0 1px 2px rgba(15,23,41,0.08)`                  |
| `shadow.md`   | `0 4px 12px rgba(15,23,41,0.10)`                 |
| `shadow.lg`   | `0 12px 32px rgba(15,23,41,0.14)`                |
| `shadow.focus` | `0 0 0 4px rgba(74,74,171,0.35)`                |

### Motion

| Token                | Valor                                |
| -------------------- | ------------------------------------ |
| `duration.fast`      | `120ms`                              |
| `duration.normal`    | `220ms`                              |
| `duration.slow`      | `360ms`                              |
| `easing.default`     | `cubic-bezier(0.2, 0, 0.2, 1)`       |
| `easing.emphasized`  | `cubic-bezier(0.3, 0, 0, 1)`         |

## Componentes core

### Botão (`Btn`)

5 variantes × 6 estados × 5 tamanhos.

**Variantes:** `primary` · `secondary` · `outline` · `ghost` · `danger` · `light`.
**Tamanhos:** `sm` 36px · `md` 44px · `lg` 52px · `xl` 64px · `xxl` 88px.
**Estados:** default · hover · active · focus · disabled · loading.

Características:
- **Border-radius:** 10px (todos os tamanhos).
- **Peso:** 600.
- **Hover:** `filter: brightness(0.92)`.
- **Disabled:** fundo `#ECEFF1`, texto `#90A4AE`, borda `#CFD8DC`.
- **Loading:** spinner inline no lugar do ícone.

### Inputs

- Text input, search input, select, textarea, input com ícone.
- Estados: default, focus (border `state.focus` + shadow `focus`), error, success, disabled.
- Altura padrão: 44px (md), 52px (lg).

### Cards

- **Card informativo** — `surface.default`, borda `border.subtle`, radius 12px, shadow `sm`, padding 20px.
- **Card de funcionalidade** — ícone superior + título + descrição.
- **Card de status** — ícone à esquerda + label.
- **Card de alerta** — borda lateral colorida conforme severidade.
- **Card de histórico** — versão da `ConversationCard` em painel lateral.

### Header / Topbar

- **Desktop:** logo à esquerda, ações rápidas ao centro, botão de acessibilidade + status à direita.
- **Mobile:** logo + menu hambúrguer.

### Navigation

- **Sidebar desktop** — vertical, ícones com texto.
- **Bottom navigation mobile** — máximo 4 itens.
- Sem breadcrumbs no produto operacional (fluxo é linear).

### Feedback visual

- **Toast** — não-bloqueante, rodapé, duração 3–5s.
- **Alert** — inline, banner colorido.
- **Modal** — bloqueante, raio 20px, shadow `lg`.
- **Empty state** — ícone + texto + ação sugerida.
- **Loading state** — spinner ou skeleton com `t2m-shimmer`.

## Componentes específicos do produto

### `StartConversionBtn`

Botão XXL (88px) de iniciar/parar conversão.

- **Inativo:** brand primary `#191970`, ícone play, texto **Iniciar conversão**, shadow `0 8px 24px rgba(25,25,112,0.3)`.
- **Ativo:** danger `#B0202F`, ícone stop quadrado, texto **Parar conversão**, badge de timer (`02:34`).

### `ModeSelector`

Toggle de duas opções: **Áudio → Libras** | **Libras → Áudio**.

- Container `background.muted`, radius 14px.
- Opção ativa: fundo `surface.default`, shadow `sm`, texto `brand.primary`.
- Opção inativa: transparente, texto `text.secondary`.

### `DeviceIndicator`

Pill de status de microfone/câmera.

- **Ativo:** fundo `rgba(14,154,141,0.10)`, borda `#0E9A8D`, texto teal, **PulseDot** ao lado.
- **Inativo:** fundo `background.muted`, texto `text.tertiary`.

### `ConnStatus`

Pill de conexão: `online` (success), `weak` (warning), `offline` (error). Ícone `wifi`.

### `AudioPlayer`

Player horizontal com botão play 44px circular em brand primary, título + timer, **SoundWave** animado.

### `LibrasViewer`

Área de avatar em LIBRAS.

- Fundo: gradient `linear-gradient(160deg, #0F0F44 0%, #191970 70%, #2E2E8C 100%)`.
- Pill superior esquerda: `AVATAR · LIBRAS`.
- Pill superior direita: `● SINALIZANDO` (com PulseDot teal `#33D6C6`).
- Legenda inferior com gradiente para preto.
- Tamanhos: `md` 220px, `lg` 320px.

### `Transcription`

Caixa de transcrição em tempo real.

- Cabeçalho com PulseDot teal + título + idioma/confiança (`PT-BR · 98%`).
- Texto 18px com **highlight** em `brand.primary50` para palavras-chave.
- SoundWave teal na base.

### `ConversationCard`

Bolha de histórico de conversa.

- **Cliente (left):** `background.muted`, radius `14px 14px 14px 4px`.
- **Atendente (right):** `brand.primary`, texto branco, radius `14px 14px 4px 14px`.
- Cabeçalho mono: `QUEM · KIND · HH:MM`.

### `A11yStatus`

Lista de checks de acessibilidade — cada item é um pill `success` (✓) ou neutro (✕).

## Catálogo de ações rápidas

> [!info] `QUICK_ACTIONS` — fonte canônica
> Em `screens-shared.jsx`, o array `QUICK_ACTIONS` é a **fonte canônica** das perguntas rápidas. Use estes IDs e textos no produto.

| ID         | Pergunta                      | Ícone   | Respostas do cliente                       |
| ---------- | ----------------------------- | ------- | ------------------------------------------ |
| `cpf`      | CPF na nota?                  | `doc`   | Sim · Não                                  |
| `pay`      | Crédito ou débito?            | `card`  | Crédito · Débito                           |
| `bag`      | Aceita sacola?                | `bag`   | Sim · Não                                  |
| `help`     | Precisa de ajuda?             | `help`  | Sim, preciso · Não, obrigado               |
| `cancel`   | Deseja cancelar?              | `cancel` | Sim · Não                                 |
| `value`    | Confirmar valor R$ 87,40?     | `money` | Sim, confirmo · Não                        |
| `receipt`  | Comprovante?                  | `print` | Impresso · Digital                         |
| `paymethod` | Forma de pagamento?           | `money` | PIX · Cartão · Dinheiro                   |

## Conexão ao vivo entre telas

O protótipo usa um **event bus** (`window.__T2M_BUS`) compartilhado entre os artboards do atendente e do cliente, com estado:

```ts
{
  question: { id, text, options },     // pergunta enviada
  clientAnswer: { questionId, value }, // resposta do cliente
  history: [{ side, text, time, kind }],
  clientRecording: boolean,
  librasText: string | null,           // texto reconhecido de LIBRAS
}
```

No produto real, esse bus vira o **canal sincronizado da sessão** (WebSocket/WebRTC). A forma do estado é uma boa base para o contrato de mensagens.

## Acessibilidade

> [!success] Linha de base
> - **WCAG 2.2 AA** como mínimo.
> - **Contraste:** 4.5:1 texto regular; 3:1 elementos não-textuais; 7:1 sempre que possível.
> - **Área de toque:** ≥44×44px (≥48px em telas de cliente; **76–96px** nos botões de resposta).
> - **Foco visível:** sombra 4px `rgba(74,74,171,0.35)` em todos os elementos focáveis.
> - **Ícones sempre acompanhados de texto.**
> - **`prefers-reduced-motion`** respeitado — animações `t2m-spin`, `t2m-ring`, `t2m-wave`, `t2m-shimmer` desativadas.
> - **Avatar de LIBRAS** sempre acompanhado de legenda textual.

## Como esse DS é usado

> [!important] Regra de aplicação
> Toda mudança visual no Talk2Me deve consultar primeiro:
>
> 1. `docs/design-system-bundle/project/Talk2Me Design System.html` (canvas navegável).
> 2. `docs/design-system-bundle/project/ds-tokens.jsx` (valores exatos).
> 3. Esta nota (`[[Design System]]`) como referência rápida.
>
> Se algo precisar ser desviado do DS, **documente o porquê** na nota da tela afetada e marque com callout `> [!warning] Desvio do DS`.

## Próximos passos

- [x] Validar paleta com pessoas surdas (foco em contraste do avatar contra fundo gradient).
- [x] Decidir o tweak tipográfico final entre os 3. → **Tweak 3 · Humano (Lexend + Atkinson Hyperlegible)** escolhido em 2026-05-19.
- [ ] Sobrescrever `--t2m-head`/`--t2m-body` no bundle e importar Google Fonts no app.
- [ ] Exportar tokens para CSS custom properties + JSON consumível por Tailwind/Vanilla Extract.
- [ ] Criar variante **dark mode** completa (parcialmente coberta pelo background `inverse`).
- [ ] Documentar variantes do avatar 3D (pose neutra, sinalizando, repetindo).

## Notas relacionadas

- [[TalkToMe]] — MOC do projeto
- [[Funcionamento da Aplicação]] — fluxo que o DS sustenta
- [[Landing Page]] · [[Home do Sistema]] · [[Interface do Atendente]] · [[Interface do Cliente]] — aplicações
- `docs/design-system-bundle/` — pacote completo (HTML + componentes React)
