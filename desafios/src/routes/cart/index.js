//import { Router } from "express"
//import { CartController } from "../../controllers/index.js"

const Router = require('express')
const CartController = require('../../controllers/index.js')

const CartRouter = Router()

CartRouter.post('/', CartController.saveCart)

CartRouter.post('/:cartId/products', CartController.updatedCartById)

CartRouter.delete('/:cartId', CartController.deleteCart)

CartRouter.delete('/:cartId/products/:id_prod', CartController.deleteProductFromCart)

CartRouter.get('/:cartId/products', CartController.productsInCart)

CartRouter.get('/:id', CartController.cartById)

//export { router as CartRouter }
module.exports = CartRouter