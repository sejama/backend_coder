//import { Router } from 'express';
const express = require('express');
const routerProductos = Router()
//const router = express.Router()

routerProductos.get('/', async (req, resp)=> {
  resp.send(await productos.getAll())
});

routerProductos.get('/:id', async (req, resp)=> {
  const producto = await productos.getById(Number(req.params.id));
  return (producto)
      ? resp.status(200).json(producto)
      : resp.status(404).json({error: 'Producto no encontrado'});
});


routerProductos.post('/', async( req, resp) => {
  const {title, price, thumbnail } = req.body;
  const priceFloat = parseFloat(price);
  const newProducto = await (productos.save({"title": title, "price": priceFloat, "thumbnail":thumbnail}));
  return resp.status(201).json(newProducto);
});

routerProductos.put('/:id', async( req, resp) => {
  const { title, price, thumbnail } = req.body;
  const priceFloat = parseFloat(price);
  const updatedProducto = await (productos.update(
      Number(req.params.id),
      {"title": title, "price": priceFloat, "thumbnail":thumbnail}
      ))
  return (updatedProducto !== -1)
      ?  resp.status(200).json(updatedProducto)
      : resp.status(404).json({ error: 'producto no encontrado' });
});

routerProductos.delete('/:id', async(req, resp) => {
  const deletedId = await productos.deleteById(Number(req.params.id));
  return (deletedId !== -1)
      ? resp.status(200).json({ 'Produco elimindo':  deletedId })
      : resp.status(404).json({ error: 'Producto no encontrado' });
});


//export { router }
module.exports = routerProductos;


