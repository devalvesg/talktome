---
title: Landing Page
aliases:
  - Página Institucional
  - Site Comercial
tags:
  - tcc
  - tela
  - institucional
  - marketing
status: implementado
criado: 2026-05-19
atualizado: 2026-05-20
artboard: design-system-bundle/project/screen-landing.jsx
---

# Landing Page

> [!abstract] Em uma frase
> Página **institucional e comercial** do Talk2Me — explica o produto para supermercados, gestores e equipes de atendimento e converte em pedido de demonstração.

> [!success] Estado de implementação (M2 + M4)
> Implementada em `src/features/landing/Landing.tsx` (rota `/`). Hero, "como funciona", benefícios, "onde usar", demonstração das telas, CTA e footer prontos. O **formulário de demonstração grava de verdade** em `demo_requests` (Supabase, via `src/lib/demoRequests.ts`) — verificado: insert válido aceito, e-mail malformado bloqueado pela RLS.
> **Pendente:** aviso de privacidade/LGPD no formulário; janela de VLibras opcional; imagens reais.

> [!info] Artboard de referência
> Mockup interativo: `docs/design-system-bundle/project/Talk2Me Screens.html` (seção *Landing*, 1280×3960px). Componentes em `screen-landing.jsx`. Todos os tokens visuais vêm do [[Design System]].

## Objetivo

Comunicar, em poucos segundos de leitura, **o que o Talk2Me é, qual problema resolve e por que vale a pena adotar**. Público: decisor (gerente de loja, dono de rede, líder de Diversidade, responsável por acessibilidade).

A landing precisa:

- Explicar a dor com clareza, sem jargão técnico de IA.
- Mostrar a solução em ação (não só descrever).
- Reduzir o atrito até o **pedido de demonstração**.

## Estrutura

### 1. Hero

> [!example] Conteúdo definido
> **Headline:** "Comunicação acessível entre supermercados e pessoas surdas."
> **Sub:** "Converta áudio em Libras e Libras em texto/voz para tornar o atendimento mais inclusivo."
> **CTAs:** `[Conhecer solução]` (primary) · `[Ver demonstração]` (outline)

Elementos:

- **Logo Talk2Me** (wordmark `T2MWordmark` height 32–40).
- Headline em `font.size.4xl` (48px), peso 700, cor `text.primary`.
- Subheadline em `font.size.xl` (22px), cor `text.secondary`.
- Dois `Btn` lg/xl — primary brand e outline.
- Mockup à direita: duas telas lado a lado (atendente + cliente) demonstrando a topologia.

### 2. Como funciona (3 passos)

Stepper horizontal em três cards de funcionalidade:

1. **O atendente inicia a conversa** — ícone `play`, breve descrição.
2. **O cliente se comunica por Libras ou respostas rápidas** — ícone `hand`.
3. **O sistema traduz e conecta os dois em tempo real** — ícone `swap`.

Cada card usa `Card` do DS, com ícone superior em `brand.primary50`/`brand.primary` e texto em `text.primary/secondary`.

### 3. Benefícios (6 cards)

Grid 3×2 de cards:

| Card                                           | Ícone   |
| ---------------------------------------------- | ------- |
| Atendimento mais inclusivo                     | `users` |
| Redução de barreiras de comunicação            | `swap`  |
| Mais autonomia para clientes surdos            | `hand`  |
| Facilidade para funcionários                   | `check` |
| Melhor experiência no caixa e atendimento      | `shop`  |
| Apoio à acessibilidade no varejo               | `a11y`  |

### 4. Para supermercados (onde usar)

Lista visual dos contextos onde o Talk2Me pode operar:

- Caixas (PDV).
- Balcões de atendimento.
- Totens de autoatendimento.
- Tablets do balcão.
- Computadores de funcionários.

Renderizar como **cards horizontais** ou **chips** com ícone (`shop`, `phone`, `card`, `user`).

### 5. Demonstração visual

Preview das três telas-chave, lado a lado ou em carrossel:

- ![[Home do Sistema]] — tela inicial do atendente.
- ![[Interface do Atendente]] — painel durante o atendimento.
- ![[Interface do Cliente]] — interface acessível com avatar.

> [!tip] Mostre a tela do cliente em destaque
> É a tela que comunica **acessibilidade real**. É também a que o decisor nunca pensou em ver. Coloque-a maior do que as outras.

### 6. Chamada final

> [!example] Conteúdo definido
> **Texto:** incentivo a supermercados a adotarem comunicação mais acessível.
> **CTA:** `[Solicitar demonstração]` em `Btn xl primary`.

Fundo `brand.primary` com texto inverse `#FFFFFF` — gera contraste forte e marca o fim da página.

### 7. Footer

- Sobre o projeto (TCC / Uni-FACEF, autores, orientador — ver [[TalkToMe#Equipe]]).
- Contato.
- Atalhos de acessibilidade da própria landing.
- Política de privacidade.

## Componentes do DS aplicados

| Onde                    | Componente                                                |
| ----------------------- | --------------------------------------------------------- |
| Hero CTAs               | `Btn` (`primary lg/xl`, `outline lg/xl`)                  |
| Stepper 3 passos        | `Card` informativo com ícone                              |
| Cards de benefício      | `Card` com ícone superior                                 |
| Chips de onde usar      | `Pill` ou `Card` compacto                                 |
| Carrossel de telas      | Mockups dos artboards `screen-home/attendant/client.jsx`  |
| Tipografia              | `font.family.heading` (Lexend 700) + Atkinson Hyperlegible body |
| CTA final               | `Btn xl primary` sobre `background.inverse`               |

## Estados e variações

| Estado                | Comportamento                                        |
| --------------------- | ---------------------------------------------------- |
| Inicial               | Hero animado (fade-in `t2m-fade-in`), CTA destacado  |
| Scroll médio          | Stepper "Como funciona" entra em foco                |
| Formulário enviado    | Toast `success` + próxima ação clara                 |
| Erro no formulário    | Validação inline com `feedback.error` + texto guia   |
| Acessibilidade ligada | Alto contraste, fonte ampliada, janela de VLibras    |

## Tom da página

Institucional, moderno, confiável, **acessível e humano**. Sem jargão técnico (IA, visão computacional, deep learning) no copy principal — esse vocabulário pertence ao [[Referencial Teórico]], não à landing.

> [!warning] Não coloque tecnologia em primeiro plano
> A landing fala com gestor de loja. *"Reconhecimento de gestos em tempo real com IA"* é menos eficaz que *"o cliente surdo é atendido como qualquer outro"*. A tecnologia entra como prova, não como protagonista.

## Recomendações de UI/UX

- Hero acima da dobra com **uma única ação primária**.
- Tipografia generosa: heading 48px, sub 22px, body 18px.
- Atalhos de acessibilidade visíveis no topo (alto contraste, aumentar fonte).
- Vídeo com **legendas ativadas por padrão** e janela de VLibras opcional.
- Imagens de pessoas reais — sempre que possível, **pessoas surdas representadas**.
- Carregamento rápido; sem pop-ups que cubram o conteúdo.
- Respeitar `prefers-reduced-motion`.

## Notas relacionadas

- [[TalkToMe]] — MOC do projeto
- [[Design System]] — tokens e componentes (fonte de verdade)
- [[Funcionamento da Aplicação]] — fluxo que a landing precisa comunicar
- [[Home do Sistema]] · [[Interface do Atendente]] · [[Interface do Cliente]] — telas exibidas como prova
- Artboard: `docs/design-system-bundle/project/screen-landing.jsx`
