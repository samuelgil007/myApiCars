const database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const app = require('./app/app');
// conectar
database.connect();

//decir que nuestra app escuche en el puerto
app.listen(CONFIG.PORT, function(error){
    if(error) return console.log(error);
    console.log(`Servidor corriendo en el puerto ${CONFIG.PORT}`);
});