/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  /** Liga o motor real do avatar (VLibras Player) no LibrasViewer. 'on' para ativar. */
  readonly VITE_VLIBRAS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
