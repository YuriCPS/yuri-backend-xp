const { expect } = require('chai');
const sinon = require('sinon');

const investmentsServices = require('../../src/services/investimentos');
const investmentsController = require('../../src/controllers/investimentos');

const purchase = {
	"message": "Compra de 10x PETR3 por R$ 302.70 realizada com sucesso",
	"saldoAnterior": "12170.50",
	"saldo": "11867.80"
};

const sell = {
	"message": "Venda de 10x PETR3 por R$ 302.7 realizada com sucesso",
	"saldoAnterior": "11867.80",
	"saldo": "12170.50"
};

const req = {};
const res = {};

describe('Testa o POST em "/investimentos/comprar"', () => {
  before(() => {
    req.body = {
      codCliente: 1,
      codAtivo: 1,
      qtdeAtivo: 10
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(investmentsServices, 'buy').returns(purchase);
  });

  after(() => {
    investmentsServices.buy.restore();
    sinon.restore();
  }	);

  it('Deve retornar status 200 e o objeto de resposta', async () => {
    await investmentsController.buy(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(purchase)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(purchase);
  });
});

describe('Testa o POST em "/investimentos/vender"', () => {
  before(() => {
    req.body = {
      codCliente: 1,
      codAtivo: 1,
      qtdeAtivo: 10
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(investmentsServices, 'sell').returns(sell);
  });

  after(() => {
    investmentsServices.sell.restore();
    sinon.restore();
  });

  it('Deve retornar status 200 e o objeto de resposta', async () => {
    await investmentsController.sell(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.status.args[0][0]).to.equal(200);
    expect(res.json.calledWith(sell)).to.be.true;
    expect(res.json.args[0][0]).to.deep.equal(sell);
  });
});