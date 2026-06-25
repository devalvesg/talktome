import type { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { EMPTY_SESSION_STATE, type SessionChannel, type SessionState } from './types';

/**
 * Canal de sessão real via Supabase Realtime (broadcast), implementando a
 * MESMA interface SessionChannel que o MockChannel. Sincroniza o estado entre
 * dispositivos diferentes que entrarem no mesmo `code` de sessão.
 *
 * Estratégia idêntica à do mock: last-writer-wins sobre o estado completo.
 * Ao entrar (SUBSCRIBED), pede o estado atual a quem já estiver na sessão.
 * Sessão é efêmera (não persiste em banco); o histórico vive no navegador.
 */
export class SupabaseChannel implements SessionChannel {
  private channel: RealtimeChannel;
  private subs = new Set<(state: SessionState) => void>();
  private state: SessionState = EMPTY_SESSION_STATE;
  private subscribed = false;
  private syncTimers: ReturnType<typeof setTimeout>[] = [];

  constructor(code: string) {
    this.channel = supabase.channel(`t2m:${code}`, {
      config: { broadcast: { self: false } },
    });

    this.channel
      .on('broadcast', { event: 'state' }, ({ payload }) => {
        this.state = payload as SessionState;
        this.emit();
      })
      .on('broadcast', { event: 'sync-request' }, () => {
        // Alguém entrou agora — devolve o estado atual.
        void this.broadcast('state', this.state);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          this.subscribed = true;
          // Pede o estado atual a quem já está na sessão. No "cold start" do
          // Realtime (projeto recém-criado/ocioso) a primeira mensagem pode se
          // perder; repetimos algumas vezes nos primeiros segundos. Basta uma
          // resposta chegar para destravar o estado (ex.: avatarStatus do
          // cliente que libera as ações do atendente). Como o estado é
          // efêmero e last-writer-wins, repetir o pedido é inofensivo.
          for (const delay of [0, 800, 2500, 6000]) {
            this.syncTimers.push(
              setTimeout(() => void this.broadcast('sync-request', {}), delay),
            );
          }
        }
      });
  }

  send(patch: Partial<SessionState>): void {
    this.state = { ...this.state, ...patch };
    void this.broadcast('state', this.state);
    this.emit();
  }

  subscribe(cb: (state: SessionState) => void): () => void {
    this.subs.add(cb);
    cb(this.state);
    return () => {
      this.subs.delete(cb);
    };
  }

  close(): void {
    for (const t of this.syncTimers) clearTimeout(t);
    this.syncTimers = [];
    void supabase.removeChannel(this.channel);
    this.subs.clear();
  }

  private broadcast(event: string, payload: unknown) {
    if (!this.subscribed && event !== 'sync-request') {
      // Antes de SUBSCRIBED o broadcast é descartado; ignora silenciosamente.
      return;
    }
    return this.channel.send({ type: 'broadcast', event, payload });
  }

  private emit(): void {
    for (const cb of this.subs) cb(this.state);
  }
}
