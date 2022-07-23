const { expect } = require('chai');
const sinon = require('sinon');

const assetsServices = require('../../src/services/ativos');
const ativosController = require('../../src/controllers/ativos');

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
    await ativosController.getAll(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(allAssets)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(allAssets);
  });
});
