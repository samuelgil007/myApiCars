const express = require('express');
const ProductCtrl = require('../controllers/ProductController');
const router = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
router.get('/', ProductCtrl.index)  // api.com/product/  #Index: listar todos los productos
      .post('/', ProductCtrl.create)   // api.com/product/  #Create: crear un nuevo producto
      //lo siguiente sera mandarle como un middleware prepararlo y se manda
      .get('/:key/:value',ProductCtrl.find,ProductCtrl.show)    // api.com/product/category/Hogar #show: muestra un producto en especifico
      .put('/:key/:value', ProductCtrl.find,ProductCtrl.update)    // api.com/product/name/SamsungGalaxy #update : actualizar un producto en especifico
      .delete('/:key/:value',ProductCtrl.find, ProductCtrl.remove) // api.com/product/name/SamsungGalaxy





module.exports = router;