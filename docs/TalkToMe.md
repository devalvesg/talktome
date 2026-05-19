---
title: TalkToMe — Coração do Projeto
aliases:
  - TalkToMe
  - Home
  - MOC
tags:
  - moc
  - tcc
  - libras
  - acessibilidade
status: ideação
criado: 2026-05-11
autores:
  - Gabriel Alves Damasceno
  - Lucas Henrique Aparecido Rodrigues
orientador: Prof. Me. Márcio Maestrelo Funes
instituicao: Uni-FACEF
curso: Engenharia de Software
---

# TalkToMe

> [!abstract] Em uma frase
> O **TalkToMe** é um software web que facilita a comunicação entre atendentes ouvintes e clientes com deficiência auditiva em ambientes de atendimento ao público — começando pelos supermercados — combinando avatar 3D em LIBRAS e, quando viável, reconhecimento de sinais em tempo real por visão computacional.

## De onde nasce a ideia

A Língua Brasileira de Sinais (LIBRAS) é o principal meio de comunicação da comunidade surda no Brasil, mas a maioria da população ouvinte não tem fluência nela. Isso cria uma barreira concreta em interações cotidianas — particularmente em **ambientes de atendimento ao público**, onde o tempo é curto, o vocabulário é específico e o atendente não foi treinado para se comunicar com clientes surdos.

Avanços recentes em visão computacional e aprendizado de máquina abriram espaço para tradutores automáticos de LIBRAS, mas eles ainda esbarram em datasets escassos, baixa generalização entre usuários e desempenho instável em tempo real. Por isso, este trabalho explora uma abordagem **híbrida e pragmática**: combinar reconhecimento automático (quando funcionar bem) com uma interface assistiva por **mensagens pré-definidas exibidas via avatar 3D**, garantindo um caminho de comunicação funcional mesmo quando o modelo de IA falhar.

## O que estamos construindo

Um protótipo web que opera em **duas frentes complementares**, pensadas para o balcão de um supermercado:

### 1. Atendente → cliente surdo (avatar em LIBRAS)

Na tela do atendente, botões com **frases pré-prontas do contexto** — por exemplo, *"Aceita nota fiscal?"*, *"Débito ou crédito?"*, *"Tem o programa de fidelidade?"*. Ao clicar, um **avatar 3D realiza o sinal em LIBRAS** para o cliente, traduzindo a intenção do atendente sem exigir que ele saiba a língua.

A ideia inicial é integrar o **VLibras** (plataforma pública mantida pelo Governo Federal) como motor do avatar, por ser a referência consolidada no Brasil para esse tipo de tradução.

> [!warning] VLibras depende de avaliação técnica
> Em MVPs anteriores, a integração com o VLibras apresentou limitações — qualidade/fidelidade dos sinais para certos termos, desempenho e suporte de integração ficaram aquém do esperado em alguns cenários. Antes de fechá-lo como dependência do TalkToMe, faremos uma **prova de conceito** específica no contexto de supermercado (vocabulário-alvo, fluxo de tela, navegador do balcão). Se não atingir o mínimo aceitável, alternativas em mesa: outros motores/avatares 3D, animações próprias para o vocabulário fixo ou vídeos pré-renderizados com intérprete humano.

### 2. Cliente surdo → atendente (reconhecimento de LIBRAS)

Uma webcam captura os sinais do cliente, um **modelo de visão computacional reconhece os gestos** e exibe a tradução em **texto e/ou voz** na tela do atendente. O escopo inicial é um vocabulário reduzido voltado ao contexto de supermercado.

> [!tip] Plano B intencional
> A frente 2 depende de viabilidade técnica (qualidade do dataset, performance em tempo real). Se o reconhecimento não atingir um nível mínimo de robustez, o protótipo permanece útil pela frente 1 — o avatar com mensagens pré-definidas já entrega valor real ao caso de uso.

## Cenário de uso

> [!example] Supermercado, fila do caixa
> Um cliente surdo chega ao caixa. O atendente abre o **TalkToMe** numa tela secundária e clica em *"Você quer CPF na nota?"* — o avatar reproduz o sinal em LIBRAS. O cliente sinaliza a resposta para a webcam; o sistema reconhece e mostra ao atendente *"Sim"*. A interação dura poucos segundos e dispensa intérprete humano.

## Pergunta de pesquisa e objetivos

> [!question] Pergunta de pesquisa
> Como desenvolver e avaliar uma solução computacional capaz de auxiliar, de forma eficaz, a comunicação em contextos de atendimento ao público envolvendo pessoas com deficiência auditiva?

**Objetivo geral.** Propor e avaliar um sistema computacional capaz de auxiliar a comunicação entre pessoas surdas e ouvintes por meio da tradução entre LIBRAS, texto e voz, utilizando tanto o reconhecimento automático de sinais quanto interfaces interativas com mensagens pré-definidas e representação visual por avatar.

**Objetivos específicos** (resumo do artigo):

- Identificar as principais dificuldades de comunicação entre surdos e ouvintes em atendimento ao público.
- Investigar visão computacional e IA aplicadas ao reconhecimento de sinais em LIBRAS.
- Desenvolver tradução de LIBRAS para texto via reconhecimento de gestos.
- Implementar tradução de voz/texto para LIBRAS via avatar.
- Construir interface interativa com frases pré-definidas para o contexto de supermercados.
- Avaliar desempenho e viabilidade em tempo real.
- Validar a solução com pesquisa de campo e feedback de usuários.

## Princípios que guiam o design

> [!note] Acessibilidade primeiro, não como adendo
> Toda decisão de UX é avaliada do ponto de vista do cliente surdo e do atendente sem treinamento em LIBRAS. Se a interface exige aprendizado, ela falhou.

> [!note] Tempo de balcão é precioso
> A interação no caixa dura segundos. O sistema precisa funcionar em **poucos cliques** e responder **em tempo real** — caso contrário, atendente e cliente desistem.

> [!note] Falhar com graça
> O reconhecimento de LIBRAS é probabilístico. Quando o modelo não tem confiança suficiente, o sistema deve oferecer alternativas (botões, repetir, escrever) em vez de adivinhar.

## Como o vault está organizado

Esta nota é o **mapa de conteúdo (MOC)** do projeto — o ponto de entrada para tudo o que vamos documentar. Os arquivos abaixo já existem ou serão criados conforme o projeto avança:

### Produto e telas

- [[Funcionamento da Aplicação]] — visão geral, fluxo entre atendente e cliente, estados de sessão
- [[Landing Page]] — vitrine institucional e comercial do Talk2Me
- [[Home do Sistema]] — tela inicial operacional do atendente
- [[Interface do Atendente]] — painel durante o atendimento, ações rápidas, texto livre
- [[Interface do Cliente]] — interface acessível com avatar em LIBRAS, câmera e respostas rápidas
- [[Design System]] — paleta, tipografia, tokens e componentes (fonte de verdade do frontend)

> [!info] Design System v1.0 — apenas referência visual
> O pacote em `docs/design-system-bundle/` é **especificação visual e comportamental**, não código a reusar. O time escreverá seu próprio frontend do zero, replicando o resultado visual do protótipo — não a estrutura interna dele.
> Fonte original: [Talk2Me Screens (Claude Design)](https://api.anthropic.com/v1/design/h/vDdDi4DEuaN5tMM-o5u70g?open_file=Talk2Me+Screens.html).
> **Toda mudança visual deve consultar o [[Design System]] antes.**

### Pesquisa e técnica

- [[Visão Geral]] — escopo, premissas e delimitações
- [[Referencial Teórico]] — LIBRAS, visão computacional, trabalhos relacionados
- [[Arquitetura]] — stack, decisões técnicas, fluxos
- [[Avatar 3D em LIBRAS]] — VLibras, animações, integração web
- [[Reconhecimento de LIBRAS]] — modelo, dataset, pipeline em tempo real
- [[Dataset]] — coleta, anotação, limitações
- [[Validação]] — métricas, pesquisa de campo, usabilidade
- [[Cronograma]] — entregas e marcos
- [[Referências]] — bibliografia e links externos

## Equipe

- **Gabriel Alves Damasceno** — Graduando em Engenharia de Software (Uni-FACEF) · `24682@unifacef.edu.br`
- **Lucas Henrique Aparecido Rodrigues** — Graduando em Engenharia de Software (Uni-FACEF) · `24660@unifacef.edu.br`
- **Orientador:** Prof. Me. Márcio Maestrelo Funes — Docente do Departamento de Computação (Uni-FACEF) · `marciofunes@facef.br`

## Artigo-base

A primeira versão do artigo está em [[ModeloArtigo V2.docx]] (anexo deste vault) — consolida introdução, objetivos, metodologia e referências bibliográficas iniciais.
