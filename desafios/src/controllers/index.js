//export { ProductController } from './ProductsController/index.js'
//export { CartController } from './CartsController/index.js'
// export { MessagesController } from './MessagesController/index.js'
const ProductController = require('./products/index.js') 
const CartController = require('./carts/index.js')
module.exports = {ProductController, CartController}