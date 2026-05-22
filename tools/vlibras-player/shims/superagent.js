// Shim mínimo do superagent (o player usa superagent@1.7, de 2016).
// Único uso: request.post(url, { text, domain }).end((err, res) => res.text).
// Reimplementado com fetch — remove a dependência antiga/frágil do bundle.
function post(url, body) {
  return {
    end(callback) {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((resp) => resp.text().then((text) => callback(null, { text, ok: resp.ok })))
        .catch((err) => callback(err));
    },
  };
}

module.exports = { post };
module.exports.post = post;
