import { supabase } from './supabase';

export interface DemoRequestInput {
  name: string;
  email: string;
  message?: string;
}

/**
 * Grava um pedido de demonstração (Landing) em `public.demo_requests`.
 * RLS permite apenas INSERT anônimo — nenhuma leitura pelo cliente.
 */
export async function submitDemoRequest(input: DemoRequestInput): Promise<void> {
  const { error } = await supabase.from('demo_requests').insert({
    name: input.name,
    email: input.email,
    message: input.message || null,
  });
  if (error) throw error;
}
