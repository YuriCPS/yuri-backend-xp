const { expect } = require('chai');
const sinon = require('sinon');

const assetsServices = require('../../src/services/ativos');
const assetsController = require('../../src/controllers/ativos');

const allAssets = [
  {
    codAtivo: 1,
    ticker: 'PETR3',
    nomeAtivo: 'PETROBRAS ON N2',
    qtdeAtivo: 500,
    valor: '30.27'
  },
  {
    codAtivo: 2,
    ticker: 'VALE3',
    nomeAtivo: 'VALE ON NM',
    qtdeAtivo: 500,
    valor: '67.81'
  },
  {
    codAtivo: 3,
    ticker: 'ABEV3',
    nomeAtivo: 'AMBEV S/A ON',
    qtdeAtivo: 500,
    valor: '14.69'
  },
];

const req = {};
const res = {};

describe('Testa o GET em "/ativos"', () => {
  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(assetsServices, 'getAll').returns([allAssets]);
  });

  after(() => {
    assetsServices.getAll.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e listar os ativos', async () => {
    await assetsController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(allAssets)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(allAssets);
  });
});

describe('Testa o GET em "/ativos/:codAtivo"', () => {
  describe('Caso o ativo exista', () => {
    before(() => {
      req.params = { codAtivo: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(assetsServices, 'getByCode').returns([allAssets[0]]);
    });

    after(() => {
      assetsServices.getByCode.restore();
      sinon.restore();
    });

    it('Deve retornar status 200 e retornar o ativo', async () => {
      await assetsController.getByCode(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.calledWith(allAssets[0])).to.be.true;
      expect(res.json.args[0][0]).to.deep.equal(allAssets[0]);
    });
  });

  describe('Caso o ativo não exista', () => {
    before(() => {
      req.params = { codAtivo: 4 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(assetsServices, 'getByCode').returns([[]]);
    });

    after(() => {
      assetsServices.getByCode.restore();
      sinon.restore();
    });

    it('Deve retornar status 404 e retornar mensagem de ativo não encontrado', async () => {
      await assetsController.getByCode(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.status.args[0][0]).to.equal(404);
      expect(res.json.calledWith({ message: 'Ativo não encontrado' })).to.be.true;
      expect(res.json.args[0][0]).to.deep.equal({ message: 'Ativo não encontrado' });
    });
  });
});

describe('Testa o GET em "/ativos/:ticker"', () => {
  describe('Caso o ativo exista', () => {
    before(() => {
      req.params = { ticker: 'PETR3' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(assetsServices, 'getByTicker').returns([allAssets[0]]);
    });

    after(() => {
      assetsServices.getByTicker.restore();
      sinon.restore();
    });

    it('Deve retornar status 200 e retornar o ativo', async () => {
      await assetsController.getByTicker(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.status.args[0][0]).to.equal(200);
      expect(res.json.calledWith(allAssets[0])).to.be.true;
      expect(res.json.args[0][0]).to.deep.equal(allAssets[0]);
    });
  });

  describe('Caso o ativo não exista', () => {
    before(() => {
      req.params = { ticker: 'AAAA20' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(assetsServices, 'getByTicker').returns([[]]);
    });

    after(() => {
      assetsServices.getByTicker.restore();
      sinon.restore();
    });

    it('Deve retornar status 404 e retornar mensagem de ativo não encontrado', async () => {
      await assetsController.getByTicker(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.status.args[0][0]).to.equal(404);
      expect(res.json.calledWith({ message: 'Ativo não encontrado' })).to.be.true;
      expect(res.json.args[0][0]).to.deep.equal({ message: 'Ativo não encontrado' });
    });
  });
});