# Avatar VLibras — assets vendorizados (M5)

Servidos **same-origin** a partir de `public/vlibras/` para evitar atritos de
CORS/COOP/COEP do WebGL e **fixar a versão** do avatar (o CDN do VLibras aponta
para um branch mutável).

| Item | Origem | Observação |
| ---- | ------ | ---------- |
| `target/*` (Unity WebGL, ~14 MB) | `cdn.jsdelivr.net/gh/spbgovbr-vlibras/vlibras-portal@sgd/app/target` | avatar `playerweb` |
| `vlibras.bundle.js` | gerado por `tools/vlibras-player` (esbuild a partir de `spbgovbr-vlibras/vlibras-player-webjs`) | expõe `window.VLibras.Player` |

Baixado em 2026-05-21. Tradução (`traducao2.vlibras.gov.br`) e dicionário de sinais
(`dicionario2.vlibras.gov.br`) continuam sendo **serviços remotos** do VLibras — não
são vendorizáveis. Para regerar o bundle: `cd tools/vlibras-player && npm run build`
(o script atualiza este arquivo automaticamente).
