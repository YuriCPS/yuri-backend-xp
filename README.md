# Desafio Backend de Yuri Carvalho

Desafio técnico para o processo seletivo da XP Inc. realizado por [Yuri Carvalho](https://github.com/yuricps) utilizando:

<div style="display: inline_block">
  <img align="center" alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
  <img align="center" alt="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
  <img align="center" alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
  <img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img align="center" alt="JWT" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens">
  <img align="center" alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white">
 <img align="center" alt="Swagger" src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
</div>
<br />

#### Link da API: [https://yuri-backend-api.herokuapp.com](https://yuri-backend-api.herokuapp.com/)

#### [Documentação com Swagger](https://yuri-backend-api.herokuapp.com/api-docs/)

<br />
<br />

## Minhas escolhas para o desafio

<img align="center" alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> Para o desafio, eu escolhi o Docker, pois facilita a instalação e o desenvolvimento do projeto em qualquer ambiente, reduzindo os problemas de incompatibilidade. Usando docker compose para gerenciar os containers da API e do banco de dados, eu consigo garantir que o projeto funcione em qualquer ambiente.

<img align="center" alt="Node" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"> Eu escolhi o NodeJS, pois é o ambiente mais utilizado no desenvolvimento de aplicações web e foi o que aprendemos aqui na Trybe, desta forma eu ja tinha mais familiaridade e poderia desenvolver melhor aproveitando o conhecimento que já tenho.

<img align="center" alt="Express" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"> Escolhi utilizar o Express pois é o framework que também aprendi na Trybe, eu já tenho mais conhecimento sobre ele, assim como também é um framework mais "cru", com o mínimo necessário para o desenvolvimento de uma API sem arquivos e organização predefinidas o que daria mais liberdade para o desenvolvimento, enquanto o AdonisJS por exemplo é um framework que já vem com muita coisa pronta para o desenvolvimento de uma API como token de acesso, autenticação, etc.

<img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> O projeto foi feito em JavaScript porque eu me sinto mais confortável programando com essa linguagem, poderia ser com TypeScript porém começamos a ver TypeScript no inicio deste mês e inicialmente acreditei que adicionaria coisas ao projeto que não seriam necessárias e poderiam dificultar o desenvolvimento em certos casos por eu ainda não ter conhecimento aprofundado e em compatibilidade com pacotes do npm.

<img align="center" alt="JWT" src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"> Eu escolhi o JSON Web Tokens no desenvolvimento da API pra garantir que o usuário não possa acessar algumas rotas da API sem autenticação, aproveitando também que utilizamos o JWT aqui nos projetos da Trybe então eu já tenho um certo conhecimento sobre ele.

<img align="center" alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"> Para o banco de dados utilizei o MySQL por ser o que também utilizamos aqui, sendo o que eu ja tinha praticado, embora não seja tão diferente das outras alternativas existentes.

<img align="center" alt="Swagger" src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white"> A documentação da API foi feita utilizando o Swagger, algo que foi novo pra mim pois ainda não tinha visto como que funcionava a documentação de APIs, e foi uma ótima oportunidade para aprender como funciona.

<img align="center" alt="Heroku" src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white"> O deploy foi feito no Heroku pela facilidade de realizar um deploy em Node.js, e também tivemos a oportunidade de praticar deploy em ambientes como o Heroku aqui na Trybe.

---
<br />

## Experiências durante o desenvolvimento

  Ao receber o desafio inicialmente passei algumas horas lendo o documento enviado e pensando em algumas soluções que poderia ser utilizadas, assim como a modelagem do banco de dados, após a modelagem inicial a solução que eu escolhi foi utilizar um ORM como o Sequelize que aprendemos aqui na Trybe, porém eu não tinha utilizado o Sequelize com o TypeScript e após algum tempo vendo como seria eu decidi que faria mais sentido fazer o desenvolvimento da forma que eu me sentisse mais confortável, então eu fiz sem ORM e com JavaScript.

  Como falei anteriormente o TypeScript pareceu que não iria ter o melhor custo X benefício, mas em certo momento ele teria sim facilitado algumas coisas e evitado conversões de algumas variáveis para garantir que não ocorressem erros, como por exemplo, a conversão de um número para string, ou a conversão de um string para um número que precisei fazer em certos pontos do código. Então após finalizar o desenvolvimento acredito que daria pra ter utilizado o TypeScript sem grandes problemas.

  O uso do Docker foi muito importante para realizar alguns testes durante o desenvolvimento como simular uma falha de comunicação ou a queda do banco de dados, também facilitou por remover a necessidade de instalar ferramentas e banco de dados na minha maquina e não fazer o deploy do banco de dados antes de garantir que estava OK, e claro, evitar problemas de compatibilidade com o ambiente dos avaliadores do desafio.

  Não usar um ORM acabou facilitando o desenvolvimento evitando que os ajustes que foram necessários fazer a partir da modelagem inicial do banco de dados que foram ocorrendo durante o desenvolvimento foram mais simples e rápidos de fazer do que se eu tivesse usado um ORM.

  Foi muito legal aprender a documentar uma API com o Swagger, embora eu tenha deixado pra aprender no ultimo dia do prazo, acabou dando certo e como falei anteriormente foi uma ótima oportunidade para aprender como funciona o Swagger.

  Fiz algumas alterações na rota para consultar os ativos do cliente, achei que fazia mais sentido vir da conta do cliente, representando sua carteira de ativos, assim como também fiz uma rota para consultar o extrato da conta do cliente, que retorna tanto os saques e depósitos como as entradas e saídas de valores referentes a compras e vendas de ativos.

---
</br>

## O que poderia ser melhorado

Com mais tempo disponível faria a refatoração de algumas coisas como a camada de services das rotas de `/investimentos`, acredito que daria pra transformar em TypeScript também.

Outra coisa seria fazer rotas partindo de `/admin` para a criação, edição e exclusão de ativos, clientes e manutenção de maneira geral. Ficaria um CRUD mais completo desta forma.

No extrato também poderia vir no objeto da movimentação de compras e vendas de ativos o id daquela compra ou venda.

___
<br />

## Instruções para executar o projeto

#### ⚠️ Docker e Docker Compose
  Para executar o projeto é necessário que você tenha o Docker e o Docker Compose instalados no seu computador, caso não tenha, você pode instalar os dois a partir do site oficial do Docker: [https://www.docker.com/](https://www.docker.com/)

<br />

#### 1 - Clone o repositório
  Faça o clone do repositório no seu computador, no diretório onde você deseja executar o projeto.


  ```sh
  git clone https://github.com/YuriCPS/yuri-backend-xp.git
  ```
  ```sh
  git clone git@github.com:YuriCPS/yuri-backend-xp.git
  ```

#### 2 - Configure as variáveis de ambiente
  Para configurar as variáveis de ambiente é necessário que você tenha um arquivo chamado .env na raiz do projeto *(existe um env.example de modelo no repositório)*, este arquivo deve conter as seguintes variáveis de ambiente:

  ```txt
  #### VARIAVEIS DO SERVER
  API_PORT=3000

  #### VARIAVEIS DO BANCO DE DADOS
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_DB_NAME=YuriBackend
  MYSQL_USER=root
  MYSQL_PASSWORD=password

  #### CHAVE do JSON Web Token
  JWT_SECRET=chave_secreta
  ```

  ⚠️ *Obs: Atenção para as portas, caso seja necessário alterar por algum motivo, você precisa alterar o no arquivo do Docker Compose também.*

#### 3 - Acesse a pasta do projeto e execute o comando:
  ```sh
  docker-compose up -d
  ```

  O comando acima irá iniciar os containers do projeto, ou seja, o servidor e o banco de dados.


#### 4 - Com os containers iniciados e rodando:
  1 - Execute o comando:
  ```sh
  docker exec -it yuri_backend_api bash
  ```
  2 - O comando acima vai abrir o terminal no container do servidor, e você pode executar o comando:
  ```sh
  npm install
  ```
  3 - O comando acima irá instalar todas as dependências do projeto, e após isso, você pode executar o comando:
  ```sh
  npm run seed && npm run dev
  ```
  Este último faz o seed do banco de e irá iniciar o servidor da API, após isso você pode acessar a API através do endereço: http://localhost:3000/, para verificar se a API está funcionando corretamente acesse o endereço: http://localhost:3000/ativos/, se tudo estiver funcionando corretamente, você deve receber um JSON com todos os ativos cadastrados no banco de dados.

  ⚠️ **Caso queira redefinir o banco de dados a qualquer momento, execute o comando:**
  ```sh
  npm run seed
  ```
---
<br />

## Rotas da API

<details>
  <summary><strong>GET em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Ativos/get_ativos_>/ativos</><a><strong></summary>

  - 🔓 Não é necessário autenticação para acessar esta rota.

  - Retona um JSON com todos os ativos cadastrados no banco de dados.

  ```json
  [
	{
		"codAtivo": 1,
		"ticker": "PETR3",
		"nomeAtivo": "PETROBRAS ON N2",
		"qtdeAtivo": 491,
		"valor": "30.27"
	}
	{
		"codAtivo": 2,
		"ticker": "VALE3",
		"nomeAtivo": "VALE ON NM",
		"qtdeAtivo": 500,
		"valor": "67.81"
	},...
  ]
  ```
</details>

<details>
  <summary><strong>GET em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Ativos/get_ativos__codAtivo_>/ativos/{codAtivo}</><a><strong></summary>

  - 🔓 Não é necessário autenticação para acessar esta rota.

  - Retona um JSON com as informações do ativo com o código inserido.

  ```json
  [
	{
		"codAtivo": 1,
		"ticker": "PETR3",
		"nomeAtivo": "PETROBRAS ON N2",
		"qtdeAtivo": 491,
		"valor": "30.27"
	}
  ]
  ```
</details>

<details>
  <summary><strong>GET em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Ativos/get_ativos_ticker__ticker_>/ativos/ticker/{ticker}</><a><strong></summary>

  - 🔓 Não é necessário autenticação para acessar esta rota.

  - Retona um JSON com as informações do ativo com o ticker inserido.

  ```json
  [
	{
		"codAtivo": 3,
		"ticker": "ABEV3",
		"nomeAtivo": "AMBEV S/A ON",
		"qtdeAtivo": 500,
		"valor": "14.69"
	}
  ]
  ```
</details>
<br />

<details>
  <summary><strong>POST em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Login/post_login_>/login</><a><strong></summary>

  - 🔓 Não é necessário autenticação para acessar esta rota.

  - Espera um JSON com o email e senha do usuário, e retorna um JSON com o token de autenticação.

  ```json
  {
	"email": "yuri@yahoo.com",
	"senha": "senha123"
  }
  ```

  ```json
  {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJub21lQ2xpZW50ZSI6Ill1cmkiLCJlbWFpbENsaWVudGUiOiJ5dXJpQHlhaG9vLmNvbSIsImlhdCI6MTY1ODY5NjgyNywiZXhwIjoxNjU4NzMyODI3fQ.Ec2bcsT50o31NdNKFKoxYgLDm_qxMehE6GE1Jvp8Roo"
  }
  ```
</details>
<br />

<details>
  <summary><strong>GET em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Conta/get_conta__codCliente_>/conta/{codCliente}</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Retorna um JSON com o saldo da conta do cliente e suas informações.

  ```json
  {
	"codCliente": 1,
	"nomeCliente": "Yuri",
	"emailCliente": "yuri@yahoo.com",
	"saldo": "11727.57"
  }
  ```
</details>

<details>
  <summary><strong>GET em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Conta/get_conta_extrato__codCliente_>/conta/extrato/{codCliente}</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Retorna um JSON com o extrato da conta do cliente.

  ```json
  [
	{
		"codMovimentacao": 1,
		"codCliente": 1,
		"tipo": "deposito",
		"valor": "2170.50",
		"horario": "2022-07-24T17:59:32.000Z"
	},
	{
		"codMovimentacao": 6,
		"codCliente": 1,
		"tipo": "deposito",
		"valor": "10000.00",
		"horario": "2022-07-24T18:00:58.000Z"
	},
	{
		"codMovimentacao": 7,
		"codCliente": 1,
		"tipo": "saque",
		"valor": "170.50",
		"horario": "2022-07-24T18:01:06.000Z"
	},...
  ]
  ```
</details>

<details>
  <summary><strong>GET em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Conta/get_conta_carteira__codCliente_>/conta/carteira/{codCliente}</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Retorna um JSON com a carteira de ativos do cliente.

  ```json
  [
	{
		"codCliente": 1,
		"codAtivo": 1,
		"ticker": "PETR3",
		"qtdeAtivo": 14,
		"valor": "30.27"
	},
	{
		"codCliente": 1,
		"codAtivo": 2,
		"ticker": "VALE3",
		"qtdeAtivo": 10,
		"valor": "67.81"
	},
	{
		"codCliente": 1,
		"codAtivo": 3,
		"ticker": "ABEV3",
		"qtdeAtivo": 10,
		"valor": "14.69"
	}
  ]
  ```
</details>

<details>
  <summary><strong>POST em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Conta/post_conta_deposito>/conta/deposito</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Espera um JSON com o valor do depósito e o código do cliente, e retorna um JSON com o saldo atualizado.

  ```json
  {
	"codCliente": 1,
	"valor": 10000
  }
  ```

  ```json
  {
	"codCliente": 1,
	"message": "Depósito de R$ 10000 realizado com sucesso!",
	"saldoAnterior": "2170.50",
	"saldo": "12170.50"
  }
  ```
</details>

<details>
  <summary><strong>POST em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Conta/post_conta_saque>/conta/saque</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Espera um JSON com o valor do saque e o código do cliente, e retorna um JSON com o saldo atualizado.

  ```json
  {
	"codCliente": 1,
	"valor": 170.50
  }
  ```

  ```json
  {
	"codCliente": 1,
	"message": "Saque de R$ 170.50 realizado com sucesso!",
	"saldoAnterior": "12170.50",
	"saldo": "12000.00"
  }
  ```
</details>
<br />

<details>
  <summary><strong>POST em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Investimentos/post_investimentos_comprar>/investimentos/comprar</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Espera um JSON com o código do ativo, a quantidade deste e o código do cliente, e retorna um JSON com o saldo atualizado.

  ```json
  {
	"codCliente": 1,
	"codAtivo": 1,
	"qtdeAtivo": 10
  }
  ```

  ```json
  {
	"message": "Compra de 10x PETR3 por R$ 302.70 realizada com sucesso",
	"saldoAnterior": "12000.00",
	"saldo": "11697.30"
  }
  ```
</details>

<details>
  <summary><strong>POST em <a href=https://yuri-backend-api.herokuapp.com/api-docs/#/Investimentos/post_investimentos_vender>/investimentos/vender</><a><strong></summary>

  - 🔒 É necessário autenticação para acessar esta rota.

  - Espera um JSON com o código do ativo, a quantidade deste e o código do cliente, e retorna um JSON com o saldo atualizado.

  ```json
  {
	"codCliente": 1,
	"codAtivo": 1,
	"qtdeAtivo": 1
  }
  ```

  ```json
  {
	"message": "Venda de 1x PETR3 por R$ 30.27 realizada com sucesso",
	"saldoAnterior": "11697.30",
	"saldo": "11727.57"
  }
  ```
</details>