const { expect } = require('chai');
const sinon = require('sinon');

const accountServices = require('../../src/services/conta');
const accountModels = require('../../src/models/conta');

const balance = [ { codConta: 1, saldo: '2170.50' } ];
const client = [
  {
    codCliente: 1,
    nomeCliente: 'Yuri',
    emailCliente: 'yuri@yahoo.com',
    senha: 'senha123'
  }
];
const movimentation = [
	{
		"codMovimentacao": 1,
		"codCliente": 1,
		"tipo": "deposito",
		"valor": "2170.50",
		"horario": "2022-07-24T02:31:28.000Z"
	}
];

describe('Testa a função getBalance() do service de conta', () => {
  before(() => {
    sinon.stub(accountModels, 'getBalance').returns([balance]);
    sinon.stub(accountModels, 'getClient').returns([client]);
  });

  after(() => {
    accountModels.getBalance.restore();
    accountModels.getClient.restore();
  });

  it('Deve retornar o objeto de resposta', async () => {
    const result = await accountServices.getBalance(1);

    expect(result).to.be.an('object');
    expect(result).to.have.all.keys('codCliente', 'nomeCliente', 'emailCliente', 'saldo');
  });
});

describe('Testa a função getMovimentation() do service de conta', () => {
  before(() => {
    sinon.stub(accountModels, 'getMovimentation').returns([movimentation]);
  });

  after(() => {
    accountModels.getMovimentation.restore();
  });

  it('Deve retornar o array com as movimentações', async () => {
    const result = await accountServices.getMovimentation(1);

    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(1);
    expect(result[0]).to.have.all.keys('codMovimentacao', 'codCliente', 'tipo', 'valor', 'horario');
  });
});

describe('Testa a função deposit() do service de conta', () => {
  before(() => {
    sinon.stub(accountModels, 'updateMovimentation').returns([]);
    sinon.stub(accountModels, 'updateBalance').returns([]);
  });

  after(() => {
    accountModels.updateMovimentation.restore();
    accountModels.updateBalance.restore();
  });

  it('Deve retornar o objeto de resposta', async () => {
    const result = await accountServices.deposit(1, 2170.50);

    expect(result).to.be.an('object');
    expect(result).to.have.all.keys('codCliente', 'message', 'saldoAnterior','saldo');
  });
});

describe('Testa a função withdraw() do service de conta', () => {
  before(() => {
    sinon.stub(accountModels, 'updateMovimentation').returns([]);
    sinon.stub(accountModels, 'updateBalance').returns([]);
  });

  after(() => {
    accountModels.updateMovimentation.restore();
    accountModels.updateBalance.restore();
  });

  it('Deve retornar o objeto de resposta', async () => {
    const result = await accountServices.withdraw(1, 10.00);

    expect(result).to.be.an('object');
    expect(result).to.have.all.keys('codCliente', 'message', 'saldoAnterior','saldo');
  });
});

