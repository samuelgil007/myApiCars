const moongose = require('mongoose');
// creo un schema para saber como debe estar guardando mi base de datos

const ProductSchema = new moongose.Schema({
    // en lugar de pasarle un tipo puedo pasarle mas detallado
    nombre: {
        type:String,
        unique: true,
        required: true
    },
    precio: {
        type:Number,
        required:true
    } ,
    categoria: {
        type:String,
        required: true,
        enum:['Kids','Hogar','Entretenimiento']
    },
    stock: {
        type:Number,
        default:10
    },
    fecha:{
        type:Date,
        default:Date.now()
    }
});

const Product = moongose.model('Product',ProductSchema);

module.exports = Product;