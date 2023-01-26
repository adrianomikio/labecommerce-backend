import { TUser, TProduct, TPurchase } from './types'
import { CATEGORIES } from "./types";
import {
    users, products, purchases,
    createUser, getAllUsers,
    createProduct, getAllProducts,
    getProductById, queryProductsByName,
    createPurchase, getAllPurchases
} from "./database";

import express, { Request, Response } from 'express';
import cors from 'cors';
import { db } from './database/knex';

const app = express();
app.use(express.json());
app.use(cors());

// server running
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003.");
})

// ping server
app.get('/ping', (req: Request, res: Response) => {
    res.send('pong!');
})

//create new user
app.post('/users', async (req: Request, res: Response) => {
    try {
        let { id, name, email, password } = req.body

        if (
            id !== undefined &&
            name !== undefined &&
            email !== undefined &&
            password !== undefined
        ) {
            const [checkIdExist] = await db.select("*").from("users").where({ id: id })
            console.log(checkIdExist)
            const [checkEmail] = await db.select("*").from("users").where({ email: email })
            console.log(checkEmail)

            if (checkIdExist) {
                res.status(400)
                throw new Error("Já há um usuário com este 'id'. O 'id' de cada usuário deve ser único.")
            }

            if (checkEmail) {
                res.status(400);
                throw new Error("Já existe um usuário com este 'email'. Cada usuário deve ter 'email' único.")
            }

            else {
                await db.insert({ id, name, email, password }).into("users")
                res.status(200).send("Usuário cadastrado com sucesso.")
            }

        }
        else {
            res.status(400);
            throw new Error("Todos os campos do usuário precisam ser definidos.");
        }
    }

    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message)
    };
})

//create new product
app.post('/products', async (req: Request, res: Response) => {

    try {
        const { id, name, price, description, image_url, category } = req.body

        if (req.body !== undefined) {
            const newProduct = { id, name, price, description, image_url, category }

            let [checkProductId] = await db
                .select("*")
                .from("products")
                .where({ id: id })

            if (checkProductId) {
                res.status(400)
                throw new Error("Já existe um produto com o mesmo 'id'. Cada produto deve ter 'id' único.")
            }

            else {
                await db.insert(newProduct).into("products")
                res.status(200).send("Produto cadastrado com sucesso.")
            }
        }

        else {
            res.status(400)
            throw new Error("Todos os campos do produto devem ser preenchidos.")
        }
    }
    catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Erro inesperado.") }
    }
})

//create new purchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        let { id, total_price, paid, buyer_id } = req.body;

        if (req.body !== undefined) {
            let newPurchase = { id, total_price, paid, buyer_id }

            await db.insert(newPurchase).into("purchases")
            res.status(200).send("Compra registrada com sucesso.")
        }
        else {
            res.status(400)
            throw new Error("O 'totalPrice' deve ser igual ao preço do produto vezes a quantidade.")
        }
    }
    catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        res.send(error.message)
    }
})

// get all users
app.get('/users', async (req: Request, res: Response) => {

    try {
        let users = await db.select("*").from("users")
        res.status(200).send(users)
    }

    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message)
    };
})

//get all products
app.get('/products', async (req: Request, res: Response) => {
    try {
        let products = await db.select("*").from("products")
        res.status(200).send(products)
    }

    catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    };
})

//get all purchases
app.get('/purchases', async (req: Request, res: Response) => {
    try {
        let purchases = await db.select("*").from("purchases")
        res.status(200).send(purchases)
    }

    catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    };
})

//get product with name like
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q
        console.log(q)
        let productOnDB = await db("products").where("name", "LIKE", `%${q}%`)
        console.log(productOnDB)
        if (!productOnDB) {
            res.status(404)
            throw new Error("Não há produtos registrados com o nome informado.")
        }
        else {
            res.status(200).send(productOnDB)
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Erro inesperado.") }

    }
})

//get product by id
app.get("/products/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        if (id !== ":id") {
            if (id.length > 0) {
                const result = await db("products").where({ id })

                if (result) {
                    res.status(200).send(result)
                }
                else {
                    res.status(404).send("Produto não encontrado.")
                }
            }

            else {
                res.status(400)
                throw new Error("Um 'id' deve ser inserido para pesquisa.")
            }
        }
    }

    catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error)
    }
})

//get purchases by user's id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        console.log(id, typeof id)
        if (id !== ":id") {
            const [result] = await db("purchases").where({ buyer_id: id })
            console.log(result, typeof result)

            if (result !== undefined) {
                res.status(200).send(result)
            }

            else {
                res.status(404)
                throw new Error("Não há usuário registrado com o 'id' inserido.")
            }
        }

        if (id === ":id") {
            res.status(400)
            throw new Error("Um 'id' deve ser inserido para a pesquisa.")
        }
    }

    catch (error: any) {
        console.log(error.message)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error)
    }
})

//update user's data by id
app.put('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id
        const newEmail = req.body.email
        const newPassword = req.body.password

        const userToEdit = users.find((user) => { return user.id === id })

        if (userToEdit) {
            if (
                newId !== undefined &&
                newEmail !== undefined &&
                newPassword !== undefined) {

                userToEdit.id = newId || userToEdit.id
                userToEdit.email = newEmail || userToEdit.email
                userToEdit.password = newPassword || userToEdit.password

                res.status(200).send("Usuário atualizado com sucesso")
            }
            else {
                throw new Error("Todos os campos do usuário devem ser preenchidos.")
            }
        }
        else {
            res.status(404)
            throw new Error("Não há usuários registrados com o 'id' informado.")
        }
    }

    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//update product's data by id
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        console.log(id)

        if (id !== ":id") {
            const { newId, newName, newPrice, newCategory } = req.body

            if (
                newId !== undefined ||
                newName !== undefined ||
                newPrice !== undefined ||
                newCategory !== undefined
            ) {
                const [productToEdit] = await db("products").where({ id: id })
                console.log(productToEdit)
                
                if (productToEdit) {
                    await db.update(
                        {
                            name: newName || productToEdit.name,
                            price: newPrice || productToEdit.price,
                            category: newCategory || productToEdit.category
                        }
                    ).from("products").where({ id: id })

                    res.status(200).send("Produto atualizado com sucesso")
                }
                else { res.status(404).send("Produto não encontrado.") }
            }
        }
    }
    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//update purchase's data by id
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        let purchaseIdToSearch = req.params.id

        if (purchaseIdToSearch !== ":id") {
            let [checkPurchase] = await db.select("*").from("purchases").where({ id: purchaseIdToSearch })

            if (checkPurchase) {
                let purchaseWithProducts = await db("purchases_products").innerJoin("purchases", "purchases_products.purchase_id", "=", "purchases.id").where({ purchase_id: purchaseIdToSearch }).innerJoin("products", "purchases_products.product_id", "=", "products.id").where({ purchase_id: purchaseIdToSearch })
                res.status(200).send(purchaseWithProducts)
            }
            else {
                res.status(400)
                throw new Error("Compra com o 'id' não encontrada.")
            }
        }

        else {
            res.status(400).send("Um 'id' deve ser informado para pesquisar a compra.")
        }
    }
    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(400)
        }
        res.send(error.message)
    }
})

//delete product by id
app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id

        if (id !== undefined) {
            let [productToDelete] = await db
                .select("*")
                .from("products")
                .where({ id: id })

            if (productToDelete) {
                await db
                    .del()
                    .from("products")
                    .where({ id: id })

                res.status(200).send("Produto deletado com sucesso.")
            }

            else {
                res.status(404)
                throw new Error("Produto com 'id' inserido não encontrado.")
            }
        }
        else {
            res.status(400)
            throw new Error("Um 'id' deve ser informado para o produto ser deletado.")
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message)
        }

        else {
            res.send("Erro inesperado.")
        }
    }
})

//delete user by id
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        let id = req.params.id

        if (id !== undefined) {
            const userToDelete = await db
                .select("*")
                .from("users")

            if (userToDelete) {
                await db
                    .del()
                    .from("users")
                    .where({ id: id })

                res.status(200).send("Usuário deletado com sucesso.")
            }

            else {
                res.status(404)
                throw new Error("Usuário não encontrado.")
            }
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Erro inesperado.") }
    }
})

//delete purchase by id
app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        console.log(id)

        if (id !== ":id") {
            const [purchaseToDelete] = await db
                .select("*")
                .from("purchases")
                .where({ id: id })

            if (purchaseToDelete) {
                await db.delete().from("purchases").where({ id: id })
                res.status(200).send("Compra deletada com sucesso.")
            }

            else {
                res.status(400)
                throw new Error("Compra com o 'id' informado não encontrada.")
            }
        }

        else {
            res.status(400)
            throw new Error("Um 'id' deve ser informado para que a compra seja deletada.")
        }
    }

    catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado.")
        }
    }
})