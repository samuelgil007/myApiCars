module.exports = function(req,res,next){
    if(req.path != '/auth/login'){//es la terminacion de url desps del .com
        if(req.header.authorization){

        }
        else res.status(403).send({message:"no tiene permisos suficientes"});                //403 es peticion valida , pero no se puede responder
    }else next(); // aqui se permite acceder a cualquiera al login



}