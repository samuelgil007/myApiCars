const express = require('express');
const bodyParser = require('body-parser');
const Product = require('./routes/product');
const User = require('./routes/user');
const Auth = require('./routes/auth');
const AuthToken = require('./middleware/AuthToken')

const app = express();


//app.use(AuthToken); // antes d ecualquier ruta se ejecuta este 


//para poder manejar jsons, peticiones y respuestas
app.use(bodyParser.json());
//se dice que no utilizamos peticiones directamente en formularios, sino que se procesa en formato json
app.use(bodyParser.urlencoded({ extended: false }));




/// creo el path primero /product y ya lo que sigue de la , es el product que puede variar
app.use('/product', Product);
// creo el path primero /user y ya lo que sigue de la , es el product que puede variar
app.use('/user', User);
// crea el path /auth

app.use('/auth', Auth);


module.exports = app;