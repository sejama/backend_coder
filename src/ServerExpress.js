//import express from 'express'
const express = require('express')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: socketIOServer } = require('socket.io')

const Product = require("../models/product/product.model.js")
const Message = require("../models/message/message.model.js")

const port = 8080
const app = express()
const httpServer = new HttpServer(app)
const io = new socketIOServer(httpServer)

//esto sirve para leer los body en json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
)*/

//app.set('view engine', "hbs")
//app.set('views', './views')

/*const parhAbsoluto = __dirname
app.use('/', express.static(parhAbsoluto+'./../public'))
*/
app.use(express.static("./public"))
//Devuelve la funcionalidad de productos
//const routerProductos = require('./routes/routerProductos.js')
//const routerViews = require('./routes/routerViews.js')
//Asignamos las func a /productos
//app.use('/api/productos/', routerProductos)
//app.use('/views', routerViews)


//app.all('*', (req, res) => res.send({mensaje: "Ruta no valida"}))

const server = httpServer.listen(port, () => {
  console.log(`Server escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en el server: ${error}`))

io.on('connection', socket => {
  enviarTodosLosProductos(socket)
  enviarTodosLosMensajes(socket)

  socket.on("new product", newProduct =>{
    guardarProducto(newProduct)
  })

  socket.on("new message", nuevoMensaje => {
    guardarMensaje(nuevoMensaje)
  })

})

/* -------------------------------------------------------------------------- */
/*                                  PRODUCTOS                                 */
/* -------------------------------------------------------------------------- */

const enviarTodosLosProductos = async (socket) => {
  const allProduct = await Product.getAll()
  socket.emit("all products", allProduct)
  
  
}

const guardarProducto = async (newProduct) =>{
    await Product.save(newProduct)
    const allProduct = await Product.getAll()
    io.sockets.emit("all products", allProduct)
}

/* -------------------------------------------------------------------------- */
/*                                    CHAT                                    */
/* -------------------------------------------------------------------------- */
const guardarMensaje = async (message) =>{
  const hoy = new Date()
  const hoyFormateado = hoy.getDate()+"/"+(hoy.getMonth()+1)+"/"+hoy.getFullYear()+ " " + hoy.getHours()+":"+hoy.getMinutes()+":"+hoy.getSeconds()
  const newMessage = { ...message, createdAt: `${hoyFormateado}` }
  await Message.save(newMessage)
  const allMessage = await Message.getAll()
  io.sockets.emit("all message", allMessage)
}

const enviarTodosLosMensajes = async (socket) => {
  const allMessage = await Message.getAll()
  socket.emit("all message", allMessage)
  
}