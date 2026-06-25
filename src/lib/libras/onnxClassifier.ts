/**
 * Inferência do classificador de letras (MLP exportado para ONNX), rodando
 * 100% no browser via onnxruntime-web. Portado de cnn-libras-web.
 * Os artefatos vivem em public/: model_landmarks.onnx + .meta.json.
 */
import * as ort from 'onnxruntime-web';

// onnxruntime-web baixa arquivos .wasm/.mjs em runtime. Servindo da CDN
// evitamos precisar de vite-plugin-static-copy. A versão é derivada do
// pacote instalado (ort.env.versions.common) para que o caminho da CDN
// nunca dessincronize do loader — versões diferentes têm nomes de módulo
// incompatíveis e o import dinâmico falha com "no available backend found".
ort.env.wasm.wasmPaths = `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ort.env.versions.common}/dist/`;

const MODEL_URL = '/model_landmarks.onnx';
const META_URL = '/model_landmarks.meta.json';

interface ModelMeta {
  labels: string[];
  inputName?: string;
  probaOutputName?: string;
  featureDim?: number;
}

export interface LandmarkPrediction {
  letter: string;
  confidence: number;
  probabilities: Record<string, number>;
}

let _session: ort.InferenceSession | null = null;
let _meta: ModelMeta | null = null;
let _loading: Promise<{
  session: ort.InferenceSession;
  meta: ModelMeta;
}> | null = null;

async function load(): Promise<{
  session: ort.InferenceSession;
  meta: ModelMeta;
}> {
  if (_session && _meta) return { session: _session, meta: _meta };
  if (_loading) return _loading;

  _loading = (async () => {
    const metaRes = await fetch(META_URL);
    if (!metaRes.ok) {
      throw new Error(
        `Modelo de landmarks não publicado em ${META_URL}. Rode train_landmarks.py.`,
      );
    }
    const meta = (await metaRes.json()) as ModelMeta;
    const session = await ort.InferenceSession.create(MODEL_URL, {
      executionProviders: ['wasm'],
    });
    _meta = meta;
    _session = session;
    return { session, meta };
  })();
  return _loading;
}

export async function isLandmarkModelAvailable(): Promise<boolean> {
  try {
    const r = await fetch(META_URL, { method: 'HEAD' });
    return r.ok;
  } catch {
    return false;
  }
}

export async function predictLandmarks(
  features: Float32Array,
): Promise<LandmarkPrediction> {
  const { session, meta } = await load();
  const inputName = meta.inputName ?? session.inputNames[0];
  const tensor = new ort.Tensor('float32', features, [1, features.length]);

  const results = await session.run({ [inputName]: tensor });

  // skl2onnx (com zipmap desligado) costuma gerar duas saídas:
  //   label        : int64[1]
  //   probabilities: float32[1, n_classes]
  // O nome muda entre versões — localizamos pelo shape do tensor.
  let probs: Float32Array | null = null;
  for (const name of session.outputNames) {
    const out = results[name];
    if (!out) continue;
    if (
      out.data instanceof Float32Array &&
      out.dims[out.dims.length - 1] === meta.labels.length
    ) {
      probs = out.data;
      break;
    }
  }
  if (!probs) {
    throw new Error(
      'ONNX: nenhum tensor de probabilidades compatível com labels foi encontrado.',
    );
  }

  let best = 0;
  for (let i = 1; i < probs.length; i++) {
    if (probs[i] > probs[best]) best = i;
  }
  const probabilities: Record<string, number> = {};
  for (let i = 0; i < meta.labels.length; i++) {
    probabilities[meta.labels[i]] = probs[i];
  }
  return {
    letter: meta.labels[best],
    confidence: probs[best],
    probabilities,
  };
}
