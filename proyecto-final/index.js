import express from 'express'
import { ProductRouter, CartRouter  } from "./src/routes/index.js";
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const PORT = process.env.PORT //|| 8080

//app.use('/public', express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hola mundoooooo!')
})
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto ${PORT}`)
})