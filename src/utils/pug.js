const pug = require('pug');

function process(source, context = {}, options = {
  pretty: true,
}) {
  return Promise.resolve(pug.compile(source, options)(context));
}

module.exports = {
  process,
};
