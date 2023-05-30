import { Router } from "express";
import { cartModel } from "../models/Carts.js";
import { productModel } from "../models/Products.js";
import mongoose from "mongoose";

const cartRouter = Router()

//GET por id
cartRouter.get('/:cid', async (req, res) =>{
    let idCart = req.params.cid
    //Leer txt
    const cart = await cartModel.findById({_id: idCart})
    res.send(cart)
})

//POST
//Crear nuevo carrito
cartRouter.post('/', async (req, res) =>{
    const newCart = new cartModel
    await cartModel.create(newCart)
    res.send("Carrito creado")
})

//Agregar producto al carrito
cartRouter.post('/:cid/products/:pid', async (req, res) =>{
    let idCart = req.params.cid
    let idProduct = req.params.pid
    let {quantity} = req.body
    //Verificar que el producto existe
    const checkProductExists = await productModel.findById({_id: idProduct})
    if(checkProductExists == "El elemento no existe."){
        res.send("El producto no existe.")
    } else {
        const newCartProduct = {
            id_product: {_id: idProduct},
            quantity: {quantity}
        }
        
        const addToCart = await cartModel.updateOne({_id: idCart}, newCartProduct)
        res.send(addToCart)
    }
})

//PUT

//DELETE
//Borrar 1 producto
cartRouter.delete('/:cid', async (req, res) =>{
    let idCart = req.params.cid
    let idProduct = req.params.pid
    let productToDelete = await productModel.findById({_id: idProduct})
    const deleteProduct = await cartModel.deleteOne({_id: idCart}, productToDelete)
    res.send(deleteProduct)
})

//Vaciar carrito
cartRouter.delete('/:cid', async (req, res) =>{
    let idCart = req.params.cid
    let deleteAllProducts = []
    const emptyCart = await cartModel.replaceOne({_id: idCart}, deleteAllProducts)
    res.send(emptyCart)
})

export default cartRouter