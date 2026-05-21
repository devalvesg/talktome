---
title: Segurança
aliases:
  - Seguranca
  - Security
  - Segurança da Conexão
  - Privacidade
tags:
  - tcc
  - seguranca
  - privacidade
  - websocket
  - supabase
status: ativo
criado: 2026-05-19
atualizado: 2026-05-20
---

# Segurança

> [!abstract] Em uma frase
> O Talk2Me tem **superfície de ataque reduzida** — sem login, sem dados de usuário, histórico efêmero no navegador — então o foco de segurança recai sobre **a conexão em tempo real entre os dois dispositivos** (WebSocket via [[Plano de Desenvolvimento#2 Decisões técnicas fechadas|Supabase Realtime]]) e sobre **manter a privacidade por padrão**.

> [!info] Contexto que molda a postura
> - **Sem autenticação de usuário** e **sem dados pessoais persistidos** — o histórico vive na sessão do navegador e é descartado ao fechar a aba (ver [[Plano de Desenvolvimento]]).
> - O **único dado persistido** é o formulário "Solicitar demonstração" da [[Landing Page]] (`demo_requests`).
> - A **câmera** do cliente (frente 2) capta sinais — é o ativo mais sensível, ainda que o vídeo não precise sair do dispositivo.

> [!success] Estado de implementação (M4 · 2026-05-20)
> **Feito:** RLS ligada em `demo_requests` (só `INSERT` anônimo, com validação de formato no servidor; sem `SELECT`/`UPDATE`/`DELETE` — *advisors* de segurança limpos); chaves só no `.env.local` (ignorado pelo git) com `.env.example` versionado; canal real via Supabase Realtime (`wss://`).
> **Pendente (hardening):** hoje o canal usa diretamente o **código curto** (`t2m:T2M-XXXX`) como nome — falta o **token de alta entropia** com o código curto sendo só um apelido de vida curta (ver §[[#2 Isolamento de sessão]]); login anônimo + private channels (§3); sanitização do texto livre (§4); cabeçalhos de segurança no host; aviso de privacidade/LGPD na Landing.

## Princípios

1. **Minimização de dados.** O que não existe não vaza. Não coletar, não persistir e não logar o que não for essencial.
2. **Seguro por padrão (secure by default).** TLS sempre, segredos fora do cliente, RLS ligada em qualquer tabela.
3. **Defesa em profundidade.** Transporte cifrado **e** isolamento de sessão **e** IDs imprevisíveis — não confiar numa camada só.
4. **Privacidade como recurso, não adendo.** Coerente com o posicionamento de acessibilidade do produto (ver [[TalkToMe]]).

## Segurança da conexão WebSocket (foco principal)

O canal de sessão é o coração do produto e o principal vetor de risco: é por onde trafega tudo entre atendente e cliente.

### 1. Transporte cifrado (TLS / `wss://`)

> [!important] Nunca WebSocket em texto claro
> A conexão deve usar **`wss://`** (WebSocket sobre TLS), não `ws://`. O Supabase Realtime já usa `wss://` por padrão. Em produção, todo o app roda sob **HTTPS** — sem isso, `getUserMedia` (câmera) nem funciona (exige *secure context*).

### 2. Isolamento de sessão

Cada atendimento é uma **sala/canal própria**. Um dispositivo só deve receber e enviar mensagens da **sua** sessão.

> [!warning] Risco: invasão/escuta de sessão alheia
> Se o nome do canal for previsível, um terceiro poderia entrar numa sessão ativa e **ler** ou **injetar** mensagens (ex.: forjar uma resposta do cliente).

**Mitigações:**

- **ID de sessão de alta entropia.** O canal real deve ser identificado por um **token aleatório longo** (ex.: ≥128 bits), não pelo código curto amigável (`T2M-9F4K`) — esse código serve só para o humano digitar e deve mapear para o token real, ter **vida curta** e **expirar** após o pareamento.
- **Sessão efêmera e descartável.** Abrir no início do atendimento, **encerrar e invalidar** ao fim. Sem reuso, sem replay.
- **Expiração por inatividade (TTL).** Sessão sem atividade expira sozinha.

### 3. Autorização do canal

> [!note] Limitação honesta do free tier sem login
> A chave **anônima (publishable)** do Supabase é **pública por natureza** (vai no frontend). Sozinha, ela permite assinar qualquer canal cujo nome se conheça. Sem autenticação, o isolamento da sessão depende fortemente da **imprevisibilidade do token** (uma forma de *segurança por obscuridade*) — aceitável aqui porque **não há dado sensível em jogo**, mas precisa ser reconhecido.

**Para endurecer (opcional, ainda no free tier):**

- **Private Channels do Realtime + RLS.** O Supabase permite **canais privados** autorizados por políticas RLS. Combinado com **login anônimo** (anonymous sign-in, que emite um JWT mesmo sem cadastro), dá para restringir quem assina cada canal. *(Confirmar a configuração na documentação oficial do Supabase Realtime Authorization.)*
- **Validação no cliente.** Ignorar mensagens malformadas ou fora do contrato `SessionState` (ver [[Plano de Desenvolvimento#3 Arquitetura de alto nível]]).

### 4. Abuso e robustez

- **Rate limiting / tamanho de mensagem.** O free tier do Supabase já impõe limites; tratar erros de limite com degradação graciosa (ver [[Funcionamento da Aplicação]]), nunca travar a tela.
- **Sanitização.** Texto livre do atendente é renderizado na tela do cliente — tratar como dado não-confiável (escapar/limitar) para evitar injeção de conteúdo.

## Segredos e chaves (Supabase)

> [!important] A regra que mais quebra projetos
> - **`anon` / publishable key** → pode ir no frontend (é pública por design).
> - **`service_role` key** → **NUNCA** no frontend, nunca no repositório. Ela ignora RLS e dá acesso total. Só em ambiente de servidor/CI, via variável de ambiente.

- Chaves em **`.env.local`** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` — a *publishable key* moderna, pública por design); `.env*` no `.gitignore` (exceto `.env.example`).
- Versionar apenas um **`.env.example`** sem segredos.

## Banco de dados (`demo_requests`)

Único dado persistido — tratar com cuidado mesmo sendo pouco:

- **RLS ligada** na tabela. Política de **`INSERT` apenas** para o papel anônimo; **sem `SELECT`/`UPDATE`/`DELETE`** público (ninguém lê a lista de leads pelo cliente).
- **Validar no cliente e confiar no banco** (constraints) — e-mail bem formado, campos com tamanho máximo.
- Coletar **o mínimo** (nome, contato, mensagem) e deixar claro o propósito (ver §[[#Privacidade e LGPD]]).

## Câmera e microfone (privacidade)

> [!success] Boa história de privacidade — preservar
> - **Permissão explícita** do usuário (o navegador exige; a [[Interface do Cliente]] já prevê tela de permissão).
> - **Processar o vídeo localmente.** Na frente 2, o reconhecimento (MediaPipe/TensorFlow.js — ver [[Reconhecimento de LIBRAS]]) roda **no navegador**; o **stream de vídeo não precisa ser enviado a servidor algum**. Só o **texto reconhecido** trafega pelo canal.
> - **Sem gravação.** Não armazenar frames nem áudio. Encerrar o stream ao fim da sessão.
> - **Indicadores visíveis** de câmera/microfone ativos (`DeviceIndicator` do [[Design System]]) — o usuário sempre sabe quando está sendo capturado.

## Transporte e cabeçalhos do app

- **HTTPS obrigatório** (o host estático free — Vercel/Netlify/Cloudflare Pages — já entrega TLS).
- **Cabeçalhos de segurança** quando o host permitir: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`.
- **Não logar conteúdo de conversa** em produção (nem `console.log` de mensagens da sessão).

## Privacidade e LGPD

Mesmo com pouco dado, vale registrar para o artigo:

- **Histórico efêmero** = privacidade por design: a conversa não persiste em lugar nenhum após fechar a aba.
- **Vídeo não sai do dispositivo** = dado biométrico sensível não é coletado nem transmitido.
- **`demo_requests`** é o único tratamento de dado pessoal (contato de um gestor de loja) — exige **base legal/consentimento** e **finalidade clara** (contato comercial), com aviso de privacidade na [[Landing Page]].

## Dependências (supply chain)

- Rodar **`npm audit`** periodicamente e manter dependências atualizadas.
- Preferir bibliotecas mantidas (MediaPipe/TensorFlow.js, Supabase JS) — evitar pacotes obscuros para algo crítico como o canal.

## Checklist de segurança (parte do *Definição de Pronto*)

- [x] Toda conexão usa `wss://` / HTTPS (Supabase Realtime usa `wss://`; deploy HTTPS ao conectar o host).
- [ ] ID real da sessão é token de alta entropia; código curto expira após pareamento. *(hoje o canal usa o código curto direto)*
- [ ] Sessão expira por inatividade e é invalidada ao encerrar. *(encerrar reseta o estado; falta TTL/invalidação do canal)*
- [x] `service_role` **não** aparece em nenhum lugar do frontend/repo; `.env*` ignorado pelo git.
- [x] RLS ligada em `demo_requests` (somente `INSERT` anônimo, validado).
- [ ] Câmera: permissão explícita, processamento local, sem gravação, indicador visível. *(`getUserMedia` real entra no M5/M6; indicador `DeviceIndicator` já existe)*
- [ ] Texto livre tratado como entrada não-confiável (sanitizado/limitado).
- [x] Sem logs de conteúdo de conversa em produção.
- [x] `npm audit` sem vulnerabilidades altas/críticas conhecidas. *(0 vulnerabilidades na instalação)*

## Notas relacionadas

- [[TalkToMe]] — MOC do projeto
- [[Plano de Desenvolvimento]] — stack, canal de sessão e arquitetura
- [[Funcionamento da Aplicação]] — fluxo e estado da sessão
- [[Interface do Cliente]] — câmera, permissões, `DeviceIndicator`
- [[Reconhecimento de LIBRAS]] — processamento local de vídeo (frente 2)
- [[Landing Page]] — formulário de demonstração e aviso de privacidade
