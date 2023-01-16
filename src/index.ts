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
    console.log("Servidor rodando na porta 3003.");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong!');
});

app.get('/users', (req: Request, res: Response) => {

    try { res.status(200).send(users) }

    catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message)
    };
});

app.get('/products', (req: Request, res: Response) => {
    try { res.status(200).send(products) }

    catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    };
});


app.get('/purchases', (req: Request, res: Response) => {
    try { res.send(purchases) }

    catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    };
});

app.post('/users', (req: Request, res: Response) => {
    try {
        let id = req.body.id
        let email = req.body.email
        let password = req.body.password

        if (
            id !== undefined &&
            email !== undefined &&
            password !== undefined
        ) {
            const newUser = { id: id, email: email, password: password };
            console.log(newUser);
            const checkId = users.find((user) => { return user.id === newUser.id });
            const checkEmail = users.find((user) => { return user.email === newUser.email });

            if (!checkId && !checkEmail) {
                users.push(newUser)
                res.status(201).send("O usuário foi registrado com sucesso.")
                console.log(users)
            }

            if (checkId) {
                res.status(400);
                throw new Error("Já existe um usuário com o mesmo 'id'. Cada usuário deve ter 'id' único.")
            }

            if (checkEmail) {
                res.status(400);
                throw new Error("Já existe um usuário com o mesmo 'email.' Cada usuário deve ter 'email' único.")
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
});

app.post('/products', (req: Request, res: Response) => {

    try {
        let id = req.body.id
        let name = req.body.name
        let price = req.body.price
        let category = req.body.category

        if (
            req.body.id !== undefined &&
            req.body.name !== undefined &&
            req.body.price !== undefined &&
            req.body.category !== undefined
        ) {

            const newProduct = {
                id: id,
                name: name,
                price: price,
                category: category
            }

            let checkProductId = products.find((product) => { return product.id === newProduct.id })

            if (checkProductId) {
                res.status(400)
                throw new Error("Já existe um produto com o mesmo 'id'. Cada produto deve ter 'id' único.")
            }
            else {
                products.push(newProduct)
                res.status(201).send("Produto registrado com sucesso.")
                console.log(products)
            }
        }
        else {
            res.status(400)
            throw new Error("Todos os campos do produto devem ser preenchidos.")
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

app.post('/purchases', (req: Request, res: Response) => {

    try {

        let { userId, productId, quantity, totalPrice } = req.body;

        if (req.body !== undefined) {

            const newPurchase = {
                userId: userId,
                productId: productId,
                quantity: quantity,
                totalPrice: totalPrice
            }

            const checkUserId = users.filter((user) => { return user.id === newPurchase.userId })
            const checkProductId = products.filter((product) => { return product.id === newPurchase.productId })

            if (checkUserId.length > 0 &&
                checkProductId.length > 0) {

                const totalPrice = (checkProductId[0].price) * (newPurchase.quantity)
                console.log(totalPrice)
                const checkTotalPrice = (totalPrice === newPurchase.totalPrice)
                console.log(checkTotalPrice)

                if (checkTotalPrice) {
                    res.status(201).send("Compra realizada com sucesso.")
                    purchases.push(newPurchase)
                    console.log(purchases)
                }
                else {
                    res.status(400)
                    throw new Error("O 'totalPrice' deve ser igual ao preço do produto vezes a quantidade.")
                }
            }

            if (checkUserId.length === 0) {
                res.status(400)
                throw new Error("Não há usuários com o 'id' inserido.")
            }
            if (checkProductId.length === 0) {
                res.status(400)
                throw new Error("Não há produtos com o 'id' inserido.")
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

app.get('/products/search', (req: Request, res: Response) => {
    try {
        const q = req.query.q as string

        if (q.length > 0) {
            const result = products.filter(
                (product) =>  product.name.toLowerCase().includes(q.toLowerCase())
            )
            if (result.length < 1) {
                res.status(404)
                throw new Error("Não há produtos registrados com o nome informado.")
            }
            else {
                res.status(200).send(result)
            }

        }
        else {
            res.status(400)
            throw new Error("O nome pesquisado deve conter ao menos 1 caractere.")
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

app.get("/products/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id
        if (id !== undefined) {
            if (id.length > 0) {
                const result = products.find(
                    (user) => { return user.id === id }
                )
                if (result) {
                    res.status(200).send(result)
                }
                else {
                    res.status(404).send("Produto não encontrado.")
                }
            }

            else {
                res.status(400)
                throw new Error("O 'id' pesquisado deve possuir pelo menos um caractere.")
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

app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const result = purchases.filter(
            (purchase) => { return purchase.userId === id }
        )
        if (result.length > 0) {
            res.status(200).send(result[0])
        }
        else {
            res.status(404)
            throw new Error("Não há usuário registrado com o 'id' inserido.")
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

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        let id = req.params.id
        if (id !== undefined) {
            let productIndex = products.findIndex(
                (product) => { return product.id === id }
            )
            if (productIndex >= 0) {
                products.splice(productIndex, 1)
                res.status(200).send("O produto foi removido com sucesso.")
            }
            else {
                res.status(404)
                throw new Error("Não há produtos com o 'id' informado.")
            }
        }
        else {
            res.status(400)
            throw new Error("Um 'id' deve ser informado para o produto ser deletado.")
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

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        let id = req.params.id

        if (id !== undefined) {
            let userIndex = users.findIndex(
                (user) => { return user.id === id }
            )
            if (userIndex >= 0) {
                users.splice(userIndex, 1)
                res.status(200).send("O usuário foi removido com sucesso.")
            }
            else {
                res.status(404)
                throw new Error("Usuário não encontrado.")
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

app.put('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newCategory = req.body.category

        if (
            newId !== undefined &&
            newName !== undefined &&
            newPrice !== undefined &&
            newCategory !== undefined
        ) {
            const productToEdit = products.find((product) => { return product.id === id })

            if (productToEdit) {
                productToEdit.id = newId || productToEdit.id
                productToEdit.name = newName || productToEdit.name
                productToEdit.price = newPrice || productToEdit.price
                productToEdit.category = newCategory || productToEdit.category

                res.status(200).send("Produto atualizado com sucesso")
            }
            else { res.status(404).send("Produto não encontrado.") }
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