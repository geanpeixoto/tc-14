const path = require('path');
const browserify = require('browserify');
const babelify = require('babelify');

const fs = require('fs');
const myfs = require('../utils/fs');
const pug = require('../utils/pug');
const postcss = require('../utils/postcss');

class ExampleWriter {
  constructor(fontface) {
    this.fontface = fontface;
  }

  write(dest) {
    myfs.mkdir(dest)
      .then(() => Promise.all([
        ExampleWriter.writeJs(dest),
        ExampleWriter.writeCss().then(styles => this.writeIndex(dest, styles)),
      ]));
  }

  static writeJs(dest) {
    return new Promise((resolve, reject) => {
      browserify({
        debug: true,
      })
      .transform(babelify, { presets: ['es2015', 'es2016'] })
      .require(path.join(__dirname, '../templates/index.js'), {
        entry: true,
      })
      .bundle()
      .on('error', err => reject(err))
      .on('end', () => resolve())
      .pipe(fs.createWriteStream(path.join(dest, 'index.js')));
    });
  }

  static writeCss() {
    return myfs.readFile(path.join(__dirname, '../templates/style.css'))
      .then(style => postcss.process(style));
  }

  writeIndex(dest, styles) {
    return pug.process(path.join(__dirname, '../templates/index.pug'), Object.assign({
      filename: 'index.pug',
      styles,
      doctype: 'html',
      basedir: path.join(__dirname, '../templates'),
    }, this.fontface))
      .then(data => myfs.writeFile(path.join(dest, 'index.html'), data));
  }
}

module.exports = ExampleWriter;
