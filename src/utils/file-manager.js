const fs = require('fs');
const mkpath = require('mkpath');
const path = require('path');
const { promisefy, compose } = require('./function');

const mkdir = promisefy(mkpath);
const readFile = promisefy(fs.readFile.bind(fs));
const readJSON = compose(JSON.parse, readFile);
const ls = promisefy(fs.readdir.bind(fs));

const $writeFile = promisefy(fs.writeFile.bind(fs));
async function writeFile(filename, data) {
  await mkdir(path.dirname(filename));
  return $writeFile(filename, data);
}

function isDirectory(p) {
  return fs.statSync(p).isDirectory();
}

async function folders(p) {
  const children = await ls(p);
  return children.filter(f => isDirectory(path.join(p, f)))
}

async function files(p) {
  const children = await ls(p);
  return children.filter(f => !isDirectory(path.join(p, f)))
}

module.exports = {
  writeFile,
  readFile,
  readJSON,
  mkdir,
  ls,
  folders,
  files,
  isDirectory,
  join: path.join,
  basename: path.basename,
  dirname: path.dirname,
  isAbsolute: path.isAbsolute,
};
