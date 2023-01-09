import { stringify } from "querystring";
import { TUser, TProduct, TPurchase, CATEGORIES } from "./types";

export let users: TUser[] = [
    { id: "Adriano", email: "adriano@dominio.com", password: "senhaAdriano" },
    { id: "Joaquim", email: "joaquim@dominio.com", password: "senhaJoaquim" },
    { id: "Paola", email: "paola@dominio.com", password: "senhaPaola" }]

export let products: TProduct[] = [
    { id: "01", name: "Pacote de maçã 500g", price: 10.00, category: CATEGORIES.FRUITS },
    { id: "02", name: "Suco de uva 1,5L", price: 15.00, category: CATEGORIES.BEVERAGES },
    { id: "03", name: "Pacote de café em pó 500g", price: 17.00, category: CATEGORIES.COFTEACHOCO }
]

export let purchases: TPurchase[] = [
    { userId: users[0].id, productId: products[1].id, quantity: 2, totalPrice: products[1].price * 2 },
    { userId: users[1].id, productId: products[2].id, quantity: 1, totalPrice: products[2].price * 1 },
    { userId: users[2].id, productId: products[0].id, quantity: 2, totalPrice: products[0].price * 2 }
]

export function createUser(id: string, email: string, password: string) {
    return users.push({ id: id, email: email, password: password }),
        console.log("Cadastro realizado com sucesso.")
}
// createUser("José", "jose@email.com", "senhaDoJosé")

export function getAllUsers() {
    return console.log(users)
}
// getAllUsers()

export function createProduct(id: string, name: string, price: number, category: CATEGORIES) {
    return products.push({ id: id, name: name, price: price, category: category }),
        console.log("Produto criado com sucesso.")
}
// createProduct("04", "Suco de maçã 1L", 12.00, CATEGORIES.BEVERAGES)

export function getAllProducts() {
    return console.log(products)
}

// getAllProducts()

export function getProductById(idToSearch: string | undefined) {
    if (idToSearch) {
        let productFoundId: object = products.filter((product) => {
            return product.id === idToSearch
        })
        return console.log(productFoundId)
    }
    else { return console.log("Nenhum ID foi inserido para pesquisa.") }
}

// getProductById("02")

export function queryProductsByName(queryName: string | undefined) {
    if (queryName) {
        let productFoundName: object = products.filter(
            (product) => { return product.name.includes(queryName) })
        return console.log(productFoundName)
    }
    else { return console.log("Nenhum nome foi inserido para pesquisa.") }
}

// queryProductsByName("Suco")

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number) {
    return purchases.push({ userId: userId, productId: productId, quantity: quantity, totalPrice: totalPrice }),
        console.log("Compra realizada com sucesso.")
}

export function getAllPurchases() {
    return console.log(purchases)
}