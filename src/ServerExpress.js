const express = require('express')
const Contenedor = require('./Contenedor')
const app = express()
const port = 8080

const server = app.listen(port, () => {
  console.log(`Server escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el server: ${error}`))

//esto sirve para leer los body en json
app.use(express.json())

const parhAbsoluto = __dirname
app.use('/publico', express.static(parhAbsoluto+'/public'))

const productos = new Contenedor("productos")

//Devuelve la funcionalidad de productos
const routerProductos = require('./routes/productos.js')
//Asignamos las func a /productos
app.use('/api/productos', routerProductos)

app.all('*', (req, res) => res.send({mensaje: "Ruta no valida"}))


