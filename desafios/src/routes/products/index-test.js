//import { Router } from 'express'
const Router = require('express')
//import { ProductController } from '../../controllers/index.js'
const ProductController = require('../../controllers/index.js')

const ProductsTestRouter = Router()

ProductsTestRouter.get('/', ProductController.getProductsTest)

//export { router as ProductsTestRouter }

module.exports = ProductsTestRouter 
