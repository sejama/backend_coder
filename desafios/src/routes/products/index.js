const Router = require('express')
//import { Router } from 'express'
//import { verifyRole } from '../../middlewares/index.js'
const {verifyRole} = require('../../middlewares/index.js')
//import { ProductController } from '../../controllers/index.js'
const ProductController = require('../../controllers/index.js')


const ProductRouter = Router()

ProductRouter.get('/', ProductController.getAll)

ProductRouter.get('/:id', ProductController.getById)

ProductRouter.post('/', verifyRole, ProductController.createProduct)
//ProductRouter.post('/', ProductController.createProduct)

ProductRouter.delete('/:id', ProductController.deleteProduct)

//export { router as ProductRouter }
module.exports = ProductRouter