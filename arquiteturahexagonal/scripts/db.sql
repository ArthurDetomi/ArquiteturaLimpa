CREATE TABLE
    usuarios (
        id CHAR(36) CHARACTER
        SET
            ascii PRIMARY KEY,
            nome VARCHAR(255) not null,
            email VARCHAR(255) not null,
            senha VARCHAR(255) not null
    );