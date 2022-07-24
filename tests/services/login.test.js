const { expect } = require('chai');
const sinon = require('sinon');

const loginServices = require('../../src/services/login');
const loginModels = require('../../src/models/login');

const infos = { email: 'yuri@yahoo.com', senha: 'senha123' };
const client = [
  {
    codCliente: 1,
    nomeCliente: 'Yuri',
    emailCliente: 'yuri@yahoo.com',
    senha: 'senha123'
  }
];


describe('Testa a função verifyClient() do service de login', () => {
  before(() => {
    sinon.stub(loginModels, 'verifyClient').returns([client]);
  });

  after(() => {
    loginModels.verifyClient.restore();
  });

  it('Deve retornar o token', async () => {
    const result = await loginServices.verifyClient(infos);
     expect(result).to.be.an('string');
  });
});