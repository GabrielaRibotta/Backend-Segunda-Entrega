import 'dotenv/config.js'
import express from 'express'
import mongoose from 'mongoose'

//Models
import { productModel } from './models/Products.js'
import { cartModel } from './models/Carts.js'

import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'

const app = express()
const PORT = process.env.PORT


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

mongoose.connect(process.env.URL_MONGODB_ATLAS)
    .then(() => console.log("DB is connected"))
    .catch((error) => console.log("Error en MongoDb Atlas :", error))

app.listen(PORT, () =>{
    console.log(`Server on port ${PORT}`)
})

/* await productModel.insertMany(
    [{"id":1,"title":"Lord of the Rings","description":"Paperback","code":"fn01","price":7000,"status":true,"stock":10,"category":"Ficcion","thumbnail":"No Image"},{"id":2,"title":"Before the Coffee Gets Cold","description":"Paperback","code":"fn02","price":3250,"status":true,"stock":20,"category":"Ficcion","thumbnail":"No Image"},{"id":3,"title":"The Wizard of Oz","description":"Paperback","code":"fn03","price":7500,"status":true,"stock":15,"category":"Ficcion","thumbnail":"No Image"},{"id":4,"title":"Santa Post","description":"Paperback","code":"in01","price":6500,"status":true,"stock":8,"category":"Infantil","thumbnail":"No Image"},{"id":5,"title":"The Tiger Who Came to Tea","description":"Paperback","code":"in02","price":2700,"status":true,"stock":10,"category":"Infantil","thumbnail":"No Image"},{"id":6,"title":"Giraffes Can't Dance","description":"Paperback","code":"in03","price":3100,"status":true,"stock":10,"category":"Infantil","thumbnail":"No Image"},{"id":7,"title":"Biology AS A Level Workbook","description":"Paperback","code":"ac01","price":6000,"status":true,"stock":10,"category":"Academico","thumbnail":"No Image"},{"id":8,"title":"Environmental Management","description":"Paperback","code":"ac02","price":8000,"status":true,"stock":5,"category":"Academico","thumbnail":"No Image"},{"id":9,"title":"The Very Hungry Caterpillar","description":"Paperback","code":"in04","price":3400,"status":true,"stock":8,"category":"Infantil","thumbnail":"No Image"},{"id":10,"title":"The Mirror and the Light","description":"Paperback","code":"fn04","price":5200,"status":true,"stock":15,"category":"Ficcion","thumbnail":"No Image"}]
)*/