const { expect } = require('chai');
const sinon = require('sinon');

const loginServices = require('../../src/services/login');
const loginController = require('../../src/controllers/login');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJub21lQ2xpZW50ZSI6Ill1cmkiLCJlbWFpbENsaWVudGUiOiJ5dXJpQHlhaG9vLmNvbSIsImlhdCI6MTY1ODYwMzIxMCwiZXhwIjoxNjU4NjM5MjEwfQ.PHghZCeMK08jvs3Vw65E3oMAqRggYxl3_rzhHciIq30";

const successfulLogin = { token };
const unsuccessfulLogin = { message: 'Usuário ou senha inválidos' };

const req = {};
const res = {};

describe('Testa o POST em "/login"', () => {
  describe('Testa o login com sucesso', () => {
    before(() => {
      req.body = {
        email: 'yuri@yahoo.com',
        senha: 'senha123'
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(loginServices, 'verifyClient').returns(token);
    });

    after(() => {
      loginServices.verifyClient.restore();
      sinon.restore();
    });

    it('Deve retornar status 201 e o objeto de resposta', async () => {
      await loginController.login(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.status.args[0][0]).to.equal(201);
      expect(res.json.calledWith(successfulLogin)).to.be.true;
      expect(res.json.args[0][0]).to.deep.equal(successfulLogin);
    });
  });

  describe('Testa o login com falha', () => {
    before(() => {
      req.body = {
        email: 'inexistente@yahoo.com',
        senha: 'senhaErrada'
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(loginServices, 'verifyClient').returns(null);
    });

    after(() => {
      loginServices.verifyClient.restore();
      sinon.restore();
    })

    it('Deve retornar status 400 e o objeto de resposta', async () => {
      await loginController.login(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.status.args[0][0]).to.equal(400);
      expect(res.json.calledWith(unsuccessfulLogin)).to.be.true;
      expect(res.json.args[0][0]).to.deep.equal(unsuccessfulLogin);
    });
  });
});
