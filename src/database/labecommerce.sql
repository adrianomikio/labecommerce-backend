CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

INSERT INTO
    users (id, email, password)
VALUES (
        "01",
        "adriano@email.com",
        "senhaDoAdriano"
    ), (
        "02",
        "larissa@email.com",
        "senhaDaLarissa"
    ), (
        "03",
        "junior@email.com",
        "senhaDoJunior"
    );

CREATE TABLE
    products(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "01",
        "Chá Verde 100g",
        6,
        "Chá, Café e Achocolatados"
    ), (
        "02",
        "Café Solúvel 50g",
        8.9,
        "Chá, Café e Achocolatados"
    ), (
        "03",
        "Toddy em pó 400g",
        8,
        "Chá, Café e Achocolatados"
    ), (
        "04",
        "Alecrim desidratado 100g",
        4,
        "Ervas e Especiarias"
    ), (
        "05",
        "Pimenta do Reino 100g em grão",
        5,
        "Ervas e Especiarias"
    );

SELECT * FROM users;

-- Refatoração do ex. 3 -> ORDER BY email ASC;

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT * FROM products WHERE name LIKE "Chá%";

INSERT INTO
    users(id, email, password)
VALUES (
        "04",
        "rosana@email.com",
        "senhaDaRosana"
    );

SELECT * FROM products WHERE id = "01";

DELETE FROM users WHERE id = "03";

DELETE FROM products WHERE id = "02";

UPDATE users SET email = "adriano@email.com.br" WHERE id = "01";

UPDATE products SET price = 6.5 WHERE id = "01";

SELECT *
FROM products
WHERE price > 3 AND price <= 5
ORDER BY price ASC;