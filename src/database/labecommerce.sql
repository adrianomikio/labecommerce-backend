CREATE TABLE
    users(
        -- USUÁRIOS
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL
    );

CREATE TABLE
    products(
        -- PRODUTOS
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL
    );

CREATE TABLE
    purchases(
        -- COMPRAS
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        total_price REAL NOT NULL,
        paid INTEGER NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
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
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

SELECT * FROM users ORDER BY email ASC;

SELECT * FROM products WHERE id = "01";

SELECT * FROM products ORDER BY price ASC LIMIT 20;

SELECT * FROM products WHERE name LIKE "%";

SELECT *
FROM products
WHERE price > 3 AND price <= 5
ORDER BY price ASC;

SELECT *
FROM purchases
    INNER JOIN users ON buyer_id = users.id
WHERE users.id = "03";

SELECT *
FROM purchases_products
    INNER JOIN products ON purchases_products.product_id = products.id
    INNER JOIN purchases ON purchases_products.purchase_id = purchases.id;

INSERT INTO
    users (id, name, email, password)
VALUES (
        "u001",
        "Adriano Uge",
        "adriano@email.com",
        "senhaDoAdriano"
    ), (
        "u002",
        "Larissa Silva",
        "larissa@email.com",
        "senhaDaLarissa"
    ), (
        "u003",
        "Junior Ribeiro",
        "junior@email.com",
        "senhaDoJunior"
    ), (
        "u004",
        "Rosana Rocha",
        "rosana@email.com",
        "senhaDaRosana"
    );

INSERT INTO
    products (
        id,
        name,
        price,
        image_url,
        category
    )
VALUES (
        "pro001",
        "Chá Verde 100g",
        6,
        "https://cdn.awsli.com.br/600x450/4/4552/produto/254823/1afb79ecc7.jpg",
        "Chá, Café e Achocolatados"
    ), (
        "pro002",
        "Café Solúvel 50g",
        9,
        "https://www.extrabom.com.br/uploads/produtos/350x350/8062_extrabom_cafes-chas_cafe-soluvel-3-coracoes-tradicional-vidro-50g.jpg",
        "Chá, Café e Achocolatados"
    ), (
        "pro003",
        "Toddy em pó 400g",
        8,
        "https://images-americanas.b2w.io/produtos/104898461/imagens/achocolatado-em-po-toddy-original-pote-400g/104898459_1_large.jpg",
        "Chá, Café e Achocolatados"
    ), (
        "pro004",
        "Alecrim desidratado 100g",
        4,
        "https://cdn.shopify.com/s/files/1/0139/9111/6854/products/alecrim_580x.png?v=1568028147",
        "Ervas e Especiarias"
    ), (
        "pro005",
        "Pimenta do Reino 100g em grão",
        5,
        "https://camomilacuritiba.com.br/wp-content/uploads/2016/03/pimenta-grao.jpg",
        "Ervas e Especiarias"
    );

INSERT INTO
    purchases(id, total_price, paid, buyer_id)
VALUES ("pur001", 21, 0, "01"), ("pur002", 18, 0, "03"), ("pur003", 25, 1, "02"), ("pur004", 18, 0, "01"), ("pur005", 15, 0, "02"), ("pur006", 10, 0, "03");

INSERT INTO
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES ("pur001", "pro001", 1), ("pur002", "pro003", 1), ("pur004", "pro002", 0);

UPDATE users SET WHERE ;

UPDATE products SET WHERE ;

UPDATE purchases SET WHERE ;

DELETE FROM users WHERE ;

DELETE FROM products WHERE ;

DELETE FROM purchases WHERE ;

DELETE FROM purchases_products WHERE ;

DROP TABLE users;

DROP TABLE products;

DROP TABLE purchases;

DROP TABLE purchases_products;