import { Router } from "express";
import { CartManager } from "../TXTCartManager.js"
import { ProductManager } from "../TXTProductManager.js";

const CART_PATH_TXT = './carts.txt'
const cartManager = new CartManager(CART_PATH_TXT)
const PRODUCTS_PATH_TXT = './products.txt'
const productManager = new ProductManager(PRODUCTS_PATH_TXT)

const cartRouter = Router()

//GET
//Carrito por Id
cartRouter.get('/:id', async (req, res) =>{
    let id = req.params.id
    const cart = await cartManager.getCartById(id)
    res.send(cart)
})

//POST
//Crear nuevo carrito
cartRouter.post('/', async (req, res) =>{
    const newCart = await cartManager.createCart()
    res.send(newCart)
})

//Agregar producto al carrito
cartRouter.post('/:id/products/:pid', async (req, res) =>{
    let idCart = req.params.id
    let idProduct = req.params.pid
    let {quantity} = req.body
    //Verificar que el producto existe
    const checkProductExists = await productManager.getProductById(idProduct)
    if(checkProductExists == "El elemento no existe."){
        res.send("El producto no existe.")
    } else {
        const addToCart = await cartManager.addProductToCart(idCart, idProduct, quantity)
        res.send(addToCart)
    }
})


export default cartRouter