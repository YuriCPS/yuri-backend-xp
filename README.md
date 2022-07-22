# Desafio Backend de Yuri Carvalho

Desafio técnico para o processo seletivo da XP Inc. realizado por Yuri Carvalho

<br />

## Minhas escolhas para o desafio

##### Docker
  Para o desafio, eu escolhi o Docker, pois facilita a instalação e o desenvolvimento do projeto em qualquer ambiente, reduzindo os problemas de incompatibilidade. Usando docker compose para gerenciar os containers da API e do banco de dados, eu consigo garantir que o projeto funcione em qualquer ambiente.

##### NodeJS
  Eu escolhi o NodeJS, pois é o ambiente mais utilizado no desenvolvimento de aplicações web e foi o que aprendemos aqui na Trybe, desta forma eu ja tinha mais familiaridade e poderia desenvolver melhor aproveitando o conhecimento que já tenho.

##### Express
  Escolhi utilizar o Express pois é o framework que também aprendi na Trybe, eu já tenho mais conhecimento sobre ele, assim como também é um framework mais "cru", com o mínimo necessário para o desenvolvimento de uma API sem arquivos e organização predefinidas o que daria mais liberdade para o desenvolvimento, enquanto o AdonisJS por exemplo é um framework que já vem com muita coisa pronta para o desenvolvimento de uma API como token de acesso, autenticação, etc.

##### JavaScript
  O projeto foi feito em JavaScript porque eu me sinto mais confortável programando com essa linguagem, poderia ser com TypeScript porém começamos a ver TypeScript no inicio deste mês e inicialmente acreditei que adicionaria coisas ao projeto que não seriam necessárias e poderiam dificultar o desenvolvimento em certos casos por eu ainda não ter conhecimento aprofundado e em compatibilidade com pacotes do npm.

##### JSON Web Tokens
  Eu escolhi o JSON Web Tokens no desenvolvimento da API pra garantir que o usuário não possa acessar algumas rotas da API sem autenticação, aproveitando também que utilizamos o JWT aqui nos projetos da Trybe então eu já tenho um certo conhecimento sobre ele.

##### MySQL
  Para o banco de dados utilizei o MySQL por ser o que também utilizamos aqui, sendo o que eu ja tinha praticado, embora não seja tão diferente das outras alternativas existentes.

---
<br />

## Experiências durante o desenvolvimento
  Ao receber o desafio inicialmente passei algumas horas lendo o documento enviado e pensando em algumas soluções que poderia ser utilizadas, assim como a modelagem do banco de dados, após a modelagem inicial a solução que eu escolhi foi utilizar um ORM como o Sequelize que aprendemos aqui na Trybe, porém eu não tinha utilizado o Sequelize com o TypeScript e após algum tempo vendo como seria eu decidi que faria mais sentido fazer o desenvolvimento da forma que eu me sentisse mais confortável, então eu fiz sem ORM e com JavaScript.

  Como falei anteriormente o TypeScript pareceu que não iria ter o melhor custo X benefício, mas em certo momento ele teria sim facilitado algumas coisas e evitado conversões de algumas variáveis para garantir que não ocorressem erros, como por exemplo, a conversão de um número para string, ou a conversão de um string para um número que precisei fazer em certos pontos do código. Então após finalizar o desenvolvimento acredito que daria pra ter utilizado o TypeScript sem grandes problemas.

  O uso do Docker foi muito importante para realizar alguns testes durante o desenvolvimento como simular uma falha de comunicação ou a queda do banco de dados, também facilitou por remover a necessidade de instalar ferramentas e banco de dados na minha maquina e não fazer o deploy do banco de dados antes de garantir que estava OK, e claro, evitar problemas de compatibilidade com o ambiente dos avaliadores do desafio.

  Não usar um ORM acabou facilitando o desenvolvimento evitando que os ajustes que foram necessários fazer a partir da modelagem inicial do banco de dados que foram ocorrendo durante o desenvolvimento foram mais simples e rápidos de fazer do que se eu tivesse usado um ORM.

---
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
  Para configurar as variáveis de ambiente é necessário que você tenha um arquivo chamado .env na raiz do projeto, este arquivo deve conter as seguintes variáveis de ambiente:

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