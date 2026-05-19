---
title: Interface do Cliente
aliases:
  - Tela do Cliente
  - Tela da Pessoa Surda
  - Interface da Pessoa com Deficiência Auditiva
tags:
  - tcc
  - tela
  - cliente
  - acessibilidade
  - libras
status: ideação
criado: 2026-05-19
atualizado: 2026-05-19
artboard: design-system-bundle/project/screen-client.jsx
---

# Interface do Cliente

> [!abstract] Em uma frase
> Tela **mobile-first** usada pela pessoa surda durante o atendimento — combina avatar 3D em LIBRAS (`LibrasViewer`), câmera para sinalizar, botões grandes (76–96px) de resposta e textos de apoio simples.

> [!info] Artboard de referência
> `docs/design-system-bundle/project/Talk2Me Screens.html` (seção *Cliente*, **interativo** — recebe perguntas do atendente pelo bus `__T2M_BUS`). Componente: `screen-client.jsx`. Componentes do DS: `LibrasViewer`, `Btn xxl`, `StartConversionBtn`, `ConnStatus`, `DeviceIndicator`.

## Objetivo

Permitir que o cliente surdo:

1. **Entenda** o que o atendente está dizendo, em LIBRAS (via `LibrasViewer`).
2. **Responda** com autonomia, sem teclado, sem fala, sem acompanhante.
3. **Inicie** a comunicação sinalizando pela câmera, sem esperar pergunta.

> [!important] A interface que carrega o peso do produto
> Se a tela do atendente falha, ele pede ajuda a um colega. Se a tela do cliente falha, **a barreira de comunicação retorna por inteiro**.

## Layout em zonas

```
┌──────────────────────────────────────────────────────────┐
│  HEADER: T2MWordmark · ConnStatus · DeviceIndicator     │
│                                              · Ajuda    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│            LibrasViewer (gradient brand)                 │
│            ● SINALIZANDO  · AVATAR · LIBRAS              │
│                                                          │
│            Legenda: "CPF na nota?"                       │
│            [ ↺ Repetir ]                                 │
├──────────────────────────────────────────────────────────┤
│   BOTÕES DE RESPOSTA (Btn xxl, condicionais à question)  │
│                                                          │
│   [    ✓ SIM    ]              [    ✕ NÃO    ]           │
├──────────────────────────────────────────────────────────┤
│   CÂMERA (preview + guia das mãos)                       │
│   [ ● StartConversionBtn ]                               │
└──────────────────────────────────────────────────────────┘
```

## Elementos principais

### Header

- **Wordmark Talk2Me** (`T2MWordmark` height ~28).
- `ConnStatus online` (sucesso) + `DeviceIndicator` (mic, cam).
- **Ajuda visual** — `Btn ghost` com ícone `help` que abre tutorial em LIBRAS sobre como usar a tela.

### LibrasViewer (área principal)

Componente do DS — **a peça mais importante da tela**.

- **Fundo gradient:** `linear-gradient(160deg, #0F0F44 0%, #191970 70%, #2E2E8C 100%)`.
- **Avatar 3D** sinalizando a mensagem do atendente.
- **Pill superior esquerda:** `AVATAR · LIBRAS` (tone brand).
- **Pill superior direita:** `● SINALIZANDO` com PulseDot teal `#33D6C6`.
- **Legenda inferior:** texto curto com fundo gradiente preto, em fonte 14px.
- **Indicação:** *"Mensagem do atendente"*.
- **Botão `Btn outline`** *Repetir* com ícone `repeat`, abaixo do viewer.

Tamanhos: `md` (220px) em layout compacto, `lg` (320px) em tablet/totem.

> [!note] Por que o avatar é central
> Para muitas pessoas surdas, **LIBRAS é a primeira língua e o português é segunda língua**. O avatar carrega a mensagem; o texto é apoio, não substituto.

### Botões de resposta (condicionais à pergunta)

Os botões mudam conforme a `question` recebida pelo bus. Cada pergunta do `QUICK_ACTIONS` traz suas `options`:

| Pergunta recebida          | Botões exibidos                          | Ícones                   |
| -------------------------- | ---------------------------------------- | ------------------------ |
| CPF na nota?               | **Sim** · **Não**                        | `check` · `x`            |
| Crédito ou débito?         | **Crédito** · **Débito**                 | `card` · `card`          |
| Aceita sacola?             | **Sim** · **Não**                        | `check` · `x`            |
| Precisa de ajuda?          | **Sim, preciso** · **Não, obrigado**     | `check` · `x`            |
| Deseja cancelar?           | **Sim** · **Não**                        | `check` · `x`            |
| Confirmar valor R$ 87,40?  | **Sim, confirmo** · **Não**              | `check` · `x`            |
| Comprovante?               | **Impresso** · **Digital**               | `print` · `phone`        |
| Forma de pagamento?        | **PIX** · **Cartão** · **Dinheiro**      | `sparkle` · `card` · `money` |

**Características dos botões:**

- `Btn xxl` (88px) ou variação custom 76–96px.
- **Sim** usa `secondary` (teal) ou `success` background; **Não** usa `outline` ou `danger`.
- **Ícones de apoio** sempre presentes.
- **Alto contraste**.
- **Feedback visual ao toque** — micro-animação + ConfirmAnimation curta.

### Câmera

Preview da câmera em tempo real.

- **Borda** `brand.primary` quando inativa.
- **Borda pulsante vermelha** (`t2m-ring` keyframes) quando gravando.
- **Overlay de guia das mãos** — moldura com 40% de opacidade indicando onde posicionar as mãos.
- **Orientação textual:** *"Posicione suas mãos dentro da área."*
- **Estado de permissão:** quando negada, exibe instrução visual + `Btn primary lg` *Ativar câmera*.

### StartConversionBtn

Botão XXL do DS — alterna entre dois estados:

- **Inativo:** brand primary, ícone play, texto *"Iniciar conversão"*, shadow brand.
- **Ativo:** danger `#B0202F`, ícone stop quadrado, texto *"Parar conversão"* + badge timer (`02:34`), shadow danger.

## Estados de uso

| Estado                            | O que o cliente vê                                                       |
| --------------------------------- | ------------------------------------------------------------------------ |
| Aguardando pergunta do atendente  | Avatar em pose neutra + texto *"Aguardando atendente"*                   |
| Pergunta recebida                 | `LibrasViewer` sinalizando + legenda + botões de resposta animam entrada |
| Resposta enviada                  | Botão escolhido com filtro `brightness(0.92)` + ConfirmAnimation + Toast *"Enviado!"* |
| Gravando LIBRAS                   | Borda pulsante vermelha + texto *"Gravando…"* + StartConversionBtn em modo `active` |
| Processando tradução              | Avatar em pose neutra + indicador *"Traduzindo…"* + Spinner              |
| Baixa confiança no reconhecimento | Card warning *"Não entendi bem"* + fallback de botões + `Btn outline` *Tentar de novo* |
| Câmera desativada                 | Card info com LibrasViewer + texto + `Btn primary` *Ativar câmera*       |
| Permissão de câmera negada        | Instrução visual de como liberar a permissão no navegador                |
| Conexão instável                  | `ConnStatus weak` + Toast warning, sem bloquear a tela                   |
| Erro de conexão                   | Avatar com mensagem de espera + indicador de reconexão                   |
| Atendimento finalizado            | Avatar com mensagem de despedida + texto *"Atendimento encerrado. Obrigado!"* |

## Exemplos práticos

> [!example] Pergunta binária
> 1. Bus: `question = QUICK_ACTIONS['cpf']`.
> 2. `LibrasViewer` reproduz o sinal de *CPF na nota?*.
> 3. Legenda mostra: *CPF na nota?*.
> 4. Botões **✓ Sim** (secondary) e **✕ Não** (outline) deslizam para entrar (`t2m-fade-in`).
> 5. Cliente toca **Sim**.
> 6. Bus: `clientAnswer = { questionId:'cpf', value:'sim' }`.
> 7. Botão **Sim** confirma; Toast *"Enviado!"* aparece por 2s.

> [!example] Cliente inicia a comunicação
> 1. Cliente toca `StartConversionBtn` (modo inativo).
> 2. Bus: `clientRecording = true`.
> 3. Câmera ganha borda pulsante; guia das mãos aparece.
> 4. Cliente sinaliza.
> 5. Cliente toca o mesmo botão (agora *"Parar conversão"*).
> 6. Bus: `clientRecording = false`; sistema processa.
> 7. Spinner aparece; em ~1s, resposta chega pelo `LibrasViewer`.

> [!example] Falha graciosa
> 1. Cliente sinaliza, sistema não reconhece com confiança.
> 2. `LibrasViewer` mostra avatar sinalizando *"Não entendi bem. Pode tocar uma opção?"*.
> 3. Botões de fallback aparecem: **Sim** · **Não** · **Outro**.
> 4. Cliente toca **Outro**; câmera prepara nova gravação.

## Componentes do DS aplicados

| Onde                | Componente                                       |
| ------------------- | ------------------------------------------------ |
| Header logo         | `T2MWordmark`                                    |
| Header status       | `ConnStatus` + `DeviceIndicator`                 |
| Header ajuda        | `Btn ghost` ícone `help`                         |
| Avatar              | `LibrasViewer` (md/lg)                           |
| Repetir             | `Btn outline md` ícone `repeat`                  |
| Resposta            | `Btn xxl secondary/outline/danger` com ícone     |
| Iniciar/parar       | `StartConversionBtn` (componente do produto)     |
| Câmera              | Custom + `PulseDot` + animação `t2m-ring`        |
| Feedback de envio   | Toast (componente core do DS)                    |

## Recomendações de UI/UX

- **LIBRAS em primeiro lugar** — toda mensagem importante tem versão em LIBRAS pelo `LibrasViewer`.
- **Texto simples e curto** — sem jargão, sem frases compostas.
- **Botões enormes** — 76–96px (mínimo `Btn xxl` do DS).
- **Ícones acompanham texto** — sempre.
- **Feedback visual em cada toque** — `filter: brightness` + ConfirmAnimation.
- **Sem modais que sobrepõem o LibrasViewer** — usar toast/banner.
- **Sem texto rolável** durante o atendimento — tudo cabe em uma tela.
- **Animações curtas** (`duration.fast`–`duration.normal`).
- **Cores funcionais** — verde (`#1E7A53`), vermelho (`#B0202F`), amarelo (`#A8650F`).
- **Sem som obrigatório** — toda informação importante é visual.

## Acessibilidade

> [!success] Diretrizes seguidas
> - **WCAG 2.2 AA** como linha de base.
> - Contraste mínimo **4.5:1** para texto; **7:1** desejado em texto pequeno.
> - Áreas de toque ≥ **48×48px**; respostas em **76–96px**.
> - Cor nunca é o único canal de informação (sempre há ícone ou texto).
> - `LibrasViewer` sempre tem **legenda textual** ao vivo.
> - `prefers-reduced-motion` respeitado.
> - Layout funcional em retrato e paisagem.

## Tom da tela

**Acessível, acolhedor, simples e extremamente claro.** O cliente surdo precisa sentir que a tela foi feita **com** a comunidade surda, não **sobre** ela.

## Notas relacionadas

- [[TalkToMe]] — MOC do projeto
- [[Design System]] — tokens, `LibrasViewer`, `StartConversionBtn`, `Btn xxl` (fonte de verdade)
- [[Funcionamento da Aplicação]] — fluxo e estado compartilhado (`__T2M_BUS`)
- [[Interface do Atendente]] — contraparte sincronizada
- [[Avatar 3D em LIBRAS]] — motor do avatar, VLibras, alternativas
- [[Reconhecimento de LIBRAS]] — modelo, dataset, baixa confiança
- Artboard: `docs/design-system-bundle/project/screen-client.jsx`
