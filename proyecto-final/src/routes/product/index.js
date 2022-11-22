import { request, Router } from 'express'
import { ProductDao } from '../../dao/index.js'
import { verifyRole } from "../../middlewares/verifyRole.js";
import { DATE_UTILS, JOI_VALIDATOR } from '../../utils/index.js'

const router = Router()

router.get('/', async (req, res) => {
    const products = await ProductDao.getAll()
    res.send(products)
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    const product = await ProductDao.getById(Number(id))
    if(!product) return res.send({Error: 'Producto no encontrado'})
    res.send(product)
})

router.post('/', verifyRole, async (req, res) => {
    const { title, description, code, thumbnail, price, stock } = req.body
    try{
        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() })
        //const product = { title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() }
        const createProduct = await ProductDao.save(product)
        res.send(createProduct)
    }catch(error){
        console.log(error)
        res.send({Error: "Ocurrio un error" })
    }
})

router.delete('/:id', verifyRole, async (req, res) => {
   try{
    const {id} = req.params
    await ProductDao.deleteById(Number(id))
    res.send({ success: true })
   }catch(error){
    console.log(error)
    res.send({Error: "Ocurrio un error" })
   }
})

router.put('/:id', verifyRole, async (req, res) => {
    const { title, description, code, thumbnail, price, stock } = req.body
    try{
        const {id} = req.params
        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, thumbnail, price, stock, timestamp: DATE_UTILS.getTimestamp() })
        const updateProduct = await ProductDao.updateById(id, product)
        res.send(updateProduct)
    }catch(error){
        console.log(error)
        res.send({Error: "Ocurrio un error" })
    }
})

export { router as ProductRouter }