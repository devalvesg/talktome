/**
 * Gerenciador do motor de avatar em LIBRAS (VLibras Player) — M5.
 *
 * O modelo é o validado na PoC (fonte do bundle em tools/vlibras-player): em vez do widget flutuante
 * (que torna a página inteira clicável), embutimos o Player e o comandamos por
 * código — `translate(texto)`. Aqui ele é um SINGLETON: o bundle e o avatar Unity
 * (pesado, ~14 MB) carregam uma única vez e o canvas é reaproveitado entre montagens.
 *
 * Assets servidos same-origin de public/vlibras (ver public/vlibras/VERSION.md).
 * Tradução PT→glosa e dicionário de sinais continuam em serviços remotos do VLibras.
 */

const BUNDLE_URL = '/vlibras/vlibras.bundle.js';
const TARGET_PATH = '/vlibras/target';
const GAME_CONTAINER_ID = 'gameContainer'; // id que o Player cria internamente

interface VLibrasPlayerInstance {
  load(wrapper: HTMLElement): void;
  translate(text: string): void;
  stop(): void;
  repeat(): void;
  setSpeed(speed: number): void;
  on(event: string, cb: (...args: unknown[]) => void): void;
}

declare global {
  interface Window {
    VLibras?: { Player: new (options: { targetPath: string }) => VLibrasPlayerInstance };
  }
}

export interface VLibrasController {
  /** Sinaliza um texto (atendente → cliente). */
  translate(text: string): void;
  stop(): void;
  repeat(): void;
  setSpeed(speed: number): void;
  /** Notifica início/fim da sinalização. Retorna função de cancelamento. */
  onSigning(cb: (signing: boolean) => void): () => void;
}

let scriptPromise: Promise<void> | null = null;
let player: VLibrasPlayerInstance | null = null;
let readyPromise: Promise<VLibrasController> | null = null;
const signingListeners = new Set<(signing: boolean) => void>();

function loadScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    if (window.VLibras?.Player) return resolve();
    const s = document.createElement('script');
    s.src = BUNDLE_URL;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Falha ao carregar o bundle do VLibras Player.'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

function emitSigning(signing: boolean) {
  signingListeners.forEach((cb) => cb(signing));
}

/**
 * Garante o Player carregado e com o avatar anexado ao `container`.
 * Na primeira chamada instancia o Unity; nas seguintes apenas move o canvas
 * existente para o novo container (sobrevive a remontagens do React/StrictMode).
 */
export function mountVLibras(container: HTMLElement): Promise<VLibrasController> {
  const existingCanvas = document.getElementById(GAME_CONTAINER_ID);
  if (existingCanvas && existingCanvas.parentElement !== container) {
    container.appendChild(existingCanvas);
  }

  if (readyPromise) return readyPromise;

  readyPromise = loadScript().then(
    () =>
      new Promise<VLibrasController>((resolve, reject) => {
        if (!window.VLibras?.Player) {
          return reject(new Error('window.VLibras.Player indisponível após carregar o bundle.'));
        }

        player = new window.VLibras.Player({ targetPath: TARGET_PATH });

        const controller: VLibrasController = {
          translate: (text) => player?.translate(text),
          stop: () => player?.stop(),
          repeat: () => player?.repeat(),
          setSpeed: (speed) => player?.setSpeed(speed),
          onSigning: (cb) => {
            signingListeners.add(cb);
            return () => signingListeners.delete(cb);
          },
        };

        // gloss:start / gloss:end = avatar de fato começou/terminou de sinalizar.
        player.on('gloss:start', () => emitSigning(true));
        player.on('gloss:end', () => emitSigning(false));
        player.on('load', () => resolve(controller));

        player.load(container);
      }),
  );

  return readyPromise;
}

/** Se a flag VITE_VLIBRAS estiver ligada. */
export const isVLibrasEnabled = import.meta.env.VITE_VLIBRAS === 'on';
