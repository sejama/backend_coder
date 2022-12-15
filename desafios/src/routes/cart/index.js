import { Router } from "express"
import { CartController } from "../../controllers/index.js"

const router = Router()

router.post('/', CartController.saveCart)

router.post('/:cartId/products', CartController.updatedCartById)

router.delete('/:cartId', CartController.deleteCart)

router.delete('/:cartId/products/:id_prod', CartController.deleteProductFromCart)

router.get('/:cartId/products', CartController.productsInCart)

router.get('/:id', CartController.cartById)

export { router as CartRouter }