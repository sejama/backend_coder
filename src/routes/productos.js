const express = require('express');
const {Router} = express
const router = Router()
//const router = express.Router()
const Contenedor = require('../Contenedor.js')

const productos = new Contenedor("productos")


router.get('/', (req, res) => {
    res.send(productos.getAll())
})

router.post('/', (req, res) => {
    const producto = req.body
    productos.push(producto)
    res.status(200).send('Producto asignado')
})




  router.get('/productoRandom', (req, res) => {
    const limite = productos.getAll().length
    const id = parseInt(Math.random()*limite) + 1
  
      res.send(productos.getById(id))
    })


module.exports = router


