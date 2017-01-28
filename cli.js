#! /usr/bin/env node --harmony-async-await

const program = require('commander');

const execute = require('./index');
const pkg = require('./package.json');

let rootDir;
let dest;

program
  .version(pkg.version)
  .arguments('<rootDir> <dest>')
  .action(($rootDir, $dest) => {
    rootDir = $rootDir;
    dest = $dest;
  })
  .parse(process.argv);

execute({ rootDir, dest })
  .catch(err => console.error(err));

