-- Tabela do formulário "Solicitar demonstração" da Landing.
-- Único dado persistido do Talk2Me (ver docs/Segurança.md).
-- O canal de sessão (Realtime broadcast) é efêmero e não usa tabela.

create table public.demo_requests (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (
               char_length(email) <= 254
               and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'  -- formato básico
             ),
  message    text check (char_length(message) <= 2000)     -- opcional
);

-- Segurança: RLS ligada, somente INSERT anônimo (sem SELECT/UPDATE/DELETE).
alter table public.demo_requests enable row level security;

create policy "anon pode inserir demo_requests"
  on public.demo_requests
  for insert
  to anon
  with check (true);
