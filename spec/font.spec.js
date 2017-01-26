const {_loadIcons, loadGroups, loadFont, loadFontFromPackage, load} = require('../src/font');
const {join} = require('path');

const FONT = require('./support/font.mock');

describe('# fontface.js', () => {

  it('## [loadFontFromPackage] deve retornar dados do package', (done) => {
    const {name, dir, version, alias} = FONT;
    loadFontFromPackage(join(dir, '..'))
      .then(font => {
        expect(font).toEqual({ name, dir, version, alias });
        done()
      })
      .catch(e => console.error(e));
  });

  it('## [loadFont] deve retornar o alias e o dir corretamente', (done) => {
    const { name, dir, alias } = FONT;
    loadFont(join(dir, '..'))
      .then(font => {
        expect(font).toEqual(jasmine.objectContaining({name, dir, alias}));
        done();
      });
  });

  it('## [loadGroups] deve retornar um grupo para cada pasta existente', (done) => {
    const { name, dir, alias, groups } = FONT;
    loadGroups({ name, dir, alias })
      .then(({groups}) => {
        expect(groups)
          .toEqual(FONT.groups.map(({ name, dir }) => { return { name, dir }; }))
        done();
      })
      .catch(err => console.error(err));
  });

  it('## [_loadIcons] deve retornar um icone para cada svg existente', (done) => {
    const {name, dir, icons} = FONT.groups[0];
    _loadIcons({ name, dir })
      .then(group => {
        expect(group).toEqual({ name, dir, icons });
        done();
      })
      .catch(err => console.error(err));
  });


  it('## [load] deve retornar o objeto completo', (done) => {
    const { dir } = FONT;
    load(join(dir, '..'))
      .then(font => {
        expect(font).toEqual(FONT);
        done();
      })
      .catch(err => console.error(err));
  })
});

/*
describe('FontFace', () => {
  it('#constructor', () => {
    const font = new FontFace({
      name: 'my-font',
      glyphs: {
        home: {},
      },
    });

    expect(font.version).toEqual('1.0');
  });

  describe('#static parseGlyphs', () => {
    it('##espera-se que converta objeto em array', () => {
      const glyph = {
        name: 'glyph',
      };
      const [result] = FontFace.parseGlyphs({
        glyph,
      }, '.');

      expect(result).toEqual(jasmine.objectContaining(glyph));
    });

    it('##espera-se que [[path]] seja aplicado corretamente', () => {
      const path = 'images';
      const glyph = {
        name: 'glyph',
        file: 'glyph.svg',
      };
      const [result] = FontFace.parseGlyphs({
        glyph,
      }, path);

      expect(result.file).toEqual('${path}/${glyph.file}');
    });

    it('##espera-se que, case não informado, [[name]] receba o valor da [[key]]', () => {
      const name = 'glyph';
      const [result] = FontFace.parseGlyphs({
        [name]: {},
      }, '.');

      expect(result.name).toEqual(name);
    });

    it('##espera-se que, caso não informado, [[file]] receba o valor de [[name]]', () => {
      const name = 'glyph';
      const [result] = FontFace.parseGlyphs({
        glyph: {
          name,
        },
      }, '.');

      expect(result.file).toEqual('${name}.svg');
    });

    it('##espera-se que [[file]] insira o ".svg" automaticamente', () => {
      const [result] = FontFace.parseGlyphs({
        glyph: {},
      }, '');

      expect(result.file).toMatch(/\.svg$/g);
    });

    it('##espera-se que mais de um glyph seja processado', () => {
      const glyph1 = 'glyph1';
      const glyph2 = 'glyph2';

      const [result1, result2] = FontFace.parseGlyphs({
        [glyph1]: {},
        [glyph2]: {},
      }, '.');

      expect(result1).toEqual(jasmine.objectContaining({
        name: glyph1,
        file: '${glyph1}.svg',
      }));

      expect(result2).toEqual(jasmine.objectContaining({
        name: glyph2,
        file: '${glyph2}.svg',
      }));
    });
  });
});
*/