//import { ProductDao } from '../../dao/index.js'
const ProductDao  = require('../../dao/index.js')
//import { DATE_UTILS, JOI_VALIDATOR, createFakeProducts } from '../../utils/index.js'
const  { faker }  = require('@faker-js/faker');
faker.locale = "es";

const getAll = async (req, res) => {
    try {
        const allProducts = await ProductDao.getAll()
        res.send({ success: true, data: allProducts })
    } catch (error) {
        console.log(error, `error from getAll`);
        res.send({ Error: "Ocurrio un error" })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.getById(id)
        if (!product) {
            res.send({ Error: "Ocurrio un error" })
        }
        res.send({ success: true, data: product })
    } catch (error) {
        console.log(error, `error from getById`);
        res.send({ Error: "Ocurrio un error" })
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body

        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp(), })
        const savedProduct = await ProductDao.save(product)

        res.send(savedProduct)

    } catch (error) {
        console.log(error, `error from createProduct`);
        res.send({ Error: "Ocurrio un error" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.deleteById(id)

        if (!product) {
            res.send({ Error: "Ocurrio un error" })
        }

        res.send({ success: true, data: product })
    } catch (error) {
        console.log(error, `error from deleteProduct`);
        res.send({ Error: "Ocurrio un error" })
    }

}

const getProductsTest = async (req, res) => {
    try {
        const listProducts = []
        for (let i = 0; i < 5; i++) {
        const product = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(1, 1000, 0), 
            thumbnail: faker.image.abstract(72, 72), 
        }
        listProducts.push(product)
    }
   
        res.send({ success: true, data: listProducts })

    } catch (error) {
        console.log(error, `error from getProductsTest`);
        res.send({ Error: "Ocurrio un error" })
    }
}

const ProductController = { getAll, getById, createProduct, deleteProduct, getProductsTest }
module.exports = ProductController