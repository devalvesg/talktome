---
title: Avatar 3D em LIBRAS
aliases:
  - Avatar LIBRAS
  - VLibras
  - PoC VLibras
  - Motor do Avatar
tags:
  - tcc
  - libras
  - avatar
  - vlibras
  - poc
  - frente-1
status: pesquisa
criado: 2026-05-19
atualizado: 2026-05-19
---

# Avatar 3D em LIBRAS

> [!abstract] Em uma frase
> Motor que transforma a mensagem do atendente (frase pronta ou texto livre) em **sinais de LIBRAS reproduzidos por um avatar 3D** na [[Interface do Cliente]] — peça central da **frente 1**, com o **VLibras** como candidato principal a ser validado por uma **prova de conceito (PoC)** antes de virar dependência.

> [!info] Onde isso vive no produto
> O avatar aparece no componente `LibrasViewer` da [[Interface do Cliente]]. A entrada vem do atendente via `QUICK_ACTIONS` ou texto livre (ver [[Funcionamento da Aplicação#Atendente → Cliente avatar em LIBRAS]]). Implementação prevista para o **M5** do [[Plano de Desenvolvimento]].

## Por que uma PoC antes de adotar

O **VLibras** (plataforma pública mantida pelo Governo Federal) é a referência consolidada no Brasil para tradução português → LIBRAS por avatar. É o candidato natural — **mas não é uma escolha automática**.

> [!warning] Risco já conhecido pela equipe
> Em MVPs anteriores, a integração com o VLibras apresentou limitações: **fidelidade** de certos termos, **desempenho** e **suporte de integração** ficaram aquém do esperado em alguns cenários (ver [[Design System]] e [[TalkToMe#1 Atendente → cliente surdo avatar em LIBRAS]]).

Apostar todo o avatar no VLibras sem revalidar seria arriscado: uma falha só apareceria no M5, com o produto já acoplado. A PoC **antecipa essa descoberta** — é barata, isolada e descartável.

## Pergunta da PoC

> [!question] O que a PoC precisa responder
> O VLibras consegue sinalizar **as 8 perguntas do `QUICK_ACTIONS`** e **frases livres curtas** do contexto de supermercado com **fidelidade, desempenho e integração aceitáveis** no navegador que rodaria no balcão?

A resposta é uma **decisão go/no-go** (ver [[#Critérios de aceite (go/no-go)]]).

## Vocabulário-alvo do teste

### Frases prontas (`QUICK_ACTIONS` — fonte canônica)

Catálogo de [[Design System#Catálogo de ações rápidas]]:

| ID | Frase |
| -- | ----- |
| `cpf` | CPF na nota? |
| `pay` | Crédito ou débito? |
| `bag` | Aceita sacola? |
| `help` | Precisa de ajuda? |
| `cancel` | Deseja cancelar? |
| `value` | Confirmar valor R$ 87,40? |
| `receipt` | Comprovante? |
| `paymethod` | Forma de pagamento? |

### Frases livres de apoio (amostra)

Para testar texto livre digitado pelo atendente (ver [[Interface do Atendente#Campo de texto personalizado]]):

- "Corredor 7, ao fundo à direita."
- "Onde fica o açougue?"
- "Aguarde um momento, por favor."
- "Pode passar o próximo cliente."

> [!note] Atenção a termos sensíveis
> Números (`R$ 87,40`), siglas (`CPF`, `PIX`) e datilologia são justamente onde motores de tradução costumam falhar. Inclua-os no teste de propósito.

## Roteiro do teste

> [!info] PoC é isolada — não precisa estar dentro do app
> Pode ser uma página HTML avulsa ou um sandbox. O objetivo é medir o motor, não integrar ainda.

1. **Montar o ambiente mínimo.** Incorporar o widget/engine do VLibras numa página de teste e disparar a tradução de cada frase do vocabulário-alvo. *(Confirmar o método de integração atual na documentação oficial do VLibras — widget via script, API, ou engine standalone.)*
2. **Reproduzir cada frase** do `QUICK_ACTIONS` + as frases livres de apoio.
3. **Avaliar com pessoa fluente em LIBRAS** (idealmente da comunidade surda — alinhado a [[Validação]]). Sem essa avaliação, a fidelidade não tem valor real.
4. **Medir desempenho** no navegador-alvo do balcão (tempo de carga inicial do avatar, tempo até começar a sinalizar, fluidez).
5. **Testar o ambiente real:** conexão típica do balcão, tela secundária/tablet, e o `prefers-reduced-motion`.
6. **Registrar evidências:** vídeos curtos das sinalizações, tempos medidos e o parecer da pessoa fluente.

## Critérios de aceite (go/no-go)

A PoC passa (**go**) se atingir o mínimo em **todas** as dimensões abaixo. Falha em qualquer uma → reavaliar ou acionar plano B.

| Dimensão | Critério mínimo (go) | Como medir |
| -------- | -------------------- | ---------- |
| **Fidelidade** | Pessoa fluente entende corretamente **≥ 7 das 8** `QUICK_ACTIONS` sem ambiguidade | Avaliação humana cega (sem ver o texto antes) |
| **Termos sensíveis** | Números, `CPF` e `PIX` sinalizados de forma compreensível (ou com fallback aceitável) | Avaliação humana |
| **Desempenho — carga** | Avatar pronto para sinalizar em **≤ 3 s** após abrir a tela | Cronômetro / `performance.now()` |
| **Desempenho — resposta** | Início da sinalização em **≤ 1 s** após o comando do atendente | Cronômetro |
| **Integração** | Embutível numa SPA React/Vite sem hacks frágeis e sem quebrar o layout do `LibrasViewer` | Teste de incorporação |
| **Acessibilidade** | Compatível com legenda textual sincronizada e `prefers-reduced-motion` | Inspeção |

> [!success] Resultado "go"
> VLibras vira o motor do `LibrasViewer` no **M5**. Documentar a forma de integração escolhida nesta nota.

> [!failure] Resultado "no-go"
> Acionar o **plano B** (§abaixo) e registrar aqui **o porquê**, com evidências — isso por si só já é um resultado de pesquisa válido para o artigo.

## Planos B (se VLibras reprovar)

O vocabulário da frente 1 é **fixo e pequeno** (8 perguntas + opções + um punhado de frases de apoio), o que torna os planos B viáveis:

| Plano B | Descrição | Prós | Contras |
| ------- | --------- | ---- | ------- |
| **Vídeos pré-renderizados** | Gravar um(a) intérprete humano sinalizando cada frase do catálogo; o `LibrasViewer` toca o vídeo correspondente | Fidelidade máxima (humano real); simples de tocar | Não escala para texto livre; precisa regravar ao mudar o catálogo |
| **Animações próprias** | Animar um avatar 3D só para o vocabulário fixo (ex.: clips de animação por frase) | Estética integrada ao DS; controle total | Custo alto de produção por sinal; exige conhecimento de LIBRAS na modelagem |
| **Outro motor/avatar** | Avaliar alternativas de mercado de tradução por avatar | Pode cobrir texto livre | Pesquisa adicional; possível custo (atenção ao free tier) |

> [!tip] Híbrido é permitido
> Texto livre é raro no fluxo; o caminho crítico são as 8 frases. Um híbrido — **vídeos/animações para o catálogo fixo** + degradar texto livre para legenda escrita — pode ser a saída mais robusta dentro do free tier.

## Entregável da PoC

- Decisão **go/no-go** registrada nesta nota, com data e responsável.
- Evidências (vídeos das sinalizações, tabela de tempos, parecer da pessoa fluente).
- Se *go*: a forma de integração documentada para o M5.
- Se *no-go*: o plano B escolhido e a justificativa.

> [!note] Não bloqueia o resto do projeto
> Até o M5, o `LibrasViewer` usa um **placeholder**. A PoC roda em paralelo desde o M0 (spike do [[Plano de Desenvolvimento#7 Spike paralela PoC do VLibras]]) sem travar telas nem backend.

## Notas relacionadas

- [[TalkToMe]] — MOC do projeto
- [[Plano de Desenvolvimento]] — marco M5 e a spike paralela
- [[Interface do Cliente]] — onde o `LibrasViewer` vive
- [[Funcionamento da Aplicação]] — sentido atendente → cliente
- [[Design System]] — `LibrasViewer`, tokens, legenda
- [[Reconhecimento de LIBRAS]] — a frente 2 (sentido inverso)
- [[Validação]] — avaliação com a comunidade surda
