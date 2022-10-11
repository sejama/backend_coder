const express = require('express');
const {Router} = express
const router = Router()
//const router = express.Router()
const Contenedor = require('../Contenedor.js')

const productos = new Contenedor("productos")


router.get('/', async (req, resp)=> {
  resp.send(await productos.getAll());
});

router.get('/:id', async (req, resp)=> {
  const producto = await productos.getById(Number(req.params.id));
  return (producto)
      ? resp.status(200).json(producto)
      : resp.status(404).json({error: 'Producto no encontrado'});
});


router.post('/', async( req, resp) => {
  const {title, price, thumbnail } = req.body;
  const priceFloat = parseFloat(price);
  const newProducto = await (productos.save({"title": title, "price": priceFloat, "thumbnail":thumbnail}));
  return resp.status(201).json(newProducto);
});

router.put('/:id', async( req, resp) => {
  const { title, price, thumbnail } = req.body;
  const priceFloat = parseFloat(price);
  const updatedProducto = await (productos.update(
      Number(req.params.id),
      {
        "title": title, "price": priceFloat, "thumbnail":thumbnail
  }));
  return (updatedProducto !== -1)
      ?  resp.status(200).json(updatedProducto)
      : resp.status(404).json({ error: 'producto no encontrado' });
});

router.delete('/:id', async(req, resp) => {
  const deletedId = await productos.deleteById(Number(req.params.id));
  return (deletedId !== -1)
      ? resp.status(200).json({ deletedId })
      : resp.status(404).json({ error: 'Producto no encontrado' });
});


module.exports = router


