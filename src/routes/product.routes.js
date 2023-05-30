import { Router } from "express";
import { productModel } from "../models/Products.js";
import { ObjectId } from "mongodb";

const productRouter = Router()

//GET paginate
productRouter.get('/', async (req, res) =>{
    const products = await productModel.paginate({}, {limit: req.query.limit ?? 10, page: req.query.page ?? 1, sort: {"price": req.query.sort ?? 0}})
    res.send(products)
})

productRouter.get('category="Ficcion"', async (req, res) =>{
    const products = await productModel.paginate({category: "Ficcion"}, {limit: req.query.limit ?? 10, page: req.query.page ?? 1, sort: {"price": req.query.sort ?? 0}})
    res.send(products)
})
productRouter.get('category="Infantil"', async (req, res) =>{
    const products = await productModel.paginate({category: "Infantil"}, {limit: req.query.limit ?? 10, page: req.query.page ?? 1, sort: {"price": req.query.sort ?? 0}})
    res.send(products)
})
productRouter.get('category="Academico"', async (req, res) =>{
    const products = await productModel.paginate({category: "Academico"}, {limit: req.query.limit ?? 10, page: req.query.page ?? 1, sort: {"price": req.query.sort ?? 0}})
    res.send(products)
})

//GET por id
productRouter.get('/:pid', async (req, res) =>{
    let idProduct = req.params.pid
    //Leer txt
    const product = await productModel.findById({_id: idProduct})
    res.send(product)
})

export default productRouter