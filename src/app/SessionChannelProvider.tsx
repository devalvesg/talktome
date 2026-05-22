/**
 * Provedor do canal de sessão. É o ÚNICO lugar que decide qual implementação
 * de SessionChannel usar — a troca Mock↔Supabase é a linha única em
 * `createChannel()`. As telas consomem só `useSession()`, nunca o canal direto
 * nem o cliente supabase (regra de ouro do acoplamento, Plano §2).
 *
 * Seleção: se a URL traz `?s=CODE` usa o canal real (Supabase Realtime, entre
 * dispositivos); sem código, usa o MockChannel (BroadcastChannel, entre abas
 * do mesmo navegador — conveniente em dev).
 */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { MockChannel } from '@/session/MockChannel';
import { SupabaseChannel } from '@/session/SupabaseChannel';
import {
  EMPTY_SESSION_STATE,
  type HistoryEntry,
  type SessionChannel,
  type SessionState,
} from '@/session/types';

function createChannel(code: string | null): SessionChannel {
  return code ? new SupabaseChannel(code) : new MockChannel();
}

interface SessionContextValue {
  state: SessionState;
  /** Código da sessão atual (null quando em modo mock local). */
  code: string | null;
  send: (patch: Partial<SessionState>) => void;
  appendHistory: (entry: HistoryEntry) => void;
  reset: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionChannelProvider({ children }: { children: ReactNode }) {
  const [params] = useSearchParams();
  const code = params.get('s');
  const [state, setState] = useState<SessionState>(EMPTY_SESSION_STATE);
  const channelRef = useRef<SessionChannel | null>(null);

  // Cria e destrói o canal NO MESMO efeito. Criar no useMemo e fechar no
  // cleanup quebra sob StrictMode: o close() (removeChannel) mata a inscrição
  // Realtime e o re-run não a reconectaria. Pareando aqui, cada cleanup é
  // seguido de um canal novo e funcional (Mock <-> Supabase ao trocar `code`).
  useEffect(() => {
    const channel = createChannel(code);
    channelRef.current = channel;
    // subscribe emite imediatamente o estado atual do canal (vazio ao trocar).
    const unsub = channel.subscribe(setState);
    return () => {
      unsub();
      channel.close();
      channelRef.current = null;
    };
  }, [code]);

  const value = useMemo<SessionContextValue>(
    () => ({
      state,
      code,
      send: (patch) => channelRef.current?.send(patch),
      appendHistory: (entry) => channelRef.current?.send({ history: [...state.history, entry] }),
      reset: () => channelRef.current?.send({ ...EMPTY_SESSION_STATE }),
    }),
    [state, code],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession precisa estar dentro de <SessionChannelProvider>');
  return ctx;
}
