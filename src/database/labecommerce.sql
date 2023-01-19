CREATE TABLE
    users(
        -- USUÁRIOS
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );

CREATE TABLE
    products(
        -- PRODUTOS
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT NOT NULL
    );

CREATE TABLE
    purchases(
        -- COMPRAS
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        delivered_at TEXT,
        buyer_id TEXT NOT NULL,
        Foreign Key (buyer_id) REFERENCES users(id)
    );

CREATE TABLE
    purchases_products(
        -- COMPRAS-PRODUTOS
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (quantity) REFERENCES purchases(quantity)
    );

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products WHERE id = "01";

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT * FROM products WHERE name LIKE "Chá%";

SELECT *
FROM products
WHERE price > 3 AND price <= 5
ORDER BY price ASC;

SELECT *
FROM purchases
    INNER JOIN users ON buyer_id = users.id
WHERE users.id = "03";

SELECT *
FROM purchases_products INNER
    JOIN products ON purchases_products.product_id = products.id
    INNER JOIN purchases on purchases_products.purchase_id = purchases.id

INSERT INTO
    users (id, email, password)
VALUES (
        "u001",
        "adriano@email.com",
        "senhaDoAdriano"
    ), (
        "u002",
        "larissa@email.com",
        "senhaDaLarissa"
    ), (
        "u003",
        "junior@email.com",
        "senhaDoJunior"
    );

INSERT INTO
    products (id, name, price, category)
VALUES (
        "pro001",
        "Chá Verde 100g",
        6,
        "Chá, Café e Achocolatados"
    ), (
        "pro002",
        "Café Solúvel 50g",
        9,
        "Chá, Café e Achocolatados"
    ), (
        "pro003",
        "Toddy em pó 400g",
        8,
        "Chá, Café e Achocolatados"
    ), (
        "pro004",
        "Alecrim desidratado 100g",
        4,
        "Ervas e Especiarias"
    ), (
        "pro005",
        "Pimenta do Reino 100g em grão",
        5,
        "Ervas e Especiarias"
    );

INSERT INTO
    users(id, email, password)
VALUES (
        "04",
        "rosana@email.com",
        "senhaDaRosana"
    );

INSERT INTO
    purchases(
        id,
        total_price,
        paid,
        delivered_at,
        buyer_id
    )
VALUES ("pur001", 21, 1, NULL, "01"), ("pur002", 18, 2, NULL, "03"), ("pur003", 25, 1, NULL, "02"), ("pur004", 18, 0, NULL, "01"), ("pur005", 15, 0, NULL, "02"), ("pur006", 10, 0, NULL, "03");

INSERT INTO
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES ("pur001", "pro001", 1), ("pur002", "pro003", 1), ("pur004", "pro002", 2);

UPDATE users SET email = "adriano@email.com.br" WHERE id = "01";

UPDATE products SET price = 6.5 WHERE id = "01";

UPDATE purchases
SET
    delivered_at = DATETIME('now')
WHERE id = "p003";

DELETE FROM users WHERE id = "03";

DELETE FROM products WHERE id = "02";

DROP TABLE users;

DROP TABLE products;

DROP TABLE purchases;

DROP TABLE purchases_products;