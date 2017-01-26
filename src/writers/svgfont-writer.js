const fs = require('fs');
const svgicons2svgfont = require('svgicons2svgfont');
const { mkdir, dirname } = require('../utils/file-manager');

function makeSvgStream(font, filename) {
  const warns = new Set();

  const output = svgicons2svgfont({
    fontName: font.name,
    fontHeight: 150,
    normalize: true,
    // fixedWidth: false,
    log: (message) => {
      if (message !== 'Font created') {
        warns.add(message);
      }
    },
  });

  output.pipe(fs.createWriteStream(filename, {
    flags: 'w',
    defaultEncoding: 'utf8',
  }));

  output.on('end', () => warns.size && console.log(Array.from(warns).join('\n')));

  return output;
}

function makeIconStream({ file, name, unicode }) {
  const icon = fs.createReadStream(file);
  icon.metadata = {
    name,
    unicode,
  };
  return icon;
}

function writeIcons(stream, font) {
  font.groups.forEach((group) => {
    group.icons
      .map(icon => makeIconStream(icon))
      .forEach(iconStream => stream.write(iconStream));
  });
}

function $writeSvgFont(font, filename) {
  return new Promise((resolve, reject) => {
    const svgStream = makeSvgStream(font, filename);
    let svg = '';

    svgStream
      .on('data', (append) => {
        svg += append;
      })
      .on('end', () => resolve(svg))
      .on('error', err => reject(err));

    writeIcons(svgStream, font);
    svgStream.end();
  });
}

async function write(font, filename) {
  await mkdir(dirname(filename));
  return await $writeSvgFont(font, filename);
}

module.exports = write;
