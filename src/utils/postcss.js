const postcss = require('postcss');
const parser = require('postcss-js');
const autoprefixer = require('autoprefixer');

const runner = postcss([
  autoprefixer,
]);

function process(json) {
  return runner.process(json, {
    parser,
  })
  .then(result => result.css);
}

module.exports = {
  process,
};
