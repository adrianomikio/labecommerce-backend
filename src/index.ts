import {
    users, products, purchases,
    createUser, getAllUsers,
    createProduct, getAllProducts,
    getProductById, queryProductsByName,
    createPurchase, getAllPurchases
} from "./database";
import { CATEGORIES } from "./types";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { TUser, TProduct, TPurchase } from './types'

// createUser("José", "jose@email.com", "senhaDoJosé")
// getAllUsers()
// createProduct("04", "Suco de maçã 1L", 12.00, CATEGORIES.BEVERAGES)
// getAllProducts()
// getProductById("02")
// queryProductsByName("Suco")
// createPurchase("Adriano", "02", 2, 30)
// getAllPurchases()

// console.log("Testando!")
// console.log(users)
// console.log(products)
// console.log(purchases)

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003.")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong!');
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result = products.filter(
        (product) => { return product.name.toLowerCase().includes(q.toLowerCase()) })
    res.status(200).send(result)
})

app.get('/purchases', (req: Request, res: Response) => {
    res.send(purchases)
})

app.post('/users', (req: Request, res: Response) => {
    let { id, email, password } = req.body as TUser
    const newUser = { id: id, email: email, password: password }
    users.push(newUser)

    res.status(201).send("Usuário registrado com sucesso.")
    console.log(users)
})

app.post('/products', (req: Request, res: Response) => {
    let { id, name, price, category } = req.body as TProduct;

    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)

    res.status(201).send("Produto registrado com sucesso.")
    console.log(products)
})

app.post('/purchases', (req: Request, res: Response) => {
    let { userId, productId, quantity, totalPrice } = req.body as TPurchase;

    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }
    purchases.push(newPurchase);

    res.status(201).send("Compra realizada com sucesso.")
    console.log(purchases)
})

