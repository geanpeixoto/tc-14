const pug = require('pug');

function process(file, context = {}, options = {
  pretty: true,
}) {
  return Promise.resolve(pug.compileFile(file, options)(context));
}

module.exports = {
  process,
};
