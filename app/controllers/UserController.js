const Userc = require('../models/User');
const CONFIG = require('../config/config');
const jwt = require('jsonwebtoken');

function index(req, res) {
    // busco todos los users y si no da error me devuelve arreglo users
    Userc.find({}).then(users => {
        // si hay usuarios envio codigo de aceptacion y un cuerpo con los prdctos
        if (users.length) return res.status(200).send({ users });
        //en caso de que no hayan datos se manda un codigo y un mensaje xD
        return res.status(204).send({ message: 'NO CONTENT' });
    }).catch(error => res.status(500).send({ error }));
}

function create(req, res) {
    //se inicializa una variable con los datos de mi body
    let usuario = new Userc(req.body);
    //guardo con el metodo save el nuevo usuario
    usuario.save().then(user => {
        payload = { //se debe meter fecha de entrega
            email: user.email,
            name: user.name,
            _id: user._id,
            role: user.role
        }
        const token = jwt.sign(payload, CONFIG.SECRET_TOKEN); // aca se deberia de poner la duración del token y demas

        return res.status(201).send({ user, token });
    }).catch(error => res.status(500).send({ message: "El usuario ya existe", error }));
}


function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'Not Found :"V' });
    let users = req.body.users;
    return res.status(200).send({ users });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    //Se valida si no hay Users.
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    let ussuario = req.body.users[0];
    //creo un nuevo objeto con las cosas que quiero cambiarle
    ussuario = Object.assign(ussuario, req.body);
    ussuario.save().then(user => res.status(200).send({ message: "UPDATED", user })).catch(error => res.status(500).send({ error }));
}

function remove(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.users) return res.status(404).send({ message: 'NOT FOUND' });
    req.body.users[0].remove().then(user => res.status(200).send({ message: "REMOVED", user })).catch(error => res.status(500).send({ error }));
}


// como buscar se repite en show, update y remove hago una funcion
// es como un middleware el cual es el que se ejecuta en medio de otros controladores
function find(req, res, next) {
    //se hara lo siguiente para entrar por ejemplo (categoria: 'Hogar')
    let query = {};
    query[req.params.key] = req.params.value;
    Userc.find(query).then(users => {
        //si no existen users
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        req.body.users = users;
        return next();
    }).catch(error => {
        req.body.error = error;
        next();
    });
    // pdta se pone en el body pa poderlo maniobrar en la siguiente funcion desps del find
}


function showTeam(req, res) {
    res.json([{
            _id: 1, // datos publicos 
            name: 'Daniela Ocampo',
            description: 'Gerente general',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 2,
            name: 'Arcangel  Marin',
            description: 'Asistente de gerencia',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 3,
            name: 'Pedro Rios',
            description: 'Gerente financiero',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 4,
            name: 'Jhon Vasquez ',
            description: 'Asistente financiero',
            date: "2020-10-25T01:43:19.346Z"
        },
        {
            _id: 4,
            name: 'Samuel Gil ',
            description: 'Técnico',
            date: "2020-10-25T01:43:19.346Z"
        }
    ]);

}

function privateTasks(req, res) {
    let query = {};
    query["role"] = "admin";
    Userc.find(query).then(users => {
        //si no existen users
        if (!users.length) return next();
        // en caso de que si haya , se crea un user en el body (no existia)
        res.send({ users });

    }).catch(error => {
        req.body.error = error;
        next();
    });

}

function showProfile(req, res) {
    res.send(req.body.rol);
}


function verifyToken(req, res, next) {
    //console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).send('No posee headers para esta Request');
    }
    const token = req.headers.authorization.split(' ')[1]; // para separar el token de bearer, toma solo el token
    if (token === 'null') {
        return res.status(401).send('no posee token para esta Request');
    }
    jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded) {
        if (error) return res.status(403).send({ message: 'Fallo al decodificar token', error });
        //req.userId = payload._id;
        if (decoded.role == "admin") {
            req.body.rol = decoded.role;
            next();
        } else return res.status(401).send('No tiene el rol necesario para esta Request');
    });



}





module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find,
    showTeam,
    privateTasks,
    showProfile,
    verifyToken
};