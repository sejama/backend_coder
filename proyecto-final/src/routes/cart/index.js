import { Router } from "express";
import { DATE_UTILS } from "../../utils/index.js";
import { CartDao, ProductDao } from "../../dao/index.js";

const router = Router();

router.post("/", async (req, res) => {
  const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };

  const cart = await CartDao.save(baseCart);

  res.send({ cartId: cart.id });
});

router.post("/:cartId/products", async (req, res) => {
  const { id } = req.body;
  const productId = id
  const { cartId } = req.params;

  const cart = await CartDao.getById(Number(cartId));

  if (!cart)
    return res.send({ error: "Carrito no encontrado" });

  const product = await ProductDao.getById(Number(productId));

  if (!product)
    return res.send({ error: "Producto no encontrado" });

  // TODO
  cart.products.push(product)

  const updatedCart = await CartDao.updateById(Number(cartId), cart);

  res.send({ success: true, cart: updatedCart });
});

router.delete("/:cartId", async (req, res) => {
    try{
        const {cartId} = req.params
        const cart = await CartDao.deleteById(Number(cartId));
        res.send({ success: true })
    }catch(error){
        console.log(error)
        res.send({Error: "Ocurrio un error" })
    }
})

router.get('/:cartId/products', async (req, res) => {
    try{
        const {cartId} = req.params
        const { products } = await CartDao.getById(Number(cartId))        
        if(products === undefined) return res.send({ Error: "Carrito no encontrado" })
        res.send({ products: products  })
    }catch(error){
        console.log(error)
        res.send({Error: "Ocurrio un error" })
    }
})

router.delete('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params;

    const cart = await CartDao.getById(Number(cartId));
    const product = await ProductDao.getById(Number(productId));
    if (!product) return res.send({ error: "Producto no encontrado" })
    if (!cart){
        return res.send({ error: "Carrito no encontrado" });
    }else{
        const found = cart.products.find(element => element.id == Number(productId));
        if(found !== undefined){
            cart.products = cart.products.filter(product => product.id != Number(productId));
            const updatedCart = await CartDao.updateById(Number(cartId), cart);
            res.send({ success: true, cart: updatedCart });
        }else{
            return res.send({ error: "Producto no encontrado" });
        }
    }
    

  

})
export { router as CartRouter };