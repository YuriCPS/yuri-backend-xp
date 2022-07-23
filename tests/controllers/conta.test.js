const { expect } = require('chai');
const sinon = require('sinon');

const accountServices = require('../../src/services/conta');
const accountController = require('../../src/controllers/conta');

const clientBalance = {
	codCliente: 1,
	nomeCliente: "Yuri",
	emailCliente: "yuri@yahoo.com",
	saldo: "2321.85"
};

const accountMovimentation = [
	{
		codMovimentacao: 1,
		codCliente: 1,
		tipo: "deposito",
		valor: "2170.50",
		horario: "2022-07-23T04:07:09.000Z"
	},
	{
		codMovimentacao: 6,
		codCliente: 1,
		tipo: "saque",
		valor: "170.50",
		horario: "2022-07-23T04:07:47.000Z"
	}
];

const withdraw = {
	codCliente: 1,
	message: "Saque de R$ 170.50 realizado com sucesso!",
	saldoAnterior: "2170.50",
	saldo: "2000.00"
}

const deposit = {
  codCliente: 1,
  message: "Depósito de R$ 2170.50 realizado com sucesso!",
  saldoAnterior: "2000.00",
  saldo: "4170.50"
}

const wallet = [
	{
		codCliente: 1,
		codAtivo: 1,
		ticker: "PETR3",
		qtdeAtivo: 5,
		valor: "30.27"
	},
	{
		codCliente: 1,
		codAtivo: 2,
		ticker: "VALE3",
		qtdeAtivo: 10,
		valor: "67.81"
	},
	{
		codCliente: 1,
		codAtivo: 3,
		ticker: "ABEV3",
		qtdeAtivo: 10,
		valor: "14.69"
	}
]

const req = {};
const res = {};

describe('Testa o GET em "/conta/:codCliente"', () => {
  before(() => {
    req.params = { codCliente: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountServices, 'getBalance').returns(clientBalance);
  });

  after(() => {
    accountServices.getBalance.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e listar os dados da conta', async () => {
    await accountController.getBalance(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(clientBalance)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(clientBalance);
  });
});

describe('Testa o GET em "/conta/extrato/:codCliente"', () => {
  before(() => {
    req.params = { codCliente: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountServices, 'getMovimentation').returns(accountMovimentation);
  });

  after(() => {
    accountServices.getMovimentation.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e listar o extrato da conta', async () => {
    await accountController.getMovimentation(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(accountMovimentation)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(accountMovimentation);
  });
});

describe('Testa o GET em "/conta/carteira/:codCliente"', () => {
  before(() => {
    req.params = { codCliente: 1 };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountServices, 'getWallet').returns([wallet]);
  });

  after(() => {
    accountServices.getWallet.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e listar a carteira com os ativos do cliente', async () => {
    await accountController.getWallet(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(wallet)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(wallet);
  });
});

describe('Testa o POST em "/conta/saque', () => {
  before(() => {
    req.body = {
      codCliente: 1,
      valor: "170.50"
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountServices, 'withdraw').returns(withdraw);
  });

  after(() => {
    accountServices.withdraw.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e realizar o saque', async () => {
    await accountController.withdraw(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(withdraw)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(withdraw);
  }, after);
});

describe('Testa o POST em "/conta/deposito', () => {
  before(() => {
    req.body = {
      codCliente: 1,
      valor: "2170.50"
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(accountServices, 'deposit').returns(deposit);
  });

  after(() => {
    accountServices.deposit.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e realizar o deposito', async () => {
    await accountController.deposit(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(deposit)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(deposit);
  }, after);
});