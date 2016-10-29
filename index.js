const FontFace = require('./src/fontface');
const Writer = require('./src/writer');

const font = FontFace.load('./example/my-icons.cson');
const writer = new Writer(font);
writer.write('dist');
