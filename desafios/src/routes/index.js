//export { ProductRouter } from './products/index.js'
//export { CartRouter } from './cart/index.js'
//export { ProductsTestRouter } from './products/index-test.js'
//export { MessagesRouter } from './messages/index.js'

const ProductRouter = require('./products/index.js')
const ProductsTestRouter = require('./products/index-test.js') 

module.exports = {ProductRouter, ProductsTestRouter}