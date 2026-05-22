/**
 * Contrato tipado da sessão — fonte da verdade entre as duas telas e os dois
 * devs. Deriva do estado compartilhado descrito em
 * docs/Funcionamento da Aplicação.md e do event bus do protótipo (__T2M_BUS).
 *
 * ⚠️ ÁREA CONGELADA (§4 do Plano de Desenvolvimento): mudanças aqui exigem
 * aviso no Quadro de Alocação + commit isolado, pois telas e canal dependem
 * deste módulo. Nenhuma tela importa `supabase` direto — fala só com
 * SessionChannel.
 */

export interface Option {
  value: string;
  label: string;
  icon?: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface ClientAnswer {
  questionId: string;
  value: string;
}

export type HistorySide = 'attendant' | 'client';

export interface HistoryEntry {
  side: HistorySide;
  text: string;
  time: string;
  kind: string;
}

/**
 * Estado de carga do avatar na tela do CLIENTE, propagado ao atendente pelo
 * canal. O atendente só libera as ações quando 'ready' e exibe alerta no 'error'.
 */
export type AvatarStatus = 'loading' | 'ready' | 'error';

export interface SessionState {
  question: Question | null;
  clientAnswer: ClientAnswer | null;
  history: HistoryEntry[];
  clientRecording: boolean;
  librasText: string | null;
  /** Status do avatar do cliente (M5). Default 'loading' até o cliente reportar. */
  avatarStatus: AvatarStatus;
  /** Mensagem curta de erro do avatar, quando avatarStatus === 'error'. */
  avatarError: string | null;
  /** Atendente encerrou a sessão — o cliente é desconectado com aviso. */
  ended: boolean;
}

/**
 * Canal de sessão. Implementações: MockChannel (M3) e SupabaseChannel (M4).
 * Trocar uma pela outra deve ser UMA linha no provider.
 */
export interface SessionChannel {
  send(patch: Partial<SessionState>): void;
  subscribe(cb: (state: SessionState) => void): () => void;
  close(): void;
}

/** Estado inicial vazio de uma sessão. */
export const EMPTY_SESSION_STATE: SessionState = {
  question: null,
  clientAnswer: null,
  history: [],
  clientRecording: false,
  librasText: null,
  avatarStatus: 'loading',
  avatarError: null,
  ended: false,
};
