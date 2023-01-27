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

//TEST QUERIES 
// server running
app.listen(3003, () => {
    console.log(`Server running on port ${3003}.`);
})

// ping server
app.get('/ping', async (req: Request, res: Response) => {
    try {
        res.status(200).send('Pong!');
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
})

//CREATE QUERIES
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
                throw new Error("There's already an user with this 'id'. Each user's 'id' must be unique.")
            }

            if (checkEmail) {
                res.status(400);
                throw new Error("There's already an user with this 'email'. Each user's 'email' must be unique.")
            }

            else {
                await db.insert({ id, name, email, password }).into("users")
                res.status(200).send("User registered successfully.")
            }

        }
        else {
            res.status(400);
            throw new Error("An id, a name, an email and a password must be inserted to register a new user.");
        }
    }


    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
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
                throw new Error("There's already a product with this 'id'. Each product's 'id' must be unique.")
            }

            else {
                await db.insert(newProduct).into("products")
                res.status(200).send("Product registered successfully.")
            }
        }

        else {
            res.status(400)
            throw new Error("An 'id', 'name', 'price', 'image_url', and a 'category' must be informed to register a new product.")
        }
    }
    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
})

//create new purchase
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        let { id, total_price, paid, buyer_id } = req.body;

        if (req.body !== undefined) {
            let newPurchase = { id, total_price, paid, buyer_id }

            await db.insert(newPurchase).into("purchases")
            res.status(200).send("Purchase registered successfully.")
        }
        else {
            res.status(400)
            throw new Error("An 'id', 'total_price', 'paid' and 'buyer_id' must be informed to register a new purchase.")
        }
    }
    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
})

//GET QUERIES
//get all users
app.get('/users', async (req: Request, res: Response) => {

    try {
        let users = await db.select("*").from("users")
        res.status(200).send(users)
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    };
})

//get all products
app.get('/products', async (req: Request, res: Response) => {
    try {
        let products = await db.select("*").from("products")
        res.status(200).send(products)
    }

    catch (error) {
        console.log(error);

        if (res.statusCode === 200) { res.status(500); }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
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

        if (res.statusCode === 200) { res.status(500); }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    };
})

//get product with name like
app.get('/products/search', async (req: Request, res: Response) => {
    try {
        const q = req.query.q
        console.log(q)

        let productOnDB = await db("products").where("name", "LIKE", `%${q}%`)
        console.log(productOnDB)

        if (productOnDB) { res.status(200).send(productOnDB) }

        else {
            res.status(404)
            throw new Error("There's no products with inserted term.")
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }

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
                    res.status(404).send("Product with inserted 'id' not found.")
                }
            }

            else {
                res.status(400)
                throw new Error("An 'id' must be inserted to search for a product.")
            }
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500); }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
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
                throw new Error("There are no users with inserted 'id'.")
            }
        }

        if (id === ":id") {
            res.status(400)
            throw new Error("An 'id' must be inserted to search for user's purchases.")
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
})

//UPDATE QUERIES
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

                res.status(200).send("User updated successfully.")
            }
            else {
                throw new Error("A 'newId', or 'newEmail', or 'newPassword' must be informed to update an user's data.")
            }
        }
        else {
            res.status(404)
            throw new Error("There are no users with inserted 'id'.")
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
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

                    res.status(200).send("Product's data updated successfully.")
                }
                else { res.status(404).send("Product with inserted 'id' not found.") }
            }
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
})

//update purchase's data by id
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        let purchaseIdToSearch = req.params.id

        if (purchaseIdToSearch !== ":id") {
            let [checkPurchase] = await db
                .select("*")
                .from("purchases")
                .where({ id: purchaseIdToSearch })

            if (checkPurchase) {

                let purchaseWithProducts = await db("purchases_products")
                    .innerJoin(
                        "purchases",
                        "purchases_products.purchase_id", "=", "purchases.id")
                    .where({ purchase_id: purchaseIdToSearch })
                    .innerJoin(
                        "products",
                        "purchases_products.product_id", "=", "products.id")
                    .where({ purchase_id: purchaseIdToSearch })

                res.status(200).send(purchaseWithProducts)
            }
            else {
                res.status(400)
                throw new Error("Compra com o 'id' não encontrada.")
            }
        }

        else {
            res.status(400)
            throw new Error("Um 'id' deve ser informado para pesquisar a compra.")
        }
    }
    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(400) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
    }
})

//DELETE QUERIES
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

                res.status(200).send("Product deleted successfully.")
            }

            else {
                res.status(404)
                throw new Error("Product with inserted 'id' not found.")
            }
        }
        else {
            res.status(400)
            throw new Error("An 'id' must be inserted to delete a product.")
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Unexpected error.") }
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

                res.status(200).send("User deleted successfully.")
            }

            else {
                res.status(404)
                throw new Error("User with inserted 'id' not found.")
            }
        }
    }

    catch (error) {
        console.log(error)

        if (res.statusCode === 200) { res.status(500); }

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
                await db
                    .delete()
                    .from("purchases")
                    .where({ id: id })
                res.status(200).send("Purchase deleted successfully.")
            }

            else {
                res.status(400)
                throw new Error("Purchase with inserted 'id' wasn't found.")
            }
        }

        else {
            res.status(400)
            throw new Error("An 'id' must be inserted to delete a purchase.")
        }
    }

    catch (error) {
        console.log(error)
        if (res.statusCode === 200) { res.status(500) }

        if (error instanceof Error) { res.send(error.message) }

        else { res.send("Erro inesperado.") }
    }
})