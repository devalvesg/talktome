// `require("path")` aparece no Player.js apenas em código comentado (as chamadas
// reais usam url-join). Resolvemos para um módulo vazio em vez de polyfill.
module.exports = {};
