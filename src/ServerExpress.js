//import express from 'express'
const express = require('express')
const handlebars = require('express-handlebars')
const port = 8080
const app = express()

const server = app.listen(port, () => {
  console.log(`Server escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el server: ${error}`))

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
)

app.set('view engine', "hbs")
app.set('views', '../views')

//esto sirve para leer los body en json
app.use(express.json())

const parhAbsoluto = __dirname
app.use('/publico', express.static(parhAbsoluto+'../public/index.html'))

//Devuelve la funcionalidad de productos
const routerProductos = require('./routes/routerProductos.js')
const viewsRouter = require('./routes/ViewsRouter.js')
//Asignamos las func a /productos
app.use('/api/productos/', routerProductos)
app.use('/views', viewsRouter)

app.all('*', (req, res) => res.send({mensaje: "Ruta no valida"}))


