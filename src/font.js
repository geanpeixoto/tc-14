const { compose } = require('./utils/function');
const { folders, join, files, basename, readJSON, isAbsolute } = require('./utils/file-manager');

const SVG_REGEXP = /\.svg$/g;

async function $loadIcons(group) {
  const { dir } = group;
  const icons = (await files(dir))
    .filter(file => file.match(SVG_REGEXP))
    .map((file) => {
      const name = file.replace(SVG_REGEXP, '').toLowerCase();
      return {
        name,
        file: join(dir, file),
        unicode: [name],
      };
    });

  return Object.assign({}, group, { icons });
}

async function loadIcons(font) {
  const promises = font.groups.map(group => $loadIcons(group));
  const groups = await Promise.all(promises);
  return Object.assign({}, font, { groups });
}

async function loadGroups(font) {
  const { dir } = font;
  const groups = (await folders(dir))
    .map(group => ({
      name: group,
      dir: join(dir, group),
    }));
  return Object.assign({ groups }, font);
}

function parseFont(font) {
  const { name, version = '1.0.0', alias = name, dir } = font;
  return { name, version, alias, dir };
}

async function loadFontFromPackage(dir) {
  const { name, version, rootDir } = await readJSON(join(dir, 'package.json'));
  return parseFont({
    name,
    version,
    dir: isAbsolute(rootDir) ? rootDir : join(dir, rootDir)
  });
}

function makeFont(dir) {
  const name = basename(dir);
  return parseFont({
    name,
    dir,
    alias: name,
  });
}

async function loadFont(dir) {
  try {
    return await loadFontFromPackage(dir);
  } catch (e) {
    return makeFont(dir);
  }
}

const load = compose(loadIcons, loadGroups, loadFont);

module.exports = {
  $loadIcons,
  loadIcons,
  loadGroups,
  loadFont,
  loadFontFromPackage,
  load,
};
