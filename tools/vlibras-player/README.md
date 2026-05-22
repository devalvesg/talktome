# Fonte do bundle do VLibras Player

Recipe reproduzível que gera `public/vlibras/vlibras.bundle.js` — o motor de avatar
em LIBRAS que o app usa no `LibrasViewer` (M5). O bundle expõe `window.VLibras.Player`,
controlado por código (`player.translate(texto)`): o avatar fica fixo no container e só
sinaliza o que o app mandar — diferente do widget oficial, que torna a página inteira clicável.

## Por que bundlar do código-fonte

O pacote npm `vlibras` foi **despublicado em 2024-02-24** (fragilidade de suporte). O player
ainda existe em [`spbgovbr-vlibras/vlibras-player-webjs`](https://github.com/spbgovbr-vlibras/vlibras-player-webjs),
então vendorizamos o fonte em `player-src/` e geramos o bundle com esbuild.

- `window`, `path` e o antigo `superagent@1.7` viram **shims** (`shims/`) — o superagent
  foi trocado por `fetch`, removendo a dependência de 2016.
- Avatar (Unity WebGL ~14 MB) é vendorizado em `public/vlibras/target/`; dicionário de
  sinais e tradução PT→glosa são **serviços remotos** do VLibras (não vendorizáveis).

## Regerar o bundle

Necessário só ao mexer em `player-src/` ou `shims/`, ou ao atualizar a versão do player:

```bash
cd tools/vlibras-player
npm install
npm run build   # gera vendor/vlibras.bundle.js e copia para public/vlibras/vlibras.bundle.js
```

## Testar o player isolado (opcional)

`index.html` é uma página de teste do motor fora do app (mede carga/latência, dispara as
frases do vocabulário). Precisa de http (não `file://`):

```bash
npx serve tools/vlibras-player          # ou:
python3 -m http.server -d tools/vlibras-player 5052   # http://localhost:5052
```
