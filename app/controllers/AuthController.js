const User = require('../models/User');
const Owner = require('../models/Owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
//el ciente me pasa por post
//username
//password

function login(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email }).then(user => { // se puede solo username
        if (!user) res.status(404).send({ message: "El usuario no existe" });
        //si existe, hago mi logica de login
        bcrypt.compare(password, user.password)
            .then(match => {
                if (match) {
                    payload = { //se debe meter fecha de entrega
                        email: user.email,
                        name: user.name,
                        _id: user._id,
                        role: user.role
                    }
                    //acceso con web token npm i jsonwebtoken
                    jwt.sign(payload, CONFIG.SECRET_TOKEN, function (error, token) {
                        if (error) {
                            res.status(500).send({ error });
                        } else {
                            res.status(200).send({ message: "accedido", token });
                        }
                    });

                } else {
                    res.status(200).send({ message: "Password mala" });//no doy acceso
                }

            }).catch(error => { //se le envia tambien el status para mejorar practicas
                console.log(error);
                res.status(500).send({ error });
            });
    }).catch(error => { //este error no es si no existe el username en la db
        console.log(error);
        res.status(500).send({ error });
    });

}

function loginToken(req, res) {

    let tokken = req.body.token;
    let respuesta = jwt.verify(tokken, 'JDPAUTOS');
    let email = respuesta.email;
    Owner.findOne({ email }).then(user => { // se puede solo username
        if (!user) res.status(404).send({ message: "El email no existe" });
        //verificar que el token sea igual al que esta en la base de datos
        if (user.token == tokken) {
            //si la fecha de caducidad es mayor a la fecha de actual, entonces es valido
            if (Date.now() < respuesta.fechaCaduca) {
                res.status(200).send({ message: "accedido" });
            } else {
                res.status(404).send({ message: "El token ha caducado" });
            }
        } else {
            res.status(404).send({ message: "Este token es antiguo" });
        }
    }).catch(error => { //este error no es si no existe el username en la db
        console.log(error);
        res.status(500).send({ error });
    });

}


module.exports = login;
module.exports = loginToken;  