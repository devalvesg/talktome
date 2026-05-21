import { EMPTY_SESSION_STATE, type SessionChannel, type SessionState } from './types';

/**
 * Implementação local de SessionChannel usando BroadcastChannel — sincroniza
 * o estado da sessão entre abas do mesmo navegador (e cai para memória pura
 * onde BroadcastChannel não existir).
 *
 * É o canal do M3. No M4, `SupabaseChannel` implementa a MESMA interface e a
 * troca no provider é de uma linha. Estratégia de merge: last-writer-wins
 * sobre o estado completo (suficiente para o fluxo de 1 atendente ↔ 1 cliente).
 */
type Message =
  | { type: 'state'; state: SessionState }
  | { type: 'sync-request' };

export class MockChannel implements SessionChannel {
  private bc: BroadcastChannel | null = null;
  private subs = new Set<(state: SessionState) => void>();
  private state: SessionState = EMPTY_SESSION_STATE;

  constructor(name = 't2m-session') {
    if (typeof BroadcastChannel !== 'undefined') {
      this.bc = new BroadcastChannel(name);
      this.bc.onmessage = (e: MessageEvent<Message>) => {
        const msg = e.data;
        if (msg.type === 'state') {
          this.state = msg.state;
          this.emit();
        } else if (msg.type === 'sync-request') {
          // Uma aba nova pediu o estado atual — responde com o que temos.
          this.post({ type: 'state', state: this.state });
        }
      };
      // Ao entrar, pede o estado atual a quem já estiver na sessão.
      this.post({ type: 'sync-request' });
    }
  }

  send(patch: Partial<SessionState>): void {
    this.state = { ...this.state, ...patch };
    this.post({ type: 'state', state: this.state });
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
    this.bc?.close();
    this.bc = null;
    this.subs.clear();
  }

  private post(msg: Message): void {
    this.bc?.postMessage(msg);
  }

  private emit(): void {
    for (const cb of this.subs) cb(this.state);
  }
}
