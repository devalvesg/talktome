import { createClient } from '@supabase/supabase-js';

/**
 * Cliente Supabase único da aplicação.
 *
 * ⚠️ Acoplamento (regra de ouro do Plano §2): nenhuma TELA importa este módulo
 * diretamente. Apenas a implementação `SupabaseChannel` (M4) e a persistência
 * mínima da Landing (`demo_requests`) o consomem. Telas falam só com
 * `SessionChannel`.
 *
 * Variáveis em .env.local (ver .env.example). No free tier usamos a
 * publishable key (segura para client-side).
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  // Em M0–M3 o canal real ainda não é usado; avisa sem quebrar o app.
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY ausentes. ' +
      'Defina-as em .env.local antes do M4 (canal Realtime).',
  );
}

export const supabase = createClient(url ?? '', publishableKey ?? '');
