const express = require('express')
const Contenedor = require('./Contenedor')
const app = express()
const port = 8080

const archivo = new Contenedor("productos")


app.get('/', (req, res) => {
  res.send({mensaje: 'Hola mundo desde get!'})
})

app.get('/productos', (req, res) => {
    res.send(archivo.getAll())
  })

app.get('/productoRandom', (req, res) => {
  const limite = archivo.getAll().length
  const id = parseInt(Math.random()*limite) + 1

    res.send(archivo.getById(id))
  })

app.all('*', (req, res) => res.send({mensaje: "Ruta no valida"}))

const server = app.listen(port, () => {
  console.log(`Server escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el server: ${error}`))
