const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');

module.exports = function(req,res,next){
    if(req.path != '/auth/login'){//es la terminacion de url desps del .com
        //se hace la validacion
        //se valida que en el header halla header authorization
        if(req.headers.authorization){
            let token= req.headers.authorization.split(' ')[1]; //se separa en espacio para coger el token del bearer.
            
            //se valida que este melo el token
            jwt.verify(token,CONFIG.SECRET_TOKEN,function(error,decoded){
                if(error) return res.status(403).send({message: 'no tiene permisos',error});
                //el decode es lo que meti en el payloda
                //ahora filtro por roles,
                if(req.method != 'GET'){
                    console.log(decoded.role);
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({message:"no tiene permisos suficientes >:V"});                //403 es peticion valida , pero no se puede responder
                }else{
                    next();
                }
                
            });
        }
        else res.status(403).send({message:"no tiene permisos suficientes ...."});                //403 es peticion valida , pero no se puede responder
    }else next(); // aqui se permite acceder a cualquiera al login



}