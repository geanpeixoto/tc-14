const postcss = require('postcss');
const parser = require('postcss-js');
const cssnext = require('postcss-cssnext');

const runner = postcss([
  cssnext({
    browsers: ['ie > 9'],
  }),
]);

function processJson(json) {
  return runner.process(json, {
    parser,
  });
}

function processString(string) {
  return runner.process(string);
}

function p(input) {
  const t = typeof input;
  switch (t) {
    case 'string':
      return processString(input);
    default:
      return processJson(input);
  }
}

function process(input) {
  return p(input)
    .then(result => result.css);
}

module.exports = {
  process,
};
