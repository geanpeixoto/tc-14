const { $loadIcons, loadGroups, loadFont, loadFontFromPackage, load } = require('../src/font');
const { join } = require('path');

const FONT = require('./support/font.mock');

describe('# fontface.js', () => {
  it('## [loadFontFromPackage] deve retornar dados do package', (done) => {
    const { name, dir, version, alias } = FONT;
    loadFontFromPackage(join(dir, '..'))
      .then((font) => {
        expect(font).toEqual({ name, dir, version, alias });
        done();
      })
      .catch(e => console.error(e));
  });

  it('## [loadFont] deve retornar o alias e o dir corretamente', (done) => {
    const { name, dir, alias } = FONT;
    loadFont(join(dir, '..'))
      .then((font) => {
        expect(font).toEqual(jasmine.objectContaining({ name, dir, alias }));
        done();
      });
  });

  it('## [loadGroups] deve retornar um grupo para cada pasta existente', (done) => {
    const { name, dir, alias } = FONT;
    loadGroups({ name, dir, alias })
      .then(({ groups }) => {
        expect(groups).toEqual(FONT.groups.map(group => ({ name: group.name, dir: group.dir })));
        done();
      })
      .catch(err => console.error(err));
  });

  it('## [$loadIcons] deve retornar um icone para cada svg existente', (done) => {
    const { name, dir, icons } = FONT.groups[0];
    $loadIcons({ name, dir })
      .then((group) => {
        expect(group).toEqual({ name, dir, icons });
        done();
      })
      .catch(err => console.error(err));
  });


  it('## [load] deve retornar o objeto completo', (done) => {
    const { dir } = FONT;
    load(join(dir, '..'))
      .then((font) => {
        expect(font).toEqual(FONT);
        done();
      })
      .catch(err => console.error(err));
  });
});
