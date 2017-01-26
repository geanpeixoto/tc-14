const { promisefy } = require('../../src/utils/function');

describe('# function', () => {
  describe('## promisefy', () => {

    it('espera-se que o método seja executado', (done) => {
      promisefy(() => done())();
    });

    it('espera-se que o escopo seja modificado', (done) => {
      const scope = this;
      promisefy(function () {
        expect(this).toEqual(scope);
        done();
      }.bind(scope))();
    });

    it('espera-se que o `callback` seja executado', (done) => {
      promisefy(callback => callback(null))()
        .then(() => done());
    });

    it('espera-se que o `callback` seja executado quando houver parâmetros', (done) => {
      const i = 1;
      promisefy((input, callback) => {
        expect(input).toEqual(i);
        callback(null);
      })(i)
        .then(() => done());
    });

    it('espera-se que o `catch` seja executado', (done) => {
      promisefy(callback => callback(new Error('error')))()
        .catch(err => {
          expect(err).toBeDefined();
          done();
        });
    });

    it('espera-se que os `arguments` do método sejam mantidos', (done) => {
      const args = [1, 2, 3];
      promisefy((...input) => {
        const argss = input.slice(0, input.length - 1);
        expect(argss).toEqual(args);
        done();
      }).apply(this, args)
        .catch(err => console.error(err));
    });

    it('espera-se que o `argument` do callback seja mantido', (done) => {
      const response = 'response';
      promisefy(callback => callback(null, response))()
        .then(r => {
          expect(r).toEqual(response);
          done();
        });
    });

    it('espera-se que os `arguments` do callback sejam mantidos', (done) => {
      const response = ['1', '2'];
      promisefy(callback => callback.apply(this, [null, ...response]))()
        .then(r => {
          expect(r).toEqual(response);
          done();
        })
        .catch(err => console.error(err));
    });
  });
});