//import express from 'express'
const express = require('express')
const handlebars = require('express-handlebars')
const port = 8080
const app = express()

//esto sirve para leer los body en json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
)

app.set('view engine', "hbs")
app.set('views', './views')

const parhAbsoluto = __dirname
app.use('/publico', express.static(parhAbsoluto+'../public/index.html'))

//Devuelve la funcionalidad de productos
const routerProductos = require('./routes/routerProductos.js')
const routerViews = require('./routes/routerViews.js')
//Asignamos las func a /productos
app.use('/api/productos/', routerProductos)
app.use('/', routerViews)

app.all('*', (req, res) => res.send({mensaje: "Ruta no valida"}))

const server = app.listen(port, () => {
  console.log(`Server escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el server: ${error}`))