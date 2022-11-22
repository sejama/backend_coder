import express from "express";
import { config } from "./config/index.js";
import { ProductRouter, CartRouter } from "./routes/index.js";
//import cors from "cors";

const app = express()
//dotenv.config()
const PORT = process.env.PORT //|| 8080

//app.use('/public', express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// esto es para poder habilitar cors para un cliente externo, ejemplo cuando levantamos la app de react
// bien podriamos convertirlo a un middleware en su archivo correspondiente y tener las propiedades que deseemos
//app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static("public"));

app.get('/', (req, res) => {
  res.send('Hola mundoooooo!')
})

app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);

const server = app.listen(config.SERVER.PORT, () =>
  console.log(`Server running on port ${server.address().port}`)
);