const moongose = require('mongoose');
const CONFIG = require('./config');

module.exports = {
    connection: null,
    //se hace la coneccion, arriba se inicializo
    connect: function(){
        if(this.connection) return this.connection;
        return moongose.connect(CONFIG.DB).then(connection => {
            this.connection= connection;
            console.log('Conexion a base de datos exitosa');
        }).catch(error => console.log(error));
    }

}