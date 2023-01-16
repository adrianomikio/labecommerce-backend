"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const types_1 = require("./types");
(0, database_1.createUser)("José", "jose@email.com", "senhaDoJosé");
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("04", "Suco de maçã 1L", 12.00, types_1.CATEGORIES.BEVERAGES);
(0, database_1.getAllProducts)();
(0, database_1.getProductById)("02");
(0, database_1.queryProductsByName)("Suco");
(0, database_1.createPurchase)("Adriano", "02", 2, 30);
(0, database_1.getAllPurchases)();
//# sourceMappingURL=index.js.map