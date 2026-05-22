---
title: Interface do Atendente
aliases:
  - Tela do Atendente
  - Painel do Atendente
tags:
  - tcc
  - tela
  - atendente
  - operacional
status: implementado
criado: 2026-05-19
atualizado: 2026-05-20
artboard: design-system-bundle/project/screen-attendant.jsx
---

# Interface do Atendente

> [!abstract] Em uma frase
> Painel **operacional desktop/tablet-first** usado pelo funcionário do supermercado durante o atendimento — concentra status da sessão, transcrição em tempo real da LIBRAS do cliente, ações rápidas pré-prontas e campo de texto livre.

> [!success] Estado de implementação (M2 + M3 + M5)
> Implementada em `src/features/attendant/Attendant.tsx` (rota `/atendente`). Header com `ConnStatus`/`DeviceIndicator`/Encerrar, `Transcription`, histórico de `ConversationCard`, grid das 8 `QUICK_ACTIONS` e texto livre. Ligada ao canal de sessão (`useSession`): ações e texto publicam `question` + histórico; a resposta do cliente chega pelo mesmo canal em tempo real. Encerrar pede confirmação (modal), publica `ended` no canal — **desconectando o cliente com aviso** ("Atendimento encerrado") — e volta à Home.
> **Gate do avatar (M5):** as ações rápidas e o texto livre só liberam quando o avatar do cliente está `ready` (campo `avatarStatus` do canal); enquanto carrega, um banner informa; em erro, um `Alert` "Avatar não carregado…" orienta o atendente.
> **Pendente:** transcrição real (depende do reconhecimento, M6); baixa confiança/“pedir para repetir”; atalhos de teclado (1–9, Esc).

> [!info] Artboard de referência
> `docs/design-system-bundle/project/Talk2Me Screens.html` (seção *Atendente*, **interativo** — ligado ao cliente pelo event bus `__T2M_BUS`). Componente: `screen-attendant.jsx`. Componentes do DS: `Transcription`, `ConversationCard`, `Btn`, `ConnStatus`, `DeviceIndicator`.

## Objetivo

Dar ao atendente, sem treinamento em LIBRAS, três capacidades simultâneas:

1. **Ler** o que o cliente sinaliza (LIBRAS → texto, via `Transcription`).
2. **Perguntar** rapidamente coisas comuns do contexto de supermercado (via `QUICK_ACTIONS`).
3. **Improvisar** com texto livre quando a pergunta não estiver entre as pré-prontas.

A tela é usada **de pé, com pressa, no meio de outras tarefas**.

## Layout em zonas

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER: T2MWordmark · ConnStatus · DeviceIndicators ·  Encerrar │
├──────────────────────────────────────────────────┬───────────────┤
│                                                  │               │
│   TRANSCRIPTION (PulseDot teal + texto grande)   │  HISTÓRICO    │
│   "Recebendo LIBRAS…" / texto reconhecido        │  (lateral)    │
│   SoundWave teal                                 │               │
│                                                  │  Conversation │
│                                                  │  Cards        │
│                                                  │  (atendente   │
│                                                  │   à direita,  │
│                                                  │   cliente à   │
│                                                  │   esquerda)   │
├──────────────────────────────────────────────────┤               │
│   AÇÕES RÁPIDAS (grid de 8 Btn xl)               │               │
├──────────────────────────────────────────────────┤               │
│   Input texto livre + Btn primary "Enviar"       │               │
└──────────────────────────────────────────────────┴───────────────┘
```

## Elementos principais

### Header

- **Wordmark Talk2Me** à esquerda.
- **ConnStatus online** + **DeviceIndicator** (mic, cam) — todos no padrão do DS.
- **Encerrar conversa** à direita: `Btn danger md`. Confirma antes de fechar.

### Transcrição (zona central superior)

Componente `Transcription` do DS:

- **PulseDot teal** + label *"Transcrição em tempo real"*.
- Idioma e confiança à direita (`PT-BR · 98%`).
- Texto 18px, line-height 1.5.
- Palavras-chave destacadas em fundo `brand.primary50` com texto `brand.primary`.
- `SoundWave` teal animado na base.

**Estados:**

- Vazio: *"Aguardando sinalização do cliente"* em `text.tertiary`.
- Recebendo: *"Recebendo LIBRAS…"* + waveform animado.
- Reconhecido: frase + timestamp.
- Baixa confiança: frase + pill `warning` com alternativas.

### Histórico (coluna lateral)

Lista de `ConversationCard`:

- **Atendente** (lado direito) — bolha `brand.primary` fundo, texto branco, radius `14px 14px 4px 14px`.
- **Cliente** (lado esquerdo) — bolha `background.muted`, texto `text.primary`, radius `14px 14px 14px 4px`.
- Cabeçalho mono: `QUEM · KIND · HH:MM` (kind = `LIBRAS → ÁUDIO` ou `ÁUDIO → LIBRAS`).

### Ações rápidas (grid de 8 botões)

Grid de `Btn xl` (64px) usando o catálogo `QUICK_ACTIONS` definido em `screens-shared.jsx`:

| Pergunta                    | ID         | Ícone   | Variante                    |
| --------------------------- | ---------- | ------- | --------------------------- |
| CPF na nota?                | `cpf`      | `doc`   | `outline xl`                |
| Crédito ou débito?          | `pay`      | `card`  | `outline xl`                |
| Aceita sacola?              | `bag`      | `outline xl` |                        |
| Precisa de ajuda?           | `help`     | `help`  | `outline xl`                |
| Deseja cancelar?            | `cancel`   | `cancel` | `outline xl`               |
| Confirmar valor final?   | `value`    | `money` | `outline xl`                |
| Comprovante?                | `receipt`  | `print` | `outline xl`                |
| Forma de pagamento?         | `paymethod` | `money` | `outline xl`               |

> [!info] Conjunto editável
> Esse conjunto deve ser configurável por contexto (padaria, açougue, SAC podem ter conjuntos próprios). A estrutura `QUICK_ACTIONS` em `screens-shared.jsx` é a fonte canônica.

Ao clicar, o bus recebe `set({ question: ACTION })` e a [[Interface do Cliente]] reage imediatamente, exibindo o avatar sinalizando e os botões de resposta.

### Campo de texto personalizado

Para perguntas fora do conjunto fixo:

- **Input** com placeholder *"Digite uma pergunta ou instrução para o cliente"*.
- **Sugestões** abaixo do input (autocompletar com frases recentes ou do contexto).
- **Validação** para mensagens muito longas (`feedback.warning`).
- **Btn primary md** *Enviar* (ícone `send`).
- Atalhos: `Enter` envia, `Shift+Enter` quebra linha.

> [!tip] Texto livre também vira LIBRAS
> Tudo que o atendente digita é renderizado pelo avatar 3D na tela do cliente. Frases curtas funcionam melhor para reconhecimento e para clareza visual.

## Estados de uso

| Estado                              | O que muda na tela                                                      |
| ----------------------------------- | ----------------------------------------------------------------------- |
| Sessão iniciada                     | Painel completo, `Transcription` vazia                                  |
| Aguardando sinalização do cliente   | `Transcription`: *"Aguardando sinalização do cliente"*                  |
| Cliente sinalizando                 | PulseDot teal + waveform + texto sendo construído                       |
| Frase reconhecida                   | Texto destacado + `ConversationCard` no histórico                       |
| Baixa confiança                     | Texto + pill warning *"Pode ser também: …"* + `Btn ghost` *Pedir para repetir* |
| Pergunta enviada                    | `ConversationCard` à direita marcada como *"enviada"*                   |
| Resposta do cliente recebida        | `ConversationCard` à esquerda com destaque temporário                   |
| Cliente desconectado                | Banner `ConnStatus offline` + `Btn outline` *Aguardar reconexão*        |
| Erro de tradução                    | Toast warning + sugestão de uso da câmera ou troca para texto           |
| Atendimento encerrado               | Resumo curto da sessão + `Btn primary` *Iniciar novo atendimento*       |

## Exemplos práticos

> [!example] Pergunta com botão rápido
> 1. Atendente clica em `Btn` **CPF na nota?**.
> 2. Histórico recebe ConversationCard direito: *Atendente · ÁUDIO → LIBRAS · 14:32 · CPF na nota?*.
> 3. Em <2s, resposta chega: `ConversationCard` esquerdo *Cliente · LIBRAS → ÁUDIO · 14:32 · Sim*.
> 4. Atendente digita o CPF no PDV.

> [!example] Frase do cliente reconhecida
> 1. `Transcription` mostra *"Recebendo LIBRAS…"* + waveform.
> 2. Texto aparece: *"Onde fica o setor de bebidas?"*.
> 3. Atendente digita: *"Corredor 7, ao fundo à direita."*.
> 4. Envia. Avatar do cliente reproduz em LIBRAS.

> [!example] Baixa confiança
> 1. Reconhecimento retorna texto com confiança 64%.
> 2. `Transcription` mostra texto + pill warning *"Pode ser: 'Cartão' ou 'Crédito'."*.
> 3. Atendente clica em **Crédito ou débito?** para confirmar pela via determinística.

## Componentes do DS aplicados

| Onde                | Componente                                       |
| ------------------- | ------------------------------------------------ |
| Header logo         | `T2MWordmark`                                    |
| Header status       | `ConnStatus` + `DeviceIndicator`                 |
| Encerrar            | `Btn danger md`                                  |
| Transcrição         | `Transcription` (PulseDot + SoundWave)           |
| Histórico           | `ConversationCard` (left/right)                  |
| Ações rápidas       | `Btn xl outline` × 8 (catálogo `QUICK_ACTIONS`)  |
| Input personalizado | Input md + `Btn primary md send`                 |
| Tipografia          | Lexend (heading) + Atkinson Hyperlegible (body)  |

## Recomendações de UI/UX

- **Hierarquia visual clara:** status → transcrição → ações rápidas → texto livre.
- **Botões grandes** para ações rápidas — `Btn xl` (64px) é o mínimo.
- **Distinção forte** entre atendente e cliente no histórico (cor + lado + radius assimétrico do `ConversationCard`).
- **Sem modais bloqueantes** durante o atendimento — toda notificação é toast/banner.
- **Encerrar** sempre visível, mas exigindo confirmação (evita clique acidental).
- **Atalhos de teclado** para PDVs com teclado físico (`1..9` dispara ações rápidas, `Esc` foca no campo de texto).
- **Nunca ícone sem texto** — todo `Btn` tem label.
- **Loading states específicos** — *"Avatar sinalizando…"*, não *"Carregando"*.

## Tom da tela

**Operacional, rápido, claro e objetivo.** O atendente deve usar enquanto registra produtos, conversa com colegas e organiza o caixa.

## Notas relacionadas

- [[TalkToMe]] — MOC do projeto
- [[Design System]] — tokens e componentes (fonte de verdade)
- [[Funcionamento da Aplicação]] — fluxo e estado compartilhado da sessão
- [[Home do Sistema]] — tela que abre esta interface
- [[Interface do Cliente]] — contraparte sincronizada via `__T2M_BUS`
- Artboard: `docs/design-system-bundle/project/screen-attendant.jsx`
- Catálogo de perguntas: `docs/design-system-bundle/project/screens-shared.jsx` (`QUICK_ACTIONS`)
