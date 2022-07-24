const { expect } = require('chai');
const sinon = require('sinon');

const investmentsServices = require('../../src/services/investimentos');
const investmentsModels = require('../../src/models/investimentos');

const asset = [
	{
		"codAtivo": 1,
		"ticker": "PETR3",
		"nomeAtivo": "PETROBRAS ON N2",
		"qtdeAtivo": 483,
		"valor": "30.27"
	}
];

describe('Testa a função buy() do service de investimentos', () => {
  before(() => {
    sinon.stub(investmentsModels, 'updateNegotiation').returns([]);
    sinon.stub(investmentsModels, 'updateWallet').returns([]);
  });

  after(() => {
    investmentsModels.updateNegotiation.restore();
    investmentsModels.updateWallet.restore();
  });

  it('Deve retornar o objeto de resposta', async () => {
    const result = await investmentsServices.buy(1, 1, asset , 10);
    expect(result).to.be.an('object');
    expect(result).to.have.all.keys('message', 'saldoAnterior', 'saldo');
  });
});

describe('Testa a função sell() do service de investimentos', () => {
  before(() => {
    sinon.stub(investmentsModels, 'updateNegotiation').returns([]);
    sinon.stub(investmentsModels, 'updateWallet').returns([]);
  });

  after(() => {
    investmentsModels.updateNegotiation.restore();
    investmentsModels.updateWallet.restore();
  });

  it('Deve retornar o objeto de resposta', async () => {
    const result = await investmentsServices.sell(1, 1, asset , 10);
    expect(result).to.be.an('object');
    expect(result).to.have.all.keys('message', 'saldoAnterior', 'saldo');
  });
});
