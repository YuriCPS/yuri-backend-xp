DROP DATABASE IF EXISTS YuriBackend;

CREATE DATABASE YuriBackend;

USE YuriBackend;

CREATE TABLE clientes (
    codCliente INT NOT NULL AUTO_INCREMENT,
    nomeCliente VARCHAR(30) NOT NULL,
    emailCliente VARCHAR(50) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    PRIMARY KEY(codCliente)
) ENGINE=INNODB;

CREATE TABLE ativos (
    codAtivo VARCHAR(5) NOT NULL,
    nomeAtivo VARCHAR(30) NOT NULL,
    qtdeAtivo INT NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    PRIMARY KEY(codAtivo)
) ENGINE=INNODB;

CREATE TABLE contas (
    codConta INT NOT NULL,
    saldo DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (codConta)
    	REFERENCES clientes (codCliente)
) ENGINE=INNODB;

CREATE TABLE movimentacoes (
    codMovimentacao INT NOT NULL AUTO_INCREMENT,
    codCliente INT NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    horario DATETIME DEFAULT NOW(),
    PRIMARY KEY(codMovimentacao),
    FOREIGN KEY (codCliente)
    	REFERENCES clientes (codCliente)
) ENGINE=INNODB;

CREATE TABLE negociacoes (
    codNegociacao INT NOT NULL AUTO_INCREMENT,
    codCliente INT NOT NULL,
    codAtivo VARCHAR(5) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    qtdeAtivo INT NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    horario DATETIME DEFAULT NOW(),
    PRIMARY KEY(codNegociacao),
    FOREIGN KEY (codCliente)
    	REFERENCES clientes (codCliente),
    FOREIGN KEY (codAtivo)
    	REFERENCES ativos (codAtivo)
) ENGINE=INNODB;

CREATE TABLE carteiras (
    codCliente INT NOT NULL,
    codAtivo VARCHAR(5) NOT NULL,
    qtdeAtivo INT NOT NULL,
    FOREIGN KEY (codCliente)
    	REFERENCES clientes (codCliente),
    FOREIGN KEY (codAtivo)
    	REFERENCES ativos (codAtivo)
) ENGINE=INNODB;


SET SQL_SAFE_UPDATES = 0;

INSERT INTO YuriBackend.clientes (nomeCliente, emailCliente, senha) VALUES
    ("Yuri", "yuri@yahoo.com", "senha123"),
    ("Carlos", "carlos@hotmail.com", "senha123"),
    ("Fernando", "fernando@gmail.com", "senha123"),
    ("José", "jose@xpinc.com", "senha123");

INSERT INTO YuriBackend.ativos (codAtivo, nomeAtivo, qtdeAtivo, valor) VALUES
	("PETR3", "PETROBRAS ON N2", 500, 30.27 ),
    ("VALE3", "VALE ON NM", 500, 67.81 ),
    ("ABEV3", "AMBEV S/A ON", 500, 14.69 ),
    ("ITUB3", "ITAUUNIBANCO ON N1", 500, 19.62 ),
    ("BBDC3", "BRADESCO ON N1", 500, 13.79 ),
    ("WEGE3", "WEG ON NM", 500, 26.65 ),
    ("SANB3", "SANTANDER BRON", 500, 13.01 ),
    ("ELET3", "ELETROBRAS ON N1", 500, 44.08 ),
    ("BBAS3", "BRASIL ON NM", 500, 33.30),
    ("VIVT3", "TELEF BRASIL ON", 500, 47.18 ),
    ("ITSA3", "ITAUSA ON N1", 500, 8.76 ),
    ("BPAC3", "BTGP BANCO ON N2", 500, 12.22 );

INSERT INTO YuriBackend.contas (codConta, saldo) VALUES
    (1, 2170.50),
    (2, 5789.82),
    (3, 8709.74),
    (4, 8098.24);

INSERT INTO YuriBackend.movimentacoes (codCliente, tipo, valor) VALUES
    (1, "deposito", 2170.50),
    (2, "deposito", 5789.82),
    (3, "deposito", 8709.74),
    (4, "deposito", 9098.24),
    (4, "saque", 1000.00);

INSERT INTO YuriBackend.negociacoes (codCliente, codAtivo, tipo, qtdeAtivo, valor) VALUES
    (1, "PETR3", "compra", 10, 302.70),
    (1, "VALE3", "compra", 10, 678.10),
    (1, "ABEV3", "compra", 10, 146.90),
    (1, "PETR3", "venda", 5, 151.35 ),
    (2, "BBDC3", "compra", 10, 137.90),
    (2, "WEGE3", "compra", 10, 266.50);

INSERT INTO YuriBackend.carteiras (codCliente, codAtivo, qtdeAtivo) VALUES
    (1, "PETR3", 5),
    (1, "VALE3", 10),
    (1, "ABEV3", 10),
    (2, "BBDC3", 10),
    (2, "WEGE3", 10);
