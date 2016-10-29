const FontFace = require('../src/fontface');

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

      expect(result.file).toEqual(`${path}/${glyph.file}`);
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

      expect(result.file).toEqual(`${name}.svg`);
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
        file: `${glyph1}.svg`,
      }));

      expect(result2).toEqual(jasmine.objectContaining({
        name: glyph2,
        file: `${glyph2}.svg`,
      }));
    });
  });
});
