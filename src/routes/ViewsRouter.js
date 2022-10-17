//import { Router } from 'express';
const express = require('express');
const { Router } = express;
const viewsRouter = Router()
//const router = express.Router()

viewsRouter.get('/productos', (req,res) => {
    res.render("form-products")
})

//export {viewsRouter}
module.exports = viewsRouter