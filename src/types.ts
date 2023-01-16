export enum CATEGORIES {
    BEVERAGES = "bebidas",
    FRUITS = "frutas",
    COFTEACHOCO = "café, chá e achocolatados"
}

export type TUser = {
    id: string,
    email: string,
    password: string
}
export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: CATEGORIES
}
export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}