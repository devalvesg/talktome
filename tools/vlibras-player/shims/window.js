// Shim para o pacote npm "window" (que em browser puxaria jsdom).
// O player só usa `window` como referência ao objeto global do browser.
module.exports = typeof window !== 'undefined' ? window : globalThis;
