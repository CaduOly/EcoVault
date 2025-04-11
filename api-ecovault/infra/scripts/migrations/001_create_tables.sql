CREATE TABLE IF NOT EXISTS produtos_status (
    id VARCHAR(25) PRIMARY KEY,
    status ENUM(
        'bom',
        'descartado',
        'perto de vencer',
        'vencido'
    ) NOT NULL
);

CREATE TABLE IF NOT EXISTS descricao_descartes (
    id VARCHAR(25) PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(25) PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS produtos (
    id VARCHAR(25) PRIMARY KEY,
    nome VARCHAR(255),
    id_status VARCHAR(25),
    data_da_compra DATE,
    quantidade DECIMAL(10, 2),
    tipo_quantidade ENUM('g', 'kg', 'ml', 'l'),
    id_descricao_descarte VARCHAR(25),
    usuario VARCHAR(25),
    data_de_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_de_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    local_de_armazenagem VARCHAR(255),
    FOREIGN KEY (id_status) REFERENCES produtos_status(id),
    FOREIGN KEY (id_descricao_descarte) REFERENCES descricao_descartes(id),
    FOREIGN KEY (usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS produtos_log (
    id VARCHAR(25) PRIMARY KEY,
    produto_id VARCHAR(25),
    status VARCHAR(25),
    data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id),
    FOREIGN KEY (status) REFERENCES produtos_status(id)
);

CREATE TABLE IF NOT EXISTS descartes (
    id VARCHAR(25) PRIMARY KEY,
    data_de_descarte DATETIME DEFAULT CURRENT_TIMESTAMP,
    produto VARCHAR(25),
    usuario VARCHAR(25),
    FOREIGN KEY (produto) REFERENCES produtos(id),
    FOREIGN KEY (usuario) REFERENCES usuarios(id)
);