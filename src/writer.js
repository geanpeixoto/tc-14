const fs = require('fs');
const Path = require('path');
const svgicons2svgfont = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
const ttf2eot = require('ttf2eot');

class Writer {

  constructor(fontface) {
    this.fontface = fontface;
  }

  write(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    return this.writeSVG(path)
      .then(svg => this.writeTTF(svg, path))
      .then(ttf => Promise.all([
        this.writeEOT(ttf, path),
        this.writeWOFF(ttf, path),
        this.writeWOFF2(ttf, path),
        this.writeCSS(path),
      ]));
  }

  writeCSS(path) {
    const template = fs.readFileSync(Path.join(__dirname, 'templates/style.css'), 'utf8');
    const filename = this.makeFilename(path, 'css');
    const css = template.replace(/\$\{([^\}]+)\}/g, (_, key) => this.fontface[key]);

    return new Promise(resolve => fs.writeFile(filename, css, () => resolve()));
  }

  writeTTF(svg, path) {
    const {
      version,
    } = this.fontface;

    const filename = this.makeFilename(path, 'ttf');
    const ttf = new Buffer(svg2ttf(svg, {
      version,
    }).buffer);

    return new Promise(resolve => fs.writeFile(filename, ttf, () => resolve(ttf)));
  }

  writeWOFF(ttf, path) {
    const filename = this.makeFilename(path, 'woff');
    const woff = new Buffer(ttf2woff(new Uint8Array(ttf)).buffer);

    return new Promise(resolve => fs.writeFile(filename, woff, () => resolve(ttf)));
  }

  writeEOT(ttf, path) {
    const filename = this.makeFilename(path, 'eot');
    const eot = new Buffer(ttf2eot(new Uint8Array(ttf)).buffer);

    return new Promise(resolve => fs.writeFile(filename, eot, () => resolve(ttf)));
  }

  writeWOFF2(ttf, path) {
    const filename = this.makeFilename(path, 'woff2');
    const woff2 = ttf2woff2(ttf);

    return new Promise(resolve => fs.writeFile(filename, woff2, () => resolve(ttf)));
  }

  writeSVG(path) {
    const {
      fontface,
    } = this;

    const stream = svgicons2svgfont({
      fontName: fontface.name,
    });

    const filename = this.makeFilename(path, 'svg');
    let svgfile = '';

    stream.pipe(fs.createWriteStream(filename, {
      flags: 'w',
      defaultEncoding: 'utf8',
    }));

    const promise = new Promise((resolve, reject) => {
      stream
        .on('finish', () => resolve(svgfile))
        .on('data', (data) => {
          svgfile += data;
        })
        .on('error', err => reject(err));
    });

    fontface.glyphs.forEach(({
      file,
      name,
      unicode,
    }) => {
      const glyph = fs.createReadStream(file);
      glyph.metadata = {
        name,
        unicode,
      };
      stream.write(glyph);
    });
    stream.end();

    return promise;
  }

  makeFilename(path, extension) {
    return Path.join(path, `${this.fontface.alias}.${extension}`);
  }
}

module.exports = Writer;
