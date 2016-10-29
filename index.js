const FontFace = require('./src/fontface');
const Writer = require('./src/writer');

const font = FontFace.load('./example/my-icons.cson');
Writer.write('./my-icons.svg', font);
