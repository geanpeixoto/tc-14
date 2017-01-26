/**
 * Transforma um método com callback em uma `Promise`.
 * @param {function} fn Método onde o callback é o ultimo argumento.
 * @return {function} Método onde o callback foi substituido
 */
function promisefy(fn) {
  return (...input) => new Promise((resolve, reject) => {
    function callback(err, ...args) {
      if (err) {
        reject(err);
        return;
      }
      resolve(args.length === 1 ? args[0] : args);
    }

    fn.apply(this, [...input, callback]);
  });
}

const compose = (...fns) =>
  fns.reduce((f, g) => (...args) => Promise.resolve(g(...args)).then(r => f(r)));

module.exports = {
  promisefy,
  compose,
};
