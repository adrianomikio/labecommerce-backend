"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchases = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    { id: "Adriano", email: "adriano@dominio.com", password: "senhaAdriano" },
    { id: "Joaquim", email: "joaquim@dominio.com", password: "senhaJoaquim" },
    { id: "Paola", email: "paola@dominio.com", password: "senhaPaola" }
];
exports.products = [
    { id: "01", name: "Pacote de maçã 500g", price: 10.00, category: types_1.CATEGORIES.FRUITS },
    { id: "02", name: "Suco de uva 1,5L", price: 15.00, category: types_1.CATEGORIES.BEVERAGES },
    { id: "03", name: "Pacote de café em pó 500g", price: 17.00, category: types_1.CATEGORIES.COFTEACHOCO }
];
exports.purchases = [
    { userId: exports.users[0].id, productId: exports.products[1].id, quantity: 2, totalPrice: exports.products[1].price * 2 },
    { userId: exports.users[1].id, productId: exports.products[2].id, quantity: 1, totalPrice: exports.products[2].price * 1 },
    { userId: exports.users[2].id, productId: exports.products[0].id, quantity: 2, totalPrice: exports.products[0].price * 2 }
];
function createUser(id, email, password) {
    return exports.users.push({ id: id, email: email, password: password }),
        console.log("Cadastro realizado com sucesso.");
}
exports.createUser = createUser;
function getAllUsers() {
    return console.log(exports.users);
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    return exports.products.push({ id: id, name: name, price: price, category: category }),
        console.log("Produto criado com sucesso.");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return console.log(exports.products);
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    if (idToSearch) {
        let productFoundId = exports.products.filter((product) => {
            return product.id === idToSearch;
        });
        return console.log(productFoundId);
    }
    else {
        return console.log("Nenhum ID foi inserido para pesquisa.");
    }
}
exports.getProductById = getProductById;
function queryProductsByName(queryName) {
    if (queryName) {
        let productFoundName = exports.products.filter((product) => { return product.name.includes(queryName); });
        return console.log(productFoundName);
    }
    else {
        return console.log("Nenhum nome foi inserido para pesquisa.");
    }
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    return exports.purchases.push({ userId: userId, productId: productId, quantity: quantity, totalPrice: totalPrice }),
        console.log("Compra realizada com sucesso.");
}
exports.createPurchase = createPurchase;
function getAllPurchases() {
    return console.log(exports.purchases);
}
exports.getAllPurchases = getAllPurchases;
//# sourceMappingURL=database.js.map