const express = require('express');
const UserCtrl = require('../controllers/OwnerController');
const routerU = express.Router();

//le vamos a dar al router algunas rutas //ejemplos
routerU.get('/showWorkers', UserCtrl.index) // api.com/user/  #Index: listar todos los users
    .post('/', UserCtrl.create) // api.com/user/  #Create: crear un nuevo users
    //lo siguiente sera mandarle como un middleware prepararlo y se manda
    .post('/refreshToken', UserCtrl.refreshtoken) // api.com/user/  #Create: crear un nuevo users
    .get('/:key/:value', UserCtrl.find, UserCtrl.show) // api.com/user/category/Hogar #show: muestra un user en especifico
    .put('/:key/:value', UserCtrl.find, UserCtrl.update) // api.com/user/name/SamsungGalaxy #update : actualizar un user en especifico
    .delete('/:key/:value', UserCtrl.find, UserCtrl.remove) // api.com/user/name/SamsungGalaxy

module.exports = routerU;