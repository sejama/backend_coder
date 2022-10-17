//import { Router } from 'express';
const express = require('express')
const { Router } = express;
const routerViews = Router()
//const router = express.Router()

//import Contenedor from '../Contenedor.js'
const Contenedor = require('../contenedor')
const contenido = new Contenedor("productos")

routerViews.get("/", (req, res) => {
  res.render("form-products");
});

routerViews.post("/productos", async (req, res) => {
  const { title, price, thumbnail } = req.body;
  await contenido.save({"title": title, "price": price, "thumbnail":thumbnail});
  res.redirect("/");
});

routerViews.get("/productos", async (req, res) => {
  const productos = await contenido.getAll();
  res.render("table-products", { productos: productos });
});


//export {routerViews}
module.exports = routerViews
