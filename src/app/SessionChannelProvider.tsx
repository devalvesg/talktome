/**
 * Provedor do canal de sessão. É o ÚNICO lugar que decide qual implementação
 * de SessionChannel usar — trocar MockChannel por SupabaseChannel (M4) é uma
 * linha aqui. As telas consomem só `useSession()`, nunca o canal direto nem
 * o cliente supabase (regra de ouro do acoplamento, Plano §2).
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { MockChannel } from '@/session/MockChannel';
import {
  EMPTY_SESSION_STATE,
  type HistoryEntry,
  type SessionChannel,
  type SessionState,
} from '@/session/types';

interface SessionContextValue {
  state: SessionState;
  /** Aplica um patch ao estado compartilhado. */
  send: (patch: Partial<SessionState>) => void;
  /** Acrescenta uma entrada ao histórico compartilhado. */
  appendHistory: (entry: HistoryEntry) => void;
  /** Zera a sessão (encerrar atendimento). */
  reset: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionChannelProvider({ children }: { children: ReactNode }) {
  // Instância única e estável do canal (lazy). M4: trocar por SupabaseChannel.
  const [channel] = useState<SessionChannel>(() => new MockChannel());
  const [state, setState] = useState<SessionState>(EMPTY_SESSION_STATE);

  useEffect(() => {
    const unsub = channel.subscribe(setState);
    return () => {
      unsub();
      channel.close();
    };
  }, [channel]);

  // `state` no closure está sempre atual (value é recriado a cada mudança).
  const value = useMemo<SessionContextValue>(
    () => ({
      state,
      send: (patch) => channel.send(patch),
      appendHistory: (entry) => channel.send({ history: [...state.history, entry] }),
      reset: () => channel.send({ ...EMPTY_SESSION_STATE }),
    }),
    [channel, state],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession precisa estar dentro de <SessionChannelProvider>');
  return ctx;
}
